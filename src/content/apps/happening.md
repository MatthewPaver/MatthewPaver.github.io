---
title: Happening
order: 11
featured: false
kind: case-study
category: Event data operations
status: private
tagline: Turn inconsistent venue pages into evidence-aware event records.
problem: Venue listings vary in structure, freshness and ticket evidence, making event feeds brittle.
outcome: The private ingestion system uses source configurations and reliability checks; the public open core exposes generic schemas and coverage benchmarks.
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
imageAlt: Happening event discovery interface with a list and map backed by evidence-aware event records
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

This resolves the previous contradiction: Happening is an open-core product. The reusable evidence contract is public under MIT; the operating feed and source management remain private.
