/**
 * Which files under public/ does the site actually serve?
 *
 * Two kinds of reference are easy to miss and both exist here, so neither is
 * inferred from a plain path grep:
 *
 *   Derived   Illustration renders `src` and computes `src-dark.svg` from it
 *             at runtime, so the dark twin's name never appears in any file.
 *   Built     Industry and product art is written as `${DIR}/name.webp`, so
 *             only the basename is ever literal.
 *
 * `--move <dir>` relocates everything unreferenced instead of listing it.
 */
import { readdirSync, readFileSync, statSync, mkdirSync, renameSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const walk = (d, out = []) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};

const src = walk("src")
  .filter((f) => /\.(tsx?|css|mjs)$/.test(f))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");

/* Served by a route handler rather than named in the source. */
const DYNAMIC = [/^\/resume\//];

function isUsed(abs) {
  const rel = "/" + relative("public", abs);
  const base = rel.split("/").pop();
  if (DYNAMIC.some((re) => re.test(rel))) return true;
  if (src.includes(rel) || src.includes(base)) return true;
  if (/-dark\.svg$/.test(base)) return src.includes(base.replace("-dark.svg", ".svg"));
  return false;
}

const assets = walk("public");
const unused = assets.filter((a) => !isUsed(a));
const size = (p) => statSync(p).size;
const mb = (n) => (n / 1e6).toFixed(2) + "MB";
const total = (l) => l.reduce((n, p) => n + size(p), 0);

const moveTo = process.argv.includes("--move")
  ? process.argv[process.argv.indexOf("--move") + 1]
  : null;

console.log(`public/: ${assets.length} files, ${mb(total(assets))}`);
console.log(`  served:   ${assets.length - unused.length} files, ${mb(total(assets) - total(unused))}`);
console.log(`  unused:   ${unused.length} files, ${mb(total(unused))}`);

for (const u of unused.sort((a, b) => size(b) - size(a))) {
  const rel = relative("public", u);
  if (moveTo) {
    const dest = join(moveTo, rel);
    mkdirSync(dirname(dest), { recursive: true });
    renameSync(u, dest);
    console.log(`  moved  ${rel}`);
  } else {
    console.log(`  ${(size(u) / 1024).toFixed(0).padStart(6)}KB  ${rel}`);
  }
}
if (!moveTo && unused.length) console.log(`\nRe-run with --move <dir> to relocate them.`);
