const fs = require("fs");
const path = require("path");

function candidateFiles(projectRoot) {
  const sharedOverride = process.env.ADMIREWORKS_SHARED_RESEARCH_ENV;
  const homeDir = process.env.HOME || process.env.USERPROFILE || "";

  return [
    sharedOverride || null,
    homeDir ? path.join(homeDir, ".admireworks", "research.env") : null,
    path.join(projectRoot, ".env.research.local"),
    path.join(projectRoot, ".env.research")
  ].filter(Boolean);
}

function parseLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) {
    return null;
  }

  const separatorIndex = trimmed.indexOf("=");
  if (separatorIndex === -1) {
    return null;
  }

  const key = trimmed.slice(0, separatorIndex).trim();
  let value = trimmed.slice(separatorIndex + 1).trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return { key, value };
}

function loadFile(fullPath) {
  if (!fs.existsSync(fullPath)) {
    return false;
  }

  const contents = fs.readFileSync(fullPath, "utf8");
  const lines = contents.split(/\r?\n/);

  for (const line of lines) {
    const parsed = parseLine(line);
    if (!parsed || !parsed.key || process.env[parsed.key]) {
      continue;
    }
    process.env[parsed.key] = parsed.value;
  }

  return true;
}

function loadResearchEnv() {
  const projectRoot = path.resolve(__dirname, "..", "..");

  for (const fullPath of candidateFiles(projectRoot)) {
    loadFile(fullPath);
  }
}

module.exports = {
  loadResearchEnv
};
