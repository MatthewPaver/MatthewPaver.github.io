# Portfolio critique implementation — 5 September 2026

Implemented against `.impeccable/critique/2026-09-05T01-30-07Z__store-work-index-html.md`.

Scope: the homepage, `/work/`, seven query-based case pages and all 17 generated detail URL variants. Changes are local; no commit, push, deployment or other repository publication was performed. Existing unrelated worktree changes were preserved.

## What changed

| Critique | Implementation |
| --- | --- |
| Abstract results and generic limits | Every catalogue card now names one observable action/result and a practical boundary. Each case explains the problem, design choice, observed output and learning. Removed the homepage's unqualified 55/55 claim. |
| Mismatched public handoffs | PolicyLens links to the real public quick-start heading and benchmark directory. Local change-review, lakehouse and RAG extensions are explicitly distinguished from published examples. Pattern names and instructions reflect their public READMEs. |
| HR corrections missing at the destination | The portfolio case itself explains why SickLeaveHours is a balance, not annual absence, and ModifiedDate is not a birth/hire date. The primary catalogue action leads to this correction before historical files. The unrevised exports are clearly marked. |
| Cropped media and colliding headings | Detail images use intrinsic dimensions and uncropped natural proportions, with full-size links. Videos have a separate contained frame. Titles fit their columns; mobile layouts stack. |
| Too much classification and lost context | Action-led modes precede a secondary subject filter. Search includes patterns. URL state preserves mode, subject and query across refresh, browser Back and the explicit All work return. Clear filters and Patterns navigation escape incompatible filters. |
| Homepage route mismatch | Data and ML includes Lakehouse, HR and all three patterns. Product workflows names QuickSupply and Winchester, matching its results. |
| Unclear Method order | Six checks are a semantic ordered list in row-major visual order, with a single vertical sequence on mobile. Each scenario updates its evidence links and states where an extension is local-only. Existing restrained motion is retained. |
| Incorrect profile destination | Preview navigation links to the GitHub profile, not the profile repository. |
| Fetch failures treated as unknown projects | Separate loading, retryable connection/data failure and unknown-project states. Known cases offer a static fallback. Return destinations are restricted to the same-origin catalogue. |
| Missing no-JavaScript and recording handoffs | Query-page fallback links to all seven complete static cases. Static QuickSupply and England pages include their recordings and local preview links. Case pages include a text walkthrough, download link and media retry path. |
| QuickSupply case-only alias risk | Both aliases generate identical content with the lowercase canonical. The build still retains all 17 URLs. |
| Deep-link timing | Correction/recording fragments are restored after asynchronous case content loads, including a deliberately delayed fetch. |

Impeccable's clarify, distill, onboard, adapt, harden and polish guidance informed this pass. The existing Manrope landing, Newsreader catalogue/details, navy/cyan palette and real media were preserved. No new stock art, generated interface illustrations, dependencies or decorative animation were introduced. `DESIGN.md` records the revised catalogue and detail patterns.

## Verification

- `npm test`: 8 unit tests passed; build validated seven public projects, seven preview records and three patterns, then generated 17 detail routes.
- `npm run test:e2e -- --workers=4`: 90 passed, 2 intentionally skipped for the non-applicable device project; no failures.
- Independent regression tests initially reproduced 36 failures against the previous artifact. The resulting suite covers filters/return state, screenshots, internal title clipping, retry states, unsafe return URLs, no-JavaScript pages and generated recordings. Further tests cover Method evidence/order, delayed correction anchors, all cases at 320px/768px and text/action contrast in both themes.
- Native in-app browser checks: desktop catalogue and HR detail; 390px catalogue and QuickSupply; desktop Method and its scenario structure. The compact mobile header and clear-filter placement were corrected after inspection.
- Read-only public handoff checks: 23 referenced project/profile/CV/demo URLs returned HTTP 200. GitHub README headings and benchmark/Northstar paths were inspected separately; HTTP status alone does not validate a fragment or prove a repo is runnable.
- `npm audit --omit=dev`: zero reported vulnerabilities.
- `git diff --check` and syntax checks for the changed JavaScript/build files passed.

This is Chromium-based functional coverage with representative native visual checks, not a new numerical Impeccable score, a full screen-reader audit or a guarantee of identical rendering in every browser. Videos were checked for loading/playback, not watched end to end in this implementation pass. No packages from the linked project repositories were installed or run.

## Publication boundaries that remain deliberate

The critique allowed either coordinated publication or temporarily accurate descriptions. This pass uses accurate descriptions; it does not silently publish other repositories.

- **PolicyLens:** the captured local change-review extension is newer than the public Org demo. A full AWS simulator cross-check is still incomplete.
- **Lakehouse:** the public quality console is fixed and its Python walkthrough trains an earlier model. The prospective next-day evaluation and GA4 adapter remain local extensions.
- **Sentence similarity:** the published notebook is available; the newer RAG evaluation work is not yet the public first-use path.
- **HR:** the correction is now present in both portfolio case variants. The public README and original PBIX/PDF exports still require a reviewed rebuild/publication.

These are visible limitations beside the relevant actions, not hidden under the technology stack. Changing them requires reviewing and releasing those repositories separately.
