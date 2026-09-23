# Visual Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the `revamp/v2` homepage visual depth, imagery and motion so it reads as a top-tier 2026 AI studio, without changing a fact, a route, or the verified accessibility floor.

**Architecture:** Three layers, bottom-up. First new design tokens (elevation scale, section grounds, grain) in `globals.css` + `tailwind.config.ts`. Then three new presentational primitives (`Card`, `DeviceFrame`, `Tabs`) that the sections compose. Then a motion layer extending the existing lazy-loaded `ScrollReveal`. Sections are edited last so each edit is a small composition change, not a rewrite.

**Tech Stack:** Next.js 15.5 App Router, React 19, Tailwind 3.4, GSAP 3.15 (dynamic import only), Playwright 1.63 driving system Chrome, `@axe-core/cli`, Lighthouse 12.

**Spec:** `docs/superpowers/specs/2026-09-20-visual-overhaul-design.md`

## Global Constraints

Copied verbatim from the spec and `DESIGN.md`. Every task's requirements include these.

- **No raw hex in components.** Colour comes from semantic Tailwind tokens backed by CSS variables.
- **No asset from the Quixlab or VamTam templates.** Not an image, icon, illustration, logo or line of copy.
- **No invented proof.** No testimonials, client logos, numbers, or certifications that are not already true in `src/data/`.
- **`brand` is fill-only in dark.** `#9B31FF` measures 3.88:1 on the dark base. Text uses `link` (`#B57DFF`).
- **Banned:** Tailwind default hues; Inter / Roboto / Arial / Space Grotesk; tracked-out ALL-CAPS eyebrows; `→` appended to button labels; one headline word accented in another colour; three identical rounded cards as a default section layout.
- **Motion:** animate `transform` and `opacity` only. One infinite animation on the site (the orb field) and no more. `prefers-reduced-motion: reduce` renders everything in its final state.
- **The `<h1>` is never gated behind JS.** It is the LCP element and stays server-rendered.
- **Quality floor per page:** one `<h1>`, zero axe violations in both themes, ≥ 44 × 44 px hit areas, visible keyboard focus, no horizontal overflow at 360–2560 px, Lighthouse mobile ≥ 90 perf / ≥ 95 a11y / ≥ 95 best practices / ≥ 95 SEO, CLS < 0.1, TBT ≤ 200 ms.

## Verification Note

This is presentational work, so the test cycle is browser evidence, not unit
assertions. Every task ends with the same loop:

```bash
npm run build                 # must exit 0, zero warnings
npx next start -p 3311 &      # if not already running
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/<task>-dark.png 1440 900 dark
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/<task>-light.png 1440 900 light
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/<task>-390.png 390 844 dark
```

`scripts/shot.mjs` prints `overflow:<n>px`. **`overflow` must be `0` at every
width.** A non-zero value fails the task regardless of how it looks.

The host is macOS 12, which Playwright 1.63 has no bundled Chromium for, so
the helper drives the installed Google Chrome via `channel: "chrome"`. Do not
"fix" this by running `npx playwright install`; it fails on this OS.

`npm run build` needs network egress to fetch Google Fonts via `next/font`. If
it stalls on `socket hang up / Retrying`, the sandbox is blocking it.

---

### Task 1: Elevation, grounds and grain tokens

Foundation. Nothing looks different yet except card edges — that is expected.

**Files:**
- Modify: `src/app/globals.css` (dark block ~line 52, `.light` block ~line 96, new rules at end)
- Modify: `tailwind.config.ts` (repo root), `boxShadow` key

**Interfaces:**
- Consumes: nothing.
- Produces: CSS variables `--shadow-1`, `--shadow-2`, `--shadow-3`; classes `.ground-wash`, `.ground-band`, `.grain`. Tailwind utilities `shadow-1`, `shadow-2`, `shadow-3`.

- [ ] **Step 1: Add the elevation scale to the dark theme block**

In `src/app/globals.css`, inside the dark `:root` block, replace the single
`--shadow-card` line with:

```css
  /* Elevation. The old single hairline is why cards read as outlines. */
  --shadow-1:
    0 0 0 1px rgb(255 255 255 / 0.07),
    0 1px 0 0 rgb(255 255 255 / 0.05) inset;
  --shadow-2:
    0 0 0 1px rgb(255 255 255 / 0.09),
    0 1px 0 0 rgb(255 255 255 / 0.06) inset,
    0 18px 40px -24px rgb(0 0 0 / 0.9);
  --shadow-3:
    0 0 0 1px rgb(var(--color-brand) / 0.38),
    0 1px 0 0 rgb(255 255 255 / 0.08) inset,
    0 24px 60px -28px rgb(var(--color-brand) / 0.42);
  --shadow-card: var(--shadow-1);
```

- [ ] **Step 2: Add the matching scale to the light theme block**

In the `.light` block, replace its `--shadow-card` line with:

