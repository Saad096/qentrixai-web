import { test, expect } from "@playwright/test";
import { ROUTES } from "./routes";

/**
 * The regressions this file exists to catch are the ones the 2026-09 audit
 * found on the live site: pages with no h1, horizontal overflow, broken
 * images, and console errors.
 */
for (const route of ROUTES) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), "route responds 200").toBe(200);

    await expect(page.locator("h1"), "exactly one h1").toHaveCount(1);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1
    );
    expect(overflow, "no horizontal overflow").toBe(false);

    const broken = await page.evaluate(
      () => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length
    );
    expect(broken, "no broken images").toBe(0);

    expect(errors, "no console errors").toEqual([]);
  });
}

test("every page carries structured data", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const types = await page.evaluate(() =>
      [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
        try {
          return JSON.parse(s.textContent || "{}")["@type"];
        } catch {
          return "invalid";
        }
      })
    );
    expect(types, `${route} has JSON-LD`).toContain("Organization");
    expect(types, `${route} has no malformed JSON-LD`).not.toContain("invalid");
  }
});
