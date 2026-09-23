# QentrixAI — Company Website

A premium, production-ready company website for **QentrixAI** — a hybrid AI services + product studio. Built with Next.js 15, TypeScript, Tailwind CSS and Framer Motion. Config-driven content, Dockerized for deployment.

---

## Highlights

- **Next.js 15 (App Router)** + **TypeScript** + **Tailwind CSS**
- **Framer Motion** for polished, restrained animation
- **Bento-grid hero, glass cards, dotted grid background** — built on 2026 design trends
- **Config-driven content** — every product, service, blog, FAQ and team member is a typed object in `src/data/*`
- **Product modal/drawer** with screenshot gallery, full breakdown (problem · solution · novelty · features · stack · roadmap)
- **Email-aware contact form** with Resend / SendGrid / SMTP fallbacks and graceful degradation
- **Calendar booking** via env (`NEXT_PUBLIC_CALENDAR_URL` / Calendly / Cal.com) with `/contact` fallback
- **SEO**: per-page metadata, OpenGraph, Twitter cards, sitemap, robots, Organization JSON-LD
- **Resume endpoint** at `/api/resume` serves the latest PDF in `public/resume/`
- **Dockerized** (multi-stage build, standalone output) + `docker-compose` + Nginx example
- **Accessible**: skip-link, focus rings, ARIA labels, keyboard-navigable modal, reduced-motion support

---

## Tech stack

| Layer | Tools |
|---|---|
| Framework | Next.js 15, React 19, TypeScript 5 |
| Styling | Tailwind CSS 3, custom design tokens, `tailwind-merge`, `clsx` |
| Animation | Framer Motion |
| Icons | lucide-react + custom (X, Upwork, Fiverr, Freelancer) |
| Email | Nodemailer (SMTP) · Resend · SendGrid (pick one via `EMAIL_PROVIDER`) |
| Tooling | ESLint (`next/core-web-vitals`), Prettier-compatible formatting |
| Container | Docker (multi-stage, `node:20-alpine`) + Docker Compose |
| Reverse proxy | Optional Nginx + Certbot (see `deploy/nginx.example.conf`) |

---

## Folder structure

```
src/
  app/
    page.tsx              # Home
    services/page.tsx
    products/page.tsx
    about/page.tsx
    team/page.tsx
    case-studies/page.tsx
    blogs/page.tsx
    blogs/[slug]/page.tsx # Dynamic blog detail
    careers/page.tsx
    contact/page.tsx
    privacy/page.tsx
    terms/page.tsx
    api/contact/route.ts
    api/resume/route.ts
    sitemap.ts
    robots.ts
    not-found.tsx
    layout.tsx
    globals.css
  components/
    layout/   # Header, Footer
    sections/ # Hero, Stats, ServicesOverview, ProductsShowcase, etc.
    cards/    # ServiceCard, ProductCard, ProductModal, TeamCard, BlogCard, CaseStudyCard, TestimonialCard
    forms/    # ContactForm
    ui/       # Container, Button, SectionHeading, Logo, Reveal, Badge, Icons
  data/
    company.ts        # Company narrative, stats, why-us, process
    services.ts       # 10 services (incl. Edge AI)
    products.ts       # Product catalogue (gallery, status, roadmap)
    team.ts           # Team members + LinkedIn env
    blogs.ts          # 8 blog posts w/ full content
    caseStudies.ts    # 6 case studies
    faqs.ts           # FAQ accordion content
    techStack.ts      # Grouped tech stack
    testimonials.ts   # Sample testimonials (replace with real)
    socials.ts        # Social links from env
    navigation.ts     # Primary nav + footer columns
  lib/
    env.ts            # publicEnv + getBookingUrl()
    seo.ts            # buildMetadata + organizationJsonLd
    mail.ts           # SMTP / Resend / SendGrid provider
    utils.ts          # cn(), formatDate(), readingTime()
public/
  logo/qentrixai-logo.webp
  products/*.png      # Product screenshots
  team/*.jpeg|.png    # Team headshots
  resume/*.pdf        # Served by /api/resume
deploy/
  nginx.example.conf  # Reverse-proxy + SSL example
Dockerfile
docker-compose.yml
.env.example
.dockerignore
.gitignore
```

