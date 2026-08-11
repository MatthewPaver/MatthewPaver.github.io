# Matthew Paver portfolio

Source for [matthewpaver.github.io](https://matthewpaver.github.io/), a public portfolio of software, AI evaluation and data engineering work.

The homepage gives hiring managers a short route through three selected projects. The full work page contains seven public projects and three smaller reusable patterns. Private repositories do not appear in either view.

## Source of truth

The deployed site lives in [`store/`](store/). `npm run build` validates its catalogue, copies it to `pages-dist/`, and generates indexable project pages under `/store/apps/<slug>/`.

The `src/` folder contains an earlier Astro catalogue and is not used for deployment. It remains only while the project pages and content collections are being retired or migrated.

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

`npm run metrics` refreshes public GitHub metadata. `npm run screenshots` recaptures public product screenshots.

## Deployment

Pushes to `main` validate the public catalogue, build `pages-dist/`, and deploy that directory to GitHub Pages.

## Rights

Site code may be reused under the MIT licence. Product names, screenshots, copy and brand assets remain copyright © Matthew Paver and are not sublicensed by the code licence.
