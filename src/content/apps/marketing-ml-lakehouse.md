---
title: Marketing ML Lakehouse
shortTitle: ML Lakehouse
order: 5
featured: false
kind: flagship
portfolioRole: Engineering study
audience: Data engineers reviewing a local marketing analytics pipeline
category: Marketing data
status: live
tagline: Run a local marketing pipeline from raw CSV files to a scored campaign dashboard.
problem: A notebook can hide the ingestion and data-quality work needed to reproduce an analysis.
outcome: The repository loads CSV files into DuckDB, trains an example model and serves the results in Streamlit.
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
primaryAction: Open ML Lakehouse
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

The browser demo uses aggregates from the sample CSV files to show campaign
comparison, pacing, data checks and lineage.

Run the repository locally to rebuild the DuckDB layers, train the example model
and open the Streamlit dashboard.
