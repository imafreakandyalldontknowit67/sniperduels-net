import type { Metadata } from 'next';
import Link from 'next/link';
import { DISCORD_INVITE, SHOP_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Free Sniper Duels Middleman — Trade Safely | sniperduels.net',
  description:
    'Free verified middleman service for Sniper Duels trades. We hold both sides of high-value trades until everyone confirms. Open a ticket in 30 seconds. No fees, no scams.',
  alternates: { canonical: 'https://sniperduels.net/middleman' },
};

const TIERS = [
  { name: 'Trial MM', max: '$50',   color: 'border-gray-500' },
  { name: 'MM',       max: '$250',  color: 'border-pixel-blue' },
  { name: 'Senior MM',max: '$500',  color: 'border-purple-500' },
  { name: 'Head MM',  max: '∞',     color: 'border-accent' },
];

export default function MiddlemanPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Free <span className="text-accent">Sniper Duels Middleman</span>
        </h1>
        <p className="text-lg text-gray-400">
          Trading something high-value? Open a middleman ticket — we hold both sides until everyone confirms.
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
          <div className="mb-2 text-3xl">🔒</div>
          <h3 className="mb-2 text-lg font-bold">Both sides held</h3>
          <p className="text-sm text-gray-400">
            You and the other trader both send your items/gems to a verified middleman in our private server.
            They release only after both sides confirm receipt.
          </p>
        </div>
        <div className="card">
          <div className="mb-2 text-3xl">⚡</div>
          <h3 className="mb-2 text-lg font-bold">Fast (~5 min)</h3>
          <p className="text-sm text-gray-400">
            Middlemen are on standby. Open a ticket, both sides join the private Roblox server,
            trade is brokered, you&apos;re done in ~5 minutes.
          </p>
        </div>
        <div className="card">
          <div className="mb-2 text-3xl">💰</div>
          <h3 className="mb-2 text-lg font-bold">Free always</h3>
          <p className="text-sm text-gray-400">
            We don&apos;t charge for middleman service. The shop business covers it — we just want safe trades for the community.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">Middleman tiers</h2>
        <p className="mb-4 text-gray-400">
          Higher-value trades go to more experienced middlemen. Every middleman is verified by the head moderator team.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {TIERS.map(t => (
            <div key={t.name} className={`rounded-lg border-2 ${t.color} bg-dark-800/40 p-4 text-center`}>
              <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Max trade</div>
              <div className="mt-1 text-3xl font-black text-white">{t.max}</div>
              <div className="mt-2 text-sm font-semibold">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">How a middleman trade works</h2>
        <ol className="space-y-3">
          {[
            'Both traders open a single middleman ticket in the Discord server',
            'A verified middleman claims the ticket and joins the private Roblox server',
            'Both sides send their items/gems to the middleman',
            'Middleman confirms receipt of both sides + checks for FX, condition, and quantity match',
            'Middleman releases each side\'s items to the correct trader',
            'Trade complete — ticket auto-closed, transcript logged',
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

      <div className="rounded-xl border-2 border-accent/30 bg-gradient-to-br from-dark-800 to-dark-900 p-6 md:p-8 text-center">
        <h2 className="mb-2 text-2xl font-black text-white">Ready to trade safely?</h2>
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
