# 00 — Repo map (Phase 0 reconnaissance)

Date: 2026-09-19 · Branch at audit time: `main` @ `0fffadd` (clean tree)
Live site: https://www.qentrix-ai.com (HTTP 200, `server: Vercel`, edge `bom1`)

## 1. Stack

| Thing | Value |
|---|---|
| Framework | Next.js `^15.1.0`, **App Router** (`src/app/`) |
| React | `^19.0.0` |
| Language | TypeScript `^5.6.3`, `strict: true`, alias `@/* -> ./src/*` |
| Styling | **Tailwind CSS v3.4.15** (not v4) + `postcss`/`autoprefixer`; tokens as CSS vars in `src/app/globals.css`, mapped to semantic Tailwind colors in `tailwind.config.ts` |
| Component library | Custom, hand-rolled (`src/components/ui/*`). No shadcn, no Radix. |
| Animation | `framer-motion` ^11, `gsap` ^3.15, `lenis` ^1.3 (smooth scroll), custom `MagneticCursor` |
| Icons | `lucide-react` ^0.460 |
| Fonts | `next/font/google`: **Inter** (body, `--font-inter`) + **Space Grotesk** (display, `--font-grotesk`) — both explicitly banned by CLAUDE.md §1.8 |
| Images | `next/image`; `formats: [avif, webp]`; `remotePatterns: hostname "**"` (wide open) |
| Content source | **Typed TS data files in `src/data/*.ts`** — no CMS, no MDX |
| Mail | `nodemailer` + provider switch (`resend` \| `smtp` \| `sendgrid`) in `src/lib/mail.ts` |
| Analytics | Plausible + GA4 wired in `layout.tsx`, **both disabled** (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and `NEXT_PUBLIC_GA_ID` empty in `.env`/`.env.local`) |
| Hosting | **Vercel** (confirmed via response headers). Repo also carries Docker (`Dockerfile`, `docker-compose.yml`, `output: "standalone"`) and `deploy/nginx.example.conf` from a self-host path that is no longer used. |
| Git remote | `https://github.com/Saad096/perceptronai-web.git` (still the pre-rename repo name) |

## 2. Routes (all in `src/app`)

| Route | File | Type | Notes |
|---|---|---|---|
| `/` | `page.tsx` | static | 17 sections (see §4) |
| `/services` | `services/page.tsx` | static | |
| `/products` | `products/page.tsx` | static | |
| `/case-studies` | `case-studies/page.tsx` | static | no `[slug]` detail pages |
| `/about` | `about/page.tsx` | static | |
| `/team` | `team/page.tsx` | static | **missing from `sitemap.ts`** |
| `/blogs` | `blogs/page.tsx` | static | |
| `/blogs/[slug]` | `blogs/[slug]/page.tsx` | dynamic | 11 posts, newest `2026-07-15` |
| `/careers` | `careers/page.tsx` | static | |
| `/contact` | `contact/page.tsx` | static | |
| `/book` | `book/page.tsx` | static | in-house booking calendar |
| `/privacy`, `/terms` | | static | |
| `/not-found` | `not-found.tsx` | | custom 404 |
| `/api/contact`, `/api/booking`, `/api/resume` | route handlers | | |
| `/sitemap.xml`, `/robots.txt` | `sitemap.ts`, `robots.ts` | | |

No `/work`, no `/insights`, no `/services/[slug]`, no `/products/[slug]` (products open in a client-side modal), no `/case-studies/[slug]`.

## 3. Data files (`src/data/`)

`blogs.ts` (11 posts) · `caseStudies.ts` (6, five NDA/anonymised) · `clients.ts` (3: TriggerX, Grow9X, TechForge — logos served out of `/public/products/`) · `company.ts` (mission, 4 stats, 6 whyUs, 6 process steps) · `faqs.ts` · `industries.ts` · `navigation.ts` (5 primary items + 3 footer groups) · `products.ts` (9 products) · `services.ts` · `socials.ts` · `team.ts` (4 members, real names + photos) · `techStack.ts` · `testimonials.ts` (**3, marked in-code as "Sample / placeholder testimonials drafted in-house"**).

## 4. Homepage section order (`src/app/page.tsx`)

