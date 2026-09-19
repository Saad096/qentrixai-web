# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> /products/minutely renders cleanly
- Location: tests/e2e/layout.spec.ts:10:7

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: page.goto: Test timeout of 45000ms exceeded.
Call log:
  - navigating to "http://127.0.0.1:3311/products/minutely", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { ROUTES } from "./routes";
  3  | 
  4  | /**
  5  |  * The regressions this file exists to catch are the ones the 2026-09 audit
  6  |  * found on the live site: pages with no h1, horizontal overflow, broken
  7  |  * images, and console errors.
  8  |  */
  9  | for (const route of ROUTES) {
  10 |   test(`${route} renders cleanly`, async ({ page }) => {
  11 |     const errors: string[] = [];
  12 |     page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  13 |     page.on("pageerror", (e) => errors.push(String(e)));
  14 | 
> 15 |     const response = await page.goto(route, { waitUntil: "domcontentloaded" });
     |                                 ^ Error: page.goto: Test timeout of 45000ms exceeded.
  16 |     expect(response?.status(), "route responds 200").toBe(200);
  17 | 
  18 |     await expect(page.locator("h1"), "exactly one h1").toHaveCount(1);
  19 | 
  20 |     const overflow = await page.evaluate(
  21 |       () => document.documentElement.scrollWidth > window.innerWidth + 1
  22 |     );
  23 |     expect(overflow, "no horizontal overflow").toBe(false);
  24 | 
  25 |     const broken = await page.evaluate(
  26 |       () => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length
  27 |     );
  28 |     expect(broken, "no broken images").toBe(0);
  29 | 
  30 |     expect(errors, "no console errors").toEqual([]);
  31 |   });
  32 | }
  33 | 
  34 | test("every page carries structured data", async ({ page }) => {
  35 |   for (const route of ROUTES) {
  36 |     await page.goto(route, { waitUntil: "domcontentloaded" });
  37 |     const types = await page.evaluate(() =>
  38 |       [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
  39 |         try {
  40 |           return JSON.parse(s.textContent || "{}")["@type"];
  41 |         } catch {
  42 |           return "invalid";
  43 |         }
  44 |       })
  45 |     );
  46 |     expect(types, `${route} has JSON-LD`).toContain("Organization");
  47 |     expect(types, `${route} has no malformed JSON-LD`).not.toContain("invalid");
  48 |   }
  49 | });
  50 | 
```