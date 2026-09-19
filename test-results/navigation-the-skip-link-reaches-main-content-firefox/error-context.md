# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> the skip link reaches main content
- Location: tests/e2e/navigation.spec.ts:38:5

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: page.goto: Test timeout of 45000ms exceeded.
Call log:
  - navigating to "http://127.0.0.1:3311/", waiting until "load"

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
  11 |     await page.goto("/");
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
> 39 |   await page.goto("/");
     |              ^ Error: page.goto: Test timeout of 45000ms exceeded.
  40 |   await page.keyboard.press("Tab");
  41 |   const skip = page.getByRole("link", { name: "Skip to content" });
  42 |   await expect(skip).toBeFocused();
  43 |   await expect(page.locator("#main")).toHaveCount(1);
  44 | });
  45 | 
```