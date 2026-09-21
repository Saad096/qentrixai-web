import sharp from "sharp";
import { readdirSync } from "node:fs";
const dir = process.argv[2];
for (const f of readdirSync(dir).filter(n => n.endsWith(".png"))) {
  const { width, height } = await sharp(`${dir}/${f}`).metadata();
  const n = Math.ceil(height / 1800);
  for (let i = 0; i < n; i++) {
    const top = i * 1800, h = Math.min(1800, height - top);
    await sharp(`${dir}/${f}`).extract({ left: 0, top, width, height: h }).resize({ width: Math.min(width, 880) }).jpeg({ quality: 66 }).toFile(`${dir}/sl-${f.replace(".png","")}-${i}.jpg`);
  }
}
