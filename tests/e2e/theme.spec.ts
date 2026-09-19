import { test, expect } from "@playwright/test";

test.describe("dual theme", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "toggle is in the desktop header row");

  test("toggles and persists", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const startedLight = await html.evaluate((el) => el.classList.contains("light"));

    await page.getByRole("button", { name: /Switch to (light|dark) theme/ }).click();
    await expect(html).toHaveClass(startedLight ? /^(?!.*\blight\b).*$/ : /\blight\b/);

    const stored = await page.evaluate(() => localStorage.getItem("qx-theme"));
    expect(["light", "dark"]).toContain(stored);

    await page.reload();
    const afterReload = await page.evaluate(() => localStorage.getItem("qx-theme"));
    expect(afterReload, "preference survives reload").toBe(stored);
  });
});

test("reduced motion is respected", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const duration = await page
    .locator("h1")
    .evaluate((el) => getComputedStyle(el).animationDuration);
  expect(parseFloat(duration)).toBeLessThan(0.01);
});
