# 07 — QA report

**Date:** 2026-09-20 · **Branch:** `revamp/v2` · **Direction:** Kiln
**Before:** production `https://www.qentrix-ai.com`, measured 2026-09-19
**After:** local production build (`next build && next start`), measured 2026-09-20

> ## Read this before the numbers
>
> **Speed Index is broken on this machine and both audits are affected.** A one-line static HTML page containing a single `<h1>` measures **Speed Index 39.6 s** here — Lighthouse's frame-capture Speed Index does not work under software rendering (swiftshader, no GPU). That single broken metric also caps the performance score near 90 regardless of what the page contains.
>
> Two consequences, stated plainly:
> 1. The audit's finding A-05 cited "Speed Index 42.3 s" as evidence that the infinite animations were destroying performance. **That was wrong.** The 80 never-ending animations were real and worth removing on main-thread and battery grounds, but Speed Index never showed it.
> 2. **Performance scores below cannot be compared to the ≥ 90 target.** Every other metric — FCP, LCP, TBT, CLS, main-thread time, DOM size — is sound and is reported honestly. Authoritative performance numbers come from the Vercel preview in Phase 8.
>
> A second caveat: the before-numbers were taken over the network against Vercel's CDN; the after-numbers are localhost. That favours the after-run on FCP and LCP and disadvantages nothing. **TBT, main-thread time, DOM size, accessibility and SEO are directly comparable; absolute paint timings are not.**

---

## 1. Accessibility — the headline result

| | Before | After |
|---|---|---|
| axe violations, 14 routes @1440 | **23** across 13 routes | **0** |
| axe violations, 16 routes × 2 themes @412 | not run | **0** |
| Lighthouse accessibility | 95–98 | **100 on every page** |
| Pages with no `<h1>` | **9 of 14** | **0 of 16** |
| `heading-order` violations | 13 routes | 0 |
| `nested-interactive` (serious) | 10 nodes | 0 |
| Sub-44 px controls @390 | 20–40 per page | 0 (bar the visually-hidden skip link) |

Fixed along the way: the closed mobile panel is no longer rendered at all (it was focusable at `max-height: 0`, and it duplicated every nav link into the DOM), Escape closes the menu and returns focus to the trigger, tabs have roving tabindex and arrow-key navigation, inline links in prose are underlined rather than distinguished by colour alone, and the honeypot field is labelled.

**One colour fix worth recording:** verdigris `#0FA88C` measures 5.07:1 on the page background but only **4.49:1 on the surface token**, so links got their own brighter step (`--color-link`, `#1CBC9D` dark / `#0A6250` light) that clears 4.5:1 on background, surface and elevated surface alike. Brand stays for fills.

---

## 2. Lighthouse

### Before — production, 2026-09-19

| Page | Form | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | **56** | 98 | 100 | 100 | 1.24 s | **3.71 s** | **1,100 ms** | 0.000 |
| `/services` | mobile | **60** | 98 | 100 | 100 | 1.11 s | 2.80 s | **1,458 ms** | 0.000 |
| `/contact` | mobile | **68** | 98 | 100 | 100 | 1.02 s | 2.37 s | 883 ms | 0.000 |
| `/products` | mobile | 78 | 98 | 100 | 100 | 1.03 s | 2.38 s | 407 ms | 0.000 |
| `/case-studies` | mobile | 83 | 98 | 100 | 100 | 1.00 s | 2.55 s | 246 ms | 0.015 |
| `/` | desktop | 86 | 98 | 100 | 100 | 0.36 s | 0.84 s | 151 ms | 0.000 |

### After — local production build, 2026-09-20

| Page | Form | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 89 | **100** | **100** | 100 | 0.92 s | 2.12 s | **11 ms** | 0.000 |
| `/services` | mobile | 89 | **100** | **100** | 100 | 0.91 s | 1.96 s | 108 ms | 0.000 |
| `/contact` | mobile | 88 | **100** | **100** | 100 | 0.92 s | 2.11 s | 148 ms | 0.000 |
| `/products` | mobile | 88 | **100** | **100** | 100 | 0.77 s | 2.42 s | 35 ms | 0.000 |
| `/case-studies` | mobile | 89 | **100** | **100** | 100 | 0.76 s | 1.96 s | 69 ms | 0.000 |
| `/` | desktop | 90 | **100** | **100** | 100 | 0.25 s | 0.51 s | **0 ms** | 0.000 |

### What actually moved

