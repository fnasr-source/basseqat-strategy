# Changelog

## 0.6.2 - 2026-03-14
- added a reusable `apps/presentation/` qafza-derived StoryOS webinar presentation app
- added `presentation:check` and `presentation:serve` scripts for local validation and preview
- added GitHub Pages deployment workflow and starter docs so strategy presentation is an explicit deliverable after written-strategy approval
## 0.6.1 - 2026-03-14
- added `PLACEHOLDER_GUIDE.md`, `PROJECT_PROFILE.md`, and `PROJECT_TYPE_MATRIX.md` so client scope and module selection are defined before implementation planning
- updated repo instructions and prompts so different client project types can use different module sets instead of assuming a full admin stack
- added `SHARED_KEYS_SETUP.md` and shared local research-env loading so internal research keys can be reused across devices without committing live secrets into git

## 0.6.0 - 2026-03-14
- added actual research runner automation with `research:run` and provider-specific run commands
- added `docs/research/research-requests.json` as the task-definition file for automated research jobs
- added automated output handling for raw provider data, markdown findings, and source-log updates under `docs/research/`

## 0.5.5 - 2026-03-14
- changed `research:check` so semi-automated research mode is treated as valid when extraction is configured and synthesis will be done manually
- updated the research docs and setup flow to explicitly support manual Perplexity/browser synthesis until the Perplexity API key is added

## 0.5.4 - 2026-03-14
- added `research:exa:verify` and `research:tavily:verify` so Exa and Tavily can be validated independently
- updated the research setup docs to include Exa and Tavily verification steps

## 0.5.3 - 2026-03-14
- added `.env.research.example` and automatic research-env loading so API keys can live in a local non-committed file
- added `research:firecrawl:verify` to validate Firecrawl access before running research
- updated setup docs so Firecrawl can be integrated with a standard local workflow

## 0.5.2 - 2026-03-13
- added `docs/research/RESEARCH_BUDGETING.md` and `docs/research/research-budget.md` so each client repo selects a tool stack and spend cap before external research starts
- updated the research pipeline, prompts, and setup docs to default to a lean Firecrawl + Perplexity + human-review path unless deeper tooling is justified

## 0.5.1 - 2026-03-13
- added `docs/research/CONTAMINATION_CHECKLIST.md` as a reusable anti-generic and anti-cross-client drift gate
- added `docs/strategy/STRATEGY_QA_GATE.md` and `docs/strategy/strategy-qa.md` to force explicit approval checks before presentation or implementation planning
- wired contamination and QA gates into the read order, prompt flow, setup docs, and research automation pipeline

## 0.5.0 - 2026-03-13
- added the research automation system, tooling-stack guidance, source-log and research-review artifacts
- added `research:check` and `research:work-order` starter scripts for provider readiness and repeatable research briefs
- documented a recommended provider stack centered on Firecrawl plus Perplexity, with Exa and Tavily as optional add-ons
- hardened starter instructions so research execution follows a repeatable pipeline with human review before strategy synthesis

## 0.4.0 - 2026-03-13
- added a formal research layer with reusable templates for research reports, competitor scans, customer language banks, and market environment scans
- added `docs/strategy/ADMIREWORKS_DIRECT_RESPONSE_STRATEGY_PLAYBOOK.md` as the canonical strategy framework
- expanded the direct-response strategy template to follow the full Admireworks playbook structure
- hardened repo instructions and prompt flow to require research before strategy synthesis, source-backed claims, and anti-cross-client contamination rules
- promoted the strategy presentation step to follow approved written strategy rather than an optional vague step

## 0.3.1 - 2026-03-13
- added the physical client intake folders so new client repos show the expected source drop zones immediately
- added `docs/client_kb/MISSING_INPUTS.md` and enforced a missing-inputs gate across starter instructions and prompt flow
- updated the starter workflow so agents must ask for critical missing inputs before strategy, planning, or implementation work

## 0.3.0 - 2026-03-13
- hardened the starter with implementation, Firebase, App Hosting, and admin-auth operational baselines
- added `docs/project/IMPLEMENTATION_BASELINE.md`
- added `docs/ops/ADMIN_AUTH_AND_APPHOSTING_RUNBOOK.md` and `docs/ops/NEW_PROJECT_OPERATIONS_CHECKLIST.md`
- expanded the schema and module contracts to cover real admin and backend expectations
- added starter Firebase rules, indexes, function scaffolds, app hosting config, and env examples
- added service-account-first verification and rollout scripts for config, admin access, rules, and App Hosting state

## 0.2.0 - 2026-03-13
- expanded the starter copy doctrine into a fuller bilingual StoryBrand + direct-response system
- added `docs/messaging/ADMIREWORKS_COPY_METHOD.md` for source-first copy production workflow
- added `docs/messaging/COPY_REVIEW_RUBRIC.md` for approve / revise / reject review gates
- added annotated copy exemplars for Arabic trust-led, English direct-response, and bilingual channel adaptation patterns
- upgraded intake and execution templates to capture proof, objections, tone guardrails, and CTA logic
- updated agent prompt packs and repo instructions to require the new copy workflow and review standards

## 0.1.0 - 2026-03-13
- created the Admireworks Client OS Starter structure
- added project onboarding and source-of-truth docs
- added client KB structure and templates
- added strategy, messaging, offer, and landing-page templates
- added IDE prompt pack
- added copy frameworks doctrine
- added starter enrichment backlog
- added strategy-kit baseline and shared brand assets
- added repo setup and new-client setup guides

