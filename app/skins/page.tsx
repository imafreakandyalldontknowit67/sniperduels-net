import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import { SKINS, shopLink } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sniper Duels Skins for Sale — Frankenawp & Hallows Punisher | sniperduels.net',
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
        <h1 className="mb-3 text-4xl font-black uppercase tracking-wider md:text-5xl">
          Sniper Duels <span className="text-accent">Skins</span>
        </h1>
        <p className="text-lg text-gray-400">
          The Frankenawp series and Hallows Punisher series — verified, in-stock, instant delivery.
        </p>
      </header>

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
                <a
                  href={shopLink('/shop', `skin-${s.slug}`)}
                  target="_blank"
                  rel="noopener"
                  className="btn-primary whitespace-nowrap px-4 py-2 text-sm"
                >
                  Buy →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <BuyCTA campaign="skins-mid" shopPath="/shop" shopLabel="Browse all skins on sniperduels.shop →" variant="banner" />

      <section className="mt-10 prose prose-invert max-w-none text-gray-300">
        <h2 className="heading-pixel text-2xl text-white">About Sniper Duels skins</h2>
        <p>
          Skins in Sniper Duels are cosmetic upgrades for your weapons obtained from{' '}
          <strong className="text-white">Skin Cases</strong> in-game. The Frankenawp and Hallows Punisher series are seasonal
          drops with limited supply, making them some of the most sought-after cosmetics in the game.
        </p>
        <p>
          We list four specific colorways at fixed prices ($9 each). For other skins, weapons, or trade-up offers,
          check our <Link href="/values" className="text-accent hover:underline">community value list</Link> and{' '}
          post a trade in <Link href="/middleman" className="text-accent hover:underline">our Discord</Link>.
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
