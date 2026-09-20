/**
 * Full-page screenshot helper for the revamp QA loop.
 *
 * Scrolls the page first so lazy images and scroll-triggered reveals have
 * fired, then returns to the top and captures. Also reports horizontal
 * overflow, which is the check that catches most responsive breakage.
 *
 * Usage: node scripts/shot.mjs <url> <out.png> <width> <height> [dark|light]
 */
import { chromium } from "@playwright/test";

/**
 * This host is macOS 12, which Playwright 1.63 no longer ships a bundled
 * Chromium for. The locally installed Google Chrome is used instead; it is
 * the same engine, so the rendering evidence is equivalent.
 */
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";

const [, , url, out, width, height, theme = "dark"] = process.argv;

const browser = await chromium.launch({ channel: CHANNEL });

/**
 * The theme is driven by the system colour scheme when no preference is
 * stored, so emulating `colorScheme` is what actually selects the theme.
 * Setting localStorage from an init script races the pre-paint bootstrap.
 */
const context = await browser.newContext({
  viewport: { width: +width, height: +height },
  colorScheme: theme === "light" ? "light" : "dark",
});
const page = await context.newPage();

await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });

await page.evaluate(
  () =>
    new Promise((resolve) => {
      let y = 0;
      const step = setInterval(() => {
        window.scrollTo(0, (y += 600));
        if (y > document.body.scrollHeight) {
          clearInterval(step);
          resolve();
        }
      }, 60);
    })
);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1200);

await page.screenshot({ path: out, fullPage: true });

const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - window.innerWidth
);
const tall = await page.evaluate(() => document.body.scrollHeight);
console.log(`overflow:${overflow}px height:${tall}px -> ${out}`);

await browser.close();
