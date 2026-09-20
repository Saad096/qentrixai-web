import { test, expect, type Page } from "@playwright/test";

/**
 * Regression guard for the scroll-reveal reinitialising across client-side
 * navigation.
 *
 * `ScrollReveal` lives in the root layout, which the App Router does not
 * remount when you navigate between routes. With the effect keyed on `[]` it
 * ran exactly once per full page load: `.js-reveal` stayed on <html> hiding
 * every `[data-reveal]`, while the ScrollTriggers that reveal them had been
 * built from a `querySelectorAll` of the *previous* page. Every route you
 * reached by clicking rendered its cards as empty shells until you refreshed.
 */

/** The reveal init is gated on idle or first scroll; nudge it and wait it out. */
async function settleReveals(page: Page) {
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(2500);
}

/**
 * Walk every reveal target into view, then report the ones still hidden.
 *
 * Asserting "nothing is hidden" straight after a short scroll is wrong: an
 * element two viewports down is *correctly* still hidden, and the assertion
 * passes or fails on page length rather than on the thing under test. What
 * matters is that each element reveals once it is actually reached.
 */
async function revealAllAndCountHidden(page: Page) {
  const count = await page.locator("[data-reveal]").count();
  for (let i = 0; i < count; i++) {
    await page.evaluate((idx) => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        [idx]?.scrollIntoView({ block: "center" });
    }, i);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(1200);
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("[data-reveal]")]
      .filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.05)
      .map((el) => el.tagName + "." + String(el.className).slice(0, 40))
  );
}

test.describe("scroll reveal survives client-side navigation", () => {
  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "One engine is enough for a JS-lifecycle regression."
  );

  test("content on a navigated-to route is visible without a refresh", async ({ page }) => {
    await page.goto("/");
    await settleReveals(page);

    for (const path of ["/products", "/case-studies", "/"]) {
      await page.click(`header a[href="${path}"]`);
      await page.waitForURL(`**${path}`);
      await page.waitForTimeout(400);

      expect(
        await revealAllAndCountHidden(page),
        `still at opacity 0 on ${path} after navigating to it without a refresh`
      ).toEqual([]);
    }
  });

  test("reduced motion leaves everything visible and never sets js-reveal", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    await settleReveals(page);
    await page.click('header a[href="/products"]');
    await page.waitForURL("**/products");
    await page.waitForTimeout(1500);

    expect(await revealAllAndCountHidden(page)).toEqual([]);
    expect(
      await page.evaluate(() => document.documentElement.classList.contains("js-reveal"))
    ).toBe(false);
    await ctx.close();
  });
});
