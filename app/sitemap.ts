import type { MetadataRoute } from 'next';
import { allWeaponsIncludingUnpriced, topWeapons, weaponsGeneratedAt } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  // lastmod = when the SDValues cron last refreshed weapons.json (not build time).
  // Crawlers down-rank sitemaps where every URL shares an identical build-time
  // lastmod, so this aligns the signal with when content actually changed.
  const dataLastMod = weaponsGeneratedAt();

  // Hub pages reflect live data — their content changes every time the cron
  // pushes new weapon prices (every 6h). Mark hourly so crawlers re-poll often.
  const staticRoutes = [
    { path: '',             priority: 1.0,  changeFrequency: 'hourly'  as const },
    { path: '/gems',        priority: 0.95, changeFrequency: 'hourly'  as const },
    { path: '/cheap-gems',  priority: 0.95, changeFrequency: 'hourly'  as const },
    { path: '/values',      priority: 0.95, changeFrequency: 'hourly'  as const },
    { path: '/snipers',     priority: 0.95, changeFrequency: 'hourly'  as const },
    { path: '/knives',      priority: 0.95, changeFrequency: 'hourly'  as const },
    { path: '/skins',       priority: 0.85, changeFrequency: 'weekly'  as const },
    { path: '/supplies',    priority: 0.9,  changeFrequency: 'weekly'  as const },
    { path: '/middleman',   priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/safe-trading',priority: 0.8,  changeFrequency: 'monthly' as const },
    { path: '/codes',       priority: 0.85, changeFrequency: 'weekly'  as const },
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
      changeFrequency: 'hourly' as const,
      priority,
    };
  });

  return [
    ...staticRoutes.map(r => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: dataLastMod,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...weaponRoutes,
  ];
}
