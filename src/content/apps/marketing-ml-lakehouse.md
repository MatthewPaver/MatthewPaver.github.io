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
shelf: data-ml
tagline: Rebuild a marketing dataset from source contracts to model output.
problem: A notebook can hide the source contracts, lineage and data checks needed to reproduce an analysis.
outcome: The template records source checksums, builds Bronze, Silver and Gold tables, trains an example model and serves the evidence.
proof:
  - Source contracts and checksum lineage
  - Full local rebuild with 13 checks
  - Optional public GA4 ecommerce profile
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
since: Oct 2025
updated: 2026-08-11
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
