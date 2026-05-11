import type { Metadata } from 'next';
import { Suspense } from 'react';
import BuyCTA from '@/components/BuyCTA';
import ValuesBrowser from '@/components/values/ValuesBrowser';
import SsrWeaponGrid from '@/components/values/SsrWeaponGrid';
import { weaponsByCategory, allWeapons, slimForBrowser } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sniper Duels Knife Values — Bayonets, Karambits, Butterflies',
  description:
    'Live values for every Sniper Duels knife — Bayonets, Karambits, Butterflies, Katanas, Pans. Search, filter by rarity / crate / demand. Updated every 6h from SDValues.',
  alternates: { canonical: 'https://sniperduels.net/knives' },
};

export default function KnivesPage() {
  const knives = weaponsByCategory('knives');
  const fallback = knives.length === 0 ? allWeapons().filter(w => (w.rarity || '').toLowerCase() === 'knife') : knives;
  const list = knives.length ? knives : fallback;
  const slimList = slimForBrowser(list);

  return (
    <>
      <header className="mb-6">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Knife Values</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          {list.length} knives · Bayonets · Karambits · Butterflies · Katanas · Pans
        </p>
      </header>

      <Suspense fallback={<SsrWeaponGrid weapons={slimList} take={24} />}>
        <ValuesBrowser weapons={slimList} label="knives" />
      </Suspense>

      <div className="mt-12">
        <BuyCTA campaign="knives-bottom" shopPath="/gems" variant="banner" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Values', item: `${SITE_URL}/values` },
                { '@type': 'ListItem', position: 3, name: 'Knives', item: `${SITE_URL}/knives` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Sniper Duels Knife Values',
              description: `Community-tracked values for ${list.length} knives in Sniper Duels.`,
              numberOfItems: list.length,
              itemListElement: list.slice(0, 10).map((w, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITE_URL}/values/${w.id}`,
                name: w.displayName,
              })),
            },
          ]),
        }}
      />
    </>
  );
}
