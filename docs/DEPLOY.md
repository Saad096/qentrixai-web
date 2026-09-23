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
