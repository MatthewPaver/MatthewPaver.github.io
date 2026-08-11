---
title: PolicyLens
order: 1
featured: true
kind: flagship
portfolioRole: Open-source tool
audience: Cloud security reviewers approving AWS IAM changes
category: IAM change review
status: public
shelf: product
tier: supporting
tagline: Turn an IAM policy diff into a cited stop or pass decision.
problem: A policy diff shows changed JSON but does not prove which sensitive request became reachable.
outcome: A reviewer gets a deterministic verdict, source evidence and a correction check before approval.
proof:
  - 23-case IAM semantics benchmark
  - Six adversarial AI grounding evals
  - Correction verifier with required-access regression cases
stack:
  - Node.js
  - AWS IAM
  - AI evals
  - Docker
image: /assets/apps/policylens.png
imageAlt: PolicyLens IAM change review interface
repo: https://github.com/MatthewPaver/iam-policy-auditor
metricsRepo: MatthewPaver/iam-policy-auditor
primaryAction: View source
license: MIT
version: Public repository
since: Jul 2026
updated: 2026-08-11
requirements:
  - Node.js 18 or later
install:
  - git clone https://github.com/MatthewPaver/iam-policy-auditor.git
  - cd iam-policy-auditor
  - npm install
  - npm start
validate:
  - npm test
  - npm run benchmark
  - npm run eval
limitations:
  - Local decision support, not an authorization oracle.
  - SCPs, permission boundaries, session policies and some cross-account interactions remain outside the current model.
---

The deterministic engine decides permission reachability. An optional LLM explains the result, but PolicyLens withholds that explanation when its verdict, claims or citations fail the grounding contract.
