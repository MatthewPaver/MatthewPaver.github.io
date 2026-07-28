---
title: Happening
order: 11
featured: false
kind: case-study
category: Event data operations
status: live
tagline: Normalise venue listings into searchable event records with source timestamps.
problem: Venue listings vary in structure, freshness and ticket evidence, making event feeds brittle.
outcome: The private service uses per-venue configurations and freshness checks. The public repository contains the shared schemas, fixtures and benchmarks.
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
primaryAction: Open the evidence workbench
license: MIT open core; private production feed
version: Full open-core browser demo
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

The browser workbench demonstrates the complete public core: normalised events, field-level source evidence, reference-source coverage, an interactive quality gate and the portable event schema.

Happening uses an open-core model. The schemas, fixtures and benchmarks are public under MIT; the production feed, source configurations and operational playbooks remain private.
