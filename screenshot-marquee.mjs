import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'shell',
  protocolTimeout: 240000,
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.setRequestInterception(true);
let n = 0;
page.on('request', (req) => {
  if (req.url().includes('motionsites.ai')) {
    const hue = (n++ * 47) % 360;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="270"><rect width="420" height="270" fill="hsl(${hue},40%,45%)"/><text x="210" y="140" font-size="40" fill="#fff" text-anchor="middle">GIF</text></svg>`;
    req.respond({ contentType: 'image/svg+xml', body: svg });
  } else {
    req.continue();
  }
});

await page.goto('http://localhost:5199', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 2000));

await page.evaluate(() => {
  const s = document.querySelectorAll('section')[1];
  window.scrollTo(0, s.offsetTop - 150);
});
await new Promise((r) => setTimeout(r, 1000));
await page.screenshot({ path: 'shot-marquee2.jpeg', quality: 70, type: 'jpeg' });

// report row transforms for sanity
const info = await page.evaluate(() => {
  const rows = document.querySelectorAll('section')[1].querySelectorAll(':scope > div > div');
  return Array.from(rows).map((r) => ({
    transform: r.style.transform,
    width: r.scrollWidth,
    children: r.children.length,
  }));
});
console.log(JSON.stringify(info));

await browser.close();
console.log('done');
