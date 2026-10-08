# Matthew Paver portfolio

Source for [matthewpaver.github.io](https://matthewpaver.github.io/), a public portfolio of software, AI evaluation and data engineering work.

The homepage gives hiring managers a short route through three selected projects. The full work page contains seven public projects and three smaller reusable patterns. Private repositories do not appear in either view.

## Source of truth

The deployed site lives in [`store/`](store/). `npm run build` validates its catalogue, copies it to `pages-dist/`, and generates indexable project pages under `/store/apps/<slug>/`.

An earlier Astro catalogue (`src/`), no longer deployed, was removed on 2026-10-08; it is recoverable from git history at commit `e1bfe8a`.

## Work locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4321`.

Run the release checks with:

```bash
npm test
npm run test:e2e
```

## Deployment

Pushes to `main` validate the public catalogue, build `pages-dist/`, and deploy that directory to GitHub Pages.

## Rights

Site code may be reused under the MIT licence. Product names, screenshots, copy and brand assets remain copyright © Matthew Paver and are not sublicensed by the code licence.
