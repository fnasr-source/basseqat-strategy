# Telegram Nurture Channel — Technical Spec
*Created: March 22, 2026 | Phase 4 Execution Plan*

## Overview
Telegram is proposed as an automated nurture channel alongside WhatsApp. This document covers feasibility, architecture, implementation approach, and the content calendar for the Basseqat Telegram channel.

**Context (from March 17 meeting):** Email open rates have dropped to 10-12%. WhatsApp is effective for 1:1 conversations but limited for broadcasting to a growing audience. Telegram fills the gap — it supports channels with unlimited subscribers, bot automation, and rich media (videos, documents, polls).

---

## Feasibility Assessment

### ✅ Why Telegram Works for Basseqat
1. **High Arabic adoption:** Telegram is widely used in KSA, Qatar, UAE, Egypt — exactly the expat markets targeted
2. **Channel broadcast:** One-to-many broadcasting without the per-message cost of WhatsApp Business API
3. **Rich media:** Supports farm videos, PDF documents (brochures), voice messages from Khaled, polls for engagement
4. **Bot automation:** Can send scheduled content, drip sequences, and respond to joins automatically
5. **Free to operate:** No per-message fees. Bot API is free.
6. **Open rates:** Telegram channel messages typically achieve 40-60% open rates vs. email's 10-12%

### ⚠️ Limitations
- Requires users to actively join the channel (vs. being added on WhatsApp)
- Less intimate than 1:1 WhatsApp conversation
- Cannot initiate cold conversations (user must join first)

---

## Architecture

```
Lead Funnel Integration:

Ad / YouTube → Landing Page
                    │
                    ├── WhatsApp Click → 1:1 conversation (high-intent)
                    │
                    ├── Quiz / Brochure → Email (name + number captured)
                    │          │
                    │          └── Bot sends Telegram invite link for channel
                    │
                    └── Telegram Channel Join → drip broadcast sequence
```

### Components Needed

| Component | Tool | Status |
|---|---|---|
| Telegram channel | @BasseqatChannel (create) | To do |
| Telegram bot | BotFather → custom bot | To do |
| Bot hosting | Firebase Functions or simple Node.js | To do |
| Drip scheduler | Bot + scheduled Firebase task | To do |
| Channel invite link | Generated from bot | To do |
| CRM integration | Connect to Admireworks client portal | Future |

---

## Channel Setup Steps

### Step 1: Create the Channel
1. Open Telegram → New Channel
2. Name: **بَسّقات — المزرعة الحقيقية** (or simply بَسّقات)
3. Type: **Public** channel with username `@Basseqat` (check availability)
4. Add channel description: "مشروع نخيل تمور حقيقي في مصر — بنوريك كل حاجة قبل ما نسألك تقرر"

### Step 2: Create the Bot
```bash
# Message @BotFather on Telegram:
/newbot
Name: Basseqat Bot
Username: @BasseqatBot
```
Save the API token securely (add to Doppler/env secrets).

### Step 3: Bot Capabilities
The bot handles:
- **Welcome message** when user joins channel
- **Drip sequence** — scheduled posts to channel (can be automated via cron)
- **Lead magnet delivery** — send brochure PDF or quiz link when user messages bot
- **WhatsApp handoff** — after 2-3 channel messages, prompt to start WhatsApp conversation

---

## Drip Content Calendar (Weeks 1-4 post-join)

| Day | Format | Content |
|---|---|---|
| Welcome | Text + image | "أهلاً بيك في قناة بَسّقات! 👋 هنا بنوريك المشروع بالصور والتفاصيل الحقيقية." |
| Day 2 | Video/Voice | Khaled introduction — 60-90 sec voice note or video from farm |
| Day 4 | Photo set | Farm photos: land, trees, irrigation system (real Google Drive footage) |
| Day 7 | Text + PDF | "حمّل الكتيب — اعرف أكتر عن المشروع." [Brochure link] |
| Day 10 | Poll | سؤال سريع: إنت بتفكر في الاستثمار الزراعي من امتى؟ (a) دلوقتي (b) خلال 6 شهور (c) بس بتعلم |
| Day 14 | Behind scenes | Video: "يوم في المزرعة" — real footage from operations |
| Day 18 | FAQ text | "أكتر 5 أسئلة بييجوا من المتابعين" |
| Day 21 | Objection handling | Post addressing: "ليه مش عقار؟" |
| Day 25 | Text | "لو عندك أي سؤال — ابدأ محادثة على الواتساب." [CTA with number] |
| Day 30 | Voice note | Khaled personal message to followers |

---

## Technical Implementation (Firebase Functions)

```typescript
// functions/src/telegram/channelScheduler.ts
import * as functions from 'firebase-functions';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });
const CHANNEL_ID = '@Basseqat'; // or numeric ID

// Scheduled daily post checker
export const telegramDailyPost = functions.pubsub
    .schedule('every day 09:00')
    .timeZone('Asia/Riyadh') // KSA timezone
    .onRun(async () => {
        // Check what content to post today based on schedule
        await sendScheduledContent();
    });

// Lead magnet delivery bot webhook
export const telegramWebhook = functions.https.onRequest(async (req, res) => {
    const update = req.body;
    if (update.message) {
        const chatId = update.message.chat.id;
        // Welcome new message with brochure + channel invite
        await bot.sendDocument(chatId, BROCHURE_URL, {
            caption: 'أهلاً! دي نبذة عن مشروع بَسّقات — اقرأ بالراحة وابدأ محادثة لو عندك أي سؤال.'
        });
        await bot.sendMessage(chatId, 
            `انضم لقناتنا هنا: t.me/Basseqat\nأو ابدأ محادثة واتساب: https://wa.me/201XXXXXXXXX`
        );
    }
    res.sendStatus(200);
});
```

---

## Integration with Landing Page Funnel

After quiz completion or brochure download, the thank-you page includes:
```html
<!-- After form submit -->
<div class="nurture-options">
  <a href="https://wa.me/201XXXXXXXXX?text=سلام+عايز+أعرف+أكتر+عن+بَسّقات">
    ابدأ محادثة واتساب 💬
  </a>
  <a href="https://t.me/Basseqat">
    انضم لقناة بَسّقات على تيليجرام 📡
  </a>
</div>
```

---

## Metrics to Track

| Metric | Target (Month 1) |
|---|---|
| Channel subscribers | 200+ |
| Average message open rate | >40% |
| Channel → WhatsApp conversion | >15% |
| WhatsApp → qualified lead | >30% |

---

## Action Items

- [ ] Create Telegram channel (@Basseqat or similar — check availability)
- [ ] Set up BotFather bot, get token, store in Doppler
- [ ] Implement Firebase Function webhook for bot
- [ ] Write 30-day content calendar (detailed post copy)
- [ ] Connect channel invite link to landing page thank-you page
- [ ] Collect Khaled's voice notes for drip sequence

**Source:** March 17 strategy session, Telegram Bot API documentation
