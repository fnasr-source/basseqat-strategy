# New Client Setup

Use this process every time you start a client from this starter.

## 1. Create The New Repo
Recommended repo naming:
- `[client-slug]-growth-os`
- `[client-slug]-campaign-os`
- `[client-slug]`

## 2. Duplicate From The Starter
Create the new repository from this starter repo, then clone it locally.

## 3. Replace Placeholders
Open the project and replace placeholders such as:
- `[CLIENT_NAME]`
- `[CLIENT_SLUG]`
- `[PRIMARY_MARKET]`
- `[PRIMARY_OFFER]`

Then run:
```bash
npm run rename:check
```

Read:
- `docs/project/PLACEHOLDER_GUIDE.md`

## 4. Define The Project Profile
Fill:
- `docs/project/PROJECT_PROFILE.md`

Use:
- `docs/project/PROJECT_TYPE_MATRIX.md`

Confirm what is actually in scope before strategy or implementation planning.

## 5. Set Up Firebase Credentials
Preferred:
- place the client Firebase service account at `firebase/service-account.json`

Alternative:
- export `GOOGLE_APPLICATION_CREDENTIALS` to the existing client credential path

Then verify access:
```bash
npm run firebase:verify:config
```

## 6. Add Client Inputs
Put all source inputs into:
- `docs/client_kb/briefs/`
- `docs/client_kb/meetings/`
- `docs/client_kb/meetings/raw/`
- `docs/client_kb/whatsapp/`
- `docs/client_kb/plans/`

Update:
- `docs/client_kb/INDEX.md`
- `docs/client_kb/MISSING_INPUTS.md`
- `docs/project/PROJECT_CONTEXT.md`
- `docs/active_state/README.md`

## 7. Review The Operational Baseline
Read:
- `docs/project/IMPLEMENTATION_BASELINE.md`
- `docs/project/SCHEMA_CORE.md`
- `docs/ops/ADMIN_AUTH_AND_APPHOSTING_RUNBOOK.md`
- `docs/ops/NEW_PROJECT_OPERATIONS_CHECKLIST.md`

## 8. Prepare Research Automation
If research APIs are available:
```bash
npm run research:check
npm run research:firecrawl:verify
npm run research:exa:verify
npm run research:tavily:verify
npm run research:work-order
npm run research:run
```

`npm run research:check` should pass before external research begins. Standard automated research requires `PERPLEXITY_API_KEY` plus at least one extraction provider (`FIRECRAWL_API_KEY` or `TAVILY_API_KEY`).

Preferred key setup:
- `~/.admireworks/research.env`

See:
- `docs/research/SHARED_KEYS_SETUP.md`

Then review:
- `docs/research/RESEARCH_BUDGETING.md`
- `docs/research/research-budget.md`
- `docs/research/CONTAMINATION_CHECKLIST.md`
- `docs/strategy/STRATEGY_QA_GATE.md`

## 9. Start The IDE Workflow
Open `IDE_PROMPTS.md` and use Prompt 1.

## 10. Build The Strategy Presentation
After the written strategy is approved:
- use the existing qafza-derived app in `apps/presentation/` as the required base
- read `docs/strategy/PRESENTATION_REQUIREMENTS.md` first
- follow the language in `docs/project/PROJECT_CONTEXT.md`; for Arabic-first clients, keep titles/headings in English if useful but write visible body content in Arabic
- update `docs/strategy/presentation-outline.md`
- update `apps/presentation/content/slides.json`
- run:
```bash
npm install --prefix apps/presentation
npm run presentation:check
npm run presentation:serve
npm run presentation:images:check
npm run presentation:images:generate
npm run presentation:release:check
npm run presentation:build
```
- publish through GitHub Pages when the presentation should be shareable outside the repo

## 11. After Approval
Use Prompt 6 to create the build-ready implementation plan.

## Rule
Do not start with app code. Start with source ingestion and strategic synthesis.
Do not start strategy, planning, or implementation until missing critical inputs have been checked and surfaced.
Do not exceed the documented research budget without approval.
Do not approve strategy until contamination risks and QA gates are reviewed explicitly.
Do not assume every client gets the full admin stack; use `PROJECT_PROFILE.md`.
Do not publish or mark a presentation complete unless `npm run presentation:release:check` passes.
