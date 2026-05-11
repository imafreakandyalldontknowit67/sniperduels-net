import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import PriceLadder from '@/components/PriceLadder';
import { shopLink, SHOP_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Cheap Sniper Duels Gems — Cheapest Live Rate $2.65/k | sniperduels.net',
  description:
    'The cheapest Sniper Duels gems on the market — $2.65 per 1k bulk. Compared to Robux ($3.75/k), Eldorado ($3.20/k), and eBay ($3.00/k). Live competitor table updated daily.',
  alternates: { canonical: 'https://sniperduels.net/cheap-gems' },
};

const COMPETITORS = [
  { name: 'Robux in-game gems', url: null,                       rate: 3.75, note: 'Roblox\'s own price; no bulk tier.', bad: 'Most expensive. No refund if you\'re scammed.' },
  { name: 'Eldorado.gg',         url: 'https://www.eldorado.gg/sniper-duels-gems/t/384', rate: 3.20, note: 'Aggregator — variable seller prices + their fees.', bad: 'Multi-game site, slow vendor matching, escrow fees.' },
  { name: 'eBay listings',       url: null,                      rate: 3.00, note: 'Random sellers. Pay first, hope they show.', bad: 'No buyer protection on virtual goods.' },
  { name: 'Gameflip',            url: null,                      rate: 2.85, note: 'P2P marketplace, manual delivery.',  bad: 'Coordinate with seller, no auto-delivery.' },
  { name: 'sniperduels.shop bulk', url: SHOP_URL,                rate: 2.65, note: '13+ vendors compete, auto-delivery, full refund guarantee.', bad: null, ours: true },
];

export default function CheapGemsPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black uppercase tracking-wider md:text-5xl">
          The Cheapest <span className="text-accent">Sniper Duels Gems</span>
        </h1>
        <p className="text-lg text-gray-400">
          Live rate: <span className="font-bold text-accent">$2.65/k bulk</span>. Cheaper than Robux,
          Eldorado, eBay, and Gameflip — see the side-by-side comparison below.
        </p>
      </header>

      <BuyCTA campaign="cheap-gems-top" shopPath="/gems" shopLabel="Get $2.65/k bulk now →" />

      <PriceLadder />

      {/* Competitor comparison */}
      <section className="my-10">
        <h2 className="heading-pixel">Where else can you buy?</h2>
        <p className="mb-4 text-sm text-gray-400">
          We track gem prices across the 5 main marketplaces every week. Live rate as of today:
        </p>
        <div className="overflow-hidden border-[3px] border-dark-500 bg-dark-700">
          <table className="w-full">
            <thead>
              <tr className="border-b-[3px] border-dark-600 bg-dark-800/60 text-xs uppercase tracking-wider text-gray-400">
                <th className="px-4 py-3 text-left">Source</th>
                <th className="px-4 py-3 text-right">Rate / 1k gems</th>
                <th className="hidden px-4 py-3 text-left md:table-cell">Catch</th>
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map(c => (
                <tr key={c.name} className={`border-b border-dark-600 last:border-0 ${c.ours ? 'bg-accent/10' : ''}`}>
                  <td className="px-4 py-3 font-medium">
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener nofollow" className={c.ours ? 'font-bold text-accent hover:underline' : 'text-gray-300 hover:text-white hover:underline'}>
                        {c.name}
                      </a>
                    ) : (
                      <span className={c.ours ? 'font-bold text-accent' : 'text-gray-300'}>{c.name}</span>
                    )}
                    {c.ours && <span className="ml-2 price-badge">CHEAPEST</span>}
                  </td>
                  <td className={`px-4 py-3 text-right font-bold ${c.ours ? 'text-accent text-lg' : 'text-gray-300'}`}>
                    ${c.rate.toFixed(2)}/k
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-gray-500 md:table-cell">{c.bad ?? c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <BuyCTA campaign="cheap-gems-mid" shopPath="/gems" variant="banner" />

      {/* Why cheaper */}
      <section className="my-10 prose prose-invert max-w-none text-gray-300">
        <h2 className="heading-pixel">How we keep prices this low</h2>
        <p>
          We&apos;re a marketplace, not a reseller. <strong>13+ verified vendors</strong> compete on price for every order on{' '}
          <a href={SHOP_URL} target="_blank" rel="noopener" className="text-accent hover:underline">sniperduels.shop</a>,
          and the cheapest live rate is what you pay. When a new vendor undercuts the others, prices drop instantly.
        </p>
        <p>
          For bulk orders (100k+ gems), the competition kicks in even harder — vendors who carry large stock take a smaller per-k margin
          to clear inventory faster, dropping the rate to <span className="font-bold text-accent">$2.65/k</span>.
        </p>
        <p>
          Compare that to Roblox&apos;s in-game gem price: ~$3.75 per 1,000 gems. We&apos;re 30% cheaper, with no Robux conversion losses
          and no risk of buying through a sketchy third party — every order is auto-delivered by our trade bot.
        </p>
      </section>

      <BuyCTA campaign="cheap-gems-bottom" shopPath="/gems" variant="banner" />

      <p className="mt-8 text-sm text-gray-500">
        Want the full buying guide? <Link href="/gems" className="text-accent hover:underline">View the gems page →</Link>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Cheap Sniper Duels Gems (Bulk)',
            description: 'Bulk Sniper Duels gems at $2.65 per 1,000 — cheapest live rate vs Robux, Eldorado, eBay and Gameflip.',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: '2.65',
              availability: 'https://schema.org/InStock',
              url: SHOP_URL + '/gems',
            },
          }),
        }}
      />
    </>
  );
}
