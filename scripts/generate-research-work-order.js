const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");

function readFile(relativePath) {
  const fullPath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, "utf8");
}

function writeFile(relativePath, content) {
  const fullPath = path.join(projectRoot, relativePath);
  fs.writeFileSync(fullPath, content, "utf8");
}

function section(title, body) {
  return `## ${title}\n${body.trim()}\n`;
}

function main() {
  const projectContext = readFile("docs/project/PROJECT_CONTEXT.md") || "Missing PROJECT_CONTEXT.md";
  const kbIndex = readFile("docs/client_kb/INDEX.md") || "Missing INDEX.md";
  const missingInputs = readFile("docs/client_kb/MISSING_INPUTS.md") || "Missing MISSING_INPUTS.md";

  const today = new Date().toISOString().slice(0, 10);
  const content = [
    "# Research Work Order",
    "",
    `Generated: ${today}`,
    "",
    "Use this file as the structured brief for browser/API research before strategy synthesis.",
    "",
    section("Project Context Snapshot", projectContext),
    section("Client KB Snapshot", kbIndex),
    section("Missing Inputs Snapshot", missingInputs),
    section(
      "Required Research Outputs",
      [
        "- docs/research/research-budget.md",
        "- docs/research/research-report.md",
        "- docs/research/competitor-scan.md",
        "- docs/research/customer-language-bank.md",
        "- docs/research/market-environment-scan.md",
        "- docs/research/source-log.md",
        "- docs/research/research-review.md",
        "- docs/research/CONTAMINATION_CHECKLIST.md"
      ].join("\n")
    ),
    section(
      "Provider Guidance",
      [
        "- Start with the documented budget and tool choice in docs/research/research-budget.md.",
        "- Use Firecrawl for web search plus content extraction when configured.",
        "- Use Perplexity for web-grounded synthesis and follow-up question generation when configured.",
        "- Use Exa or Tavily only as optional enhancements, not as the sole evidence layer.",
        "- Use Google Antigravity or browser tooling for visual/manual validation and edge cases."
      ].join("\n")
    ),
    section(
      "Rules",
      [
        "- Do not finalize strategy from this work order alone.",
        "- Separate source-backed facts, inference, and open questions.",
        "- Record URLs and evidence notes in docs/research/source-log.md.",
        "- Record contamination risks and their resolution in docs/research/CONTAMINATION_CHECKLIST.md.",
        "- If critical inputs are still missing, ask before moving into strategy synthesis.",
        "- Do not import assumptions from another client without revalidation."
      ].join("\n")
    )
  ].join("\n");

  writeFile("docs/research/work-order.md", content);
  console.log("Generated docs/research/work-order.md");
}

main();
