import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Coins } from 'lucide-react';
import { DISCORD_INVITE } from '@/lib/config';
import DiscordButton from '@/components/DiscordButton';
import SectionBanner from '@/components/SectionBanner';
import SpritePanel from '@/components/SpritePanel';

export const metadata: Metadata = {
  title: 'Free Sniper Duels Middleman — Trade Safely | sniperduels.net',
  description:
    'Free verified middleman service for Sniper Duels trades. MM holds the seller\'s item until the buyer\'s payment lands, then releases both. No fees, no scams.',
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
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Free <span className="text-accent">Sniper Duels Middleman</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Selling an item? MM holds it until the buyer&apos;s payment lands.{' '}
          <span className="text-white">Always free.</span>
        </p>
      </header>

      <section className="mb-10">
        <DiscordButton href={DISCORD_INVITE} size="lg">
          Open Discord Ticket
        </DiscordButton>
      </section>

      <section className="mb-12 grid gap-6 md:grid-cols-3">
        <SpritePanel className="min-h-[180px]">
          <ShieldCheck className="mb-2 h-7 w-7 text-accent" strokeWidth={2.5} />
          <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white sm:text-lg">Item held first</h3>
          <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
            Seller hands the item to a verified MM. Held until buyer pays.
          </p>
        </SpritePanel>
        <SpritePanel className="min-h-[180px]">
          <Zap className="mb-2 h-7 w-7 text-accent" strokeWidth={2.5} />
          <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white sm:text-lg">Fast (~5 min)</h3>
          <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
            Seller sends item, buyer sends funds, MM releases both.
          </p>
        </SpritePanel>
        <SpritePanel className="min-h-[180px]">
          <Coins className="mb-2 h-7 w-7 text-accent" strokeWidth={2.5} />
          <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white sm:text-lg">Free always</h3>
          <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
            No fees, ever. The shop covers it.
          </p>
        </SpritePanel>
      </section>

      <section className="mb-12">
        <SectionBanner color="blue" eyebrow="Verified by head mods. Higher-value trades → higher tier.">
          Middleman Tiers
        </SectionBanner>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {TIERS.map((t, i) => (
            <div key={t.name} className={`relative border-[3px] ${t.ringClass} p-4 text-center`}>
              <div className={`text-[10px] font-bold uppercase tracking-wider ${t.labelClass}`}>Tier {i + 1} · Max trade</div>
              <div className={`mt-1 text-3xl font-black ${t.valueClass}`}>{t.max}</div>
              <div className="mt-2 text-sm font-bold uppercase tracking-wider text-white">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionBanner color="gold" eyebrow="6 steps from open ticket to released trade">
          How A Middleman Trade Works
        </SectionBanner>
        <ol className="space-y-3">
          {[
            'Both traders open a single middleman ticket on Discord',
            'A verified middleman claims the ticket and joins the private Roblox server',
            'Seller hands the item to the middleman first — MM confirms FX, condition, and stat match',
            'Buyer sends payment (gems, crypto, or fiat) — MM verifies funds landed',
            'Middleman releases the item to the buyer and forwards the payment to the seller',
            'Trade complete — ticket auto-closed, transcript logged',
          ].map((step, i) => (
            <li key={i} className="flex gap-4 border-[3px] border-dark-500 bg-dark-700 p-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-[2px] border-accent-dark bg-accent text-sm font-black text-dark-900">
                {i + 1}
              </div>
              <div className="pt-1 text-sm leading-relaxed text-gray-200">{step}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <SectionBanner color="blue" eyebrow="Use a middleman whenever any of these apply">
          When You Need One
        </SectionBanner>
        <ul className="grid gap-2 text-sm text-gray-300 sm:grid-cols-2">
          <li className="border-l-[3px] border-accent/60 pl-3">Godly, Ancient, or Vintage items</li>
          <li className="border-l-[3px] border-accent/60 pl-3">Cross-condition trades (Mint vs Standard)</li>
          <li className="border-l-[3px] border-accent/60 pl-3">Rare FX or Addons that affect value</li>
          <li className="border-l-[3px] border-accent/60 pl-3">Anyone you don&apos;t personally know</li>
          <li className="border-l-[3px] border-accent/60 pl-3">First trades over $25 market value</li>
        </ul>
      </section>

      <div className="border-[3px] border-accent/60 bg-gradient-to-br from-dark-800 to-dark-900 p-6 md:p-8 text-center" style={{ boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.4), 0 4px 0 rgba(0,0,0,0.5)' }}>
        <h2 className="mb-2 text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">Ready to trade safely?</h2>
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400 sm:text-sm">Average response under 60 seconds</p>
        <div className="flex justify-center">
          <DiscordButton href={DISCORD_INVITE} size="lg">Open Ticket</DiscordButton>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-500">
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
            description: 'Free verified middleman service for Sniper Duels trades. MM holds the seller\'s item until the buyer\'s payment lands.',
            url: 'https://sniperduels.net/middleman',
          }),
        }}
      />
    </>
  );
}
