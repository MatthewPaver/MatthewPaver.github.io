---
title: MeetingProof
order: 2
featured: true
kind: flagship
category: Everyday work
status: live
tagline: Turn labelled meeting notes into an action list you can check before sending.
problem: Decisions, actions and missing ownership disappear inside ordinary meeting notes.
outcome: MeetingProof extracts labelled decisions, actions and questions, shows the source line and waits for approval before export.
proof:
  - Exact source lines
  - Approval step before export
  - Tested parsing fixtures
stack:
  - JavaScript
  - Python
  - LangGraph
  - Pydantic
image: /assets/apps/meetingproof.png
imageAlt: MeetingProof workspace with meeting notes and an editable review list
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

The public interface runs in the browser. The Python package contains the graph workflow and parsing tests used by the release.
