---
title: DecisionGraph
order: 4
featured: true
kind: flagship
category: Decision memory
status: live
tagline: Retrieve what happened last time before approving the next change.
problem: Project outcomes are documented but rarely retrieved when a comparable decision appears.
outcome: DecisionGraph returns inspectable precedents, explains the match and keeps the intervention and measured outcome together.
proof:
  - 16 synthetic cases
  - Deterministic retrieval
  - Visible match rationale
stack:
  - JavaScript
  - HTML
  - Information retrieval
  - Knowledge graphs
image: /assets/apps/decisiongraph.png
imageAvif: /assets/apps/decisiongraph.avif
imageAlt: DecisionGraph decision desk showing comparable project cases, match evidence and observed outcomes
repo: https://github.com/MatthewPaver/DecisionGraph
metricsRepo: MatthewPaver/DecisionGraph
launch: https://matthewpaver.github.io/DecisionGraph/
primaryAction: Search decision memory
license: MIT
version: Public demonstrator
updated: 2026-07-20
requirements:
  - Modern browser
  - Python only if serving locally
install:
  - git clone https://github.com/MatthewPaver/DecisionGraph.git
  - cd DecisionGraph
  - python3 -m http.server 4173 --directory docs
validate:
  - node --check docs/app.js
  - python3 -m unittest discover tests
limitations:
  - The public cases are synthetic demonstrations, not customer outcomes.
  - Retrieval supports a person; it does not approve a change.
---

DecisionGraph is useful because it shows its workings. A reviewer can see why each precedent was selected instead of receiving an unexplained recommendation.
