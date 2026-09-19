# 08 — Handover

Everything here assumes you are on `revamp/v2`.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npx next start -p 3311
npm run typecheck
npm run lint
```

`next start` needs a completed `next build` in `.next`. If assets start returning 400, a **stale server process is holding the port** — kill it and restart:

```bash
for pid in $(ss -ltnp | grep 3311 | grep -oP 'pid=\K[0-9]+' | sort -u); do kill -9 "$pid"; done
```

## Edit the copy

All text lives in `src/data/*.ts`. Nothing in `src/components` needs touching to change wording.

| Change | File |
|---|---|
| Headline stats, mission, the four phases, the three pillars | `src/data/company.ts` |
| Nav labels, the primary CTA, footer groups | `src/data/navigation.ts` |
| Capabilities (14) — `featured: true` puts one on the homepage | `src/data/services.ts` |
| Case studies (6), including the `metric` slot | `src/data/caseStudies.ts` |
| Products (9) | `src/data/products.ts` |
| Industry tabs — `cases: []` means no engagement, and the tab says so | `src/data/industries.ts` |
| FAQ (12) | `src/data/faqs.ts` |
| Articles | `src/data/blogs.ts` |
| Client names | `src/data/clients.ts` |
| Tech stack tabs | `src/data/techStack.ts` |

### Add a case-study number

```ts
{
  slug: "voice-recruitment-automation",
  metric: { value: "62%", label: "of first-round screening handled without a recruiter" },
  ...
}
```

Leave `metric` out and the card falls back to the prose outcome. **Never invent a figure** — the empty slot is the honest state.

### Add a case study, product or capability

Append to the array. The detail page, the sitemap entry and the JSON-LD are generated from it. Slugs are URLs, so do not rename one without adding a redirect in `next.config.mjs`.

## The design system

`/DESIGN.md` is the contract. `src/app/globals.css` holds the tokens, `tailwind.config.ts` maps them.

Three rules that are easy to break:

1. **No raw hex in components.** Use `bg-surface`, `text-muted`, `text-link`.
2. **`brand` is for fills, `link` is for text.** Verdigris as text measures 4.49:1 on the surface token — below AA. `--color-link` is the brighter step that passes everywhere.
3. **No infinite animations, and no alpha on text.** `text-ink/55`-style transparency is what put 41 contrast failures on the old site; `opacity-80` on the slab labels did it again during this build and had to be reverted.

## Tests

```bash
npx playwright test                                   # full matrix
npx playwright test --project=desktop                 # one viewport
BASE_URL=https://your-preview.vercel.app npx playwright test   # against a deploy
```

`tests/e2e/` checks one `<h1>` per route, no horizontal overflow, no broken images, no console errors, structured data present, the mobile menu's focus behaviour, CTA consistency, theme persistence and reduced motion.

WebKit is configured but cannot run on this machine until `sudo npx playwright install-deps webkit` is run.

## Accessibility and performance checks

```bash
export CHROME_PATH=$HOME/.cache/ms-playwright/chromium-1243/chrome-linux/chrome
npx lighthouse http://127.0.0.1:3311/ --preset=desktop --quiet --view
```

**Ignore Speed Index on this machine.** An empty HTML page scores 39.6 s here; the metric does not work under software rendering and it caps the performance score near 90. Use the Vercel preview for real numbers.

## Deploy

Push `revamp/v2`, let Vercel build the preview, then run the suite and Lighthouse against the preview URL before merging.

**Set `NEXT_PUBLIC_SITE_URL=https://www.qentrix-ai.com` in the Vercel project.** The apex host 308-redirects to `www`, so anything else makes every canonical point at a redirect.

Docker still works; `next.config.mjs` only emits a standalone server when `NEXT_OUTPUT=standalone`, which the Dockerfile sets.

## What was deliberately left

- `src/_legacy/` — the previous page and card sources, git-ignored and excluded from typecheck. Delete after the preview is approved.
- Three unused team photos in `/public/team/`, including a 2.0 MB PNG. Awaiting your word to remove.
- The six original SVG diagrams specified in `06-images.md`.
