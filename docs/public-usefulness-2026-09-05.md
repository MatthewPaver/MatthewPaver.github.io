# Public usefulness and first-use improvements

## Scope and verdict

Reviewed the seven catalogue projects and three linked templates, including their local README/setup paths, current public GitHub metadata and four public browser applications. This is not a fresh end-to-end audit of every repository on the account. The [earlier readiness checks](repository-readiness-2026-09-05.md) remain relevant; this pass specifically removes onboarding and presentation barriers.

There is useful work here, but it serves different audiences. ProjectLens is the clearest browser utility with a bring-your-own-data path. PolicyLens and the lakehouse have the strongest specialist reuse potential. RAG, streaming and recommendation repositories are useful teaching/reference code. A recorded case study is valuable to a hiring manager without being a supported product for the public. No user-adoption improvement has been measured in this pass.

| Project | Public usefulness | First useful action | Remaining limit |
| --- | --- | --- | --- |
| PolicyLens | Local permission-change review and constrained-AI evaluation for cloud engineers | Run the bundled change and correction example | Partial IAM model; no live AWS oracle validation in this pass; no public hosted service |
| ProjectLens | A single reviewer can compare two Primavera XER exports and keep a decision record | Try Northstar, then compare own files | No delay attribution, team workspace or production connectors; export records to keep them |
| QuickSupply | A concrete Liverpool product-redesign case for workflow/product interviews | Watch one request across three roles | Authentication, dependencies and hydration blockers remain; not a safe staffing-service starter |
| Winchester | An exploratory home-shortlist and evidence-checking example | Filter the seeded homes and inspect a home | No live listings or custom listing feed; public aggregate rebuild still requires the separately held source snapshot |
| Marketing ML Lakehouse | Reusable input checks, table layers and prospective model/baseline evaluation for data engineers | Inspect sample quality checks; rebuild locally for current results | Public browser data is hard-coded snapshot content, not automatically generated from the current pipeline; fixtures do not prove campaign uplift |
| HR Performance Analytics | BI handoff and semantic-correction learning case | Read corrections before inspecting exports | The old PBIX/PDF labels remain incorrect; needs an actual corrected Power BI rebuild before promotion as a reusable dashboard |
| Can England Win It? | A small public interactive experiment and animation example | Change scenarios and play the tournament | Not a validated forecast or reusable commercial product; retained as finished work |
| Sentence similarity / RAG | Retrieval and citation checks before building a document assistant | Run the small offline evaluation | Tiny authored regression set, not an independently measured embedding benchmark |
| PySpark / Kafka | Reference implementation for event validation, quarantine and replay-aware processing | Check Spark with the DataFrame example, then event tests | Python/Java required; broker/replay runtime verification remains outstanding from earlier Docker failure |
| Offline recommender | Learn whether personalisation beats popularity before integrating ranking | Run sample CLI evaluation and recommendation | Three evaluated users and zero lift on the tiny sample; per-user holdout is not a globally prospective evaluation |

## Changes made

- Catalogue: action-oriented introduction, visible setup requirements, direct browser/local/watch actions, optional native first-step help, and plain-language descriptions. Existing category filters, search, private-repository exclusions and case routes are retained.
- Replaced ProjectLens, Winchester and lakehouse thumbnails with fresh captures from their public applications. The lakehouse now shows the actual sample quality screen, not an architecture illustration. All seven card images are contained rather than cropped. Capture source URLs, states and SHA-256 hashes are stored in `store/assets/catalogue-captures.json`.
- Corrected the public Winchester stack to browser JavaScript/HTML/CSS instead of describing the separate full-stack implementation.
- Updated eight repository READMEs with clear first actions and boundaries. The lakehouse walkthrough now distinguishes the fixed public snapshot from the user's local generated output and explains the foreground dashboard process.
- ProjectLens: documented the built-in Python static server as the minimal local route, separated developer/test setup, and aligned the README's workflow badge/link with its existing combined verification/deployment workflow.
- Recommender: added `requirements-cli.txt` and `make install-cli`; sample CLI and tests no longer install notebook/plotting dependencies. The full notebook route remains available. CI uses the lighter path and its dependency cache key.
- Updated six GitHub repository website fields: repaired four obsolete `/MatthewPaver/store/` links and added missing PolicyLens and QuickSupply case links. Those metadata changes are live; code and portfolio edits remain local.

## Verification in this pass

- Portfolio: 5 unit tests and production build passed; 38 browser tests passed with 2 existing viewport-specific skips. New regression tests failed before implementation, then passed for direct actions, requirements, no-JavaScript first steps and full-image containment.
- Public ProjectLens, Winchester, lakehouse and England application URLs returned HTTP 200. Their actual browser states supplied the new screenshots. This verifies availability and the specific captured interactions, not every public feature.
- ProjectLens minimal local-server route: opened without installing project dependencies, ran Northstar and produced 3 blockers with the 73-day narrative discrepancy. The first capture script sampled before rendering finished; adding a wait for the result verified the actual completed state.
- Recommender: new isolated Python 3.11 environment, `make demo` and `make test` passed; 8 tests, a printed recommendation and both baselines reproduced. HitRate@2 was 0.3333 for popularity and SVD, with zero measured lift. `pip check` passed; Jupyter, Matplotlib and Seaborn were absent.
- Catalogue capture pass: 320, 390, 768 and 1440px, light and dark variants; no page errors or horizontal overflow. Native expanded help and screenshot containment inspected. Automated checks do not replace assistive-technology user testing.

## Highest-value next work

1. Generate the public lakehouse console data from the pipeline, with provenance and a freshness marker. This is more valuable than another visual redesign.
2. Clear QuickSupply's known security and browser blockers before promoting reuse as an application.
3. Publish a reproducible Winchester source acquisition/aggregation path and decide whether to support users' own shortlists.
4. Rebuild and re-export HR on Power BI Desktop with corrected meanings; until then, keep it secondary and historical.
5. Publish benchmark results beyond tiny fixtures for the RAG and recommender templates before making model-quality claims.
6. Commit and publish the reviewed local work. GitHub currently does not recognise a published license for PolicyLens or QuickSupply; local license files exist but were not published or altered in this pass. Do not market those as fully packaged open-source starters until the intended licence and release are confirmed.

Impeccable's first-use guidance shaped the direct actions and optional help. The copy review prioritised audience, concrete input/output, setup cost and honest limitations. No private repositories were exposed, no app backend was deployed, and no repository was archived or deleted.
