import type { Metadata } from 'next';
import { Suspense } from 'react';
import BuyCTA from '@/components/BuyCTA';
import ValuesBrowser from '@/components/values/ValuesBrowser';
import { weaponsByCategory, allWeapons } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sniper Duels Knife Values — Bayonets, Karambits, Butterflies | sniperduels.net',
  description:
    'Live values for every Sniper Duels knife — Bayonets, Karambits, Butterflies, Katanas, Pans. Search, filter by rarity / crate / demand. Updated every 6h from SDValues.',
  alternates: { canonical: 'https://sniperduels.net/knives' },
};

export default function KnivesPage() {
  const knives = weaponsByCategory('knives');
  const fallback = knives.length === 0 ? allWeapons().filter(w => (w.rarity || '').toLowerCase() === 'knife') : knives;
  const list = knives.length ? knives : fallback;

  return (
    <>
      <header className="mb-6">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          All <span className="text-accent">Sniper Duels Knives</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          {list.length} knives · Bayonets · Karambits · Butterflies · Katanas · Pans
        </p>
      </header>

      <Suspense fallback={<div className="border-[3px] border-dark-500 bg-dark-700 p-10 text-center text-sm text-gray-500">Loading…</div>}>
        <ValuesBrowser weapons={list} label="knives" />
      </Suspense>

      <div className="mt-12">
        <BuyCTA campaign="knives-bottom" shopPath="/gems" variant="banner" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Sniper Duels Knife Values',
            description: `Community-tracked values for ${list.length} knives in Sniper Duels.`,
            numberOfItems: list.length,
            itemListElement: list.slice(0, 50).map((w, i) => {
              const top = Math.max(0, ...w.variants.map(v => v.price));
              return {
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITE_URL}/values/${w.id}`,
                item: {
                  '@type': 'Product',
                  name: w.displayName,
                  category: `${w.rarity} ${w.weaponType}`,
                  url: `${SITE_URL}/values/${w.id}`,
                  ...(top > 0 && {
                    offers: {
                      '@type': 'Offer',
                      price: top,
                      priceCurrency: 'GEM',
                      availability: 'https://schema.org/InStock',
                    },
                  }),
                },
              };
            }),
          }),
        }}
      />
    </>
  );
}
