import type { MetadataRoute } from 'next';
import { allWeaponsIncludingUnpriced, topWeapons, weaponsGeneratedAt } from '@/lib/weapons';
import { getAllCases } from '@/lib/cases';
import { SITE_URL } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  // lastmod = when the SDValues cron last refreshed weapons.json (not build time).
  // Crawlers down-rank sitemaps where every URL shares an identical build-time
  // lastmod, so this aligns the signal with when content actually changed.
  const dataLastMod = weaponsGeneratedAt();

  // Priority + changeFrequency tuned to actual content velocity:
  // - /values + /values/[slug] change every 6h (SDValues cron) → daily/hourly
  // - /codes, /update revisited weekly when game patches drop
  // - guides/landing pages are evergreen → monthly
  // /cheap-gems intentionally omitted — it 301s to /gems (see next.config.js).
  const staticRoutes = [
    { path: '',                priority: 0.9,  changeFrequency: 'daily'   as const },
    { path: '/values',         priority: 0.9,  changeFrequency: 'daily'   as const },
    { path: '/value-calculator', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/discord',        priority: 0.9,  changeFrequency: 'monthly' as const },
    { path: '/cases',          priority: 0.85, changeFrequency: 'weekly'  as const },
    { path: '/codes',          priority: 0.8,  changeFrequency: 'weekly'  as const },
    { path: '/update',         priority: 0.8,  changeFrequency: 'weekly'  as const },
    { path: '/tier-list',      priority: 0.8,  changeFrequency: 'monthly' as const },
    { path: '/best-snipers',   priority: 0.8,  changeFrequency: 'monthly' as const },
    { path: '/best-knives',    priority: 0.8,  changeFrequency: 'monthly' as const },
    { path: '/trading-guide',  priority: 0.8,  changeFrequency: 'monthly' as const },
    { path: '/knives',         priority: 0.7,  changeFrequency: 'monthly' as const },
    { path: '/snipers',        priority: 0.7,  changeFrequency: 'monthly' as const },
    { path: '/skins',          priority: 0.7,  changeFrequency: 'monthly' as const },
    { path: '/supplies',       priority: 0.7,  changeFrequency: 'monthly' as const },
    { path: '/safe-trading',   priority: 0.7,  changeFrequency: 'monthly' as const },
    { path: '/middleman',      priority: 0.7,  changeFrequency: 'monthly' as const },
    { path: '/gems',           priority: 0.5,  changeFrequency: 'monthly' as const },
  ];

  // Tier weapon priority by top variant price — the most-traded items are
  // the highest-intent landing pages (and the ones Google should crawl first).
  const TOP_12 = new Set(topWeapons(12).map(w => w.id));
  const TOP_62 = new Set(topWeapons(62).map(w => w.id));

  const weaponRoutes = allWeaponsIncludingUnpriced().map(w => {
    const priority = TOP_12.has(w.id) ? 0.7 : TOP_62.has(w.id) ? 0.65 : 0.6;
    return {
      url: `${SITE_URL}/values/${w.id}`,
      lastModified: dataLastMod,
      changeFrequency: 'daily' as const,
      priority,
    };
  });

  // Per-case pages — one URL per known case. Weekly changeFreq because the
  // case roster only changes when SD ships a new event drop.
  const caseRoutes = getAllCases().map(c => ({
    url: `${SITE_URL}/cases/${c.slug}`,
    lastModified: dataLastMod,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes.map(r => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: dataLastMod,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...caseRoutes,
    ...weaponRoutes,
  ];
}
