# Matthew Paver — Product Store

The source for [matthewpaver.github.io](https://matthewpaver.github.io/): one
canonical, evidence-led catalogue of Matthew Paver's usable software.

The store is built with Astro and produces plain static HTML for GitHub Pages.
Every flagship has its own indexable page with a real screenshot, current
repository evidence, install or launch instructions, validation commands, and
explicit limitations. Search and filters are progressive enhancement, so the
catalogue remains browsable without JavaScript.

## Catalogue

- Seven flagship products: ProjectLens, MeetingProof, Output Gate,
  DecisionGraph, Marketing ML Lakehouse, Paper Trading, and Winchester Buyer Check.
- One open-core case study: Happening.
- Private repositories and private-product case studies are not listed.
- No invented user counts, review scores, or performance claims.

## Work locally

```bash
npm install
npm run dev
```

Run the complete pre-publish check with:

```bash
npm run verify
```

`npm run metrics` refreshes public GitHub metadata. `npm run screenshots`
recaptures the public browser applications used by the store.

## Deployment

Pushes to `main` run unit tests, type/build checks, browser tests at desktop and
mobile widths, then deploy the generated `dist/` directory to GitHub Pages.

## Rights

Site code may be reused under the MIT licence. Product names, screenshots, copy
and other brand assets remain copyright © Matthew Paver and are not sublicensed
by the code licence.
