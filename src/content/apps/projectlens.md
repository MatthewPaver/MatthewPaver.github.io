---
title: ProjectLens
order: 1
featured: true
kind: flagship
category: Project assurance
status: live
tagline: Check whether a project board pack is ready to decide.
problem: Board packs, schedules, actions and delivery narratives can disagree at the moment a decision is required.
outcome: ProjectLens exposes the three material blockers, keeps the source evidence visible and records the human decision and follow-up conditions.
proof:
  - Browser-local XER comparison
  - Source-linked findings
  - Human decision record
stack:
  - JavaScript
  - Python
  - Primavera P6 XER
  - GitHub Pages
image: /assets/apps/projectlens.png
imageAvif: /assets/apps/projectlens.avif
imageAlt: ProjectLens change assurance review showing three evidence blockers and the human decision workflow
repo: https://github.com/MatthewPaver/ProjectLens
metricsRepo: MatthewPaver/ProjectLens
launch: https://matthewpaver.github.io/ProjectLens/change-assurance.html
primaryAction: Review the Northstar example
license: MIT
version: Public demonstrator
updated: 2026-07-20
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

ProjectLens is the centre of the public Project Evidence Desk. The browser tool is immediately usable with synthetic schedule evidence, while the repository shows the deterministic comparison and public-data preparation behind it.
