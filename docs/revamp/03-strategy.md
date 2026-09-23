# 03 — Strategy, positioning, and information architecture

**Date:** 2026-09-19
**Inputs:** `01-audit.md`, `02-inspiration.md`, owner decisions of 2026-09-19 (full reset; testimonials pulled; TriggerX / Grow9X / TechForge nameable; **URLs unchanged**), plus 2026 market research cited in §1.2.

---

## 1. Positioning

### 1.1 Who we are for

| Persona | What they fear | What they want |
|---|---|---|
| **Technical buyer** — CTO, Head of Engineering, Platform Lead | Inheriting a prototype nobody can maintain, and a vendor they cannot leave. 2026 procurement now treats lock-in as accumulating across five layers — model, orchestration, data, governance evidence, and team knowledge. | Clean typed repos, an eval harness, tracing already wired, a runbook, and portability: prompts, eval sets and audit logs they can export on day one. |
| **Business buyer** — Head of Product, Ops Director, COO | Funding a second pilot that dies like the first. "Pilot purgatory" is the named failure mode of the category. | One number moved inside a quarter, and a straight answer on what it costs to run each month. |
| **Founder / scale-up CEO** | Burning two quarters of runway to find out the idea doesn't hold. | Something real in six weeks that can be shown to a customer or an investor, owned outright. |

All three sign the same contract. The technical buyer kills the deal; the business buyer funds it; the founder is often both.

### 1.2 Category: keep "AI product studio" — and start earning it

The 2026 market has settled into three labels with real structural differences:

- **AI consultancy** — ships strategy, hands off delivery.
- **Applied AI agency / engineering firm** — builds AI into an existing product and takes it to governed production.
- **AI product studio** — strategy, design and engineering from one team with no consultant-to-developer handoff; typical output is a production-ready product plus architecture and UX as one package.

**Recommendation: keep "AI product studio."** Not because it is the safest label, but because QentrixAI is one of the few firms using it that can actually back it: **nine internal products** (Minutely, NeuroMesh, SalesPire, ALA, MultiAgent Chatbot, DocumentAI, VoxRoute, Realtime Voice Bot, Fintelia) with 21 real screenshots already in the repo. Most "studios" are agencies with a nicer word. We ship and operate our own software.

"Applied AI engineering firm" is the sharper technical label but throws away the product proof and reads narrower to a business buyer. "AI product engineering partner" is a committee phrase.

**The gap in our current positioning is not the noun — it is the qualifier.** Today the site says "AI product studio" and then describes capabilities. The strongest firms in this space in 2026 qualify by *domain* (e.g. NOOMA: "production AI systems for law firms and the agencies that serve them"). We have no vertical. Until we pick one, the honest qualifier is the **operating standard**, not a market.

### 1.3 One-line promise

**Recommended:** *AI systems that survive real users, real load, and handover.* (9 words)

Alternates:
- *We build the AI that makes it past the pilot.* (10)
- *Production AI in six weeks, with the runbook included.* (9)

Each is outcome-first, under 12 words, and every one of them can be proven on the page: "survive real load" → case studies; "handover" → process step artifacts; "six weeks" → the existing 6-week MVP stat.

### 1.4 Three proof pillars

| Pillar | Claim | What on the site proves it |
|---|---|---|
| **1. Production discipline** | Evals, tracing and a rollback path are wired before launch, not after. | `company.process` steps 03/06; Langfuse · LangSmith · Grafana · Prometheus in the stack; the MLOps and production-readiness articles; case-study outcome numbers. |
| **2. We run our own products** | We operate the kind of systems we sell, so we live with our own decisions. | 9 internal products, 21 real product screenshots, `/products`. **This is the pillar nobody else on the shortlist has.** |
| **3. Senior-only, one team** | The people who scope it are the people who build it. No handoff loss, no junior bench. | 4 named seniors in `team.ts` (AI lead, CTO, platform, product); `whyUs` "One team, full path"; the 6-week MVP window is only credible because of it. |

Pillar 3 is currently **unprovable on the live site** — `/team` redirects to `/` and no faces or names appear anywhere. Either publish the team or drop the pillar; an unbacked seniority claim is exactly the kind of thing this rebuild is supposed to remove. **Owner decision needed (GATE 2).**

### 1.5 Anti-positioning

Said **once**, on the homepage, in the gap section — then never again:

> We are not a slide-deck consultancy, an offshore body shop, or a demo factory.

The audit found this idea restated six times across the current homepage (B-02). One placement, one sentence.

---

## 2. Sitemap and navigation

### 2.1 Route map — **existing URLs preserved** (owner decision)

No renames, no 301s. The only additions are detail pages *underneath* paths that already exist, so nothing currently indexed moves.

```
/                          Home
/services                  What we build (hub)
/services/[slug]           NEW — 14 capability pages (agentic-ai, rag-enterprise-search, voice-ai, …)
/products                  Products hub
/products/[slug]           NEW — 9 product pages (modal stays as a shortcut)
/case-studies              Selected work  (NOT renamed to /work)
/case-studies/[slug]       NEW — 6 case-study pages
/about                     Story, principles, how we work, team (if published)
/blogs                     Insights       (NOT renamed to /insights)
/blogs/[slug]              Article
/contact                   Contact
/book                      Booking
/careers  /privacy  /terms
/team                      Currently 307 → /. Keep, publish, or delete — GATE 2.
```

That is **+29 indexable pages** from content already written and sitting in `src/data/`, with zero redirect risk (B-04). All of them go into `sitemap.ts`, which today also silently omits `/team`.

