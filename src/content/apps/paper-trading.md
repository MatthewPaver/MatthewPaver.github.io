---
title: Paper Trading Research Engine
shortTitle: Paper Trading
order: 6
featured: false
kind: flagship
portfolioRole: Research study
audience: Developers studying reproducible backtests and simulated execution
category: Backtesting research
status: live
tagline: Reproduce a backtest with matched baselines, costs and drawdown checks.
problem: A good-looking backtest can hide a weak benchmark, unrealistic execution or a large drawdown.
outcome: The engine records the benchmark, risk checks, test windows and simulated trades in one report.
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
primaryAction: Open Paper Trading
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

The browser demo shows a made-up walk-forward test, three matched windows, the
risk gate and the decision journal.

The Python package runs the backtests, risk checks, reports and paper-only
execution.
