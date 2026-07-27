---
title: MeetingProof
order: 2
featured: true
kind: flagship
category: Everyday work
status: live
tagline: Turn meeting notes into a defensible, reviewed follow-up.
problem: Decisions, actions and missing ownership disappear inside ordinary meeting notes.
outcome: MeetingProof links every proposed item to its source line, pauses for human review and exports only the approved record.
proof:
  - Exact source lines
  - LangGraph human interrupt
  - Deterministic release evaluation
stack:
  - JavaScript
  - Python
  - LangGraph
  - Pydantic
image: /assets/apps/meetingproof.png
imageAlt: MeetingProof browser workspace with notes, evidence-linked decisions and an approved follow-up record
repo: https://github.com/MatthewPaver/MeetingProof
metricsRepo: MatthewPaver/MeetingProof
launch: https://matthewpaver.github.io/MeetingProof/
primaryAction: Review the safe example
license: MIT
version: Public demonstrator
updated: 2026-07-20
requirements:
  - Modern browser for the public tool
  - Python 3.11 for the reference workflow
install:
  - git clone https://github.com/MatthewPaver/MeetingProof.git
  - cd MeetingProof
  - python -m pip install -e ".[dev]"
validate:
  - pytest
  - python scripts/evaluate_release.py
limitations:
  - The public parser recognises clearly labelled decisions, actions and questions.
  - It does not infer agreement from ordinary discussion.
---

The public interface runs entirely in the browser. The Python package supplies the inspectable graph, approval boundary and evaluation fixtures for reviewers who want to go deeper.
