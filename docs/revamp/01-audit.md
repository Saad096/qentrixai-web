# 01 — Audit of the current site

**Date:** 2026-09-19 · **Target:** https://www.qentrix-ai.com (production, Vercel, `bom1`)
**Evidence:** 46 full-page screenshots in `docs/revamp/screenshots/before/` (390/768/1024/1440/1920 px, Chromium), above-the-fold set in `screenshots/before/_abovefold/` (light + dark), 10 Lighthouse runs in `docs/revamp/lighthouse/`, axe-core 4.13 on all 14 routes.
**Method note:** WebKit could not run on this host (missing `libavif13`); Chromium + Firefox only. Crawl screenshots default to the **light** theme (Playwright's default `prefers-color-scheme`), which is also what a light-mode visitor sees; dark-theme captures are in `_abovefold/`.

---

## 1. Executive summary

The site is well-built and competently written. It is not losing deals on craft — it is losing them on **proof, length, and mobile speed**.

1. **There is no proof anywhere a buyer looks first.** Not one number, logo, client name or outcome appears above the fold on any page. The proof that does exist is weak or false: the three testimonials are marked in code as *"Sample / placeholder testimonials drafted in-house"* and run under the heading **"Plain words from real engagements."** The client strip loops the same three logos four times. This is the single biggest conversion leak and also the biggest credibility risk.
2. **The homepage is 17 sections and 29,141 px tall on a phone** — roughly 37 screens — and says "we ship production AI, not demos" six separate times. The buyer's question ("can you do my thing, and has it worked before?") is answered on screen 12.
3. **Mobile performance fails the brief's own bar.** Home scores **56** on mobile (services 60, contact 68) against a ≥90 target, with 1,100 ms of blocking time and a 3.71 s LCP. The LCP element is the hero `<h1>` — it is animated by Framer Motion, so the headline cannot paint until React hydrates. Eighty elements animate forever, which pins Speed Index at **42.3 s**.
4. Supporting damage: **nine of fourteen pages have no `<h1>`**, `og.png` **404s** so every share is blank, and structured data stops at `Organization` — no `Service`, `FAQPage`, `Article` or `BreadcrumbList`, on a site whose buyers increasingly arrive through answer engines.
5. Fourteen services have slugs and 300 words of copy each, but **no `/services/[slug]` pages exist** — the same for case studies and products. Roughly 25 rankable pages are sitting in `src/data/` unrendered.

---

## 2. Scorecard

| # | Category (§3.2) | Score /3 | Evidence |
|---|---|---|---|
| 1 | 7-second test | 2 | "Most AI stalls at the demo. We build the kind that ships." + a clear subhead answers *what*. It never answers *for whom* or *how big*. |
| 2 | Value-proposition specificity | 2 | Outcome-first and jargon-light, but generic to any AI studio; no vertical, size or stage named. |
| 3 | CTA hierarchy | 1 | Three different primary wordings — nav "Work with us", hero "Start a conversation", banner "Book a strategy call" — pointing at two destinations (`/contact`, `/book`). |
| 4 | Proof placement | **0** | Nothing above the fold on any route. Testimonials are placeholders. Logos: 3 real, repeated 4×. |
| 5 | Information density | **0** | 17 homepage sections; 29,141 px @390, 15,071 px @1440; 1,655 DOM nodes; 2,338 words. |
| 6 | Navigation | 2 | Five good sentence-case labels. But the nav renders twice into the DOM and the closed mobile panel stays focusable. |
| 7 | Visual hierarchy | 2 | Consistent eyebrow→H2→lede rhythm, clean type scale. Every section carries near-equal weight, so nothing leads. |
| 8 | Dark-theme execution | 2 | Genuine dual theme, no naive inversion, no-flash bootstrap. Light theme is the weak one: 41 uses of `text-ink/40–55` fall below 4.5:1. |
| 9 | Motion | 1 | `prefers-reduced-motion` respected everywhere (good). But 80 animated elements, 3 animation libraries, infinite marquees, and a header that animates `width`/`top` per frame. |
| 10 | Forms and booking | 2 | Honeypot present, sensible 7 fields, in-house booking. Phone is `type="text"`, no `autoComplete`/`inputMode`, no rate limiting. |
| 11 | Mobile | 1 | **Zero horizontal overflow at any width — genuinely good.** But 36×36 controls, 6×6 carousel dots, no sticky CTA, 37-screen homepage. |
| 12 | Trust signals | 1 | Privacy/terms/NDA language present. Against that: placeholder testimonials, a personal Gmail address on both legal pages, no team faces (the `/team` route redirects to `/`), no client names. |
| 13 | AI / answer-engine readiness | 1 | Unique titles + descriptions on every page (good). Only `Organization` JSON-LD; 9 pages with no `<h1>`; `og.png` 404; no per-page OG images; ~25 unrendered detail pages. |
| 14 | Performance | 1 | Mobile 56/60/68/78/83. Desktop 86–90. CLS ≈ 0 (good). |

---

## 3. Issue list

Severity: **P0** blocker · **P1** major · **P2** minor · **P3** polish

### P0

| ID | Issue | Evidence | Proposed fix |
|---|---|---|---|
| A-01 | Placeholder testimonials presented as real client quotes | `src/data/testimonials.ts:8` comment "Sample / placeholder testimonials drafted in-house"; rendered live under `Testimonials.tsx:11` heading "Plain words from real engagements." | Owner confirmed these are placeholders: **remove the section**. Replace the proof slot with case-study outcome numbers until signed quotes exist. |
| A-02 | 9 of 14 pages have no `<h1>` | axe `page-has-heading-one`: `/services`, `/products`, `/case-studies`, `/about`, `/contact`, `/blogs`, `/careers`, `/book` (+`/team` redirect). Crawl `h1=0`. | Every page opens with one `<h1>`; demote the current `SectionHeading` H2 on page-lead sections. |
| A-03 | Mobile performance far below the ≥90 bar | LH mobile: home **56**, services **60**, contact **68**, products 78, case-studies 83. TBT 1,100–1,458 ms; main-thread 5.0 s; bootup 1.6 s; long tasks 423/274/241 ms. | Server-render the hero, drop one animation library, cut client components, defer Lenis/cursor. |
| A-04 | LCP element is a JS-animated headline | LH `largest-contentful-paint-element` = hero `<h1>` with `opacity/transform` from Framer Motion; LCP 3.71 s mobile. | Render the H1 statically; animate only decorative layers, or use CSS `@starting-style`/keyframes that do not gate paint. |
| A-05 | 80 永-running animations pin Speed Index at 42.3 s | LH `non-composited-animations`: 80 elements; SI 42.3 s mobile / 17.1 s desktop (score 0). Sources: `Capabilities` 13-item marquee, `Clients` marquee, `.gradient-animate`, `pulse-glow`, `shimmer`. | Delete the two marquees (§1.8 of the brief), make remaining loops finite or `will-change`-composited only. |
| A-06 | `og.png` 404s sitewide | `curl https://www.qentrix-ai.com/og.png` → **404**; `src/lib/seo.ts:38` defaults every page's OG/Twitter image to `/og.png`; blog `cover: ""` falls back to the same. | Generate per-page OG images with `next/og`, plus a static fallback that actually exists. |
| A-07 | No proof above the fold on any route | `_abovefold/home-390.png`, `home-1440.png`: headline + 2 CTAs + 9 capability dots, nothing else. | Put numbers and named clients in the first viewport. Owner confirmed TriggerX, Grow9X and TechForge may be named. |

### P1

| ID | Issue | Evidence | Proposed fix |
|---|---|---|---|
| B-01 | Homepage is 17 sections / 29,141 px on a phone | `src/app/page.tsx`; crawl `h390=29141`, `h1440=15071`, 1,655 DOM nodes | Cut to 9–11 sections per §5.3; move TechStack and the full Industries grid to inner pages. |
| B-02 | The anti-demo message is repeated 6× | Hero ×2, `Problem` title + card, `AboutPreview` ("not a slide-deck consultancy"), `CaseStudiesPreview` ("not just demos"), `ProductsShowcase` ("not roadmap art"), `WhyUs` ("Production over demos") | Say it once, in the hero or the gap section. Everywhere else, show evidence instead. |
| B-03 | CTA wording and destination inconsistent | Nav "Work with us"→`/contact`; hero "Start a conversation"→`/contact`; banner "Book a strategy call"→`/book`; secondary "Or message on WhatsApp" | One primary verb phrase, one destination, repeated. |
| B-04 | ~25 rankable pages never rendered | `services.ts` 14 slugs, `caseStudies.ts` 6 slugs, `products.ts` 9 slugs; no `[slug]` routes for any of them (products open in a modal) | Add `/services/[slug]`, `/case-studies/[slug]`, `/products/[slug]`; keep the modal as a shortcut. |
| B-05 | Structured data stops at `Organization` | Only `layout.tsx:54` emits JSON-LD; crawl shows `["Organization"]` on all 14 routes | Add `WebSite`, `Service`, `FAQPage`, `Article`, `BreadcrumbList`, `Product`. |
| B-06 | Canonical points at a URL that redirects | Live canonical `https://qentrix-ai.com`; that host returns **308 → https://www.qentrix-ai.com** | Set `NEXT_PUBLIC_SITE_URL` to the www host in Vercel (repo `.env` still says `qentrixai.com`, a third variant). |
| B-07 | Light-theme body text below 4.5:1 | Computed: ink@55% = **4.04**, @50% = **3.42**, @45% = **2.96**, @40% = 2.58 on `#F7F6F3`. Usage: `/55`×15, `/50`×19, `/45`×6, `/40`×1 | Floor secondary text at `ink/60` (4.73) or use the `muted` token (8.14). |
| B-08 | White on the primary button fails on dark | `#FFFFFF` on `brand-500 #6E60EA` ≈ 4.4:1; on accent `#7C6AFA` = **3.96:1** | Darken the gradient start or use a near-white with a deeper stop. |
| B-09 | `nested-interactive` (axe, serious) | home ×4, `/products` ×6, buttons inside anchor cards (`ProductCard`, carousel dots) | Move the inner controls out of the anchor, or make the card a non-anchor with a single link. |
| B-10 | Closed mobile menu is still focusable; no Escape, no focus trap | `Header.tsx:185` `max-h-0 opacity-0` with no `inert`/`aria-hidden`; no `Escape` handler; `aria-controls` absent | Add `inert` when closed, Escape-to-close, focus trap, `aria-controls="mobile-menu"`. |
| B-11 | Tap targets below 44 px | @390: theme toggle 36×36, hamburger 36×36, "Skip to content" 24×16, product dots **6×6** and 24×6, calendar arrows 32×32; 20–40 sub-44 px controls per page | Raise hit areas to ≥44×44 (padding or `::before` expansion). |
| B-12 | React hydration error on `/book` | Console `Minified React error #418` (text content mismatch) on `/book` only | Likely a date/time rendered on the server; compute it client-side or pass a stable ISO value. |
| B-13 | Client strip repeats 3 logos 4× | `Clients.tsx:10` `[...clients,...clients,...clients,...clients]` | Show the three real marks once, statically, with the industry label. Add more only when real. |
| B-14 | 13-item capability marquee read twice by assistive tech | `Capabilities.tsx`: items duplicated for the loop with `aria-hidden="false"` on the duplicate lane | Delete the marquee; if kept, `aria-hidden="true"` on the duplicate. |
| B-15 | Three animation libraries on every page | `gsap` + `ScrollTrigger` + `lenis` (global in `layout.tsx`) + `framer-motion` in 5 components | Pick one. CSS handles most reveals; `Reveal.tsx` already gates on `prefers-reduced-motion`. |
| B-16 | Header animates `width`/`top` on every ticker frame | `Header.tsx:55–92` writes `width`, `top`, `borderRadius`, `backgroundColor` via `gsap.ticker`, plus `setCompact` React state | Animate `transform`/`scale` only, or switch to a scroll-linked CSS animation. |
| B-17 | Blog is two months stale and has no covers | Newest post `2026-07-15`; every entry has `cover: ""` | Publish or re-date; add cover images (also fixes per-article OG). |
| B-18 | Personal Gmail on both legal pages | `/privacy` and `/terms` expose `saadalamtrohli106@gmail.com` alongside the company address | Replace with `talk@qentrix-ai.com` / a `privacy@` alias. |
| B-19 | Form input types wrong for mobile | `ContactForm.tsx:96` phone is `type="text"`; no `autoComplete` or `inputMode` on any field; no rate limiting on `/api/contact` or `/api/booking` | `type="tel"` + `inputMode="tel"`, `autoComplete` on name/email/phone/organization, add per-IP rate limiting. |
| B-20 | `heading-order` violation on all 14 routes | axe `heading-order` ×1–2 per page | Fix the H1/H2/H3 ladder as part of A-02. |
| B-21 | No faces, no names, no team page | `/team` **307-redirects to `/`** by design (`src/app/team/page.tsx`); `TeamPreview.tsx` is never imported; 4 real photos sit unused in `/public/team/` | Owner decision (GATE 2): a senior-only studio selling trust is paying a real price for anonymity. |

### P2 / P3

| ID | Sev | Issue | Evidence |
|---|---|---|---|
| C-01 | P2 | Home ships 1,655 DOM nodes (LH `dom-size` score 0) | LH home-mobile |
| C-02 | P2 | 72 KB of oversized images, 22 KB unused JS, 11 KB legacy JS, 140 ms render-blocking CSS | LH opportunities |
| C-03 | P2 | No analytics at all — `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and `NEXT_PUBLIC_GA_ID` are empty, so the revamp will have no before/after data | `.env`, `.env.local` |
| C-04 | P2 | 404 page speaks developer ("That route hasn't been wired up yet.") | `not-found.tsx` |
| C-05 | P2 | `next.config.mjs`: `output: "standalone"` (a Docker artefact) and `images.remotePatterns` open to `hostname: "**"` | `next.config.mjs` |
| C-06 | P2 | Custom cursor replaces the native one sitewide (`MagneticCursor` in `layout.tsx`) | desktop pointers only, but it is decoration on a B2B site |
| C-07 | P3 | Dead code and stray assets: unused `TeamPreview.tsx`, tracked `media/` duplicates, `pfp size.jpg (2).jpeg` (85 KB) at repo root | `git ls-files` |
| C-08 | P3 | Git remote is still `perceptronai-web.git` | `git remote -v` |
| C-09 | P3 | Fonts are Inter + Space Grotesk (70 KB), both banned by CLAUDE.md §1.8 | `layout.tsx:17–27` |

---

## 4. Raw numbers (baseline)

### 4.1 Lighthouse — production, 2026-09-19

| Page | Form factor | Perf | A11y | BP | SEO | FCP | LCP | SI | TBT | CLS |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | **56** | 98 | 100 | 100 | 1.24 s | **3.71 s** | 42.3 s | **1,100 ms** | 0.000 |
| `/` | desktop | 86 | 98 | 100 | 100 | 0.36 s | 0.84 s | 17.1 s | 151 ms | 0.000 |
| `/services` | mobile | **60** | 98 | 100 | 100 | 1.11 s | 2.80 s | 41.4 s | **1,458 ms** | 0.000 |
| `/services` | desktop | 88 | 98 | 100 | 100 | 0.34 s | 0.63 s | 17.4 s | 121 ms | 0.000 |
| `/products` | mobile | 78 | 98 | 100 | 100 | 1.03 s | 2.38 s | 41.3 s | 407 ms | 0.000 |
| `/products` | desktop | 89 | 95 | 100 | 100 | 0.33 s | 0.89 s | 17.1 s | 6 ms | 0.000 |
| `/case-studies` | mobile | 83 | 98 | 100 | 100 | 1.00 s | 2.55 s | 41.4 s | 246 ms | 0.015 |
| `/case-studies` | desktop | 90 | 98 | 100 | 100 | 0.30 s | 0.65 s | 17.0 s | 39 ms | 0.024 |
| `/contact` | mobile | **68** | 98 | 100 | 100 | 1.02 s | 2.37 s | 41.6 s | 883 ms | 0.000 |
| `/contact` | desktop | 90 | 98 | 100 | 100 | 0.34 s | 0.62 s | 16.9 s | 0 ms | 0.000 |

Home mobile detail: main-thread work 5.0 s · JS bootup 1.6 s · 30 requests · 562 KB transferred · largest chunks 55 KB / 45 KB / 39 KB · fonts 48 KB + 22 KB.

### 4.2 axe-core 4.13 (1440 px, all 14 routes)

| Rule | Impact | Pages affected | Nodes |
|---|---|---|---|
| `heading-order` | moderate | 13 | 15 |
| `page-has-heading-one` | moderate | 8 | 8 |
| `nested-interactive` | **serious** | 2 (`/`, `/products`) | 10 |

Zero colour-contrast violations were flagged — axe ran against the **light** default in a default-scheme browser and the failing `ink/40–55` text is mostly on tinted surfaces where axe cannot resolve the computed background. The computed ratios in B-07 are the real picture; re-check with a manual contrast pass.

### 4.3 Cross-viewport crawl

- **No horizontal overflow at 390 / 768 / 1024 / 1440 / 1920 on any of the 14 routes.**
- Every image has an `alt`; no broken images anywhere (23 images on `/`).
- Console: clean except `/book` (React #418) and the expected 404 asset on the 404 route.
- Two `<nav>` landmarks per page (desktop pill + mobile panel), both always in the DOM.

### 4.4 Page weight by route (document height, px)

| Route | @390 | @1440 | Sections | Words |
|---|---|---|---|---|
| `/` | **29,141** | 15,071 | 17 | 2,338 |
| `/services` | 12,381 | 5,355 | 5 | 1,015 |
| `/blogs` | 7,554 | 3,505 | 3 | 729 |
| `/products` | 7,348 | 3,461 | 3 | 399 |
| `/case-studies` | 6,664 | 3,016 | 3 | 657 |
| `/about` | 6,497 | 3,525 | 5 | 582 |
| `/contact` | 4,456 | 2,817 | 3 | 389 |
| `/blogs/[slug]` | 4,404 | 2,965 | 2 | 493 |
| `/careers` | 4,340 | 2,694 | 4 | 377 |
| `/book` | 2,940 | 1,554 | 2 | 269 |
| `/privacy` | 2,678 | 1,773 | 1 | 307 |
| `/terms` | 2,580 | 1,725 | 1 | 277 |
| 404 | 1,842 | 1,186 | 1 | 144 |

---

## 5. Content audit

### 5.1 Homepage, section by section

| # | Section | Headline | Verdict |
|---|---|---|---|
| 1 | Hero | "Most AI stalls at the demo. / We build the kind that ships." | **Rewrite.** Strong line, but it leads with the problem and carries no proof. Needs *for whom* and a number. |
| 2 | Capabilities | 13-item infinite marquee | **Cut.** Padding, and the single worst performance offender. |
| 3 | Clients | 3 logos × 4 loops | **Rewrite.** Show three real marks once, named. |
| 4 | Stats | 5+ yrs · 25+ systems · 12 geographies · 6-wk MVP | **Keep facts, move up.** These belong in the first viewport. |
| 5 | AboutPreview | "An AI product studio that ships, not a slide-deck consultancy." | **Cut or merge.** Third restatement of the same idea. |
| 6 | ServicesOverview (6 of 14) | "Production AI engineering, from strategy to deployment." | **Keep, rewrite.** One outcome line per capability; link to real `[slug]` pages. |
| 7 | ProductsShowcase (6 of 9) | "Internal product studio. Real software, not roadmap art." | **Keep, cut to 3.** Real screenshots are the strongest asset on the site. |
| 8 | Industries (10) | "Domain-aware AI, not a one-size template." | **Cut to 6 + "more".** |
| 9 | Problem | "Most AI projects fail after the demo. Here's why." | **Merge into hero's neighbour.** Duplicate of #1. |
| 10 | WhyUs (6 cards) | "Senior people. Production discipline. Skin in the game." | **Keep, cut to 3.** "Production over demos" card is the 6th repeat. |
| 11 | Process (6 steps) | "A six-step path from idea to a system you can trust." | **Keep, compress.** Add the artifact each step produces. |
| 12 | CaseStudiesPreview | "Production AI systems shipped, not just demos." | **Promote to #2–3.** This is the proof; it is currently on screen 12. |
| 13 | TechStack (28 items) | "Pragmatic, modern, production-tested." | **Move to `/services` or `/about`.** |
| 14 | BlogPreview | "Field notes on AI engineering." | **Keep.** Refresh the posts first. |
| 15 | Testimonials | "Plain words from real engagements." | **Cut** (A-01). |
| 16 | FAQ (8) | "Common questions before we get on a call." | **Keep, rewrite + extend.** Missing: who owns the IP, model lock-in, eval/regression practice, cost control, data residency, on-prem, what a 6-week MVP actually contains. |
| 17 | CTABanner | "Ready to ship something real?" | **Keep.** Best CTA copy on the site; make its wording the single primary CTA everywhere. |

### 5.2 Voice and claims

- **Buzzwords: clean.** Zero instances of cutting-edge / seamless / unlock / revolutionary / leverage / empower / transform-as-verb across `src/`. The July rewrite did its job.
- **Sentence length: good.** Body copy is mostly under 20 words; no 25-word sentences found in marketing copy.
- **Repetition is the problem, not vocabulary** — see B-02.
- **Claims without evidence:** "25+ production systems" and "12 geographies" appear with no case study, logo or region list backing them. Five of six case studies are `Client: "… (NDA)"`.
- **Audience mismatch:** the hero bento talks LangGraph, BM25, re-ranking and Langfuse in the first viewport. That converts a staff engineer; it does not convert the CTO or founder who signs.
- **Blog:** on-topic and current in subject (MCP, context engineering, computer-use agents) but the newest post is 2026-07-15.

---

## 6. Open decisions for GATE 2 / GATE 3

1. **Team visibility.** `/team` is deliberately redirected to `/` and four real photos go unused. A senior-only positioning with no faces is a measurable trust cost. Keep hidden, or publish?
2. **Fonts.** Inter + Space Grotesk are both banned by §1.8 and are the current brand. Replacing them changes the logo lockup's neighbourhood.
3. **Analytics.** Nothing is recording today, so there will be no behavioural before/after. Enable Plausible before the rebuild ships?
4. **Named proof.** Owner confirmed TriggerX / Grow9X / TechForge may be named — is there a fourth and fifth, and any outcome number we may attach to each?
