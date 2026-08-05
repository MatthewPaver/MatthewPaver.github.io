# CLAUDE.md

Project rules for the canonical Matthew Paver product store.

## Product

This repository owns `matthewpaver.github.io`. The root route is the canonical product store.

**Deployed site (since 2026-07-29): the restored 19 May static store**, recovered verbatim from the pre-purge profile-repo history (operator decision — the Astro rebuilds never beat it). It lives in top-level `store/` (plain HTML/CSS/JS, `preview.html?app=<slug>` detail views, `scripts/validate-store.mjs` gate). `scripts/prepare-pages-artifact.mjs` copies that tree to `pages-dist/` and nests static pages under `pages-dist/store/apps/<slug>/` so legacy Astro URLs such as `/store/apps/marketing-ml-lakehouse/` still resolve when `store/` is the Pages root. `pages.yml` deploys `pages-dist`. The Astro source below (`src/`) is retained but NOT deployed; its verify+dist pipeline is in git history if the operator chooses to return to it. Do not redesign the deployed store without an explicit operator request.

## Architecture

- Astro generates static HTML. Primary content and links must work without client JavaScript.
- `src/content/apps/` is the single catalogue source. Cards, app pages, JSON-LD and sitemap routes are generated from it.
- Client JavaScript only enhances search, filtering, copy actions and theme choice.
- Product screenshots must show real interfaces or clearly labelled synthetic outputs.
- The old `MatthewPaver/store/` route redirects here (done 2026-07-29). Only `store/workbench.html` still serves from the legacy repo — it has no equivalent on this site.

## Quality gates

- Run `npm run verify` before publishing.
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
