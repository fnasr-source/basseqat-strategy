# AGENTS.md

This repository is the master private starter for Admireworks client projects.

## Purpose
This repo exists so Admireworks does not restart from zero for every client.
It should act as the reusable operating system for:
- client intake
- strategy development
- direct-response copy development
- offer design
- page specification
- campaign-flow design
- WhatsApp and messaging operations
- implementation planning
- client collaboration structure

## What This Repo Is Not
- It is not a finished client project.
- It is not a production app for one specific business.
- It should not become polluted with client-specific truth, secrets, or one-off hacks.

## Required Read Order
Read these files before doing substantial work:
1. `README.md`
2. `CLAUDE.md`
3. `docs/project/START_HERE.md`
4. `docs/project/PLACEHOLDER_GUIDE.md`
5. `docs/project/PROJECT_PROFILE.md`
6. `docs/project/PROJECT_TYPE_MATRIX.md`
7. `docs/project/PROJECT_CONTEXT.md`
8. `docs/project/SCHEMA_CORE.md`
9. `docs/project/MODULE_BLUEPRINT.md`
10. `docs/project/SOURCE_PATTERN.md`
11. `docs/client_kb/INDEX.md`
12. `docs/client_kb/MISSING_INPUTS.md`
13. `docs/research/README.md`
14. `docs/research/RESEARCH_AUTOMATION_SYSTEM.md`
15. `docs/research/TOOLING_STACK.md`
16. `docs/research/RESEARCH_BUDGETING.md`
17. `docs/research/SHARED_KEYS_SETUP.md`
18. `docs/research/research-budget.md`
19. `docs/research/RESEARCH_RUNNERS.md`
20. `docs/research/research-requests.json`
21. `docs/research/CONTAMINATION_CHECKLIST.md`
22. `docs/strategy/ADMIREWORKS_DIRECT_RESPONSE_STRATEGY_PLAYBOOK.md`
23. `docs/strategy/STRATEGY_QA_GATE.md`
24. `docs/messaging/COPY_FRAMEWORKS.md`
25. `docs/messaging/ADMIREWORKS_COPY_METHOD.md`
26. `docs/messaging/COPY_REVIEW_RUBRIC.md`
27. `docs/project/IMPLEMENTATION_BASELINE.md`
28. `docs/ops/ADMIN_AUTH_AND_APPHOSTING_RUNBOOK.md`
29. `IDE_PROMPTS.md`
30. `ENRICHMENT_TASKS.md`
31. `docs/active_state/README.md`

## Working Rules
- `docs/client_kb/` is the intake layer and the basis for truth.
- `docs/research/` is the external evidence layer.
- `docs/strategy/`, `docs/messaging/`, `docs/offers/`, and `docs/pages/` are synthesized output layers.
- Separate confirmed facts from assumptions and open questions.
- Run a missing-inputs check before drafting strategy, copy, implementation plans, or app work.
- If critical inputs are missing, ask for them before continuing.
- Decide the project type and selected modules in `docs/project/PROJECT_PROFILE.md` before implementation planning.
- Do not import assumptions or messaging from another client unless revalidated for this one.
- Prefer the research automation system and recommended provider stack when external market evidence is needed.
- Default to the lean research stack unless the project justifies a heavier research budget.
- Use the research runner system when automated provider-backed evidence gathering is appropriate.
- Use `docs/research/CONTAMINATION_CHECKLIST.md` to catch copied assumptions, irrelevant patterns, and stale examples.
- Use StoryBrand explicitly.
- Use `docs/strategy/STRATEGY_QA_GATE.md` before presenting strategy or turning it into build tasks.
- Use the copy doctrine in `docs/messaging/COPY_FRAMEWORKS.md`.
- Use the production workflow in `docs/messaging/ADMIREWORKS_COPY_METHOD.md`.
- Prefer angle-based copy systems, proof, and market-native language.
- Do not jump straight to implementation when the strategy and copy layer are still weak.
- Keep the starter reusable; avoid client-specific hardcoding.
- Prefer service-account-based Firebase work over interactive login-dependent workflows.
- Use source-backed research for meaningful strategy claims.

## When Used As The Master Starter Repo
If you are improving this repo itself:
- add reusable doctrine, templates, examples, and scaffolds
- add reusable Firebase, App Hosting, and verification scripts
- update `CHANGELOG.md` and `VERSION.md` when the starter meaningfully changes
- do not add real client secrets or live production configs

## When Used As A New Client Repo
If this starter has been copied into a real client repo:
- replace placeholders first
- complete `docs/project/PROJECT_PROFILE.md`
- ingest all client inputs into `docs/client_kb/`
- update `docs/client_kb/INDEX.md`
- update `docs/client_kb/MISSING_INPUTS.md`
- update `docs/project/PROJECT_CONTEXT.md`
- update `docs/active_state/README.md`
- then start from `IDE_PROMPTS.md`

## Best Use
Use this repo as the long-term maintained source of truth for how Admireworks starts and structures client work.
