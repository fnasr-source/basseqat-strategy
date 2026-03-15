const path = require("path");
const admin = require("firebase-admin");
const { loadServiceAccount } = require("./_firebase-credentials");

const BREAK_GLASS_ADMINS = [
  "fnasr@admireworks.com",
  "media@admire8.com"
];

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

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
  const [accessDoc, mainDoc] = await Promise.all([
    db.collection("appConfig").doc("adminAccessControl").get(),
    db.collection("appConfig").doc("main").get()
  ]);

  const allowedEmails = Array.isArray(accessDoc.data()?.allowedEmails) ? accessDoc.data().allowedEmails : [];
  const superAdminEmails = Array.isArray(mainDoc.data()?.superAdminEmails) ? mainDoc.data().superAdminEmails : [];

  const merged = new Set(
    [...allowedEmails, ...superAdminEmails].map(normalizeEmail).filter(Boolean)
  );

  console.log(`Project: ${serviceAccount.project_id}`);
  console.log(`Loaded service account: ${serviceAccountPath}`);
  console.log(`Merged admin count: ${merged.size}`);

  const missingBreakGlass = BREAK_GLASS_ADMINS.filter((email) => !merged.has(email));
  if (missingBreakGlass.length > 0) {
    console.error("Missing break-glass admin email(s):");
    for (const email of missingBreakGlass) {
      console.error(`- ${email}`);
    }
    process.exit(1);
  }

  console.log("Admin access configuration check passed.");
}

main().catch((error) => {
  console.error("Admin access verification failed:", error.message);
  process.exit(1);
});
