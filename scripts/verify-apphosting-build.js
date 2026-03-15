const fs = require("fs");
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

async function callApi(url, accessToken) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) {
    throw new Error(`API ${url} failed with ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

async function main() {
  const expectedHash = (process.argv[2] || "").trim();

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
  const base = `https://firebaseapphosting.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/backends/${BACKEND_ID}`;
  const traffic = await callApi(`${base}/traffic`, accessToken);
  const builds = await callApi(`${base}/builds?pageSize=50`, accessToken);

  const currentBuildRef = traffic.current?.splits?.[0]?.build || "";
  const currentBuildId = currentBuildRef.split("/").pop();
  const currentBuild = (builds.builds || []).find((build) => (build.name || "").endsWith(`/${currentBuildId}`));
  const source = currentBuild?.source?.codebase || {};

  console.log(`Project: ${PROJECT_ID}`);
  console.log(`Backend: ${BACKEND_ID}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Loaded service account: ${serviceAccountPath}`);
  console.log(`Current live build: ${currentBuildId || "unknown"}`);
  console.log(`Current commit: ${source.hash || "unknown"}`);

  if (expectedHash && source.hash !== expectedHash) {
    console.error(`Expected commit ${expectedHash} but live build is ${source.hash || "unknown"}.`);
    process.exit(1);
  }

  console.log("App Hosting verification check passed.");
}

main().catch((error) => {
  console.error("App Hosting verification failed:", error.message);
  process.exit(1);
});
