/**
 * Content audit. Reads the rendered pages and reports what the copy deck in
 * CLAUDE.md §7.1 actually asks for, instead of judging prose by eye.
 *
 * Checks:
 *   BANNED     the buzzword list, which is the fastest tell of generated copy
 *   LONG       sentences over 28 words; the deck asks for a 20-word average
 *   REPEAT     a sentence appearing on three or more pages, which is how a
 *              claim stops being read
 *   HEDGE      filler openers that delay the point
 *   PASSIVE    "is/are/was/were <verb>ed by", where an actor went missing
 *
 * None of these are automatic defects. It is a list to read, not a list to
 * fix blind: "transform" is banned as marketing and fine in "transform the
 * payload".
 */
import { chromium } from "@playwright/test";

const BANNED = [
  "cutting-edge", "cutting edge", "seamless", "seamlessly", "unlock", "unlocks",
  "revolutionary", "revolutionize", "revolutionise", "leverage", "leveraging",
  "empower", "empowers", "empowering", "game-changing", "best-in-class",
  "world-class", "state-of-the-art", "synergy", "holistic", "robust solution",
  "end-to-end solution", "bespoke solution", "tailored solution", "harness the power",
  "in today's", "in this digital age", "ever-evolving", "paradigm",
];
const HEDGE = [
  "we are a leading", "we are a premier", "we pride ourselves",
  "it is important to note", "needless to say", "at the end of the day",
  "when it comes to", "in order to",
];

const [, , base, ...paths] = process.argv;
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const sentenceIndex = new Map();
let issues = 0;
const report = [];

for (const route of paths) {
  const page = await ctx.newPage();
  await page.goto(new URL(route, base).href, { waitUntil: "domcontentloaded", timeout: 60000 });
  // Collect per-block text rather than one innerText blob. innerText joins
  // adjacent blocks without punctuation, so a heading followed by a
  // paragraph reads as one sentence and every page looked full of 200-word
  // run-ons. Each block is its own unit here, which is what a sentence
  // length check needs to mean anything.
  const blocks = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const sel = "p, li, h1, h2, h3, h4, dd, dt, figcaption, blockquote, summary";
    return [...main.querySelectorAll(sel)]
      .filter((el) => !el.closest("nav, footer"))
      // Leaf-ish only: a <li> wrapping three <p> would otherwise be counted
      // once as itself and again as each child.
      .filter((el) => !el.querySelector(sel))
      .map((el) => (el.textContent || "").replace(/\s+/g, " ").trim())
      .filter((t) => t.length > 0);
  });
  const text = blocks.join(" ");
  await page.close();

  const found = [];
  const lower = text.toLowerCase();
  for (const w of BANNED) if (lower.includes(w)) found.push(`BANNED   "${w}"`);
  for (const w of HEDGE) if (lower.includes(w)) found.push(`HEDGE    "${w}"`);

  const sentences = blocks
    .flatMap((b) => b.split(/(?<=[.!?])\s+/))
    .filter((s) => s.split(/\s+/).length > 3);
  for (const s of sentences) {
    const n = s.split(/\s+/).length;
    if (n > 28) found.push(`LONG     ${n}w  "${s.slice(0, 92)}…"`);
    const key = s.trim().toLowerCase();
    if (key.length > 40) {
      const set = sentenceIndex.get(key) ?? new Set();
      set.add(route);
      sentenceIndex.set(key, set);
    }
    if (/\b(is|are|was|were|been|being)\s+\w+ed\s+by\b/i.test(s)) {
      found.push(`PASSIVE  "${s.slice(0, 80)}…"`);
    }
  }

  const words = text.split(/\s+/).length;
  const avg = sentences.length ? Math.round(words / sentences.length) : 0;
  if (found.length) {
    issues += found.length;
    report.push(`\n${route}  (${words}w, ${avg}w/sentence)`);
    for (const f of found.slice(0, 10)) report.push("   " + f);
    if (found.length > 10) report.push(`   ... ${found.length - 10} more`);
  }
}
await browser.close();

const repeats = [...sentenceIndex.entries()].filter(([, set]) => set.size >= 3);
console.log(report.join("\n"));
if (repeats.length) {
  console.log(`\nREPEATED across 3+ pages (${repeats.length}):`);
  for (const [s, set] of repeats.slice(0, 12)) {
    console.log(`   ${set.size}x  "${s.slice(0, 84)}…"`);
  }
}
console.log(`\nTOTAL ${issues + repeats.length}`);
