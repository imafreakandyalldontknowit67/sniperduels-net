// Pulls Sniper Duels weapon data from the public sniperduels.com (SDValues) API
// at build time. Output → data/weapons.json. Skipped silently if the API is
// unreachable so dev/build still works offline (page renders with empty list).

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'data', 'weapons.json');
const BASE = 'https://www.sniperduels.com/api';

async function fetchJson(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'User-Agent': 'sniperduels.net build/1.0' },
  });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.json();
}

async function main() {
  console.log('[sdvalues] fetching weapons...');
  let weapons;
  try {
    const data = await fetchJson('/weapons/snipers');
    weapons = data.weapons || [];
    console.log(`[sdvalues] got ${weapons.length} weapons`);
  } catch (err) {
    console.warn(`[sdvalues] fetch failed: ${err.message} — using empty dataset`);
    weapons = [];
  }

  // Slim the payload — keep only fields the site actually uses.
  const slim = weapons.map(w => ({
    id: w.id,
    name: w.name,
    displayName: (w.displayName || w.name || '').trim(),
    weaponType: w.weaponType || 'Unknown',
    rarity: w.rarity || 'common',
    crate: w.crate || null,
    imagePath: w.imagePath || null,
    demand: w.demand || 'Unknown',
    tradeable: w.tradeable !== false,
    description: w.description || null,
    variants: (w.variants || [])
      // Dedup by condition (some entries split statTrak rows; we average them).
      .reduce((acc, v) => {
        const cond = v.condition || 'Unknown';
        const price = Number(v.avgPrice ?? v.value ?? 0);
        const existing = acc.find(x => x.condition === cond);
        if (existing) {
          existing.price = Math.max(existing.price, price);
        } else {
          acc.push({ condition: cond, price });
        }
        return acc;
      }, []),
  }));

  // Sort: rarity (highest first) → name
  const rarityRank = { godly: 0, ancient: 1, vintage: 2, legendary: 3, epic: 4, rare: 5, uncommon: 6, common: 7 };
  slim.sort((a, b) => {
    const ra = rarityRank[a.rarity] ?? 99;
    const rb = rarityRank[b.rarity] ?? 99;
    if (ra !== rb) return ra - rb;
    return a.displayName.localeCompare(b.displayName);
  });

  if (!existsSync(dirname(OUT))) mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), count: slim.length, weapons: slim }, null, 2));
  console.log(`[sdvalues] wrote ${slim.length} weapons → ${OUT}`);
}

main().catch(err => {
  console.error('[sdvalues] fatal:', err);
  // Don't fail the build — write empty dataset
  if (!existsSync(dirname(OUT))) mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), count: 0, weapons: [] }, null, 2));
});
