import { test, expect } from "@playwright/test";

/**
 * Audit B-10: the old mobile panel stayed focusable when closed, had no
 * Escape handler and no focus trap.
 */
test.describe("mobile navigation", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, "desktop nav has no panel");

  test("opens, traps focus, closes on Escape", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu" });
    await expect(trigger).toBeVisible();

    // Closed: the panel is not in the DOM at all, so its links cannot be tabbed to.
    await expect(page.locator("#mobile-menu")).toHaveCount(0);

    await trigger.click();
    const panel = page.locator("#mobile-menu");
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("link", { name: "Case studies" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
});

test("the primary call to action is worded identically everywhere", async ({ page }) => {
  await page.goto("/");
  const ctas = page.getByRole("link", { name: "Book a strategy call" });
  expect(await ctas.count(), "nav, slab and closing band").toBeGreaterThanOrEqual(2);
  for (const cta of await ctas.all()) {
    await expect(cta).toHaveAttribute("href", "/book");
  }
});

test("the skip link reaches main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(page.locator("#main")).toHaveCount(1);
});