| Metric | Before | After | Note |
|---|---|---|---|
| **Total blocking time, `/` mobile** | 1,100 ms | **11 ms** | comparable; this is main-thread work, not network |
| **Total blocking time, `/services` mobile** | 1,458 ms | 108 ms | comparable |
| **Main-thread work, `/` mobile** | 5.0 s | 1.19 s | comparable |
| **JS bootup, `/` mobile** | 1.6 s | ~0.3 s | comparable |
| **DOM nodes, `/`** | 1,655 | **538** | comparable |
| **Accessibility** | 98 | **100** | comparable |
| **Animated elements** | 80 | 16 (all finite) | comparable |
| LCP mobile | 3.71 s | 2.12 s | partly network; the real fix is that the `<h1>` is now server-rendered and unanimated |
| Performance score | 56–83 | 87–90 | **not comparable** — capped by the broken Speed Index |

The largest single cause of the blocking time was three animation libraries — GSAP + ScrollTrigger, Lenis and Framer Motion — loading on every page, plus a header that wrote `width`, `top` and `borderRadius` on a GSAP ticker every frame. All three libraries are gone, and the header is a static sticky bar.

---

## 3. Cross-viewport matrix

Chromium at 360, 390, 430, 768, 1024, 1366, 1440, 1920, 2560; Firefox at 1440. **WebKit could not run** — this host is missing `libavif13`. Fix with `sudo npx playwright install-deps webkit` and the three WebKit projects in `playwright.config.ts` start working.

| Check | Result |
|---|---|
| Horizontal overflow, 16 routes × 5 widths | **none** (the old site also passed this) |
| Broken images | none |
| Console errors | none |
| One `<h1>` per route | 16 / 16 |
| Structured data present | 16 / 16 |

**Playwright suite: 140 passed, 8 skipped, 0 failed** (`tests/e2e/`, 3.7 min). The skips are viewport-conditional: the mobile-panel tests skip on desktop widths, the theme-toggle test skips below 1024.

Screenshots: `docs/revamp/screenshots/before/` (46 files) and `docs/revamp/screenshots/after/` (80 files).

---

## 4. Content, SEO and structure

| | Before | After |
|---|---|---|
| Homepage sections | 17 | **10** |
| Homepage height @390 | 29,141 px | **13,495 px** |
| Homepage height @1440 | 15,071 px | 9,902 px |
| "Production, not demos" message | 6 placements | **1** |
| Indexable routes | 22 | **51** (sitemap) |
| Structured data types | `Organization` only | `Organization`, `WebSite`, `Service`, `Product`, `FAQPage`, `Article`, `BreadcrumbList` |
| JSON-LD in server HTML | partially (next/script injected it after hydration) | **all of it** |
| `og.png` | **404 in production** | generated per route via `next/og` |
| Canonical host | pointed at a host that 308-redirects | `www.qentrix-ai.com` throughout |
| FAQ questions | 8 | 12, rewritten around 2026 procurement |
| Testimonials | 3 placeholders shown as real quotes | **removed** |
| Client names | 3 logos looped 4× | named once: TriggerX, Grow9X, TechForge |

---

## 5. Still open

**Blocked on you**
1. **Five case-study figures.** Metric slots are built and styled; only the multi-agent case (`0 to 70% in one quarter`) can be filled today.
2. **Sharper Grow9X (145×113) and TechForge (284×61) marks** — they cannot render crisply at any size.
3. **Screenshots for MultiAgent Chatbot, DocumentAI and VoxRoute** — those three product pages are text-only.
4. **Permission to delete three unused team images**, including a 2.0 MB PNG of a photograph. Nothing renders them since the founder-only decision.