Hero → Capabilities (ticker) → Clients (marquee) → Stats → AboutPreview → ServicesOverview(6) → ProductsShowcase(6) → Industries → Problem → WhyUs → Process → CaseStudiesPreview → TechStack → BlogPreview → Testimonials → FAQ → CTABanner. **17 sections.**

`TeamPreview.tsx` exists but is not used on the homepage — there are no faces on `/`.

## 5. Client vs server components

13 files carry `"use client"`: `BookingCalendar`, `ProductCard`, `ProductModal`, `ContactForm`, `Header`, `FAQ`, `Hero`, `ProductsShowcase`, `CountUp`, `MagneticCursor`, `Reveal`, `ThemeToggle`, `LenisProvider`.
`LenisProvider` + `MagneticCursor` wrap the entire tree in `layout.tsx`, so every page ships the smooth-scroll and cursor JS.

## 6. Design tokens (current — the "2026-07 revamp")

`globals.css` (419 lines) opens with a long R&D comment documenting two prior passes:
- **Part 1:** iris violet-indigo `#5B50E5` light / `#8B84F5` dark; warm-linen light base `#F7F6F3`; near-black dark `#0B0A10`.
- **Part 2:** sharpened to **electric iris `#7C6AFA`** on **deep violet-black `#0D0B14`**.
- Dual theme (`darkMode: "class"`, `dark` default on `<html>`, `localStorage` key `qx-theme`, no-flash bootstrap script).
- `tailwind.config.ts` exposes semantic tokens (`base`, `surface`, `surface.2`, `ink`, `muted`, `accent`) plus a static `brand.50–900` iris ramp for gradients/glows.

**This is exactly the palette CLAUDE.md §6.1 bans** (aubergine `#0D0B14`, indigo/violet primary) and the fonts §1.8 bans (Inter, Space Grotesk). See the open question in the GATE 1 note.

## 7. Imagery inventory (`/public`, 32 files)

- `products/` — 21 real product screenshots (Minutely ×4, NeuroMesh ×2, SalesPire ×3, ALA ×4, voicebot ×2, Fintelia ×3, plus grow9x/triggerx/techforge logo marks)
- `team/` — 4 real member photos
- `logo/` — `qentrixai-logo.png`, `qentrix-mark.png`
- `images/` — 2 Unsplash textures (NASA night-earth, Sean Pollock architecture), licences recorded in the `globals.css` header
- `resume/` — 3 Fintelia PDFs
- **No `og.png`** — `src/lib/seo.ts` points every page's OG/Twitter image at `/og.png`, which **404s in production**.

## 8. Env and integrations

`NEXT_PUBLIC_SITE_URL=https://qentrixai.com` in local `.env`/`.env.local`, but production serves canonical `https://qentrix-ai.com` — the Vercel project env differs from the repo files. Contact + booking are in-house (`/api/contact`, `/api/booking` → nodemailer/Resend, receiver `talk@qentrix-ai.com`). Booking is `/book`, no Cal.com/Calendly. Resume download proxied via `/api/resume`. `CORS_ALLOW_ORIGINS=*`.

## 9. Phase 0 tooling status

| Item | Status |
|---|---|
| `frontend-design@claude-plugins-official` | ✅ installed (user scope) |
| `context7@claude-plugins-official` | ✅ installed |
| `code-review@claude-plugins-official` | ✅ installed |
| `vercel-react-best-practices` | ✅ installed → `.claude/skills` → `.agents/skills` |
| `web-design-guidelines` | ✅ installed |
| `vercel-optimize` | ✅ installed |
| `vercel-deploy` | ⚠️ renamed upstream — installed as **`deploy-to-vercel`** |
| Playwright MCP | ✅ registered in `.mcp.json` (project scope) — **needs a Claude Code restart to attach** |
| `@playwright/test` + browsers | ✅ chromium + firefox launch OK |
| WebKit | ❌ binary downloaded, launch fails — host is missing `libavif13`. Fix: `sudo apt-get install libavif13` (or `sudo npx playwright install-deps webkit`) |
| `lighthouse`, `@axe-core/cli` | ✅ installed as devDependencies |

Karpathy behavioural rules: no plugin available in the official marketplace; the four principles are already encoded in CLAUDE.md §1.
