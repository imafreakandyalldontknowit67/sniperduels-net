import type { Metadata } from 'next';
import { Suspense } from 'react';
import BuyCTA from '@/components/BuyCTA';
import ValuesBrowser from '@/components/values/ValuesBrowser';
import SsrWeaponGrid from '@/components/values/SsrWeaponGrid';
import { weaponsByCategory, allWeapons, slimForBrowser } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

const KN_TITLE = 'Sniper Duels Knife Values — Bayonets, Karambits & More';
const KN_DESC =
  'Live values for every Sniper Duels knife — Bayonets, Karambits, Butterflies, Katanas, Pans. Search, filter, sort. Updated every 6h.';

export const metadata: Metadata = {
  title: KN_TITLE,
  description: KN_DESC,
  alternates: { canonical: `${SITE_URL}/knives` },
  openGraph: { title: KN_TITLE, description: KN_DESC, url: `${SITE_URL}/knives` },
  twitter: { title: KN_TITLE, description: KN_DESC },
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

      <section className="mb-6 prose prose-invert max-w-none text-sm text-gray-300">
        <h2 className="heading-pixel">How Sniper Duels knife values are tracked</h2>
        <p>
          All {list.length} knives below carry community-tracked gem values from SDValues, refreshed
          every six hours. <strong>Bayonets</strong>, <strong>Karambits</strong>,{' '}
          <strong>Butterflies</strong>, <strong>Katanas</strong> and the rare <strong>Pans</strong>{' '}
          all live in the same grid — sort by top variant price or filter by rarity, crate, or demand
          tier to surface what you&apos;re looking for. Click any knife for condition-by-condition
          pricing (Mint, Standard, Worn). Want free gems toward your next knife? Check the current{' '}
          <a href="/codes" className="text-accent hover:underline">Sniper Duels codes</a>, or{' '}
          <a href="/discord" className="text-accent hover:underline">join the Sniper Duels Discord</a> to
          trade with the community.
        </p>
      </section>

      <Suspense fallback={<SsrWeaponGrid weapons={slimList} take={24} />}>
        <ValuesBrowser weapons={slimList} label="knives" />
      </Suspense>

      <section className="mt-10 prose prose-invert max-w-none text-sm text-gray-400">
        <h2 className="heading-pixel">Looking for snipers instead?</h2>
        <p>
          AWPs, Interventions, Deagles and Shotguns live on the{' '}
          <a href="/snipers" className="text-accent hover:underline">Sniper Duels sniper values</a> page.
          Or browse all 218 weapons on the{' '}
          <a href="/values" className="text-accent hover:underline">combined value list</a>.
        </p>
      </section>

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
                ...(w.imagePath ? { image: w.imagePath } : {}),
              })),
            },
          ]),
        }}
      />
    </>
  );
}
