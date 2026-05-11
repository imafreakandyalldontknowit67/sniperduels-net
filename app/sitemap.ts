import type { MetadataRoute } from 'next';
import { allWeapons } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/gems', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/cheap-gems', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/skins', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/supplies', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/middleman', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/safe-trading', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/codes', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/values', priority: 0.9, changeFrequency: 'daily' as const },
  ];

  const weaponRoutes = allWeapons().map(w => ({
    url: `${SITE_URL}/values/${w.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map(r => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...weaponRoutes,
  ];
}
