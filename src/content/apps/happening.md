---
title: Happening
order: 11
featured: false
kind: case-study
portfolioRole: Open-core case study
audience: Developers building local-event feeds from inconsistent venue sources
category: Event data
status: live
shelf: automation
tagline: Turn inconsistent venue listings into event records that can be traced back to source.
problem: Every venue publishes different fields, dates and ticket links.
outcome: The public repository contains the event schema, sample sources and checks used by the private feed.
proof:
  - 103+ source configurations
  - 167 reliability tests
  - MIT open core
stack:
  - Python
  - Playwright
  - SQLite
  - Pydantic
image: /assets/apps/happening.png
imageAlt: Happening evidence workbench showing normalised Examplechester events and field-level source coverage
launch: https://matthewpaver.github.io/happening-open-core/
repo: https://github.com/MatthewPaver/happening-open-core
metricsRepo: MatthewPaver/happening-open-core
primaryAction: Open Happening
license: MIT open core; private production feed
version: Full open-core browser demo
since: Jul 2026
updated: 2026-07-28
requirements:
  - Python 3.11 for the public benchmark
install:
  - git clone https://github.com/MatthewPaver/happening-open-core.git
  - cd happening-open-core
  - python -m pip install -e ".[test]"
validate:
  - pytest
limitations:
  - The production ingestion feed and data operations are private.
  - The public workbench uses two synthetic Examplechester events and three example sources.
---

The browser demo contains two made-up events and shows the source behind each
field. It also runs the same quality checks as the public Python package.

The schema, fixtures and tests are public under MIT. The production feed and its
venue configurations are private.
