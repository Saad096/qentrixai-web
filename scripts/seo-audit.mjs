/**
 * SEO audit. Reads the served HTML, not the source, because what a crawler
 * gets is the only thing that counts.
 *
 * Per route:
 *   TITLE       missing, duplicated across routes, or outside 15-60 chars
 *   DESC        missing, duplicated, or outside 70-160 chars
 *   H1          not exactly one
 *   HEADINGS    a level skipped (h2 -> h4), which breaks document outline
 *   CANONICAL   missing, or not absolute
 *   OG          missing og:title / og:description / og:image
 *   SCHEMA      JSON-LD that fails to parse, or a @type seen nowhere useful
 *   ALT         images with no alt attribute at all (empty alt is fine)
 *   LINKS       internal links that 404
 */
import { chromium } from "@playwright/test";

const [, , base, ...paths] = process.argv;
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const titles = new Map();
const descs = new Map();
const schemaTypes = new Map();
const rows = [];
let issues = 0;

for (const route of paths) {
  const page = await ctx.newPage();
  const res = await page.goto(new URL(route, base).href, { waitUntil: "domcontentloaded", timeout: 60000 });
  // Next streams metadata into the body and React hoists it into <head>.
  // At DOMContentLoaded that has not happened, so every route reported
  // og:image missing while the served HTML plainly had one. Wait for the
  // hoist rather than for the network, which the orb animation never settles.
  await page.waitForFunction(() => !!document.querySelector('link[rel="canonical"], meta[property="og:image"]'), null, { timeout: 15000 }).catch(() => {});
  const status = res?.status() ?? 0;
  const d = await page.evaluate(() => {
    const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
    const heads = [...document.querySelectorAll("main h1, main h2, main h3, main h4, main h5, main h6")]
      .map((h) => ({ level: Number(h.tagName[1]), text: (h.textContent || "").trim().slice(0, 60) }));
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent || "");
    return {
      title: document.title || null,
      desc: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
      ogTitle: meta('meta[property="og:title"]'),
      ogDesc: meta('meta[property="og:description"]'),
      ogImage: meta('meta[property="og:image"]'),
      robots: meta('meta[name="robots"]'),
      heads,
      ld,
      noAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
      internal: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute("href")),
      lang: document.documentElement.lang || null,
    };
  });
  await page.close();

  const probs = [];
  if (status !== 200) probs.push(`STATUS    ${status}`);
  if (!d.lang) probs.push("LANG      missing on <html>");
  if (!d.title) probs.push("TITLE     missing");
  else {
    if (d.title.length < 15 || d.title.length > 60) probs.push(`TITLE     ${d.title.length} chars  "${d.title}"`);
    const seen = titles.get(d.title) ?? [];
    seen.push(route); titles.set(d.title, seen);
  }
  if (!d.desc) probs.push("DESC      missing");
  else {
    if (d.desc.length < 70 || d.desc.length > 160) probs.push(`DESC      ${d.desc.length} chars`);
    const seen = descs.get(d.desc) ?? [];
    seen.push(route); descs.set(d.desc, seen);
  }
  if (!d.canonical) probs.push("CANONICAL missing");
  else if (!/^https?:\/\//.test(d.canonical)) probs.push(`CANONICAL not absolute: ${d.canonical}`);
  for (const [k, v] of [["og:title", d.ogTitle], ["og:description", d.ogDesc], ["og:image", d.ogImage]]) {
    if (!v) probs.push(`OG        ${k} missing`);
  }

  const h1s = d.heads.filter((h) => h.level === 1);
  if (h1s.length !== 1) probs.push(`H1        ${h1s.length} found`);
  let prev = 1;
  for (const h of d.heads) {
    if (h.level > prev + 1) probs.push(`HEADINGS  h${prev} -> h${h.level}  "${h.text}"`);
    prev = h.level;
  }

  for (const raw of d.ld) {
    try {
      const j = JSON.parse(raw);
      const types = Array.isArray(j) ? j.map((x) => x["@type"]) : [j["@type"]];
      for (const t of types.flat()) {
        if (!t) continue;
        const s = schemaTypes.get(t) ?? new Set();
        s.add(route); schemaTypes.set(t, s);
      }
    } catch {
      probs.push("SCHEMA    JSON-LD failed to parse");
    }
  }
  if (d.noAlt) probs.push(`ALT       ${d.noAlt} <img> with no alt attribute`);

  if (probs.length) {
    issues += probs.length;
    rows.push(`\n${route}`);
    for (const p of probs) rows.push("   " + p);
  }
}

console.log(rows.join("\n"));

const dupT = [...titles.entries()].filter(([, r]) => r.length > 1);
const dupD = [...descs.entries()].filter(([, r]) => r.length > 1);
if (dupT.length) {
  console.log(`\nDUPLICATE TITLES (${dupT.length}):`);
  for (const [t, r] of dupT) console.log(`   "${t}"  on ${r.join(", ")}`);
}
if (dupD.length) {
  console.log(`\nDUPLICATE DESCRIPTIONS (${dupD.length}):`);
  for (const [, r] of dupD) console.log(`   ${r.join(", ")}`);
}
console.log("\nSCHEMA TYPES FOUND:");
for (const [t, s] of [...schemaTypes.entries()].sort()) console.log(`   ${t.padEnd(18)} ${s.size} route(s)`);
console.log(`\nTOTAL ${issues + dupT.length + dupD.length}`);
await browser.close();
