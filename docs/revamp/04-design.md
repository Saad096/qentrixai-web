# 04 — Design system: three directions

**Date:** 2026-09-19 · **Status:** awaiting GATE 3 selection
**Constraints locked by the owner:** logo is **fixed** (the blue-violet ribbon mark and wordmark ship unchanged) · **true dual theme** in every direction.
**Banned by CLAUDE.md §1.8 / §6.1:** the current aubergine `#0D0B14`; indigo / violet / purple as primary or in gradients; Tailwind default hues; neon-cyber clichés; Inter, Roboto, Arial, Space Grotesk.
**Mocks:** `docs/revamp/screenshots/directions/` — each direction at 1440 dark, 1440 light, 390 dark. Prototypes were throwaway HTML rendered through Playwright.

---

## 1. Research and what it ruled out

**2026 colour reading.** The cold greys of the 2010s have given way to warm, slightly beige neutrals; deep teals and muted blue-greens are being paired with electric accents; Pantone's colour of the year is Cloud Dancer, a soft airy white read as "reset and clarity"; and gradients have moved from flat linear rainbows to ambient, layered washes. The consistent professional framing is that colour is now a **system** — it has to survive light and dark, pass contrast, and hold up on OLED — rather than a palette. ([Wix](https://www.wix.com/blog/website-color-trends), [Lounge Lizard](https://www.loungelizard.com/blog/web-design-color-trends/), [Figma](https://www.figma.com/resource-library/web-design-trends/), [Kontra](https://kontra.agency/top-web-design-trends-for-2026/))

