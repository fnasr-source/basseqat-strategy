# Presentation Requirements

This is the required structure for any direct-response strategy deck built from this template.

## Core Rule
Do not turn a full strategy system into a short summary deck.
The presentation must translate the full direct-response strategy into a client-facing, visual-first walkthrough that can carry a real strategy meeting from opening diagnosis to production blockers.

## Narrative Rule
Admireworks strategy decks should feel chaptered, not like one long memo on slides.
A complete client deck should usually include:
1. cover / decision frame
2. agenda or review path
3. current situation / objective frame
4. core challenge or market tension
5. analysis chapter
6. strategy chapter
7. funnel / execution chapter
8. creative / asset chapter
9. measurement + decisions close

For full client decks with 20+ slides, include at least 3 chapter-divider slides to reset the room and pace the review.

## Client-Facing Evidence Rule
- Keep `sources` for internal provenance and validation only.
- Keep `sourceLabels` for client-safe basis labels such as `Client brief`, `Competitor scan`, or `Landing-page specification`.
- Never expose raw repo paths, markdown filenames, or internal document references like `docs/...` on the client-facing canvas.
- Do not put internal file names or repo paths inside visible slide body copy either.
- If evidence basis is shown at all, show `sourceLabels` only and keep that to presenter mode or internal review contexts.

## Required Slide Groups
1. Cover / decision frame
2. Agenda / review-path slide
3. Situation and objectives
4. KPI and budget frame
5. Core challenge / market tension
6. Competitor overview
7. One slide per named competitor in `docs/research/competitor-scan.md`
8. Indirect alternatives / category comparison
9. Market gaps
10. Market opportunities
11. Primary persona
12. Secondary persona or audience expansion note when the written strategy includes one
13. Market and digital environment
14. Core positioning / one-liner
15. Messaging pillars / StoryBrand narrative
16. High-value content offer / trust asset layer when the strategy includes one
17. Offer architecture
18. Landing-page architecture
19. Landing-page proof / objections / risk-reversal layer when the page spec is substantive
20. Funnel design with separate stage slides for awareness, consideration, conversion, and nurture / handoff when those stages exist
21. Social / content system
22. Copy sample slides for ad angles / specimen hooks
23. Copy sample slide for post-click system (WhatsApp / email / objections)
24. Measurement / evaluation
25. Decisions needed / missing inputs / blockers

## Minimum Coverage Rules
- Competitor analysis is never one summary slide only.
- Funnel design is never one summary slide only if the written strategy has multiple stages.
- If `docs/messaging/campaign-flow-draft.md` documents 4 flows, the deck must have at least 4 funnel slides.
- Copy work is never omitted if ad copy, WhatsApp, email, or page specs exist in the repo.
- If both ad-copy and post-click copy docs exist, the deck must have at least 3 copy-sample slides.
- Landing-page structure must be represented visually if `docs/pages/primary-landing-page-spec.md` exists.
- If the landing-page spec is substantive, use at least 2 slides: one for architecture and one for proof / objections / CTA logic.
- If the strategy includes a high-value content offer / trust asset section, the deck must include it explicitly.
- If the strategy includes a secondary persona, the deck must include a second persona slide or an explicit audience-expansion slide.
- Missing inputs must appear explicitly when the QA gate or active-state docs say the work is still blocked.

## Visual Rules
- Each slide must have at least one of these:
  - `image`
  - `imagePrompt`
  - `visualDirection`
- Keep visible text minimal and presentation-native.
- Use speaker notes for nuance, citations, objections, and delivery guidance.
- Prefer one big idea per slide.
- Use visuals that feel calm, premium, documentary, editorial, or conceptually grounded.
- Make chapter-divider slides more image-forward than content-heavy.
- Turn copy examples into specimen boards, not text dumps.
- If proof assets are missing, use abstract or documentary image prompts instead of leaving slides visually empty.

## Theme Rules
- Use the existing qafza-derived StoryOS presentation engine in `apps/presentation/`.
- Keep the Admireworks visual language editorial and premium: deep navy / earth / gold palette, documentary imagery, soft gradients, and restrained motion.
- English titles and structural labels are acceptable, but body copy must follow market language.
- The deck should feel alive through imagery, spacing, and pacing, not through flashy gimmicks.

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
- skipping the agenda / review-path slide in a full client deck
- skipping the challenge / market-tension articulation and jumping straight into tactics
- skipping competitor detail slides when competitor research exists
- skipping the trust asset / content-offer layer when the strategy includes it
- skipping copy sample slides when copy docs exist
- collapsing all funnel logic into one slide when the campaign flow has multiple stages
- showing raw internal repo paths, markdown files, or internal doc names to the client in the deck UI
- inventing a new presentation UI instead of using `apps/presentation/`
- leaving the deck without any visual plan
- keeping Arabic-market decks in English body copy
- publishing or marking the deck complete before `npm run presentation:release:check` passes
