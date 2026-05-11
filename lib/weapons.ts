import data from '@/data/weapons.json';

export type Variant = { condition: string; price: number };
export type Weapon = {
  id: string;
  name: string;
  displayName: string;
  weaponType: string;
  rarity: string;
  crate: string | null;
  imagePath: string | null;
  demand: string;
  tradeable: boolean;
  description: string | null;
  variants: Variant[];
};

const dataset = data as { generatedAt: string; count: number; weapons: Weapon[] };

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

export function weaponsByRarity(rarity: string): Weapon[] {
  return dataset.weapons.filter(w => w.rarity.toLowerCase() === rarity.toLowerCase());
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
