# Admireworks Client OS Starter

This is the master private starter repository for Admireworks client projects.

Its purpose is to prevent starting from scratch for every new client by giving Admireworks one reusable operating system for:
- client intake
- strategy development
- direct-response copy development
- offer architecture
- landing page and campaign specification
- WhatsApp and messaging operations
- implementation planning
- admin command center implementation
- Firebase backend setup and deployment discipline
- client collaboration structure

## What This Starter Includes
- `docs/` for client context, strategy, messaging, offers, pages, media, ops, and current execution state
- `docs/research/` for market, competitor, customer-language, and digital-environment research
- `docs/research/CONTAMINATION_CHECKLIST.md` to stop generic or cross-client drift
- `docs/strategy/STRATEGY_QA_GATE.md` for full-strategy quality control before presentation or build planning
- `docs/project/PROJECT_PROFILE.md` to define scope and included modules before implementation
- strategy-kit/ for the Admireworks strategy workflow
- `apps/presentation/` for the qafza-derived StoryOS webinar presentation app skeleton
- all client presentations from this template should use this engine rather than creating a separate deck system
- `apps/web/` as the scaffold contract for the future admin app and App Hosting setup
- `firebase/` as the backend contract for rules, indexes, functions, and deployment config
- `scripts/` for reusable setup, verification, and deployment automation
- `.agents/`, `CLAUDE.md`, and `AGENTS.md` for agent-facing workflow instructions

## What This Starter Is Meant To Do
When duplicated into a real client repo, it should let the team:
1. add all client inputs into a standard knowledge-base structure
2. use an IDE agent to synthesize strategy, messaging, offers, pages, and campaign copy
3. review campaign assets and project work in a structured way
4. move into implementation with a reusable admin, Firebase, and operations baseline
5. verify admin access, backend config, and App Hosting state using service-account-first scripts

## Recommended Starting Sequence For A New Client
1. Create a new repo from this template.
2. Replace placeholders like `[CLIENT_NAME]`, `[CLIENT_SLUG]`, and `[PRIMARY_OFFER]`.
3. Put all briefs, meeting transcripts, WhatsApp notes, and source files into `docs/client_kb/`.
4. Place the client Firebase service account at `firebase/service-account.json` or set `GOOGLE_APPLICATION_CREDENTIALS`.
5. Read `docs/project/START_HERE.md`.
6. Fill `docs/project/PROJECT_PROFILE.md` and decide which modules are in scope for this client.
7. Read `docs/project/IMPLEMENTATION_BASELINE.md` and `docs/ops/ADMIN_AUTH_AND_APPHOSTING_RUNBOOK.md`.
8. Run `npm run firebase:verify:config` after the initial Firebase project is set up.
9. Set research keys through `~/.admireworks/research.env`, `ADMIREWORKS_SHARED_RESEARCH_ENV`, or `.env.research.local`.
10. Run `npm run research:check`, `npm run research:firecrawl:verify`, `npm run research:exa:verify`, `npm run research:tavily:verify`, `npm run research:work-order`, and `npm run research:run` as applicable.
   `research:check` should pass before external research begins. The standard automated stack is Perplexity plus at least one extraction provider such as Firecrawl or Tavily.
11. Review `docs/research/RESEARCH_BUDGETING.md` and set `docs/research/research-budget.md` for this client.
12. Review `docs/research/CONTAMINATION_CHECKLIST.md` and update it for this client.
13. Run `npm run rename:check` to catch missed placeholders.
14. Open `IDE_PROMPTS.md` and start with Prompt 1.
15. Use `docs/strategy/STRATEGY_QA_GATE.md` before approval, presentation, or implementation planning.
16. After written strategy approval, follow `docs/strategy/PRESENTATION_REQUIREMENTS.md`, keep titles/headings in English only if useful while matching visible body content to the market language, update `apps/presentation/content/slides.json`, run `npm install --prefix apps/presentation`, validate with `npm run presentation:check`, generate visuals with `npm run presentation:images:check` and `npm run presentation:images:generate` using Nano Banana 2 / Gemini 3.1 Flash Image only once `GOOGLE_GEMINI_IMAGE_MODEL_ID` is set, then require `npm run presentation:release:check` before any GitHub Pages publish.
17. Build only the modules approved in docs/project/PROJECT_PROFILE.md.

## Standard Scope
This starter intentionally standardizes the recurring core:
- client knowledge base
- research layer
- strategy system
- copy frameworks
- offer architecture
- landing page specs
- campaign flow review
- ad copy review
- leads / CRM baseline
- WhatsApp operations baseline
- client portal and project tasks
- admin users / settings / health

It does not ship vertical-specific public pages or niche modules by default.

## Operational Rule
For Firebase, Firestore, Functions, App Hosting, rules, and verification work:
- prefer the repo service account at `firebase/service-account.json`
- otherwise set `GOOGLE_APPLICATION_CREDENTIALS`
- do not rely on interactive `firebase login` as the primary deployment path

## Master Repo Rule
Improve the reusable system here.
Do client-specific work in client repos created from this template.








