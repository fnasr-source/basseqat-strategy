# Launch Checklist

## Strategy Readiness
- [ ] Core strategy approved
- [ ] Offer architecture approved
- [ ] Page specs approved
- [ ] Campaign flows approved
- [ ] Ad copy approved
- [ ] Tracking plan defined

## Build Readiness
- [ ] Firebase project created
- [ ] Service account placed at `firebase/service-account.json` or `GOOGLE_APPLICATION_CREDENTIALS` set
- [ ] `appConfig/main` created
- [ ] `appConfig/adminAccessControl` created
- [ ] Admin users configured
- [ ] Lead schema confirmed
- [ ] WhatsApp config confirmed
- [ ] Health checks defined
- [ ] Placeholder values removed

## Verification
- [ ] `npm run firebase:verify:config` passes
- [ ] `npm run firebase:verify:admin` passes
- [ ] Firestore rules are deployed
- [ ] App Hosting config reviewed
- [ ] Live App Hosting commit verified after push

## Launch QA
- [ ] Lead capture works
- [ ] Attribution is stored
- [ ] WhatsApp flow starts correctly
- [ ] Campaign review modules are usable
- [ ] Client portal task board is ready

## Post-Launch
- [ ] Dashboard shows baseline metrics
- [ ] Messaging cockpit shows queue state
- [ ] First daily ops review scheduled
- [ ] First weekly client review scheduled
