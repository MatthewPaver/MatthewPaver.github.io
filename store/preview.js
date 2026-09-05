import { safeCatalogueReturn } from './catalogue-state.js';

const SITE_BASE = "https://matthewpaver.github.io/";
const params = new URLSearchParams(window.location.search);
const slug = (params.get('app') || 'projectlens').slice(0, 100);
const returnHref = safeCatalogueReturn(params.get('returnTo'), window.location.origin);

function setText(id, text) {
  const node = document.querySelector(`#${id}`);
  if (node) node.textContent = text;
}

function setMeta(selector, attribute, value) {
  const node = document.querySelector(selector);
  if (node) node.setAttribute(attribute, value);
}

function updateSocialMeta(preview, slug) {
  const absoluteImage = preview.image.replace(/^\.\//, SITE_BASE);
  const previewUrl = `${SITE_BASE}preview.html?app=${slug}`;
  const title = `${preview.title} · Matthew Paver`;

  document.title = title;
  setMeta("meta[name='description']", "content", preview.summary);
  setMeta("meta[property='og:title']", "content", title);
  setMeta("meta[property='og:description']", "content", preview.summary);
  setMeta("meta[property='og:url']", "content", previewUrl);
  setMeta("meta[property='og:image']", "content", absoluteImage);
  setMeta("meta[property='og:image:alt']", "content", preview.imageAlt);
  setMeta("meta[name='twitter:title']", "content", title);
  setMeta("meta[name='twitter:description']", "content", preview.summary);
  setMeta("meta[name='twitter:image']", "content", absoluteImage);
  setMeta("link[rel='canonical']", "href", previewUrl);
}

function renderUnknown() {
  document.title = "Unknown project · Matthew Paver";
  setText("preview-kicker", "Not found");
  setText("preview-title", 'Project not found');
  setText(
    "preview-summary",
    "That project is not in the public catalogue. It may have been renamed or archived. Browse the current work instead."
  );

  const media = document.querySelector(".preview-media");
  if (media) media.hidden = true;

  const layout = document.querySelector(".preview-layout");
  if (layout) layout.hidden = true;

  const actions = document.querySelector("#preview-actions");
  if (actions) {
    const back = document.createElement("a");
    back.className = "button primary";
    back.href = returnHref;
    back.textContent = "All work";
    actions.replaceChildren(back);
  }
}

function renderPreview(preview, slug) {
  updateSocialMeta(preview, slug);
  setText("preview-kicker", preview.kicker);
  setText("preview-title", preview.title);
  setText("preview-summary", preview.summary);
  setText("preview-role", preview.role);
  setText("preview-status", preview.status);
  setText("preview-focus", preview.focus);
  setText("preview-problem", preview.problem);
  setText("preview-note", preview.note);
  for (const field of ['choice', 'result', 'learning', 'access', 'publication']) setText(`preview-${field}`, preview[field]);
  setText('preview-media-caption', preview.mediaCaption);
  setText('preview-steps-heading', preview.video ? 'Text walkthrough' : 'Try this example');
  document.querySelector('.preview-media').hidden = false;
  document.querySelector('.preview-layout').hidden = false;
  document.querySelector('#preview-boundary').hidden = false;

  const image = document.querySelector("#preview-image");
  const imageSource = document.querySelector("#preview-image-avif");
  const picture = document.querySelector("#preview-picture");
  const video = document.querySelector("#preview-video");
  if (image) {
    image.width = preview.imageWidth;
    image.height = preview.imageHeight;
    image.src = preview.image;
    image.alt = preview.imageAlt;
  }
  document.querySelector('#preview-full-image').href = preview.image;
  if (imageSource) {
    if (preview.imageAvif) imageSource.srcset = preview.imageAvif;
    else imageSource.removeAttribute("srcset");
  }
  if (picture) {
    picture.hidden = Boolean(preview.video);
  }

  if (video) {
    if (preview.video) {
      video.src = preview.video;
      video.poster = preview.image;
      video.hidden = false;
      video.setAttribute("aria-label", `${preview.title} demo video`);
      const download = document.querySelector('#preview-download');
      download.href = preview.video;
      download.hidden = false;
    } else {
      video.removeAttribute("src");
      video.removeAttribute("poster");
      video.hidden = true;
      video.removeAttribute("aria-label");
    }
  }

  const actions = document.querySelector("#preview-actions");
  if (actions) {
    actions.replaceChildren(
      ...preview.links.map((link) => {
        const anchor = document.createElement("a");
        anchor.className = `button ${link.primary ? "primary" : "ghost"}`;
        anchor.href = link.href;
        anchor.textContent = link.label;
        return anchor;
      })
    );
  }

  const points = document.querySelector("#preview-points");
  if (points) {
    points.replaceChildren(
      ...preview.points.map((point) => {
        const item = document.createElement("li");
        item.textContent = point;
        return item;
      })
    );
  }

  const stack = document.querySelector("#preview-stack");
  if (stack) {
    stack.replaceChildren(
      ...preview.stack.map((item) => {
        const badge = document.createElement("span");
        badge.textContent = item;
        return badge;
      })
    );
  }
  document.querySelector('#preview-steps').replaceChildren(...preview.steps.map((step) => {
    const item = document.createElement('li');
    item.textContent = step;
    return item;
  }));
}

async function init() {
  const main = document.querySelector('main');
  main.setAttribute('aria-busy', 'true');
  setText('preview-title', 'Loading project…');
  setText('preview-summary', 'Loading the case and its evidence.');
  document.querySelector('#preview-actions').replaceChildren();
  document.querySelector('#preview-boundary').hidden = true;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let response;
    let previews;
    try {
      response = await fetch("./previews.json", { cache: "no-cache", signal: controller.signal });
      if (!response.ok) throw new Error('Project data unavailable');
      previews = await response.json();
    } finally { clearTimeout(timeout); }
    const preview = Object.hasOwn(previews, slug) ? previews[slug] : null;

    if (!preview) {
      renderUnknown();
      return;
    }

    renderPreview(preview, slug);
    // The fragment can be attempted before async case content becomes visible.
    const anchor = location.hash;
    if (['#case-story', '#recording'].includes(anchor)) {
      await document.fonts.ready;
      if (location.hash === anchor) document.querySelector(anchor)?.scrollIntoView({ behavior:'instant', block:'start' });
    }
  } catch {
    document.title = 'Project unavailable · Matthew Paver';
    setText('preview-title', 'This project could not load');
    setText('preview-kicker', 'Connection or data unavailable');
    setText('preview-summary', 'Try again, or open a static case page from All work. Your catalogue selection is preserved.');
    document.querySelector('.preview-media').hidden = true;
    document.querySelector('.preview-layout').hidden = true;
    const retry = document.createElement('button');
    retry.className = 'button primary';
    retry.textContent = 'Try again';
    retry.addEventListener('click', init);
    const back = document.createElement('a');
    back.className = 'button ghost';
    back.href = returnHref;
    back.textContent = 'All work';
    const fallback = document.createElement('a');
    fallback.className = 'button ghost';
    const knownSlugs = ['policylens', 'projectlens', 'quicksupply', 'winchester', 'lakehouse', 'hr', 'england'];
    fallback.href = knownSlugs.includes(slug) ? `./store/apps/${slug}/` : './work/';
    fallback.textContent = knownSlugs.includes(slug) ? 'Open static case' : 'Browse public projects';
    document.querySelector('#preview-actions').replaceChildren(retry, fallback, back);
  } finally {
    main.setAttribute('aria-busy', 'false');
  }
}

function initPage() {
  document.querySelectorAll('[data-catalogue-return]').forEach((link) => { link.href = returnHref; });
  const video = document.querySelector('#preview-video');
  const picture = document.querySelector('#preview-picture');
  const error = document.querySelector('#preview-media-error');
  if (video && error) {
    const showError = () => { error.hidden = false; video.hidden = true; if (picture) picture.hidden = false; };
    video.addEventListener('error', showError);
    error.querySelector('button')?.addEventListener('click', async () => {
      error.hidden = true;
      video.hidden = false;
      if (picture) picture.hidden = true;
      video.load();
      try { await video.play(); } catch { showError(); }
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
  }
  if (!document.body.classList.contains('static-preview')) init();
}

initPage();
