# 05 — Copy deck

**Date:** 2026-09-19 · **Direction:** Kiln · **Status:** awaiting GATE 4
**Facts preserved verbatim (CLAUDE.md §1.6):** product names, case-study facts, the four stats (5+ yrs · 25+ systems · 12 geographies · 6-week MVP), Lahore, `talk@qentrix-ai.com`, `+92 319 682 8506`, Mon–Sat 9:00–19:00 PKT, all social links.
**Removed on owner instruction:** the three placeholder testimonials.
**Named on owner instruction:** TriggerX, Grow9X, TechForge.

---

## 1. Voice

Senior engineers who ship, writing to someone who has been burned before.

- Outcome first. The headline says what you get; the subhead carries the specificity.
- Every claim stands next to its proof — a number, a case, an artifact, or a tool name.
- Sentences average under 20 words. Paragraphs are three sentences or fewer.
- Contractions are fine. Dryness is fine. Hype is not.
- **Never:** cutting-edge, seamless, unlock, transform, revolutionary, leverage, empower, holistic, bespoke, game-changing, "in today's fast-paced world".
- **Say the anti-demo line once,** in section 3 of the homepage. Nowhere else. The audit found it six times.
- Sentence case everywhere, including eyebrows. No ALL-CAPS labels, no `→` inside button text, no `A · B · C` meta strings.

---

## 2. Global strings

**Navigation:** What we build · Case studies · Products · How we work · Insights
**Primary CTA, everywhere (nav, hero, slab, footer):** `Book a strategy call` → `/book`
**CTA support line:** `30 min, no deck`
**Secondary link, hero only:** `See how we work` → `/about`

**Footer**
- Line: `QentrixAI — an AI product studio in Lahore, working across 12 time zones.`
- Columns: Company (How we work · Careers · Case studies) · Work (What we build · Products · Insights · Contact) · Legal (Privacy policy · Terms of service)
- Contact block: `talk@qentrix-ai.com` · `+92 319 682 8506` · `Mon to Sat, 9:00–19:00 PKT`

---

## 3. Home — full deck

### 3.1 Hero

- **H1:** `AI systems that survive real users, real load, and handover.`
- **Lede:** `We design, build and run agentic systems, retrieval pipelines and voice AI — and we operate nine of our own products on the same discipline we sell.`
- **CTA:** `Book a strategy call` · support `30 min, no deck`
- **Slab stats** (verdigris slab, ink text):
  - `5+` — `years in AI and data engineering`
  - `25+` — `production systems shipped`
  - `12` — `client geographies served`
  - `6wk` — `kickoff to working MVP`
- **Under-rule line, left:** `Shipping for TriggerX, Grow9X and TechForge.`
- **Under-rule line, right (mono):** `Lahore, working across 12 time zones`

### 3.2 Selected work *(promoted from position 12)*

- **Eyebrow:** `Selected work`
- **H2:** `Six systems in production. Here are three.`
- **Lede:** `Problem, what we built, what changed. Names are withheld where the contract says so.`

| Card | Title | Problem line | Outcome line |
|---|---|---|---|
| 1 | Multi-agent platform for operational workflows | `An operations team was losing 200+ hours a month coordinating work across CRM, helpdesk and back-office tools.` | `Automated coverage went from 0 to 70% of in-scope tasks in a quarter, with zero hallucinated actions in production.` |
| 2 | Enterprise document intelligence | `100,000+ contracts, SOPs and manuals behind keyword search that kept sending people to legal.` | `Hybrid retrieval with citation grounding, measured against a 500-question eval set on every change.` |
| 3 | Voice screening for a recruitment agency | `Recruiters spending their week on first-round calls and the notes afterwards.` | `An outbound voice agent handles screening and writes structured candidate data straight into the ATS.` |

- **Link:** `All six case studies` → `/case-studies`

### 3.3 The gap *(the anti-demo message, said once)*

- **Eyebrow:** `Why this is hard`
- **H2:** `The demo is the easy part.`
- **Body:**
  `A model that answers well in a notebook is not a system. Production means retrieval that stays fresh, agents that fail safely, traces you can read at 3am, evals that catch a regression before your customer does, and a rollback path when they don't.`
  `That work is unglamorous and it is most of the job. We are not a slide-deck consultancy, an offshore body shop, or a demo factory.`