**Deferred by choice**
5. **The six original SVG diagrams** from `06-images.md` are specified but not yet drawn. The pages stand without them; they are the strongest remaining visual upgrade.
6. **WebKit coverage** needs one `sudo` command on this host.
7. **Analytics is still disabled** (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` empty), so there will be no behavioural before/after unless it is switched on before launch.
8. **`src/_legacy/`** holds the old page and card sources, ignored by git and excluded from typecheck. Delete once the preview is approved.

**Environment**
9. `output: "standalone"` is now opt-in via `NEXT_OUTPUT=standalone` (the Dockerfile sets it). It was breaking `next start` locally by writing the server under `.next/standalone`, and Vercel ignores it.
10. **`NEXT_PUBLIC_SITE_URL` must be set to `https://www.qentrix-ai.com` in the Vercel project** — the repo default now matches, but the deployed env var is what wins.

---

# Visual overhaul — QA, 2026-09-20

Measured against the production build on `revamp/v2`, served by `next start`,
driven by the locally installed Google Chrome. Playwright 1.63 ships no
bundled browser for macOS 12 and `playwright install` refuses on this OS, so
`playwright.config.ts` and `scripts/*.mjs` use `channel: "chrome"`.

## Gates

| Gate | Result |
|---|---|
| Playwright matrix (7 viewports × 15 routes) | **266 passed, 0 failed**, 7 skipped |
| axe-core, 9 routes × 2 themes | **0 violations** |
| Horizontal overflow, 360–2560 px | **0 px everywhere** |
| Console errors after full-page scroll | **none** |
| `npm run lint` / `tsc --noEmit` | clean |
| `next build` | exit 0, no warnings |

The 7 skips are viewport-conditional pairs, not gaps: the mobile-nav test
skips at desktop widths and runs at phone and tablet; the theme-toggle test
does the reverse. Every test runs somewhere.

## Lighthouse — home, mobile

**Every number in the first version of this section was wrong** and has been
replaced. Those runs were measured against a build whose stylesheet 404'd, so
the page under test had **zero CSS rules**. An unstyled page scores well: no
layout work, no shifts, and axe finds nothing to complain about. See
"The unstyled-build trap" below.

Five runs on a correct build, because this host is contended and a single run
is not evidence:

| run | perf | LCP | TBT | CLS |
|---|---|---|---|---|
| 1 | 87 | 3.32 s | 252 ms | 0 |
| 2 | 96 | 2.63 s | 75 ms | 0 |
| 3 | 69 | 3.45 s | 1026 ms | 0 |
| 4 | 96 | 2.64 s | 84 ms | 0 |
| 5 | 96 | 2.68 s | 88 ms | 0 |

Three of five cluster tightly at 96 / ~2.65 s / ~80 ms. Runs 1 and 3 carry TBT
of 252 ms and 1026 ms, which is other work on the machine, not the page.

| Metric | Before | Median now | Budget |
|---|---|---|---|
| Performance | 87 | **96** | ≥ 90 |
| Accessibility | — | **100** | ≥ 95 |
| Best practices | — | **100** | ≥ 95 |
| SEO | — | **100** | ≥ 95 |
| TBT | 0 ms | **88 ms** | ≤ 200 ms |
| CLS | 0 | **0** | < 0.1 |
| LCP | 2.6 s | **2.68 s** | < 2.5 s — still missed |

LCP is **effectively unchanged** (2.6 → 2.68 s) while the performance score
went from 87 to 96. It misses the 2.5 s budget by ~0.2 s, and it missed it
before the overhaul too, so this is not a regression the overhaul introduced.

Of that 2.68 s, ~460 ms is TTFB from a local `next start` with no CDN in
front. **Re-measure against the Vercel preview before acting on it** — image
optimisation and caching run on Vercel's infrastructure, not this process.

### The unstyled-build trap

`next dev` and `next build` both write to `.next`. Running a build while the
VS Code dev task is up leaves prerendered HTML from one and static assets from
the other: the HTML asks for `/_next/static/css/<hash>.css`, the directory
holds `static/css/app/layout.css`, the request 404s, and every page renders
with no CSS. **The build still exits 0 and reports success.**

It cost three builds and a full round of measurements here, and it is silent —
`max-width: none`, `padding: 0`, browser-default `body` margin, which reads as
"the layout is broken" rather than "the stylesheet is missing".

Fixed at the root: `next.config.mjs` takes `distDir` from `NEXT_DIST_DIR`, and
verification runs as:

```bash
NEXT_DIST_DIR=.next-prod npm run build
NEXT_DIST_DIR=.next-prod npx next start -p 3311
```

**Check the stylesheet resolves before trusting any measurement:**

```bash
CSS=$(curl -s localhost:3311/ | grep -oE '/_next/static/css/[a-z0-9]+\.css' | head -1)
curl -s -o /dev/null -w '%{http_code}\n' "http://127.0.0.1:3311$CSS"   # must be 200
```

### Centring, measured

"Not centred" was this bug, not a layout fault. On a correct build the
container is exact at every width:

| Viewport | Container | Left | Right |
|---|---|---|---|
| 1440 | 1260 px | 90 | 90 |
| 1920 | 1260 px | 330 | 330 |
| 2560 | 1260 px | 650 | 650 |

## Fixed along the way

- `contact`, `book`, `careers` and `Badge` still referenced Kiln tokens
  (`ink`, `accent-violet`, `accent-mint`, `brand-400`). Tailwind emits nothing
  for an unresolvable class, so every card on those pages had no border and no
  surface.
- Contact and booking form **success and error messages** were
  `text-emerald-700` / `text-amber-700` — near-invisible on the dark theme, at
  the most important moment on the page.
- All three favicons pointed at the 512 px 84 KB master. Every page pulled
  84 KB for a 32 px slot.
- `GapDiagram` clipped its last label to "Productio".

## Environment notes

- `next dev` and `next build` share `.next`. Running both corrupts the build;
  one intermediate test run passed against a 500 page because of it. Use the
  production server for verification.
- `next build` needs network egress for `next/font`. Without it the build
  hangs on `socket hang up / Retrying` indefinitely rather than failing.
