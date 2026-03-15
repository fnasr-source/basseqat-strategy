# Presentation Requirements

This is the required structure for any direct-response strategy deck built from this template.

## Core Rule
Do not turn a full strategy system into a short summary deck.
The presentation must translate the full direct-response strategy into a client-facing, visual-first walkthrough.

## Client-Facing Evidence Rule
- Keep `sources` for internal provenance and validation only.
- Keep `sourceLabels` for client-safe basis labels such as `Client brief`, `Competitor scan`, or `Landing-page specification`.
- Never expose raw repo paths, markdown filenames, or internal document references like `docs/...` on the client-facing canvas.
- If evidence basis is shown at all, show `sourceLabels` only and keep that to presenter mode or internal review contexts.

## Required Slide Groups
1. Cover / decision frame
2. Situation and objectives
3. KPI and budget frame
4. Competitor overview
5. One slide per named competitor in `docs/research/competitor-scan.md`
6. Indirect alternatives / category comparison
7. Market gaps
8. Market opportunities
9. Primary persona
10. Secondary persona or audience expansion note
11. Market and digital environment
12. Core positioning / one-liner
13. Messaging pillars / StoryBrand narrative
14. High-value content offer / trust asset layer when the strategy includes one
15. Offer architecture
16. Landing-page architecture
17. Landing-page proof / objections / risk-reversal layer when the page spec is substantive
18. Funnel design with separate stage slides for awareness, consideration, conversion, and nurture / handoff when those stages exist
19. Social/content system
20. Copy sample slides for ad angles / specimen hooks
21. Copy sample slide for post-click system (WhatsApp / email / objections)
22. Measurement / evaluation
23. Decisions needed / missing inputs / blockers

## Minimum Coverage Rules
- Competitor analysis is never one summary slide only.
- Funnel design is never one summary slide only if the written strategy has multiple stages.
- If `docs/messaging/campaign-flow-draft.md` documents 4 flows, the deck must have at least 4 funnel slides.
- Copy work is never omitted if ad copy, WhatsApp, email, or page specs exist in the repo.
- If both ad-copy and post-click copy docs exist, the deck must have at least 3 copy-sample slides.
- Landing-page structure must be represented visually if `docs/pages/primary-landing-page-spec.md` exists.
- If the landing-page spec is substantive, use at least 2 slides: one for architecture and one for proof / objections / CTA logic.
- If the strategy includes a high-value content offer / trust asset section, the deck must include it explicitly.
- Missing inputs must appear explicitly when the QA gate or active-state docs say the work is still blocked.

## Visual Rules
- Each slide must have at least one of these:
  - `image`
  - `imagePrompt`
  - `visualDirection`
- Keep visible text minimal and presentation-native.
- Use speaker notes for nuance, citations, objections, and delivery guidance.
- Prefer one idea per slide.
- Use visuals that feel calm, premium, and documentary or conceptually grounded.
- If proof assets are missing, use abstract or documentary image prompts instead of leaving slides visually empty.

## Language Rules
- Derive presentation language from `docs/project/PROJECT_CONTEXT.md`.
- Titles, section labels, and structural headings may stay in English for internal clarity.
- Visible body content must follow the client market language.
- For Arabic-first projects, the visible body content in `summary`, `bullets`, `evidence.detail`, quotes, and `cta` must be in Arabic; do not leave those sections in English.
- Speaker notes may stay in English unless the user explicitly asks for Arabic presenter notes.
- Do not mix translated-sounding Arabic with English body copy just because the headings are in English.

## Data Rules For `apps/presentation/content/slides.json`
- `deck.structureVersion` must be set.
- Every slide must include `section`.
- Every slide must include `speakerNotes` or `summary`.
- Every major claim must include internal `sources` or be explicitly framed as inference.
- Every configured client slide must include client-safe `sourceLabels`.
- Every slide should include `imagePrompt` until real visuals are generated and attached.

## Allowed Compression
You may compress or merge only when the underlying strategy does not support a full section.
If you compress, say why in `speakerNotes`.

## Not Allowed
- turning a full strategy system into a short summary deck
- skipping competitor detail slides when competitor research exists
- skipping the trust asset / content-offer layer when the strategy includes it
- skipping copy sample slides when copy docs exist
- collapsing all funnel logic into one slide when the campaign flow has multiple stages
- showing raw internal repo paths, markdown files, or internal doc names to the client in the deck UI
- inventing a new presentation UI instead of using `apps/presentation/`
- leaving the deck without any visual plan
- keeping Arabic-market decks in English body copy
- publishing or marking the deck complete before `npm run presentation:release:check` passes