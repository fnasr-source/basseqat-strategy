const path = require("path");
const admin = require("firebase-admin");
const { loadServiceAccount } = require("./_firebase-credentials");

const projectRoot = path.resolve(__dirname, "..");
const { serviceAccountPath, serviceAccount } = loadServiceAccount(projectRoot);

if (!serviceAccountPath || !serviceAccount) {
  console.error("Missing service account.");
  console.error("Set GOOGLE_APPLICATION_CREDENTIALS or add firebase/service-account.json.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function main() {
  const db = admin.firestore();
  const [mainDoc, adminDoc] = await Promise.all([
    db.collection("appConfig").doc("main").get(),
    db.collection("appConfig").doc("adminAccessControl").get()
  ]);

  console.log(`Project: ${serviceAccount.project_id}`);
  console.log(`Loaded service account: ${serviceAccountPath}`);

  if (!mainDoc.exists) {
    console.error("Missing appConfig/main.");
    process.exit(1);
  }

  if (!adminDoc.exists) {
    console.error("Missing appConfig/adminAccessControl.");
    process.exit(1);
  }

  console.log("Config docs found:");
  console.log("- appConfig/main");
  console.log("- appConfig/adminAccessControl");
  console.log("Config verification passed.");
}

main().catch((error) => {
  console.error("Config verification failed:", error.message);
  process.exit(1);
});
