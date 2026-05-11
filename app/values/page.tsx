import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import SectionBanner from '@/components/SectionBanner';
import ValuesBrowser from '@/components/values/ValuesBrowser';
import SsrWeaponGrid from '@/components/values/SsrWeaponGrid';
import { allWeapons, weaponsByCategory } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sniper Duels Item Values — All Snipers & Knives',
  description:
    'Live value list for every Sniper Duels weapon — snipers + knives, all conditions and rarities. Search, filter, sort. Updated every 6 hours.',
  alternates: { canonical: 'https://sniperduels.net/values' },
};

export default function ValuesIndexPage() {
  const weapons = allWeapons();
  const sniperCount = weaponsByCategory('snipers').length;
  const knifeCount = weaponsByCategory('knives').length;

  return (
    <>
      <header className="mb-6">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Item Values</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Live values for {weapons.length} weapons · Updated every 6h from SDValues
        </p>
      </header>

      {/* Category jump links */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Link
          href="/snipers"
          className="group flex items-center justify-between border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline"
        >
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Browse</div>
            <div className="text-lg font-bold uppercase tracking-wider text-white sm:text-xl">All Snipers</div>
            <div className="text-xs text-gray-500">{sniperCount} weapons</div>
          </div>
          <span className="text-2xl font-black text-accent group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href="/knives"
          className="group flex items-center justify-between border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline"
        >
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Browse</div>
            <div className="text-lg font-bold uppercase tracking-wider text-white sm:text-xl">All Knives</div>
            <div className="text-xs text-gray-500">{knifeCount} weapons</div>
          </div>
          <span className="text-2xl font-black text-accent group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Combined browser — search/filter/sort across everything */}
      <SectionBanner color="gold" align="left" eyebrow="Search every weapon at once. Filter by rarity, crate, demand.">
        Combined Browser
      </SectionBanner>

      <Suspense fallback={<SsrWeaponGrid weapons={weapons} take={24} />}>
        <ValuesBrowser weapons={weapons} label="weapons" />
      </Suspense>

      <div className="mt-12">
        <BuyCTA campaign="values-bottom" shopPath="/gems" variant="banner" />
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
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Sniper Duels Item Values',
              description: `Live community-tracked values for ${weapons.length} Sniper Duels weapons across rarity tiers.`,
              numberOfItems: weapons.length,
              itemListElement: weapons.map((w, i) => ({
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
