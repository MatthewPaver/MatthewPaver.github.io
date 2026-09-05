# Public portfolio readiness — 5 September 2026

## Verdict

The strongest presentation is a personal engineering portfolio with three lead cases, not a store that implies every experiment is a supported commercial app. PolicyLens demonstrates constrained AI and evaluation; ProjectLens demonstrates evidence-led review and architecture; QuickSupply demonstrates a complete product workflow. The lakehouse is the strongest supporting data-engineering template.

All **seven catalogue projects and three linked templates** received local run checks. This is not a claim that every repository on the GitHub account has been audited, that every optional integration works, or that all ten projects are production-ready. QuickSupply has release blockers. HR and Kafka have platform/environment verification gaps.

## How these checks were isolated

- Tested copies of the current public-repository worktrees, including their existing uncommitted changes. These are not fresh clones of published GitHub HEADs.
- Excluded real environment files, existing databases, ignored dependencies and symlinks from the copies. Migrations, seeds, model outputs and generated screenshots were written only to temporary test copies.
- QuickSupply and the England app received fresh lockfile-based Node installs. Sentence RAG's new minimal evaluation route received a fresh Python 3.11 virtual environment.
- ProjectLens, the lakehouse, recommender and Spark checks reused existing Python environments against the copied source. Their results establish local runnable paths, not independent clean-environment installation on every platform.
- No private repositories were added to the portfolio, no visibility settings changed, and no external service was deployed.

## Results and portfolio placement

| Public repository | What actually ran | Result and boundary | Recommended placement |
| --- | --- | --- | --- |
| `iam-policy-auditor` / PolicyLens | `npm test`, `npm run benchmark`, `npm run eval` | Test suites passed; 55/55 authored correctness cases and 6/6 offline adversarial outcomes. No live AWS simulator or paid-model evaluation was run. This demonstrates a tested boundary, not complete AWS equivalence. | Lead AI-engineering case |
| `ProjectLens` | `python -m pytest Processing/tests -q`; `python scripts/run_browser_tests.py` | 36 unit tests and four browser suites passed, covering the public demo, board readiness, change assurance and XER review, including mobile and exports. Public GMPP evidence and the synthetic schedule demonstration remain distinct. | Lead architecture/review case |
| `QuickSupply` | Fresh frozen pnpm install; unit tests; TypeScript; migrations; seed; production build; route checker; browser landing | 33 tests passed, build passed, and 19 route requests returned 200. Browser rendered but reported React hydration error 418. Demo sign-in remains enabled server-side when its UI flag is off. Dependency audit also reports unresolved high-severity advisories. **Local fictional-data case study only; not cleared for internet-facing service deployment.** | Lead recorded product case, with explicit limits |
| `winchester-buyer-check` | Node tests; `tests/smoke.py` against a local static server | Six assertions/tests passed and one source-snapshot comparison is now explicitly skipped when the separately held input is absent. Desktop/mobile workflows, nine seeded homes and market filters worked. The shipped aggregate reconciles 2,122 included sales from 2,389 source records. The public clone alone cannot regenerate that aggregate from the current source path. | Supporting personal decision tool |
| `marketing-ml-lakehouse` | `python -m lakehouse.run_all`; 16 tests; Streamlit opened and all four tabs checked | Pipeline and tests passed; dashboard showed no browser or Streamlit exceptions. Data checks surfaced five duplicate campaign/day rows. Next-day model/baseline artefacts were reproduced on bundled fixtures. No claim of advertising uplift or new GA4 BigQuery execution. | Prominent reusable data/ML template |
| `hr-performance-dashboards` | `node scripts/validate-package.mjs` | Eleven handoff files validated. Power BI Desktop was not available on this Mac, so no PBIX refresh or corrected export was verified. Historical leave/age/tenure interpretation must not be presented as newly validated analysis. | Secondary historical BI handoff |
| `can-england-win-it` | Fresh `npm ci`; `npm test`; `npm run build`; Vite preview in Chromium | Six tests and production build passed; page loaded without page errors or horizontal overflow. This pass did not verify every animation/share interaction. Dependency audit flags two high and one moderate build-tool packages; no production prediction accuracy established. | Finished animation/simulation experiment |
| `sentence-similarity-analysis` | New minimal evaluation install; `make test PYTHON=.venv/bin/python` | Eleven tests and four-case lexical regression passed. Recall 1.0, MRR 0.875 on this tiny authored set; not a transformer benchmark. No PyTorch/model download, BEIR download or full notebook execution in this pass. | Retrieval/evaluation template |
| `pyspark-kafka-streaming` | Tests with matching driver/worker Python; `make dataframe VENV=…` | Two tests passed and the Spark DataFrame example ran under Java 17/PySpark 3.5.8. Docker returned a daemon/API 500 error; the Kafka broker, replay and restart paths were not exercised. | Streaming template, broker verification outstanding |
| `dating-app-recommendation-system` | Seven tests; CLI evaluation at k=2; recommendation command | Commands passed. Three evaluated users, one known holdout and one hit: SVD matched popularity at hit rate 0.3333, with zero measured lift. Per-user holdout is not a global prospective split. Useful evaluation scaffold, not evidence of a better dating experience. | Supporting ranking/evaluation template |

## Fixes made in this pass

