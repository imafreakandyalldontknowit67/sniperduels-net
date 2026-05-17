import type { Metadata } from 'next';
import { Suspense } from 'react';
import BuyCTA from '@/components/BuyCTA';
import SectionBanner from '@/components/SectionBanner';
import ValuesBrowser from '@/components/values/ValuesBrowser';
import SsrWeaponGrid from '@/components/values/SsrWeaponGrid';
import { weaponsByCategory, allWeapons, slimForBrowser } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

const SN_TITLE = 'Buy Sniper Duels Snipers — Prices & Stock';
const SN_DESC =
  'Browse sniper rifles available in Sniper Duels — AWPs, Interventions, Deagles & Shotguns with live gem prices. Check stock, compare conditions, and trade via our free middleman service.';

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
          Sniper Duels <span className="text-accent">Sniper Prices &amp; Stock</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          {list.length} snipers available · AWPs · Interventions · Deagles · Shotguns · Prices updated every 6h
        </p>
      </header>

      <section className="mb-6 prose prose-invert max-w-none text-sm text-gray-300">
        <h2 className="heading-pixel">Sniper Prices &amp; Availability</h2>
        <p>
          Browse all {list.length} sniper rifles currently tracked in Sniper Duels. Each weapon
          displays its live gem price pulled from SDValues every 6 hours. Click through to view
          condition-by-condition pricing (Mint, Standard, Worn), demand tier, and stock availability.
          Ready to buy? Use our <a href="/middleman" className="text-accent hover:underline">free middleman</a> for
          safe trades on <strong>AWPs</strong>, <strong>Interventions</strong>,{' '}
          <strong>Deagles</strong> and <strong>Shotguns</strong>.
        </p>
      </section>

      <Suspense fallback={<SsrWeaponGrid weapons={slimList} take={24} />}>
        <ValuesBrowser weapons={slimList} label="snipers" />
      </Suspense>

      <section className="mt-10 prose prose-invert max-w-none text-sm text-gray-400">
        <h2 className="heading-pixel">Looking for knives instead?</h2>
        <p>
          Bayonets, Karambits, Butterflies, Katanas and Pans live on the{' '}
          <a href="/knives" className="text-accent hover:underline">knife prices</a> page.
          Or browse the complete{' '}
          <a href="/values" className="text-accent hover:underline">Sniper Duels value list</a> covering all weapons.
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
                { '@type': 'ListItem', position: 2, name: 'Snipers', item: `${SITE_URL}/snipers` },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
