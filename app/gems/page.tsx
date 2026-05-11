import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import PriceLadder from '@/components/PriceLadder';
import TrustRow from '@/components/TrustRow';
import { shopLink, SHOP_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Buy Sniper Duels Gems — Cheapest Prices, Auto-Delivery | sniperduels.net',
  description:
    'Buy Sniper Duels gems from $2.65/k bulk or $2.90/k retail. Same-day automated delivery from 13+ verified vendors. Cheaper than Robux, no risk, full refund guarantee.',
  alternates: { canonical: 'https://sniperduels.net/gems' },
};

const FAQS = [
  {
    q: 'How much do Sniper Duels gems cost?',
    a: 'Gem prices start at $2.65 per 1,000 gems for bulk orders (100k+) and $2.90 per 1,000 gems for smaller quantities. That works out to roughly 30% less than buying gems through the in-game Robux store.',
  },
  {
    q: 'Is buying Sniper Duels gems safe?',
    a: 'Yes — when you buy from sniperduels.shop, the order is processed through our automated trade bot and a verified vendor. Your wallet is held until delivery is confirmed, and refunds are automatic if the bot can\'t reach you within 30 minutes.',
  },
  {
    q: 'How fast is delivery?',
    a: 'Most orders deliver within 5 minutes. Once you complete checkout, you\'ll get a Discord ping when the bot is ready to trade. You join the private server, hit ready, and the bot delivers.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'Cash App, Venmo, PayPal, Apple Pay, Google Pay, bank transfer, and 20+ cryptocurrencies (Bitcoin, Ethereum, Solana, USDT, USDC, etc.).',
  },
  {
    q: 'Can I buy gems without a Discord account?',
    a: 'Yes — checkout is available directly through sniperduels.shop without Discord. You\'ll receive order updates by email. Linking Discord is optional but unlocks a 2.5% first-purchase discount.',
  },
];

export default function GemsPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Buy <span className="text-accent">Sniper Duels Gems</span>
        </h1>
        <p className="text-lg text-gray-400">
          The cheapest way to get gems in Sniper Duels — from <span className="font-bold text-accent">$2.65/k</span> with
          automated same-day delivery from sniperduels.shop.
        </p>
      </header>

      <section className="mb-8">
        <PriceLadder />
      </section>

      <section className="mb-8">
        <BuyCTA campaign="gems-top" shopPath="/gems" shopLabel="Buy Sniper Duels Gems →" />
      </section>

      <section className="mb-10">
        <TrustRow />
      </section>

      {/* Why cheaper */}
      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">Why are these gems cheaper?</h2>
        <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
          <p>
            When you buy gems through Roblox, you pay Robux — Robux costs roughly $0.0125 each, which translates to about{' '}
            <span className="font-bold text-white">$3.75 per 1,000 gems</span> at the in-game exchange rate.
          </p>
          <p>
            On <a href={SHOP_URL} target="_blank" rel="noopener" className="text-accent hover:underline">sniperduels.shop</a>,
            you buy directly from verified players who have stockpiled gems. Their costs are lower (they earned the gems through gameplay,
            cases, or trading), so they can pass the savings to you. Bulk orders unlock additional vendor discounts down to{' '}
            <span className="font-bold text-accent">$2.65/k</span> — a 30% saving over Roblox prices.
          </p>
          <p>
            Every transaction is brokered by an automated trade bot in a private Roblox server, so there&apos;s no waiting around for a
            vendor to be online and no scam risk.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">How it works</h2>
        <ol className="space-y-3">
          {[
            'Pick the gem amount you want on sniperduels.shop',
            'Pay with your preferred method — fiat or crypto',
            'Get a Discord ping when the bot is ready to trade you',
            'Join the private server, hit "I\'m Ready", trade with the bot',
            'Gems delivered. Done.',
          ].map((step, i) => (
            <li key={i} className="flex gap-4 rounded-lg border border-dark-600 bg-dark-800/40 p-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-black text-dark-900">
                {i + 1}
              </div>
              <div className="pt-1 text-gray-300">{step}</div>
            </li>
          ))}
        </ol>
      </section>

      <BuyCTA campaign="gems-mid" shopPath="/gems" variant="banner" />

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">Frequently Asked</h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="group rounded-lg border border-dark-600 bg-dark-800/40 p-4">
              <summary className="cursor-pointer font-semibold text-white">{f.q}</summary>
              <p className="mt-3 text-sm text-gray-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <BuyCTA campaign="gems-bottom" shopPath="/gems" variant="banner" />

      <p className="mt-8 text-sm text-gray-500">
        Looking for items instead? Browse <Link href="/skins" className="text-accent hover:underline">skins</Link>,{' '}
        <Link href="/supplies" className="text-accent hover:underline">supplies</Link>,
        or check the <Link href="/values" className="text-accent hover:underline">item value list</Link>.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Sniper Duels Gems',
            description: 'In-game premium currency for Sniper Duels (Roblox). Sold per 1,000 gems with bulk discounts.',
            brand: { '@type': 'Brand', name: 'Sniper Duels' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '2.65',
              highPrice: '2.90',
              offerCount: 2,
              availability: 'https://schema.org/InStock',
              url: SHOP_URL + '/gems',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
