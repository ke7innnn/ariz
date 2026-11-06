const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const outDir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Initial Hero at scroll 0
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'hero_scroll_0.png') });
  console.log('Captured hero_scroll_0.png');

  // 2. Mid scroll (450px down) - words shifting, lines drawing
  await page.evaluate(() => window.scrollTo({ top: 450, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'hero_scroll_mid.png') });
  console.log('Captured hero_scroll_mid.png');

  // 3. Full scroll of hero scene (850px down) - architectural blueprint fully drawn, words composed
  await page.evaluate(() => window.scrollTo({ top: 850, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'hero_scroll_full.png') });
  console.log('Captured hero_scroll_full.png');

  await browser.close();
  console.log('Hero scroll animation screenshots captured successfully!');
})();
