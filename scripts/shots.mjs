import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const chromePath =
  process.env.HOME +
  "/.cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const outDir = process.argv[2] || "./shots";
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

const browser = await puppeteer.launch({ executablePath: chromePath, headless: true });

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/how-to-play", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  // full page height
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`${vp.name}: page height ${pageHeight}, overflow-x: ${await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)}`);

  // capture viewport-sized slices down the page
  const slices = Math.min(Math.ceil(pageHeight / vp.height), 12);
  for (let i = 0; i < slices; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * vp.height);
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: `${outDir}/${vp.name}-${String(i).padStart(2, "0")}.png` });
  }
  await page.close();
}

await browser.close();
console.log("done");
