const path = require("path");
const fs = require("fs");
const admin = require("firebase-admin");
const { loadServiceAccount } = require("./_firebase-credentials");

const projectRoot = path.resolve(__dirname, "..");
const { serviceAccountPath, serviceAccount } = loadServiceAccount(projectRoot);

if (!serviceAccountPath || !serviceAccount) {
  console.error("Missing service account.");
  console.error("Set GOOGLE_APPLICATION_CREDENTIALS or add firebase/service-account.json.");
  process.exit(1);
}

const rulesPath = path.join(projectRoot, "firebase", "firestore.rules");
if (!fs.existsSync(rulesPath)) {
  console.error(`Rules file not found: ${rulesPath}`);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function main() {
  const client = admin.securityRules();
  const rulesContent = fs.readFileSync(rulesPath, "utf8");

  console.log(`Project: ${serviceAccount.project_id}`);
  console.log(`Loaded service account: ${serviceAccountPath}`);
  console.log("Creating Firestore ruleset...");

  const ruleset = await client.createRuleset({
    content: rulesContent,
    name: "firestore.rules"
  });

  console.log(`Ruleset created: ${ruleset.name}`);
  console.log("Releasing ruleset...");
  await client.releaseFirestoreRuleset(ruleset.name);
  console.log("Firestore rules deployed successfully.");
}

main().catch((error) => {
  console.error("Rules deployment failed:", error.message);
  process.exit(1);
});
