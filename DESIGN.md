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

## Colour — Aurora

| Role | Dark (default, Quixlab) | Light (VamTam) |
|---|---|---|
| `bg` | `#0D1017` blue-black | `#FFFFFF` |
| `surface` | `#252A32` | `#FAF9F7` warm band |
| `surface-2` | `#191D2A` | `#F1EFFB` lavender tint |
| `border` | `rgb(255 255 255 / .10)` | `rgb(0 0 0 / .12)` |
| `text` | `#F8F9FA` | `#000000` |
| `muted` | `#9AA3B2` (7.48:1) | `#52565E` (7.36:1) |
| `brand` (fills) | `#9B31FF` | `#6904F2` |
| `link` (text) | `#B57DFF` | `#6904F2` |
| `accent` | `#144C99` | `#BCAFFC` |
| `on-brand` | `#FFFFFF` (4.91:1) | `#FFFFFF` (7.24:1) |
| orb stops | `#9B31FF`, `#144C99`, `#F52060` | `#BCAFFC`, `#DBD3FF`, `#F7F7FF` |

**Verified:** zero axe violations across every route in both themes at 412px and 1440px, Lighthouse accessibility 100 on every page.

Tokens are CSS variables in `src/app/globals.css`, mapped to semantic Tailwind colours in `tailwind.config.ts`. **No raw hex in components.**

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
- One orchestrated page-load moment per page. Scroll reveals are subtle and respect `prefers-reduced-motion`.
- Animate `transform` and `opacity`. Never `width`, `top` or `height` on a scroll ticker.
- Hover communicates affordance. It does not perform.

## Imagery

Iridescent 3D renders for atmosphere, photography for the industry tabs, and our own 21 product screenshots. Two sources with different licence status — **read `docs/revamp/06-images.md` before adding or shipping imagery.** Getty files, third-party company logos and stock portraits-as-social-proof are excluded and must stay excluded.

## Components

Container · Section · Button (primary / secondary / ghost, all states) · Link · Card *only where a card is semantically justified* · Badge · Stat · CaseStudyCard · ProductCard · ProcessStep · Accordion · Tabs · Nav + MobileNav · Form fields · Image.

## Quality floor

Every page: one `<h1>`, a clean heading ladder, zero axe violations, ≥ 44 × 44 px hit areas, visible keyboard focus, `inert` on the closed mobile panel with Escape and a focus trap, no horizontal overflow at 390–2560 px, Lighthouse mobile ≥ 90 performance / ≥ 95 a11y / ≥ 95 best practices / ≥ 95 SEO, LCP < 2.5 s with a **server-rendered** `<h1>`, CLS < 0.1.
