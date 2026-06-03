import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import SectionBanner from '@/components/SectionBanner';
import ValuesBrowser from '@/components/values/ValuesBrowser';
import SsrWeaponGrid from '@/components/values/SsrWeaponGrid';
import { allWeapons, weaponsByCategory, slimForBrowser, defaultPrice } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

const VAL_TITLE = 'Sniper Duels Value List — All Knife, Sniper & Skin Values 2026';
const VAL_DESC =
  'The complete sniper duels value list for 2026 — live gem values for every knife, sniper, and skin. Updated every 6 hours from SDValues with demand tiers and condition pricing.';

export const metadata: Metadata = {
  title: VAL_TITLE,
  description: VAL_DESC,
  alternates: { canonical: `${SITE_URL}/values` },
  openGraph: { title: VAL_TITLE, description: VAL_DESC, url: `${SITE_URL}/values` },
  twitter: { title: VAL_TITLE, description: VAL_DESC },
};

export default function ValuesIndexPage() {
  const weapons = allWeapons();
  const slimWeapons = slimForBrowser(weapons);
  const sniperCount = weaponsByCategory('snipers').length;
  const knifeCount = weaponsByCategory('knives').length;

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sniper Duels Value List',
    description: `Live community-tracked gem values for ${weapons.length} Sniper Duels weapons across all rarity tiers and condition variants.`,
    numberOfItems: weapons.length,
    itemListElement: weapons.map((w, i) => {
      const price = defaultPrice(w);
      const item: Record<string, unknown> = {
        '@type': 'ListItem',
        position: i + 1,
        name: w.displayName,
        url: `${SITE_URL}/values/${w.id}`,
      };
      if (w.imagePath) item.image = w.imagePath;
      if (price > 0) item.description = `${price.toLocaleString()} gems`;
      return item;
    }),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Value List', item: `${SITE_URL}/values` },
    ],
  };

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Sniper Duels Item Values',
    description: `Live community-tracked gem values for ${weapons.length} Sniper Duels weapons across rarity tiers and condition variants. Refreshed every 6 hours from SDValues.`,
    url: `${SITE_URL}/values`,
    creator: { '@id': `${SITE_URL}#org` },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    keywords: ['Sniper Duels', 'Roblox', 'item values', 'weapon values', 'skin prices'],
    variableMeasured: ['gem price', 'rarity', 'demand', 'condition', 'crate'],
    measurementTechnique: 'Community-submitted price observations aggregated by SDValues, verified against live trade-bot order data on sniperduels.shop.',
  };

  return (
    <>
      <header className="mb-6">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Value List</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Live values for {weapons.length} weapons · Updated every 6h from SDValues
        </p>
      </header>

      {/* Intro paragraph with keyword variants */}
      <section className="mb-8 max-w-3xl text-sm leading-relaxed text-gray-300">
        <p>
          Welcome to the definitive <strong>sniper duels value list</strong> — the most complete and
          up-to-date pricing reference for every tradeable weapon in Sniper Duels. Whether you call
          it the <strong>sniper duels values</strong> page, <strong>sdvalues</strong>, or just need a
          quick <strong>sniper duels value</strong> check, you&apos;re in the right place. Our catalog
          covers {weapons.length} snipers, knives, and skins with gem prices refreshed every 6 hours
          directly from SDValues. Use the search, filter by rarity or demand tier, and sort by price
          to find the exact weapon you&apos;re looking for. Hunting for freebies? Redeem the latest{' '}
          <Link href="/codes" className="text-accent hover:underline">Sniper Duels codes</Link>, or{' '}
          <Link href="/discord" className="text-accent hover:underline">join the Sniper Duels Discord</Link> for
          live value updates.
        </p>
      </section>

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

      {/* Browse-by-case callout — captures players who search by case name
          ("classic case items", "april fools case") rather than weapon name. */}
      <Link
        href="/cases"
        className="group mb-6 flex items-center justify-between border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline"
      >
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Browse by case</div>
          <div className="text-lg font-bold uppercase tracking-wider text-white sm:text-xl">All Sniper Duels Cases</div>
          <div className="text-xs text-gray-500">Classic, Skin Case 1, Christmas, Hallows, April Fools &amp; more</div>
        </div>
        <span className="text-2xl font-black text-accent group-hover:translate-x-1">→</span>
      </Link>

      {/* Combined browser — search/filter/sort across everything */}
      <SectionBanner color="gold" align="left" eyebrow="Search every weapon at once. Filter by rarity, crate, demand.">
        Combined Browser
      </SectionBanner>

      <Suspense fallback={<SsrWeaponGrid weapons={slimWeapons} take={24} />}>
        <ValuesBrowser weapons={slimWeapons} label="weapons" />
      </Suspense>

      <div className="mt-12">
        <BuyCTA campaign="values-bottom" shopPath="/gems" variant="banner" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, itemListJsonLd, datasetJsonLd]),
        }}
      />
    </>
  );
}