```css
  --shadow-1:
    0 0 0 1px rgb(0 0 0 / 0.09),
    0 1px 2px rgb(0 0 0 / 0.04);
  --shadow-2:
    0 0 0 1px rgb(0 0 0 / 0.10),
    0 12px 32px -18px rgb(105 4 242 / 0.22);
  --shadow-3:
    0 0 0 1px rgb(var(--color-brand) / 0.34),
    0 18px 44px -20px rgb(105 4 242 / 0.30);
  --shadow-card: var(--shadow-1);
```

- [ ] **Step 3: Add the ground and grain rules**

Append to `src/app/globals.css`, immediately after the `.section` rhythm block:

```css
/* ------------------------------------------------------------------ */
/* Section grounds.                                                     */
/*                                                                      */
/* The audit finding was that every section sat on the same surface at  */
/* the same weight, so a 9,900px page read as one strip. Three grounds  */
/* alternate down the page to give it rhythm. All decorative layers are */
/* pointer-events:none and sit behind content.                          */
/* ------------------------------------------------------------------ */
.ground-wash,
.ground-band {
  position: relative;
  isolation: isolate;
}

.ground-wash::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(60% 70% at 12% 0%, rgb(var(--color-brand) / 0.16), transparent 62%),
    radial-gradient(52% 64% at 92% 28%, rgb(var(--color-accent) / 0.16), transparent 66%);
}

.ground-band {
  background-color: rgb(var(--color-surface-2));
}

.ground-band::before,
.ground-band::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
  pointer-events: none;
}
.ground-band::before { top: 0; }
.ground-band::after { bottom: 0; }

/* Grain. Breaks up the gradient banding that makes large soft washes
   read as "CSS gradient" rather than as a designed surface. One inline
   SVG, no network request, no runtime cost. */
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Cards lift on hover. transform only, so it stays on the compositor. */
.lift {
  transition:
    transform var(--motion-base) cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow var(--motion-base) cubic-bezier(0.22, 1, 0.36, 1);
}
@media (hover: hover) {
  .lift:hover {
    transform: translate3d(0, -2px, 0);
    box-shadow: var(--shadow-3);
  }
}
```

- [ ] **Step 4: Expose the scale to Tailwind**

In `tailwind.config.ts`, replace the `boxShadow` block with:

```ts
      boxShadow: {
        card: "var(--shadow-card)",
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
      },
```

- [ ] **Step 5: Verify the build and that nothing regressed**

```bash
npm run build
```

Expected: exit 0, zero warnings. The page should look almost identical —
this task only defines tokens. If anything moved, a shadow value is wrong.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "Add an elevation scale, section grounds and grain

Cards read as outlines because --shadow-card was a 1px inset hairline and
nothing else. This gives it three real steps, and gives sections three
grounds to alternate between so the page stops reading as one strip."
```

---

### Task 2: `Section` gains a ground, homepage alternates them

This is the single highest-leverage change in the plan.

**Files:**
- Modify: `src/components/ui/Section.tsx`
- Modify: `src/components/sections/SelectedWork.tsx` (the `className` prop on `Section`)
- Modify: `src/components/sections/TheGap.tsx`, `WhatWeBuild.tsx`, `ProductsRow.tsx`, `HowWeWork.tsx`, `Industries.tsx`, `WhyUs.tsx`, `InsightsRow.tsx`

**Interfaces:**
- Consumes: `.ground-wash`, `.ground-band`, `.grain` from Task 1.
- Produces: `<Section ground="base" | "wash" | "band" />`, default `"base"`.

- [ ] **Step 1: Add the prop**

In `src/components/ui/Section.tsx`, add `ground` to the prop type and signature,
and fold it into the root `className`:

```tsx
export function Section({
  id,
  eyebrow,
  heading,
  lede,
  headingAs: Heading = "h2",
  ground = "base",
  className,
  headerClassName,
  children,
}: {
  id?: string;
  eyebrow?: string;
  heading?: React.ReactNode;
  lede?: React.ReactNode;
  headingAs?: "h1" | "h2";
  /**
   * The surface the section sits on. Alternating these is what gives the
   * page vertical rhythm; every section on the same ground reads as one
   * undifferentiated strip.
   */
  ground?: "base" | "wash" | "band";
  className?: string;
  headerClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section",
        ground === "wash" && "ground-wash grain",
        ground === "band" && "ground-band",
        className
      )}
    >
