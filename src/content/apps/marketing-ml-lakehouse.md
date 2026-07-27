---
title: Marketing ML Lakehouse
shortTitle: ML Lakehouse
order: 5
featured: false
kind: flagship
category: Data systems
status: public
tagline: Move marketing CSVs through a checked local pipeline into a usable dashboard.
problem: Analytics portfolios often stop at a notebook and omit ingestion, data quality and operational handoff.
outcome: This repository packages bronze, silver and gold DuckDB layers, model training, checks and a Streamlit interface.
proof:
  - End-to-end local pipeline
  - Synthetic sample data
  - Streamlit dashboard
stack:
  - Python
  - DuckDB
  - XGBoost
  - Streamlit
image: /assets/apps/lakehouse.png
imageAvif: /assets/apps/lakehouse.avif
imageAlt: Marketing ML Lakehouse Streamlit dashboard with model and channel performance views
repo: https://github.com/MatthewPaver/marketing-ml-lakehouse
metricsRepo: MatthewPaver/marketing-ml-lakehouse
primaryAction: Inspect the pipeline
license: MIT
version: Main branch
updated: 2026-05-25
requirements:
  - Python 3.11
  - Local browser for Streamlit
install:
  - git clone https://github.com/MatthewPaver/marketing-ml-lakehouse.git
  - cd marketing-ml-lakehouse
  - make install
  - make run
validate:
  - make test
limitations:
  - The included data is demonstrative rather than a production marketing account.
  - Model output is evidence for workflow design, not a campaign-performance claim.
---

This is a developer-facing application rather than a hosted consumer tool. Its value is the complete, reproducible handoff from files to checks, model and interface.
