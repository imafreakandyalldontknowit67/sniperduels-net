import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import BuyCTA from '@/components/BuyCTA';
import PriceLadder from '@/components/PriceLadder';
import TrustRow from '@/components/TrustRow';
import { topWeapons, rarityClasses } from '@/lib/weapons';
import { shopLink, SHOP_URL, DISCORD_INVITE } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Cheapest Sniper Duels Gems & Items — From $2.65/k',
  description:
    'The cheapest place to buy Sniper Duels gems, skins, sharkmats and supplies. Same-day automated delivery via sniperduels.shop. Free middleman service for trades.',
};

export default function Home() {
  const featured = topWeapons(8);

  return (
    <>
      {/* Hero */}
      <section className="mb-12 text-center">
        <div className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
          Auto-delivery · 24/7 · Discord-verified vendors
        </div>
        <h1 className="mb-4 text-4xl font-black leading-tight md:text-6xl">
          Cheapest <span className="text-accent">Sniper Duels Gems</span>
          <br />
          <span className="text-2xl font-bold text-gray-300 md:text-3xl">+ Skins, Sharkmats &amp; Free Middleman</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
          Buy gems from <span className="font-bold text-accent">$2.65/k</span> with same-day automated delivery.
          Backed by 13+ verified vendors and a free middleman service for high-value trades.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={shopLink('/gems', 'home-hero')} target="_blank" rel="noopener" className="btn-primary px-8 py-4 text-lg">
            Buy Gems Now →
          </a>
          <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="btn-discord px-8 py-4 text-lg">
            Join Discord
          </a>
        </div>
      </section>

      {/* Trust */}
      <section className="mb-12">
        <TrustRow />
      </section>

      {/* Pricing */}
      <section className="mb-12">
        <h2 className="heading-pixel mb-4 text-2xl text-white">Live Gem Prices</h2>
        <PriceLadder />
      </section>

      {/* Why us */}
      <section className="mb-12 grid gap-6 md:grid-cols-3">
        <div className="card">
          <div className="mb-2 text-3xl">⚡</div>
          <h3 className="mb-2 text-lg font-bold">Instant Auto-Delivery</h3>
          <p className="text-sm text-gray-400">
            The Sniper Duels trade bot is online 24/7. Most orders deliver in under 5 minutes.
          </p>
        </div>
        <div className="card">
          <div className="mb-2 text-3xl">🔒</div>
          <h3 className="mb-2 text-lg font-bold">Free Middleman</h3>
          <p className="text-sm text-gray-400">
            Trading high-value items? Open a middleman ticket — we hold both sides until everyone confirms. No fees, no scams.{' '}
            <Link href="/middleman" className="text-accent hover:underline">Learn more →</Link>
          </p>
        </div>
        <div className="card">
          <div className="mb-2 text-3xl">💸</div>
          <h3 className="mb-2 text-lg font-bold">Cheaper Than Roblox</h3>
          <p className="text-sm text-gray-400">
            Up to 30% less than the in-game Robux price for the same gem amount. Multiple vendors compete for your order.
          </p>
        </div>
      </section>

      {/* Featured items */}
      <section className="mb-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="heading-pixel text-2xl text-white">Top Sniper Duels Items</h2>
          <Link href="/values" className="text-sm font-semibold text-accent hover:underline">
            See all values →
          </Link>
        </div>
        {featured.length === 0 ? (
          <div className="card text-center text-gray-500">Item data is being refreshed — check back soon.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {featured.map(w => {
              const topPrice = Math.max(0, ...w.variants.map(v => v.price));
              return (
                <Link
                  key={w.id}
                  href={`/values/${w.id}`}
                  className="card hover:border-accent/50 hover:no-underline"
                >
                  {w.imagePath && (
                    <div className="mb-3 flex h-24 items-center justify-center rounded bg-dark-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={w.imagePath}
                        alt={w.displayName}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}
                  <div className={`mb-1 inline-block rounded-sm border px-1.5 py-0.5 text-[10px] font-bold uppercase ${rarityClasses(w.rarity)}`}>
                    {w.rarity}
                  </div>
                  <div className="truncate font-bold text-white">{w.displayName}</div>
                  <div className="text-xs text-gray-500">{w.weaponType}</div>
                  {topPrice > 0 && (
                    <div className="mt-2 text-sm font-bold text-accent">{topPrice.toLocaleString()} gems</div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <BuyCTA campaign="home-banner" variant="banner" />

      {/* What is this */}
      <section className="mb-12">
        <h2 className="heading-pixel mb-4 text-2xl text-white">What is sniperduels.net?</h2>
        <div className="prose prose-invert max-w-none text-gray-400">
          <p>
            <strong className="text-white">sniperduels.net</strong> is the community marketplace and price guide for{' '}
            <a href="https://www.roblox.com/games/109397169461300" target="_blank" rel="noopener" className="text-accent hover:underline">
              Sniper Duels
            </a>
            , the popular Roblox FPS. We aggregate live gem and supply prices from{' '}
            <a href={SHOP_URL} target="_blank" rel="noopener" className="text-accent hover:underline">sniperduels.shop</a>{' '}
            (the official Discord-backed auto-shop), and connect traders directly through our verified middleman service.
          </p>
          <p>
            Whether you&apos;re buying <Link href="/gems" className="text-accent hover:underline">cheap gems</Link>,{' '}
            looking for a specific <Link href="/skins" className="text-accent hover:underline">Frankenawp or Hallows Punisher skin</Link>,
            or trading high-value items safely with our <Link href="/middleman" className="text-accent hover:underline">free middleman</Link>,
            you&apos;re in the right place.
          </p>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'sniperduels.net',
            url: 'https://sniperduels.net',
            sameAs: [SHOP_URL, DISCORD_INVITE],
            description: 'Community marketplace and price guide for Sniper Duels (Roblox).',
          }),
        }}
      />
    </>
  );
}
