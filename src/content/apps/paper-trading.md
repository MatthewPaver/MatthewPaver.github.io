---
title: Paper Trading Research Engine
shortTitle: Paper Trading
order: 6
featured: false
kind: flagship
category: Quantitative research
status: public
tagline: Reproduce a strategy result before trusting the chart.
problem: Trading demonstrations often hide benchmark choice, execution assumptions and downside behaviour.
outcome: The engine records its benchmark, risk controls, walk-forward windows and simulated trades in one report.
proof:
  - Reproducible backtests
  - Risk and drawdown controls
  - Simulation-only default
stack:
  - Python
  - pandas
  - XGBoost
  - GitHub Actions
image: /assets/apps/paper-trading.png
imageAlt: Paper Trading Research Engine benchmark report with return, baseline and drawdown evidence
repo: https://github.com/MatthewPaver/paper-trading-bot
metricsRepo: MatthewPaver/paper-trading-bot
primaryAction: Inspect the research engine
license: MIT
version: v0.1.0
updated: 2026-07-28
requirements:
  - Python 3.11
  - No brokerage account for the default simulation
install:
  - git clone https://github.com/MatthewPaver/paper-trading-bot.git
  - cd paper-trading-bot
  - python3 -m venv .venv
  - .venv/bin/pip install -e ".[dev]"
validate:
  - PYTHONPATH=. pytest tests/ -v
  - python cli.py backtest --tier 1
limitations:
  - This is research and paper trading only, not investment advice or a live-trading promise.
  - Results depend on historical data, benchmark choice and explicit execution assumptions.
---

The first versioned release packages the reproducible benchmark, risk controls,
walk-forward evaluation and paper-only execution path. The repository's
three-minute demo uses fixtures so the evidence report can be reviewed without
downloading market data or presenting fixture numbers as real performance.
