import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import PriceLadder from '@/components/PriceLadder';
import TrustRow from '@/components/TrustRow';
import SectionBanner from '@/components/SectionBanner';
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
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Buy <span className="text-accent">Sniper Duels Gems</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          From <span className="text-accent">$2.65/k</span> · Same-day auto-delivery · Sniper Duels trade bot
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
      <section className="mb-12">
        <SectionBanner color="blue" align="left" eyebrow="Roblox: $3.75/k. sniperduels.shop: $2.65/k bulk.">
          Why These Gems Are Cheaper
        </SectionBanner>
        <ul className="grid gap-2 text-sm text-gray-300 sm:grid-cols-3">
          <li className="border-l-[3px] border-accent/60 pl-3">Buy direct from verified players, not Roblox</li>
          <li className="border-l-[3px] border-accent/60 pl-3">Bulk pricing kicks in at 100k gems</li>
          <li className="border-l-[3px] border-accent/60 pl-3">Auto-trade bot — no waiting for a vendor</li>
        </ul>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <SectionBanner color="gold" eyebrow="Five steps from checkout to gems delivered">
          How It Works
        </SectionBanner>
        <ol className="space-y-3">
          {[
            'Pick the gem amount you want on sniperduels.shop',
            'Pay with your preferred method — fiat or crypto',
            'Get a Discord ping when the bot is ready to trade you',
            'Join the private server, hit "I\'m Ready", trade with the bot',
            'Gems delivered. Done.',
          ].map((step, i) => (
            <li key={i} className="flex gap-4 border-[3px] border-dark-500 bg-dark-700 p-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-[2px] border-accent-dark bg-accent text-sm font-black text-dark-900">
                {i + 1}
              </div>
              <div className="pt-1 text-gray-200">{step}</div>
            </li>
          ))}
        </ol>
      </section>

      <BuyCTA campaign="gems-mid" shopPath="/gems" variant="banner" />

      {/* FAQ */}
      <section className="mb-12">
        <SectionBanner color="blue" eyebrow="Click to expand">
          Frequently Asked
        </SectionBanner>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="group border-[3px] border-dark-500 bg-dark-700 p-4">
              <summary className="cursor-pointer font-bold uppercase tracking-wider text-white">{f.q}</summary>
              <p className="mt-3 text-sm text-gray-300">{f.a}</p>
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
