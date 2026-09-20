# QentrixAI — Design system

> **Direction: Aurora** — set by the owner on 2026-09-20, replacing Kiln. The colour scheme is taken from the two reference sites at their explicit instruction, which overrides the violet/indigo ban in CLAUDE.md §1.8 and §6.1. Kiln and the two rejected directions remain documented in `docs/revamp/04-design.md`.

## The idea

Light follows VamTam "AI FusionX": pure white, lavender gradient washes, a strong violet. Dark follows Quixlab "Optim AI": a blue-black base with violet and blue glows. Values were sampled from the live sites rather than eyeballed, then adjusted only where they failed contrast.

One adjustment was necessary. Quixlab's `#9B31FF` measures **3.88:1** on its own dark base and **2.94:1** on its surface, so in dark it is a **fill only** — text uses `#B57DFF` (6.65:1 / 5.04:1). In light, VamTam's `#6904F2` measures 7.24:1 on white and works as both fill and text.

## Brand constraints

- The logo mark (blue-to-violet ribbon) and the wordmark are **fixed**. They ship unchanged and sit in a neutral chip so the mark never has to harmonise with the brand hue.
- The site ships a **true dual theme** — two committed palettes, not an inversion. Default is set per direction; preference persists in `localStorage` (`qx-theme`) and applies before first paint.

## Banned

- Any colour outside the Aurora tokens. (The CLAUDE.md violet ban was lifted by the owner on 2026-09-20; violet is now the brand.)
- **`brand` as text in the dark theme** — `#9B31FF` measures 3.88:1. Text uses `link`.
- Tailwind default hues (`gray-500`, `blue-600`, …) anywhere in components.
- Neon-cyber clichés: circuit boards, glowing brains, matrix rain.
- Typefaces: Inter, Roboto, Arial, Space Grotesk.
- Generated-design tells: tracked-out ALL-CAPS eyebrows, meta strings joined with middle dots, `→` appended to button labels, one word of a headline accented in another colour, three identical rounded cards with the same shadow as a default section layout, numbered `01/02/03` markers on content that is not a sequence.
- **Raster artwork that only works on one theme.** `/images/abstract/system-cluster.png` was light vendor marks on a transparent ground, so on light it had to be boxed in a black panel with a caption explaining itself. Card artwork is drawn from tokens instead — see below.

## Card artwork (2026-09-21)

Four diagrams in `src/components/art/`, one per featured capability, each on
an `ArtPanel` stage: `ModelOrbit`, `AgentGraph`, `RetrievalFlow`, `VoiceWave`.

- Drawn from tokens, not shipped as images: they theme correctly, cost no
  bytes and stay sharp at any density.
- **No vendor logos.** Model names are set in mono type. Redrawing the OpenAI,
  Anthropic and Google marks from memory gets them subtly wrong, they are
  trademarks, and a raster of them is what broke the light theme.
- Nothing is taken from the reference templates. Both are paid commercial
  products; their layout and rhythm are fair to study, their asset files are
  not ours to ship.
- All motion is transform/opacity only and stops under `prefers-reduced-motion`.

## Colour — Aurora

| Role | Dark (default, Quixlab) | Light (VamTam) |
|---|---|---|
| `bg` | `#050609` near-black | `#FFFFFF` |
| `surface` | `#0C0E15` + `.surface-sheen` | `#FAF9F7` warm band |
| `surface-2` | `#0E1119` | `#F1EFFB` lavender tint |
| `band` stops | `#0E1119` → `#141826` | `#FAF9F7` → `#F1EFFB` |
| illustration plate | `#F1EFFB` (light in **both** themes) | `#F1EFFB` |
| `art-ground` | `#030407` | `#F8F7FD` |
| `border` | `rgb(255 255 255 / .10)` | `rgb(0 0 0 / .12)` |
| `text` | `#F8F9FA` | `#000000` |
| `muted` | `#9AA3B2` (7.48:1) | `#52565E` (7.36:1) |
| `brand` (fills) | `#9B31FF` | `#6904F2` |
| `link` (text) | `#B57DFF` | `#6904F2` |
| `accent` | `#144C99` | `#BCAFFC` |
| `on-brand` | `#FFFFFF` (4.91:1) | `#FFFFFF` (7.24:1) |
| orb stops | `#9B31FF`, `#144C99`, `#F52060` | `#BCAFFC`, `#DBD3FF`, `#F7F7FF` |

### Dark grounds went near-black (2026-09-21)

Owner direction: the sampled Quixlab surface `#252A32` read as grey plastic
wherever it was used as a card. The three dark grounds are now near-black and
every card carries `.surface-sheen`, one brand-tinted wash falling off its top
edge, so a card still reads as an object rather than a hole in the page.

These depart from the sampled reference values deliberately, so they are
theme values in `globals.css` rather than steps on the `--n-*` ramp; the ramp
still holds what was sampled.

Contrast only improved. Nothing here can regress accessibility:

| | text | muted | link | brand (fill) |
|---|---|---|---|---|
| card, was `#252A32` | 13.68 | 5.67 | 5.04 | 2.94 |
| card, now `#0C0E15` | **18.29** | **7.58** | **6.74** | 3.93 |
| page, was `#0D1017` | 18.05 | 7.48 | 6.65 | 3.88 |
| page, now `#050609` | **19.22** | **7.97** | **7.08** | 4.13 |

`brand` as text stays banned in dark — 3.93:1 on the new card surface is no
better than it was. Fills only; `link` for text.

