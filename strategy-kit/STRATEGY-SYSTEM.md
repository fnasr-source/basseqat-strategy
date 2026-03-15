# Admireworks Strategy System

## Goal
Turn client source material into a reusable direct-response strategy package that can drive:
- offer design
- landing pages
- ad copy
- email flows
- WhatsApp flows
- implementation planning

## Required Reading Order
1. `docs/project/PROJECT_CONTEXT.md`
2. `docs/client_kb/INDEX.md`
3. `docs/client_kb/MISSING_INPUTS.md`
4. `docs/research/README.md`
5. `docs/strategy/ADMIREWORKS_DIRECT_RESPONSE_STRATEGY_PLAYBOOK.md`
6. `docs/messaging/COPY_FRAMEWORKS.md`
7. all relevant files in `docs/client_kb/briefs/`, `meetings/`, `meetings/raw/`, and `whatsapp/`
8. all relevant files in `docs/research/`
9. any existing approved outputs in `docs/strategy/`, `docs/messaging/`, `docs/offers/`, and `docs/pages/`

## Required Outputs
Generate or update these files as needed:
- `docs/research/research-report.md`
- `docs/research/competitor-scan.md`
- `docs/research/customer-language-bank.md`
- `docs/research/market-environment-scan.md`
- `docs/strategy/direct-response-strategy.md`
- `docs/messaging/messaging-bible.md`
- `docs/offers/offer-architecture.md`
- `docs/pages/[page-slug]-spec.md`
- `docs/messaging/[campaign-name]-flow.md`
- `docs/strategy/[campaign-name]-ad-copy-review.md`

## Strategic Standards
- Use StoryBrand logic explicitly.
- Follow the section order in `docs/strategy/ADMIREWORKS_DIRECT_RESPONSE_STRATEGY_PLAYBOOK.md`.
- Build the research layer before final strategy synthesis.
- Use the copy rules and frameworks in `docs/messaging/COPY_FRAMEWORKS.md`.
- Match the market language for customer-facing copy.
- Keep analysis grounded in documented client reality.
- Distinguish between confirmed facts, inference, and open questions.
- Cite source files or research docs for meaningful strategic claims.
- Make offers, pages, and flows operational, not generic.

## Presentation Layer
After the written strategy is strong and reviewed:
- update `docs/strategy/presentation-outline.md`
- build the presentation in `apps/presentation/`
- keep titles/headings in English only if helpful for internal clarity; visible body content must follow `docs/project/PROJECT_CONTEXT.md`
- for Arabic-first projects, write visible body content in Arabic
- validate it with `npm run presentation:check`
- validate publish readiness with `npm run presentation:release:check`
- preview it with `npm run presentation:serve`
- publish it through GitHub Pages when a shareable external URL is needed
