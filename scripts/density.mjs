/**
 * Finds the dead space the owner keeps pointing at, by measurement.
 *
 * Two things get reported per route:
 *
 *   GAP     a vertical run of more than 320px inside <main> with nothing
 *           painted in it. That is the "why is this empty" feeling, and it
 *           is what screenshots were being used to find by eye.
 *
 *   NARROW  a section whose content occupies less than 55% of the container
 *           width. That is the other kind of emptiness: a full-width band
 *           with a single column of text pinned to its left edge.
 *
 * Neither is automatically a defect -- a hero wants air, and a measure-capped
 * paragraph is deliberate. It is a list to look at, not a list to fix.
 */
import { chromium } from "@playwright/test";

const [, , base, ...paths] = process.argv;
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
let total = 0;

for (const route of paths) {
  const page = await ctx.newPage();
  await page.goto(new URL(route, base).href, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 2200));
  });

  const found = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const painted = [];
    for (const el of main.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) < 0.05) continue;
      const hasInk =
        (el.childNodes.length &&
          [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) ||
        // tagName is lowercase for inline SVG in an HTML document, so an
        // uppercase-only comparison silently misses every drawing on the
        // page -- which made each hero with art on its right read as a
        // half-empty section.
        ["IMG", "SVG", "VIDEO", "CANVAS", "INPUT", "TEXTAREA", "SELECT"].includes(
          el.tagName.toUpperCase()
        );
      if (!hasInk) continue;
      const r = el.getBoundingClientRect();
      if (r.height < 2 || r.width < 2) continue;
      painted.push({ top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, left: r.left, right: r.right });
    }
    painted.sort((a, b) => a.top - b.top);

    // Vertical gaps.
    const gaps = [];
    let reach = painted.length ? painted[0].bottom : 0;
    for (const p of painted) {
      if (p.top - reach > 320) gaps.push({ from: Math.round(reach), size: Math.round(p.top - reach) });
      reach = Math.max(reach, p.bottom);
    }

    // Sections whose ink uses little of the width available.
    const narrow = [];
    for (const sec of main.querySelectorAll("section")) {
      const sr = sec.getBoundingClientRect();
      if (sr.height < 200) continue;
      const inside = painted.filter((p) => p.top >= sr.top + window.scrollY - 4 && p.bottom <= sr.bottom + window.scrollY + 4);
      if (inside.length < 3) continue;
      const left = Math.min(...inside.map((p) => p.left));
      const right = Math.max(...inside.map((p) => p.right));
      const used = (right - left) / Math.min(sr.width, 1260);
      if (used < 0.55) {
        const h = sec.querySelector("h1,h2,h3");
        narrow.push({ used: Math.round(used * 100), label: (h?.textContent || "").trim().slice(0, 46) });
      }
    }
    return { gaps, narrow, height: Math.round(document.body.scrollHeight) };
  });

  const issues = found.gaps.length + found.narrow.length;
  total += issues;
  if (issues) {
    console.log(`\n${route}  (${found.height}px tall)`);
    for (const g of found.gaps) console.log(`   GAP    ${String(g.size).padStart(5)}px blank from y=${g.from}`);
    for (const n of found.narrow) console.log(`   NARROW ${String(n.used).padStart(3)}% of width used  "${n.label}"`);
  }
  await page.close();
}
await browser.close();
console.log(`\nTOTAL ${total}`);
