import type { Metadata } from 'next';
import { Suspense } from 'react';
import BuyCTA from '@/components/BuyCTA';
import SectionBanner from '@/components/SectionBanner';
import ValuesBrowser from '@/components/values/ValuesBrowser';
import SsrWeaponGrid from '@/components/values/SsrWeaponGrid';
import { weaponsByCategory, allWeapons, slimForBrowser } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

const SN_TITLE = 'Sniper Duels Sniper Values — AWPs, Interventions & More';
const SN_DESC =
  'Live values for every Sniper Duels sniper rifle. Search, filter by rarity / crate / demand, sort by price. Updated every 6h from SDValues.';

export const metadata: Metadata = {
  title: SN_TITLE,
  description: SN_DESC,
  alternates: { canonical: `${SITE_URL}/snipers` },
  openGraph: { title: SN_TITLE, description: SN_DESC, url: `${SITE_URL}/snipers` },
  twitter: { title: SN_TITLE, description: SN_DESC },
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

      <section className="mb-6 prose prose-invert max-w-none text-sm text-gray-300">
        <h2 className="heading-pixel">How Sniper Duels sniper values are tracked</h2>
        <p>
          Every {list.length} sniper rifle below carries a community-tracked value in gems —
          pulled hourly from SDValues, the Sniper Duels community price index. Each weapon
          shows its top variant price; click through to see condition-by-condition pricing
          (Mint, Standard, Worn) and demand tier. Top-tier <strong>AWPs</strong>,{' '}
          <strong>Interventions</strong>, <strong>Deagles</strong> and <strong>Shotguns</strong>{' '}
          all appear in the same grid — use the rarity / crate / demand filters to narrow.
        </p>
      </section>

      <Suspense fallback={<SsrWeaponGrid weapons={slimList} take={24} />}>
        <ValuesBrowser weapons={slimList} label="snipers" />
      </Suspense>

      <section className="mt-10 prose prose-invert max-w-none text-sm text-gray-400">
        <h2 className="heading-pixel">Looking for knives instead?</h2>
        <p>
          Bayonets, Karambits, Butterflies, Katanas and Pans live on the{' '}
          <a href="/knives" className="text-accent hover:underline">Sniper Duels knife values</a> page.
          Or browse all 218 weapons on the{' '}
          <a href="/values" className="text-accent hover:underline">combined value list</a>.
        </p>
      </section>

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
