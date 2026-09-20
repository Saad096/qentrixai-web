# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reveal.spec.ts >> scroll reveal survives client-side navigation >> content on a navigated-to route is visible without a refresh
- Location: tests/e2e/reveal.spec.ts:53:7

# Error details

```
Error: still at opacity 0 on /case-studies after navigating to it without a refresh

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "DIV.lg:col-span-5",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e5]:
      - link "QentrixAI home" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: QentrixAI
      - navigation "Primary" [ref=e9]:
        - link "What we build" [ref=e10] [cursor=pointer]:
          - /url: /services
        - link "Case studies" [active] [ref=e11] [cursor=pointer]:
          - /url: /case-studies
        - link "Products" [ref=e12] [cursor=pointer]:
          - /url: /products
        - link "How we work" [ref=e13] [cursor=pointer]:
          - /url: /about
        - link "Insights" [ref=e14] [cursor=pointer]:
          - /url: /blogs
      - generic [ref=e15]:
        - button "Switch to dark theme" [ref=e16] [cursor=pointer]
        - link "Book a strategy call" [ref=e23] [cursor=pointer]:
          - /url: /book
  - main [ref=e24]:
    - generic [ref=e26]:
      - heading "Selected work" [level=1] [ref=e27]
      - paragraph [ref=e28]: Six production systems. Where a client is under NDA we describe the shape of the business — we do not invent a logo.
    - list [ref=e31]:
      - listitem [ref=e32]:
        - link "Agentic AI Enterprise (NDA) Multi-Agent AI Platform for Operational Workflows Operations team running repetitive multi-step workflows across CRM, helpdesk, and back-office tools, losing 200+ hours a month to manual coordination. 0 to 70% of in-scope tasks automated in one quarter" [ref=e33] [cursor=pointer]:
          - /url: /case-studies/multi-agent-ai-platform
          - generic [ref=e34]:
            - text: Agentic AI
            - generic [ref=e35]: Enterprise (NDA)
          - generic [ref=e36]:
            - heading "Multi-Agent AI Platform for Operational Workflows" [level=2] [ref=e37]
            - paragraph [ref=e38]: Operations team running repetitive multi-step workflows across CRM, helpdesk, and back-office tools, losing 200+ hours a month to manual coordination.
          - generic [ref=e39]:
            - generic [ref=e40]: 0 to 70%
            - generic [ref=e41]: of in-scope tasks automated in one quarter
      - listitem [ref=e42]:
        - link "RAG Regulated Industry (NDA) Enterprise Document Intelligence & Semantic Search Knowledge sprawl across 100k+ documents (contracts, SOPs, manuals) with brittle keyword search and growing tickets to legal & ops. Self-service answer rate measured against a 500-question eval set, with citation grounding above target. Significant reduction in escalations to internal subject-matter experts." [ref=e43] [cursor=pointer]:
          - /url: /case-studies/enterprise-document-intelligence
          - generic [ref=e44]:
            - text: RAG
            - generic [ref=e45]: Regulated Industry (NDA)
          - generic [ref=e46]:
            - heading "Enterprise Document Intelligence & Semantic Search" [level=2] [ref=e47]
            - paragraph [ref=e48]: Knowledge sprawl across 100k+ documents (contracts, SOPs, manuals) with brittle keyword search and growing tickets to legal & ops.
          - generic [ref=e49]: Self-service answer rate measured against a 500-question eval set, with citation grounding above target. Significant reduction in escalations to internal subject-matter experts.
      - listitem [ref=e51]:
        - 'link "Voice AI Recruitment Agency Voice AI Recruitment Screening & CRM Automation Recruiters losing hours on first-round screening calls: repetitive questions, repetitive note-taking, missed follow-ups. Recruiter time on first-round screening dropped sharply; structured candidate data flows directly into the ATS with searchable transcripts attached." [ref=e52] [cursor=pointer]':
          - /url: /case-studies/voice-recruitment-automation
          - generic [ref=e53]:
            - text: Voice AI
            - generic [ref=e54]: Recruitment Agency
          - generic [ref=e55]:
            - heading "Voice AI Recruitment Screening & CRM Automation" [level=2] [ref=e56]
            - paragraph [ref=e57]: "Recruiters losing hours on first-round screening calls: repetitive questions, repetitive note-taking, missed follow-ups."
          - generic [ref=e58]: Recruiter time on first-round screening dropped sharply; structured candidate data flows directly into the ATS with searchable transcripts attached.
      - listitem [ref=e60]:
        - link "Speech AI Consulting Firm Meeting Intelligence Platform with Approval Workflows Client meetings producing scattered notes, MOMs late by days, action items missed, decisions disputed. MOMs published same day instead of next week. Decisions and actions traceable per meeting with reviewer accountability." [ref=e61] [cursor=pointer]:
          - /url: /case-studies/meeting-intelligence-platform
          - generic [ref=e62]:
            - text: Speech AI
            - generic [ref=e63]: Consulting Firm
          - generic [ref=e64]:
            - heading "Meeting Intelligence Platform with Approval Workflows" [level=2] [ref=e65]
            - paragraph [ref=e66]: Client meetings producing scattered notes, MOMs late by days, action items missed, decisions disputed.
          - generic [ref=e67]: MOMs published same day instead of next week. Decisions and actions traceable per meeting with reviewer accountability.
      - listitem [ref=e69]:
        - link "Voice AI Mid-market Call Center AI-Powered IVR Replacement Platform Legacy IVR with low containment rate and high frustration; live agents repeating the same 10 resolutions all day. Containment rate up significantly on in-scope intents; live agents freed to handle complex cases. Full call analytics dashboard for ops leadership." [ref=e70] [cursor=pointer]:
          - /url: /case-studies/ai-ivr-platform
          - generic [ref=e71]:
            - text: Voice AI
            - generic [ref=e72]: Mid-market Call Center
          - generic [ref=e73]:
            - heading "AI-Powered IVR Replacement Platform" [level=2] [ref=e74]
            - paragraph [ref=e75]: Legacy IVR with low containment rate and high frustration; live agents repeating the same 10 resolutions all day.
          - generic [ref=e76]: Containment rate up significantly on in-scope intents; live agents freed to handle complex cases. Full call analytics dashboard for ops leadership.
      - listitem [ref=e78]:
        - 'link "Computer Vision Enterprise IT Computer Vision Systems for Identity & Attendance Manual attendance verification across multiple sites: slow, error-prone, hard to audit. Sub-second on-device verification, fully auditable attendance records, and no plain-text biometric data leaving the device." [ref=e79] [cursor=pointer]':
          - /url: /case-studies/computer-vision-systems
          - generic [ref=e80]:
            - text: Computer Vision
            - generic [ref=e81]: Enterprise IT
          - generic [ref=e82]:
            - heading "Computer Vision Systems for Identity & Attendance" [level=2] [ref=e83]
            - paragraph [ref=e84]: "Manual attendance verification across multiple sites: slow, error-prone, hard to audit."
          - generic [ref=e85]: Sub-second on-device verification, fully auditable attendance records, and no plain-text biometric data leaving the device.
    - generic [ref=e89]:
      - generic [ref=e90]:
        - paragraph [ref=e91]: Before the call
        - heading "Questions buyers actually ask." [level=2] [ref=e92]
        - paragraph [ref=e93]: If yours is not here, ask it on the call. We answer scoping and architecture questions before there is a contract.
        - generic [ref=e94]:
          - paragraph [ref=e95]: Thirty minutes, no pitch deck. If we are not the right fit, we will say so.
          - link "Book a strategy call" [ref=e96] [cursor=pointer]:
            - /url: /book
      - list [ref=e97]:
        - listitem [ref=e98]:
          - group [ref=e99]:
            - generic "Who owns the code, the prompts and the fine-tuned weights?" [ref=e100] [cursor=pointer]:
              - text: Who owns the code, the prompts and the fine-tuned weights?
              - generic [aria-hidden] [ref=e101]: +
        - listitem [ref=e102]:
          - group [ref=e103]:
            - generic "How do we avoid being locked to you, or to one model vendor?" [ref=e104] [cursor=pointer]:
              - text: How do we avoid being locked to you, or to one model vendor?
              - generic [aria-hidden] [ref=e105]: +
        - listitem [ref=e106]:
          - group [ref=e107]:
            - generic "How do you know the system still works after a change?" [ref=e108] [cursor=pointer]:
              - text: How do you know the system still works after a change?
              - generic [aria-hidden] [ref=e109]: +
        - listitem [ref=e110]:
          - group [ref=e111]:
            - generic "What does it cost to run each month?" [ref=e112] [cursor=pointer]:
              - text: What does it cost to run each month?
              - generic [aria-hidden] [ref=e113]: +
        - listitem [ref=e114]:
          - group [ref=e115]:
            - generic "Where does our data live, and who can compel it?" [ref=e116] [cursor=pointer]:
              - text: Where does our data live, and who can compel it?
              - generic [aria-hidden] [ref=e117]: +
        - listitem [ref=e118]:
          - group [ref=e119]:
            - generic "Can you run entirely on-prem or in our VPC?" [ref=e120] [cursor=pointer]:
              - text: Can you run entirely on-prem or in our VPC?
              - generic [aria-hidden] [ref=e121]: +
        - listitem [ref=e122]:
          - group [ref=e123]:
            - generic "What is actually in a 6-week MVP?" [ref=e124] [cursor=pointer]:
              - text: What is actually in a 6-week MVP?
              - generic [aria-hidden] [ref=e125]: +
        - listitem [ref=e126]:
          - group [ref=e127]:
            - generic "What kind of AI work do you take on?" [ref=e128] [cursor=pointer]:
              - text: What kind of AI work do you take on?
              - generic [aria-hidden] [ref=e129]: +
        - listitem [ref=e130]:
          - group [ref=e131]:
            - generic "Can you work alongside our engineering team?" [ref=e132] [cursor=pointer]:
              - text: Can you work alongside our engineering team?
              - generic [aria-hidden] [ref=e133]: +
        - listitem [ref=e134]:
          - group [ref=e135]:
            - generic "Which clouds do you support?" [ref=e136] [cursor=pointer]:
              - text: Which clouds do you support?
              - generic [aria-hidden] [ref=e137]: +
        - listitem [ref=e138]:
          - group [ref=e139]:
            - generic "What does pricing look like?" [ref=e140] [cursor=pointer]:
              - text: What does pricing look like?
              - generic [aria-hidden] [ref=e141]: +
        - listitem [ref=e142]:
          - group [ref=e143]:
            - generic "Do you sign NDAs?" [ref=e144] [cursor=pointer]:
              - text: Do you sign NDAs?
              - generic [aria-hidden] [ref=e145]: +
    - generic [ref=e148]:
      - heading "Bring a goal. Leave with an architecture and a timeline." [level=2] [ref=e149]
      - paragraph [ref=e150]: Thirty minutes, no pitch deck. If we are not the right fit, we will say so on the call.
      - generic [ref=e151]:
        - link "Book a strategy call" [ref=e152] [cursor=pointer]:
          - /url: /book
        - generic [ref=e153]: 30 min, no deck
  - contentinfo [ref=e154]:
    - generic [ref=e155]:
      - generic [ref=e156]:
        - generic [ref=e157]:
          - link "QentrixAI home" [ref=e158] [cursor=pointer]:
            - /url: /
            - generic [ref=e160]: QentrixAI
          - paragraph [ref=e161]: An AI product studio in Lahore, working across 12 time zones.
          - generic [ref=e162]:
            - link "talk@qentrix-ai.com" [ref=e163] [cursor=pointer]:
              - /url: mailto:talk@qentrix-ai.com
            - link "+923196828506" [ref=e164] [cursor=pointer]:
              - /url: tel:+923196828506
            - generic [ref=e165]: Mon to Sat, 9:00-19:00 PKT
        - generic [ref=e166]:
          - generic [ref=e167]:
            - heading "Company" [level=2] [ref=e168]
            - list [ref=e169]:
              - listitem [ref=e170]:
                - link "How we work" [ref=e171] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e172]:
                - link "Careers" [ref=e173] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e174]:
                - link "Case studies" [ref=e175] [cursor=pointer]:
                  - /url: /case-studies
          - generic [ref=e176]:
            - heading "Work" [level=2] [ref=e177]
            - list [ref=e178]:
              - listitem [ref=e179]:
                - link "What we build" [ref=e180] [cursor=pointer]:
                  - /url: /services
              - listitem [ref=e181]:
                - link "Products" [ref=e182] [cursor=pointer]:
                  - /url: /products
              - listitem [ref=e183]:
                - link "Insights" [ref=e184] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e185]:
                - link "Contact" [ref=e186] [cursor=pointer]:
                  - /url: /contact
          - generic [ref=e187]:
            - heading "Legal" [level=2] [ref=e188]
            - list [ref=e189]:
              - listitem [ref=e190]:
                - link "Privacy policy" [ref=e191] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e192]:
                - link "Terms of service" [ref=e193] [cursor=pointer]:
                  - /url: /terms
      - generic [ref=e194]:
        - paragraph [ref=e195]: 2026 QentrixAI. All rights reserved.
        - link "Book a strategy call" [ref=e196] [cursor=pointer]:
          - /url: /book
  - button "Open Next.js Dev Tools" [ref=e202] [cursor=pointer]
  - alert [ref=e206]: Selected work
```