---

## Quick start (local dev)

```bash
# 1) Install dependencies
npm install

# 2) Configure environment
cp .env.example .env.local
# Edit .env.local — fill in calendar URL, email provider, LinkedIn URLs, etc.

# 3) Run dev server
npm run dev
# Visit http://localhost:3000
```

Other scripts:

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run start      # serve production build
```

---

## Environment variables

All keys live in `.env.example`. Highlights:

| Key | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (used for OG, sitemap, JSON-LD) |
| `NEXT_PUBLIC_PROFILE_*` | Contact details displayed across the UI |
| `NEXT_PUBLIC_PROFILE_LINKEDIN/UPWORK/FIVERR/...` | Social links (hidden if blank) |
| `NEXT_PUBLIC_TEAM_*_LINKEDIN` | Per-member LinkedIn URLs (button auto-hides when empty) |
| `NEXT_PUBLIC_CALENDAR_URL` / `_CALENDLY_URL` / `_CALCOM_URL` | Booking links — first non-empty wins. Falls back to `/contact`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_GA_ID` | Optional analytics |
| `EMAIL_PROVIDER` | `smtp` · `resend` · `sendgrid` (leave blank to disable email) |
| `CONTACT_RECEIVER_EMAIL` | Where contact-form messages land |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | If `EMAIL_PROVIDER=smtp` |
| `RESEND_API_KEY` | If `EMAIL_PROVIDER=resend` |
| `SENDGRID_API_KEY` | If `EMAIL_PROVIDER=sendgrid` |
| `RESUME_FILENAME` | Override which PDF in `public/resume/` is served by `/api/resume` |
| `CORS_ALLOW_ORIGINS` | CORS for `/api/contact` (default `*`) |

The contact form **degrades gracefully** when `EMAIL_PROVIDER` is unset — it returns a friendly "we got your message, please WhatsApp/email us" response so the form never looks broken.

---

## How to add or update content

### Add a product
Edit [src/data/products.ts](src/data/products.ts) and append a new `Product`:

```ts
{
  slug: "new-product",
  name: "New Product",
  tagline: "One-line description.",
  category: "Category",
  status: "MVP",                 // "Live" | "Beta" | "MVP" | "Coming Soon" | "Internal Framework" | "Client Delivery" | "Concept"
  cover: "/products/new-cover.png",
  gallery: ["/products/new-1.png", "/products/new-2.png"],
  problem: "...",
  solution: "...",
  novelty: "...",
  features: ["...", "..."],
  targetUsers: ["...", "..."],
  techStack: ["Next.js", "FastAPI", "..."],
  roadmap: ["...", "..."],
}
```

Drop screenshots into `public/products/`. The card and modal pick them up automatically.

### Add a service
Append to [src/data/services.ts](src/data/services.ts) following the `Service` type. Pick an `accent` color (`blue` · `violet` · `cyan` · `mint`) and an icon from `lucide-react`.

### Add a team member
Append to [src/data/team.ts](src/data/team.ts). Drop the image into `public/team/`. Add a LinkedIn env var if you want the LinkedIn button to appear.

### Add a blog post
Append to [src/data/blogs.ts](src/data/blogs.ts). The post auto-renders at `/blogs/<slug>`. Each paragraph is a string in `content[]`. Cover image is a path under `/public/`.

### Add a case study
Append to [src/data/caseStudies.ts](src/data/caseStudies.ts).

### Update FAQ / tech stack / testimonials / navigation
Edit the matching file in `src/data/`. Each is a typed array — strict TypeScript will tell you exactly what's missing.

