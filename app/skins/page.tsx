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

export default function SkinsPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Sniper Duels <span className="text-accent">Skins</span>
        </h1>
        <p className="text-lg text-gray-400">
          The Frankenawp series and Hallows Punisher series — verified, in-stock, instant delivery.
        </p>
      </header>

      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {SKINS.map(s => (
          <div key={s.slug} className="card flex items-center justify-between">
            <div>
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">In stock</div>
              <div className="text-lg font-black text-white">{s.name}</div>
              <div className="mt-1 text-2xl font-black text-accent">${s.price.toFixed(2)}</div>
            </div>
            <a href={shopLink('/shop', `skin-${s.slug}`)} target="_blank" rel="noopener" className="btn-primary">
              Buy →
            </a>
          </div>
        ))}
      </div>

      <BuyCTA campaign="skins-mid" shopPath="/shop" shopLabel="Browse all skins →" variant="banner" />

      <section className="mt-10 prose prose-invert max-w-none text-gray-300">
        <h2 className="heading-pixel text-2xl text-white">About Sniper Duels skins</h2>
        <p>
          Skins in Sniper Duels are cosmetic upgrades for your weapons obtained from{' '}
          <strong className="text-white">Skin Cases</strong> in-game. The Frankenawp and Hallows Punisher series are seasonal
          drops with limited supply, making them some of the most sought-after cosmetics in the game.
        </p>
        <p>
          We list four specific skins at fixed prices ($9 each). For other skins, weapons, or trade-up offers,
          check our <Link href="/values" className="text-accent hover:underline">community value list</Link> and{' '}
          post a trade in <Link href="/middleman" className="text-accent hover:underline">our Discord</Link>.
        </p>
      </section>
    </>
  );
}
