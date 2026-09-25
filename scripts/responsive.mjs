/**
 * Responsive check that catches CLIPPED overflow, not just scrollable overflow.
 *
 * Why this exists: every sweep in this project measured
 * `document.documentElement.scrollWidth - window.innerWidth` and reported
 * clean, while the deployed hero was 664px wide in a 390px viewport. Both
 * were true. When an ancestor clips (overflow:hidden, or the root in some
 * mobile engines), the document never grows, so the page does not scroll
 * sideways -- it just loses the right-hand side of everything. The reader
 * sees text and video sliced off; the old check sees 390 === 390 and passes.
 *
 * So this measures ELEMENTS against the viewport instead of the document
 * against the window, and runs under real device emulation rather than a
 * narrow desktop window, because device pixel ratio and the mobile UA change
 * layout.
 *
 *   node scripts/responsive.mjs http://localhost:3000 / /about /services
 */
import { chromium, devices } from "@playwright/test";

const [, , base, ...paths] = process.argv;
if (!base) {
  console.error("usage: node scripts/responsive.mjs <base-url> [routes...]");
  process.exit(1);
}
const routes = paths.length ? paths : ["/"];

/* Real devices, plus two bare widths for the desktop end. */
const TARGETS = [
  ["iPhone SE", devices["iPhone SE"]],
  ["iPhone 13", devices["iPhone 13"]],
  ["Pixel 5", devices["Pixel 5"]],
  ["iPad Mini", devices["iPad Mini"]],
  ["laptop 1366", { viewport: { width: 1366, height: 768 } }],
  ["desktop 1920", { viewport: { width: 1920, height: 1080 } }],
];

const browser = await chromium.launch();
let total = 0;

for (const [label, target] of TARGETS) {
  const ctx = await browser.newContext(target);
  for (const route of routes) {
    const page = await ctx.newPage();
    await page.goto(new URL(route, base).href, { waitUntil: "networkidle", timeout: 60000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(250);

    const found = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const out = [];
      for (const el of document.querySelectorAll("body *")) {
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none") continue;
        if (b.right <= vw + 1) continue;

        /* Past the edge only matters when the thing sticking out is
           something a reader loses. Two earlier rules both got this wrong:
           checking document.scrollWidth missed it entirely, because a
           clipped page never grows; and skipping anything inside a clipping
           ancestor missed it too, because the broken hero WAS clipped --
           that is precisely why its text was sliced off rather than
           scrollable.
        
           So the test is what the element carries. An element with its own
           text, or a video or image, is content: if its box runs past the
           edge, words and pictures are being cut. A bare wrapper is not --
           the rotating squares behind the domain orbit bleed by design
           while every label inside them stays in the ring. */
        const ownText = [...el.childNodes].some(
          (n) => n.nodeType === 3 && n.textContent.trim().length > 1
        );
        const isMedia = ["IMG", "VIDEO", "CANVAS", "INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
        if (ownText || isMedia) {
          out.push({
            tag: el.tagName,
            cls: (el.className.baseVal ?? el.className ?? "").toString().slice(0, 50),
            width: Math.round(b.width),
            right: Math.round(b.right),
            over: Math.round(b.right - vw),
          });
        }
      }
      /* Report the widest offender per class, not every descendant of it. */
      const byClass = new Map();
      for (const o of out) if (!byClass.has(o.cls) || byClass.get(o.cls).over < o.over) byClass.set(o.cls, o);
      return { vw, offenders: [...byClass.values()].sort((a, b) => b.over - a.over) };
    });

    if (found.offenders.length) {
      total += found.offenders.length;
      console.log(`FAIL ${label} (${found.vw}px) ${route}`);
      for (const o of found.offenders.slice(0, 6)) {
        console.log(`   ${o.tag} ${o.width}px wide, ${o.over}px past the edge  .${o.cls}`);
      }
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(`TOTAL ${total}`);
