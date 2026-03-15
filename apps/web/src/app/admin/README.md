# Admin Module Notes

Baseline reusable modules for new clients:
- `/admin`
- `/admin/leads`
- `/admin/crm`
- `/admin/campaign-flows`
- `/admin/ad-copies`
- `/admin/whatsapp`
- `/admin/messaging/cockpit`
- `/admin/client-portal`
- `/admin/settings/*`
- `/admin/health`

Preferred behavior:
- client collaboration lives in `client-portal`, `campaign-flows`, and `ad-copies`
- operational messaging lives in `whatsapp` and `messaging/cockpit`
- roles and sections are driven by `userType` plus `adminRole`
