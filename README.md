# Matthew Paver — Selected Software

The source for [matthewpaver.github.io](https://matthewpaver.github.io/): one
canonical portfolio of Matthew Paver's usable software.

The site is built with Astro and produces plain static HTML for GitHub Pages.
Every entry has an indexable page with a real screenshot, current repository
evidence, install or launch instructions, validation commands and explicit
limitations.

## Portfolio structure

- Three first-level journeys: review a project change with ProjectLens, build an
  approved meeting follow-up with MeetingProof, or run an AI-output regression
  check with Output Gate.
- DecisionGraph appears as a ProjectLens component.
- Marketing ML Lakehouse, Paper Trading, Winchester House Hunter and Happening
  appear as engineering studies, a public utility and an open-core case study.
- Private repositories and private-product case studies are not listed.
- No invented user counts, review scores, or performance claims.

The market rationale and page hierarchy are recorded in
[`docs/market-positioning.md`](docs/market-positioning.md).

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
recaptures the public browser applications used by the portfolio.

## Deployment

Pushes to `main` run unit tests, type/build checks, browser tests at desktop and
mobile widths, then deploy the generated `dist/` directory to GitHub Pages.

## Rights

Site code may be reused under the MIT licence. Product names, screenshots, copy
and other brand assets remain copyright © Matthew Paver and are not sublicensed
by the code licence.
