# CLAUDE.md

Project rules for the canonical Matthew Paver product store.

## Product

This repository owns `matthewpaver.github.io`. The root route is the canonical product store.

**Deployed site (since 2026-07-29): the restored 19 May static store**, recovered verbatim from the pre-purge profile-repo history (operator decision — the Astro rebuilds never beat it). It lives in top-level `store/` (plain HTML/CSS/JS, `preview.html?app=<slug>` detail views, `scripts/validate-store.mjs` gate). `scripts/prepare-pages-artifact.mjs` copies that tree to `pages-dist/` and nests static pages under `pages-dist/store/apps/<slug>/` so legacy Astro URLs such as `/store/apps/marketing-ml-lakehouse/` still resolve when `store/` is the Pages root. `pages.yml` deploys `pages-dist`. The undeployed Astro source (`src/`, `public/`, `astro.config.mjs`, Astro deps, `metrics`/`screenshots` scripts) was removed on 2026-10-08 to clear its Dependabot alerts; it is recoverable from git history at `e1bfe8a9bf995ec09d0a66ecedc5946db3af0707` (last commit containing it). Do not redesign the deployed store without an explicit operator request.

## Architecture

- Long-form case notes live at `store/work/<case>/index.html` with shared `store/work/case.css` (first: `rag-regression-gate/`). `scripts/validate-store.mjs` checks each one's canonical, CSP, JSON-LD, repo link, Limits section, sitemap entry and the catalogue row linking to it; llms.txt lists it.

- The site is hand-written static HTML in `store/`; there is no framework build. Primary content and links must work without client JavaScript.
- Catalogue sources: `store/app-index.csv` (eight rows) and `store/previews.json` (same order) feed `store/work/index.html` cards, `preview.html?app=<slug>` and the generated `/store/apps/<slug>/` pages; `scripts/validate-store.mjs` asserts they stay in sync with the work page and `store/sitemap.xml`.
- The only runtime npm dep is `@fontsource-variable/hanken-grotesk`, whose woff2 file `prepare-pages-artifact.mjs` copies into `pages-dist/assets/fonts/`; `@playwright/test` is the only dev dep.
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

`DESIGN.md` is the source of truth. In short: navy and cyan landing, cool-white catalogue, Hanken Grotesk for every page (one family, never Inter, Manrope, Geist or a serif display), blue only for actions and selection, real product screenshots.

## Writing for visitors

Every page must make sense to a non-technical hiring manager, a person from the app's field and an engineer.

- Plain UK English, short sentences. Say what you start with, what the tool does and what you see.
- Do not use: flagship, ecosystem, journey, evidence-led, seamless, frontier, revolutionary.
- No em dashes. At most one middle dot per line. Sentence case labels, no uppercase eyebrows.
- Explain jargon the first time (for example RAG, ROAS, XER) or replace it ("fixture" becomes "sample data").
- State each limit once, in the page's Limits section. Do not repeat the same disclaimer.
- Use the same product name everywhere: PolicyLens, ProjectLens, RAG Regression Gate, QuickSupply, Winchester Buyer Check, Marketing ML Lakehouse, HR Performance Analytics, Can England Win It?
