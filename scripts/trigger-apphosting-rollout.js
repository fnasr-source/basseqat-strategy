const path = require("path");
const crypto = require("crypto");
const { loadServiceAccount } = require("./_firebase-credentials");

const projectRoot = path.resolve(__dirname, "..");
const { serviceAccountPath, serviceAccount } = loadServiceAccount(projectRoot);

const PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  serviceAccount?.project_id;
const LOCATION = process.env.APPHOSTING_LOCATION || "europe-west4";
const BACKEND_ID = process.env.APPHOSTING_BACKEND_ID || PROJECT_ID;

function base64Url(input) {
  const source = typeof input === "string" ? input : JSON.stringify(input);
  return Buffer.from(source)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(serviceAccountValue) {
  const now = Math.floor(Date.now() / 1000);
  const unsignedToken = `${base64Url({ alg: "RS256", typ: "JWT" })}.${base64Url({
    iss: serviceAccountValue.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  })}`;

  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsignedToken)
    .sign(serviceAccountValue.private_key, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: `${unsignedToken}.${signature}`
  });

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body
  }).then((res) => res.json());

  if (!tokenResponse.access_token) {
    throw new Error(`Unable to obtain access token: ${JSON.stringify(tokenResponse)}`);
  }

  return tokenResponse.access_token;
}

async function apiRequest(url, accessToken, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(options.body ? { "content-type": "application/json" } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    throw new Error(`API ${url} failed with ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

async function pollOperation(name, accessToken, label) {
  const deadline = Date.now() + 25 * 60 * 1000;
  const opUrl = `https://firebaseapphosting.googleapis.com/v1beta/${name}`;

  while (Date.now() < deadline) {
    const operation = await apiRequest(opUrl, accessToken);
    if (operation.done) {
      if (operation.error) {
        throw new Error(`${label} failed: ${JSON.stringify(operation.error)}`);
      }
      return operation.response || operation.metadata || operation;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  throw new Error(`${label} timed out while waiting for completion.`);
}

async function main() {
  const commitHash = (process.argv[2] || "").trim();

  if (!commitHash) {
    console.error("Usage: node scripts/trigger-apphosting-rollout.js <commit_sha>");
    process.exit(1);
  }

  if (!serviceAccountPath || !serviceAccount) {
    console.error("Missing service account.");
    console.error("Set GOOGLE_APPLICATION_CREDENTIALS or add firebase/service-account.json.");
    process.exit(1);
  }

  if (!PROJECT_ID || !BACKEND_ID) {
    console.error("Missing FIREBASE_PROJECT_ID or APPHOSTING_BACKEND_ID.");
    process.exit(1);
  }

  const accessToken = await getAccessToken(serviceAccount);
  const apiBase = `https://firebaseapphosting.googleapis.com/v1beta/projects/${PROJECT_ID}/locations/${LOCATION}/backends/${BACKEND_ID}`;
  const rolloutId = `manual-${Date.now()}`;

  const buildOp = await apiRequest(
    `${apiBase}/builds?buildId=${encodeURIComponent(rolloutId)}`,
    accessToken,
    {
      method: "POST",
      body: {
        source: {
          codebase: {
            commit: commitHash
          }
        }
      }
    }
  );

  const buildRef = `projects/${PROJECT_ID}/locations/${LOCATION}/backends/${BACKEND_ID}/builds/${rolloutId}`;
  const rolloutOp = await apiRequest(
    `${apiBase}/rollouts?rolloutId=${encodeURIComponent(rolloutId)}&validateOnly=false`,
    accessToken,
    {
      method: "POST",
      body: {
        build: buildRef
      }
    }
  );

  console.log(`Project: ${PROJECT_ID}`);
  console.log(`Backend: ${BACKEND_ID}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Loaded service account: ${serviceAccountPath}`);
  console.log(`Commit: ${commitHash}`);

  await Promise.all([
    pollOperation(buildOp.name, accessToken, "Build operation"),
    pollOperation(rolloutOp.name, accessToken, "Rollout operation")
  ]);

  console.log("App Hosting rollout trigger completed successfully.");
}

main().catch((error) => {
  console.error("App Hosting rollout trigger failed:", error.message);
  process.exit(1);
});
