// Single source of truth for cross-site config.
export const SHOP_URL = 'https://sniperduels.shop';
export const DISCORD_INVITE = 'https://discord.gg/sniperduels';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sniperduels.net';
export const SITE_NAME = 'sniperduels.net';

// Live gem pricing (matches .shop config — kept inline for SSG; can later be
// fetched at runtime from .shop API if we want it always-current).
export const GEM_PRICING = [
  { tier: '1k–99k',  rate: 2.90, label: 'Standard' },
  { tier: '100k+',   rate: 2.65, label: 'Bulk', highlight: true },
];

export const SUPPLY_PRICING = [
  { name: 'Bluesteels (Defaults & Survs)', basePrice: 4.50, bulk: { qty: 15, price: 3.85 }, minOrder: 1 },
  { name: 'Survivor Vanillas', basePrice: 7.00, bulk: null, minOrder: 1 },
  { name: 'Collectibles', basePrice: 1.50, bulk: { qty: 20, price: 1.25 }, minOrder: 10 },
  { name: 'Epics', basePrice: 0.75, bulk: { qty: 50, price: 0.60 }, minOrder: 10 },
  { name: 'Legendaries', basePrice: 0.22, bulk: null, minOrder: 10 },
];

export const SKINS = [
  { name: 'Green Frankenawp', price: 9.00, slug: 'green-frankenawp' },
  { name: 'Gray Frankenawp', price: 9.00, slug: 'gray-frankenawp' },
  { name: 'Purple Hallows Punisher', price: 9.00, slug: 'purple-hallows-punisher' },
  { name: 'Orange Hallows Punisher', price: 9.00, slug: 'orange-hallows-punisher' },
];

// Build a UTM-tracked link to .shop for click attribution.
export function shopLink(path: string, campaign: string): string {
  const sep = path.includes('?') ? '&' : '?';
  return `${SHOP_URL}${path}${sep}utm_source=net&utm_medium=cta&utm_campaign=${encodeURIComponent(campaign)}`;
}
