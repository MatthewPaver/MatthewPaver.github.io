---
title: Paper Trading Research Engine
shortTitle: Paper Trading
order: 6
featured: false
kind: flagship
category: Quantitative research
status: live
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
imageAlt: Paper Trading research console showing the synthetic strategy verdict, matched baseline and drawdown evidence
launch: https://matthewpaver.github.io/paper-trading-bot/
repo: https://github.com/MatthewPaver/paper-trading-bot
metricsRepo: MatthewPaver/paper-trading-bot
primaryAction: Open the research console
license: MIT
version: Full browser demo + v0.1.0 engine
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
  - The public browser console uses an explicitly synthetic fixture, not market evidence.
---

The no-setup research console exposes the synthetic walk-forward benchmark, its
three matched test windows, the documented risk gate, a seeded decision journal
and the complete provenance bundle.

The versioned Python engine remains the canonical path for reproducible
backtests, risk controls, reports and paper-only execution.
