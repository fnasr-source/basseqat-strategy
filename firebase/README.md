# Firebase Backend Contract

This folder is reserved for:
- Firestore rules
- Storage rules
- Functions
- indexes
- deployment notes

## Required Files
- `firestore.rules`
- `firestore.indexes.json`
- `storage.rules`
- `functions/`

## Credential Rule
Use the client service account through:
- `firebase/service-account.json`
- or `GOOGLE_APPLICATION_CREDENTIALS`

Do not rely on interactive `firebase login` as the default production workflow.

## Verification Scripts
From the repo root:
- `npm run firebase:verify:config`
- `npm run firebase:verify:admin`
- `npm run firebase:deploy:rules`

## Source Of Truth
Use `docs/project/SCHEMA_CORE.md` as the baseline collection and access contract.
