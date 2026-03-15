const { loadResearchEnv } = require("./lib/load-research-env");

loadResearchEnv();

async function main() {
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey) {
    console.error("Missing TAVILY_API_KEY. Set it in .env.research.local or the environment.");
    process.exit(1);
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      query: "OpenAI",
      search_depth: "basic",
      max_results: 1,
      include_answer: false
    })
  });

  const text = await response.text();
  let payload = null;

  try {
    payload = JSON.parse(text);
  } catch (error) {
    payload = text;
  }

  if (!response.ok) {
    console.error("Tavily verification failed.");
    console.error(typeof payload === "string" ? payload : JSON.stringify(payload, null, 2));
    process.exit(1);
  }

  const resultCount = Array.isArray(payload?.results) ? payload.results.length : 0;

  console.log("Tavily verification succeeded.");
  console.log(JSON.stringify({ resultCount }, null, 2));
}

main().catch((error) => {
  console.error("Tavily verification failed.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