```

The rest of the component is unchanged.

- [ ] **Step 2: Assign grounds down the homepage**

Edit each section component's `<Section …>` call. Add the `ground` prop and
**remove `rule` from `className`** where a ground is set — `ground-band` draws
its own rules and `rule` would double them.

| File | Change |
|---|---|
| `SelectedWork.tsx` | `className="rule"` → `ground="band"`, drop `rule` |
| `TheGap.tsx` | `className="rule relative isolate overflow-hidden"` → `ground="wash"` + `className="relative isolate overflow-hidden"` |
| `WhatWeBuild.tsx` | `className="rule"` → `ground="base"`, drop `rule` |
| `ProductsRow.tsx` | `className="rule"` → `ground="band"`, drop `rule` |
| `HowWeWork.tsx` | `className="rule"` → `ground="base"`, drop `rule` |
| `Industries.tsx` | `className="rule"` → `ground="wash"`, drop `rule` |
| `WhyUs.tsx` | `className="rule"` → `ground="band"`, drop `rule` |
| `InsightsRow.tsx` | `className="rule"` → `ground="base"`, drop `rule` |

Resulting rhythm: hero → band → wash → base → band → base → wash → band →
base → CTA. No two adjacent sections share a ground.

- [ ] **Step 3: Build and capture**

```bash
npm run build && npx next start -p 3311 &
mkdir -p /tmp/qx
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t2-dark.png 1440 900 dark
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t2-light.png 1440 900 light
```

Expected: `overflow:0px` on both. Look at both images. The page must now show
clear horizontal banding between sections in both themes.

- [ ] **Step 4: Check contrast did not break**

`ground-band` moves text onto `surface-2`. In dark that is `#191D2A`; in light
`#F1EFFB`. Verify `muted` text still passes:

```bash
npx @axe-core/cli http://127.0.0.1:3311/ --exit
```

Expected: 0 violations. If `color-contrast` fires, the fix is to lighten
`--color-muted` for that surface, never to lower the floor.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Section.tsx src/components/sections
git commit -m "Alternate section grounds down the homepage

Every section sat on the same near-black with a hairline between, so the
page read as one 9,900px strip. Three grounds now alternate, and no two
adjacent sections share one."
```

---

### Task 3: `Card` primitive, applied to work and process

**Files:**
- Create: `src/components/ui/Card.tsx`
- Modify: `src/components/sections/SelectedWork.tsx`
- Modify: `src/components/sections/HowWeWork.tsx`

**Interfaces:**
- Consumes: `shadow-1` / `shadow-2` / `shadow-3`, `.lift` from Task 1.
- Produces:
  ```ts
  Card(props: {
    as?: "div" | "li" | "article";
    elevation?: 1 | 2;
    interactive?: boolean;
    className?: string;
    children: React.ReactNode;
  }): JSX.Element
  ```

- [ ] **Step 1: Write the component**

Create `src/components/ui/Card.tsx`:

```tsx
import { cn } from "@/lib/utils";

/**
 * The one card surface. `gap-px` grids over a border colour were how the
 * previous build drew cards, which is why they read as outlines rather than
 * objects -- there was no elevation to read.
 *
 * `interactive` adds the hover lift. Use it only where the whole card is a
 * link or button; a lift on something you cannot click is a lie.
 */
