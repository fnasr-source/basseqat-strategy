# IDE Prompt Pack

Use these prompts inside any IDE agent after duplicating this starter for a real client.

## Before You Start
1. Replace placeholders in the project.
2. Complete `docs/project/PROJECT_PROFILE.md` before planning strategy or implementation.
3. Add all available client inputs into `docs/client_kb/`.
4. Run `npm run research:check` if research APIs may be used. Proceed with external research only after the automated stack passes.
5. If a strategy presentation is required, plan to deliver it in `apps/presentation/` after the written strategy is approved.
6. Read these files first:
   - `docs/project/PLACEHOLDER_GUIDE.md`
   - `docs/project/PROJECT_PROFILE.md`
   - `docs/project/PROJECT_TYPE_MATRIX.md`
   - `docs/project/START_HERE.md`
   - `docs/project/PROJECT_CONTEXT.md`
   - `docs/project/SCHEMA_CORE.md`
   - `docs/project/MODULE_BLUEPRINT.md`
   - `docs/project/SOURCE_PATTERN.md`
   - `docs/client_kb/INDEX.md`
   - `docs/client_kb/MISSING_INPUTS.md`
   - `docs/research/README.md`
   - `docs/research/RESEARCH_AUTOMATION_SYSTEM.md`
   - `docs/research/TOOLING_STACK.md`
   - `docs/research/RESEARCH_BUDGETING.md`
   - `docs/research/research-budget.md`
   - `docs/research/CONTAMINATION_CHECKLIST.md`
   - `docs/strategy/ADMIREWORKS_DIRECT_RESPONSE_STRATEGY_PLAYBOOK.md`
   - `docs/strategy/STRATEGY_QA_GATE.md`
   - `docs/messaging/COPY_FRAMEWORKS.md`
   - `docs/messaging/ADMIREWORKS_COPY_METHOD.md`
   - `docs/messaging/COPY_REVIEW_RUBRIC.md`
   - `docs/project/IMPLEMENTATION_BASELINE.md`
   - `docs/ops/ADMIN_AUTH_AND_APPHOSTING_RUNBOOK.md`
   - `docs/active_state/README.md`

## Prompt 1: Source Ingestion And Research Layer
```text
Read these files first and follow them strictly:

1. docs/project/START_HERE.md
2. docs/project/PROJECT_CONTEXT.md
3. docs/project/SCHEMA_CORE.md
4. docs/project/MODULE_BLUEPRINT.md
5. docs/project/SOURCE_PATTERN.md
6. docs/client_kb/INDEX.md
7. docs/client_kb/MISSING_INPUTS.md
8. docs/research/README.md
9. docs/research/RESEARCH_AUTOMATION_SYSTEM.md
10. docs/research/TOOLING_STACK.md
11. docs/research/RESEARCH_BUDGETING.md
12. docs/research/research-budget.md
13. docs/research/CONTAMINATION_CHECKLIST.md
14. docs/strategy/ADMIREWORKS_DIRECT_RESPONSE_STRATEGY_PLAYBOOK.md
15. docs/strategy/STRATEGY_QA_GATE.md
16. docs/messaging/COPY_FRAMEWORKS.md
17. docs/messaging/ADMIREWORKS_COPY_METHOD.md
18. docs/messaging/COPY_REVIEW_RUBRIC.md
19. docs/project/IMPLEMENTATION_BASELINE.md
20. docs/ops/ADMIN_AUTH_AND_APPHOSTING_RUNBOOK.md
21. docs/active_state/README.md

Then read all source material inside docs/client_kb/, especially briefs, meetings, raw transcripts, and whatsapp updates.

Your job is to:
- understand the full client context
- respect the project profile and only plan for approved modules and delivery scope
- run a missing-inputs check before drafting
- identify what external research is required to avoid a shallow or generic strategy
- choose the minimum viable research stack and budget before starting external research
- run `npm run research:work-order` and `npm run research:run` once the automated stack is ready
- create or update:
  - docs/research/research-budget.md
  - docs/research/research-report.md
  - docs/research/competitor-scan.md
  - docs/research/customer-language-bank.md
  - docs/research/market-environment-scan.md
  - docs/research/source-log.md
  - docs/research/research-review.md
  - docs/research/CONTAMINATION_CHECKLIST.md

Rules:
- do not invent facts not supported by the docs
- separate confirmed facts from inference
- use browser or source-backed research when external market claims are needed
- default to Firecrawl + Perplexity + human review unless the project clearly justifies Exa or Tavily
- Perplexity API is part of the standard research stack; configure it before external research starts
- prefer Firecrawl or Tavily for search/extraction and Perplexity for web-grounded synthesis
- use Exa or Tavily only as optional enhancements, not as the only evidence layer
- document sources inside the research files
- document the selected tool stack and expected spend in docs/research/research-budget.md
- use docs/research/research-requests.json to define automated research tasks when the runner is available
- update docs/client_kb/MISSING_INPUTS.md with resolved items, open items, and critical blockers
- update docs/client_kb/INDEX.md if you discover missing source references
- update docs/research/CONTAMINATION_CHECKLIST.md with contamination risks and resolutions
- update docs/active_state/README.md with current priorities, ready items, blockers, and next actions
- if critical missing inputs remain, stop and ask the user for them before drafting strategy
```

