const { loadResearchEnv } = require("./lib/load-research-env");

loadResearchEnv();

async function main() {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  if (!apiKey) {
    console.error("Missing FIRECRAWL_API_KEY. Set it in .env.research.local or the environment.");
    process.exit(1);
  }

  const endpoints = [
    "https://api.firecrawl.dev/v2/team/credit-usage",
    "https://api.firecrawl.dev/v1/team/credit-usage"
  ];

  let lastFailure = null;

  for (const endpoint of endpoints) {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    const text = await response.text();
    let payload = null;

    try {
      payload = JSON.parse(text);
    } catch (error) {
      payload = text;
    }

    if (response.ok) {
      console.log("Firecrawl verification succeeded.");
      console.log(`Endpoint: ${endpoint}`);
      console.log(typeof payload === "string" ? payload : JSON.stringify(payload, null, 2));
      return;
    }

    lastFailure = {
      endpoint,
      payload
    };
  }

  console.error("Firecrawl verification failed.");
  if (lastFailure) {
    console.error(`Endpoint: ${lastFailure.endpoint}`);
    console.error(
      typeof lastFailure.payload === "string"
        ? lastFailure.payload
        : JSON.stringify(lastFailure.payload, null, 2)
    );
  }
  process.exit(1);
}

main().catch((error) => {
  console.error("Firecrawl verification failed.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
