# Presentation App

This is the reusable StoryOS-style strategy presentation scaffold.

## Files
- `index.html`: static presentation shell
- `styles.css`: presentation styling
- `app.js`: preview logic and navigation
- `content/slides.json`: actual deck content

## Local Preview
From the repo root:

```bash
npm run presentation:check
npm run presentation:serve
```

Then open `http://localhost:4173`.

## GitHub Pages
This repo includes `.github/workflows/presentation-pages.yml`.

When the repo is on GitHub:
1. enable Pages with `GitHub Actions` as the source
2. push changes to `main`
3. GitHub will publish `apps/presentation/`

## Editing Rules
- treat `content/slides.json` as the main content file
- keep the app static and GitHub Pages friendly
- use source-backed claims only
- keep notes and caveats in `speakerNotes`, not on crowded slides
