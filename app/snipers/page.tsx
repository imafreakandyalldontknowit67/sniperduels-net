import type { Metadata } from 'next';
import { Suspense } from 'react';
import BuyCTA from '@/components/BuyCTA';
import SectionBanner from '@/components/SectionBanner';
import ValuesBrowser from '@/components/values/ValuesBrowser';
import SsrWeaponGrid from '@/components/values/SsrWeaponGrid';
import { weaponsByCategory, allWeapons, slimForBrowser } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sniper Duels Sniper Values — AWPs, Interventions, Deagles, Shotguns',
  description:
    'Live values for every Sniper Duels sniper rifle. Search, filter by rarity / crate / demand, sort by price. Updated every 6 hours from SDValues.',
  alternates: { canonical: 'https://sniperduels.net/snipers' },
};

export default function SnipersPage() {
  const snipers = weaponsByCategory('snipers');
  const fallback = snipers.length === 0 ? allWeapons().filter(w => (w.rarity || '').toLowerCase() !== 'knife') : snipers;
  const list = snipers.length ? snipers : fallback;
  const slimList = slimForBrowser(list);

  return (
    <>
      <header className="mb-6">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Sniper Values</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          {list.length} snipers · AWPs · Interventions · Deagles · Shotguns · Updated every 6h
        </p>
      </header>

      <Suspense fallback={<SsrWeaponGrid weapons={slimList} take={24} />}>
        <ValuesBrowser weapons={slimList} label="snipers" />
      </Suspense>

      <div className="mt-12">
        <BuyCTA campaign="snipers-bottom" shopPath="/gems" variant="banner" />
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
                { '@type': 'ListItem', position: 3, name: 'Snipers', item: `${SITE_URL}/snipers` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Sniper Duels Sniper Values',
              description: `Community-tracked values for ${list.length} sniper rifles in Sniper Duels.`,
              numberOfItems: list.length,
              // First 10 items only — Google Rich Results doesn't require
              // an exhaustive list and shipping all 117 added ~12KB per page.
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
