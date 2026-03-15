# Web App Scaffold Contract

This folder defines the future admin implementation surface for each new client project.

## Baseline Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Auth + Firestore
- Firebase App Hosting

## Route Structure
Use route groups:
- `(public)` for funnel pages and thank-you flows
- `(admin)` for command-center routes
- `api/` for server routes and webhooks

## Core Admin Modules
- dashboard
- leads
- CRM
- campaign flows
- ad copies
- WhatsApp
- messaging cockpit
- client portal
- settings
- health

## Required Local Files
- `.env.local`
- `apphosting.yaml`

## Rule
Do not build vertical-specific public funnels here until the related docs in `docs/pages/` are approved.
