import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import PriceLadder from '@/components/PriceLadder';
import { shopLink, SHOP_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Cheap Sniper Duels Gems — From $2.65 per 1k | sniperduels.net',
  description:
    'Looking for cheap Sniper Duels gems? We list the lowest live prices from 13+ verified vendors, starting at $2.65 per 1,000 gems for bulk orders.',
  alternates: { canonical: 'https://sniperduels.net/cheap-gems' },
};

export default function CheapGemsPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Cheap <span className="text-accent">Sniper Duels Gems</span>
        </h1>
        <p className="text-lg text-gray-400">
          Lowest live prices on Sniper Duels gems — currently from{' '}
          <span className="font-bold text-accent">$2.65 per 1,000 gems</span> via sniperduels.shop&apos;s vendor marketplace.
        </p>
      </header>

      <PriceLadder />

      <BuyCTA campaign="cheap-gems-top" shopPath="/gems" shopLabel="Get Cheap Gems →" />

      <section className="my-10 prose prose-invert max-w-none text-gray-300">
        <h2 className="heading-pixel text-2xl text-white">How we keep prices low</h2>
        <p>
          We&apos;re a marketplace, not a reseller. <strong>13+ verified vendors</strong> compete on price for every order on{' '}
          <a href={SHOP_URL} target="_blank" rel="noopener" className="text-accent hover:underline">sniperduels.shop</a>,
          and the cheapest available rate is what you pay. When a new vendor undercuts the others, prices drop instantly.
        </p>
        <p>
          For bulk orders (100k+ gems), you unlock a tier discount that knocks the rate down to{' '}
          <span className="font-bold text-accent">$2.65/k</span> — about 30% less than buying gems through Roblox&apos;s in-game store.
        </p>
        <h2 className="heading-pixel text-2xl text-white">Cheaper than alternatives</h2>
        <ul className="list-disc pl-6">
          <li><strong>Robux gems (in-game):</strong> ~$3.75/k</li>
          <li><strong>Eldorado.gg:</strong> ~$3.20–$3.40/k (variable, plus their fees)</li>
          <li><strong>eBay listings:</strong> ~$3.00/k (no buyer protection)</li>
          <li className="text-accent"><strong>sniperduels.shop bulk:</strong> $2.65/k (full refund guarantee)</li>
        </ul>
      </section>

      <BuyCTA campaign="cheap-gems-bottom" shopPath="/gems" variant="banner" />

      <p className="mt-8 text-sm text-gray-500">
        Want to see a full breakdown? <Link href="/gems" className="text-accent hover:underline">View the gem buying guide →</Link>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Cheap Sniper Duels Gems (Bulk)',
            description: 'Bulk Sniper Duels gems at $2.65 per 1,000 — cheapest live rate on the market.',
            offers: {
              '@type': 'Offer', priceCurrency: 'USD', price: '2.65',
              availability: 'https://schema.org/InStock', url: SHOP_URL + '/gems',
            },
          }),
        }}
      />
    </>
  );
}
