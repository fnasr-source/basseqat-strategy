const fs = require("fs");
const path = require("path");

function candidatePaths(projectRoot) {
  return [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.join(projectRoot, "firebase", "service-account.json"),
    path.join(projectRoot, "service-account.json")
  ].filter(Boolean);
}

function findServiceAccountPath(projectRoot) {
  for (const candidate of candidatePaths(projectRoot)) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function loadServiceAccount(projectRoot) {
  const serviceAccountPath = findServiceAccountPath(projectRoot);
  if (!serviceAccountPath) {
    return { serviceAccountPath: null, serviceAccount: null };
  }

  return {
    serviceAccountPath,
    serviceAccount: JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"))
  };
}

module.exports = {
  findServiceAccountPath,
  loadServiceAccount
};
