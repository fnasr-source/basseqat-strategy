const fs = require("fs");
const path = require("path");

const root = process.cwd();
const deckPath = path.join(root, "apps", "presentation", "content", "slides.json");
const competitorScanPath = path.join(root, "docs", "research", "competitor-scan.md");
const campaignFlowPath = path.join(root, "docs", "messaging", "campaign-flow-draft.md");
const adCopyPath = path.join(root, "docs", "messaging", "ad-copy-drafts.md");
const whatsappEmailPath = path.join(root, "docs", "messaging", "whatsapp-email-copy.md");
const projectContextPath = path.join(root, "docs", "project", "PROJECT_CONTEXT.md");
const directStrategyPath = path.join(root, "docs", "strategy", "direct-response-strategy.md");
const landingPagePath = path.join(root, "docs", "pages", "primary-landing-page-spec.md");
const requirementsPath = path.join(root, "docs", "strategy", "PRESENTATION_REQUIREMENTS.md");
const requiredFiles = [
  path.join(root, "apps", "presentation", "package.json"),
  path.join(root, "apps", "presentation", "src", "App.tsx"),
  path.join(root, "apps", "presentation", "src", "pages", "WebinarPresentation.tsx"),
  path.join(root, "apps", "presentation", "src", "data", "presentation.ts"),
  requirementsPath,
  deckPath,
];

const fullRequiredSections = [
  "cover",
  "situation",
  "competitor-overview",
  "market-gaps",
  "market-opportunities",
  "personas",
  "environment",
  "messaging",
  "offer",
  "landing-page",
  "funnel",
  "copy-samples",
  "social",
  "measurement",
  "decisions",
];

const rawSourceLabelPattern = /(^docs\/|^apps\/|^clients\/|\\|\.md\b|\.json\b|\.tsx?\b|https?:\/\/|^[A-Z]:\\)/i;

function fail(message) {
  console.error(`Presentation check failed: ${message}`);
  process.exit(1);
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
}

function isConfiguredProject(projectContext) {
  return Boolean(projectContext) && !/\[[A-Z0-9_ -]+\]/.test(projectContext);
}

function hasSubstantiveContent(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const text = readUtf8(filePath).trim();
  if (!text || text.length < 200) {
    return false;
  }

  if (/Status:\s*not started/i.test(text)) {
    return false;
  }

  if (/\[[A-Z0-9_ -]+\]/.test(text)) {
    return false;
  }

  return true;
}

function getVisibleBodyText(slide) {
  const evidenceText = Array.isArray(slide.evidence)
    ? slide.evidence.map((item) => [item.heading, item.detail].filter(Boolean).join(" ")).join(" ")
    : "";

  return [
    slide.summary,
    slide.cta,
    Array.isArray(slide.bullets) ? slide.bullets.join(" ") : "",
    evidenceText,
  ]
    .filter(Boolean)
    .join(" ");
}

requiredFiles.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    fail(`missing required file at ${filePath}`);
  }
});

let parsed;
try {
  parsed = JSON.parse(readUtf8(deckPath));
} catch (error) {
  fail(`invalid JSON in slides.json (${error.message})`);
}

if (!parsed.deck || !parsed.deck.title) {
  fail("deck.title is required");
}

if (!parsed.deck.structureVersion) {
  fail("deck.structureVersion is required");
}

if (!Array.isArray(parsed.slides) || parsed.slides.length === 0) {
  fail("slides must be a non-empty array");
}

const projectContext = fs.existsSync(projectContextPath) ? readUtf8(projectContextPath) : "";
const configuredProject = isConfiguredProject(projectContext);
const arabicFirstDeck = configuredProject && /Core language:\s*Arabic/i.test(projectContext);
const sections = new Set();
const competitorDetailCount = parsed.slides.filter((slide) => slide.section === "competitor-detail").length;
const funnelSlideCount = parsed.slides.filter((slide) => slide.section === "funnel").length;
const landingPageSlideCount = parsed.slides.filter((slide) => slide.section === "landing-page").length;
const copySampleSlideCount = parsed.slides.filter((slide) => slide.section === "copy-samples").length;
const contentOfferSlideCount = parsed.slides.filter((slide) => slide.section === "content-offer").length;
const slidesMissingArabicBody = [];
const slidesWithUnsafeSourceLabels = [];

