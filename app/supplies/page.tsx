import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import { SUPPLY_PRICING, shopLink } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sniper Duels Supplies — Bluesteels, Vanillas, Collectibles | sniperduels.net',
  description:
    'Buy Sniper Duels supplies — Bluesteels from $3.85/k, Survivor Vanillas, Collectibles, Epics and Legendaries. Bulk pricing, instant delivery.',
  alternates: { canonical: 'https://sniperduels.net/supplies' },
};

export default function SuppliesPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Sniper Duels <span className="text-accent">Supplies &amp; Mats</span>
        </h1>
        <p className="text-lg text-gray-400">
          Bluesteels, Survivor Vanillas, Collectibles, Epics, and Legendaries — bulk pricing on every tier.
        </p>
      </header>

      <div className="mb-10 overflow-hidden rounded-lg border border-dark-500 bg-dark-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-600 bg-dark-700/50 text-xs uppercase tracking-wider text-gray-400">
              <th className="px-5 py-3 text-left">Supply</th>
              <th className="px-5 py-3 text-right">Base price</th>
              <th className="px-5 py-3 text-right">Bulk</th>
              <th className="px-5 py-3 text-right">Min order</th>
              <th className="px-5 py-3 text-right">Buy</th>
            </tr>
          </thead>
          <tbody>
            {SUPPLY_PRICING.map(s => (
              <tr key={s.name} className="border-b border-dark-700 last:border-0">
                <td className="px-5 py-4 font-bold text-white">{s.name}</td>
                <td className="px-5 py-4 text-right text-lg font-bold text-accent">${s.basePrice.toFixed(2)}/k</td>
                <td className="px-5 py-4 text-right text-sm text-gray-400">
                  {s.bulk ? `${s.bulk.qty}k+: $${s.bulk.price.toFixed(2)}/k` : '—'}
                </td>
                <td className="px-5 py-4 text-right text-sm text-gray-500">{s.minOrder}k</td>
                <td className="px-5 py-4 text-right">
                  <a href={shopLink('/shop', `supply-${s.name.toLowerCase().replace(/[^a-z]+/g, '-')}`)} target="_blank" rel="noopener" className="btn-primary px-3 py-2 text-sm">
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
        <h2 className="heading-pixel text-2xl text-white">What are Sniper Duels supplies?</h2>
        <p>
          Supplies are stackable in-game items used for crafting, trading, and unlocking content in Sniper Duels.
          The most-traded supplies are <strong className="text-white">Bluesteels</strong> (used in defaults and survivor crafts),{' '}
          <strong className="text-white">Survivor Vanillas</strong> (premium survivor mats),{' '}
          <strong className="text-white">Collectibles</strong>, <strong className="text-white">Epics</strong>,{' '}
          and <strong className="text-white">Legendaries</strong>.
        </p>
        <p>
          We carry bulk inventory of all five tiers. Need a custom quantity or different supply type?{' '}
          <Link href="/middleman" className="text-accent hover:underline">Open a Discord ticket</Link> and we&apos;ll source it from a verified vendor.
        </p>
      </section>
    </>
  );
}
