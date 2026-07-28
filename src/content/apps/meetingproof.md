---
title: MeetingProof
order: 2
featured: true
kind: flagship
portfolioRole: Flagship product
audience: Project teams and operations leads responsible for the follow-up
category: Meeting follow-up
status: live
tagline: Paste in meeting notes, check the actions and export the agreed follow-up.
problem: Actions and decisions are easy to miss once a meeting disappears into a page of notes.
outcome: The demo finds labelled decisions, actions and questions, then keeps each item beside its source line while you review it.
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
primaryAction: Open MeetingProof
license: MIT
version: Public demonstrator
since: Jul 2026
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

The demo runs in the browser. The Python package contains the graph workflow and
the parsing tests used for each release.
