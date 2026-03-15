# New Project Operations Checklist

Use this after cloning the starter into a real client repo.

## Repo Setup
- [ ] placeholders replaced
- [ ] repo remote confirmed
- [ ] production branch confirmed

## Firebase Setup
- [ ] project created
- [ ] service account placed at `firebase/service-account.json`
- [ ] web app created
- [ ] Auth enabled
- [ ] Firestore created
- [ ] Storage enabled
- [ ] App Hosting backend connected

## Baseline Config
- [ ] `appConfig/main` created
- [ ] `appConfig/adminAccessControl` created
- [ ] break-glass emails confirmed
- [ ] `.env.local` created for `apps/web`
- [ ] `apps/web/apphosting.yaml` updated

## Verification
- [ ] `npm run firebase:verify:config`
- [ ] `npm run firebase:verify:admin`
- [ ] rules deployed
- [ ] initial App Hosting push completed

## Delivery Readiness
- [ ] client KB loaded
- [ ] strategy and copy docs approved
- [ ] implementation plan approved
- [ ] launch checklist prepared