### 3.4 What we build

- **Eyebrow:** `What we build`
- **H2:** `Six things we are asked for most.`
- **Lede:** `Fourteen capabilities in total. These are the ones that start most engagements.`

| Capability | Outcome line |
|---|---|
| Agentic systems | `Agents with typed tools, retries and approval checkpoints on anything irreversible.` |
| Retrieval and enterprise search | `Hybrid BM25 and vector retrieval with re-ranking, so answers carry citations you can check.` |
| Voice AI | `Streaming speech agents that hold a real conversation and hand off to a human when confidence drops.` |
| Custom LLM products | `The whole product, not the model call: auth, billing, limits, admin and the eval suite.` |
| Document and NLP pipelines | `Structured data out of contracts, forms and manuals, with the extraction measured.` |
| MLOps and observability | `Tracing, evals and dashboards wired before launch, so you can see what the system is doing.` |

- **Link:** `All fourteen capabilities` → `/services`

### 3.5 Products

- **Eyebrow:** `Our own products`
- **H2:** `We run the kind of software we sell.`
- **Lede:** `Nine products built and operated in-house. The same evals, tracing and on-call discipline we hand to clients.`
- Featured three: **Minutely** — `Meeting intelligence: transcripts, minutes, action items, decisions.` · **NeuroMesh** — `A builder for complex multi-agent workflows.` · **VoxRoute** — `IVR and voice call automation that knows when to transfer.`
- **Link:** `All nine products` → `/products`

### 3.6 How we work

- **Eyebrow:** `How we work`
- **H2:** `Four phases, and what you own after each one.`
- **Lede:** `Numbered because it genuinely is a sequence. Every phase ends with an artifact in your repo, not a status call.`

| # | Phase | Body | You own |
|---|---|---|---|
| 01 | Frame | `Stakeholder interviews, a data audit, and a measurable target agreed before any model is chosen.` | `A written problem framing with the success metric` |
| 02 | Design | `System architecture, model and retrieval strategy, integration plan, security and compliance posture.` | `An architecture decision record, including what we rejected` |
| 03 | Build | `Weekly demos against the metric. Typed code, clean repos, evaluation harnesses for prompts and agents.` | `The repo and a regression suite running in your CI` |
| 04 | Run | `Dockerised rollout to your cloud or VPC, tracing and alerting wired, then a supervised handover.` | `A runbook, dashboards, and a rollback path` |

*Note: the current site's six steps collapse to four. Integrate and Deploy fold into Run; Monitor & improve becomes the last paragraph of Run. No facts are lost.*

### 3.7 Industries *(six tabs, honestly labelled — owner decision 2026-09-19)*

- **Eyebrow:** `Where this lands`
- **H2:** `Domain shapes the system, not just the wording.`

Re-cut against what the case studies actually cover. **Four** tabs carry a real engagement, not three:

| Tab | One-line | Backing |
|---|---|---|
| `Customer operations` | `Call deflection, screening and back-office coordination, with a confidence threshold that hands off to a human.` | **3 case studies** — AI IVR, voice screening, multi-agent operations |
| `Regulated industries` | `Retrieval that cites its source, so an answer can be checked rather than trusted.` | **1** — enterprise document intelligence |
| `Professional services` | `Meetings, minutes and decisions captured with a reviewer in the loop.` | **1** — meeting intelligence platform |
| `Enterprise IT and workforce` | `On-device identity and attendance with anti-spoofing, and no biometric data leaving the device.` | **1** — computer vision systems |
| `Healthcare` | `Capability statement only. No published engagement — we describe what we would build and say so plainly.` | none — **no client implied** |
| `Logistics` | `Capability statement only, same rule.` | none — **no client implied** |

Tabs without an engagement carry no logo, no "we helped a client…" phrasing, and no case-study link. They read as "this is what we would build", which is the truthful version.

### 3.8 Why us

- **Eyebrow:** `Why QentrixAI`
- **H2:** `Three reasons, and the receipts for each.`

