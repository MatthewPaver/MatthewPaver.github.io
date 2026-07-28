---
title: DecisionGraph
order: 4
featured: false
kind: flagship
portfolioRole: ProjectLens component
audience: Project teams looking for a relevant earlier decision
category: Decision retrieval
status: live
tagline: Find earlier project decisions that resemble the one you are making now.
problem: Teams record project decisions, then struggle to find the useful precedent later.
outcome: DecisionGraph ranks the closest cases and shows the fields behind each match.
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
primaryAction: Open DecisionGraph
license: MIT
version: Public demonstrator
since: Jul 2026
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

Each result lists the fields that produced the match. The sample cases are made
up; an organisation can replace them with its own decision history.
