const fs = require("fs");
const path = require("path");

function projectRoot() {
  return path.resolve(__dirname, "..", "..");
}

function readJson(relativePath) {
  const fullPath = path.join(projectRoot(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function ensureDir(relativePath) {
  const fullPath = path.join(projectRoot(), relativePath);
  fs.mkdirSync(fullPath, { recursive: true });
  return fullPath;
}

function writeFile(relativePath, contents) {
  const fullPath = path.join(projectRoot(), relativePath);
  fs.writeFileSync(fullPath, contents, "utf8");
  return fullPath;
}

function writeJson(relativePath, payload) {
  return writeFile(relativePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function parseArgs(argv) {
  const args = { provider: null, configPath: "docs/research/research-requests.json" };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--config" && argv[index + 1]) {
      args.configPath = argv[index + 1];
      index += 1;
      continue;
    }

    if (!arg.startsWith("--") && !args.provider) {
      args.provider = arg;
    }
  }

  return args;
}

function taskDefaults(config, task) {
  return {
    maxResults: task.maxResults || config.defaults?.maxResults || 5,
    country: task.country || config.defaults?.country || "US",
    searchDepth: task.searchDepth || config.defaults?.searchDepth || "basic"
  };
}

function firstText(value, fallback = "") {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string").join(" ");
  }
  return fallback;
}

function shorten(value, max = 300) {
  const text = firstText(value, "").replace(/\s+/g, " ").trim();
  if (!text) {
    return "";
  }
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function normalizeFirecrawl(task, payload) {
  const web = payload?.data?.web || [];
  return web.map((result) => ({
    title: result.title || result.metadata?.title || "",
    url: result.url || result.metadata?.sourceURL || result.metadata?.url || "",
    snippet: shorten(result.description || result.metadata?.description || result.markdown),
    content: firstText(result.markdown, ""),
    provider: "firecrawl",
    supports: task.supports || "",
    sourceType: "search result"
  }));
}

function normalizeExa(task, payload) {
  const results = payload?.results || [];
  return results.map((result) => ({
    title: result.title || "",
    url: result.url || "",
    snippet: shorten(result.text),
    content: firstText(result.text, ""),
    provider: "exa",
    supports: task.supports || "",
    sourceType: "search result"
  }));
}

function normalizeTavily(task, payload) {
  const results = payload?.results || [];
  return results.map((result) => ({
    title: result.title || "",
    url: result.url || "",
    snippet: shorten(result.content),
    content: firstText(result.raw_content || result.content, ""),
    provider: "tavily",
    supports: task.supports || "",
    sourceType: "search result"
  }));
}

function escapeCell(value) {
  return String(value || "").replace(/\|/g, "\\|").replace(/\n/g, " ").trim();
}

function sourceLogHeader() {
  return [
    "# Source Log",
    "",
    "| Source URL | Source Type | What It Supports | Fact / Inference | Notes |",
    "|---|---|---|---|---|"
  ].join("\n");
}

function updateSourceLog(entries) {
  const relativePath = "docs/research/source-log.md";
  const fullPath = path.join(projectRoot(), relativePath);
  let lines = [];

  if (fs.existsSync(fullPath)) {
    const existing = fs.readFileSync(fullPath, "utf8").trim();
    if (existing && !existing.startsWith("# Source Log Draft")) {
      lines = existing.split(/\r?\n/);
    }
  }

  if (lines.length === 0) {
    lines = sourceLogHeader().split("\n");
  }

  const existingUrls = new Set(
    lines
      .filter((line) => line.startsWith("|"))
      .map((line) => line.split("|")[1]?.trim())
      .filter(Boolean)
  );

  for (const entry of entries) {
    if (!entry.url || existingUrls.has(entry.url)) {
      continue;
    }

    lines.push(
      `| ${escapeCell(entry.url)} | ${escapeCell(entry.sourceType)} | ${escapeCell(entry.supports)} | fact | ${escapeCell(`provider=${entry.provider}`)} |`
    );
    existingUrls.add(entry.url);
  }

  fs.writeFileSync(fullPath, `${lines.join("\n")}\n`, "utf8");
}

function renderFinding(task, items, rawRelativePath) {
  return [
    `# Research Finding: ${task.id}`,
    "",
    `- Provider: ${task.provider}`,
    `- Query: ${task.query}`,
    `- Supports: ${task.supports || ""}`,
    `- Raw output: \`${rawRelativePath}\``,
    task.notes ? `- Notes: ${task.notes}` : null,
    "",
    "## Top Results",
    ...items.map((item, index) =>
      [
        `${index + 1}. ${item.title || item.url}`,
        `   - URL: ${item.url}`,
        item.snippet ? `   - Snippet: ${item.snippet}` : null
      ]
        .filter(Boolean)
        .join("\n")
    )
  ]
    .filter(Boolean)
    .join("\n");
}

module.exports = {
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
};
