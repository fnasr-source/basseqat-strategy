const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const deckPath = path.join(root, "apps", "presentation", "content", "slides.json");

function fail(message) {
  console.error(`Presentation release check failed: ${message}`);
  process.exit(1);
}

function runNodeScript(scriptName) {
  const result = spawnSync(process.execPath, [path.join(root, "scripts", scriptName)], {
    cwd: root,
    stdio: "inherit"
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

runNodeScript("check-presentation.js");
runNodeScript("verify-gemini-image-access.js");

if (!fs.existsSync(deckPath)) {
  fail(`missing deck at ${deckPath}`);
}

const raw = fs.readFileSync(deckPath, "utf8").replace(/^\uFEFF/, "");
const parsed = JSON.parse(raw);

const missingImages = [];
const missingImageFiles = [];

(parsed.slides || []).forEach((slide) => {
  if (!slide.image) {
    missingImages.push(slide.id);
    return;
  }

  if (slide.image.startsWith("./")) {
    const resolvedPath = path.join(root, "apps", "presentation", "public", slide.image.slice(2));
    if (!fs.existsSync(resolvedPath)) {
      missingImageFiles.push(`${slide.id}:${resolvedPath}`);
    }
  }
});

if (missingImages.length > 0) {
  fail(`slides missing generated/attached images: ${missingImages.join(", ")}`);
}

if (missingImageFiles.length > 0) {
  fail(`slide image files missing on disk: ${missingImageFiles.join(", ")}`);
}

console.log(`Presentation release check passed: ${parsed.slides.length} slides have images and are publish-ready.`);
