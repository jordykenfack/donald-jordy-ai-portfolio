import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'shell',
  protocolTimeout: 240000,
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// The 21 marquee GIFs are huge animated files that stall the headless
// renderer; swap them for a small static placeholder (tiles are fixed
// 420x270, so layout is unaffected).
await page.setRequestInterception(true);
const placeholder = Buffer.from(
  '89504e470d0a1a0a0000000d494844520000000100000001080600000' +
    '01f15c4890000000d4944415478da63fccf00f60f0003850289c5a87d' +
    '0e0000000049454e44ae426082',
  'hex'
);
page.on('request', (req) => {
  if (req.url().includes('motionsites.ai')) {
    req.respond({ contentType: 'image/png', body: placeholder });
  } else {
    req.continue();
  }
});

await page.goto('http://localhost:5199', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 2500));

// Hero
await page.screenshot({ path: 'shot-hero.jpeg', quality: 70, type: 'jpeg' });

// Scroll through the page section by section so FadeIn/scroll effects trigger
const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 600) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await new Promise((r) => setTimeout(r, 120));
}

// Marquee
await page.evaluate(() => {
  const s = document.querySelectorAll('section')[1];
  window.scrollTo(0, s.offsetTop - 100);
});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: 'shot-marquee.jpeg', quality: 70, type: 'jpeg' });

// About
await page.evaluate(() => {
  const s = document.getElementById('about');
  window.scrollTo(0, s.offsetTop + s.offsetHeight / 2 - window.innerHeight / 2);
});
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: 'shot-about.jpeg', quality: 70, type: 'jpeg' });

// Services
await page.evaluate(() => {
  const sections = document.querySelectorAll('section');
  window.scrollTo(0, sections[3].offsetTop - 50);
});
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: 'shot-services.jpeg', quality: 70, type: 'jpeg' });

// Projects heading + card 1
await page.evaluate(() => {
  const s = document.getElementById('projects');
  window.scrollTo(0, s.offsetTop - 50);
});
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: 'shot-projects.jpeg', quality: 70, type: 'jpeg' });

// Projects mid-scroll (stacking effect)
await page.evaluate(() => {
  const s = document.getElementById('projects');
  window.scrollTo(0, s.offsetTop + window.innerHeight * 1.6);
});
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: 'shot-projects-stack.jpeg', quality: 70, type: 'jpeg' });

// Mobile hero
await page.setViewport({ width: 390, height: 844 });
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: 'shot-mobile-hero.jpeg', quality: 70, type: 'jpeg' });

await browser.close();
console.log('done');