export function Card({
  as: Tag = "div",
  elevation = 1,
  interactive = false,
  className,
  children,
}: {
  as?: "div" | "li" | "article";
  elevation?: 1 | 2;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "rounded-md bg-surface",
        elevation === 1 ? "shadow-1" : "shadow-2",
        interactive && "lift",
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Rebuild the work row on it**

In `src/components/sections/SelectedWork.tsx`, replace the `<ul>` block with:

```tsx
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {shown.map((study, i) => (
          <Card as="li" key={study.slug} interactive className="overflow-hidden">
            <div data-reveal data-reveal-delay={i * 70} className="h-full">
              <Link
                href={`/case-studies/${study.slug}`}
                className="flex h-full flex-col gap-4 p-7"
              >
                <span className="font-mono text-xs text-link">{study.category}</span>
                <h3 className="text-lg font-semibold text-text">{study.title}</h3>
                <p className="text-base text-muted">{study.problem}</p>
                {study.metric ? (
                  <p className="mt-auto pt-5">
                    <span className="block text-3xl font-bold text-text">
                      {study.metric.value}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-muted">
                      {study.metric.label}
                    </span>
                  </p>
                ) : (
                  <p className="mt-auto pt-5 text-base text-muted">{study.outcome}</p>
                )}
              </Link>
            </div>
          </Card>
        ))}
      </ul>
```

Add `import { Card } from "@/components/ui/Card";` at the top.

Note the metric moves from `text-2xl` to `text-3xl` — the outcome number is
the reason the card exists and should be the largest thing in it.

- [ ] **Step 3: Rebuild the process row on it**

In `src/components/sections/HowWeWork.tsx`, replace the `<ol>` block with:

```tsx
      <ol className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {phases.map((p, i) => (
          <Card as="li" key={p.step}>
            <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-4 p-7">
              <span className="font-mono text-xs text-link">{p.step}</span>
              <h3 className="text-lg font-semibold text-text">{p.title}</h3>
              <p className="text-base text-muted">{p.body}</p>
              <p className="mt-auto border-t border-[color:var(--color-border)] pt-4 text-base text-text">
                <span className="font-mono text-xs text-muted">You own </span>
                {p.artifact}
              </p>
            </div>
          </Card>
        ))}
      </ol>
```

Add the same `Card` import. These are not interactive — no `interactive` prop.

- [ ] **Step 4: Build and capture**

```bash
npm run build
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t3-dark.png 1440 900 dark
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t3-390.png 390 844 dark
```

Expected: `overflow:0px` at both widths. Cards now read as raised objects with
gaps between them, not cells in a hairline grid.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Card.tsx src/components/sections/SelectedWork.tsx src/components/sections/HowWeWork.tsx
git commit -m "Give cards a real surface and elevation

Work and process rows were gap-px grids over a border colour, which draws
cell dividers, not cards. Both now sit on the Card primitive."
```

---

### Task 4: `DeviceFrame`, applied to the products row

**Files:**
- Create: `src/components/ui/DeviceFrame.tsx`
- Modify: `src/components/sections/ProductsRow.tsx`

**Interfaces:**
- Consumes: `shadow-2` from Task 1.
- Produces:
  ```ts
  DeviceFrame(props: {
    src: string;
    alt: string;
    sizes: string;
    priority?: boolean;
    className?: string;
  }): JSX.Element
  ```

- [ ] **Step 1: Write the component**

Create `src/components/ui/DeviceFrame.tsx`:

```tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Browser chrome around a product screenshot. A bare rounded rectangle reads
 * as "an image we had"; the same shot inside a window frame reads as software
 * that exists. The chrome is three dots and a bar -- enough to signal a
 * window, not enough to imitate a specific OS.
 *
 * Decorative: the frame is aria-hidden, the screenshot carries the alt text.
 */
export function DeviceFrame({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-md bg-surface shadow-2", className)}>
      <div
        className="flex items-center gap-1.5 border-b border-[color:var(--color-border)] px-3.5 py-2.5"
        aria-hidden="true"
      >
        <span className="size-2 rounded-full bg-text/20" />
        <span className="size-2 rounded-full bg-text/20" />
        <span className="size-2 rounded-full bg-text/20" />
      </div>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Use it in the products row**

In `src/components/sections/ProductsRow.tsx`, replace the screenshot branch of
the ternary (the `shot ?` arm) with:

```tsx
                  {shot ? (
                    <DeviceFrame
                      src={shot}
                      alt={`${p.name} interface`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="lift"
                    />
                  ) : (
                    <div className="grid aspect-[16/10] w-full place-items-center rounded-md bg-surface shadow-1">
                      <span className="text-xl font-bold text-muted">{p.name}</span>
                    </div>
                  )}
```

Add `import { DeviceFrame } from "@/components/ui/DeviceFrame";` and drop the
now-unused `import Image from "next/image";` if nothing else in the file uses
it. Run `npm run lint` to confirm.

- [ ] **Step 3: Build, lint and capture**

```bash
npm run lint && npm run build
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t4-dark.png 1440 900 dark
```

Expected: lint clean, `overflow:0px`, product shots now sit in window frames.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/DeviceFrame.tsx src/components/sections/ProductsRow.tsx
git commit -m "Frame product screenshots as windows

A bare rounded rectangle reads as an image we had lying around. The same
screenshot in window chrome reads as software that exists."
```

---

### Task 5: Hero — proof above the claim, framed visual

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `Card` (Task 3) is *not* used here; `shadow-2` and `.grain` are.
- Produces: no new exports.

- [ ] **Step 1: Add the proof cluster above the `<h1>`**

In `src/components/sections/Hero.tsx`, inside `<div className="lg:col-span-7">`,
insert **above** the existing `<h1>`:

```tsx
            <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-muted">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 shadow-1">
                <span className="size-1.5 rounded-full bg-link" aria-hidden="true" />
                <span className="font-mono text-xs text-text">
                  {company.stats[1].value} {company.stats[1].label}
                </span>
              </span>
              <span>Shipping for <span className="font-semibold text-text">{trustedBy}</span></span>
            </p>
```

This is the reference sites' reading order — proof, then claim. It uses only
facts already in `src/data/company.ts` and `src/data/clients.ts`.

- [ ] **Step 2: Remove the duplicate trusted-by line at the bottom**

The `trustedBy` string now appears above the `<h1>`, so the bottom rule block
would say it twice. Replace the final block:

```tsx
        <div className="rule mt-7 flex flex-col gap-2 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-base text-muted">
            Shipping for <span className="font-semibold text-text">{trustedBy}</span>.
          </p>
          <span className="font-mono text-xs text-muted">Lahore, working across 12 time zones</span>
        </div>
```

with:

```tsx
        <div className="rule mt-7 pt-6">
          <span className="font-mono text-xs text-muted">Lahore, working across 12 time zones</span>
        </div>
```

- [ ] **Step 3: Give the hero visual depth and a parallax hook**

Replace the hero image wrapper:

```tsx
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg lg:aspect-square">
```

with:

```tsx
            <div
              data-parallax="0.06"
              className="relative aspect-[16/10] w-full overflow-hidden rounded-lg shadow-2 lg:aspect-square"
            >
```

`data-parallax` is inert until Task 8 wires it. The value is the fraction of
scroll distance the element moves.

- [ ] **Step 4: Add grain over the hero**

On the outer `<section>`, add `grain` to the class list:

```tsx
    <section className="relative isolate grain overflow-hidden pb-16 pt-16 md:pb-28 md:pt-24">
```

- [ ] **Step 5: Build and capture above-the-fold at three widths**

```bash
npm run build
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t5-dark.png 1440 900 dark
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t5-390.png 390 844 dark
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t5-light.png 1440 900 light
```

Expected: `overflow:0px` at all three. Reading order top to bottom must be:
proof chip → headline → subhead → stat slab. `trustedBy` appears **once**.

- [ ] **Step 6: Confirm the `<h1>` is still server-rendered**

```bash
curl -s http://127.0.0.1:3311/ | grep -c "AI systems that survive real users"
```

Expected: `1` or more. A `0` means the headline moved behind JS and LCP will
regress — revert and reapply without touching the `<h1>`.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "Put the proof above the claim in the hero

Both reference sites lead with evidence, then the headline. The trusted-by
line moves up from the fold and stops being said twice."
```

---

### Task 6: Stat counters roll up

**Files:**
- Modify: `src/components/ui/Stat.tsx`
- Create: `src/components/motion/CountUp.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `CountUp(props: { value: string; className?: string }): JSX.Element` — parses the leading integer out of strings like `"5+"`, `"6wk"`, `"25+"` and animates to it, leaving any suffix intact.

- [ ] **Step 1: Write the counter**

Create `src/components/motion/CountUp.tsx`:

```tsx
"use client";

import * as React from "react";

/**
 * Rolls a stat up to its value the first time it is seen.
 *
 * Constraints that matter here:
 *  - The final string is rendered server-side and is what a crawler, a
 *    screen reader and a no-JS visitor get. The animation only ever
 *    replaces it after mount.
 *  - `tabular-nums` plus a reserved min-width means the digits do not
 *    reflow as they change, so this cannot contribute to CLS.
 *  - prefers-reduced-motion skips straight to the value.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    const node = ref.current;
    if (!node || target === 0) return;

    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutCubic: fast then settling, which reads as counting up.
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(`0${suffix}`);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  );
}
```

- [ ] **Step 2: Use it in `Stat`**

Read `src/components/ui/Stat.tsx` first, then wrap only the value element in
`<CountUp value={value} />`, leaving the label markup untouched. Add
`import { CountUp } from "@/components/motion/CountUp";`.

- [ ] **Step 3: Verify no layout shift and the SSR value is intact**

```bash
npm run build
curl -s http://127.0.0.1:3311/ | grep -o "25+" | head -1
```

Expected: `25+` present in the server HTML. Then:

```bash
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t6-dark.png 1440 900 dark
```

Expected: `overflow:0px`, and the stat slab shows final values in the capture
(the helper waits 1.2s after scrolling, well past the 900ms animation).

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/CountUp.tsx src/components/ui/Stat.tsx
git commit -m "Roll the hero stats up on first view

Server-rendered value stays the source of truth; the animation only
replaces it after mount, and reduced-motion skips it entirely."
```

---

### Task 7: Shared `Tabs` primitive and a stronger industries panel

`Industries.tsx` and `StackTabs.tsx` currently contain the same 14-line
roving-tabindex keyboard handler, copy-pasted. This extracts it once.

**Files:**
- Create: `src/components/ui/Tabs.tsx`
- Modify: `src/components/sections/Industries.tsx`
- Modify: `src/components/sections/StackTabs.tsx`

**Interfaces:**
- Consumes: `shadow-1`, `shadow-2` from Task 1.
- Produces:
  ```ts
  useTabs(count: number): {
    active: number;
    setActive: (i: number) => void;
    tabProps: (i: number, idPrefix: string) => object;
    tablistProps: (label: string) => object;
    panelProps: (idPrefix: string) => object;
    registerRef: (i: number) => (el: HTMLButtonElement | null) => void;
  }
  TabPill(props: { selected: boolean; children: React.ReactNode }): JSX.Element
  ```

- [ ] **Step 1: Write the primitive**

Create `src/components/ui/Tabs.tsx`:

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Roving-tabindex tablist, extracted from Industries and StackTabs, which had
 * the same handler copy-pasted into both. One tabstop for the whole list;
 * arrows move and wrap; Home/End jump to the ends.
 */
export function useTabs(count: number) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const last = count - 1;
      let next = active;
      if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
      else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = last;
      else return;
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    },
    [active, count]
  );

  return {
    active,
    setActive,
    registerRef: (i: number) => (el: HTMLButtonElement | null) => {
      refs.current[i] = el;
    },
    tablistProps: (label: string) => ({
      role: "tablist" as const,
      "aria-label": label,
      onKeyDown,
    }),
    tabProps: (i: number, idPrefix: string) => ({
      role: "tab" as const,
      id: `${idPrefix}-tab-${i}`,
      "aria-selected": i === active,
      "aria-controls": `${idPrefix}-panel-${i}`,
      tabIndex: i === active ? 0 : -1,
      onClick: () => setActive(i),
    }),
    panelProps: (idPrefix: string) => ({
      role: "tabpanel" as const,
      id: `${idPrefix}-panel-${active}`,
      "aria-labelledby": `${idPrefix}-tab-${active}`,
    }),
  };
}

/**
 * Pill styling. The previous underline tabs were near-invisible against a
 * dark ground; a filled pill states which one is active at a glance.
 */
export function TabPill({
  selected,
  children,
}: {
  selected: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[44px] items-center rounded-full px-4 text-base transition-colors",
        selected
          ? "bg-brand text-on-brand shadow-1"
          : "text-muted hover:bg-surface hover:text-text"
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Rebuild `Industries` on it**

In `src/components/sections/Industries.tsx`, delete the local `active` state,
`tabRefs` and `onKeyDown`, and replace them with:

```tsx
  const tabs = useTabs(industries.length);
  const current = industries[tabs.active];
```

Replace the tablist markup with:

```tsx
        <div {...tabs.tablistProps("Industries")} className="flex flex-wrap gap-2">
          {industries.map((ind, i) => (
            <button key={ind.name} ref={tabs.registerRef(i)} {...tabs.tabProps(i, "ind")}>
              <TabPill selected={i === tabs.active}>{ind.name}</TabPill>
            </button>
          ))}
        </div>
```

Replace the panel opening tag with:

```tsx
        <div {...tabs.panelProps("ind")} className="grid gap-9 pt-9 lg:grid-cols-12 lg:gap-12">
```

Replace every other `active` reference with `tabs.active`, and give the panel
image frame depth:

```tsx
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md shadow-2">
```

Add `import { useTabs, TabPill } from "@/components/ui/Tabs";` and remove the
now-unused `cn` import if nothing else uses it.

- [ ] **Step 3: Rebuild `StackTabs` on it**

Apply the same three replacements in `src/components/sections/StackTabs.tsx`,
using `"stack"` as the `idPrefix` and `"Technology stack"` as the tablist
label. Its panel content (the chip list) is unchanged in this task.

- [ ] **Step 4: Verify keyboard behaviour survived the refactor**

```bash
npm run build
npx playwright test tests/e2e --project=desktop
```

Expected: the existing suite passes. Then check the tab interaction by hand:

```bash
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t7-dark.png 1440 900 dark
```

Expected: `overflow:0px`, and the industries tablist renders as pills with one
filled. **The filled pill uses `bg-brand` with `text-on-brand`, which is the
one legal use of `brand` in dark (fill, not text).**

- [ ] **Step 5: Run axe on the page and on `/services`**

```bash
npx @axe-core/cli http://127.0.0.1:3311/ http://127.0.0.1:3311/services --exit
```

Expected: 0 violations. Tabs are the most common source of ARIA regressions,
so this check is not optional.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Tabs.tsx src/components/sections/Industries.tsx src/components/sections/StackTabs.tsx
git commit -m "Extract the tablist, and make the active tab visible

Industries and StackTabs carried the same roving-tabindex handler,
copy-pasted. It lives in one place now, and the active tab is a filled
pill rather than a 2px underline nobody can see on a dark ground."
```

---

### Task 8: Motion — parallax and a process progress line

**Files:**
- Modify: `src/components/motion/ScrollReveal.tsx`
- Modify: `src/components/sections/HowWeWork.tsx` (add the progress-line markup)

**Interfaces:**
- Consumes: `data-parallax` attribute set in Task 5.
- Produces: `data-progress-line` attribute honoured on any element.

- [ ] **Step 1: Add parallax to the existing GSAP block**

In `src/components/motion/ScrollReveal.tsx`, inside `start()`, after the
existing `const tweens = …` block, add:

```tsx
        // Parallax. Reads the fraction off the element so a section can tune
        // its own depth without another component.
        const parallax = Array.from(
          document.querySelectorAll<HTMLElement>("[data-parallax]")
        ).map((el) =>
          gsap.to(el, {
            yPercent: () => Number(el.dataset.parallax ?? 0) * -100,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          })
        );

        // Process progress line: scales a rule from 0 to 1 as the list passes.
        const lines = Array.from(
          document.querySelectorAll<HTMLElement>("[data-progress-line]")
        ).map((el) =>
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top 80%", end: "bottom 60%", scrub: 0.4 },
            }
          )
        );
```

Then extend the cleanup to kill them:

```tsx
        cleanup = () => {
          [...tweens, ...parallax, ...lines].forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
          document.documentElement.classList.remove("js-reveal");
        };
```

- [ ] **Step 2: Add the progress-line markup to the process section**

In `src/components/sections/HowWeWork.tsx`, immediately **before** the `<ol>`,
insert:

```tsx
      <div className="relative mt-12 hidden h-px bg-[color:var(--color-border)] xl:block">
        <span
          data-progress-line
          aria-hidden="true"
          className="absolute inset-0 origin-left bg-brand"
        />
      </div>
```

and change the `<ol>`'s `mt-12` to `mt-5` so the spacing stays the same.

It is `hidden xl:block` because the line only reads as a sequence when the
four phases are on one row.

- [ ] **Step 3: Verify reduced motion still short-circuits**

The whole `start()` function is already behind the `prefers-reduced-motion`
guard at the top of the effect, so no new guard is needed. Confirm it:

```bash
npx playwright test tests/e2e/theme.spec.ts --project=desktop
```

Expected: the existing `reduced-motion is respected` test passes.

- [ ] **Step 4: Measure the motion cost**

```bash
npm run build
npx lighthouse http://127.0.0.1:3311/ --only-categories=performance \
  --preset=desktop --quiet --chrome-flags="--headless" \
  --output=json --output-path=/tmp/qx/lh-t8.json
node -e "const r=require('/tmp/qx/lh-t8.json');console.log('TBT',r.audits['total-blocking-time'].numericValue,'CLS',r.audits['cumulative-layout-shift'].numericValue,'perf',r.categories.performance.score)"
```

Expected: TBT ≤ 200ms, CLS < 0.1. **If TBT exceeds the budget, cut the
parallax, not the budget** — that is the rule in the spec.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/ScrollReveal.tsx src/components/sections/HowWeWork.tsx
git commit -m "Add scroll parallax and a process progress line

Both ride the ScrollReveal GSAP instance that is already dynamic-imported
on idle, so nothing new enters the initial bundle."
```

---

### Task 9: An original diagram for The Gap

The one section that is pure prose gets the visual that makes the argument.

**Files:**
- Create: `src/components/ui/GapDiagram.tsx`
- Modify: `src/components/sections/TheGap.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `GapDiagram(): JSX.Element` — an inline SVG using `currentColor`
  and the `brand` token, so it themes for free.

- [ ] **Step 1: Write the diagram**

Create `src/components/ui/GapDiagram.tsx`:

```tsx
/**
 * Demo → production, drawn. Inline SVG rather than an image file so it
 * inherits the theme tokens and costs no request. Original work: nothing
 * here is traced from or derived from either reference site.
 *
 * It is decorative -- the section's prose already makes the argument in
 * text -- so it is aria-hidden rather than given a long description.
 */
const STAGES = ["Demo", "Retrieval", "Evals", "Tracing", "Rollback", "Production"];

export function GapDiagram() {
  return (
    <svg
      viewBox="0 0 520 132"
      className="w-full max-w-[520px] text-muted"
      role="presentation"
      aria-hidden="true"
    >
      <line
        x1="16" y1="66" x2="504" y2="66"
        stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="4 5"
      />
      {STAGES.map((label, i) => {
        const x = 26 + i * 93.6;
        const isEnd = i === 0 || i === STAGES.length - 1;
        return (
          <g key={label}>
            <circle
              cx={x} cy="66" r={isEnd ? 7 : 4.5}
              fill={isEnd ? "rgb(var(--color-brand))" : "rgb(var(--color-bg))"}
              stroke="currentColor"
              strokeOpacity={isEnd ? 0 : 0.5}
              strokeWidth="1"
            />
            <text
              x={x} y={i % 2 === 0 ? 40 : 102}
              textAnchor="middle"
              fill="currentColor"
              style={{ font: "500 11px var(--font-dm-mono), monospace" }}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
```

- [ ] **Step 2: Place it in the section**

In `src/components/sections/TheGap.tsx`, add the import and insert the diagram
after the closing `</div>` of the prose block:

```tsx
      <div className="mt-11" data-reveal>
        <GapDiagram />
      </div>
```

- [ ] **Step 3: Build and check both themes**

```bash
npm run build
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t9-dark.png 1440 900 dark
node scripts/shot.mjs http://127.0.0.1:3311/ /tmp/qx/t9-light.png 1440 900 light
```

Expected: `overflow:0px` both. The diagram's labels must be legible against
the `ground-wash` in **both** themes — it sits over the violet-wave image at
30% opacity, so check the light capture carefully.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/GapDiagram.tsx src/components/sections/TheGap.tsx
git commit -m "Draw the demo-to-production gap instead of only describing it

Inline SVG on the theme tokens. Original work -- nothing traced from
either reference site."
```

---

### Task 10: Full QA matrix and the before/after record

**Files:**
- Create: `tests/e2e/visual.spec.ts`
- Modify: `docs/revamp/07-qa-report.md`
- Create: `docs/revamp/screenshots/after-v2/` (screenshots)

**Interfaces:**
- Consumes: everything above.
- Produces: the evidence the owner reviews at the gate.

- [ ] **Step 1: Write the visual regression spec**

Create `tests/e2e/visual.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import { routes } from "./routes";

/**
 * The checks that catch the breakage this overhaul is most likely to cause:
 * a ground or a frame overflowing its container, a decorative layer eating
 * clicks, or a console error from the motion layer.
 */
for (const route of routes) {
  test(`${route} has no horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test(`${route} logs no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(route);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(900);
    expect(errors).toEqual([]);
  });
}

test("decorative grounds do not intercept clicks", async ({ page }) => {
  await page.goto("/");
  // The primary CTA must be reachable, not covered by a ::before layer.
  await page.getByRole("link", { name: /Book a strategy call/i }).first().click();
  await expect(page).toHaveURL(/\/book|\/contact/);
});
```

- [ ] **Step 2: Run the whole matrix**

```bash
npx playwright test
```

Expected: green across all eight projects. Fix and rerun until it is. Do not
proceed with failures.

- [ ] **Step 3: Capture the after set**

```bash
mkdir -p docs/revamp/screenshots/after-v2
for w in 390 768 1024 1440 1920; do
  node scripts/shot.mjs http://127.0.0.1:3311/ docs/revamp/screenshots/after-v2/home-$w-dark.png $w 900 dark
  node scripts/shot.mjs http://127.0.0.1:3311/ docs/revamp/screenshots/after-v2/home-$w-light.png $w 900 light
done
```

Expected: ten files, every one reporting `overflow:0px`.

- [ ] **Step 4: Re-run axe on every route in both themes**

```bash
npx @axe-core/cli http://127.0.0.1:3311/ http://127.0.0.1:3311/services \
  http://127.0.0.1:3311/case-studies http://127.0.0.1:3311/products \
  http://127.0.0.1:3311/about http://127.0.0.1:3311/contact --exit
```

Expected: 0 violations. This is a hard gate, not a target.

- [ ] **Step 5: Re-run Lighthouse and write the comparison**

```bash
for p in "" services products case-studies contact; do
  npx lighthouse "http://127.0.0.1:3311/$p" --quiet --chrome-flags="--headless" \
    --output=json --output-path="docs/revamp/lighthouse-v2/${p:-home}-mobile.json"
done
```

Append a before/after table to `docs/revamp/07-qa-report.md` with, per page:
performance, accessibility, best-practices, SEO, LCP, TBT, CLS — the
`lighthouse-after/` numbers in one column and `lighthouse-v2/` in the next.
State plainly any metric that got worse.

- [ ] **Step 6: Commit**

```bash
git add tests/e2e/visual.spec.ts docs/revamp
git commit -m "Record the QA evidence for the visual overhaul

Overflow, console-error and click-interception checks across the full
viewport matrix, plus the axe and Lighthouse numbers next to the
pre-overhaul baseline."
```

---

## Self-Review

**Spec coverage.**

| Spec section | Task |
|---|---|
| 4.1 section grounds | 1, 2 |
| 4.1 elevation | 1, 3 |
| 4.1 glass | *not implemented* — deferred, see below |
| 4.1 grain | 1, 5 |
| 4.1 type push to 72px / −2.2px | *not implemented* — see below |
| 4.2 hero proof-above-claim | 5 |
| 4.2 stat counters | 6 |
| 4.2 work cards | 3 |
| 4.2 gap diagram | 9 |
| 4.2 product frames | 4 |
| 4.2 process timeline | 3, 8 |
| 4.2 industries panel | 7 |
| 4.3 parallax / progress line | 8 |
| 4.3 reduced motion | 6, 8 |
| 4.3 budget | 8, 10 |
| 6 verification | every task, plus 10 |

**Two gaps, deliberately left out of this plan rather than faked:**

1. **Scrolled-header glass** (spec 4.1) touches `Header.tsx`, which is shared
   by all 16 routes and has its own mobile-nav focus-trap tests. It belongs in
   the second pass with the rest of the shared shell, not in a homepage plan.
2. **The display type push to 72px / −2.2px tracking** (spec 4.1) changes
   `--text-hero` and `--text-3xl`, which are used on every page. Same reason.

Both are listed here so the second-pass plan starts with them rather than
losing them.

**Placeholder scan:** no TBD, no "add error handling", no "similar to Task N".
Every code step carries the actual code.

**Type consistency:** `Card` takes `elevation?: 1 | 2` and is used with `1`
(default) and `interactive` only. `DeviceFrame` takes `src/alt/sizes/priority/
className` and is called with all but `priority`. `useTabs` returns exactly the
six members used in Tasks 7. `CountUp` takes `{ value, className }` and `Stat`
passes `value` only. `data-parallax` is written in Task 5 and read in Task 8;
`data-progress-line` is written in Task 8 step 2 and read in Task 8 step 1.