1. **QuickSupply installation:** pinned pnpm 10.34.5 and Node 22, declared the workspace root, documented a frozen install and safe demo seeding. An older global pnpm previously rejected the workspace configuration. Added unit tests to CI and made CI use the package-manager pin. Existing unrelated workflow edits were preserved.
2. **QuickSupply warnings:** corrected the implication that switching off the demo UI is sufficient for real users. The authentication implementation itself was not changed: the security skill requires explicit approval for that change, which was requested separately.
3. **Sentence RAG:** separated a two-dependency evaluation requirements file from the much larger notebook/model stack. A new user can now run the small regression suite without installing PyTorch or downloading a model. Tested that path from a new Python environment.
4. **Winchester:** replaced a silently passing missing-source test with an explicit skip. Split public address-field checks into a separate test that always runs. Documented browser prerequisites and the non-public aggregate-rebuild dependency.
5. **Spark:** documented Python 3.11 and Java 17, the matching driver/worker path and the distinction between the local DataFrame example and optional Docker broker. Removed misleading instructions to configure separately installed Spark/Kafka paths.
6. **Portfolio installability:** corrected the web-app manifest's obsolete `/MatthewPaver/store/` start path and scope to `/`, with a regression test.
7. **Portfolio dependency:** updated only `fast-uri` from 3.1.5 to 3.1.7 within the existing dependency range, after reviewing the maintainer's security release. Lockfile diff was limited to that package; native npm audit then reported zero known vulnerabilities. This package is in the Astro checking toolchain, not the static browser app. [Release notes](https://github.com/fastify/fast-uri/releases/tag/v3.1.7).

## Remaining release blockers and follow-up

### QuickSupply — do not deploy as a real service yet

The route smoke test succeeding with the demo flag unset helped expose a security defect rather than proving deployment readiness. The next change must deny demo-session creation unless explicitly enabled, test both states, and ensure CI opts into demo mode only for fictional fixtures. Authentication changes are awaiting the owner's approval.

The installed production dependency tree reported 34 high, 23 moderate and four low advisory entries; these counts are not counts of independently exploitable application vulnerabilities. The pinned Next.js 16.1.6 is among the affected packages. App Router/Server Actions advisories matter to this architecture; other findings need reachability checks. Upgrade the framework and related tooling in small verified changes, then rerun unit, route and actual workflow/browser tests. A successful build is not clearance. [Next.js security release](https://github.com/vercel/next.js/releases/tag/v16.2.11).

Also investigate the observed production hydration error. The existing route checker checks HTTP responses, not all browser behaviour or the complete create-request → offer → acceptance flow.

### Supporting projects

- **Winchester:** publish a source acquisition/rebuild route with the same filters and checksum lineage before claiming public end-to-end data reproducibility. The current browser tool can still be used with its committed aggregate and clearly labelled seeded homes.
- **HR:** rebuild the PBIX and PDF on Power BI Desktop using the corrected semantic contract before elevating this beyond a historical handoff example.
- **Kafka:** rerun broker, producer, consumer, replay and restart checks when the local Docker daemon is healthy. No user containers or Docker settings were changed.
- **England:** review/update the Browserslist, Nano ID and PostCSS toolchain findings before the next build/release. Their reported vulnerable paths concern query/stats handling, custom generation and CSS processing; no public-server reachability was established in this static-app check. Review due before the next release or 12 September 2026, whichever comes first.
- **Model templates:** publish held-out public-benchmark results before promoting model quality, prospective benefit or business uplift. Running authored fixtures is necessary but insufficient.

## Enterprise landing-page changes

The [Projecting Success site](https://projectingsuccess.co.uk/) supplied the navy `#1c3762` and cyan `#00adf1` reference. The portfolio keeps Matthew's name, CV, real project media and independent-work boundaries; no logo, endorsement or client claims were copied.

- Navy introduction area; cyan emphasis and primary action; cool-white reading/catalogue surfaces.
- Dark navy text on the cyan button, and darker blue body links for readable contrast.
- Coherent dark mode, recoloured MP/app icons and route theme metadata.
- Kept user-initiated video, project switching, pausable source-path animation and reduced-motion/no-JavaScript fallbacks.
- Kept real screenshots and visible project limitations rather than adding decorative AI artwork or inflated counters.

Impeccable's colour/polish guidance and Taste's restraint informed this adaptation. A first visual pass caught a low-contrast catalogue link on the navy hero; it was fixed with a failing-then-passing contrast regression test.

## Portfolio verification

- `npm test`: five unit tests, seven-project/three-template validation and static Pages build passed.
- `npm run test:e2e`: 24 passed; two existing viewport-specific skips. Covers project navigation, catalogue search/filtering, media controls, failures, no-JavaScript use, reduced motion, mobile layout and explicit link/button contrast in both themes.
- `npm audit`: zero known advisories after the targeted toolchain patch. Not a security certification.
- Desktop, mobile and dark-theme captures retained under `.impeccable/review/enterprise-2026-09-05-final/` for the final visual review.
- Final visual review confirmed the navy/cyan hierarchy, readable hero links and preserved project evidence at desktop/mobile sizes. Local Lighthouse scored 99 performance and 100 in its scored accessibility, best-practices and SEO categories. Its experimental visible-label/accessibility-name check still flags existing links; this is not a WCAG conformance claim. Local caching/compression also differs from GitHub Pages.

All changes remain local and uncommitted. The GitHub Pages site has not been updated by this pass.
