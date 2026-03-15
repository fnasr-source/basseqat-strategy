# Presentation App

This is the qafza-derived StoryOS webinar presentation skeleton adapted for client strategy decks.

## Required Engine
All presentations in this repo must use this exact app as the base.
Do not create a separate presentation system, alternate slide renderer, or custom deck UI unless explicitly requested.
Customization should happen primarily in content/slides.json and, only when needed, as small improvements inside the existing app.

## What Lives Here
- `content/slides.json`: the deck content and speaker notes
- `src/pages/WebinarPresentation.tsx`: the presentation engine with presenter mode
- `src/data/presentation.ts`: the JSON-to-slide model adapter
- `public/admireworks-white.png`: footer brand asset

## Local Workflow
From the repo root:

```bash
npm install --prefix apps/presentation
npm run presentation:check
npm run presentation:serve
```

Use `P` to toggle presenter mode. Use left and right arrows to move between slides.

## Build And Publish
This repo includes `.github/workflows/presentation-pages.yml`.

When the repo is on GitHub:
1. enable Pages with `GitHub Actions` as the source
2. push changes to `main`
3. GitHub Actions will build the Vite app and publish `apps/presentation/dist`

## Editing Rules
- treat `content/slides.json` as the main content file
- preserve the StoryOS webinar engine unless a structural improvement is required
- keep the deck GitHub Pages compatible
- use source-backed claims only
- keep nuance and delivery guidance in `speakerNotes`

