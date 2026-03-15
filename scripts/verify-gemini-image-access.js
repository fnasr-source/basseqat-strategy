const { loadResearchEnv } = require("./lib/load-research-env");

loadResearchEnv();

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
const model = process.env.GOOGLE_GEMINI_IMAGE_MODEL_ID;

if (!apiKey) {
  console.error("Missing GOOGLE_GEMINI_API_KEY. Set it in .env.research.local or the environment.");
  process.exit(1);
}

if (!model) {
  console.error("Missing GOOGLE_GEMINI_IMAGE_MODEL_ID. Set it to the current Nano Banana 2 / Gemini 3.1 Flash Image API model ID from Google.");
  process.exit(1);
}

console.log("Gemini image generation is configured.");
console.log(`- model id: ${model}`);
console.log("- provider: Google Gemini API");
console.log("- policy: use Nano Banana 2 / Gemini 3.1 Flash Image only for this workflow.");
