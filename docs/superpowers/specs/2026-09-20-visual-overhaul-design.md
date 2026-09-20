# Visual overhaul — design spec

**Date:** 2026-09-20
**Branch:** `revamp/v2`
**Status:** approved by owner 2026-09-20

---

## 1. Problem

The `revamp/v2` build is correct and fast but visually restrained. Every section
sits on the same surface at the same weight, cards are hairline outlines, and
imagery that already exists in `public/` is barely used. Next to the two
reference sites it reads as underdressed, not as disciplined.

The owner's ask: modern, eye-catching, animated — verified in a real browser.

## 2. Decisions taken

| Decision | Resolution | Source |
|---|---|---|
| Imagery sourcing | Match the *look*, license properly. Own screenshots + original SVG + Unsplash/Pexels graded to Aurora. **No assets lifted from the reference templates.** | Owner, 2026-09-20 |
| Depth of change | Amplify the visual layer **and** restructure homepage sections | Owner, 2026-09-20 |
| Page scope | Homepage + shared shell first, preview, then roll across remaining routes | Owner, 2026-09-20 |
| Testimonials | **Dropped.** `src/data/testimonials.ts` is placeholder copy drafted in-house; shipping it as client proof would violate CLAUDE.md §1.6 | Claude, delegated by owner |
| Palette / type | Aurora kept. Contrast and a11y work already verified; no reason to restart it | Claude, delegated by owner |
| Copy deck / routes | Unchanged. Presentation changes only | Claude, delegated by owner |

## 3. Non-goals

- No new palette, no new typefaces, no new routes.
- No changes to copy facts, stats, product names, case-study outcomes.
- No fabricated proof of any kind — testimonials, logos, numbers, certifications.
- No pricing tiers (QentrixAI sells engagements).
- No downgrade of the accessibility or performance floors in `DESIGN.md`.

## 4. Design

### 4.1 Visual system (shared shell)

**Section grounds.** `Section` gains a `ground` prop with three values that
alternate down the page:

- `base` — the plain background.
- `wash` — a large soft radial of `brand` + `accent` at low alpha, pinned
  behind content, `pointer-events: none`, `aria-hidden`.
- `band` — `surface-2` with hairline rules top and bottom.

This is the single highest-leverage change: it gives the page rhythm without
touching a word of copy.

**Elevation.** `--shadow-card` is currently a 1px inset hairline, which is why
cards read as outlines. It becomes a three-step scale:

```
--shadow-1  border + inner highlight               resting
--shadow-2  + soft ambient shadow                   raised
--shadow-3  + brand-tinted glow                     hover / active
```

Hover lifts 2px on `transform` only.

**Glass.** Reserved for floating elements only — the header once scrolled, tab
bars. Not a global treatment.

**Grain.** One tiling SVG noise overlay at ~3% opacity over `wash` grounds, to
kill gradient banding. No runtime cost.

**Type.** Same family. Display pushed to 72px / −2.2px tracking at desktop,
matching the measured reference values in `docs/revamp/02-inspiration.md`.
Stat numbers take a gradient fill. Headline words do **not** — `DESIGN.md`
bans that and the ban stands.

### 4.2 Homepage structure

Reordered on the reference sites' reading logic: **proof before claim**, one
action per screen.

Correction after reading the code: Industries and the tech stack are already
tabbed, and the case-study and product rows already carry real screenshots.
The gap is not missing patterns — it is that every section sits on the same
ground at the same weight, cards are `gap-px` outline grids with no elevation
or hover, images are unframed rectangles, and the only motion on the page is a
single fade-up. That is what 4.1 and 4.3 address.

| # | Section | Change |
|---|---|---|
| 1 | Hero | Proof cluster (3 real client marks + 25+ systems / 12 geographies) moves *above* the `<h1>`. One primary CTA. Orb field gains scroll parallax. Large visual drops below the fold line |
| 2 | Stat band | The violet slab rebuilt as a credibility strip, counters roll up on first view |
| 3 | Selected work | Asymmetric cards, product screenshots in device frames, outcome number pulled out large |
| 4 | The gap | Original SVG diagram (demo → production) replacing a prose wall |
| 5 | What we build | 6 capabilities, asymmetric 2-col grid — not three identical cards |
| 6 | Products | Browser-framed screenshots, hover cross-fade to a second shot |
| 7 | How we work | 4-phase timeline, scroll-driven progress line |
| 8 | Industries | Already tabbed with a photo per tab. Gains the visual treatment: larger panel, framed image, tab pills instead of underlines, cross-fade on tab change |
| 9 | Tech stack | Lives on `/services`, already tabbed. Chips → cards in the second pass, not on the homepage |
| 10 | Why us | 3 reasons with receipts |
| 11 | Insights | 3 articles with generated cover art |
| 12 | FAQ + CTA | Accordion left, booking card right |

