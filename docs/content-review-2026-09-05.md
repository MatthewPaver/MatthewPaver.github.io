# Portfolio content review — 5 September 2026

## Main finding

The previous introduction undersold the professional background by making the independent repositories do all the work. The stronger story is: **an AI solutions architect who also builds and operates the systems**. Career progression, delivery experience and technical judgement establish credibility; public projects provide inspectable examples.

This was a presentation-focused review of the seven catalogue projects, three linked templates and GitHub profile, informed by the supplied CV. It is not a fresh end-to-end production audit of every repository or an independent verification of CV employment claims.

## Changes made locally

- Rewrote the homepage introduction and About section around progression from analyst to data scientist to solutions architect, knowledge graphs, cloud automation, release management, privacy reviews and training.
- Added the Computer Science with AI degree and AWS credentials. Kept the CV near the top.
- Explicitly separated independent project evidence from employer/client delivery. Did not publish unconfirmed current-employer details, internal platform names or business figures.
- Aligned the GitHub profile README with that positioning and corrected its lakehouse, Winchester and HR descriptions.
- Captured actual completed PolicyLens and ProjectLens demo states. PolicyLens now shows the changed-access verdict, statement evidence and correction; ProjectLens shows review questions derived from the synthetic Northstar schedule example. No generated artwork or invented interface data was used.
- Connected both new images to the selected shelf, catalogue and case pages. Preserved complete result images instead of cropping their text. Capture commands and image hashes are in `scripts/capture-project-evidence.mjs` and `store/assets/evidence-captures.json`.
- Explained the lakehouse in plain language and removed repeated README introductions. It checks campaign files and tests next-day predictions against carrying today's figure forward; it does not run someone's advertising account.
- Fixed obsolete portfolio links in QuickSupply, the lakehouse, sentence-similarity and recommender READMEs.
- Replaced PolicyLens's placeholder hosted URL with its actual local demo command and clarified the LAN-binding warning.
- Corrected HR instructions that referred to missing raw CSVs. Distinguished the embedded PBIX data, historical exports and corrected semantic contract.
- Qualified the recommender's evaluation: a per-user latest-interaction holdout is not a global prospective cutoff. The code at `recommender.py:60` supports the narrower description.

## How the work should be presented

| Repository | Its useful role in the portfolio | What a visitor should not infer | Next evidence worth improving |
| --- | --- | --- | --- |
| PolicyLens | Lead AI-engineering case: deterministic access checks, optional explanation, evaluation and a correction loop | That 55 authored cases establish complete AWS equivalence or that AI grants authorization | Publish the AWS simulator cross-check when actually run; surface failure examples alongside agreement figures |
| ProjectLens | Lead architecture case: compare a change narrative with schedule evidence and produce a review handoff | That the synthetic example proves performance on arbitrary client schedules or makes contractual decisions | Show a short walkthrough from a specific contradiction to a sourced question and a recorded human decision |
| QuickSupply | Lead product-delivery case: a Liverpool supply-cover workflow from request to teacher acceptance | That it is a currently operating staffing marketplace | Add a concise design-decision/postmortem narrative; distinguish workflow testing from user validation |
| Marketing ML Lakehouse | Reusable data/ML template and no-setup evidence viewer | That fixture revenue or model scores are campaign uplift, or that the browser rebuilds the pipeline | Lead its next thumbnail/walkthrough with source-quality and baseline evidence, not revenue tiles |
| Winchester buyer check | Personal decision-tool case with a seeded shortlist and real completed-sale context | That the shortlist is a live property feed, or sale context is a valuation | Make the path from buyer preferences to one explainable comparison the centre of the walkthrough |
| HR performance dashboards | Supporting historical Power BI delivery example | That available leave balances measure absence, or old age/tenure labels are valid | Rebuild the PBIX and exports using the corrected field meanings before promoting it as analytical evidence |
| Can England Win It? | A secondary animation/simulation experiment | That entertainment simulations are validated forecasts | Keep the postmortem and modelling assumptions visible; do not make it a lead AI case |
| Sentence similarity / RAG | Reusable retrieval and grounded-answer evaluation lab | That semantic similarity establishes truth or that local fixture tests prove model quality | Surface a versioned public-benchmark report, baseline and contradictory-evidence failures |
| PySpark / Kafka | Supporting streaming-data contract template | That unit tests establish operational reliability of a deployed cluster | Demonstrate broker restart/replay, duplicate handling and recovery with recorded results |
| Dating recommender | Offline ranking/evaluation template | That per-user holdouts are globally leakage-free or establish online user benefit | Add a global temporal cutoff before making prospective claims; show baseline and coverage together |

Do not turn every repository into an app card. Keep three lead cases, the broader public catalogue, and the three explicitly labelled engineering templates. Private work remains excluded. The named university in the About section is education, not a newly exposed university repository; the catalogue guard now distinguishes those cases.

## CV changes to make next

The supplied PDF was used as reference and was not modified.

1. Describe the full progression through data, automation and AI rather than implying all career years were spent doing the same AI role.
2. Confirm the current role and permission to name client/employer work before adding it to the public biography.
3. Separate shipped systems, proposed architecture and independent prototypes. Label estimated opportunity differently from measured realised savings.
4. Replace stale project links and the former same-day lakehouse description. Select two or three projects that support the target role instead of listing every experiment.
5. Rebalance the PDF layout: its dense first page and sparse second page make the strongest experience harder to scan.

## Verification and remaining limits

- `npm test`: four unit tests passed; public catalogue validation and Pages artifact build passed.
- `npm run test:e2e`: 22 passed, two existing viewport-specific skips. Covers navigation, filtering, video controls/recovery, motion, no-JavaScript use and the new uncropped evidence images.
- HR package validator: 11 handoff files validated. This is not a corrected PBIX recomputation.
- Visually inspected desktop, mobile and dark-mode output. Before and after images are retained under `.impeccable/review/landing-2026-09-05`, `cv-content-2026-09-05` and `cv-content-2026-09-05-final`.
- Local Lighthouse: 99 performance; 100 in its scored accessibility, best-practices and SEO categories. Those scores are not a conformance certificate: the experimental visible-label/accessibility-name audit still flags several existing links, and local-server caching/compression differs from deployment.
- No repository visibility changes, deletions, commits or deployment were performed in this content pass. Existing unrelated worktree changes were preserved.

Impeccable's clarify/polish guidance shaped the copy hierarchy and evidence-first thumbnails. Taste guided restraint: the existing warm-paper/rust identity and working video/motion remain; there is no new decorative visual theme or generic AI illustration layer.
