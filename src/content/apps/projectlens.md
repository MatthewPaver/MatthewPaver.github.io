---
title: ProjectLens
order: 2
featured: true
kind: flagship
portfolioRole: Flagship product
audience: Project controls teams, PMOs and delivery leads
category: Project controls
status: live
shelf: product
tagline: Compare a change pack with its schedule before the board decides.
problem: A change pack can tell a different story from the schedule it cites.
outcome: The review links schedule conflicts to source dates, retrieves cited precedents and records the board's response.
proof:
  - Browser-local XER comparison
  - Findings linked to schedule dates
  - Decision and follow-up record
  - Fail-closed precedent RAG with a Use or Ignore gate
stack:
  - JavaScript
  - Python
  - Primavera P6 XER
  - LangGraph
  - GitHub Pages
image: /assets/apps/projectlens.png
imageAlt: ProjectLens review workspace showing schedule conflicts in the Northstar change pack
repo: https://github.com/MatthewPaver/ProjectLens
metricsRepo: MatthewPaver/ProjectLens
launch: https://matthewpaver.github.io/ProjectLens/change-assurance.html
primaryAction: Open ProjectLens
license: MIT
version: Public demonstrator
since: Apr 2025
updated: 2026-08-11
requirements:
  - Modern browser for the public review
  - Python 3.11 for rebuilding the public dataset
install:
  - git clone https://github.com/MatthewPaver/ProjectLens.git
  - cd ProjectLens
  - python3 -m http.server 8000 --directory docs
validate:
  - make test
limitations:
  - Evidence review does not establish contractual entitlement, causation or a probability of failure.
  - People retain decision authority.
---

The public Northstar review runs in the browser. A separate retrieval path can find similar decisions and draft a cited brief, but the reviewer must choose whether the evidence belongs in the record.
