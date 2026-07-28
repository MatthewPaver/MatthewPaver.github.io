---
title: Happening
order: 11
featured: false
kind: case-study
category: Event data operations
status: private
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
imageAlt: Happening event discovery interface with a London list and map
repo: https://github.com/MatthewPaver/happening-open-core
metricsRepo: MatthewPaver/happening-open-core
primaryAction: Inspect the open core
license: MIT open core; private production feed
version: Open-core benchmark
updated: 2026-07-15
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
  - The public repository contains generic schemas, fixtures and benchmarks only.
---

Happening uses an open-core model. The schemas, fixtures and benchmarks are public under MIT. The production feed and source management remain private.
