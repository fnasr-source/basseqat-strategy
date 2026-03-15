# CLAUDE.md

This repository is the master starter for Admireworks client projects.

## What This Repo Is
This repo is not a finished client project.
It is a reusable operating system for starting new client work.

Use it to:
- ingest client inputs
- synthesize strategy
- generate messaging and copy
- define offers and pages
- prepare implementation plans
- standardize admin and operations structure

## Read Order
Before doing anything, read these files in order:
1. `README.md`
2. `docs/project/START_HERE.md`
3. `docs/project/PLACEHOLDER_GUIDE.md`
4. `docs/project/PROJECT_PROFILE.md`
5. `docs/project/PROJECT_TYPE_MATRIX.md`
6. `docs/project/PROJECT_CONTEXT.md`
7. `docs/project/SCHEMA_CORE.md`
8. `docs/project/MODULE_BLUEPRINT.md`
9. `docs/project/SOURCE_PATTERN.md`
10. `docs/client_kb/INDEX.md`
11. `docs/client_kb/MISSING_INPUTS.md`
12. `docs/research/README.md`
13. `docs/research/RESEARCH_AUTOMATION_SYSTEM.md`
14. `docs/research/TOOLING_STACK.md`
15. `docs/research/RESEARCH_BUDGETING.md`
16. `docs/research/SHARED_KEYS_SETUP.md`
17. `docs/research/research-budget.md`
18. `docs/research/RESEARCH_RUNNERS.md`
19. `docs/research/research-requests.json`
20. `docs/research/CONTAMINATION_CHECKLIST.md`
21. `docs/strategy/ADMIREWORKS_DIRECT_RESPONSE_STRATEGY_PLAYBOOK.md`
22. `docs/strategy/STRATEGY_QA_GATE.md`
23. `docs/messaging/COPY_FRAMEWORKS.md`
24. `docs/messaging/ADMIREWORKS_COPY_METHOD.md`
25. `docs/messaging/COPY_REVIEW_RUBRIC.md`
26. `docs/project/IMPLEMENTATION_BASELINE.md`
27. `docs/ops/ADMIN_AUTH_AND_APPHOSTING_RUNBOOK.md`
28. `docs/active_state/README.md`
29. `IDE_PROMPTS.md`

## Source Of Truth Rules
- `docs/client_kb/` is the source intake layer.
- `docs/research/` is the external evidence layer.
- `docs/strategy/`, `docs/messaging/`, `docs/offers/`, and `docs/pages/` are synthesized execution layers.
- Do not invent facts not supported by source material.
- Separate confirmed facts from assumptions and open questions.
- Run a missing-inputs check before strategy, copy, planning, or build work.
- If critical inputs are missing, stop and ask the user for them before continuing.
- Decide the project type and module scope in `docs/project/PROJECT_PROFILE.md` before planning implementation.
- Do not import strategic assumptions, personas, or claims from another client unless they are revalidated for this client.
- Prefer the research automation system and recommended provider stack when external market evidence is needed.
- Default to the lean research stack unless the project justifies a heavier tooling budget.
- Use the research runner system when automated provider-backed collection is appropriate.
- Use `docs/research/CONTAMINATION_CHECKLIST.md` to record and resolve contamination risks before strategy approval.
- Use `docs/strategy/STRATEGY_QA_GATE.md` before presenting or operationalizing the strategy.
- Do not implement public pages before the strategic docs are approved.

## Admireworks Working Rules
- Use StoryBrand logic explicitly.
- Use the frameworks in `docs/messaging/COPY_FRAMEWORKS.md`.
- Use the production workflow in `docs/messaging/ADMIREWORKS_COPY_METHOD.md`.
- Prefer angle-based copy development over random rewrites.
- Prefer proof, specificity, and market-native language over generic marketing language.
- Keep WhatsApp, email, landing-page, and ad copy aligned to the same strategic core.
- For Firebase and App Hosting work, prefer the project service account over interactive login.
- Use research and source citations for meaningful strategic claims.

## When This Repo Is Used As A Starter
If this repo has been copied into a real client repo:
- replace all placeholders first
- complete `docs/project/PROJECT_PROFILE.md`
- ingest all real client files into `docs/client_kb/`
- update `docs/client_kb/INDEX.md`
- update `docs/client_kb/MISSING_INPUTS.md`
- update `docs/project/PROJECT_CONTEXT.md`
- update `docs/active_state/README.md`
- then start with Prompt 1 in `IDE_PROMPTS.md`

## What To Avoid
- do not treat this starter as client-specific truth
- do not leave placeholders unresolved in a real client repo
- do not skip the documentation layer and jump straight to code
- do not create parallel task systems if `projectTasks` is already the baseline
- do not add niche modules to the starter unless they are truly reusable

## If Asked To Improve The Starter
When improving the master starter:
- preserve reusable structure
- avoid adding live client secrets or production values
- add reusable doctrine, templates, examples, scaffolds, and verification scripts only
- update `CHANGELOG.md` and `VERSION.md` when the starter meaningfully changes
