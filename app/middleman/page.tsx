import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Coins } from 'lucide-react';
import { DISCORD_INVITE, SITE_URL } from '@/lib/config';
import DiscordButton from '@/components/DiscordButton';
import SectionBanner from '@/components/SectionBanner';
import SpritePanel from '@/components/SpritePanel';

const MM_TITLE = 'Free Sniper Duels Middleman — Trade Safely';
const MM_DESC =
  'Free verified middleman service for Sniper Duels cash trades. MM holds the item until payment lands, then releases both. No fees, no scams.';

export const metadata: Metadata = {
  title: MM_TITLE,
  description: MM_DESC,
  alternates: { canonical: `${SITE_URL}/middleman` },
  openGraph: { title: MM_TITLE, description: MM_DESC, url: `${SITE_URL}/middleman` },
  twitter: { title: MM_TITLE, description: MM_DESC },
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
          For <span className="text-white">cash sales</span> (USD/crypto-for-item). MM holds the item until payment lands.
          In-game gem-for-item trades are atomic — no middleman needed.{' '}
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
        <SectionBanner color="blue" eyebrow="Middleman = for real-money trades only. In-game gem trades are atomic.">
          When You Actually Need One
        </SectionBanner>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-[3px] border-emerald-500/60 bg-emerald-500/5 p-5">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">Use a middleman</div>
            <ul className="space-y-1.5 text-sm text-gray-200">
              <li>Selling an item for <span className="text-white">USD or crypto</span></li>
              <li>Buying an item with <span className="text-white">cash</span> from someone you don&apos;t know</li>
              <li>Cross-platform trades (e.g. Roblox item ↔ PayPal)</li>
              <li>First cash trade with any new vendor</li>
            </ul>
          </div>
          <div className="border-[3px] border-dark-500 bg-dark-700 p-5">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">No middleman needed</div>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li>In-game <span className="text-white">gem-for-item</span> trades — Sniper Duels swaps both sides atomically</li>
              <li>In-game <span className="text-white">item-for-item</span> trades — same atomic trade window</li>
              <li>Buying gems on sniperduels.shop — the trade bot already auto-delivers</li>
            </ul>
          </div>
        </div>
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
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Sniper Duels Middleman',
              provider: { '@type': 'Organization', name: 'sniperduels.net', url: 'https://sniperduels.net' },
              areaServed: 'Sniper Duels (Roblox)',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              description: 'Free verified middleman service for Sniper Duels trades. MM holds the seller\'s item until the buyer\'s payment lands.',
              url: 'https://sniperduels.net/middleman',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sniperduels.net' },
                { '@type': 'ListItem', position: 2, name: 'Middleman', item: 'https://sniperduels.net/middleman' },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How much does a Sniper Duels middleman cost?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Nothing. The middleman service on sniperduels.net is always free — sniperduels.shop covers the cost as a community service.' },
                },
                {
                  '@type': 'Question',
                  name: 'Are Sniper Duels middlemen verified?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every middleman is vetted by the head moderator team. Tiers (Trial / MM / Senior MM / Head MM) cap each MM at the trade value they\'re authorized to broker.' },
                },
                {
                  '@type': 'Question',
                  name: 'Who deposits first in a middleman trade?',
                  acceptedAnswer: { '@type': 'Answer', text: 'The seller hands the item to the middleman first. Once the MM confirms the item, the buyer sends payment. Then the MM releases both. Buyer-side scams become impossible because the item is already in escrow.' },
                },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
