import { chromium } from 'playwright';

const hotels = [
  { slug: 'onyx-park-resort-ubud', addedBy: 'KZ', finalist: false },
  { slug: 'orchid-ubud-cottage', addedBy: 'KZ', finalist: true },
  { slug: 'byasa-ubud', addedBy: 'KZ', finalist: false },
  { slug: 'bije-boutique-amp-gallery', addedBy: 'KZ', finalist: false },
  { slug: 'pertiwi-bisma-1', addedBy: 'KZ', finalist: false },
  { slug: 'pertiwi-bisma-2', addedBy: 'KZ', finalist: false },
  { slug: 'govala-ubud-villa-and-spa', addedBy: 'KZ', finalist: false },
  { slug: 'taman-amartha', addedBy: 'KZ', finalist: false },
  { slug: 'dupa-ubud-villa', addedBy: 'KZ', finalist: true },
  { slug: 'tamantara', addedBy: 'Наташа', finalist: true },
  { slug: 'desak-putu-putera-cottages', addedBy: 'Наташа', finalist: false, altName: 'Jungle Haven Resort Central Ubud' },
  { slug: 'tanadewa-resort-amp-spa-ubud', addedBy: 'KZ', finalist: false },
  { slug: 'eveuss-villa', addedBy: 'KZ', finalist: false },
  { slug: 'teba-suci-suite', addedBy: 'KZ', finalist: false },
  { slug: 'the-craft-ubud', addedBy: 'KZ', finalist: false },
  { slug: 'best-western-premier-agung-resort-ubud', addedBy: 'KZ', finalist: false },
  { slug: 'big-dragon-villas-ubud', addedBy: 'KZ', finalist: true },
  { slug: 'puri-andong-villa', addedBy: 'KZ', finalist: true },
  { slug: 'pondok-damuh', addedBy: 'KZ', finalist: false },
  { slug: 'yulia-village-inn-ubud', addedBy: '?', finalist: true },
];

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const context = await browser.newContext({ locale: 'ru-RU' });
const results = [];

for (const h of hotels) {
  const url = `https://www.booking.com/hotel/id/${h.slug}.ru.html`;
  console.error(`Scraping ${h.slug}...`);
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(3000);

    const data = await page.evaluate(() => {
      const name = document.querySelector('h2.pp-header__title, h2[class*="header__title"], [data-testid="title"]')?.textContent?.trim()
        || document.querySelector('h1')?.textContent?.trim()
        || document.title.split('–')[0]?.trim()
        || '';
      
      // Get rating
      const ratingEl = document.querySelector('[data-testid="review-score-component"] div, .review-score-badge, [class*="review-score"]');
      const rating = ratingEl?.textContent?.trim() || '';
      
      // Get address/location
      const addressEl = document.querySelector('[data-node_tt_id="location_score_tooltip"], [data-testid="address"], .hp_address_subtitle');
      const address = addressEl?.textContent?.trim() || '';
      
      // Get main photo
      const imgs = Array.from(document.querySelectorAll('img[src*="bstatic.com"]'));
      const mainImg = imgs.find(i => i.src.includes('max') || i.width > 200);
      const photoUrl = mainImg?.src || imgs[0]?.src || '';
      
      // Try to get all large images
      const allPhotos = imgs
        .map(i => i.src)
        .filter(s => s.includes('images/hotel') && !s.includes('30x30') && !s.includes('square'))
        .slice(0, 3);

      return { name, rating, address, photoUrl, allPhotos };
    });

    results.push({ ...h, ...data, url });
  } catch (e) {
    console.error(`  Error: ${e.message}`);
    results.push({ ...h, name: h.slug, rating: '', address: '', photoUrl: '', allPhotos: [], url, error: e.message });
  }
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
