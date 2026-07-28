---
title: Can England Win It?
shortTitle: England Sim
order: 8
featured: false
kind: flagship
portfolioRole: Engineering study
audience: Anyone curious how tournament probability models are built and closed out
category: Product close-out
status: live
tagline: A time-boxed World Cup probability experiment, archived with a written postmortem.
problem: Topical products need shipping before the moment passes, then an honest close-out when it does.
outcome: A transparent Monte Carlo scenario tool, shipped before the semi-final and archived with the completed result and a postmortem.
proof:
  - Seeded 10,000-run Monte Carlo model
  - Assumptions and formula published
  - POSTMORTEM.md close-out
stack:
  - TypeScript
  - Vite
  - Vitest
  - GitHub Pages
image: /assets/apps/can-england-win-it.png
imageAlt: Can England Win It interactive World Cup probability retrospective
launch: https://matthewpaver.github.io/can-england-win-it/
repo: https://github.com/MatthewPaver/can-england-win-it
metricsRepo: MatthewPaver/can-england-win-it
primaryAction: Explore the retrospective
license: MIT
version: Archived
since: Jul 2026
updated: 2026-07-28
requirements:
  - Node 20
install:
  - git clone https://github.com/MatthewPaver/can-england-win-it.git
  - cd can-england-win-it
  - npm install
  - npm run dev
validate:
  - npx vitest run
limitations:
  - A scenario tool, not a forecast — the assumptions are deliberately simple and editable.
  - Entertainment boosts are labelled as such and excluded from the headline model.
  - Archived after the tournament; the repository is read-only by intent.
---

Built in a day before England's 2026 semi-final, closed out after the final with
the completed result shown and a postmortem on what the time-box allowed.

The model is isolated in one module with its formula published, so every
probability on screen can be traced to an assumption you can change.
