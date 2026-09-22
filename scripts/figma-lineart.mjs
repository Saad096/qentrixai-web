/**
 * Emits the plugin-API script that recreates every drawing in drawings.ts as
 * an editable Figma frame.
 *
 * The path data lives in the repo and is rendered by LineArt.tsx. This makes
 * the Figma file a view of that data rather than a second copy of it: change
 * a path here, re-run, and the frames match again.
 *
 *   node scripts/figma-lineart.mjs            # prints the script
 *   node scripts/figma-lineart.mjs --list     # just the keys
 */
import { readFileSync } from "node:fs";

const src = readFileSync("src/components/art/lineart/drawings.ts", "utf8");

// Parse the object literal without importing TS: each entry is
//   key: { structure: [...], accent: [...], dots?: [...] },
const entries = [];
const keyRe = /^\s{2}(?:\/\*\*[\s\S]*?\*\/\s*)?"?([a-z0-9-]+)"?:\s*\{/gim;
let m;
while ((m = keyRe.exec(src))) {
  const start = m.index + m[0].length;
  let depth = 1, i = start;
  while (depth > 0 && i < src.length) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") depth--;
    i++;
  }
  const body = src.slice(start, i - 1);
  const grab = (field) => {
    const f = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]\\s*,?\\s*(?:dots:|accent:|$)`).exec(body);
    if (!f) return [];
    return [...f[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]);
  };
  const dotsRaw = /dots:\s*\[([\s\S]*?)\]\s*,?\s*$/.exec(body);
  const dots = dotsRaw
    ? [...dotsRaw[1].matchAll(/\[\s*(\d+)\s*,\s*(\d+)\s*\]/g)].map((d) => [Number(d[1]), Number(d[2])])
    : [];
  entries.push({ key: m[1], structure: grab("structure"), accent: grab("accent"), dots });
}

if (process.argv.includes("--list")) {
  console.log(entries.map((e) => `${e.key}  structure=${e.structure.length} accent=${e.accent.length} dots=${e.dots.length}`).join("\n"));
  process.exit(0);
}

console.log(JSON.stringify(entries));
