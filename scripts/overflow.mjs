import puppeteer from "puppeteer-core";

const chromePath =
  process.env.HOME +
  "/.cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
const page = await browser.newPage();

for (const width of [375, 768, 1024, 1440]) {
  await page.setViewport({ width, height: 1000 });
  await page.goto("http://localhost:3001/how-to-play", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));
  const offenders = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const wide = [];
    document.querySelectorAll("*").forEach((el) => {
      const box = el.getBoundingClientRect();
      if (box.right > viewportWidth + 1 || box.left < -1) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed") return;
        wide.push(
          `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 70)} [${Math.round(box.left)}..${Math.round(box.right)}]`,
        );
      }
    });
    return { scrollW: document.documentElement.scrollWidth, clientW: viewportWidth, wide: wide.slice(0, 12) };
  });
  console.log(width, "scrollW", offenders.scrollW, "clientW", offenders.clientW);
  if (offenders.scrollW > offenders.clientW) console.log(offenders.wide.join("\n"));
}
await browser.close();
