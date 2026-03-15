# Scripts

Keep reusable scripts here.

Current starter script:
- `new-client-rename-check.js` verifies that placeholder values were replaced after duplication

Operational starter scripts:
- `verify-config.js` checks baseline Firebase config docs using the project service account
- `verify-admin-access.js` checks admin allowlists and break-glass emails
- `verify-apphosting-build.js` checks the live App Hosting commit
- `trigger-apphosting-rollout.js` triggers an App Hosting rollout for a specific commit
- `deploy-rules.js` deploys Firestore rules using the service account
- `research-provider-check.js` checks which research APIs are configured
- `generate-research-work-order.js` builds a repeatable research brief from the project docs
- `verify-firecrawl-access.js` verifies Firecrawl authentication using the local research env file
- `verify-exa-access.js` verifies Exa authentication using a low-cost search request
- `verify-tavily-access.js` verifies Tavily authentication using a low-cost search request
- `run-research-automation.js` executes configured research tasks and writes raw outputs, findings, and source-log entries

Shared rule:
- prefer `GOOGLE_APPLICATION_CREDENTIALS`
- otherwise use `firebase/service-account.json`
- do not assume interactive CLI login
