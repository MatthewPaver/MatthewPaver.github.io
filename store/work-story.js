// Apple-inspired pacing, implemented with native scrolling and real project captures.
// The source cards remain the complete, accessible no-JavaScript version.
(() => {
  const story = document.querySelector('[data-work-story]');
  if (!story || !('IntersectionObserver' in window)) return;
  const cards = [...story.querySelectorAll('[data-project]')];
  const toggle = document.querySelector('[data-story-toggle]');
  const jumps = [...document.querySelectorAll('.story-controls nav a')];
  const wide = matchMedia('(min-width: 1100px) and (min-height: 700px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const stage = document.createElement('div');
  stage.className = 'work-story-stage';
  stage.setAttribute('aria-hidden', 'true');
  const frames = cards.map(card => {
    const frame = document.createElement('figure');
    frame.className = 'work-story-frame';
    frame.dataset.storyFrame = card.dataset.project;
    const media = card.querySelector('.project-media picture, .project-media img').cloneNode(true);
    const img = media.matches('img') ? media : media.querySelector('img');
    img.alt = '';
    const caption = document.createElement('figcaption');
    caption.textContent = card.dataset.storyCaption;
    frame.append(media, caption);
    stage.append(frame);
    return frame;
  });
  story.prepend(stage);
  let simple = false;
  let observer;
  let animation;
  const intersecting = new Set();

  function select(card) {
    if (story.dataset.activeProject === card.dataset.project) return;
    animation?.cancel();
    story.dataset.activeProject = card.dataset.project;
    frames.forEach(frame => {
      const active = frame.dataset.storyFrame === card.dataset.project;
      frame.classList.toggle('is-active', active);
      if (active && story.dataset.storyMode === 'scroll' && !reduce.matches) {
        animation = frame.animate([
          {clipPath:'inset(0 0 12% 0 round 14px)',transform:'translateY(22px) scale(.97)'},
          {clipPath:'inset(0 0 0 0 round 14px)',transform:'translateY(0) scale(1)'},
        ], {duration:700,easing:'cubic-bezier(.16,1,.3,1)'});
      }
    });
    jumps.forEach(link => {
      if (link.hash === `#${card.id}`) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }

  function updateMode() {
    observer?.disconnect();
    animation?.cancel();
    intersecting.clear();
    const enabled = wide.matches && !reduce.matches && !simple;
    story.dataset.storyMode = enabled ? 'scroll' : 'simple';
    toggle.hidden = !wide.matches || reduce.matches;
    toggle.textContent = enabled ? 'Use simple view' : 'Use scroll view';
    toggle.setAttribute('aria-pressed',String(simple));
    if (!enabled) return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) intersecting.add(entry.target);
        else intersecting.delete(entry.target);
      }
      const closest = [...intersecting].sort((a,b) => {
        const distance = el => Math.abs(el.getBoundingClientRect().top + el.offsetHeight / 2 - innerHeight / 2);
        return distance(a) - distance(b);
      })[0];
      if (closest) select(closest.closest('[data-project]'));
    }, {rootMargin:'-30% 0px -30% 0px',threshold:0});
    cards.forEach(card => observer.observe(card.querySelector('.project-copy')));
  }
  cards.forEach(card => card.addEventListener('focusin', () => select(card)));
  toggle.addEventListener('click', () => { simple = !simple; updateMode(); });
  wide.addEventListener('change', updateMode);
  reduce.addEventListener('change', updateMode);
  select(cards[0]);
  updateMode();
})();
