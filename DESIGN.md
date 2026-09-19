# QentrixAI — Design system

> **Direction: Kiln** — selected at GATE 3 on 2026-09-19. Candidates and the reasoning behind them are in `docs/revamp/04-design.md`; mocks in `docs/revamp/screenshots/directions/`.

## The idea

A committed mid-tone. Almost every site in this category is near-white or near-black; Kiln is warm graphite, the colour of anodised metal, and it spends all of its boldness in exactly one place — a full-bleed verdigris slab that carries the proof and the only call to action. Everything else stays quiet. It suits the part of QentrixAI's story the other directions underplayed: this is a studio that operates nine of its own products, and quiet confidence sells that better than instrumentation or paperwork.

## Brand constraints

- The logo mark (blue-to-violet ribbon) and the wordmark are **fixed**. They ship unchanged and sit in a neutral chip so the mark never has to harmonise with the brand hue.
- The site ships a **true dual theme** — two committed palettes, not an inversion. Default is set per direction; preference persists in `localStorage` (`qx-theme`) and applies before first paint.

## Banned

- The previous palette: aubergine `#0D0B14`, iris `#7C6AFA`, the `brand-50…900` violet ramp.
- Indigo, violet or purple as a primary or inside any gradient.
- Tailwind default hues (`gray-500`, `blue-600`, …) anywhere in components.
- Neon-cyber clichés: circuit boards, glowing brains, matrix rain.
- Typefaces: Inter, Roboto, Arial, Space Grotesk.
- Generated-design tells: tracked-out ALL-CAPS eyebrows, meta strings joined with middle dots, `→` appended to button labels, one word of a headline accented in another colour, three identical rounded cards with the same shadow as a default section layout, numbered `01/02/03` markers on content that is not a sequence.

## Colour — Kiln

| Role | Dark (default) | Light |
|---|---|---|
| `bg` | `#262621` warm graphite | `#E3E1D8` stone |
| `surface` | `#2F2F29` | `#F2F1EA` |
| `surface-2` | `#3A3A32` | `#D5D3C8` |
| `border` | `rgb(240 238 230 / .14)` | `rgb(35 35 31 / .16)` |
| `text` | `#F0EEE6` chalk | `#23231F` |
| `muted` | `#B0ADA0` | `#55554D` |
| `brand` | `#0FA88C` verdigris | `#0B6B5C` |
| `accent` | `#74DCC6` pale verdigris | `#0B6B5C` |
| `on-brand` | `#0E1F1B` ink | `#F2F1EA` |
| `danger` / `info` | `#E8755C` / `#8FB8D0` | `#A8402B` / `#2C5F7A` |

**Why verdigris and not jade.** Oxidised copper, not fresh mint — it belongs to the same material world as the graphite base, and it sits furthest (RGB distance 61) from the Supabase green that every other studio site reaches for. Measured: `#0FA88C` is 5.07:1 on the graphite base, and ink on the slab is 5.72:1.

**Measured contrast (all pass):** text on bg 13.08 dark / 12.04 light · muted on bg 6.75 / 5.74 · brand as text on bg 5.07 / 4.90 · label on the slab — **ink** 5.72 dark, white 6.42 light.

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

## Type — Kiln

**Schibsted Grotesk** for display and text — one family, two clearly separated roles by size and weight. **DM Mono** for small factual strings only: stat labels, timestamps, identifiers, locations.

Self-hosted through `next/font`, variable where available, `display: swap`, latin subset.

- Scale: 12 / 13 / 15 / 17 / 20 / 26 / 34 / 46 / 60–78.
- Line length under 80 characters; serif body gets extra line-height.
- Monospace is for numbers, identifiers and machine strings **only** — never for prose labels.

## Motion — Kiln

The slab is the only animated element: it fills on first paint. Everything else is static.

- **No infinite animations.** Not one. Speed Index on the current site is 42.3 s because 80 elements never stop moving.
- One orchestrated page-load moment per page. Scroll reveals are subtle and respect `prefers-reduced-motion`.
- Animate `transform` and `opacity`. Never `width`, `top` or `height` on a scroll ticker.
- Hover communicates affordance. It does not perform.

## Imagery — Kiln

Large, quiet product screenshots — we already own 21 — cropped tight and placed directly on the graphite with no frames and no shadows. Original system diagrams (agent graph, retrieval flow, deployment topology) in two weights and one colour. No stock photography.

## Components

Container · Section · Button (primary / secondary / ghost, all states) · Link · Card *only where a card is semantically justified* · Badge · Stat · CaseStudyCard · ProductCard · ProcessStep · Accordion · Tabs · Nav + MobileNav · Form fields · Image.

## Quality floor

Every page: one `<h1>`, a clean heading ladder, zero axe violations, ≥ 44 × 44 px hit areas, visible keyboard focus, `inert` on the closed mobile panel with Escape and a focus trap, no horizontal overflow at 390–2560 px, Lighthouse mobile ≥ 90 performance / ≥ 95 a11y / ≥ 95 best practices / ≥ 95 SEO, LCP < 2.5 s with a **server-rendered** `<h1>`, CLS < 0.1.
