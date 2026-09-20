# 06 — Image manifest

**Date:** 2026-09-20 · **Direction:** Aurora (violet, from the reference sites)

> ## Provenance and licence status — read this first
>
> Imagery now comes from two sources, and they carry different risk.
>
> **A. Unsplash (clean).** Sourced by me under the Unsplash License, which permits commercial use. Author recorded for every file.
>
> **B. Quixlab "Optim AI" template assets (licence unresolved).** Supplied by the owner from the reference site and used at their explicit instruction on 2026-09-20. These are assets licensed to the template author, not to QentrixAI. The owner was told this before they were used. **Action for the owner:** either buy the Quixlab/Envato licence and confirm it covers use outside the template, or swap these for the Unsplash equivalents already sitting in the repo. Every affected file is listed below so the swap is a five-minute job.
>
> **C. Excluded, and not negotiable.** Three groups from the supplied folder are not on the site and should not go on it:
> - `GettyImages-1500728139*.png`, `GettyImages-2237131438*.png` (5 files) — Getty Images, a named rights-holder.
> - `brand_1–6.svg` (invented client logos, one of them VamTam's own mark) and the real-company marks (`notion.svg`, `spotify-*`, `dropbox-*`, `hotjar-*`, `asana-*`, `AMMAZON.svg`, `stripe.svg`, `master-card.svg`, `open-ai.svg`, `perplexity-ai.svg`, and the rest) — these would tell visitors those companies are QentrixAI clients.
> - `opai-avatar-img-*` (9 portraits) — real people's faces used as "trusted by 20k customers" social proof.
>
> The site's whole repositioning rests on not fabricating proof; the placeholder testimonials were deleted for exactly this reason (audit A-01).
>
> Also skipped as useless rather than risky: `theme-*.jpg` (40 screenshots of unrelated VamTam themes), `1.jpg`–`10.jpg` (screenshots of other websites), `power-elite-author.svg` (an Envato seller badge), and `image_75/99/100.jpg` (HTML error pages saved with a .jpg extension). Several files named `.svg` are actually PNGs and were renamed on import.

## 1. What is on the site now

### 1.1 Unsplash — licence clean

| File | Used for | Photographer | Unsplash ID |
|---|---|---|---|
| `abstract/aurora-ripple.jpg` | Hero visual | Steve A Johnson | `F8bQff_C_Mg` |
| `abstract/glass-curve.jpg` | held for section backgrounds | Dzo | `nzkGVjsIkG8` |
| `abstract/chrome-ribbons.jpg` | held for dark sections | Rohit Choudhari | `sC2Twgvu3lg` |
| `industries/enterprise-it.jpg` | Enterprise IT tab | Taylor Vick | `M5tzZtFCOfs` |
| `industries/healthcare.jpg` | Healthcare tab | Irshad Pathan | `3EIraOmufG4` |

Rejected during sourcing: `klWUhr-wPJ8`, which has "imgix" branding visible on the server racks.

### 1.2 Quixlab template assets — licence unresolved

| File | Used for | Origin |
|---|---|---|
| `industries/customer-operations.jpg` | Customer operations tab | `opai-img-287.jpg` |
| `industries/regulated-industries.jpg` | Regulated industries tab | `opai-img-291.jpg` |
| `industries/professional-services.jpg` | Professional services tab | `opai-img-292.jpg` |
| `industries/logistics.jpg` | Logistics tab | `opai-img-285.jpg` |
| `abstract/violet-wave.jpg` | "The demo is the easy part" backdrop | `opai-36.jpg` |
| `abstract/system-cluster.png` | "What we build" visual | `opai-img-280.svg` (actually a PNG) |
| `abstract/metrics-bars.png` | held | `vector-18.svg` (actually a PNG) |
| `abstract/spectrum-hand.png` | held | `opai-img-61.png` |

Unsplash equivalents already downloaded for the four industry photos, should you want the swap: Petr Machacek (`BeVGrXEktIk`), Cytonn Photography (`GJao3ZTX9gU`), Rodeo PM (`ONe-snuCaqQ`), Ruchindra Gunasekara (`GK8x_XCcDZg`).

### 1.3 The owner's source folder

`/images/` at the repo root holds all 138 supplied files. It is **git-ignored** — it is working material, not site content.

## 2. Assets we already owned

### 1.1 Product screenshots — 21 files, the strongest asset on the site

| File | Dimensions | Weight | Used for |
|---|---|---|---|
| `products/minutely-1…4.png` | 1789×967, 1851×966 ×3 | 212–280 KB | Minutely product page; `minutely-2` also covers the meeting-intelligence case study |
| `products/neuromesh-1.png` | 1211×728 | 100 KB | NeuroMesh page + multi-agent case study cover |
| `products/neuromesh-2.jpeg` | 1600×900 | 101 KB | NeuroMesh page |
| `products/salespire-1…3.png` | 1851×966 | 148–276 KB | SalesPire page |
| `products/ala-1…4.png` | 1851×966 | 60–280 KB | ALA page |
| `products/voicebot-1…2.jpeg` | 1600×870 | 63–69 KB | Realtime Voice Bot page |
| `products/fintelia-calculator / planner / market-intelligence.png` | 1643×1004 | **292–512 KB** | Fintelia page — **heaviest files in the repo** |

### 1.2 Client marks — now usable on the homepage

| File | Dimensions | Note |
|---|---|---|
| `products/triggerx.png` | 1075×320 | 12 KB |
| `products/grow9x.png` | 145×113 | 12 KB — **too small for a crisp 2× render; needs a larger source** |
| `products/techforge.png` | 284×61 | 8 KB — same problem |

Owner cleared naming all three. They move out of `/public/products/` into `/public/clients/`, rendered as a single static line, not a loop.

### 1.3 Team — founder only (owner decision, GATE 4)

| File | Dimensions | Weight | Status |
|---|---|---|---|
| `team/saad-alam.jpeg` | 853×1280 | 89 KB | **Published.** Re-crop to 1:1 at 800×800, AVIF, one treatment. |
| `team/shahid-nawaz.jpeg` | 640×640 | 74 KB | Stays unpublished |
| `team/shafaat-ullah.jpeg` | 400×400 | 17 KB | Stays unpublished |
| `team/mawra-muneer.png` | 1408×768 | **2.0 MB** | Stays unpublished. It is a PNG of a photograph and 20% of `/public` by weight — it should be removed from the repo rather than re-encoded, since nothing renders it. |

One portrait ships. The rest of the team is described in words, not faces.

### 1.4 Logo — fixed, unchanged

`logo/qentrix-mark.png` 512×512 (84 KB) · `logo/qentrixai-logo.png` 969×964 (104 KB). Rendered in a neutral chip so the blue-violet ribbon never has to harmonise with verdigris.

### 1.5 Retired

| File | Weight | Why |
|---|---|---|
| `images/hero-network.jpg` | 262 KB | Unsplash, NASA — night-earth texture behind the hero. Kiln has no photographic texture. |
| `images/architecture-grid.jpg` | 346 KB | Unsplash, Sean Pollock — texture in the CTA band. Same reason. |

Licences recorded for the archive: both Unsplash License, sourced at `unsplash.com/photos/photo-1451187580459-43490279c0fa` and `unsplash.com/photos/photo-1486406146926-c627a92ad1ab`. **608 KB removed from the page weight.**

---

## 2. What we build — original visuals

These are the brand. Each is an inline SVG built from design tokens, so both themes are free and there is no image request at all.

| ID | Visual | Where | Spec |
|---|---|---|---|
| `dia-agent-graph` | Agent graph with typed tools, a retry edge, and a human approval checkpoint | Home §3.4, `/services/agentic-ai` | 2 stroke weights, verdigris on the approval node only |
| `dia-retrieval` | BM25 + dense retrieval → re-ranker → citation-grounded answer | Home §3.4, `/services/rag-enterprise-search` | Same, verdigris on the citation link |
| `dia-eval-loop` | Change → eval suite → pass/fail gate → merge | `/about` phase 03, `/services/cloud-devops-mlops` | The only place a red is allowed |
| `dia-voice-pipeline` | Streaming ASR → turn detection → response → TTS, with a latency budget on each hop | `/services/voice-ai` | Numbers in DM Mono |
| `dia-topology` | Docker → CI/CD → your cloud / VPC / on-prem | `/about` phase 04 | — |
| `dia-handover` | The four artifacts you own, as a stack | `/about` | — |

Rule: a diagram shows a mechanism we actually ship. No decorative node-and-line "AI" graphics.

---

## 3. Stock photography

**None.** If the industries section later needs a human scene, sourcing is Unsplash, Pexels or Pixabay only, with URL, author and licence appended to this file before the image is committed. Nothing from Quixlab or VamTam, ever (CLAUDE.md §1.7).

---

## 4. Open Graph

`/og.png` **404s in production right now** — every share of every page is blank (A-06).

- Generated per route with `next/og` at 1200×630: graphite background, chalk headline, the verdigris slab as a footer bar, the mark in its chip.
- Templates: home, service, case study, product, article, generic.
- One static `/og.png` committed as the fallback so a generation failure never 404s again.
- `twitter:card` stays `summary_large_image`.

---

## 5. Technical rules for every image

- `next/image` always. No raw `<img>` — the current site is already clean here.
- Explicit `width`/`height`, or `fill` with a CSS `aspect-ratio` on the parent. Never a bare `fill`.
- A real `sizes` attribute on every responsive image. Decorative images get `alt=""`; everything else gets alt text that says what the screenshot *shows*, not what the product is called.
- AVIF and WebP are already configured in `next.config.mjs` and stay.
- Blur placeholder on anything above 400 px tall.
- `priority` on the LCP image only. In Kiln the LCP element is the `<h1>`, which must be **server-rendered and unanimated** — the live site's LCP is 3.71 s precisely because Framer Motion gates the headline (A-04).
- `images.remotePatterns` drops from `hostname: "**"` to the specific hosts we use, or is removed entirely since every asset is local (C-05).

### 5.1 Weight budget

| Asset class | Now | Target |
|---|---|---|
| Any single product screenshot | up to 512 KB | ≤ 180 KB at 1600 px, AVIF |
| Team portrait | up to 2.0 MB | ≤ 60 KB at 800×800, AVIF |
| Client mark | 8–12 KB | SVG where the client can supply one |
| `/public` total | 9.9 MB | ≤ 3 MB |

---

## 6. What I need from you

1. **Higher-resolution client marks** for Grow9X (145×113) and TechForge (284×61) — SVG ideally. Now that all three are named on the homepage, these two cannot render sharply at any size.
2. **Screenshots for MultiAgent Chatbot, DocumentAI and VoxRoute.** These three have no product imagery at all, so their detail pages will be text-only.
3. **Permission to delete** `team/mawra-muneer.png`, `team/shahid-nawaz.jpeg` and `team/shafaat-ullah.jpeg` from the repo, since the founder-only decision means nothing renders them. Removing the first alone takes 2.0 MB out of `/public`.

*Resolved at GATE 4: no stock photography; team is founder-only; both Unsplash textures retired (608 KB).*

---

## 7. Visual overhaul addendum — 2026-09-20

Three imagery decisions taken during the overhaul, recorded here because none
of them adds a file to `/public` and so none would otherwise show up in an
audit of the directory.

### 7.1 Generated blog covers — *no licence, no file*

Every `cover` in `src/data/blogs.ts` is an empty string, so the insights row
was three blocks of text in a hairline grid.

Rather than source nine stock photographs that would say nothing about the
writing, each category gets a **generated gradient panel** built from the
theme tokens, in `InsightsRow.tsx` (`CATEGORY_ART`). Original work, no file,
no licence to track, and it stays correct if the palette moves. A real
`cover` on a post takes precedence over it automatically.

### 7.2 Case-study fallback art — *existing assets, reused honestly*

Only `multi-agent-ai-platform` has a published screenshot; the rest are under
NDA. Imaging one of three cards and leaving two bare reads worse than imaging
none, so the others fall back to the abstract renders already in
`/public/images/abstract`, keyed by category in `SelectedWork.tsx`
(`FALLBACK_ART`).

**Abstract is the point.** It decorates without implying it is a screenshot of
the client's system. **Never** substitute another client's interface here, and
never a stock photograph of an office — both would read as a claim.

### 7.3 `system-cluster.png` is dark-only artwork

It is dark chips on a transparent ground, so on the light theme it floated as
unexplained dark blobs on white. It now sits on a committed dark panel in both
themes (`WhatWeBuild.tsx`).

Note it carries **third-party vendor marks**. It ships as-is because it was
already live, but it is the one asset in the repo that would need replacing if
the vendor-logo exclusion in section 2 is ever enforced strictly.

### 7.4 `violet-wave.jpg` is dark-only

At 30% over the light theme's lavender wash it averaged into a muddy
grey-purple that dulled the heading and swallowed the gap diagram. `TheGap`
renders it under `dark:` only; the light theme is carried by the wash and
grain.

### 7.5 Still outstanding

The three asks in section 6 are unchanged. The fallbacks above are a way to
ship without them — they are not a substitute for real screenshots.