Section order in `src/app/page.tsx` changes; the data files do not.

### 4.3 Motion

All motion is compositor-only (`transform` / `opacity`). The old site's Speed
Index was 42.3s because 80 elements never stopped moving; that lesson holds.

- **Load:** one orchestrated staggered reveal, CSS-only. The `<h1>` is never
  gated behind JS — it is the LCP element and stays server-rendered.
- **Scroll:** hero parallax, process progress line, stat counter roll-up,
  mask-reveal on work cards. Extends the existing `ScrollReveal` component,
  which already lazy-loads GSAP on idle or first scroll.
- **Hover:** card lift + glow, product frame cross-fade, 4px-max magnetic pull
  on the primary CTA.
- `prefers-reduced-motion: reduce` disables all of it and renders every section
  in its final state.
- **Budget:** mobile Lighthouse ≥ 90 performance, TBT ≤ 200ms, CLS < 0.1. Any
  treatment that breaks the budget is cut. The budget is not.

### 4.4 Imagery

1. Own product screenshots (21 in `public/products/`) in device frames.
2. Original SVG/CSS diagrams — the strongest differentiator for an engineering
   studio, and the only imagery with no licence question at all.
3. The 6 industry photographs already in the repo.
4. Unsplash / Pexels only where a photograph genuinely beats a diagram, graded
   to the Aurora palette, each logged with URL + author + licence in
   `docs/revamp/06-images.md`.

Every image ships through `next/image` with explicit dimensions, `sizes`, and
a blur placeholder. Only the hero visual gets `priority`.

## 5. Component changes

| Component | Change |
|---|---|
| `ui/Section.tsx` | New `ground` prop (`base` / `wash` / `band`) |
| `ui/Card.tsx` | **New** — the elevation scale, replacing ad-hoc card markup |
| `ui/DeviceFrame.tsx` | **New** — browser chrome wrapper for product screenshots |
| `ui/Tabs.tsx` | **New** — extracts the roving-tabindex logic duplicated in `Industries.tsx` and `StackTabs.tsx`, adds the pill styling and panel cross-fade |
| `ui/Stat.tsx` | Counter roll-up, gradient numerals |
| `ui/OrbField.tsx` | Scroll parallax, opt-in per section |
| `motion/ScrollReveal.tsx` | Extended: parallax, progress line, counters |
| `sections/Hero.tsx` | Restructured per 4.2 |
| `sections/Industries.tsx` | Rebuilt onto `ui/Tabs`; framed panel image |
| `sections/StackTabs.tsx` | Visual upgrade onto `ui/Tabs` |
| `sections/TheGap.tsx` | Gains the SVG diagram |
| All other sections | Grounds, cards, imagery |

New components are separate files with one purpose each, so they can be read
and tested independently.

## 6. Verification

Non-negotiable — "it should work" is not done.

1. **Playwright script** — homepage at all 8 viewports × both themes, full-page
   screenshots to `docs/revamp/screenshots/after/`.
2. **Assertions** — `scrollWidth <= innerWidth` at every viewport; zero console
   errors; keyboard paths through the new Tabs and Accordion; focus visible;
   `prefers-reduced-motion` renders everything in final state.
3. **axe-core** — zero violations, every route, both themes.
4. **Lighthouse** — mobile + desktop, recorded against the Phase 1 baseline in
   `docs/revamp/07-qa-report.md` as a before/after table.
5. Loop: run → list failures → fix → rerun until green.

## 7. Risks

| Risk | Mitigation |
|---|---|
| Richer visuals push LCP past 2.5s | Only the hero visual is `priority`; everything else lazy. Measured per page, not assumed |
| Counter roll-up causes CLS | Numerals reserve their final width via `tabular-nums` and a min-width |
| GSAP additions inflate TBT | Already dynamic-imported on idle. Budget checked after each section lands |
| Tabs regress keyboard access | One shared `ui/Tabs` primitive with the full roving-tabindex pattern, tested once |
| Sourced photography clashes with Aurora | Graded through a consistent treatment; dropped if it fights the palette |

## 8. Rollout

Homepage + shell → owner reviews on a Vercel preview → remaining routes in the
same system → full QA matrix → GATE 5 before `main`.
