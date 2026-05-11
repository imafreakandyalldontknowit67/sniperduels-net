import type { Weapon } from './weapons';
import { defaultPrice } from './weapons';

export type SortKey =
  | 'name-asc'
  | 'name-desc'
  | 'value-asc'
  | 'value-desc'
  | 'rarity-asc'
  | 'rarity-desc';

export type FilterState = {
  search: string;
  weaponTypes: Set<string>;
  rarities: Set<string>;
  crates: Set<string>;
  demands: Set<string>;
  sort: SortKey;
};

export const EMPTY_FILTERS = (): FilterState => ({
  search: '',
  weaponTypes: new Set(),
  rarities: new Set(),
  crates: new Set(),
  demands: new Set(),
  sort: 'rarity-desc',
});

// Higher rank = rarer. Matches lib/weapons rarityRank order in fetch script.
const RARITY_RANK: Record<string, number> = {
  knife: 8,
  godly: 7,
  ancient: 6,
  vintage: 5,
  secret: 4.5,
  legendary: 4,
  collectable: 3.5,
  epic: 3,
  rare: 2,
  uncommon: 1,
  common: 0,
  unobtainable: -1,
};

const DEMAND_RANK: Record<string, number> = {
  hype: 5,
  high: 4,
  medium: 3,
  low: 2,
  none: 1,
  unknown: 0,
};

function norm(v: string | undefined | null): string {
  return (v ?? '').toLowerCase();
}

export function applyFilters(weapons: Weapon[], f: FilterState): Weapon[] {
  const q = f.search.trim().toLowerCase();
  return weapons.filter(w => {
    if (q && !w.displayName.toLowerCase().includes(q)) return false;
    if (f.weaponTypes.size > 0 && !f.weaponTypes.has(w.weaponType)) return false;
    if (f.rarities.size > 0 && !f.rarities.has(w.rarity)) return false;
    if (f.crates.size > 0 && !(w.crate && f.crates.has(w.crate))) return false;
    if (f.demands.size > 0 && !f.demands.has(w.demand)) return false;
    return true;
  });
}

export function applySort(items: Weapon[], sort: SortKey): Weapon[] {
  const arr = items.slice();
  switch (sort) {
    case 'name-asc':
      return arr.sort((a, b) => a.displayName.localeCompare(b.displayName));
    case 'name-desc':
      return arr.sort((a, b) => b.displayName.localeCompare(a.displayName));
    case 'value-asc':
      return arr.sort((a, b) => defaultPrice(a) - defaultPrice(b));
    case 'value-desc':
      return arr.sort((a, b) => defaultPrice(b) - defaultPrice(a));
    case 'rarity-asc':
      return arr.sort((a, b) => (RARITY_RANK[norm(a.rarity)] ?? -2) - (RARITY_RANK[norm(b.rarity)] ?? -2));
    case 'rarity-desc':
    default:
      return arr.sort((a, b) => (RARITY_RANK[norm(b.rarity)] ?? -2) - (RARITY_RANK[norm(a.rarity)] ?? -2));
  }
}

export function uniqueValues(weapons: Weapon[], pick: (w: Weapon) => string | null | undefined): string[] {
  const set = new Set<string>();
  for (const w of weapons) {
    const v = pick(w);
    if (v) set.add(v);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function uniqueRarities(weapons: Weapon[]): string[] {
  // Order rarities by rank desc so the chip list reads "rarest first"
  return uniqueValues(weapons, w => w.rarity).sort(
    (a, b) => (RARITY_RANK[norm(b)] ?? -2) - (RARITY_RANK[norm(a)] ?? -2),
  );
}

export function uniqueDemands(weapons: Weapon[]): string[] {
  return uniqueValues(weapons, w => w.demand).sort(
    (a, b) => (DEMAND_RANK[norm(b)] ?? 0) - (DEMAND_RANK[norm(a)] ?? 0),
  );
}

export function demandStars(demand: string | undefined): number {
  const r = DEMAND_RANK[norm(demand)] ?? 0;
  return Math.min(5, Math.max(0, r));
}

/** Compact "40.5K" formatter for card price display. */
export function formatGems(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '—';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return String(Math.round(n));
}
