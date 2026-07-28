# Market positioning and portfolio structure

*Research snapshot: 28 July 2026*

## Decision

Present this site as a curated software portfolio. The homepage leads with three specific jobs:

1. Review a project change before a board decision.
2. Turn meeting notes into an approved follow-up.
3. Catch a known AI-output regression before release.

DecisionGraph supports the ProjectLens story. The lakehouse, paper-trading engine, House Hunter and Happening appear as supporting components, studies and utilities.

## Why the app-store model does not fit

Raycast Store serves Raycast users who install extensions. GitHub Marketplace serves developers who add tools to GitHub workflows. Sindre Sorhus's catalogue serves Apple users who download focused utilities. Each store has a shared audience and repeated action.

This portfolio covers several markets and several types of work. Giving each entry equal weight makes the visitor decide how the projects relate. The new hierarchy makes that relationship explicit.

## Market evidence

### ProjectLens

Oracle Primavera Cloud includes a schedule-health checker. Deltek Acumen Fuse sells schedule diagnostics and forensic comparison to schedulers, planners and PMOs. These products validate the underlying schedule-quality problem.

ProjectLens does not compete on the number of schedule metrics. It focuses on the decision meeting: compare the submitted narrative with the schedule, show the largest conflicts and record the board response.

Sources:

- https://primavera.oraclecloud.com/help/en/user/149130.htm
- https://www.deltek.com/products/delivery-assurance/ppm/acumen/fuse/

### MeetingProof

Fellow and Otter already generate transcripts, summaries and action items. MeetingProof needs a narrower position: take an existing set of notes, keep each draft item beside its source line and require approval before export.

Sources:

- https://fellow.ai/features/action-items
- https://get.otter.ai/otter-business-upgrade/

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
├── Start with your task (/#products)
│   ├── ProjectLens (/#projectlens)
│   │   └── DecisionGraph (/store/apps/decisiongraph/)
│   ├── MeetingProof (/#meetingproof)
│   └── Output Gate (/#output-gate)
├── Supporting work (/#supporting-work)
│   ├── DecisionGraph (/store/apps/decisiongraph/)
│   ├── Marketing ML Lakehouse (/store/apps/marketing-ml-lakehouse/)
│   ├── Paper Trading Research Engine (/store/apps/paper-trading/)
│   ├── Winchester House Hunter (/store/apps/winchester-buyer-check/)
│   └── Happening (/store/apps/happening/)
└── About (/#about)
```

All existing detail-page URLs remain in place.
