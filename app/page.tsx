import Link from 'next/link';
import type { Metadata } from 'next';
import { Zap, ShieldCheck, Coins } from 'lucide-react';
import BuyCTA from '@/components/BuyCTA';
import PriceLadder from '@/components/PriceLadder';
import TrustRow from '@/components/TrustRow';
import DiscordButton from '@/components/DiscordButton';
import SpriteButton from '@/components/SpriteButton';
import SectionBanner from '@/components/SectionBanner';
import SpritePanel from '@/components/SpritePanel';
import { topWeapons, rarityClasses } from '@/lib/weapons';
import { shopLink, SHOP_URL, DISCORD_INVITE, SITE_URL } from '@/lib/config';

const HOME_TITLE = 'Cheapest Sniper Duels Gems & Items — From $2.65/k';
const HOME_DESC =
  'Buy Sniper Duels gems from $2.65/k — 65% cheaper than Robux. 13+ verified vendors, auto-delivery in under 5 min, free middleman, full refund guarantee.';

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESC,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESC,
    url: SITE_URL,
  },
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESC,
  },
};

export default function Home() {
  const featured = topWeapons(8);

  return (
    <>
      {/* Hero */}
      <section className="relative mb-12 overflow-hidden text-center">
        <div className="mb-4 inline-block border-[2px] border-accent/60 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
          Auto-delivery · 24/7 · Discord-verified vendors
        </div>
        <h1 className="mb-4 text-3xl font-bold uppercase leading-tight tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          {/* Trailing space inside the first span: visually unchanged because
              `block` line-breaks anyway, but text extractors see "Duels Gems"
              with a space (was rendering as "DuelsGems" to crawlers). */}
          <span className="block text-pixel-blue-light">Cheapest Sniper Duels </span>
          <span className="block text-accent">Gems &amp; Skins</span>
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          From <span className="text-accent">$2.65/k</span> · Same-day auto-delivery · Free middleman
        </p>

        {/* Character anchor — desktop only, keeps mobile lean */}
        <div className="relative mx-auto mt-6 mb-8 hidden h-[180px] w-full max-w-3xl sm:block md:h-[220px]">
          <div className="absolute left-[6%] bottom-0 flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pixel/badge-fully-automated.svg" alt="Fully automated trade bot" className="h-12 w-auto md:h-14" style={{ imageRendering: 'pixelated' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pixel/character-red.svg" alt="Pixel red sniper character" className="h-[90px] w-auto md:h-[120px]" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pixel/badge-delivery-2min.svg" alt="Average 2 minute gem delivery" className="h-12 w-auto md:h-14" style={{ imageRendering: 'pixelated' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pixel/character-green.svg" alt="Pixel green sniper character" className="h-20 w-auto md:h-[100px]" />
          </div>
          <div className="absolute right-[6%] bottom-0 flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pixel/badge-available-247.svg" alt="Discord vendors online 24/7" className="h-12 w-auto md:h-14" style={{ imageRendering: 'pixelated' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pixel/character-blue.svg" alt="Pixel blue sniper character" className="h-20 w-auto md:h-[100px]" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <SpriteButton variant="gold" href={shopLink('/gems', 'home-hero')} external>
            Buy Gems
          </SpriteButton>
          <DiscordButton href={DISCORD_INVITE} size="lg">Join Discord</DiscordButton>
        </div>
      </section>

      {/* Trust */}
      <section className="mb-14">
        <TrustRow />
      </section>

      {/* Pricing */}
      <section className="mb-14">
        <SectionBanner color="gold" eyebrow="Pricing tiers on sniperduels.shop — bulk unlocks at 100k">
          Gem Pricing Tiers
        </SectionBanner>
        <PriceLadder />
      </section>

      {/* Why us — sprite-backed trust trio */}
      <section className="mb-14">
        <SectionBanner color="blue" eyebrow="Built for the Sniper Duels community">
          Why sniperduels.net
        </SectionBanner>
        <div className="grid gap-6 md:grid-cols-3">
          <SpritePanel className="min-h-[180px]">
            <Zap className="mb-2 h-7 w-7 text-accent" strokeWidth={2.5} />
            <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white sm:text-lg">Instant Auto-Delivery</h3>
            <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
              Trade bot online 24/7. Most orders deliver in under 5 minutes.
            </p>
          </SpritePanel>
          <SpritePanel className="min-h-[180px]">
            <ShieldCheck className="mb-2 h-7 w-7 text-accent" strokeWidth={2.5} />
            <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white sm:text-lg">Free Middleman</h3>
            <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
              MM holds the item until payment lands.{' '}
              <Link href="/middleman" className="text-accent hover:underline">Learn more</Link>
            </p>
          </SpritePanel>
          <SpritePanel className="min-h-[180px]">
            <Coins className="mb-2 h-7 w-7 text-accent" strokeWidth={2.5} />
            <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white sm:text-lg">Cheaper Than Roblox</h3>
            <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
              Up to 65% less than the in-game Robux rate. Vendors compete on price.
            </p>
          </SpritePanel>
        </div>
      </section>

      {/* Featured items */}
      <section className="mb-14">
        <SectionBanner color="gold" eyebrow="The most-traded weapons right now">
          Top Sniper Duels Items
        </SectionBanner>
        {featured.length === 0 ? (
          <div className="card text-center text-gray-500">Item data is being refreshed — check back soon.</div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featured.map(w => {
                const topPrice = Math.max(0, ...w.variants.map(v => v.price));
                return (
                  <Link key={w.id} href={`/values/${w.id}`} className="card-link">
                    {w.imagePath && (
                      <div className="mb-3 flex aspect-square items-center justify-center bg-dark-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={w.imagePath}
                          alt={w.displayName}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                    <div className={`mb-1 inline-block border-[2px] px-1.5 py-0.5 text-[10px] font-bold uppercase ${rarityClasses(w.rarity)}`}>
                      {w.rarity}
                    </div>
                    <div className="truncate text-sm font-bold text-white">{w.displayName}</div>
                    <div className="text-[10px] uppercase text-gray-500">{w.weaponType}</div>
                    {topPrice > 0 && (
                      <div className="mt-2 text-sm font-bold text-accent">{topPrice.toLocaleString()} gems</div>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Link href="/values" className="text-xs font-bold uppercase tracking-wider text-accent hover:underline sm:text-sm">
                See all values →
              </Link>
            </div>
          </>
        )}
      </section>

      <BuyCTA campaign="home-banner" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            ],
          }),
        }}
      />
    </>
  );
}
