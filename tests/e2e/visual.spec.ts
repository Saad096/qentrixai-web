import { expect, test } from "@playwright/test";
import { ROUTES } from "./routes";

/**
 * The checks that catch what this visual overhaul is most likely to break.
 *
 * The three new decorative layers (`ground-wash`, `grain`, and the progress
 * line) are absolutely positioned behind content. The classic ways that go
 * wrong are: a layer escapes its container and widens the document, or it
 * loses `pointer-events: none` and silently eats clicks on the CTA. Neither
 * shows up in a screenshot, and neither is something axe checks.
 */
for (const route of ROUTES) {
  test(`${route} has no horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("the motion layer logs no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  // A bare "Failed to load resource" console line does not say what failed,
  // which makes the failure useless. Record the URL and status too.
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`);
  });

  await page.goto("/");
  // Scroll the whole page so every ScrollTrigger, the parallax and the
  // progress line all actually run.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        let y = 0;
        const step = setInterval(() => {
          window.scrollTo(0, (y += 800));
          if (y > document.body.scrollHeight) {
            clearInterval(step);
            resolve();
          }
        }, 50);
      })
  );
  await page.waitForTimeout(900);

  expect(errors).toEqual([]);
});

test("decorative grounds do not intercept clicks", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Book a strategy call/i }).first().click();
  await expect(page).toHaveURL(/\/(book|contact)/);
});

test("the stat counters settle on their real values", async ({ page, request }) => {
  // Two separate guarantees, so a failure says which one broke.
  //
  // 1. The served HTML carries the final value, for crawlers and for anyone
  //    without JS. Checked on the response, not the live DOM -- by the time
  //    the DOM is queryable the counter is already mid-animation.
  const html = await (await request.get("/")).text();
  expect(html).toContain("25+");

  // 2. The animation lands back on that value rather than stopping short.
  await page.goto("/");
  await page.waitForTimeout(1600);
  await expect(page.getByText("25+", { exact: true }).first()).toBeVisible();
});
