const path = require("path");

const { loadResearchEnv } = require("./lib/load-research-env");
const {
  ensureDir,
  normalizeExa,
  normalizeFirecrawl,
  normalizeTavily,
  parseArgs,
  projectRoot,
  readJson,
  renderFinding,
  slugify,
  taskDefaults,
  timestamp,
  updateSourceLog,
  writeFile,
  writeJson
} = require("./lib/research-runner");

loadResearchEnv();

async function postJson(url, headers, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  let payload = null;

  try {
    payload = JSON.parse(text);
  } catch (error) {
    payload = text;
  }

  if (!response.ok) {
    throw new Error(
      `Request failed for ${url}: ${
        typeof payload === "string" ? payload : JSON.stringify(payload)
      }`
    );
  }

  return payload;
}

async function runFirecrawl(task, defaults) {
  if (!process.env.FIRECRAWL_API_KEY) {
    throw new Error("FIRECRAWL_API_KEY is missing.");
  }

  const query = task.query;
  const body = {
    query,
    limit: defaults.maxResults,
    country: defaults.country,
    ignoreInvalidURLs: true,
    scrapeOptions: {
      formats: [{ type: "markdown" }]
    }
  };

  if (task.location) {
    body.location = task.location;
  }
  if (task.tbs) {
    body.tbs = task.tbs;
  }

  const payload = await postJson(
    "https://api.firecrawl.dev/v2/search",
    { Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}` },
    body
  );

  return {
    payload,
    items: normalizeFirecrawl(task, payload)
  };
}

async function runExa(task, defaults) {
  if (!process.env.EXA_API_KEY) {
    throw new Error("EXA_API_KEY is missing.");
  }

  const payload = await postJson(
    "https://api.exa.ai/search",
    { "x-api-key": process.env.EXA_API_KEY },
    {
      query: task.query,
      numResults: defaults.maxResults,
      text: true
    }
  );

  return {
    payload,
    items: normalizeExa(task, payload)
  };
}

async function runTavily(task, defaults) {
  if (!process.env.TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY is missing.");
  }

  const body = {
    query: task.query,
    search_depth: defaults.searchDepth,
    max_results: defaults.maxResults,
    include_answer: false,
    include_raw_content: "markdown"
  };

  if (Array.isArray(task.includeDomains) && task.includeDomains.length > 0) {
    body.include_domains = task.includeDomains;
  }
  if (Array.isArray(task.excludeDomains) && task.excludeDomains.length > 0) {
    body.exclude_domains = task.excludeDomains;
  }

  const payload = await postJson(
    "https://api.tavily.com/search",
    { Authorization: `Bearer ${process.env.TAVILY_API_KEY}` },
    body
  );

  return {
    payload,
    items: normalizeTavily(task, payload)
  };
}

function getRunner(provider) {
  if (provider === "firecrawl") {
    return runFirecrawl;
  }
  if (provider === "exa") {
    return runExa;
  }
  if (provider === "tavily") {
    return runTavily;
  }

  throw new Error(`Unsupported provider: ${provider}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = readJson(args.configPath);
  const enabledTasks = (config.tasks || []).filter(
    (task) => task.enabled && (!args.provider || task.provider === args.provider)
  );

  ensureDir("docs/research/data");
  ensureDir("docs/research/findings");

  if (enabledTasks.length === 0) {
    console.log("No enabled research tasks matched the current filter.");
    return;
  }

  const sourceEntries = [];

  for (const task of enabledTasks) {
    const defaults = taskDefaults(config, task);
    const runner = getRunner(task.provider);
    console.log(`Running task ${task.id} with provider ${task.provider}...`);

    const { payload, items } = await runner(task, defaults);
    const stamp = timestamp();
    const baseName = `${stamp}-${slugify(task.id || task.query)}`;
    const rawRelativePath = path.join("docs/research/data", `${baseName}.json`);
    const findingRelativePath = path.join("docs/research/findings", `${baseName}.md`);

    writeJson(rawRelativePath, payload);
    writeFile(findingRelativePath, `${renderFinding(task, items, rawRelativePath)}\n`);
    sourceEntries.push(...items);

    console.log(`- wrote raw output to ${rawRelativePath}`);
    console.log(`- wrote finding summary to ${findingRelativePath}`);
    console.log(`- collected ${items.length} source entries`);
  }

  updateSourceLog(sourceEntries);
  console.log("Updated docs/research/source-log.md");
}

main().catch((error) => {
  console.error("Research automation failed.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
