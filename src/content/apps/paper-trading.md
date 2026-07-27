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
outcome: The engine records matched baselines, risk controls, walk-forward validation and paper-only execution.
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
version: v0.1.0 draft
updated: 2026-07-15
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
  - The current public release remains a draft.
---

The engineering is stronger than the product packaging. A versioned public release and a safe report viewer are the remaining steps before non-technical users can use it comfortably.
