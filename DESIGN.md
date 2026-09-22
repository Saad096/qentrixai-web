# QentrixAI — Design system

> **Direction: Kiln** — restored by the owner on 2026-09-21 from the original GATE 3 direction mocks (`docs/revamp/screenshots/directions/c-kiln-*.png`), which they judged the most readable of everything tried. Warm graphite and stone, verdigris slab. Supersedes neutral Graphite, which superseded Meridian navy, which superseded the amber pass. The rejected directions remain in `docs/revamp/04-design.md`.

**Values are sampled from the mocks, not eyeballed.** `#262621`, `#E3E1D8`, `#0FA88C` and `#0B6B5C` were read out of the PNGs pixel by pixel, which is also how we confirmed the mocks already carry the GATE 3 verdigris adjustment rather than the original jade.

**Two things make it read differently from an ordinary dark theme.** The base is warm and mid-tone rather than near-black — `#262621` is anodised metal, not a hole punched in the screen. And in dark the band sits *above* the page rather than below it: `surface-2` is lighter than `bg`, so sections lift instead of sinking. Light inverts that, as light should.

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
| `bg` | `#1A1A1C` neutral grey | `#E3E1D8` stone |
| `surface` | `#232326` | `#F2F1EA` |
| `surface-2` | `#2C2C30` (lifts) | `#D5D3C8` (sinks) |
| `art-ground` | `#141416` | `#EDECE4` |
| `text` | `#F4F4F5` (15.81:1) | `#23231F` (12.04:1) |
| `text-2` | `#CFCFD4` (11.20:1) | `#35352F` (9.42:1) |
| `muted` | `#A6A6AB` (7.17:1) | `#55554D` (5.74:1) |
| `brand` — fill | `#0FA88C` verdigris | `#0B6B5C` pine |
| `link` — text | `#2FC0A5` (6.66:1) | `#0A6152` (5.63:1) |
| `on-brand` | `#0B2B24` **ink** (5.05:1) | `#F2F1EA` bone (5.67:1) |

Footer band (`.footer-deep`, both themes): `#1E1E1A` ground, text 14.39:1,
muted 7.43:1, link 7.33:1.

**White on brand is 3.00:1 and does not ship.** In dark the label on a
verdigris fill is ink. This is the same failure the first audit found on the
live site at 3.96:1, and it is why `on-brand` is a token rather than a habit.

**The rule that keeps breaking, written down.** `brand` is a fill token.
Verdigris clears 5.07:1 as text on the page but only **4.49:1 on a card** and
**3.82:1 on a band** — and most of our type sits on cards. The same holds in
light, where `#0B6B5C` as text on a band is 4.27:1. So the brand/link split
survives every repalette: amber on graphite, blue on navy, blue on graphite,
and now verdigris on warm graphite. Foreground on any ground is `link`.

**Three text tiers, and a job for each.** `text` for headings and anything
that carries the point. `text-2` for body and card copy. `muted` for
captions, sources and metadata only. Nothing on the site is lighter than
`muted`. The tier was added after a review found body copy and captions
sharing one colour, which flattens a page even when every pairing passes.

**Mono is for figures, identifiers and machine strings.** Not for section
labels. A 13px monospaced muted eyebrow stacks three legibility penalties on
four words; uppercase sans with tracking reads as a label without any of
them.

**One glow, behind the hero.** The page-wide orb field and the per-section
washes are gone. They put blurred smudges at different positions and
intensities behind sections that had no reason for them, which reads as an
accident rather than as atmosphere. Sections are told apart by alternating
grounds and a hairline, not by gradients.

**Never dim text with opacity.** Not on a card, not on a parent, not at
90%. Opacity composites the element and everything in it against whatever is
behind, and the result is always below the number the token was chosen for.
This includes an animation's *from-state*: a scrubbed timeline sits at its
from-state for every scroll position before its trigger, so `opacity: 0.2`
on a label is what a reader sees most of the time they are on the page.
Measured instances removed so far: the sequence steps at 0.55 (2.87:1 dark,
2.52:1 light, and 3.67:1 even for primary text), the pipeline stages whose
scrub started at 0.2, the mega-menu's promoted card at 0.90 (4.32:1), and
the 41 the first audit found on the old site. A
state that needs marking gets a border, a fill, a shadow or a transform —
something that is not the copy. Disabled controls are the one exemption,
because WCAG exempts them.

**Decorative washes are tokenised per theme.** `--wash-alpha` and
`--band-glow` are 0.09/0.08 in dark against 0.16/0.14 in light. On navy a
brand wash was the same hue as the page and merely lifted it; on graphite it
is a different hue, and the light theme's value read as a blue stain on
grey.

## Type

**Plus Jakarta Sans** for display and text — one family, two clearly separated roles by size and weight. **DM Mono** for small factual strings only: stat labels, timestamps, identifiers, locations.

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
- **The header pill is a scroll-driven CSS animation**, not a ticker. It is
  narrow and centred at the top of a page and full-bleed once scrolled, on
  `animation-timeline: scroll(root block)` over a 0–220px range. The browser
  runs it off the main thread and reverses it at the same ratio on the way
  back up, so no code arranges that. The old build did this on a GSAP ticker
  writing `width`, `top` and `border-radius` every frame — layout properties,
  so every frame of every scroll relaid out the document. That was a P0.
  Browsers without scroll timelines rest at the widened state.
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
