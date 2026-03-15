const { loadResearchEnv } = require("./lib/load-research-env");

loadResearchEnv();

const providers = [
  {
    id: "perplexity",
    env: "PERPLEXITY_API_KEY",
    purpose: "web-grounded synthesis and follow-up questioning"
  },
  {
    id: "firecrawl",
    env: "FIRECRAWL_API_KEY",
    purpose: "search, scrape, and crawl extraction"
  },
  {
    id: "exa",
    env: "EXA_API_KEY",
    purpose: "structured discovery and verification"
  },
  {
    id: "tavily",
    env: "TAVILY_API_KEY",
    purpose: "agent-first search, extract, crawl, and research"
  }
];

function statusLabel(isReady) {
  return isReady ? "ready" : "missing";
}

function printLine(provider, isReady) {
  console.log(
    `- ${provider.id}: ${statusLabel(isReady)} (${provider.env}) -> ${provider.purpose}`
  );
}

function main() {
  const readiness = providers.map((provider) => ({
    ...provider,
    ready: Boolean(process.env[provider.env])
  }));

  console.log("Research provider readiness:\n");
  readiness.forEach((provider) => printLine(provider, provider.ready));

  const exa = readiness.find((provider) => provider.id === "exa")?.ready;
  const tavily = readiness.find((provider) => provider.id === "tavily")?.ready;
  const perplexity = readiness.find((provider) => provider.id === "perplexity")?.ready;
  const extractionProviders = readiness
    .filter((provider) => ["firecrawl", "tavily"].includes(provider.id) && provider.ready)
    .map((provider) => provider.id);
  const automatedResearchReady = perplexity && extractionProviders.length > 0;

  console.log("\nResearch mode:");
  if (automatedResearchReady) {
    console.log(`- Automated research stack ready: perplexity + ${extractionProviders.join(" + ")}`);
  } else if (extractionProviders.length > 0) {
    console.log("- Blocked: extraction is available, but automated synthesis is unavailable until Perplexity is configured.");
  } else if (perplexity) {
    console.log("- Blocked: Perplexity is available, but evidence gathering still needs Firecrawl or Tavily.");
  } else {
    console.log("- Blocked: no automated research stack is configured yet. Add Perplexity plus Firecrawl or Tavily.");
  }

  console.log("\nRecommended stack:");
  if (automatedResearchReady) {
    console.log(`- Primary stack available: perplexity + ${extractionProviders.join(" + ")}`);
  } else {
    console.log("- Standard requirement: Perplexity plus at least one extraction provider (Firecrawl or Tavily).");
  }

  if (exa) {
    console.log("- Optional structured research providers available:");
    console.log("  - exa");
  }

  if (tavily && !automatedResearchReady) {
    console.log("- Tavily is available as an extraction layer once Perplexity is configured.");
  }

  process.exit(automatedResearchReady ? 0 : 1);
}

main();
