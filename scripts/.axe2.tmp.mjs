import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
const axeSource = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const [, , base, ...paths] = process.argv;
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "chrome" });
let total = 0;
for (const theme of ["dark", "light"]) {
  for (const width of [390, 768, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    await ctx.addInitScript((t) => { try { localStorage.setItem("qx-theme", t); } catch {} }, theme);
    for (const route of paths) {
      const page = await ctx.newPage();
      await page.goto(new URL(route, base).href, { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(500);
      const isLight = await page.evaluate(() => document.documentElement.classList.contains("light"));
      await page.addScriptTag({ content: axeSource });
      const r = await page.evaluate(() => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a","wcag2aa","wcag21a","wcag21aa"] } }));
      total += r.violations.length;
      console.log(`${r.violations.length ? "FAIL" : "PASS"} ${theme.padEnd(5)} ${String(width).padEnd(5)} ${route} (${r.violations.length}) [rendered=${isLight ? "light" : "dark"}]`);
      for (const v of r.violations) {
        console.log(`   ${v.id} [${v.impact}] ${v.help}`);
        for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(" ")} :: ${(n.failureSummary||"").split("\n").slice(0,2).join(" | ")}`);
      }
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();
console.log(`\nTOTAL ${total}`);
