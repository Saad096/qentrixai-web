# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> reduced motion is respected
- Location: tests/e2e/theme.spec.ts:23:5

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
  3  | test.describe("dual theme", () => {
  4  |   test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "toggle is in the desktop header row");
  5  | 
  6  |   test("toggles and persists", async ({ page }) => {
  7  |     await page.goto("/");
  8  |     const html = page.locator("html");
  9  |     const startedLight = await html.evaluate((el) => el.classList.contains("light"));
  10 | 
  11 |     await page.getByRole("button", { name: /Switch to (light|dark) theme/ }).click();
  12 |     await expect(html).toHaveClass(startedLight ? /^(?!.*\blight\b).*$/ : /\blight\b/);
  13 | 
  14 |     const stored = await page.evaluate(() => localStorage.getItem("qx-theme"));
  15 |     expect(["light", "dark"]).toContain(stored);
  16 | 
  17 |     await page.reload();
  18 |     const afterReload = await page.evaluate(() => localStorage.getItem("qx-theme"));
  19 |     expect(afterReload, "preference survives reload").toBe(stored);
  20 |   });
  21 | });
  22 | 
  23 | test("reduced motion is respected", async ({ page }) => {
  24 |   await page.emulateMedia({ reducedMotion: "reduce" });
> 25 |   await page.goto("/");
     |              ^ Error: page.goto: Test timeout of 45000ms exceeded.
  26 |   const duration = await page
  27 |     .locator("h1")
  28 |     .evaluate((el) => getComputedStyle(el).animationDuration);
  29 |   expect(parseFloat(duration)).toBeLessThan(0.01);
  30 | });
  31 | 
```