### Update the resume
Drop a PDF into `public/resume/`. The `/api/resume` endpoint serves the alphabetically last PDF, or set `RESUME_FILENAME=Your_File.pdf` to pin a specific file.

### Configure calendar booking
Set any of `NEXT_PUBLIC_CALENDAR_URL`, `NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_CALCOM_URL`. The Book-a-Call buttons across the site all use `getBookingUrl()` — first non-empty wins. If all three are empty, buttons route to `/contact`.

### Configure contact email
Set `EMAIL_PROVIDER` and the matching credentials. Without it, the form still works — it just returns the "please WhatsApp/email us" message.

---

## Docker

### Build & run with Docker Compose

```bash
cp .env.example .env
# Edit .env

docker compose build
docker compose up -d
docker compose logs -f
```

The site is served at `http://localhost:3000`.

### Or build manually

```bash
docker build -t qentrixai-web .
docker run -d --name qentrixai-web -p 3000:3000 --env-file .env qentrixai-web
```

The Dockerfile uses Next.js `output: "standalone"` for a tiny runtime image (~150 MB).

---

## Deploy to a VPS

1. **Server prep** (Ubuntu/Debian):
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```

2. **Clone the repo & build**:
   ```bash
   git clone <repo-url> /opt/qentrixai
   cd /opt/qentrixai
   cp .env.example .env && nano .env   # fill in values
   docker compose up -d --build
   ```

3. **Nginx reverse proxy**:
   ```bash
   sudo cp deploy/nginx.example.conf /etc/nginx/sites-available/qentrixai.conf
   sudo ln -s /etc/nginx/sites-available/qentrixai.conf /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

4. **SSL with Certbot**:
   ```bash
   sudo certbot --nginx -d qentrixai.com -d www.qentrixai.com
   ```

5. **Updates**:
   ```bash
   git pull
   docker compose up -d --build
   ```

### Other targets

- **Vercel** — set `output: "standalone"` to `undefined` and just `vercel deploy`. The repo works as-is on Vercel (the `standalone` output is also Vercel-compatible).
- **Render / Railway / Fly.io** — use the Dockerfile directly.
- **AWS ECS / Cloud Run** — use the Dockerfile; expose port 3000.

---

## SEO & analytics

- **Metadata** is built by `buildMetadata()` in `src/lib/seo.ts` and applied per page.
- **Sitemap** at `/sitemap.xml` (generated from `src/app/sitemap.ts`).
- **Robots** at `/robots.txt`.
- **Organization JSON-LD** is injected in `RootLayout`.
- **Plausible** auto-loads if `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set.
- **GA4** auto-loads if `NEXT_PUBLIC_GA_ID` is set.

---

## Production checklist

- [ ] Fill `.env` with real values (calendar URL, email creds, analytics IDs)
- [ ] Replace sample testimonials in `src/data/testimonials.ts` with signed-off client quotes (or remove the section)
- [ ] Add an OpenGraph image at `public/og.png` (1200×630) — recommended for richer link previews
- [ ] Replace the resume PDFs in `public/resume/` with the latest version
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain
- [ ] Confirm contact-form provider works (`EMAIL_PROVIDER` + creds)
- [ ] Run `npm run lint` and `npm run build` cleanly
- [ ] Smoke-test all routes in production build (`npm start`)
- [ ] Configure DNS A/AAAA records and SSL
- [ ] Submit `/sitemap.xml` to Google Search Console

---

## What's intentionally not included

- A CMS — content is config-driven (`src/data/*`). Add Sanity / Contentlayer later if the team wants non-engineering edits.
- Auth — this is a marketing site. Add NextAuth / Clerk if you grow a dashboard.
- A database — none needed. Add Postgres + Prisma when you wire up real product features.

---

## Credits

Built by QentrixAI. Design and engineering: Saad Alam (CEO, AI).

License: All rights reserved. Internal use by QentrixAI.
##################################################################################333
#########################################################################################
