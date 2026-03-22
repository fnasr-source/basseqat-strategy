# 3D Virtual Farm Tour — Feasibility Assessment
*Created: March 22, 2026 | Phase 2 Lead Magnets*

## Concept
A 3D / virtual walkthrough of the Basseqat palm farm that allows Egyptian expatriates to "visit" the farm from Saudi Arabia or anywhere else — eliminating the geographic barrier to trust-building that's currently the #1 conversion objection.

**From March 17 meeting:** Khaled approved this concept and called it "unprecedented in the agricultural sector." The goal is to make this the primary lead magnet for long-consideration personas.

---

## Why This Works

| Problem | Solution |
|---|---|
| Expats can't easily visit the farm from KSA/Gulf | Virtual tour removes the travel barrier |
| "انت بتقول بس — أنا مش شايف" objection | Visual proof at scale — 24/7 without a team |
| No competitor shows behind-the-scenes | First-mover advantage in the category |
| Trust requires seeing, not telling | StoryBrand: Guide → Plan → Show the Farm |

---

## Feasibility Options (Ranked by Cost & Quality)

### Option A: 360° Photo Tour (Recommended — Quick to Launch)
**Tools:** Matterport, Kuula, or Roundme  
**What it requires:**
- 360° camera session at the farm (GoPro MAX or Ricoh Theta — rent for ~$50/day)
- 2-4 hours of capture across key areas (entrance, irrigation, palm rows, warehouse, office)
- Upload to Kuula or Roundme (free tier available, paid plan ~$15/month)
- Embed on landing page as iframe

**Output:** Interactive panoramic tour that users navigate by clicking/swiping  
**Time to launch:** 1-2 weeks (pending camera session at farm)  
**Cost:** ~$100-300 one-time + $15/month hosting  
**Language:** Add Arabic info hotspot labels on the tour

**Recommended path:** Use **Kuula.co** — supports Arabic labels, embeds cleanly, free to start.

---

### Option B: Drone Video Walkthrough (Good for YouTube/Ads)
**What Khaled already has:** Drone footage in Google Drive  
**What's needed:** Professional edit with Arabic subtitles + voiceover  
**Output:** 3-5 minute video tour with structured sections:
1. الموقع — Where is the farm?
2. النخيل — The trees (show the 4-year-old palms)
3. الري — Irrigation system
4. التوثيق — How documentation works

**Time:** 1-2 weeks editing  
**Cost:** 1,500-3,000 EGP for professional video editor  
**Use:** Embed on landing page + run as YouTube ad + post in Telegram channel

---

### Option C: Full 3D Rendered Tour (Long-term Vision)
**Tools:** Matterport Pro2 camera + cloud processing OR photogrammetry scan  
**What it requires:**
- Professional Matterport scan session (rent equipment or hire a local service in Egypt)
- Processing + hosting on Matterport (~$69/month)
- Web embed with Arabic overlay

**Output:** Full 3D dollhouse model + walkthrough — highest quality, most immersive  
**Time to launch:** 3-4 weeks  
**Cost:** $200-500 one-time scan + $69/month hosting  
**Recommendation:** Consider after Option A is live and validated

---

## Recommended Approach: Start with Option A + B in Parallel

### Phase 1 (Weeks 1-2): Drone Video
- Request Google Drive footage from Khaled
- Commission Arabic video edit with voiceover narration
- Deploy on landing page + YouTube + Telegram

### Phase 2 (Weeks 2-4): 360° Photo Tour
- Schedule 360° camera session at the farm
- Capture: entrance, irrigation rows, young palms, mature palms, warehouse, office
- Upload to Kuula with Arabic labeling
- Embed on landing page + promote as lead magnet

### Phase 3 (Month 2-3): Validate before scaling
- Track time-on-tour, conversion to WhatsApp
- If >15% of tour visitors start WhatsApp conversation → explore Matterport upgrade

---

## Landing Page Integration

**Placement:** Section 5 of the landing page (after Authority/Khaled section)

```html
<!-- Lead Magnet: Virtual Tour -->
<section class="virtual-tour-section" dir="rtl">
  <h2>مش قادر تيجي زيارة؟ تفرج على المزرعة من كرسيك</h2>
  <p>جولة افتراضية كاملة — الأرض، النخيل، والعمليات — كلها قدامك</p>
  
  <!-- Kuula embed OR YouTube video -->
  <iframe src="https://kuula.co/share/[TOUR_ID]" 
    title="جولة المزرعة الافتراضية — بَسّقات"
    width="100%" height="500px" 
    allow="fullscreen; vr" 
    loading="lazy">
  </iframe>

  <!-- After tour: prompt for conversation -->
  <div class="after-tour-cta">
    <p>شفت المشروع؟ عندك سؤال؟</p>
    <a href="https://wa.me/201XXXXXXXXX?text=شفت+الجولة+الافتراضية+وعايز+أعرف+أكتر">
      ابدأ محادثة على الواتساب
    </a>
  </div>
</section>
```

---

## Content to Capture During Farm Visit

**Priority shots for the 360° tour:**
1. ✅ Entrance / farm gate (establishes: this is REAL)
2. ✅ Long rows of palm trees (establishes: scale + existing infrastructure)
3. ✅ Irrigation system up-close (establishes: professional operations)
4. ✅ Young palms (4 years) next to a person for scale
5. ✅ Farm equipment / warehouse
6. ✅ Documentation / office area (establishes: records are kept)
7. ❌ Solar panels — photograph separately, do NOT include in main tour
8. ❌ Pesticide spraying — exclude entirely

**For drone video (already in Google Drive — request from Khaled):**
- Wide aerial shot of the whole property
- Low-level flight through palm rows
- Irrigation system from above

---

## Action Items

- [ ] Request Google Drive farm footage link from Khaled (Islam to follow up)
- [ ] Commission Arabic video editor for drone footage edit (1,500-3,000 EGP)
- [ ] Purchase or rent 360° camera for farm visit
- [ ] Schedule dedicated farm photography session
- [ ] Sign up for Kuula.co account
- [ ] Configure Arabic hotspot labels on completed tour
- [ ] Embed on landing page and test on mobile

**Source:** March 17 strategy session, Phase 2 execution plan