**Verified:** zero axe violations across every route in both themes at 390px
and 1440px, re-run after the near-black change; no horizontal overflow at
360 / 390 / 768 / 1024 / 1440 / 1920 in either theme. Lighthouse accessibility
100 on every page.

Tokens are CSS variables in `src/app/globals.css`, mapped to semantic Tailwind colours in `tailwind.config.ts`. **No raw hex in components.**

## Depth and grounds (2026-09-20)

A browser pass found two things the palette could not fix on its own. Cards
read as outlines because `--shadow-card` was a single inset hairline — an
edge, with nothing behind it. And every section sat on the same ground at the
same weight, so 9,900 px of homepage read as one undifferentiated strip.

**Elevation** is a three-step scale per theme. `shadow-1` resting, `shadow-2`
raised (framed media, floating panels), `shadow-3` hover only.

| Token | Job |
|---|---|
| `--shadow-1` | Resting card. Hairline ring + inner highlight |
| `--shadow-2` | Raised: device frames, panel images |
| `--shadow-3` | Hover. Brand-tinted ring and glow |

**A band sits above the page, not below it** (2026-09-21). The band stops
were `#040406` and `#0A0C12` — a darker strip, which read correctly against
the old `#0D1017` base and stopped reading the moment the base went to
`#050609`: `#040406` is one unit darker than the page, so `band` drew no band
at all and two sections meant to alternate became one strip. Muted text
measures 7.42:1 on the first stop and 6.95:1 on the second.

**Grounds** are set per section with `<Section ground="base" | "wash" | "band">`.
`wash` lays two soft brand/accent radials behind the content; `band` moves it
onto `surface-2` and draws its own hairlines. **No two adjacent sections share
a ground** — that rule is the whole point of the prop. `band` draws its own
rules, so never also pass `rule` in `className`.

**Grain** (`.grain`) is one inline SVG turbulence at 3.5% over `wash` grounds.
It exists to break the banding that makes a large soft gradient read as a CSS
gradient rather than a designed surface. No request, no runtime cost.

Every decorative layer is `pointer-events: none` at `z-index: -1` behind
content. `tests/e2e/visual.spec.ts` asserts they neither widen the document
nor intercept a click on the primary CTA, because neither failure shows up in
a screenshot.

```
--color-bg  --color-surface  --color-surface-2  --color-border
--color-text  --color-muted
--color-brand  --color-accent
--color-success  --color-warn  --color-danger  --color-info
```

- A 9-step neutral ramp per theme, generated from the base hue so greys carry the base's undertone.
- **Contrast floors:** body text ≥ 4.5:1, large text ≥ 3:1, non-text UI ≥ 3:1. Secondary text never goes below `text/60` of the ink token.
- **Button labels follow the base.** Where the theme's brand hue is light, the label is ink, not white. White-on-brand is only legal where it measures ≥ 4.5:1.
- Semantic colours are real tokens with real jobs, not decoration.

## Type

**Schibsted Grotesk** for display and text — one family, two clearly separated roles by size and weight. **DM Mono** for small factual strings only: stat labels, timestamps, identifiers, locations.

Self-hosted through `next/font`, variable where available, `display: swap`, latin subset.

- Scale: 12 / 13 / 15 / 17 / 20 / 26 / 34 / 46 / 60–78.
- Line length under 80 characters; serif body gets extra line-height.
- Monospace is for numbers, identifiers and machine strings **only** — never for prose labels.

## Motion

Scroll reveals run on GSAP ScrollTrigger, imported dynamically and started on idle or first scroll — never in the initial bundle, and never touching the hero. Measured cost: total blocking time stays at 2–99ms against a 200ms budget.

The ambient orb field is the one infinite animation. It animates `transform` only, so it lives on the compositor and costs no main-thread time. This is the exception, not a reopening of the door:

- **No other infinite animations.** Not one. Speed Index on the current site is 42.3 s because 80 elements never stop moving.
- Scroll parallax (`data-parallax="<fraction>"`) and the process progress line
  (`data-progress-line`) ride the same lazily-imported GSAP instance. Nothing
  new enters the initial bundle.
- Stat counters roll up on first view. The server-rendered value is the source
  of truth; the animation only replaces it after mount, and digits are
  tabular so a counter can never contribute to CLS.
- One orchestrated page-load moment per page. Scroll reveals are subtle and respect `prefers-reduced-motion`.
- Animate `transform` and `opacity`. Never `width`, `top` or `height` on a scroll ticker.
- Hover communicates affordance. It does not perform.

## Imagery

Iridescent 3D renders for atmosphere, photography for the industry tabs, and our own 21 product screenshots. Two sources with different licence status — **read `docs/revamp/06-images.md` before adding or shipping imagery.** Getty files, third-party company logos and stock portraits-as-social-proof are excluded and must stay excluded.

## Components

Container · Section · Button (primary / secondary / ghost, all states) · Link · Card *only where a card is semantically justified* · Badge · Stat · CaseStudyCard · ProductCard · ProcessStep · Accordion · Tabs · Nav + MobileNav · Form fields · Image.

## Quality floor

Every page: one `<h1>`, a clean heading ladder, zero axe violations, ≥ 44 × 44 px hit areas, visible keyboard focus, `inert` on the closed mobile panel with Escape and a focus trap, no horizontal overflow at 390–2560 px, Lighthouse mobile ≥ 90 performance / ≥ 95 a11y / ≥ 95 best practices / ≥ 95 SEO, LCP < 2.5 s with a **server-rendered** `<h1>`, CLS < 0.1.