**What reads as dated or generated.** Years of dark interfaces with muted gradients now read as emotionally cold; 2026 design writing describes a deliberate swing back to warmth. Separately, typography is being treated as the primary interface architecture, partly as a page-weight decision, and neo-serif paired with monospace is an emerging pairing. ([Graphic Design Junction](https://graphicdesignjunction.com/2026/08/did-the-2026-web-design-trends-predictions-come-true/), [Fireart](https://fireart.studio/blog/the-best-web-design-trends/), [Awwwards](https://www.awwwards.com/typography-heavy-design.html))

**The `frontend-design` skill's calibration list mattered more than the trend pieces.** It names the current AI-generated design clusters, and **two of CLAUDE.md's own starting hypotheses land inside them**:

| CLAUDE.md hypothesis | Verdict |
|---|---|
| "Blueprint" — warm paper, ink type, engineering-orange accent | **Rejected as stated.** Cluster 1 is precisely "warm cream near `#F4F1EA` + high-contrast serif + terracotta near `#D97757`". Direction B keeps the *engineering-drawing idea* but moves to a cool limestone, a grotesk display, and a signal red. |
| "Obsidian & copper" — near-black, copper accent | **Rejected.** Cluster 2 is near-black plus a single bright accent. Direction A keeps a dark base but makes it petrol blue-green, not tinted black, and uses two semantic hues rather than one decorative one. |
| "Deep teal + acid lime" | **Rejected.** Acid-on-dark is the same cluster. Direction C uses jade at *large scale as a surface*, never as a glow. |

Also struck from all three directions, because our current site does every one of them: tracked-out ALL-CAPS eyebrows, meta strings joined with middle dots, `→` appended to button labels, a single word in the headline accented in a different colour, and identical rounded cards with the same shadow used as the default layout.

**The fixed-logo problem, solved the same way in all three.** The mark is a blue-to-violet ribbon and it cannot change. Every direction therefore (a) keeps the mark in a neutral white chip so it never has to harmonise, and (b) chooses a brand hue far from violet on the wheel — amber, red, jade — so the mark reads as a *mark*, not as a colour that lost an argument with the palette. The mocks include the real `qentrix-mark.png` for exactly this test.

---

## 2. Direction A — **Signal**

> The page behaves like a healthy system.

**Rationale.** QentrixAI's actual differentiator is not that it builds AI — everyone says that — it is that the things it builds *stay up*, with evals, tracing and a rollback path wired before launch. Signal takes its visual language from the one artifact that proves this: a production status readout. Semantic colour stops being a footnote in the token file and becomes the brand — green means healthy, amber means attention, and those are the two hues the site is built from. The hero is not a claim with a picture next to it; it is four real systems with their latency, uptime and run counts.

**Palette**

| Role | Dark (default) | Light |
|---|---|---|
| `bg` | `#0A1218` petrol-black | `#F1F4F2` cool bone |
| `surface` | `#101C24` | `#FFFFFF` |
| `surface-2` | `#16262F` | `#E4E9E6` |
| `text` | `#E8F0F2` | `#0A1218` |
| `muted` | `#9FB2B8` | `#46585F` |
| `brand` | `#E9A93C` marigold | `#8A5A05` bronze |
| `accent` | `#3ECF9A` mint | `#0E7C56` |
| `danger` / `info` | `#FF6B5A` / `#63B3D6` | `#B3261E` / `#1F6F92` |

**Contrast (measured)**

| Pair | Dark | Light | Req |
|---|---|---|---|
| text on bg | 16.34 | 17.04 | ≥4.5 ✅ |
| muted on bg | 8.57 | 6.72 | ≥4.5 ✅ |
| brand as text on bg | 9.17 | 5.35 | ≥4.5 ✅ |
| accent as text on bg | 9.52 | 4.70 | ≥4.5 ✅ |
| **label on brand button** | **ink 9.17** ✅ (white 2.06 ✗) | white 5.92 ✅ | ≥4.5 |

**Type.** Archivo (variable, weight + width) at `wdth 112` for display and `wdth 100` for text — the width axis is a real tool, not decoration. Martian Mono, at 400/600, **only on numbers and machine strings**. No monospace on prose labels.

**Motion.** One boot sequence on page load: the readout rows arrive in order and the numbers settle. Nothing loops. Status dots have no pulse.

**Imagery.** Our own instrumentation, drawn in the design system: trace waterfalls, latency histograms, eval-run tables, agent graphs. Zero stock photography.

**Mock:** `directions/a-signal-1440-dark.png`, `-light.png`, `a-signal-390-dark.png`

**Honest risk.** The light theme is the weaker half: pushing marigold to 4.5:1 turns it into bronze and the page loses some of its charge. Fix is to use marigold as a *fill* with ink text in light mode rather than as a text colour.

---

## 3. Direction B — **Draft**

> What you actually own at the end.

**Rationale.** The single most persuasive thing QentrixAI can say to a 2026 technical buyer is that the engagement ends with a handover, not a dependency — procurement now treats vendor lock-in as accumulating across model, orchestration, data, governance and team knowledge. Draft takes the engineering-drawing tradition and points it at the deliverable: the hero's right rail is the four artifacts you keep, numbered because they genuinely are a sequence. Rules appear only where they mark a real boundary. Signal red is used once per screen, like a correction mark.

**Palette**

| Role | Light (default) | Dark |
|---|---|---|
| `bg` | `#EDEDE7` limestone | `#131518` |
| `surface` | `#F7F7F3` | `#1A1D21` |
| `surface-2` | `#E2E2DA` | `#22262B` |
| `text` | `#16171A` ink | `#EDEDE7` |
| `muted` | `#4E5257` | `#A0A5AB` |
| `brand` | `#C1352B` signal red | `#F0705F` |
| `accent` | `#23606E` slate cyan | `#6FB3C4` |

**Contrast (measured)**

| Pair | Light | Dark | Req |
|---|---|---|---|
| text on bg | 15.25 | 15.56 | ≥4.5 ✅ |
| muted on bg | 6.70 | 7.37 | ≥4.5 ✅ |
| brand as text on bg | 4.69 | 6.26 | ≥4.5 ✅ |
| accent as text on bg | 6.02 | 7.77 | ≥4.5 ✅ |
| **label on brand button** | white 5.51 ✅ | **ink 6.26** ✅ (white 2.92 ✗) | ≥4.5 |

**Type.** Bricolage Grotesque (variable: optical size, width, weight) compressed to `wdth 92` for display — it has genuine character and is not on any AI-agency site. **Newsreader** for body prose: a serif body is unusual in this category, reads as considered, and takes a longer measure. Spline Sans Mono for specs and identifiers only.

**Motion.** One reveal on load. Hover states change *rule weight*, not colour. No card lifts.

**Imagery.** Schematic line drawings: deployment topology, retrieval flow, approval path. Flat, two-weight, one colour.

**Mock:** `directions/b-draft-1440-light.png`, `-dark.png`, `b-draft-390-dark.png`

**Honest risk.** Limestone at `#EDEDE7` sits near the "warm cream" tell. It is cooler and the accent is a signal red rather than terracotta, but this is the direction most likely to be read as current-generation AI design. If it wins, the answer is to push the base a further step cool or grey.

---

## 4. Direction C — **Kiln**

> A committed mid-tone, and one block of colour worth remembering.

**Rationale.** Almost every site in this category is either near-white or near-black. Kiln commits to a warm graphite that is neither — the colour of anodised metal — and spends all of its boldness in exactly one place: a full-bleed jade slab that carries the proof and the only CTA. Nothing else on the page is allowed to shout. It suits the part of QentrixAI's story that the other two directions underplay: this is a studio that *operates* nine of its own products, and quiet confidence sells that better than instrumentation or paperwork.

**Palette**

| Role | Dark (default) | Light |
|---|---|---|
| `bg` | `#262621` warm graphite | `#E3E1D8` stone |
| `surface` | `#2F2F29` | `#F2F1EA` |
| `surface-2` | `#3A3A32` | `#D5D3C8` |
| `text` | `#F0EEE6` chalk | `#23231F` |
| `muted` | `#B0ADA0` | `#55554D` |
| `brand` | `#17B07E` jade | `#0A6E4E` |
| `accent` | `#7FE3C0` pale jade | `#0A6E4E` |

**Contrast (measured)**

| Pair | Dark | Light | Req |
|---|---|---|---|
| text on bg | 13.08 | 12.04 | ≥4.5 ✅ |
| muted on bg | 6.75 | 5.74 | ≥4.5 ✅ |
| brand as text on bg | 5.46 | 4.78 | ≥4.5 ✅ |
| **label on brand slab** | **ink 5.46** ✅ (white 2.78 ✗) | white 6.26 ✅ | ≥4.5 |

**Type.** Schibsted Grotesk across display and text — one family, two clearly separated roles by size and weight, which is the restrained option the skill recommends. DM Mono for the small factual strings only.

**Motion.** The slab is the only animated element: it fills on first paint. Everything else is static.

**Imagery.** Large, quiet product screenshots — we already own 21 — cropped tight and placed on the graphite without frames or shadows.

**Mock:** `directions/c-kiln-1440-dark.png`, `-light.png`, `c-kiln-390-dark.png`

**Honest risk.** Jade is Supabase's hue, and our own `globals.css` already cites Supabase as a reference. At slab scale it reads differently from a jade accent-on-dark, but it is the least "owned" of the three colours. The stat labels inside the slab also need a baseline fix.

---

## 5. Shared rules, whichever direction wins

**Tokens (§6.2).** Tailwind v3 is what this repo runs, so tokens stay as CSS variables in `globals.css` mapped to semantic Tailwind colours — the current file already does this correctly and that structure survives. Names: `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-text`, `--color-muted`, `--color-brand`, `--color-accent`, `--color-success|warn|danger|info`, `--color-border`, `--radius-*`, `--space-*`, `--font-display`, `--font-text`, `--font-mono`, `--shadow-*`, `--motion-*`. **No raw hex in components** — the audit found `brand-500 → brand-700` hard-coded in `Button.tsx`, which is why the primary button fails contrast in dark mode today.

**The neutral ramp** is 9 steps per theme, generated from the base hue so the greys carry the same undertone as the background. No `gray-500`.

**Button labels follow the base, not the habit.** In every direction the dark-theme brand hue is light, so button text is **ink**, not white. White-on-brand in dark mode is exactly the 3.96:1 failure the audit found on the live site (B-08).

**Type scale** follows a 1.25 minor-third at text sizes and jumps at display: 12 / 13 / 15 / 17 / 20 / 26 / 34 / 46 / 60–78. Line length capped under 80 characters; serif body (Direction B) gets extra line-height.

**Motion budget (§6.4).** One orchestrated page-load moment per page. Scroll reveals respect `prefers-reduced-motion`. **No infinite animations at all** — Speed Index is 42.3 s today because 80 elements never stop moving. No marquee unless it carries ≥8 distinct real items, which means no marquee. Hover communicates affordance; it does not perform.

**Components (§6.3).** Container · Section (eyebrow/heading/lede slots, but eyebrows are sentence case) · Button (primary/secondary/ghost, all states, ≥44 px hit area) · Link · Card **only where a card is semantically justified** · Badge · Stat · CaseStudyCard · ProductCard · ProcessStep · Accordion · Tabs · Nav + MobileNav (with `inert`, Escape, focus trap) · Form fields (`type="tel"`, `inputMode`, `autoComplete`) · Image (aspect-ratio, `sizes`, blur placeholder).

**Fonts ship via `next/font` self-hosted**, variable where available, `display: swap`, subset to latin. Today's two Google fonts cost 70 KB; the budget stays at two families plus one mono.

---

## 6. GATE 3 — what I need

Pick **one** direction, or ask for a blend (e.g. Signal's readout hero inside Kiln's palette). Then I build the token layer and the component set, and Phase 5 writes the copy deck against the chosen voice.

| | A — Signal | B — Draft | C — Kiln |
|---|---|---|---|
| Base | petrol-black / cool bone | limestone / graphite | warm graphite / stone |
| Brand | marigold | signal red | jade |
| Feels like | an operations console | an engineering drawing | anodised metal |
| Sells | "it stays up" | "you own it at the end" | "we operate our own" |
| Boldest element | the live readout | the handover rail | the jade slab |
| Weakest point | light theme loses charge | closest to the cream tell | jade is Supabase-adjacent |

---

## 7. GATE 3 outcome — 2026-09-19

**Direction C, Kiln, selected.** Two changes were made on selection, both addressing risks named in §4:

1. **Jade → verdigris.** `#17B07E` moved to **`#0FA88C`**, and the light-theme partner from `#0A6E4E` to `#0B6B5C`. Verdigris is oxidised copper rather than fresh mint: it belongs to the same material world as the graphite base and sits at RGB distance **61** from Supabase's `#3ECF8E` (the original jade was 52). Contrast improved in the process — 5.07:1 on the base, 5.72:1 for ink on the slab.
2. **Slab baselines fixed.** Stat labels of differing line counts no longer push the numerals off a common baseline.

The locked system now lives in `/DESIGN.md`. Directions A and B are kept here as the record of what was considered and why it was not chosen.