# Test source

```ts
  1  | import { test, expect, type Page } from "@playwright/test";
  2  | 
  3  | /**
  4  |  * Regression guard for the scroll-reveal reinitialising across client-side
  5  |  * navigation.
  6  |  *
  7  |  * `ScrollReveal` lives in the root layout, which the App Router does not
  8  |  * remount when you navigate between routes. With the effect keyed on `[]` it
  9  |  * ran exactly once per full page load: `.js-reveal` stayed on <html> hiding
  10 |  * every `[data-reveal]`, while the ScrollTriggers that reveal them had been
  11 |  * built from a `querySelectorAll` of the *previous* page. Every route you
  12 |  * reached by clicking rendered its cards as empty shells until you refreshed.
  13 |  */
  14 | 
  15 | /** The reveal init is gated on idle or first scroll; nudge it and wait it out. */
  16 | async function settleReveals(page: Page) {
  17 |   await page.mouse.wheel(0, 400);
  18 |   await page.waitForTimeout(2500);
  19 | }
  20 | 
  21 | /**
  22 |  * Walk every reveal target into view, then report the ones still hidden.
  23 |  *
  24 |  * Asserting "nothing is hidden" straight after a short scroll is wrong: an
  25 |  * element two viewports down is *correctly* still hidden, and the assertion
  26 |  * passes or fails on page length rather than on the thing under test. What
  27 |  * matters is that each element reveals once it is actually reached.
  28 |  */
  29 | async function revealAllAndCountHidden(page: Page) {
  30 |   const count = await page.locator("[data-reveal]").count();
  31 |   for (let i = 0; i < count; i++) {
  32 |     await page.evaluate((idx) => {
  33 |       document
  34 |         .querySelectorAll<HTMLElement>("[data-reveal]")
  35 |         [idx]?.scrollIntoView({ block: "center" });
  36 |     }, i);
  37 |     await page.waitForTimeout(150);
  38 |   }
  39 |   await page.waitForTimeout(1200);
  40 |   return page.evaluate(() =>
  41 |     [...document.querySelectorAll<HTMLElement>("[data-reveal]")]
  42 |       .filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.05)
  43 |       .map((el) => el.tagName + "." + String(el.className).slice(0, 40))
  44 |   );
  45 | }
  46 | 
  47 | test.describe("scroll reveal survives client-side navigation", () => {
  48 |   test.skip(
  49 |     ({ browserName }) => browserName !== "chromium",
  50 |     "One engine is enough for a JS-lifecycle regression."
  51 |   );
  52 | 
  53 |   test("content on a navigated-to route is visible without a refresh", async ({ page }) => {
  54 |     await page.goto("/");
  55 |     await settleReveals(page);
  56 | 
  57 |     for (const path of ["/products", "/case-studies", "/"]) {
  58 |       await page.click(`header a[href="${path}"]`);
  59 |       await page.waitForURL(`**${path}`);
  60 |       await page.waitForTimeout(400);
  61 | 
  62 |       expect(
  63 |         await revealAllAndCountHidden(page),
  64 |         `still at opacity 0 on ${path} after navigating to it without a refresh`
> 65 |       ).toEqual([]);
     |         ^ Error: still at opacity 0 on /case-studies after navigating to it without a refresh
  66 |     }
  67 |   });
  68 | 
  69 |   test("reduced motion leaves everything visible and never sets js-reveal", async ({ browser }) => {
  70 |     const ctx = await browser.newContext({ reducedMotion: "reduce" });
  71 |     const page = await ctx.newPage();
  72 |     await page.goto("/");
  73 |     await settleReveals(page);
  74 |     await page.click('header a[href="/products"]');
  75 |     await page.waitForURL("**/products");
  76 |     await page.waitForTimeout(1500);
  77 | 
  78 |     expect(await revealAllAndCountHidden(page)).toEqual([]);
  79 |     expect(
  80 |       await page.evaluate(() => document.documentElement.classList.contains("js-reveal"))
  81 |     ).toBe(false);
  82 |     await ctx.close();
  83 |   });
  84 | });
  85 | 
```