| Pillar | Body | Proof shown next to it |
|---|---|---|
| `Production discipline` | `Evals, tracing and a rollback path are wired before launch, not bolted on after an incident.` | Langfuse · LangSmith · Grafana · Prometheus |
| `We operate our own products` | `Nine of them. We live with our own architecture decisions, which is why we argue about them early.` | Links to `/products` |
| `Senior-only delivery` | `The people who scope the work are the people who build it. No junior bench, no handoff between vendors.` | **Unblocked, founder-only** — Saad Alam named as CEO and AI lead, with the existing LinkedIn, GitHub and Upwork links. The rest of the team is described as senior without being named. |

### 3.9 Insights

- **Eyebrow:** `Insights`
- **H2:** `Field notes from the work.`
- Three most recent articles, shipped as-is (owner decision): *MCP is now how agents reach your systems* (2026-07-15), *Context engineering beat prompt engineering* (2026-07-02), *Computer-use agents are ready for narrow work* (2026-06-18). All three subjects are still current; dates are shown honestly.

### 3.10 FAQ + final CTA

- **H2:** `Questions buyers actually ask.`
- Full rewritten set in §9.
- **Closing band H2:** `Bring a goal. Leave with an architecture and a timeline.`
- **Body:** `Thirty minutes, no pitch deck. If we are not the right fit, we will say so on the call.`
- **CTA:** `Book a strategy call`

---

## 4. `/services` — hub and 14 capability pages

**Hub H1:** `What we build`
**Lede:** `Fourteen capabilities. Each one ships with the same production discipline: evals, tracing, and a handover.`

Each capability page follows one template: `H1 = the outcome` · a three-sentence lede · `What you get` (4 bullets, artifact-shaped) · `How we build it` (the real stack) · `What it costs to run` (honest ranges, no invented figures) · a linked case study where one exists · the standard CTA.

The existing 14 titles are already outcome-first and survive the rewrite: Ship custom LLM products · Put agents to work · Make your knowledge answer · Automate calls with voice AI · See what your cameras see · Turn documents into data · Launch an AI MVP in weeks · Build on-chain with confidence · Run models on the edge · Keep AI alive in production · Predict with classic ML · Prove your AI is safe · Automate ops without a rebuild · Decide before you build.

---

## 5. `/case-studies` — hub and 6 detail pages

**Hub H1:** `Selected work`
**Lede:** `Six production systems. Where a client is under NDA we describe the shape of the business, never invent a logo.`

Detail template: `H1 = the system` · client descriptor · `The problem` · `What we built` · `What changed` · `Stack` · `What we would do differently` (new section — it is the most credible thing an engineering studio can publish) · CTA.

All six problem/solution/outcome texts are preserved as facts and edited only for length and voice.

**Blocked on real figures (owner is supplying them).** Five of six carry no hard number today. Each card and each detail page gets a dedicated metric slot — a large numeral with a one-line label — built and styled now, left empty until the figures arrive. Nothing is invented and no placeholder number ships. The multi-agent case (`0 → 70% of in-scope tasks in a quarter`) is the only one that can be filled today, so it anchors the homepage row.

---

## 6. `/products` — hub and 9 detail pages

**Hub H1:** `Products we build and run`
**Lede:** `Nine products, operated in-house on the same discipline we sell. Several started as client work and earned their own roadmap.`

Taglines stay factual and are tightened: Minutely · NeuroMesh · SalesPire · ALA · MultiAgent Chatbot · DocumentAI · VoxRoute · Realtime Voice Bot · Fintelia. Detail template: `H1` · one-line tagline · `What it does` · `Who it is for` · screenshots · `Under the hood` · CTA.

---

## 7. `/about` — "How we work"

**H1:** `How we work`
**Sections:** the four phases in full · `What we believe` (three principles, one sentence each) · `Who you will work with` — **founder-only**: Saad Alam, CEO and AI lead, with photo, role, and the LinkedIn/GitHub/Upwork links already on the site; the rest described as *"a senior team across platform engineering, cloud and product"* with no names and no photos · `Where we are` (Lahore, 12 geographies, hours) · the full tech stack, moved here from the homepage, in four tabs: Languages and frameworks · Models and serving · Data and retrieval · Cloud and observability.

---

## 8. `/contact`, `/book`, `/careers`, 404

