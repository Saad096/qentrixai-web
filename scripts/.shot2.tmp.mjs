import { chromium } from "@playwright/test";
const [, , base, out, ...paths] = process.argv;
const browser = await chromium.launch({ channel: "chrome" });
for (const theme of (process.env.THEMES ?? "light,dark").split(",")) {
  for (const width of (process.env.WIDTHS ?? "1440").split(",").map(Number)) {
    const ctx = await browser.newContext({ viewport: { width, height: 1000 } });
    await ctx.addInitScript((t) => { try { localStorage.setItem("qx-theme", t); } catch {} }, theme);
    for (const route of paths) {
      const page = await ctx.newPage();
      await page.goto(new URL(route, base).href, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForTimeout(1600);
      await page.screenshot({ path: `${out}/${route.replace(/\W+/g, "_")}-${theme}-${width}.png`, clip: { x: 0, y: 0, width, height: 1000 } });
      const ow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (ow > 0) console.log("OVERFLOW", route, theme, width, ow);
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();
console.log("shot ok");
