---
title: Winchester Buyer Check
shortTitle: Buyer Check
order: 7
featured: false
kind: flagship
category: Personal finance utility
status: live
tagline: See the real cash and monthly shape of a home purchase.
problem: Headline purchase price and deposit figures hide completion costs, loan-to-value thresholds and the ownership buffer.
outcome: The calculator updates mortgage payment, cash required and term interest without transmitting the buyer's figures.
proof:
  - Browser-local calculations
  - No sign-up
  - No data upload
stack:
  - HTML
  - CSS
  - JavaScript
  - GitHub Pages
image: /assets/apps/winchester.png
imageAlt: Winchester Buyer Check inputs and calculated mortgage, cash and loan-to-value summary
repo: https://github.com/MatthewPaver/winchester-buyer-check
metricsRepo: MatthewPaver/winchester-buyer-check
launch: https://matthewpaver.github.io/winchester-buyer-check/
primaryAction: Open the private calculator
license: Publicly viewable; no open-source licence
version: Public edition
updated: 2026-07-15
requirements:
  - Modern browser
install:
  - git clone https://github.com/MatthewPaver/winchester-buyer-check.git
  - cd winchester-buyer-check
  - python3 -m http.server 8000
validate:
  - Open http://localhost:8000 and change the purchase assumptions
limitations:
  - Illustrative only; not financial, tax, legal or mortgage advice.
  - Transaction tax remains manual because personal circumstances vary.
---

This is the intentionally limited public edition of a larger private property-decision product. The boundary is clear and the useful calculation remains available without an account.