parsed.slides.forEach((slide, index) => {
  if (!slide.title) {
    fail(`slide ${index + 1} is missing title`);
  }

  if (!slide.section) {
    fail(`slide ${index + 1} is missing section`);
  }
  sections.add(slide.section);

  if (!slide.speakerNotes && !slide.summary) {
    fail(`slide ${index + 1} needs speakerNotes or summary`);
  }

  if (!slide.image && !slide.imagePrompt && !slide.visualDirection) {
    fail(`slide ${index + 1} needs image, imagePrompt, or visualDirection`);
  }

  const hasBody =
    typeof slide.summary === "string" ||
    (Array.isArray(slide.bullets) && slide.bullets.length > 0) ||
    (Array.isArray(slide.evidence) && slide.evidence.length > 0) ||
    index === 0;

  if (!hasBody) {
    fail(`slide ${index + 1} needs summary, bullets, evidence, or cover content`);
  }

  if (configuredProject && (!Array.isArray(slide.sources) || slide.sources.length === 0)) {
    fail(`slide ${index + 1} needs at least one internal source reference`);
  }

  if (configuredProject && (!Array.isArray(slide.sourceLabels) || slide.sourceLabels.length === 0)) {
    fail(`slide ${index + 1} needs client-safe sourceLabels`);
  }

  if (Array.isArray(slide.sourceLabels)) {
    const unsafeLabels = slide.sourceLabels.filter((label) => rawSourceLabelPattern.test(label));
    if (unsafeLabels.length > 0) {
      slidesWithUnsafeSourceLabels.push(`${slide.id || index + 1}:${unsafeLabels.join(", ")}`);
    }
  }

  if (arabicFirstDeck) {
    const visibleBodyText = getVisibleBodyText(slide);
    if (visibleBodyText && !/\p{Script=Arabic}/u.test(visibleBodyText)) {
      slidesMissingArabicBody.push(slide.id || index + 1);
    }
  }
});

if (configuredProject) {
  fullRequiredSections.forEach((section) => {
    if (!sections.has(section)) {
      fail(`missing required section: ${section}`);
    }
  });
}

if (slidesWithUnsafeSourceLabels.length > 0) {
  fail(`sourceLabels must stay client-safe and cannot expose repo paths or raw files: ${slidesWithUnsafeSourceLabels.join(" | ")}`);
}

if (fs.existsSync(competitorScanPath)) {
  const competitorScan = readUtf8(competitorScanPath);
  const competitorCount = (competitorScan.match(/^## Competitor \d+: /gm) || []).length;
  if (competitorCount > 0 && competitorDetailCount < competitorCount) {
    fail(`expected at least ${competitorCount} competitor-detail slides, found ${competitorDetailCount}`);
  }
}

if (configuredProject && hasSubstantiveContent(campaignFlowPath)) {
  const campaignFlow = readUtf8(campaignFlowPath);
  const documentedFlowCount = (campaignFlow.match(/^## Flow \d+:/gm) || []).length;
  const expectedFunnelSlides = documentedFlowCount >= 4 ? 4 : 3;
  if (funnelSlideCount < expectedFunnelSlides) {
    fail(`expected at least ${expectedFunnelSlides} funnel slides for a configured client deck, found ${funnelSlideCount}`);
  }
}

if (configuredProject && hasSubstantiveContent(landingPagePath)) {
  const landingPageSpec = readUtf8(landingPagePath);
  const pageSectionCount = (landingPageSpec.match(/^### \d+\./gm) || []).length;
  if (pageSectionCount >= 8 && landingPageSlideCount < 2) {
    fail(`expected at least 2 landing-page slides when the page spec has ${pageSectionCount} sections, found ${landingPageSlideCount}`);
  }
}

if (
  configuredProject &&
  hasSubstantiveContent(directStrategyPath) &&
  /High-Value Content Offer/i.test(readUtf8(directStrategyPath)) &&
  contentOfferSlideCount < 1
) {
  fail("expected at least 1 content-offer slide when the strategy includes a high-value content offer section");
}

if (
  configuredProject &&
  hasSubstantiveContent(adCopyPath) &&
  hasSubstantiveContent(whatsappEmailPath) &&
  copySampleSlideCount < 3
) {
  fail(`expected at least 3 copy-samples slides when both ad and post-click copy docs exist, found ${copySampleSlideCount}`);
}

if (arabicFirstDeck && slidesMissingArabicBody.length > 0) {
  fail(
    `Arabic-first project requires Arabic visible body copy. Slides missing Arabic body content: ${slidesMissingArabicBody.join(", ")}`
  );
}

console.log(`Presentation check passed: ${parsed.slides.length} slides match ${parsed.deck.structureVersion}.`);