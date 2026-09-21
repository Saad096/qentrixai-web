import { chromium } from "@playwright/test";
const [, , base, out, ...paths] = process.argv;
const browser = await chromium.launch({ channel: "chrome" });
for (const theme of (process.env.THEMES ?? "light,dark").split(",")) {
  for (const width of (process.env.WIDTHS ?? "390,1440").split(",").map(Number)) {
    const ctx = await browser.newContext({ viewport: { width, height: 1000 } });
    await ctx.addInitScript((t) => { try { localStorage.setItem("qx-theme", t); } catch {} }, theme);
    for (const route of paths) {
      const page = await ctx.newPage();
      await page.goto(new URL(route, base).href, { waitUntil: "load", timeout: 60000 });
      await page.evaluate(async () => { const h = document.body.scrollHeight; for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 110)); } window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 500)); });
      await page.screenshot({ path: `${out}/${route.replace(/\W+/g, "_")}-${theme}-${width}.png`, fullPage: true });
      const ow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (ow > 0) console.log("OVERFLOW", route, theme, width, ow);
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();
console.log("shot ok");