## Prompt 2: Strategy Synthesis Using The Admireworks Playbook
```text
Use these files as your source of truth:
- docs/project/PROJECT_CONTEXT.md
- docs/client_kb/INDEX.md
- docs/client_kb/MISSING_INPUTS.md
- docs/research/research-report.md
- docs/research/competitor-scan.md
- docs/research/customer-language-bank.md
- docs/research/market-environment-scan.md
- docs/research/research-budget.md
- docs/research/CONTAMINATION_CHECKLIST.md
- docs/strategy/ADMIREWORKS_DIRECT_RESPONSE_STRATEGY_PLAYBOOK.md
- docs/strategy/STRATEGY_QA_GATE.md
- docs/messaging/COPY_FRAMEWORKS.md

Do the following:
- build the full direct-response strategy section by section using the canonical playbook
- create or update:
  - docs/strategy/direct-response-strategy.md
  - docs/messaging/messaging-bible.md
  - docs/offers/offer-architecture.md
  - docs/pages/primary-landing-page-spec.md
  - docs/messaging/campaign-flow-draft.md
  - docs/strategy/ad-copy-review.md

Rules:
- do not skip strategy sections
- cite source docs or research docs for meaningful claims
- if evidence is weak, mark it as inference
- do not carry over examples, claims, or structures from another client unless they are revalidated and logged in docs/research/CONTAMINATION_CHECKLIST.md
- if critical missing inputs remain, stop and ask the user before finalizing
```

## Prompt 3: Strategic Review And Tightening
```text
Now review the drafted strategy, messaging, offer, page spec, campaign flow, and ad copy together.

Do the following:
- find contradictions
- find weak claims or unsupported assumptions
- tighten the positioning
- improve the offer logic
- improve the CTA and funnel flow
- apply the frameworks in docs/messaging/COPY_FRAMEWORKS.md more rigorously where the drafts are generic
- apply docs/messaging/COPY_REVIEW_RUBRIC.md and explicitly mark approve / revise / reject by document
- apply docs/strategy/STRATEGY_QA_GATE.md and create or update docs/strategy/strategy-qa.md
- list what still needs client confirmation
- prepare a clear approval-ready version of each document
```

## Prompt 4: Copy Generation Using Admireworks Rules
```text
Use these files as source of truth:
- docs/project/PROJECT_CONTEXT.md
- docs/strategy/direct-response-strategy.md
- docs/messaging/messaging-bible.md
- docs/offers/offer-architecture.md
- docs/pages/primary-landing-page-spec.md
- docs/messaging/COPY_FRAMEWORKS.md
- docs/messaging/ADMIREWORKS_COPY_METHOD.md

Generate conversion-focused copy that follows the Admireworks rules and frameworks.

Deliver:
- 5 ad angles
- 3 to 5 ad variants per angle
- headline set
- body copy set
- CTA set
- landing page section copy
- objection handling copy
- retargeting copy
- WhatsApp follow-up copy
- email flow copy outline

Rules:
- keep the writing market-native, not translated-sounding
- be specific, emotionally precise, and commercially sharp
- use proof, objection handling, risk reversal, urgency, and CTA logic properly
- do not use hype without evidence
- explain which copy framework is being used in each angle or asset
- explain what proof supports each major claim or mark it as still needed
```

