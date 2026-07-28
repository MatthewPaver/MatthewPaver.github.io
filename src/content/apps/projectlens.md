---
title: ProjectLens
order: 1
featured: true
kind: flagship
portfolioRole: Flagship product
audience: Project controls teams, PMOs and delivery leads
category: Project controls
status: live
tagline: Compare the dates in a change pack with the schedule behind it.
problem: A change pack can tell a different story from the schedule it cites.
outcome: The demo puts three schedule conflicts beside their source dates and lets you record the board's response.
proof:
  - Browser-local XER comparison
  - Findings linked to schedule dates
  - Decision and follow-up record
stack:
  - JavaScript
  - Python
  - Primavera P6 XER
  - GitHub Pages
image: /assets/apps/projectlens.png
imageAlt: ProjectLens review workspace showing schedule conflicts in the Northstar change pack
repo: https://github.com/MatthewPaver/ProjectLens
metricsRepo: MatthewPaver/ProjectLens
launch: https://matthewpaver.github.io/ProjectLens/change-assurance.html
primaryAction: Open ProjectLens
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

The demo uses a made-up Northstar change pack. You can compare its dates, inspect
the conflicts and record a board response without uploading a file.
