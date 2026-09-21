# QentrixAI — Design system

> **Direction: Graphite** — dark base chosen by the owner on 2026-09-21: *not navy*. A warm-tinted near-black carries the dark theme; the light theme is unchanged cool paper; the blue stays as the brand fill in both. Supersedes Meridian's navy, which supersedes the amber pass. Earlier directions remain in `docs/revamp/04-design.md`.

**Why a neutral base.** On a coloured ground every product screenshot competes with the page for saturation. On graphite the only saturated things on screen are the work and the CTA, which is the argument the site is making anyway. It also removes the last place navy was load-bearing: the footer band, which is graphite now in both themes.

Nothing is pure black. `#000` under white type produces the halation the first audit flagged, and a warm tint (R two points above B) is what keeps a near-black from reading as "unstyled".

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

## Colour — Meridian

Sampled from the reference rather than eyeballed.

| Role | Dark (default) | Light |
|---|---|---|
| `bg` | `#121114` graphite | `#F5F7FA` cool paper |
| `surface` | `#1B1A1E` | `#FFFFFF` |
| `surface-2` | `#0D0C0F` | `#EBEFF4` |
| `art-ground` | `#0A090C` | `#EAF2FD` |
| `text` | `#F6F5F7` (17.31:1) | `#13263A` (14.32:1) |
| `muted` | `#A6A3AD` (7.58:1) | `#566779` (5.42:1) |
| `brand` — fills only in dark | `#2F6BE0` | `#1F5FD1` |
| `link` — text | `#8AB4FF` (9.01:1) | `#1F5FD1` (5.41:1) |
| `on-brand` | `#FFFFFF` (4.88:1) | `#FFFFFF` |

Footer band (`.footer-deep`, both themes): `#0A090C` ground, text 18.28:1,
muted 8.08:1, link 9.60:1.

**The rule that keeps breaking, written down.** `brand` is a fill token. On
graphite it measures **3.85:1 as text** — enough for a 3:1 non-text element,
not enough for type. It has now failed an audit three times: amber on
graphite, blue on navy, and blue on graphite. Foreground on a page ground is
always `link`. The same applies to non-text UI that has to clear 3:1: the
inference dial arc and the radar's range inputs both use `link`.

`brand` as a foreground is legal in exactly one place: on `bg-on-brand`
(white), where blue on white is 5.81:1.

**Decorative washes are tokenised per theme.** `--wash-alpha` and
`--band-glow` are 0.07/0.06 in dark against 0.16/0.14 in light. On navy a
brand wash was the same hue as the page and merely lifted it; on graphite it
is a different hue, and the light theme's value read as a blue stain on
grey.

## Type

**Schibsted Grotesk** for display and text — one family, two clearly separated roles by size and weight. **DM Mono** for small factual strings only: stat labels, timestamps, identifiers, locations.

Self-hosted through `next/font`, variable where available, `display: swap`, latin subset.

- Scale: **13 / 14 / 16 / 18 / 21** / 23–27 / 27–35 / 31–44 / 38–68.
- Raised one step on 2026-09-21 on the owner's readability note. 15px body is
  the size a design tool shows you and a reader squints at; 16px is the
  browser default for a reason. Mono labels went 12 → 13 because DM Mono runs
  small for its point size and those labels carry real information.
- The display end moved the other way. The hero was capped at 78px, which put
  four words on a line and made every h1 break badly; 68px fits the same
  headline in fewer, better lines. Heading leading loosened with it — `3xl`
  from 1.05 to 1.14, because 1.05 was set for a one-line heading and nearly
  every heading on the site wraps.
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
- **Durations and easing are tokens, not literals** (2026-09-21, owner note
  that the motion felt clipped): `--motion-fast` 180ms, `--motion-base`
  420ms, `--motion-slow` 720ms, on one curve — `--ease-out`
  `cubic-bezier(0.22, 1, 0.36, 1)`. Scroll reveals run 0.95s on `expo.out`,
  which spends most of its duration settling rather than moving; that is what
  reads as smooth rather than merely slow. A hover still answers at
  `--motion-fast`.
- Animate `transform` and `opacity`. Never `width`, `top` or `height` on a scroll ticker.
- Hover communicates affordance. It does not perform.

## Imagery

Iridescent 3D renders for atmosphere, photography for the industry tabs, and our own 21 product screenshots. Two sources with different licence status — **read `docs/revamp/06-images.md` before adding or shipping imagery.** Getty files, third-party company logos and stock portraits-as-social-proof are excluded and must stay excluded.

## Components

Container · Section · Button (primary / secondary / ghost, all states) · Link · Card *only where a card is semantically justified* · Badge · Stat · CaseStudyCard · ProductCard · ProcessStep · Accordion · Tabs · Nav + MobileNav · Form fields · Image.

## Quality floor

Every page: one `<h1>`, a clean heading ladder, zero axe violations, ≥ 44 × 44 px hit areas, visible keyboard focus, `inert` on the closed mobile panel with Escape and a focus trap, no horizontal overflow at 390–2560 px, Lighthouse mobile ≥ 90 performance / ≥ 95 a11y / ≥ 95 best practices / ≥ 95 SEO, LCP < 2.5 s with a **server-rendered** `<h1>`, CLS < 0.1.
