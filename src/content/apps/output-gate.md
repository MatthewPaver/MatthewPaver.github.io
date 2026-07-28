---
title: Output Gate
order: 3
featured: true
kind: flagship
portfolioRole: Open-source tool
audience: Developers maintaining prompts, agents or generated customer content
category: AI output testing
status: live
tagline: Check generated text for required wording and claims that must not appear.
problem: A prompt or model change can remove required wording or add a claim you have already ruled out.
outcome: Output Gate runs the same phrase checks in the browser or CI and saves the result as JSON.
proof:
  - No model call
  - Browser and CLI
  - Passing public CI
stack:
  - Python
  - JavaScript
  - GitHub Actions
  - JSON
image: /assets/apps/output-gate.png
imageAlt: Output Gate workbench showing required phrases, forbidden claims and a passing regression result
repo: https://github.com/MatthewPaver/ai-workflow-evaluator
metricsRepo: MatthewPaver/ai-workflow-evaluator
launch: https://matthewpaver.github.io/ai-workflow-evaluator/app/
primaryAction: Open Output Gate
license: MIT
version: Main branch
updated: 2026-07-15
requirements:
  - No account or API key for the browser tool
  - Python 3.11 for the CLI
install:
  - git clone https://github.com/MatthewPaver/ai-workflow-evaluator.git
  - cd ai-workflow-evaluator
  - python3 -m pip install -e .
validate:
  - python3 -m evaluator.cli examples/sample-suite.json --fail-on-block
limitations:
  - Phrase checks do not establish factual accuracy.
  - Phrase checks cannot handle every valid variation in wording.
---

Use it when a saved response must include known wording or avoid a banned claim.
It does not judge meaning or factual accuracy.
