# CLAUDE.md

Project rules for the canonical Matthew Paver product store.

## Product

This repository owns `matthewpaver.github.io`. The root route is the canonical product store. It contains eight flagship public builds and a separate shelf for protected commercial case studies.

## Architecture

- Astro generates static HTML. Primary content and links must work without client JavaScript.
- `src/content/apps/` is the single catalogue source. Cards, app pages, JSON-LD and sitemap routes are generated from it.
- Client JavaScript only enhances search, filtering, copy actions and theme choice.
- Product screenshots must show real interfaces or clearly labelled synthetic outputs.
- The old `MatthewPaver/store/` route is legacy and should point here once this site is deployed.

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