### 2.2 Navigation

Five items plus one CTA, ordered by the buyer's journey rather than the org chart:

| Slot | Label | Href | Job |
|---|---|---|---|
| 1 | What we build | `/services` | What do you do? |
| 2 | Case studies | `/case-studies` | Has it worked? |
| 3 | Products | `/products` | Can you prove you operate software? |
| 4 | How we work | `/about` | What is it like to buy from you? |
| 5 | Insights | `/blogs` | Do you know what you're talking about? |
| CTA | **Book a strategy call** | `/book` | — |

Changes from today: "Our story" becomes "How we work" (buyers care about the engagement, not our history — the story still lives on the page); Case studies moves up to slot 2; and the nav CTA text becomes **identical** to the hero CTA and the footer CTA, fixing the three-way split in B-03. One verb phrase, one destination, everywhere.

The duplicated-in-DOM nav (B-10) is fixed in the build: one nav, `inert` when the mobile panel is closed.

---

## 3. Homepage blueprint

**Ten sections.** Down from 17. Target ≤ 9,000 px at 1440 and ≤ 14,000 px at 390 — shorter than both reference sites, roughly half of today's 29,141 px mobile.

| # | Section | The one job it does | Content source | Notes |
|---|---|---|---|---|
| 1 | **Hero** | Answer what / for whom / why in 7 seconds, and prove it in the same screen | New headline; `company.stats`; `clients.ts` | Statement headline, **one** CTA ("Book a strategy call"), four stat chips pinned at the base, and one line: "Trusted by TriggerX, Grow9X and TechForge." One real system visual, not a blob. |
| 2 | **Selected work** | Has this worked before? | `caseStudies.ts` — 3 of 6 | Promoted from position 12 to position 2. Each: problem → what we built → the number. Links to the new `/case-studies/[slug]`. |
| 3 | **The gap** | Why AI stalls after the demo — said **once** | `Problem` section, condensed | Carries the anti-positioning line (§1.5). If we cite the industry "most pilots never reach production" figure, it gets a named source or it does not ship. |
| 4 | **What we build** | The offer, scannable | `services.ts` — 6 of 14, one outcome line each | Links into the new `/services/[slug]` pages. Kills the 13-item marquee. |
| 5 | **Products** | We operate our own software (pillar 2) | `products.ts` — 3 featured | Real screenshots, arrows-only carousel, no autoplay. |
| 6 | **How we work** | De-risk the engagement | `company.process`, compressed 6 → 4–5 | Staggered numbered cards; **each step names the artifact it hands over** (problem framing → architecture doc → eval harness → runbook). |
| 7 | **Industries** | Domain range without a wall of tiles | `industries.ts` — 10 → 6 tabs | Tabbed; each tab shows the matching case study's outcome, not a stock photo. Any industry without a case study is cut. |
| 8 | **Why us** | The three pillars, once each | `company.whyUs` — 6 → 3 | Pillar 3 only if the team is published. |
| 9 | **Insights** | Show we're current | `blogs.ts` — 3 latest | Blocked until the blog is refreshed (B-17); newest post is 2026-07-15. |
| 10 | **FAQ + final CTA** | Handle the objection, then book | `faqs.ts`, rewritten and extended | New questions from 2026 procurement reality: who owns the IP and the fine-tuned weights, model portability and exit format, eval/regression practice, monthly run cost, data residency vs sovereignty, on-prem/VPC, what a 6-week MVP actually contains. |

### 3.1 What leaves the homepage

| Section today | Where it goes | Why |
|---|---|---|
| Capabilities (13-item marquee) | **Deleted** | Padding; worst single performance offender (A-05). |
| Clients (3 logos × 4 loops) | Folded into the hero, shown once | B-13. |
| Stats (standalone band) | Folded into the hero | Proof belongs above the fold (A-07). |
| AboutPreview | `/about` | Third restatement of the anti-demo message. |
| Problem | Merged into #3 | Duplicate of the hero. |
| TechStack (28 items) | `/services` (+ optional 4-tab strip) | Wall of logos; use the tabbed pattern from §4.6 of `02-inspiration.md`. |
| Testimonials | **Deleted** | Placeholders presented as real quotes (A-01). Returns when signed quotes exist. |

### 3.2 Definition of "done" for this blueprint

Carried from CLAUDE.md §8 and measured against the `01-audit.md` baseline: one `<h1>` per page, clean heading ladder, zero axe violations, Lighthouse mobile ≥ 90 / a11y ≥ 95 / BP ≥ 95 / SEO ≥ 95, LCP < 2.5 s on simulated 4G with a **server-rendered** H1, CLS < 0.1, no horizontal overflow at any tested viewport, ≥ 44 px hit areas, reduced motion respected, and **no infinite animations** — Speed Index has to come down from 42.3 s.

---

## 4. Decisions needed at GATE 2

1. **Team visibility.** Publish the four real photos and names (unlocks proof pillar 3), or keep `/team` hidden and drop the seniority claim from the site? *Recommendation: publish.*
2. **One-line promise.** "AI systems that survive real users, real load, and handover" — accept, pick an alternate, or brief me differently?
3. **Vertical.** Stay horizontal across 6 industries, or start qualifying by domain (the sharpest 2026 positioning move, and the one that would most change the homepage)? *Recommendation: stay horizontal now, revisit after the rebuild ships.*
4. **Blog refresh.** Section 9 needs current posts. Do you want new articles written in Phase 5, or should the section ship with the existing three newest?
5. **Nav wording.** "Our story" → "How we work" — agreed?
