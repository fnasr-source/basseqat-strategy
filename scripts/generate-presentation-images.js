const fs = require("fs");
const path = require("path");
const { loadResearchEnv } = require("./lib/load-research-env");

loadResearchEnv();

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
const model = process.env.GOOGLE_GEMINI_IMAGE_MODEL_ID;
const root = process.cwd();
const deckPath = path.join(root, "apps", "presentation", "content", "slides.json");
const outputDir = path.join(root, "apps", "presentation", "public", "assets", "generated");
const force = process.argv.includes("--force");
const requestedIds = process.argv
  .slice(2)
  .filter((arg) => /^\d+$/.test(arg))
  .map((value) => Number(value));

function fail(message) {
  console.error(`Image generation failed: ${message}`);
  process.exit(1);
}

if (!apiKey) {
  fail("Missing GOOGLE_GEMINI_API_KEY. Set it in .env.research.local or the environment.");
}

if (!model) {
  fail("Missing GOOGLE_GEMINI_IMAGE_MODEL_ID. Set it to the current Nano Banana 2 / Gemini 3.1 Flash Image API model ID from Google.");
}

if (!fs.existsSync(deckPath)) {
  fail(`Missing deck at ${deckPath}`);
}

function normalizePrompt(slide, deck) {
  const title = Array.isArray(slide.title) ? slide.title.join(" — ") : slide.title;
  return [
    slide.imagePrompt || slide.visualDirection || title,
    `Client: ${deck.clientName || deck.title}`,
    "Model policy: Nano Banana 2 / Gemini 3.1 Flash Image only",
    "Format: premium presentation background, documentary or conceptual, no text baked into the image",
    "Style: cinematic, high-trust, clean composition, presentation-safe, visual-first",
    "Do not include logos, captions, UI chrome, or readable typography"
  ].join("\n");
}

async function generateImage(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"]
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${errorText}`);
  }

  const data = await response.json();
  const part = (data.candidates || [])
    .flatMap((candidate) => candidate.content?.parts || [])
    .find((candidatePart) => candidatePart.inlineData?.data);

  if (!part) {
    throw new Error("No image data returned by Gemini API.");
  }

  return Buffer.from(part.inlineData.data, "base64");
}

async function main() {
  const raw = fs.readFileSync(deckPath, "utf8").replace(/^\uFEFF/, "");
  const deckFile = JSON.parse(raw);
  const slides = deckFile.slides || [];

  fs.mkdirSync(outputDir, { recursive: true });

  const selectedSlides = slides.filter((slide) => {
    if (requestedIds.length > 0 && !requestedIds.includes(slide.id)) {
      return false;
    }

    if (!slide.imagePrompt && !slide.visualDirection) {
      return false;
    }

    if (!force && slide.image) {
      return false;
    }

    return true;
  });

  if (selectedSlides.length === 0) {
    console.log("No slides selected for image generation.");
    return;
  }

  for (const slide of selectedSlides) {
    const prompt = normalizePrompt(slide, deckFile.deck || {});
    const filename = `slide-${String(slide.id).padStart(2, "0")}.png`;
    const outputPath = path.join(outputDir, filename);

    console.log(`Generating image for slide ${slide.id} with model ${model}...`);
    const imageBuffer = await generateImage(prompt);
    fs.writeFileSync(outputPath, imageBuffer);

    slide.image = `./assets/generated/${filename}`;
    slide.imageStatus = "generated";
  }

  fs.writeFileSync(deckPath, `${JSON.stringify(deckFile, null, 2)}\n`);
  console.log(`Generated ${selectedSlides.length} presentation image(s).`);
}

main().catch((error) => fail(error.message));
