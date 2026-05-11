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
  // Items the .shop sells directly. For these, CTA is "Buy on sniperduels.shop →".
  // Everything else: CTA is "Find in our Discord marketplace →".
  // Names matched loosely (case-insensitive contains).
  skinKeywords: ['frankenawp', 'hallows punisher'],
  // We always sell gems and supplies, not specific weapons. So the SHOP CTA
  // for weapons points at /shop on .shop where a vendor might be listing it.
  // Fallback CTA = Discord trade channels.
};

export function shopSellsThis(weapon: Weapon): boolean {
  const name = weapon.displayName.toLowerCase();
  return SHOP_INVENTORY.skinKeywords.some(k => name.includes(k));
}
