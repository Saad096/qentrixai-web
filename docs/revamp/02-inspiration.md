# 02 — Inspiration analysis (structure only)

**Date:** 2026-09-19
**Studied:** Quixlab "Optim AI" (Tailwind) — https://ai-consulting-op-tailwind.quixlab.workers.dev/ · VamTam "AI FusionX / AI Trainers" (WordPress + Elementor) — https://aifusionx.vamtam.com/ai-trainers/
**Method:** Playwright, Chromium, 1440×900 and 390×844. Section geometry, computed typography, container widths and interaction inventory extracted from the live DOM.

> **Asset hygiene (CLAUDE.md §1.7).** Reference screenshots were written to the session scratchpad, **not** into this repo, and nothing from either site — image, video, icon, illustration, logo or copy — is reused. What follows is structural analysis only.
>
> **DOM note:** VamTam serves its desktop demo inside an `#iframe-preview` wrapper; the desktop numbers below were read from inside that frame.

---

## 1. Quixlab "Optim AI"

**Shape:** 11 sections, 13,551 px at 1440 (16,618 px at 390). Pure-black base, white type, one violet accent used only in eyebrow dots and glows.

**Measured system**

| Property | Value |
|---|---|
| Container | **1290 px** outer, ~1216 px content |
| Section rhythm | **156 px top and bottom, on every single section** (hero is 170/400) |
| Display face | Manrope — H1 **72 px / 86.4 lh / −2.16 px tracking**, H2 **48 px / 57.6** |
| Text face | Sora 16 px / 24 (1.5), body default Inter Tight |
| Type ratio | 72 → 48 → 20 → 16 (1.5×, 2.4×, 1.25×) |
| Inventory | 90 images, 106 SVGs, 1 video, 27 buttons, 10 tab controls, 1 accordion, 1 carousel, **0 marquees** |

### 1.1 Section order and the job each one does

| # | Section | Job |
|---|---|---|
| 1 | Hero (video) | Claim + **proof before the claim** + one CTA + logo strip |
| 2 | Services | Name the offer in 4 tiles |
| 3 | Why choose us | Differentiate (1:1 sessions, tailored strategy) |
| 4 | Industries | Prove range — **8 tabs, one photo per tab** |
| 5 | Process | De-risk — numbered "Discovery → …" |
| 6 | Use cases | Make it concrete per scenario |
| 7 | **Pricing** | Convert on plan choice |
| 8 | Testimonials | Social proof |
| 9 | Tech stack | Credibility — **4 tabs × 3–4 tool cards** |
| 10 | Logo wall | Scale proof, 12 marks |
| 11 | Final CTA | Book |

### 1.2 Hero construction

Left-aligned, never centred. Reading order is deliberately **proof → claim → explanation → one action**:

1. A 4-avatar cluster + "Trusted by 20k+ / Customers across the globe" — *above* the H1.
2. H1 at 72 px over two lines, ~790 px measure, tight negative tracking.
3. Two-line subhead at 16 px on a narrower ~665 px measure.
4. **One CTA only** — a white pill with a dark circular icon badge. No secondary button anywhere in the hero.
5. Five monochrome client logos sitting at the fold line, static.
6. The product video enters *below* the fold; the right half of the first screen is deliberately empty.

### 1.3 Imagery

Photographic industry tiles at 16:9 (a real shop interior for Retail, etc.), a product video, avatar clusters for social proof, and circular brand-logo chips inside tool cards. No abstract "AI" clichés at all — the only decoration is a faint dot-grid.

### 1.4 Worth adopting

- **Proof above the headline**, not below the fold.
- **One primary CTA per screen.** One verb, repeated.
- **Tabbed industries** — 8 labels, one large visual, replacing an 8-tile grid.
- **Tabbed tech stack** — 4 categories, 3–4 cards each, each card *name + one line on what it is for + link*, then a "View full stack" escape hatch.
- **A single, strict vertical rhythm** (156 px) that never varies. It reads as confidence.

### 1.5 Not for us

