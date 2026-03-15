---
description: Baseline workflow for setting up, deploying, and continuing an Admireworks client project
---

# Development And Deployment Workflow

## Purpose
This file exists so any IDE agent can continue work without guessing the project shape.

## Read Order
1. `docs/project/START_HERE.md`
2. `docs/project/PROJECT_CONTEXT.md`
3. `docs/project/SCHEMA_CORE.md`
4. `docs/project/IMPLEMENTATION_BASELINE.md`
5. `docs/ops/ADMIN_AUTH_AND_APPHOSTING_RUNBOOK.md`
6. `docs/client_kb/INDEX.md`
7. `docs/active_state/README.md`

## Rules
- Treat `docs/client_kb/` as the canonical input layer.
- Treat `docs/strategy/`, `docs/messaging/`, `docs/offers/`, and `docs/pages/` as synthesized execution layers.
- Do not implement public pages before the relevant docs are approved.
- Keep client-facing collaboration in `/admin/client-portal`, `/admin/campaign-flows`, and `/admin/ad-copies`.
- Prefer reusable generic modules over client-specific hacks.
- Prefer the project service account through `GOOGLE_APPLICATION_CREDENTIALS` or `firebase/service-account.json`.
- Verify admin access, config, and App Hosting state before production-facing changes.
