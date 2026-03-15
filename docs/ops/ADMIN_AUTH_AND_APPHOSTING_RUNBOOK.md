# Admin Auth And App Hosting Runbook

This runbook prevents recurring admin-login outages and deployment confusion.

## Core Guardrails
1. Use the project service account through `GOOGLE_APPLICATION_CREDENTIALS` or `firebase/service-account.json`.
2. Keep admin allowlists in Firestore, not only in code.
3. Verify the live App Hosting commit after pushing to production.
4. Do not rely on interactive `firebase login` as the primary production workflow.

## Baseline Documents
- `appConfig/main`
- `appConfig/adminAccessControl`

## Required Deployment Workflow
1. Set the service account path if needed:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/firebase/service-account.json"
```
2. Verify config:
```bash
npm run firebase:verify:config
```
3. Verify admin allowlists:
```bash
npm run firebase:verify:admin
```
4. Push the target commit to the production branch.
5. Verify the live App Hosting commit:
```bash
npm run apphosting:verify -- <commit_sha>
```

## If Admin Login Fails
1. confirm the user email is normalized and expected
2. verify `appConfig/adminAccessControl`
3. verify `appConfig/main`
4. verify the live App Hosting commit is the expected commit
5. verify rules deployment status and runtime permissions

## If Auto Rollout Is Delayed
Trigger a rollout for the pushed commit:
```bash
npm run apphosting:rollout -- <commit_sha>
```