- **Pricing tiers** — QentrixAI sells engagements, not plans (CLAUDE.md §4).
- Filler content inside good patterns: their tech stack lists "safari — AI-powered development platform" and Mastercard. A strong pattern with fake content is worse than no pattern.
- Generic testimonial attributions ("Business Owner").
- Duplicated eyebrow text across two adjacent sections ("Trusted by Forward-Thinking Companies" on both #10 and #11).
- Split-text reveal animations that duplicate every heading string in the DOM — screen readers hear each headline twice.

---

## 2. VamTam "AI FusionX"

**Shape:** 10 sections, 9,982 px at 1440 (10,863 px at 390) — **the shorter, tighter of the two**. Light lavender base with one warm off-white band (`#FAF9F7`), violet accent.

**Measured system**

| Property | Value |
|---|---|
| Container | **1280 px** standard · 1380 px for full-width media rows · **880 px text measure** |
| Section heights | 518–1599 px, most 620–970 px |
| Display face | Instrument Sans — H1 **60 px / 66 lh (1.1) / −1 px**, section headline **46 px / 46 lh (1.0)** |
| Eyebrow | IBM Plex Sans **12 px / 15.6 / +1 px tracking**, uppercase |
| Body | Instrument Sans 16 px / 22.4 (1.4) |
| Inventory | 24 images, 7 carousels, 158 `aria-expanded` nodes, 0 tabs, 0 marquees |

### 2.1 Section order and the job each one does

| # | Section | Job |
|---|---|---|
| 1 | Hero | Outcome claim + **stat strip inside the first viewport** |
| 2 | Who we are | Position in one paragraph |
| 3 | Top-tier trainings | The offer — 4-card carousel |
| 4 | Our approach | 4 numbered offset cards (Assess → Design → Train → Measure) |
| 5 | Training formats | Engagement shapes, on the warm band |
| 6 | Industries + **case study** | Range, then "Results that speak for themselves" |
| 7 | Testimonials | Social proof |
| 8 | Learning resources | Insights / blog, 3 up |
| 9 | FAQ | Objection handling |
| 10 | Final CTA | Book |

### 2.2 Hero construction

Centred, and the whole first screen is one composition:

1. A small sparkle mark, then a 60 px H1 across two lines with an **animated word swap** in violet (confident → empowered → effective) and a typing caret.
2. Subhead written as a rhythmic triplet with separators: "Learn AI ✦ Apply it tomorrow ✦ Grow faster".
3. **One CTA** — a black pill with an arrow.
4. **Four stat chips pinned at the bottom of the hero**: 150+ certification paths · 500+ tech courses · 3,500+ hands-on labs · 500+ skill assessments. Rounded outline pills with a check mark.
5. Background: full-bleed iridescent 3D glass shards, floating, behind everything — atmosphere, never the subject.
6. Nav is a floating rounded pill, centred, with a separate dark CTA pill on the right.

### 2.3 Imagery

Everything is **rendered 3D glass/iridescent objects** — a cube, a cylinder, interlocked tori, a disc — one per capability card, plus flowing ribbon backdrops. Zero stock photography and zero people. Consistent material, consistent lighting: it reads as one commissioned set.

### 2.4 Worth adopting

- **Stat chips inside the hero.** The cheapest possible fix for our A-07 "no proof above the fold".
- **A section headline that *is* the paragraph** — 46 px, five lines, no separate lede. Confident, and it halves the section's word count.
- **Numbered process as offset, tinted cards** on a staggered baseline instead of a flat row of six.
- **Distinct abstract object per capability** — a repeatable visual system that is not stock photography.
- **A notched card corner** (curved cut-out at the bottom-left) as a cheap, ownable shape detail.
- **Carousels with arrows only** — no autoplay, no dots.
- 4 process steps read better than 6.

### 2.5 Not for us

- **The palette is violet-on-lavender** — which is what our current site already does and what CLAUDE.md §6.1 bans. This is the clearest "study the structure, reject the colour" case.
- Training-course content model (certification paths, courses, labs) — irrelevant to a product studio.
- Card copy that is one sentence with a noun swapped four times ("designed to help learners/teams/leaders build practical, end-to-end X capability").
- `<h2>` used for 12 px eyebrows and `<h3>` for the real headline — it wrecks the heading ladder (we already have that bug; see A-02/B-20).
- Pastel-on-pastel card text — contrast we cannot ship.
- 158 `aria-expanded` nodes and 7 carousels on one page.

---

## 3. Head-to-head, and where we sit

| | Quixlab | VamTam | **QentrixAI today** |
|---|---|---|---|
| Sections | 11 | 10 | **17** |
| Desktop height | 13,551 px | 9,982 px | **15,071 px** |
| Mobile height | 16,618 px | 10,863 px | **29,141 px** |
| Container | 1290 px | 1280 px (880 text) | 1280 px (1200 content) |
| Section rhythm | 156 px fixed | variable, tighter | 112 px desktop / 80 px mobile |
| Hero CTAs | **1** | **1** | 2 (+ a third wording in the nav) |
| Proof above the fold | avatars + "20k+" + 5 logos | 4 stat chips | **none** |
| Marquees | 0 | 0 | **2** |

The lesson is not "add more". Both references are **shorter than us and give each section more air**. We are running 17 sections at 112 px of breathing room; they run 10–11 at 156 px. Cutting to 9–11 sections and widening the rhythm gets us a shorter page that feels more expensive.

---

## 4. Pattern-transfer table

Every row is filled with content QentrixAI **already has**. Patterns we cannot fill honestly are dropped, not faked.

| # | Inspiration pattern | QentrixAI equivalent | Real content that fills it |
|---|---|---|---|
| 1 | Proof line above the H1 (Quixlab avatars + "20k+") | Stat line above the headline | `company.stats`: 5+ yrs · 25+ systems shipped · 12 geographies · 6-week MVP |
| 2 | Stat chips pinned in the hero (VamTam) | Four outline chips at the hero base | Same four stats, or three stats + "TriggerX · Grow9X · TechForge" |
| 3 | Static monochrome logo strip at the fold | Named client strip, shown **once**, no loop | TriggerX, Grow9X, TechForge (owner cleared naming them) |
| 4 | One primary CTA, one verb, repeated | Single CTA wording everywhere | "Book a strategy call" → `/book` (kills the 3-way split in B-03) |
| 5 | Tabbed industries, one visual per tab (Quixlab) | Industry tabs with an outcome, not a stock photo | `industries.ts` — cut 10 → 6 tabs, each showing the matching case study's numbers |
| 6 | Tabbed tech stack, 3–4 cards per tab + "View full stack" | Same, with a one-line *why we use it* per tool | `techStack.ts` 28 items → 4 tabs; full wall moves to `/services` |
| 7 | Numbered offset process cards (VamTam 01–04) | Staggered process cards, **with the artifact each step hands over** | `company.process` 6 steps → 4–5, each naming its deliverable (problem framing, architecture doc, eval harness, runbook) |
| 8 | Capability card with a distinct abstract object | Capability card with an **original system diagram** | Agent graph (LangGraph), retrieval flow (BM25 + vectors + re-rank), eval/trace panel, voice pipeline — all real architecture we ship |
| 9 | Section headline that *is* the paragraph, 46 px | One 40–48 px statement per section, no separate lede | Existing section copy, compressed — removes the duplicate-lede pattern |
| 10 | Carousel with arrows only, no autoplay | Products row, 3 up, arrows | `products.ts` — 9 products, 21 real screenshots |
| 11 | Case-study band: "Results that speak for themselves" | Selected work promoted to section 3 | `caseStudies.ts` — 6 studies with problem → outcome |
| 12 | FAQ + adjacent CTA | Same | `faqs.ts` 8 questions, rewritten and extended per §7.1 |
| 13 | One warm neutral band to break the page (VamTam `#FAF9F7`) | One alternating surface band | Design-system decision, GATE 3 |
| 14 | Notched card corner as a signature shape | One ownable shape detail in the card component | Design-system decision, GATE 3 |
| ~~15~~ | ~~Pricing tiers~~ | **Dropped** — we sell engagements | — |
| ~~16~~ | ~~Testimonial wall~~ | **Dropped for now** — the three quotes are placeholders (A-01) | Re-add when signed quotes exist |
| ~~17~~ | ~~Avatar cluster / team-at-work photos~~ | **Blocked** — `/team` is deliberately hidden | Unblocks only if the owner publishes the 4 real photos |
| ~~18~~ | ~~"20k+ customers" scale proof~~ | **Dropped** — we are not that business, and inventing a number is out | — |

---

## 5. Visual types to source or build (input to `06-images.md`)

**Build ourselves (preferred — the real differentiator for an engineering studio):**
- Agent-graph diagram with human-in-the-loop checkpoints
- Retrieval flow: BM25 + vector + re-rank + citation grounding
- Eval/trace panel mock in the design system (Langfuse-style, our own chrome)
- Voice pipeline: streaming ASR → turn detection → TTS with latency budget
- Deployment topology: Docker → CI/CD → cloud/VPC

**Already own:** 21 product screenshots in `/public/products/`, 3 client logo marks, 4 team photos (currently unpublished).

**Stock photography:** only if an industry tab genuinely needs a human scene. Quixlab uses photography well; VamTam uses none and looks more premium. **Recommendation: no stock photography at all** — it is the fastest way to look like a template. If any is used, Unsplash/Pexels only, logged with author and licence in `06-images.md`.

**Explicitly not sourced:** anything from either reference site.

---

## 6. Open questions this raises for GATE 2

1. **Hero proof:** stats-only, or stats + the three named clients? The named clients are stronger but only three exist.
2. **Process length:** both references use 4 steps. Ours is 6. Compress to 4–5, or keep 6 and accept the extra height?
3. **Industries:** 10 today. Both references show 8 and 6. Which 6 do we keep, and does each one have a case study to point at?
