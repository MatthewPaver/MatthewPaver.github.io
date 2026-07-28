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
outcome: The repository loads CSV files into bronze, silver and gold DuckDB layers, trains an example model and serves the results in Streamlit.
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
  - The example model does not represent campaign performance from a live account.
---

This developer-facing project runs locally. The repository includes the sample files, pipeline, quality checks, model and Streamlit dashboard.
