# Strategy Presentation Workflow

Use this workflow after the written strategy has passed review.

## Required Reading
- `docs/strategy/PRESENTATION_REQUIREMENTS.md`
- `docs/strategy/presentation-outline.md`
- `apps/presentation/README.md`

## Deliverables
- `docs/strategy/presentation-outline.md`
- `apps/presentation/content/slides.json`
- generated or attached visuals for all slides
- optional GitHub Pages publication for stakeholder review

## Process
1. Confirm the written strategy is current and approved.
2. Map every required slide group from `docs/strategy/PRESENTATION_REQUIREMENTS.md` into `docs/strategy/presentation-outline.md`.
3. Translate that outline into `apps/presentation/content/slides.json`.
4. Keep internal `sources` on every strategic slide.
5. Add client-safe `sourceLabels` on every strategic slide.
6. Never expose raw internal repo paths or markdown filenames in the client-facing deck UI.
7. Make sure competitor detail, trust asset / content offer, landing-page structure, proof layer, funnel stages, and copy sample slides are included when those source docs exist.
8. Follow the language rule from `docs/project/PROJECT_CONTEXT.md`: titles/headings may stay English, but visible body content must follow the client market language. For Arabic-first projects, write `summary`, `bullets`, `evidence.detail`, quotes, and `cta` in Arabic.
9. Add `imagePrompt` or `visualDirection` to every slide before image generation.
10. Run `npm install --prefix apps/presentation` if dependencies are not installed yet.
11. Run `npm run presentation:check`.
12. If visuals are still missing, set `GOOGLE_GEMINI_IMAGE_MODEL_ID` to the current Nano Banana 2 / Gemini 3.1 Flash Image API model ID, then run:
- `npm run presentation:images:check`
- `npm run presentation:images:generate`
13. Run `npm run presentation:release:check`.
14. Run `npm run presentation:serve` and review the StoryOS webinar deck locally in normal mode and presenter mode.
15. Run `npm run presentation:build` before publishing.
16. Commit the updated deck and let GitHub Pages publish it if the repo is configured for Pages.

## Rules
- all client decks from this template must use the existing qafza-derived StoryOS webinar app in `apps/presentation/`; do not create a different presentation UI
- do not compress a full strategy into a shallow summary deck
- every major claim must map back to a strategy, research, or client-KB source
- titles and structural headings may be English, but visible body content must match the client's market language
- keep visible text minimal and presentation-native
- use speaker notes for nuance, citations, objections, and sales guidance
- use Nano Banana 2 / Gemini 3.1 Flash Image only for generated presentation visuals
- do not publish, deploy, or mark the deck complete unless `npm run presentation:release:check` passes
- preserve the qafza-derived StoryOS presentation engine unless there is a clear reason to improve it
- do not treat the deck as complete if the structure still hides required strategy work inside speaker notes instead of showing it on actual slides