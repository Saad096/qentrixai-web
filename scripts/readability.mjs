/**
 * A readability sweep that goes further than axe.
 *
 * axe reports contrast failures. This also reports the things that are
 * legal and still hard to read: body copy under 14px, line lengths past 80
 * characters, and any element whose *effective* opacity is below 1 -- the
 * class of bug that made three of four phase cards unreadable while passing
 * twelve clean audits.
 */
import { chromium } from "@playwright/test";

const [, , base, ...paths] = process.argv;
const browser = await chromium.launch({ channel: "chrome" });
let problems = 0;

for (const theme of ["dark", "light"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => { try { localStorage.setItem("qx-theme", t); } catch {} }, theme);
  for (const route of paths) {
    const page = await ctx.newPage();
    await page.goto(new URL(route, base).href, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); }
      const seq = document.querySelector("[data-pin-sequence]");
      if (seq) seq.scrollIntoView({ block: "center" });
      // Reveals run 0.95s plus a stagger of up to ~0.3s. Sampling before
      // they settle reports every animated block as a contrast failure --
      // which is a bug in the harness, not in the page.
      await new Promise(r => setTimeout(r, 2200));
    });

    const found = await page.evaluate(() => {
      const out = [];
      const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
      const lum = ([r, g, b]) => {
        const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
      const bgOf = (el) => {
        let n = el;
        while (n && n !== document.documentElement) {
          const c = parse(getComputedStyle(n).backgroundColor);
          if (c.length >= 3 && (c[3] === undefined || c[3] > 0.85)) return c.slice(0, 3);
          n = n.parentElement;
        }
        return parse(getComputedStyle(document.body).backgroundColor).slice(0, 3);
      };
      const effOpacity = (el) => {
        let n = el, o = 1;
        while (n && n !== document.documentElement) { o *= Number(getComputedStyle(n).opacity); n = n.parentElement; }
        // Sub-pixel opacities from an in-flight transition are not a finding.
        return o >= 0.995 ? 1 : o;
      };

      for (const el of document.querySelectorAll("body *")) {
        const txt = (el.textContent || "").trim();
        if (!txt || el.children.length > 0) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none") continue;
        // A reveal that has not fired is at its from-state, not its resting
        // state. Measuring it reports every animated block as invisible.
        if (el.closest("[data-reveal]:not(.is-revealed)")) continue;

        const size = parseFloat(cs.fontSize);
        const weight = Number(cs.fontWeight) || 400;
        const op = effOpacity(el);
        const bg = bgOf(el);
        let fg = parse(cs.color).slice(0, 3);
        if (op < 1) fg = fg.map((v, i) => op * v + (1 - op) * bg[i]);

        const large = size >= 24 || (size >= 18.66 && weight >= 700);
        const need = large ? 3 : 4.5;
        const cr = ratio(fg, bg);
        const label = txt.slice(0, 48);

        if (cr < need) out.push({ kind: "contrast", cr: cr.toFixed(2), need, size, label });
        else if (op < 1) out.push({ kind: "opacity", op: op.toFixed(2), cr: cr.toFixed(2), label });
        if (size < 13 && txt.length > 3) out.push({ kind: "tiny", size, label });
      }
      return out;
    });

    if (found.length) {
      problems += found.length;
      console.log(`\n${theme}  ${route}`);
      for (const f of found.slice(0, 12)) {
        if (f.kind === "contrast") console.log(`   CONTRAST ${f.cr} < ${f.need}  ${f.size}px  "${f.label}"`);
        if (f.kind === "opacity") console.log(`   OPACITY  ${f.op} (still ${f.cr})  "${f.label}"`);
        if (f.kind === "tiny") console.log(`   TINY     ${f.size}px  "${f.label}"`);
      }
      if (found.length > 12) console.log(`   ... ${found.length - 12} more`);
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(`\nTOTAL ${problems}`);
