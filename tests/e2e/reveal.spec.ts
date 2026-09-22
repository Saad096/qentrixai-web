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
 * Walk the page the way a reader does, then report any reveal still hidden.
 *
 * Asserting "nothing is hidden" straight after a short scroll is wrong: an
 * element two viewports down is *correctly* still hidden, and the assertion
 * passes or fails on page length rather than on the thing under test. What
 * matters is that each element reveals once it is actually reached.
 *
 * This used to scroll each target individually with a 150ms wait each. The
 * homepage carried 23 reveal targets when that was written and carries 95
 * now, so the walk alone took ~14s per visit and the spec started failing on
 * its 45s timeout -- a test that outgrew the page rather than a regression.
 * Scrolling in viewport steps covers the same ground, is closer to what a
 * reader does, and is bounded by page height instead of element count.
 */
async function revealAllAndCountHidden(page: Page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  // Reveals run 0.95s plus a stagger; sample before they land and every
  // animated block reads as hidden.
  await page.waitForTimeout(1600);
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("[data-reveal]")]
      .filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.05)
      .map((el) => el.tagName + "." + String(el.className).slice(0, 40))
  );
}

test.describe("scroll reveal survives client-side navigation", () => {
  /* This one deliberately walks three whole pages, and the homepage alone
     went from 23 reveal targets to 95 over the revamp. The 45s default is a
     per-test budget sized for a single route, so this spec buys its own
     rather than the walk being trimmed until it stops testing anything. */
  test.setTimeout(150_000);
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
