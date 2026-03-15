# Starter Repo Setup

This repository should be treated as the master private starter for Admireworks client projects.

## Recommended GitHub Setup
- Repo name: `admireworks-client-os-starter`
- Visibility: private
- Purpose: template / base repo for new client projects

## Recommended Branching
- Default branch: `main`
- Protect `main` if multiple team members will maintain the starter
- Use short-lived branches for starter improvements

## Recommended Workflow
1. Improve the starter in this repo.
2. For a new client, create a new repo from this starter.
3. Do not try to keep old client repos auto-synced to the starter.
4. When a reusable improvement is discovered in a client repo, port it back manually here.

## What Belongs In The Starter
- reusable docs
- reusable prompts
- reusable framework doctrine
- reusable app scaffold contracts
- reusable scripts
- reusable assets
- reusable Firebase rules, indexes, and function scaffolds
- reusable App Hosting and admin-auth runbooks

## What Does Not Belong In The Starter
- real client secrets
- real client branding as source of truth
- real client-specific copy
- real client production environment values
- one-off modules that are not generally reusable

## Firebase Rule
- Keep service-account-based workflows as the default pattern.
- Never assume a maintainer will be logged in interactively to Firebase.
- Prefer scripts that can run from `GOOGLE_APPLICATION_CREDENTIALS` or `firebase/service-account.json`.
