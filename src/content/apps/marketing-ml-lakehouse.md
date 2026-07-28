---
title: Marketing ML Lakehouse
shortTitle: ML Lakehouse
order: 5
featured: false
kind: flagship
category: Data systems
status: live
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
imageAlt: Marketing ML Lakehouse evidence console showing campaign revenue, spend, ROAS and pacing watchlist
launch: https://matthewpaver.github.io/marketing-ml-lakehouse/
repo: https://github.com/MatthewPaver/marketing-ml-lakehouse
metricsRepo: MatthewPaver/marketing-ml-lakehouse
primaryAction: Open the evidence console
license: MIT
version: Full browser demo + local engine
updated: 2026-07-28
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
  - The browser console reviews the committed fixture; DuckDB rebuilds and XGBoost training run locally.
---

The no-setup evidence console exposes campaign comparison, pacing scenarios, deterministic data-quality checks and lineage using aggregates from the committed CSV fixtures.

The repository remains the canonical runnable engine: it rebuilds the DuckDB bronze, silver and gold layers, trains the models and serves the Streamlit dashboard locally.
