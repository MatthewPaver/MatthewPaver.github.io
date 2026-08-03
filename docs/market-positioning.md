# Market positioning and portfolio structure

*Research snapshot: 28 July 2026*

## Decision

Present this site as Matthew Paver's software portfolio. Introduce Matthew
briefly, then show ProjectLens and Output Gate as the first two
projects. Put the other five projects in a smaller archive.

The visitor-facing copy should describe the work without turning the projects
into one product family.

## Why the app-store model does not fit

Raycast Store serves Raycast users who install extensions. GitHub Marketplace serves developers who add tools to GitHub workflows. Sindre Sorhus's catalogue serves Apple users who download focused utilities. Each store has a shared audience and repeated action.

This portfolio covers several markets and several types of work. A personal
introduction and a simple project hierarchy are more honest than store filters
or a shared product manifesto.

## Market evidence

### ProjectLens

Oracle Primavera Cloud includes a schedule-health checker. Deltek Acumen Fuse sells schedule diagnostics and forensic comparison to schedulers, planners and PMOs. These products validate the underlying schedule-quality problem.

ProjectLens does not compete on the number of schedule metrics. It focuses on the decision meeting: compare the submitted narrative with the schedule, show the largest conflicts and record the board response.

Sources:

- https://primavera.oraclecloud.com/help/en/user/149130.htm
- https://www.deltek.com/products/delivery-assurance/ppm/acumen/fuse/


### Output Gate

LangSmith, Braintrust and Phoenix support datasets, experiments, regression evaluation and production monitoring. Output Gate is a focused code-based check for known requirements. It runs locally or in CI and does not require a model call.

Sources:

- https://docs.langchain.com/langsmith/evaluation-types
- https://www.braintrust.dev/docs/evaluate
- https://arize.com/docs/phoenix/evaluation/evals

### Supporting work

- PMI documents the difficulty of retrieving useful lessons from broad repositories. This supports DecisionGraph as a ProjectLens capability: https://www.pmi.org/learning/library/knowledge-management-lessons-learned-10161
- Hightouch and RudderStack connect governed warehouse data to operational marketing tools. The local ML lakehouse is an engineering study rather than a competing product: https://hightouch.com/docs/getting-started/concepts and https://www.rudderstack.com/
- QuantConnect and Alpaca provide mature backtesting and paper-trading platforms. The paper-trading engine is a research study: https://www.quantconnect.com/docs/v2/cloud-platform/backtesting and https://docs.alpaca.markets/us/docs/trading-api
- MoneyHelper and the ONS provide official homebuying calculators. House Hunter is a public utility and product demonstration: https://www.moneyhelper.org.uk/en/homes/buying-a-home and https://www.ons.gov.uk/visualisations/dvc393/affordabilitycalculator/content.html
- Ticketmaster and PredictHQ operate full event-data products. Happening's public value is its schema and quality benchmark: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/ and https://docs.predicthq.com/api

## Homepage architecture

```text
Homepage (/)
├── Selected projects (/#work)
│   ├── ProjectLens (/store/apps/projectlens/)
│   └── Output Gate (/store/apps/output-gate/)
├── Project archive (/#more-work)
│   ├── DecisionGraph (/store/apps/decisiongraph/)
│   ├── Marketing ML Lakehouse (/store/apps/marketing-ml-lakehouse/)
│   ├── Paper Trading Research Engine (/store/apps/paper-trading/)
│   ├── Winchester House Hunter (/store/apps/winchester-buyer-check/)
│   └── Happening (/store/apps/happening/)
└── About (/#about)
```

All existing detail-page URLs remain in place.
