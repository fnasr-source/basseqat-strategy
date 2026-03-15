const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const placeholders = [
  "[CLIENT_NAME]",
  "[CLIENT_SLUG]",
  "[PRIMARY_MARKET]",
  "[SECONDARY_MARKETS]",
  "[CORE_LANGUAGE]",
  "[PRIMARY_OFFER]",
  "[OFFER_LADDER_SUMMARY]",
  "[CHANNEL_MIX]",
  "[priority_1]",
  "[priority_2]",
  "[priority_3]",
  "[constraint_1]",
  "[constraint_2]",
  "[YYYY-MM-DD]"
];

const filesToCheck = [
  "docs/project/START_HERE.md",
  "docs/project/PROJECT_CONTEXT.md",
  "docs/project/PROJECT_PROFILE.md",
  "docs/project/CONTINUE_PROMPT.md",
  "docs/active_state/README.md",
  "apps/web/apphosting.yaml"
];

const matches = [];

for (const relativePath of filesToCheck) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, "utf8");
  for (const placeholder of placeholders) {
    if (content.includes(placeholder)) {
      matches.push({ file: relativePath, placeholder });
    }
  }
}

if (matches.length === 0) {
  console.log("No required placeholder tokens found.");
  process.exit(0);
}

console.log("Required placeholder tokens still present:\n");
for (const match of matches) {
  console.log(`- ${match.file}: ${match.placeholder}`);
}
process.exit(1);
