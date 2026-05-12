import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import { SUPPLY_PRICING, shopLink, SITE_URL } from '@/lib/config';

const SP_TITLE = 'Sniper Duels Supplies — Bluesteels, Vanillas, Collectibles';
const SP_DESC =
  'Buy Sniper Duels supplies — Bluesteels from $3.85/k, Survivor Vanillas, Collectibles, Epics and Legendaries. Bulk pricing, instant delivery.';

export const metadata: Metadata = {
  title: SP_TITLE,
  description: SP_DESC,
  alternates: { canonical: `${SITE_URL}/supplies` },
  openGraph: { title: SP_TITLE, description: SP_DESC, url: `${SITE_URL}/supplies` },
  twitter: { title: SP_TITLE, description: SP_DESC },
};

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
}

export default function SuppliesPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Supplies &amp; Mats</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Bluesteels · Survivor Vanillas · Collectibles · Epics · Legendaries — bulk pricing
        </p>
      </header>

      {/* Mobile: stacked cards */}
      <div className="mb-10 grid gap-3 md:hidden">
        {SUPPLY_PRICING.map(s => (
          <div key={s.name} className="card">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="font-bold text-white">{s.name}</div>
              <div className="text-right text-xl font-black text-accent">${s.basePrice.toFixed(2)}/k</div>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div>
                <div className="uppercase tracking-wider text-gray-500">Bulk</div>
                <div>{s.bulk ? `${s.bulk.qty}k+ → $${s.bulk.price.toFixed(2)}/k` : '—'}</div>
              </div>
              <div>
                <div className="uppercase tracking-wider text-gray-500">Min order</div>
                <div>{s.minOrder}k</div>
              </div>
            </div>
            <a
              href={shopLink('/shop', `supply-${slug(s.name)}`)}
              target="_blank"
              rel="noopener"
              className="btn-primary w-full text-sm"
            >
              Buy {s.name} →
            </a>
          </div>
        ))}
      </div>

      {/* Desktop: full table */}
      <div className="mb-10 hidden overflow-hidden border-[3px] border-dark-500 bg-dark-700 md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b-[3px] border-dark-600 bg-dark-800/60 text-xs uppercase tracking-wider text-gray-400">
              <th className="px-5 py-3 text-left">Supply</th>
              <th className="px-5 py-3 text-right">Base price</th>
              <th className="px-5 py-3 text-right">Bulk discount</th>
              <th className="px-5 py-3 text-right">Min order</th>
              <th className="px-5 py-3 text-right">Buy</th>
            </tr>
          </thead>
          <tbody>
            {SUPPLY_PRICING.map(s => (
              <tr key={s.name} className="border-b border-dark-600 last:border-0">
                <td className="px-5 py-4 font-bold text-white">{s.name}</td>
                <td className="px-5 py-4 text-right text-lg font-bold text-accent">${s.basePrice.toFixed(2)}/k</td>
                <td className="px-5 py-4 text-right text-sm text-gray-400">
                  {s.bulk ? `${s.bulk.qty}k+: $${s.bulk.price.toFixed(2)}/k` : '—'}
                </td>
                <td className="px-5 py-4 text-right text-sm text-gray-500">{s.minOrder}k</td>
                <td className="px-5 py-4 text-right">
                  <a
                    href={shopLink('/shop', `supply-${slug(s.name)}`)}
                    target="_blank"
                    rel="noopener"
                    className="btn-primary px-3 py-2 text-sm"
                  >
                    Buy →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BuyCTA campaign="supplies-bottom" shopPath="/shop" shopLabel="Browse all supplies →" variant="banner" />

      <section className="mt-10 prose prose-invert max-w-none text-gray-300">
        <h2 className="heading-pixel">What are Sniper Duels supplies?</h2>
        <p>
          Supplies are stackable in-game items used for crafting, trading, and unlocking content in Sniper Duels.
          The most-traded supplies are <strong className="text-white">Bluesteels</strong> (used in defaults and survivor crafts),{' '}
          <strong className="text-white">Survivor Vanillas</strong> (premium survivor mats),{' '}
          <strong className="text-white">Collectibles</strong>, <strong className="text-white">Epics</strong>,{' '}
          and <strong className="text-white">Legendaries</strong>.
        </p>
        <p>
          We carry bulk inventory of all five tiers. Need a custom quantity or a different supply type?{' '}
          <Link href="/middleman" className="text-accent hover:underline">Open a Discord ticket</Link> and we&apos;ll source it from a verified vendor.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Supplies', item: `${SITE_URL}/supplies` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Sniper Duels Supplies',
              numberOfItems: SUPPLY_PRICING.length,
              itemListElement: SUPPLY_PRICING.map((s, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'Product',
                  name: s.name,
                  sku: `sd-supply-${slug(s.name)}`,
                  brand: { '@type': 'Brand', name: 'Sniper Duels' },
                  offers: {
                    '@type': 'Offer',
                    price: s.basePrice,
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                  },
                },
              })),
            },
          ]),
        }}
      />
    </>
  );
}
