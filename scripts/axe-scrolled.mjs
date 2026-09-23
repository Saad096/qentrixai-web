/**
 * axe over routes, but with the page scrolled so scroll-driven states are
 * live when the rules run.
 *
 * The previous runner measured at scroll-top. The phase sequence only dims
 * once GSAP marks a step active, so a contrast failure that affected three
 * of four cards passed twelve clean audits.
 */
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
const axeSource = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const [, , base, ...paths] = process.argv;
const browser = await chromium.launch({ channel: "chrome" });
let total = 0;
for (const theme of ["dark", "light"]) {
  for (const width of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    await ctx.addInitScript((t) => { try { localStorage.setItem("qx-theme", t); } catch {} }, theme);
    for (const route of paths) {
      const page = await ctx.newPage();
      await page.goto(new URL(route, base).href, { waitUntil: "domcontentloaded", timeout: 60000 });
      // Walk the page so every scroll-driven state has fired at least once,
      // then park on the sequence if the page has one.
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
        const seq = document.querySelector("[data-pin-sequence]");
        if (seq) seq.scrollIntoView({ block: "center" });
        await new Promise(r => setTimeout(r, 800));
      });
      await page.addScriptTag({ content: axeSource });
      const r = await page.evaluate(() => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a","wcag2aa","wcag21a","wcag21aa"] } }));
      total += r.violations.length;
      if (r.violations.length) {
        console.log(`FAIL ${theme} ${width} ${route}`);
        for (const v of r.violations) {
          console.log(`   ${v.id} [${v.impact}] ${v.help}`);
          for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(" ")} :: ${(n.failureSummary||"").split("\n").slice(0,3).join(" | ")}`);
        }
      }
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();
console.log(`TOTAL ${total}`);