## Prompt 5: Strategy Presentation Build
```text
Use these files as source of truth:
- docs/project/PROJECT_CONTEXT.md
- docs/strategy/direct-response-strategy.md
- docs/strategy/PRESENTATION_REQUIREMENTS.md
- docs/messaging/messaging-bible.md
- docs/messaging/ad-copy-drafts.md
- docs/messaging/whatsapp-email-copy.md
- docs/messaging/campaign-flow-draft.md
- docs/offers/offer-architecture.md
- docs/pages/primary-landing-page-spec.md
- docs/strategy/strategy-qa.md
- docs/strategy/presentation-outline.md
- docs/research/competitor-scan.md
- docs/research/market-environment-scan.md
- docs/research/customer-language-bank.md
- docs/client_kb/MISSING_INPUTS.md
- docs/active_state/README.md
- apps/presentation/README.md
- apps/presentation/content/slides.json

Do the following:
- convert the approved strategy into the qafza-derived StoryOS webinar presentation structure
- follow docs/strategy/PRESENTATION_REQUIREMENTS.md strictly; do not collapse full strategy sections into a summary deck
- update docs/strategy/presentation-outline.md so each slide maps to source docs
- update apps/presentation/content/slides.json with the actual deck content
- include competitor overview plus one slide per named competitor when competitor research exists
- include the trust asset / content-offer layer when the strategy includes it
- include market gaps, opportunities, personas, environment, messaging, offer, landing-page structure, landing-page proof / objections, funnel stages, copy samples, measurement, and decisions-needed sections
- include ad angle boards, specimen hooks, WhatsApp, email, or objection-handling samples when those docs exist
- keep the deck concise, high-trust, visual-first, and presentation-ready
- preserve the existing qafza-derived StoryOS webinar app and only change content unless a structural improvement is required
- do not create a new presentation frontend, a new slide system, or a different deck style from scratch
- give every slide an image plan through image, imagePrompt, or visualDirection
- use docs/project/PROJECT_CONTEXT.md for language control: titles/headings may stay English, but visible body content must follow the client's market language; for Arabic-first clients, write summary, bullets, evidence.detail, quotes, and CTA body copy in Arabic
- keep every major claim tied to internal source docs or mark it as inference
- keep raw internal provenance in sources
- add client-safe sourceLabels to every strategic slide
- do not expose raw internal repo paths or markdown filenames on the client-facing deck canvas
- keep speaker notes practical for a live strategy presentation

Deliver:
- a complete presentation deck in apps/presentation/content/slides.json
- an updated presentation outline in docs/strategy/presentation-outline.md
- image prompts for every priority slide
- any required lightweight copy or proof refinements in the source strategy docs

Rules:
- do not invent claims that are not supported by client inputs or research
- do not turn the deck into a generic agency pitch
- do not present unapproved implementation promises as confirmed deliverables
- if proof is weak, say so in the deck and notes
- keep the deck publishable through GitHub Pages without adding heavy runtime dependencies
- do not claim the deck is complete if image generation was skipped or blocked
- do not publish or deploy the deck unless npm run presentation:release:check passes
```
## Prompt 6: Build-Ready Implementation Plan
```text
Using the approved docs and `docs/project/PROJECT_PROFILE.md` as source of truth, prepare the implementation plan only for the modules marked as included now:

- dashboard
- leads
- crm
- campaign flows
- ad copies
- whatsapp
- messaging cockpit
- client portal
- settings
- health

Map each module to:
- required data
- firestore collections
- user roles
- screens
- actions
- dependencies
- seed data needed
- risks
- verification scripts or runbooks required

Do not implement yet. Produce a build-ready execution plan.
```

## Prompt 7: Session Resume Prompt
```text
Read these files in order:
- docs/project/START_HERE.md
- docs/project/PROJECT_CONTEXT.md
- docs/project/CONTINUE_PROMPT.md
- docs/client_kb/INDEX.md
- docs/client_kb/MISSING_INPUTS.md
- docs/research/research-report.md
- docs/research/competitor-scan.md
- docs/research/customer-language-bank.md
- docs/research/market-environment-scan.md
- docs/research/CONTAMINATION_CHECKLIST.md
- docs/strategy/strategy-qa.md
- docs/messaging/COPY_FRAMEWORKS.md
- docs/messaging/ADMIREWORKS_COPY_METHOD.md
- docs/messaging/COPY_REVIEW_RUBRIC.md
- docs/active_state/README.md

Then continue from the current state without redoing already-approved work.
Update docs/active_state/README.md before finishing.
```







