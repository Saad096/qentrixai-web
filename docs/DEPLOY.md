# Deploying QentrixAI

Everything Vercel needs is in git. Nothing in this repo has to be uploaded
by hand, and no secret is committed.

## 1. Set the environment variables

Vercel → Project → Settings → Environment Variables. Take the list from
[`.env.example`](../.env.example), which is ordered and annotated; the
blocks marked **REQUIRED** are the ones the site will not work without.

The minimum for a working production deploy:

| Variable | Value | Why |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.qentrix-ai.com` | Canonicals, og:url and the sitemap are built from it. The apex 308-redirects to www, so this must be the www host or every canonical points at a redirect. |
| `CONTACT_RECEIVER_EMAIL` | `talk2saadalam@gmail.com` | Where a submitted brief lands. |
| `EMAIL_PROVIDER` | `resend` | |
| `RESEND_API_KEY` | from resend.com/api-keys | Secret. Never in git. |
| `RESEND_FROM_EMAIL` | `noreply@send.qentrix-ai.com` | Must be on a domain verified at resend.com/domains, or every send is refused. |

Set them for **Production**, **Preview** and **Development** unless there is
a reason not to. `.env` and `.env.local` are gitignored, so a value that
only lives there is missing in production — the usual cause of "it worked
locally".

`NEXT_PUBLIC_*` is inlined into the browser bundle at build time. Never put
a secret behind that prefix, and remember that changing one needs a
redeploy rather than a restart.

## 2. Push

```bash
git push origin revamp/v2     # preview deploy
# then merge to main for production
```

Vercel builds from git. `npm run build` is the build command and `.next` the
output; no extra configuration is needed.

## 3. Check after the first deploy

- `/` renders and the hero video plays on click
- `/sitemap.xml` lists 79 URLs and `/robots.txt` points at it
- A contact form submission arrives (Resend's dashboard shows delivery)
- The booking dialog opens Calendly over the page rather than navigating
- Favicon is the teal mark, not the old one (hard-refresh; the `?v=` bump
  handles most caches)

## Assets

Everything the site serves lives under `public/` and is committed — 6.4MB,
129 files. Originals, superseded shots and working files live in
`raw_assets/`, which is gitignored and never deployed.

To check that nothing has drifted:

```bash
node scripts/asset-audit.mjs                 # list anything unserved
node scripts/asset-audit.mjs --move raw_assets   # relocate it
```

It understands the two reference patterns a plain grep misses: the dark
illustration twins that `Illustration` derives at runtime, and the
`${DIR}/name.webp` paths in the data files.

## Audit harnesses

Run against a built site (`next build && next start`), not the dev server:

```bash
node scripts/axe-scrolled.mjs  http://localhost:3000 / /about /services
node scripts/readability.mjs   http://localhost:3000 / /about
node scripts/density.mjs       http://localhost:3000 / /about
node scripts/seo-audit.mjs     http://localhost:3000 / /about /blogs
```

`axe-scrolled` walks the page before auditing, because several states only
exist once scroll-driven animation has fired.

## Anti-scraping: what is in place, and what it can and cannot do

Requested 2026-09-24. The honest framing first, because it decides what to
expect from the rest.

**A public website cannot be made unscrapable.** To render a page a browser
must first receive the HTML, the CSS and the images; once those bytes are
delivered, whoever requested them has them. A browser extension runs inside
that browser, after delivery. An AI agent driving a real browser is
indistinguishable from a person browsing. Every server-side control ends at
the moment of delivery, and this is architectural rather than a limit of
free tooling — no paid product changes it either.

So nothing below prevents someone pointing a tool at the site and rebuilding
a lookalike. What it does is make bulk automated harvesting expensive, keep
compliant crawlers away, and establish the legal standing that is the actual
remedy against a copycat.

### In the code

| Measure | Where | What it does |
|---|---|---|
| 38 AI and scraping crawlers disallowed | `src/app/robots.ts` | Honour-system. Compliant crawlers obey; a scraper that ignores robots.txt is unaffected. |
| `frame-ancestors 'none'` + `X-Frame-Options: DENY` | `next.config.mjs` | The one lookalike vector a header genuinely closes: nobody can iframe the site on their domain and pass it off as theirs, or overlay it to harvest clicks. |
| `X-Robots-Tag: noai, noimageai` | `next.config.mjs` | An emerging convention some crawlers honour. Costs nothing; do not rely on it. |
| `nosniff`, `Referrer-Policy` | `next.config.mjs` | Response cannot be reinterpreted as script; our URLs stop leaking into other sites' analytics. |
| Automated-access prohibition | `/terms` | The enforceable part. Names scraping, extensions, AI agents, training use and lookalike rebuilds explicitly, so the prohibition is stated rather than implied. |
| Per-IP rate limit on `/api/contact` | `src/lib/rateLimit.ts` | Stops a script hammering the form. In-memory, so per serverless instance — see the note in that file. |

Search engines are deliberately untouched: Googlebot and Bingbot are not
named, so they fall under `User-Agent: * / Allow: /` and index normally.

**Cost of the crawler block, stated plainly.** The list includes the
citation crawlers (`OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`), not
just the training ones. The site is therefore opting out of being cited in
ChatGPT, Perplexity and Gemini answers — which is the visibility
`/services/aeo-and-geo` sells. Removing those three names from the list in
`robots.ts` buys it back while keeping training crawlers out.

### Free, in the Vercel dashboard

Not a new third party — it is already the host.

- **Firewall → Attack Challenge Mode.** Turn on during an active scrape.
  Forces a browser challenge; stops naive scripted harvesting outright.
- **Firewall → Bot filter.** Free-tier rules against known bad agents.
- **Firewall → custom rules.** Rate-limit by path or user agent.
- **Observability → Logs.** Where a scrape shows up first: one IP or agent
  requesting every route in sitemap order within a few minutes.

### Deliberately not done

Disabling right-click, blocking text selection, trapping devtools,
obfuscating markup, rendering copy as images. Each is bypassed in seconds,
each breaks screen readers, and the last two destroy the SEO the site
depends on. They provide the feeling of protection and none of it.

### If someone does copy the site

That is a legal matter, not a technical one, and the Terms clause exists to
support it: screenshot both sites, note the date, send a takedown to their
host and registrar, and file a DMCA with Google to have the copy delisted.
Original written work — case studies, product copy, the model-landscape
research — is copyright from the moment it is written; registration is only
needed to sue for statutory damages.

## Responsive checking

```bash
node scripts/responsive.mjs http://localhost:3000 / /about /services
```

Use this rather than the overflow check the other harnesses do. They measure
`document.scrollWidth` against `window.innerWidth`, which cannot see the
worst kind of breakage: when an ancestor clips, the document never grows, so
the page does not scroll sideways -- it just loses the right-hand side of
everything. A deployed hero was 664px wide in a 390px viewport while every
sweep reported "no overflow", because 390 did equal 390.

This one measures elements against the viewport, under real device
emulation, and flags an element only when it carries content -- its own text,
or a video or image. A bare wrapper that bleeds is fine; the rotating squares
behind the domain orbit do it by design while every label stays inside the
ring. Words and pictures being cut is not fine.
