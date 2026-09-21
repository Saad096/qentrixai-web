import { chromium } from "@playwright/test";
const routes = process.argv.slice(3);
const b = await chromium.launch({ channel: "chrome" });
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
for (const r of routes) {
  const p = await c.newPage();
  await p.goto(new URL(r, process.argv[2]).href, { waitUntil: "load", timeout: 60000 });
  const d = await p.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const t = main.innerText.replace(/\s+/g, " ").trim();
    return {
      words: t.split(" ").length,
      h2: [...main.querySelectorAll("h2")].length,
      sections: [...main.querySelectorAll("section")].length,
      paras: [...main.querySelectorAll("p")].filter(e => e.innerText.trim().split(/\s+/).length > 12).length,
      h2s: [...main.querySelectorAll("h2")].map(h => h.innerText.trim()).slice(0, 14),
    };
  });
  console.log(`${r.padEnd(26)} ${String(d.words).padStart(5)}w  ${String(d.sections).padStart(2)}sec ${String(d.h2).padStart(2)}h2 ${String(d.paras).padStart(2)}para`);
  console.log("      " + d.h2s.join(" | "));
  await p.close();
}
await b.close();
