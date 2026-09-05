# Catalogue thumbnail refresh

## What changed

The `/work/` catalogue now uses a shared 16:10 cover system across its seven public projects. It preserves the existing typography, navy identity, copy, filtering, direct actions and honest limitations. No repository visibility, release or deployment was changed.

QuickSupply, Winchester and ProjectLens were prototyped first using contextual stock photography behind the actual application capture. The three were reviewed in the running catalogue on desktop and mobile before extending the framing to the other four projects.

The comparison favoured a restrained combination: photographs help distinguish education, housing and construction, while the real screen explains what Matthew built. An initial pale frame created unwanted bars around the dark screens; the final version follows each screenshot's natural proportions instead. It does not fabricate browser chrome, use AI-generated interfaces or replace product evidence with a photograph.

PolicyLens, Marketing ML Lakehouse, HR Performance Analytics and Can England Win It use the same reserved stage with solid colours drawn from their actual interfaces. Unrelated server-room, office or abstract AI photographs would add little meaning to those projects. Their real screens remain the subject. This is a catalogue presentation change, not a claim that an old dashboard or local-only extension has become production-ready.

Impeccable and Taste guided preservation of the existing visual identity, real evidence, accessible fallbacks and a bounded desktop/mobile review. No new animation, JavaScript or framework was added for the covers.

## Sizing and loading fixes

- Every cover reserves its 16:10 layout before images arrive.
- Actual screens use their intrinsic proportions, `object-fit: contain` and bounded dimensions. Only decorative photography uses `cover` cropping.
- QuickSupply's AVIF is 800 × 506, not the previously declared 1200-pixel candidate. HR's AVIF is 800 × 463, not 1360 pixels. Both single-source AVIF declarations now have their actual dimensions; the PNG fallback dimensions remain accurate.
- The England PNG is 1200 × 630, not 1200 × 675.
- The catalogue reserves the filter controls' geometry while their module loads, removing the measured 163px desktop jump. They remain hidden from interaction until ready; without JavaScript, all projects and native first-step disclosures remain available.
- Existing self-hosted fonts are preloaded. The mobile brand's accessible name now includes the visible “MP” text.
- Full-size case images, landing media and recordings remain unchanged.

## Photography provenance

The three local JPEG files total 493,191 bytes (about 482 KiB). They are loaded lazily and do not create third-party image requests. Authors, source URLs, dimensions and context are recorded in `store/assets/photography/sources.json`. The catalogue's “Photography & screen captures” disclosure was subsequently removed at Matthew's request; the source metadata remains.

- Classroom: Ivan Aleksic, Museum of Yugoslavia in Belgrade; not a Liverpool client site.
- Houses: Rohan Gangopadhyay; not live listings or homes in the Winchester demo.
- Cranes: Johannes Weckström, Hamburg; not a delivered client project or the synthetic Northstar example.

Sources are used under the [Unsplash License](https://unsplash.com/license), checked on 5 September 2026.

## Verification

- `npm test`: nine unit tests and the catalogue/Pages build pass.
- `npm run test:e2e -- --workers=2`: 98 pass, two existing skips.
- Coverage includes all seven real screens, 320/390/768/1280px widths, natural proportions, photo failures, no JavaScript, reduced motion, all case routes and filter-state preservation.
- A new delayed-module test reproduced the filter jump before the fix and passes afterward.
- One initial all-case image check timed out during a concurrent screenshot/Lighthouse run; the isolated test and subsequent complete suite both pass without changing that test or the case-page code.
- The desktop, mobile and dark-mode capture batch reported no browser exceptions or horizontal overflow. Captures are in `.impeccable/review/catalogue-covers-2026-09-05/`.
- Final local mobile Lighthouse: performance 89, accessibility 100, best practices 100, SEO 100. Layout shift fell from 0.214 to 0. The 3.8s simulated largest-contentful-paint result still leaves image-delivery work; this local Python server also lacks production compression/cache headers. These are lab results, not real-user performance guarantees. Reports are `.impeccable/review/catalogue-covers-lighthouse.json` and `catalogue-covers-lighthouse-final.json`.
- `git diff --check` passes.

Use `scripts/capture-catalogue-covers.py --help` to repeat the actual-browser captures. It requires Python Playwright and an installed Chromium; `--browser` can select an existing executable without downloading another browser.

The local Pages artifact has been rebuilt. No commit, push or deployment was performed for this thumbnail request.
