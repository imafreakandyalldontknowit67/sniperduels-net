import data from '@/data/weapons.json';

export type Variant = { condition: string; price: number; trend?: number };
export type Weapon = {
  id: string;
  /** 'snipers' | 'knives' — populated by the fetch script */
  category?: string;
  /** Optional — fields below are slimmed off when passed to client components. */
  name?: string;
  displayName: string;
  weaponType: string;
  rarity: string;
  crate: string | null;
  imagePath: string | null;
  demand: string;
  tradeable?: boolean;
  marketStatus?: string;
  defaultVariantIndex?: number;
  description?: string | null;
  variants: Variant[];
};

const dataset = data as { generatedAt: string; count: number; weapons: Weapon[] };

/** When the weapons.json file was last refreshed by the SDValues cron.
 *  Use this for sitemap lastmod so hub pages signal freshness when the
 *  underlying data actually changed (not whenever Coolify rebuilds). */
export function weaponsGeneratedAt(): Date {
  return new Date(dataset.generatedAt);
}

// Hide weapons where SDValues hasn't priced any variant — those render as "—"
// and look like broken data. Keep their detail pages reachable so direct links
// don't 404, but skip them from listings.
function hasAnyPrice(w: Weapon): boolean {
  return w.variants.some(v => v.price > 0);
}

export function allWeapons(): Weapon[] {
  return dataset.weapons.filter(hasAnyPrice);
}

export function allWeaponsIncludingUnpriced(): Weapon[] {
  return dataset.weapons;
}

export function weaponBySlug(slug: string): Weapon | null {
  return dataset.weapons.find(w => w.id === slug) || null;
}

export function topWeapons(n = 12): Weapon[] {
  // Top by max variant price (most expensive items make best landing-page content)
  return [...allWeapons()]
    .map(w => ({ w, top: Math.max(0, ...w.variants.map(v => v.price)) }))
    .sort((a, b) => b.top - a.top)
    .slice(0, n)
    .map(x => x.w);
}

// Weapons too thin for Google to index well: no priced variants, top value
// under 500 gems, or non-Active market status. Detail pages still render
// (direct links resolve) but sitemap omits them and the page emits noindex.
const SEO_MIN_TOP_PRICE = 500;
export function isSeoIndexable(w: Weapon): boolean {
  if (w.marketStatus && w.marketStatus !== 'Active') return false;
  const top = Math.max(0, ...w.variants.map(v => v.price));
  if (top < SEO_MIN_TOP_PRICE) return false;
  return true;
}

export function weaponsForSitemap(): Weapon[] {
  return dataset.weapons.filter(isSeoIndexable);
}

export function weaponsByRarity(rarity: string): Weapon[] {
  return dataset.weapons.filter(w => w.rarity.toLowerCase() === rarity.toLowerCase());
}

export function weaponsByCategory(category: 'snipers' | 'knives'): Weapon[] {
  return dataset.weapons.filter(w => w.category === category && hasAnyPrice(w));
}

/** The "default" gem value for a weapon — picks variants[defaultVariantIndex] if priced,
 *  otherwise the first priced variant. Returns 0 if nothing's priced. */
export function defaultPrice(w: Weapon): number {
  const idx = w.defaultVariantIndex ?? 0;
  const def = w.variants[idx];
  if (def && def.price > 0) return def.price;
  const firstPriced = w.variants.find(v => v.price > 0);
  return firstPriced?.price ?? 0;
}

/** Top (max) variant price — used on detail pages and rarity-sort. */
export function topPrice(w: Weapon): number {
  return Math.max(0, ...w.variants.map(v => v.price));
}

/** Slim a weapon for the client browser. Drops fields ValuesBrowser/WeaponCard
 *  don't read (description, name, marketStatus, tradeable, category) and trims
 *  variants[] to only the default one (the only price ever shown on a card).
 *  Cuts the RSC payload roughly 30% across /snipers /knives /values. */
export type SlimWeapon = Pick<Weapon, 'id' | 'displayName' | 'weaponType' | 'rarity' | 'crate' | 'imagePath' | 'demand' | 'defaultVariantIndex'> & {
  variants: Variant[];
};
export function slimForBrowser(weapons: Weapon[]): SlimWeapon[] {
  return weapons.map(w => {
    const idx = w.defaultVariantIndex ?? 0;
    const def = w.variants[idx] ?? w.variants.find(v => v.price > 0) ?? w.variants[0];
    return {
      id: w.id,
      displayName: w.displayName,
      weaponType: w.weaponType,
      rarity: w.rarity,
      crate: w.crate,
      imagePath: w.imagePath,
      demand: w.demand,
      defaultVariantIndex: 0,
      variants: def ? [def] : [],
    };
  });
}

export function rarityClasses(rarity: string): string {
  const r = rarity.toLowerCase();
  if (r === 'knife')      return 'text-cyan-300 border-cyan-400/60 bg-cyan-400/10';
  if (r === 'secret')     return 'text-pink-300 border-pink-400/60 bg-pink-400/10';
  if (r === 'collectable')return 'text-teal-300 border-teal-400/60 bg-teal-400/10';
  if (r === 'godly')      return 'text-red-400 border-red-400/60 bg-red-400/10';
  if (r === 'ancient')    return 'text-fuchsia-400 border-fuchsia-400/60 bg-fuchsia-400/10';
  if (r === 'vintage')    return 'text-orange-400 border-orange-400/60 bg-orange-400/10';
  if (r === 'legendary')  return 'text-amber-400 border-amber-400/60 bg-amber-400/10';
  if (r === 'epic')       return 'text-purple-400 border-purple-400/60 bg-purple-400/10';
  if (r === 'rare')       return 'text-blue-400 border-blue-400/60 bg-blue-400/10';
  if (r === 'uncommon')   return 'text-green-400 border-green-400/60 bg-green-400/10';
  return 'text-gray-400 border-gray-400/60 bg-gray-400/10';
}

export function demandClasses(demand: string): string {
  const d = (demand || '').toLowerCase();
  if (d === 'overpaid' || d === 'high')      return 'text-red-300 border-red-500/60 bg-red-500/10';
  if (d === 'medium' || d === 'mid')         return 'text-amber-300 border-amber-500/60 bg-amber-500/10';
  if (d === 'low')                           return 'text-blue-300 border-blue-500/60 bg-blue-500/10';
  return 'text-gray-300 border-gray-500/60 bg-gray-500/10';
}

export const SHOP_INVENTORY = {
  // The .shop's item marketplace is not live yet — only gems + supplies are
  // sold there directly. ALL specific-weapon orders currently route to Discord
  // with a free middleman. When the item-shop ships we can flip this list back on.
  skinKeywords: [] as string[],
};

export function shopSellsThis(_weapon: Weapon): boolean {
  return false;
}

/** Find related weapons: same crate first, then same rarity, then same category.
 *  Excludes the current weapon. Returns up to `count` items. */
export function relatedWeapons(weapon: Weapon, count = 6): Weapon[] {
  const all = allWeapons();
  const result: Weapon[] = [];
  const seen = new Set<string>([weapon.id]);

  function add(w: Weapon) {
    if (seen.has(w.id)) return;
    seen.add(w.id);
    result.push(w);
  }

  // Same crate first
  if (weapon.crate) {
    for (const w of all) if (w.crate === weapon.crate) add(w);
  }
  // Then same rarity
  if (result.length < count) {
    for (const w of all) if (w.rarity === weapon.rarity) add(w);
  }
  // Then same category
  if (result.length < count) {
    for (const w of all) if (w.category === weapon.category) add(w);
  }

  return result.slice(0, count);
}
