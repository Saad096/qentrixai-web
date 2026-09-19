# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> mobile navigation >> opens, traps focus, closes on Escape
- Location: tests/e2e/navigation.spec.ts:10:7

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: page.goto: Test timeout of 45000ms exceeded.
Call log:
  - navigating to "http://127.0.0.1:3311/", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e5]:
      - link "QentrixAI home" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: QentrixAI
      - generic [ref=e9]:
        - button "Switch to dark theme" [ref=e10] [cursor=pointer]
        - button "Open menu" [ref=e17] [cursor=pointer]
  - main [ref=e19]:
    - generic [ref=e21]:
      - generic [ref=e23]:
        - heading "AI systems that survive real users, real load, and handover." [level=1] [ref=e24]
        - paragraph [ref=e25]: We design, build and run agentic systems, retrieval pipelines and voice AI — and we operate nine of our own products on the same discipline we sell.
      - generic [ref=e29]:
        - generic [ref=e30]:
          - generic [ref=e31]:
            - generic [ref=e32]: 5+
            - generic [ref=e33]: years in AI and data engineering
          - generic [ref=e34]:
            - generic [ref=e35]: 25+
            - generic [ref=e36]: production systems shipped
          - generic [ref=e37]:
            - generic [ref=e38]: "12"
            - generic [ref=e39]: client geographies served
          - generic [ref=e40]:
            - generic [ref=e41]: 6wk
            - generic [ref=e42]: kickoff to working MVP
        - generic [ref=e43]:
          - link "Book a strategy call" [ref=e44] [cursor=pointer]:
            - /url: /book
          - generic [ref=e45]: 30 min, no deck
      - generic [ref=e46]:
        - paragraph [ref=e47]: Shipping for TriggerX, Grow9X and TechForge.
        - generic [ref=e48]: Lahore, working across 12 time zones
    - generic [ref=e50]:
      - generic [ref=e51]:
        - paragraph [ref=e52]: Selected work
        - heading "Six systems in production. Here are three." [level=2] [ref=e53]
        - paragraph [ref=e54]: Problem, what we built, what changed. Names are withheld where the contract says so.
      - list [ref=e55]:
        - listitem [ref=e56]:
          - link "Agentic AI Multi-Agent AI Platform for Operational Workflows Operations team running repetitive multi-step workflows across CRM, helpdesk, and back-office tools, losing 200+ hours a month to manual coordination. 0 to 70% of in-scope tasks automated in one quarter" [ref=e58] [cursor=pointer]:
            - /url: /case-studies/multi-agent-ai-platform
            - generic [ref=e59]: Agentic AI
            - heading "Multi-Agent AI Platform for Operational Workflows" [level=3] [ref=e60]
            - paragraph [ref=e61]: Operations team running repetitive multi-step workflows across CRM, helpdesk, and back-office tools, losing 200+ hours a month to manual coordination.
            - paragraph [ref=e62]:
              - generic [ref=e63]: 0 to 70%
              - generic [ref=e64]: of in-scope tasks automated in one quarter
        - listitem [ref=e65]:
          - link "RAG Enterprise Document Intelligence & Semantic Search Knowledge sprawl across 100k+ documents (contracts, SOPs, manuals) with brittle keyword search and growing tickets to legal & ops. Self-service answer rate measured against a 500-question eval set, with citation grounding above target. Significant reduction in escalations to internal subject-matter experts." [ref=e67] [cursor=pointer]:
            - /url: /case-studies/enterprise-document-intelligence
            - generic [ref=e68]: RAG
            - heading "Enterprise Document Intelligence & Semantic Search" [level=3] [ref=e69]
            - paragraph [ref=e70]: Knowledge sprawl across 100k+ documents (contracts, SOPs, manuals) with brittle keyword search and growing tickets to legal & ops.
            - paragraph [ref=e71]: Self-service answer rate measured against a 500-question eval set, with citation grounding above target. Significant reduction in escalations to internal subject-matter experts.
        - listitem [ref=e72]:
          - 'link "Voice AI Voice AI Recruitment Screening & CRM Automation Recruiters losing hours on first-round screening calls: repetitive questions, repetitive note-taking, missed follow-ups. Recruiter time on first-round screening dropped sharply; structured candidate data flows directly into the ATS with searchable transcripts attached." [ref=e74] [cursor=pointer]':
            - /url: /case-studies/voice-recruitment-automation
            - generic [ref=e75]: Voice AI
            - heading "Voice AI Recruitment Screening & CRM Automation" [level=3] [ref=e76]
            - paragraph [ref=e77]: "Recruiters losing hours on first-round screening calls: repetitive questions, repetitive note-taking, missed follow-ups."
            - paragraph [ref=e78]: Recruiter time on first-round screening dropped sharply; structured candidate data flows directly into the ATS with searchable transcripts attached.
      - paragraph [ref=e79]:
        - link "All six case studies" [ref=e80] [cursor=pointer]:
          - /url: /case-studies
    - generic [ref=e82]:
      - generic [ref=e83]:
        - paragraph [ref=e84]: Why this is hard
        - heading "The demo is the easy part." [level=2] [ref=e85]
      - generic [ref=e86]:
        - paragraph [ref=e87]: A model that answers well in a notebook is not a system. Production means retrieval that stays fresh, agents that fail safely, traces you can read at 3am, evals that catch a regression before your customer does, and a rollback path when they don't.
        - paragraph [ref=e88]: That work is unglamorous and it is most of the job. We are not a slide-deck consultancy, an offshore body shop, or a demo factory.
    - generic [ref=e90]:
      - generic [ref=e91]:
        - paragraph [ref=e92]: What we build
        - heading "Six things we are asked for most." [level=2] [ref=e93]
        - paragraph [ref=e94]: Fourteen capabilities in total. These are the ones that start most engagements.
      - list [ref=e96]:
        - listitem [ref=e97]:
          - 'link "Ship custom LLM products The whole product, not the model call: auth, billing, limits, admin and the eval suite." [ref=e99] [cursor=pointer]':
            - /url: /services/generative-ai
            - generic [ref=e112]:
              - generic [ref=e113]: Ship custom LLM products
              - generic [ref=e114]: "The whole product, not the model call: auth, billing, limits, admin and the eval suite."
        - listitem [ref=e115]:
          - link "Put agents to work Agents with typed tools, retries and approval checkpoints on anything irreversible." [ref=e117] [cursor=pointer]:
            - /url: /services/agentic-ai
            - generic [ref=e123]:
              - generic [ref=e124]: Put agents to work
              - generic [ref=e125]: Agents with typed tools, retries and approval checkpoints on anything irreversible.
        - listitem [ref=e126]:
          - link "Make your knowledge answer Hybrid BM25 and vector retrieval with re-ranking, so answers carry citations you can check." [ref=e128] [cursor=pointer]:
            - /url: /services/rag-enterprise-search
            - generic [ref=e133]:
              - generic [ref=e134]: Make your knowledge answer
              - generic [ref=e135]: Hybrid BM25 and vector retrieval with re-ranking, so answers carry citations you can check.
        - listitem [ref=e136]:
          - link "Automate calls with voice AI Streaming speech agents that hold a real conversation and hand off to a human when confidence drops." [ref=e138] [cursor=pointer]:
            - /url: /services/voice-ai
            - generic [ref=e141]:
              - generic [ref=e142]: Automate calls with voice AI
              - generic [ref=e143]: Streaming speech agents that hold a real conversation and hand off to a human when confidence drops.
        - listitem [ref=e144]:
          - link "Turn documents into data Structured data out of contracts, forms and manuals, with the extraction measured." [ref=e146] [cursor=pointer]:
            - /url: /services/nlp-document-ai
            - generic [ref=e151]:
              - generic [ref=e152]: Turn documents into data
              - generic [ref=e153]: Structured data out of contracts, forms and manuals, with the extraction measured.
        - listitem [ref=e154]:
          - link "Keep AI alive in production Tracing, evals and dashboards wired before launch, so you can see what the system is doing." [ref=e156] [cursor=pointer]:
            - /url: /services/cloud-devops-mlops
            - generic [ref=e159]:
              - generic [ref=e160]: Keep AI alive in production
              - generic [ref=e161]: Tracing, evals and dashboards wired before launch, so you can see what the system is doing.
      - paragraph [ref=e162]:
        - link "All fourteen capabilities" [ref=e163] [cursor=pointer]:
          - /url: /services
    - generic [ref=e165]:
      - generic [ref=e166]:
        - paragraph [ref=e167]: Our own products
        - heading "We run the kind of software we sell." [level=2] [ref=e168]
        - paragraph [ref=e169]: Nine products built and operated in-house, on the same evals, tracing and on-call discipline we hand to clients.
      - list [ref=e170]:
        - listitem [ref=e171]:
          - link [ref=e173] [cursor=pointer]:
            - /url: /products/minutely
            - img "Minutely interface" [ref=e175]
            - heading "Minutely" [level=3] [ref=e176]
            - paragraph [ref=e177]: "AI meeting intelligence: transcripts, MOMs, action items, decisions."
        - listitem [ref=e178]:
          - link [ref=e180] [cursor=pointer]:
            - /url: /products/neuromesh
            - img "NeuroMesh interface" [ref=e182]
            - heading "NeuroMesh" [level=3] [ref=e183]
            - paragraph [ref=e184]: Deep agent builder for complex multi-agent workflows.
        - listitem [ref=e185]:
          - link "VoxRoute VoxRoute AI-powered IVR & voice call automation platform." [ref=e187] [cursor=pointer]:
            - /url: /products/voxroute
            - generic [ref=e188]: VoxRoute
            - heading "VoxRoute" [level=3] [ref=e190]
            - paragraph [ref=e191]: AI-powered IVR & voice call automation platform.
      - paragraph [ref=e192]:
        - link "All nine products" [ref=e193] [cursor=pointer]:
          - /url: /products
    - generic [ref=e195]:
      - generic [ref=e196]:
        - paragraph [ref=e197]: How we work
        - heading "Four phases, and what you own after each one." [level=2] [ref=e198]
        - paragraph [ref=e199]: Every phase ends with an artifact in your repo, not a status call.
      - list [ref=e200]:
        - listitem [ref=e201]:
          - generic [ref=e202]:
            - generic [ref=e203]: "01"
            - heading "Frame" [level=3] [ref=e204]
            - paragraph [ref=e205]: Stakeholder interviews, a data audit, and a measurable target agreed before any model is chosen.
            - paragraph [ref=e206]: You own a written problem framing with the success metric.
        - listitem [ref=e207]:
          - generic [ref=e208]:
            - generic [ref=e209]: "02"
            - heading "Design" [level=3] [ref=e210]
            - paragraph [ref=e211]: System architecture, model and retrieval strategy, integration plan, security and compliance posture.
            - paragraph [ref=e212]: You own an architecture decision record, including what we rejected.
        - listitem [ref=e213]:
          - generic [ref=e214]:
            - generic [ref=e215]: "03"
            - heading "Build" [level=3] [ref=e216]
            - paragraph [ref=e217]: Weekly demos against the metric. Typed code, clean repos, evaluation harnesses for prompts and agents.
            - paragraph [ref=e218]: You own the repo and a regression suite running in your CI.
        - listitem [ref=e219]:
          - generic [ref=e220]:
            - generic [ref=e221]: "04"
            - heading "Run" [level=3] [ref=e222]
            - paragraph [ref=e223]: Dockerised rollout to your cloud or VPC, tracing and alerting wired, then a supervised handover and an improvement loop.
            - paragraph [ref=e224]: You own a runbook, dashboards, and a rollback path.
    - generic [ref=e226]:
      - generic [ref=e227]:
        - paragraph [ref=e228]: Where this lands
        - heading "Domain shapes the system, not just the wording." [level=2] [ref=e229]
      - generic [ref=e230]:
        - tablist "Industries" [ref=e231]:
          - tab "Customer operations" [selected] [ref=e232] [cursor=pointer]
          - tab "Regulated industries" [ref=e233] [cursor=pointer]
          - tab "Professional services" [ref=e234] [cursor=pointer]
          - tab "Enterprise IT and workforce" [ref=e235] [cursor=pointer]
          - tab "Healthcare" [ref=e236] [cursor=pointer]
          - tab "Logistics" [ref=e237] [cursor=pointer]
        - tabpanel "Customer operations" [ref=e238]:
          - generic [ref=e239]:
            - paragraph [ref=e240]: Call deflection, screening and back-office coordination, with a confidence threshold that hands off to a human rather than guessing.
            - list [ref=e241]:
              - listitem [ref=e242]:
                - link "AI-Powered IVR Replacement Platform" [ref=e243] [cursor=pointer]:
                  - /url: /case-studies/ai-ivr-platform
              - listitem [ref=e244]:
                - link "Voice AI Recruitment Screening & CRM Automation" [ref=e245] [cursor=pointer]:
                  - /url: /case-studies/voice-recruitment-automation
              - listitem [ref=e246]:
                - link "Multi-Agent AI Platform for Operational Workflows" [ref=e247] [cursor=pointer]:
                  - /url: /case-studies/multi-agent-ai-platform
          - img "A busy crossing full of people moving through a city street" [ref=e250]
    - generic [ref=e252]:
      - generic [ref=e253]:
        - paragraph [ref=e254]: Why QentrixAI
        - heading "Three reasons, and the receipts for each." [level=2] [ref=e255]
      - list [ref=e256]:
        - listitem [ref=e257]:
          - heading "Production discipline" [level=3] [ref=e258]
          - paragraph [ref=e259]: Evals, tracing and a rollback path are wired before launch, not bolted on after an incident.
          - paragraph [ref=e260]: Langfuse, LangSmith, Grafana, Prometheus
        - listitem [ref=e261]:
          - heading "We operate our own products" [level=3] [ref=e262]
          - paragraph [ref=e263]: Nine of them. We live with our own architecture decisions, which is why we argue about them early.
          - paragraph [ref=e264]:
            - link "See all nine products" [ref=e265] [cursor=pointer]:
              - /url: /products
        - listitem [ref=e266]:
          - heading "Senior-only delivery" [level=3] [ref=e267]
          - paragraph [ref=e268]: The people who scope the work are the people who build it. No junior bench, no handoff between vendors.
          - paragraph [ref=e269]:
            - link "Led by Saad Alam, CEO and AI lead" [ref=e270] [cursor=pointer]:
              - /url: /about
    - generic [ref=e272]:
      - generic [ref=e273]:
        - paragraph [ref=e274]: Insights
        - heading "Field notes from the work." [level=2] [ref=e275]
      - list [ref=e276]:
        - listitem [ref=e277]:
          - link "Jul 15, 2026 · 8 min read MCP is now how agents reach your systems The Model Context Protocol went from Anthropic side project to Linux Foundation standard with over 10,000 public servers. What the new stateless spec and enterprise auth mean for your stack." [ref=e278] [cursor=pointer]:
            - /url: /blogs/mcp-how-agents-reach-your-systems
            - generic [ref=e279]: Jul 15, 2026 · 8 min read
            - heading "MCP is now how agents reach your systems" [level=3] [ref=e280]
            - paragraph [ref=e281]: The Model Context Protocol went from Anthropic side project to Linux Foundation standard with over 10,000 public servers. What the new stateless spec and enterprise auth mean for your stack.
        - listitem [ref=e282]:
          - 'link "Jul 2, 2026 · 7 min read Context engineering beat prompt engineering The defining AI skill of 2026 is not writing clever prompts. It is architecting what the model sees: memory, retrieval, tools, and state, delivered at the right moment." [ref=e283] [cursor=pointer]':
            - /url: /blogs/context-engineering-beat-prompting
            - generic [ref=e284]: Jul 2, 2026 · 7 min read
            - heading "Context engineering beat prompt engineering" [level=3] [ref=e285]
            - paragraph [ref=e286]: "The defining AI skill of 2026 is not writing clever prompts. It is architecting what the model sees: memory, retrieval, tools, and state, delivered at the right moment."
        - listitem [ref=e287]:
          - link "Jun 18, 2026 · 6 min read Computer-use agents are ready for narrow work Agents that drive a real screen now clear 85 percent on OS-level benchmarks. That is good enough for the ugly middle of enterprise work, if you scope them honestly." [ref=e288] [cursor=pointer]:
            - /url: /blogs/computer-use-agents-narrow-work
            - generic [ref=e289]: Jun 18, 2026 · 6 min read
            - heading "Computer-use agents are ready for narrow work" [level=3] [ref=e290]
            - paragraph [ref=e291]: Agents that drive a real screen now clear 85 percent on OS-level benchmarks. That is good enough for the ugly middle of enterprise work, if you scope them honestly.
      - paragraph [ref=e292]:
        - link "All articles" [ref=e293] [cursor=pointer]:
          - /url: /blogs
    - generic [ref=e295]:
      - generic [ref=e296]:
        - paragraph [ref=e297]: Before the call
        - heading "Questions buyers actually ask." [level=2] [ref=e298]
      - list [ref=e299]:
        - listitem [ref=e300]:
          - group [ref=e301]:
            - generic "Who owns the code, the prompts and the fine-tuned weights?" [ref=e302] [cursor=pointer]:
              - text: Who owns the code, the prompts and the fine-tuned weights?
              - generic [aria-hidden] [ref=e303]: +
        - listitem [ref=e304]:
          - group [ref=e305]:
            - generic "How do we avoid being locked to you, or to one model vendor?" [ref=e306] [cursor=pointer]:
              - text: How do we avoid being locked to you, or to one model vendor?
              - generic [aria-hidden] [ref=e307]: +
        - listitem [ref=e308]:
          - group [ref=e309]:
            - generic "How do you know the system still works after a change?" [ref=e310] [cursor=pointer]:
              - text: How do you know the system still works after a change?
              - generic [aria-hidden] [ref=e311]: +
        - listitem [ref=e312]:
          - group [ref=e313]:
            - generic "What does it cost to run each month?" [ref=e314] [cursor=pointer]:
              - text: What does it cost to run each month?
              - generic [aria-hidden] [ref=e315]: +
        - listitem [ref=e316]:
          - group [ref=e317]:
            - generic "Where does our data live, and who can compel it?" [ref=e318] [cursor=pointer]:
              - text: Where does our data live, and who can compel it?
              - generic [aria-hidden] [ref=e319]: +
        - listitem [ref=e320]:
          - group [ref=e321]:
            - generic "Can you run entirely on-prem or in our VPC?" [ref=e322] [cursor=pointer]:
              - text: Can you run entirely on-prem or in our VPC?
              - generic [aria-hidden] [ref=e323]: +
        - listitem [ref=e324]:
          - group [ref=e325]:
            - generic "What is actually in a 6-week MVP?" [ref=e326] [cursor=pointer]:
              - text: What is actually in a 6-week MVP?
              - generic [aria-hidden] [ref=e327]: +
        - listitem [ref=e328]:
          - group [ref=e329]:
            - generic "What kind of AI work do you take on?" [ref=e330] [cursor=pointer]:
              - text: What kind of AI work do you take on?
              - generic [aria-hidden] [ref=e331]: +
        - listitem [ref=e332]:
          - group [ref=e333]:
            - generic "Can you work alongside our engineering team?" [ref=e334] [cursor=pointer]:
              - text: Can you work alongside our engineering team?
              - generic [aria-hidden] [ref=e335]: +
        - listitem [ref=e336]:
          - group [ref=e337]:
            - generic "Which clouds do you support?" [ref=e338] [cursor=pointer]:
              - text: Which clouds do you support?
              - generic [aria-hidden] [ref=e339]: +
        - listitem [ref=e340]:
          - group [ref=e341]:
            - generic "What does pricing look like?" [ref=e342] [cursor=pointer]:
              - text: What does pricing look like?
              - generic [aria-hidden] [ref=e343]: +
        - listitem [ref=e344]:
          - group [ref=e345]:
            - generic "Do you sign NDAs?" [ref=e346] [cursor=pointer]:
              - text: Do you sign NDAs?
              - generic [aria-hidden] [ref=e347]: +
    - generic [ref=e350]:
      - heading "Bring a goal. Leave with an architecture and a timeline." [level=2] [ref=e351]
      - paragraph [ref=e352]: Thirty minutes, no pitch deck. If we are not the right fit, we will say so on the call.
      - generic [ref=e353]:
        - link "Book a strategy call" [ref=e354] [cursor=pointer]:
          - /url: /book
        - generic [ref=e355]: 30 min, no deck
  - contentinfo [ref=e356]:
    - generic [ref=e357]:
      - generic [ref=e358]:
        - generic [ref=e359]:
          - link "QentrixAI home" [ref=e360] [cursor=pointer]:
            - /url: /
            - generic [ref=e362]: QentrixAI
          - paragraph [ref=e363]: An AI product studio in Lahore, working across 12 time zones.
          - generic [ref=e364]:
            - link "talk@qentrix-ai.com" [ref=e365] [cursor=pointer]:
              - /url: mailto:talk@qentrix-ai.com
            - link "+923196828506" [ref=e366] [cursor=pointer]:
              - /url: tel:+923196828506
            - generic [ref=e367]: Mon to Sat, 9:00-19:00 PKT
        - generic [ref=e368]:
          - generic [ref=e369]:
            - heading "Company" [level=2] [ref=e370]
            - list [ref=e371]:
              - listitem [ref=e372]:
                - link "How we work" [ref=e373] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e374]:
                - link "Careers" [ref=e375] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e376]:
                - link "Case studies" [ref=e377] [cursor=pointer]:
                  - /url: /case-studies
          - generic [ref=e378]:
            - heading "Work" [level=2] [ref=e379]
            - list [ref=e380]:
              - listitem [ref=e381]:
                - link "What we build" [ref=e382] [cursor=pointer]:
                  - /url: /services
              - listitem [ref=e383]:
                - link "Products" [ref=e384] [cursor=pointer]:
                  - /url: /products
              - listitem [ref=e385]:
                - link "Insights" [ref=e386] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e387]:
                - link "Contact" [ref=e388] [cursor=pointer]:
                  - /url: /contact
          - generic [ref=e389]:
            - heading "Legal" [level=2] [ref=e390]
            - list [ref=e391]:
              - listitem [ref=e392]:
                - link "Privacy policy" [ref=e393] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e394]:
                - link "Terms of service" [ref=e395] [cursor=pointer]:
                  - /url: /terms
      - generic [ref=e396]:
        - paragraph [ref=e397]: 2026 QentrixAI. All rights reserved.
        - link "Book a strategy call" [ref=e398] [cursor=pointer]:
          - /url: /book
  - alert [ref=e399]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | /**
  4  |  * Audit B-10: the old mobile panel stayed focusable when closed, had no
  5  |  * Escape handler and no focus trap.
  6  |  */
  7  | test.describe("mobile navigation", () => {
  8  |   test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, "desktop nav has no panel");
  9  | 
  10 |   test("opens, traps focus, closes on Escape", async ({ page }) => {
> 11 |     await page.goto("/");
     |                ^ Error: page.goto: Test timeout of 45000ms exceeded.
  12 |     const trigger = page.getByRole("button", { name: "Open menu" });
  13 |     await expect(trigger).toBeVisible();
  14 | 
  15 |     // Closed: the panel is not in the DOM at all, so its links cannot be tabbed to.
  16 |     await expect(page.locator("#mobile-menu")).toHaveCount(0);
  17 | 
  18 |     await trigger.click();
  19 |     const panel = page.locator("#mobile-menu");
  20 |     await expect(panel).toBeVisible();
  21 |     await expect(panel.getByRole("link", { name: "Case studies" })).toBeVisible();
  22 | 
  23 |     await page.keyboard.press("Escape");
  24 |     await expect(page.locator("#mobile-menu")).toHaveCount(0);
  25 |     await expect(trigger).toBeFocused();
  26 |   });
  27 | });
  28 | 
  29 | test("the primary call to action is worded identically everywhere", async ({ page }) => {
  30 |   await page.goto("/");
  31 |   const ctas = page.getByRole("link", { name: "Book a strategy call" });
  32 |   expect(await ctas.count(), "nav, slab and closing band").toBeGreaterThanOrEqual(2);
  33 |   for (const cta of await ctas.all()) {
  34 |     await expect(cta).toHaveAttribute("href", "/book");
  35 |   }
  36 | });
  37 | 
  38 | test("the skip link reaches main content", async ({ page }) => {
  39 |   await page.goto("/");
  40 |   await page.keyboard.press("Tab");
  41 |   const skip = page.getByRole("link", { name: "Skip to content" });
  42 |   await expect(skip).toBeFocused();
  43 |   await expect(page.locator("#main")).toHaveCount(1);
  44 | });
  45 | 
```