- **Contact H1:** `Tell us what you are building.`  Lede: `A short brief is enough to start. We reply within one working day.`
- **Book H1:** `Book a strategy call` · `Thirty minutes. Bring a goal, leave with a candid architecture and a realistic timeline.`
- **Careers H1:** `Work on systems that stay up.` — existing copy is strong; light edit only.
- **404 H1:** `That page has moved or never existed.` Body: `Here is where most people are heading.` + links to Case studies, Products, What we build, Contact. *(Replaces "That route hasn't been wired up yet." — developer voice on a customer-facing page.)*

---

## 9. FAQ — rewritten and extended

Four questions survive from the current eight (work type, working with an existing team, clouds, NDAs). Four are replaced and five are new, drawn from what 2026 procurement actually asks.

1. **Who owns the code, the prompts and the fine-tuned weights?** — You do, including eval sets and extracted embeddings. Ownership is in the contract and survives termination.
2. **How do we avoid being locked to you, or to one model vendor?** — Model access sits behind an interface; prompts, eval sets and traces export in open formats. Lock-in accumulates across model, orchestration, data, governance evidence and team knowledge — we design against all five.
3. **How do you know the system still works after a change?** — A regression suite for prompts and agents runs in your CI. A change that drops a metric does not merge.
4. **What does it cost to run each month?** — We size token, inference, storage and observability costs during design, and put a ceiling and an alert on each.
5. **Where does our data live, and who can compel it?** — Residency and sovereignty are different questions. We deploy to your cloud, your VPC, or on-prem, and say plainly which sub-processors are involved.
6. **Can you run entirely on-prem or in our VPC?** — Yes. Everything ships Dockerised with CI/CD wired.
7. **What is actually in a 6-week MVP?** — Weeks 1–2 framing and architecture, 3–4 build against the metric, 5–6 productionisation: Docker, CI/CD, monitoring, secrets, runbook.
8. **What kind of AI work do you take on?** *(kept)*
9. **Can you work alongside our engineering team?** *(kept)*
10. **Which clouds do you support?** *(kept)*
11. **Do you sign NDAs?** *(kept)*
12. **What does pricing look like?** *(kept, rewritten to name the three engagement shapes without inventing figures)*

---

## 10. SEO — title and meta per route

Unique per page, under 60 / 155 characters, question-form H2s where natural. Full table lands with the build; the pattern is `<Outcome> | QentrixAI`, never `<Noun> | QentrixAI`. Example: `/services` becomes `AI systems built for production | QentrixAI` rather than `AI Services | QentrixAI`.

JSON-LD to add: `WebSite`, `Service` (per capability page), `FAQPage`, `Article` (per post), `BreadcrumbList`, `Product` (per product page). Only `Organization` exists today.

---

## 11. What this deck deletes

| Removed | Reason |
|---|---|
| 3 testimonials | Placeholders presented as real quotes (A-01) |
| "Production over demos" ×5 of 6 instances | Repetition (B-02) |
| 13-item capability marquee | Padding, and the worst performance offender |
| "AI product studio" as a bare tagline | Replaced by the promise line, which is provable |
| Personal Gmail on `/privacy` and `/terms` | Replaced with `talk@qentrix-ai.com` |

---

## 12. Content gaps

### Resolved at GATE 4 (2026-09-19)

| Gap | Decision |
|---|---|
| Team visibility | **Founder only.** Saad Alam named with photo; the rest described as senior, unnamed, no photos. `/team` stays redirected. |
| Industries | **Six tabs, honestly labelled.** Four carry a real engagement; Healthcare and Logistics are capability statements with no implied client. |
| Blog | **Ship the three newest as-is.** No new articles this phase. |
| Case-study figures | **Owner is supplying real numbers.** Metric slots are built now and filled on arrival. |

### Still outstanding

1. **The five case-study figures.** This is the only thing blocking a section, and it is the most valuable copy on the site.
2. **A one-line outcome for TriggerX, Grow9X or TechForge** — worth more than the logo itself.
3. **Higher-resolution client marks** for Grow9X and TechForge (see `06-images.md` §6).
4. **Product screenshots** for MultiAgent Chatbot, DocumentAI and VoxRoute — their pages are text-only without them.
