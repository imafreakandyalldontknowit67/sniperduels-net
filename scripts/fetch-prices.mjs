// Pulls current gem listings from sniperduels.shop at build time + on cron.
// Output → data/prices.json. Hourly GitHub Action commits the file when prices
// change; Coolify auto-deploys on push so the site reflects new prices ~1h max.
//
// Endpoint discovered via JS bundle inspection of sniperduels.shop/gems:
// GET /api/gems/listings → { listings: [...] }, no auth required.

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'data', 'prices.json');
const ENDPOINT = 'https://sniperduels.shop/api/gems/listings';

async function main() {
  console.log('[prices] fetching gem listings…');
  let listings = [];
  let fetchedOk = false;

  try {
    const res = await fetch(ENDPOINT, {
      headers: {
        'User-Agent': 'sniperduels.net price-sync/1.0',
        Referer: 'https://sniperduels.shop/gems',
        Accept: 'application/json',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    listings = Array.isArray(data.listings) ? data.listings : [];
    fetchedOk = true;
    console.log(`[prices] got ${listings.length} listings`);
  } catch (err) {
    console.warn(`[prices] fetch failed: ${err.message} — keeping previous data if any`);
  }

  // Compute summary fields used by the UI so it doesn't have to crunch listings client-side.
  const inStock = listings.filter(l => (l.stockK ?? 0) > 0 || l.type === 'platform');
  const allPrices = inStock.flatMap(l => {
    const tiers = Array.isArray(l.bulkTiers) ? l.bulkTiers : [];
    return [
      typeof l.pricePerK === 'number' ? l.pricePerK : null,
      ...tiers.map(t => (typeof t.pricePerK === 'number' ? t.pricePerK : null)),
    ].filter(p => p != null);
  });
  const cheapestPerK = allPrices.length ? Math.min(...allPrices) : null;
  const bulkPrices = inStock.flatMap(l =>
    (Array.isArray(l.bulkTiers) ? l.bulkTiers : [])
      .filter(t => (t.minK ?? 0) >= 50)
      .map(t => t.pricePerK)
      .filter(p => typeof p === 'number'),
  );
  const cheapestBulkPerK = bulkPrices.length ? Math.min(...bulkPrices) : null;
  const platform = listings.find(l => l.type === 'platform');
  const platformInStock = (platform?.stockK ?? 0) > 0;
  const totalStockK = inStock.reduce((sum, l) => sum + (l.stockK ?? 0), 0);
  const vendorCount = inStock.filter(l => l.type === 'vendor').length;

  // If fetch failed and there's an existing prices.json, leave it alone.
  // Only overwrite when we actually got fresh data.
  if (!fetchedOk) {
    if (existsSync(OUT)) {
      console.log('[prices] keeping existing data/prices.json');
      return;
    }
    console.log('[prices] no previous data; writing empty fallback');
  }

  const out = {
    fetchedAt: new Date().toISOString(),
    source: ENDPOINT,
    fetchedOk,
    cheapestPerK,
    cheapestBulkPerK,
    platformInStock,
    totalStockK,
    vendorCount,
    listings,
  };

  if (!existsSync(dirname(OUT))) mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(out, null, 2));
  console.log(`[prices] wrote → ${OUT}  (cheapest=${cheapestPerK}/k, bulk=${cheapestBulkPerK}/k, platformStock=${platformInStock}, vendors=${vendorCount})`);
}

main().catch(err => {
  console.error('[prices] fatal:', err);
  // Write empty fallback so the site can still build
  if (!existsSync(dirname(OUT)) ) mkdirSync(dirname(OUT), { recursive: true });
  if (!existsSync(OUT)) {
    writeFileSync(OUT, JSON.stringify({
      fetchedAt: new Date().toISOString(),
      source: ENDPOINT,
      fetchedOk: false,
      cheapestPerK: null,
      cheapestBulkPerK: null,
      platformInStock: false,
      totalStockK: 0,
      vendorCount: 0,
      listings: [],
    }, null, 2));
  }
});
