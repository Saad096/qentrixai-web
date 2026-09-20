/**
 * axe-core run through Playwright.
 *
 * The @axe-core/cli runner needs chromedriver, which has no macOS 12 build
 * here. Injecting axe-core into a Playwright page runs the identical ruleset
 * against the identical engine, and lets us check both themes in one pass.
 *
 * Usage: node scripts/axe.mjs <base-url> <path> [<path> ...]
 */
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";

const axeSource = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const [, , base, ...paths] = process.argv;
const routes = paths.length ? paths : ["/"];

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "chrome" });
let total = 0;

for (const theme of ["dark", "light"]) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: theme,
  });
  for (const route of routes) {
    const page = await context.newPage();
    // "load" rather than "networkidle": the orb field animates continuously,
    // so on a busy machine the network-idle heuristic can fail to settle and
    // time out on a page that is perfectly fine.
    await page.goto(new URL(route, base).href, { waitUntil: "load", timeout: 45_000 });
    await page.waitForTimeout(400);
    await page.addScriptTag({ content: axeSource });
    const results = await page.evaluate(async () => {
      // @ts-expect-error injected at runtime
      return await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
    });
    const violations = results.violations;
    total += violations.length;
    const mark = violations.length === 0 ? "PASS" : "FAIL";
    console.log(`${mark} ${theme.padEnd(5)} ${route}  (${violations.length} violations)`);
    for (const v of violations) {
      console.log(`   ${v.id} [${v.impact}] ${v.help}`);
      for (const node of v.nodes.slice(0, 3)) {
        console.log(`     ${node.target.join(" ")}`);
        if (node.failureSummary) {
          console.log(`       ${node.failureSummary.replace(/\n/g, "\n       ")}`);
        }
      }
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
console.log(total === 0 ? "\nAll routes clean in both themes." : `\n${total} violation group(s).`);
process.exit(total === 0 ? 0 : 1);
