import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import { SKINS, DISCORD_INVITE } from '@/lib/config';
import DiscordButton from '@/components/DiscordButton';

export const metadata: Metadata = {
  title: 'Sniper Duels Skins for Sale — Frankenawp & Hallows Punisher',
  description:
    'Buy verified Sniper Duels skins — Green & Gray Frankenawp, Purple & Orange Hallows Punisher. Fixed prices from $9 each, instant delivery via sniperduels.shop.',
  alternates: { canonical: 'https://sniperduels.net/skins' },
};

const SKIN_META: Record<string, { variant: string; family: string; color: string; ringClass: string }> = {
  'green-frankenawp':           { variant: 'GREEN', family: 'Frankenawp',       color: 'Green',  ringClass: 'border-green-500/60 bg-green-500/5' },
  'gray-frankenawp':            { variant: 'GRAY',  family: 'Frankenawp',       color: 'Gray',   ringClass: 'border-gray-400/60 bg-gray-400/5' },
  'purple-hallows-punisher':    { variant: 'PURPLE',family: 'Hallows Punisher', color: 'Purple', ringClass: 'border-purple-500/60 bg-purple-500/5' },
  'orange-hallows-punisher':    { variant: 'ORANGE',family: 'Hallows Punisher', color: 'Orange', ringClass: 'border-orange-500/60 bg-orange-500/5' },
};

export default function SkinsPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Skins</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Frankenawp + Hallows Punisher · Verified Discord vendors · Free middleman
        </p>
      </header>

      <div className="mb-6 border-[3px] border-pixel-blue/60 bg-pixel-blue/5 p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-pixel-blue-light">Heads up</div>
        <p className="mt-1 text-sm text-gray-300">
          The auto-shop&apos;s skin marketplace is launching soon. Until then, all skin orders go through Discord with a free verified middleman —
          no payment risk, instant in-game handoff.
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {SKINS.map(s => {
          const meta = SKIN_META[s.slug] ?? { variant: 'V1', family: s.name, color: '', ringClass: 'border-dark-500 bg-dark-800' };
          return (
            <div key={s.slug} className={`relative overflow-hidden border-[3px] p-5 ${meta.ringClass}`}>
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">In stock · auto-deliver</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-500">{meta.family}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-accent">${s.price.toFixed(2)}</div>
                  <div className="text-[10px] uppercase text-gray-500">USD</div>
                </div>
              </div>
              {/* Pixel "skin preview" — large rarity-tinted block until we have real screenshots */}
              <div className="my-4 flex aspect-[16/9] items-center justify-center border-[2px] border-dark-700 bg-dark-900/60 text-center">
                <div>
                  <div className="text-4xl font-black text-white opacity-60">{meta.variant}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-500">{meta.family}</div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-bold text-white">{s.name}</div>
                <DiscordButton href={DISCORD_INVITE} size="sm">Buy via Discord</DiscordButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discord-only banner since item shop isn't live */}
      <div className="my-8 border-[3px] border-accent/60 bg-gradient-to-br from-dark-800 to-dark-900 p-6 md:p-8" style={{ boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.4), 0 4px 0 rgba(0,0,0,0.5)' }}>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">Order a skin</div>
            <div className="text-2xl font-black uppercase tracking-wider text-white md:text-3xl">Open a Discord ticket</div>
            <div className="mt-1 text-sm text-gray-400">Free middleman · in-stock vendors · ~5 min handoff</div>
          </div>
          <DiscordButton href={DISCORD_INVITE} size="lg">Open Ticket</DiscordButton>
        </div>
      </div>

      <section className="mt-10 prose prose-invert max-w-none text-gray-300">
        <h2 className="heading-pixel">About Sniper Duels skins</h2>
        <p>
          Skins in Sniper Duels are cosmetic upgrades for your weapons obtained from{' '}
          <strong className="text-white">Skin Cases</strong> in-game. The Frankenawp and Hallows Punisher series are seasonal
          drops with limited supply, making them some of the most sought-after cosmetics in the game.
        </p>
        <p>
          We list four specific colorways at fixed prices ($9 each). All orders currently route through Discord with a free
          verified <Link href="/middleman" className="text-accent hover:underline">middleman</Link> — auto-shop integration is
          coming soon. For other skins, weapons, or trade-ups, check the{' '}
          <Link href="/values" className="text-accent hover:underline">community value list</Link>.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Sniper Duels Skins',
            itemListElement: SKINS.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Product',
                name: s.name,
                category: 'Sniper Duels Skin',
                offers: {
                  '@type': 'Offer',
                  price: s.price,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
              },
            })),
          }),
        }}
      />
    </>
  );
}
