# 06 — Image manifest

**Date:** 2026-09-19 · **Direction:** Kiln · **Status:** awaiting GATE 4

Kiln's imagery rule is short: **large, quiet product screenshots and original system diagrams, placed directly on the graphite with no frames and no shadows. No stock photography.** VamTam uses none and reads more premium than Quixlab, which uses a lot. Stock is also the fastest way to look like the template we are trying not to be.

---

## 1. What we already own

`/public` is **9.9 MB** today. Everything below stays; the weights are the problem, not the assets.

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
