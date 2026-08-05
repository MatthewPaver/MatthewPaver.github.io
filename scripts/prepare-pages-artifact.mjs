// Build the GitHub Pages artifact from store/.
//
// pages.yml deploys store/ as the site root, so a path like
// /store/apps/marketing-ml-lakehouse/ only works if we nest a second
// "store/" directory inside the artifact. This script copies the live
// store to pages-dist/ and writes static app pages under
// pages-dist/store/apps/<slug>/ for catalogue slugs + legacy Astro aliases.

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "store");
const outDir = path.join(root, "pages-dist");
const siteBase = "https://matthewpaver.github.io";

// Old Astro catalogue ids → current store preview slugs.
// Keeps shared / bookmarked /store/apps/<astro-id>/ URLs alive.
const ALIASES = {
  "marketing-ml-lakehouse": "lakehouse",
  "output-gate": "ai-evaluator",
  "ai-workflow-evaluator": "ai-evaluator",
  "paper-trading-bot": "paper-trading",
  "happening": "happening-core",
  "happening-open-core": "happening-core",
  "sentence-similarity": "sentence",
  "sentence-similarity-analysis": "sentence",
  "hr-performance": "hr",
  "hr-performance-dashboards": "hr",
  "can-england-win-it": "england",
  "pyspark-kafka-streaming": "pyspark",
  "project-lens": "projectlens",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function copyDir(from, to) {
  fs.cpSync(from, to, { recursive: true });
}

function renderAppPage({ pageSlug, previewSlug, preview }) {
  // Nested three levels below the deployed root: /store/apps/<slug>/
  const assetPrefix = "../../..";
  const canonical = `${siteBase}/store/apps/${pageSlug}/`;
  const previewUrl = `${siteBase}/preview.html?app=${previewSlug}`;
  const absoluteImage = preview.image.replace(/^\.\//, `${siteBase}/`);
  const primary = preview.links.find((link) => link.primary) || preview.links[0];
  const secondary = preview.links.filter((link) => link !== primary);

  const points = preview.points
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("\n              ");
  const stack = preview.stack
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");
  const secondaryLinks = secondary
    .map(
      (link) =>
        `<a class="button ghost" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
    )
    .join("\n            ");

  return `<!doctype html>
<html lang="en-GB" class="no-js">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self' data:; media-src 'self'; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#fbfaf7" />
    <title>${escapeHtml(preview.title)} · Matthew Paver Portfolio Store</title>
    <meta name="description" content="${escapeHtml(preview.summary)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(preview.title)} · Matthew Paver Portfolio Store" />
    <meta property="og:description" content="${escapeHtml(preview.summary)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${escapeHtml(absoluteImage)}" />
    <meta property="og:image:alt" content="${escapeHtml(preview.imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(preview.title)} · Matthew Paver Portfolio Store" />
    <meta name="twitter:description" content="${escapeHtml(preview.summary)}" />
    <meta name="twitter:image" content="${escapeHtml(absoluteImage)}" />
    <link rel="icon" type="image/svg+xml" href="${assetPrefix}/assets/favicon.svg" />
    <link rel="apple-touch-icon" href="${assetPrefix}/assets/apple-touch-icon.svg" />
    <link rel="stylesheet" href="${assetPrefix}/styles.css" />
    <script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: preview.title,
        description: preview.summary,
        url: canonical,
        image: absoluteImage,
        applicationCategory: preview.focus,
        operatingSystem: "Web",
        author: { "@type": "Person", name: "Matthew Paver" },
      })}
    </script>
    <script>
      document.documentElement.className = document.documentElement.className.replace("no-js", "js-enabled");
    </script>
  </head>
  <body>
    <main class="shell preview-shell">
      <nav class="preview-nav" aria-label="Preview navigation">
        <a href="${assetPrefix}/">Back to store</a>
        <a href="${previewUrl}">Store preview</a>
        <a href="https://github.com/MatthewPaver">GitHub profile</a>
      </nav>

      <section class="preview-hero">
        <div class="preview-copy">
          <p class="eyebrow">${escapeHtml(preview.kicker)}</p>
          <h1>${escapeHtml(preview.title)}</h1>
          <p class="lede">${escapeHtml(preview.summary)}</p>
          <div class="preview-actions">
            ${
              primary
                ? `<a class="button primary" href="${escapeHtml(primary.href)}">${escapeHtml(primary.label)}</a>`
                : ""
            }
            ${secondaryLinks}
          </div>
        </div>

        <figure class="preview-media">
          <img src="${assetPrefix}/${escapeHtml(preview.image.replace(/^\.\//, ""))}" width="1280" height="720" alt="${escapeHtml(preview.imageAlt)}" />
          <figcaption class="preview-meta">
            <div>
              <span>Role</span>
              <strong>${escapeHtml(preview.role)}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>${escapeHtml(preview.status)}</strong>
            </div>
            <div>
              <span>Focus</span>
              <strong>${escapeHtml(preview.focus)}</strong>
            </div>
          </figcaption>
        </figure>
      </section>

      <section class="preview-layout">
        <article class="preview-panel">
          <h2>What it solves</h2>
          <p>${escapeHtml(preview.problem)}</p>
          <ul class="preview-list">
              ${points}
          </ul>
        </article>

        <aside class="preview-panel">
          <h3>Stack</h3>
          <div class="preview-stack">${stack}</div>
          <p class="motion-note">${escapeHtml(preview.note)}</p>
        </aside>
      </section>

      <footer class="footer">
        <p>Portfolio store · <a href="${canonical}">/store/apps/${escapeHtml(pageSlug)}/</a></p>
        <a href="${assetPrefix}/">Back to store</a>
      </footer>
    </main>
  </body>
</html>
`;
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    throw new Error("store/ is missing — nothing to deploy");
  }

  fs.rmSync(outDir, { recursive: true, force: true });
  copyDir(sourceDir, outDir);

  const previews = JSON.parse(fs.readFileSync(path.join(sourceDir, "previews.json"), "utf8"));
  const pageTargets = new Map();

  // One page per catalogue slug.
  for (const slug of Object.keys(previews)) {
    pageTargets.set(slug, slug);
  }
  // Plus the old Astro / bookmarked ids.
  for (const [alias, target] of Object.entries(ALIASES)) {
    if (!previews[target]) {
      console.warn(`skip alias ${alias}: missing preview slug ${target}`);
      continue;
    }
    pageTargets.set(alias, target);
  }

  for (const [pageSlug, previewSlug] of pageTargets) {
    const preview = previews[previewSlug];
    const pageDir = path.join(outDir, "store", "apps", pageSlug);
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(path.join(pageDir, "index.html"), renderAppPage({ pageSlug, previewSlug, preview }));
  }

  console.log(
    `Prepared ${outDir}: ${Object.keys(previews).length} catalogue apps, ${pageTargets.size} /store/apps/ pages`
  );
}

main();
