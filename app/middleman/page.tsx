import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, Zap, Coins } from 'lucide-react';
import { DISCORD_INVITE, SHOP_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Free Sniper Duels Middleman — Trade Safely | sniperduels.net',
  description:
    'Free verified middleman service for Sniper Duels trades. We hold both sides of high-value trades until everyone confirms. Open a ticket in 30 seconds. No fees, no scams.',
  alternates: { canonical: 'https://sniperduels.net/middleman' },
};

const TIERS = [
  { name: 'Trial MM',  max: '$50',  ringClass: 'border-gray-500/60 bg-gray-500/5',     valueClass: 'text-gray-200',   labelClass: 'text-gray-400' },
  { name: 'MM',        max: '$250', ringClass: 'border-blue-500/60 bg-blue-500/5',     valueClass: 'text-blue-200',   labelClass: 'text-blue-300' },
  { name: 'Senior MM', max: '$500', ringClass: 'border-purple-500/60 bg-purple-500/5', valueClass: 'text-purple-200', labelClass: 'text-purple-300' },
  { name: 'Head MM',   max: '∞',    ringClass: 'border-accent/70 bg-accent/10',        valueClass: 'text-accent',     labelClass: 'text-accent/80' },
];

export default function MiddlemanPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Free <span className="text-accent">Sniper Duels Middleman</span>
        </h1>
        <p className="text-lg text-gray-400">
          Selling an item? Open a middleman ticket — the MM holds your item until the buyer&apos;s payment lands, then releases both.
          <span className="font-bold text-white"> Always free.</span>
        </p>
      </header>

      <section className="mb-8">
        <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="btn-discord px-8 py-4 text-lg">
          Open Middleman Ticket on Discord →
        </a>
      </section>

      <section className="mb-10 grid gap-6 md:grid-cols-3">
        <div className="card">
          <Lock className="mb-3 h-8 w-8 text-accent" strokeWidth={2.5} />
          <h3 className="mb-2 text-lg font-bold uppercase tracking-wider">Item held first</h3>
          <p className="text-sm text-gray-400">
            Seller hands the item to a verified MM. Held until buyer&apos;s payment lands — buyer-side scam impossible.
          </p>
        </div>
        <div className="card">
          <Zap className="mb-3 h-8 w-8 text-accent" strokeWidth={2.5} />
          <h3 className="mb-2 text-lg font-bold uppercase tracking-wider">Fast (~5 min)</h3>
          <p className="text-sm text-gray-400">
            Middlemen on standby. Seller sends item, buyer sends funds, MM releases both.
          </p>
        </div>
        <div className="card">
          <Coins className="mb-3 h-8 w-8 text-accent" strokeWidth={2.5} />
          <h3 className="mb-2 text-lg font-bold uppercase tracking-wider">Free always</h3>
          <p className="text-sm text-gray-400">
            No fees, ever. The shop business covers it — we just want safe community trades.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">Middleman tiers</h2>
        <p className="mb-4 text-gray-400">
          Higher-value trades go to more experienced middlemen. Every middleman is verified by the head moderator team.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {TIERS.map((t, i) => (
            <div key={t.name} className={`relative border-[3px] ${t.ringClass} p-4 text-center`}>
              <div className={`text-[10px] font-bold uppercase tracking-wider ${t.labelClass}`}>Tier {i + 1} · Max trade</div>
              <div className={`mt-1 text-3xl font-black ${t.valueClass}`}>{t.max}</div>
              <div className="mt-2 text-sm font-bold uppercase tracking-wider text-white">{t.name}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">Tiers progress gray → blue → purple → gold as max-trade authority increases.</p>
      </section>

      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">How a middleman trade works</h2>
        <ol className="space-y-3">
          {[
            'Both traders open a single middleman ticket in the Discord server',
            'A verified middleman claims the ticket and joins the private Roblox server',
            'Seller hands their in-game item to the middleman first — MM confirms FX, condition, and stat match',
            'Buyer sends payment (gems, crypto, or fiat) to the agreed destination — MM verifies funds landed',
            'Middleman releases the item to the buyer and forwards the payment to the seller',
            'Trade complete — ticket auto-closed, transcript logged',
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

      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">When you should use a middleman</h2>
        <ul className="space-y-2 text-gray-400">
          <li>✓ Any trade involving Godly, Ancient, or Vintage items</li>
          <li>✓ Cross-condition trades (Mint Condition vs Standard Issue value swings)</li>
          <li>✓ Trades involving rare FX or Addons that affect value</li>
          <li>✓ Anyone you don&apos;t personally know and trust</li>
          <li>✓ First trades over $25 in market value</li>
        </ul>
      </section>

      <div className="border-[3px] border-accent/60 bg-gradient-to-br from-dark-800 to-dark-900 p-6 md:p-8 text-center" style={{ boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.4), 0 4px 0 rgba(0,0,0,0.5)' }}>
        <h2 className="mb-2 text-2xl font-black uppercase tracking-wider text-white">Ready to trade safely?</h2>
        <p className="mb-4 text-gray-400">Open a middleman ticket in our Discord — average response under 60 seconds.</p>
        <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="btn-discord px-8 py-4 text-lg">
          Join Discord & Open Ticket →
        </a>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Buying or selling instead?{' '}
        <Link href="/gems" className="text-accent hover:underline">Buy gems direct on sniperduels.shop →</Link>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Sniper Duels Middleman',
            provider: { '@type': 'Organization', name: 'sniperduels.net' },
            areaServed: 'Sniper Duels (Roblox)',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            description: 'Free verified middleman service for Sniper Duels trades. We hold both sides of trades until everyone confirms.',
            url: 'https://sniperduels.net/middleman',
          }),
        }}
      />
    </>
  );
}
