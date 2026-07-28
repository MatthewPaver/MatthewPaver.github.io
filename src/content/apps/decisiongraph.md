---
title: DecisionGraph
order: 4
featured: true
kind: flagship
category: Decision memory
status: live
tagline: Find previous project decisions that match the change in front of you.
problem: Project outcomes are documented but rarely retrieved when a comparable decision appears.
outcome: DecisionGraph ranks comparable cases, shows the matching fields and keeps each intervention beside its recorded outcome.
proof:
  - 16 sample cases
  - Rule-based retrieval
  - Visible matching fields
stack:
  - JavaScript
  - HTML
  - Information retrieval
  - Knowledge graphs
image: /assets/apps/decisiongraph.png
imageAlt: DecisionGraph workspace showing a relationship map and three comparable project decisions
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

Each result lists the fields that produced the match. The sample case library is synthetic and can be replaced with an organisation's own decision history.
