# CLAUDE.md

Project rules for the canonical Matthew Paver product store.

## Product

This repository owns `matthewpaver.github.io`. The root route is the canonical product store.

**Deployed site (since 2026-07-29): the restored 19 May static store**, recovered verbatim from the pre-purge profile-repo history (operator decision — the Astro rebuilds never beat it). It lives in top-level `store/` (plain HTML/CSS/JS, `preview.html?app=<slug>` detail views, `scripts/validate-store.mjs` gate). `scripts/prepare-pages-artifact.mjs` copies that tree to `pages-dist/` and nests static pages under `pages-dist/store/apps/<slug>/` so legacy Astro URLs such as `/store/apps/marketing-ml-lakehouse/` still resolve when `store/` is the Pages root. `pages.yml` deploys `pages-dist`. The undeployed Astro source (`src/`, `public/`, `astro.config.mjs`, Astro deps, `metrics`/`screenshots` scripts) was removed on 2026-10-08 to clear its Dependabot alerts; it is recoverable from git history at `e1bfe8a9bf995ec09d0a66ecedc5946db3af0707` (last commit containing it). Do not redesign the deployed store without an explicit operator request.

## Architecture

- Long-form case notes live at `store/work/<case>/index.html` with shared `store/work/case.css` (first: `rag-regression-gate/`). `scripts/validate-store.mjs` checks each one's canonical, CSP, JSON-LD, repo link, Limits section, sitemap entry and the catalogue row linking to it; llms.txt lists it.

- The site is hand-written static HTML in `store/`; there is no framework build. Primary content and links must work without client JavaScript.
- Catalogue sources: `store/app-index.csv` (seven rows) and `store/previews.json` (same order) feed `store/work/index.html` cards, `preview.html?app=<slug>` and the generated `/store/apps/<slug>/` pages; `scripts/validate-store.mjs` asserts they stay in sync with the work page and `store/sitemap.xml`.
- The only runtime npm deps are `@fontsource-variable/manrope` and `@fontsource-variable/newsreader`, whose woff2 files `prepare-pages-artifact.mjs` copies into `pages-dist/assets/fonts/`; `@playwright/test` is the only dev dep.
- Client JavaScript only enhances search, filtering, copy actions and theme choice.
- Product screenshots must show real interfaces or clearly labelled synthetic outputs.
- The old `MatthewPaver/store/` routes (including `store/workbench.html`) redirect here; the profile repo's Pages build writes redirect-only HTML for a fixed list of legacy routes.

## Quality gates

- Run `npm run verify` (`npm test` = unit tests + validator + Pages build, then the Playwright suite) before publishing.
- Every flagship needs a working launch or honest local-install path.
- Every app page needs a unique canonical URL, PNG social image, structured data and visible limitations.
- Preserve keyboard access, 44px touch targets, reduced motion, light/dark contrast and no-JavaScript browsing.
- Do not invent users, ratings, releases, testimonials or commercial results.

## Design language

- Editorial instrument panel, not a glossy template marketplace.
- Newsreader for display type; IBM Plex Sans for interface and body copy.
- Warm paper and near-black ink in light mode; deep slate surfaces in dark mode.
- Teal indicates usable/open paths. Amber highlights evidence and attention.
- Use semantic design tokens and one consistent 1.5px line-icon language.
