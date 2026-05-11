import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import { allWeapons, rarityClasses } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sniper Duels Item Values & Trade Calculator | sniperduels.net',
  description:
    'Live value list for every Sniper Duels weapon, condition, and FX. Updated daily with market prices, demand, and trade-fairness data.',
  alternates: { canonical: 'https://sniperduels.net/values' },
};

const RARITY_GROUPS = ['godly', 'ancient', 'vintage', 'legendary', 'epic', 'rare', 'uncommon', 'common'];

export default function ValuesIndexPage() {
  const weapons = allWeapons();
  const grouped = RARITY_GROUPS.map(r => ({
    rarity: r,
    items: weapons.filter(w => w.rarity.toLowerCase() === r),
  })).filter(g => g.items.length > 0);

  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Sniper Duels <span className="text-accent">Item Values</span>
        </h1>
        <p className="text-lg text-gray-400">
          Live value list for {weapons.length} Sniper Duels weapons across every condition and rarity.
          Use this to price-check trades and find fair deals.
        </p>
      </header>

      <BuyCTA campaign="values-top" shopPath="/gems" shopLabel="Buy Gems on sniperduels.shop →" />

      {weapons.length === 0 && (
        <div className="my-8 card text-center text-gray-500">
          Item data is being refreshed — check back in a moment.
        </div>
      )}

      <div className="my-10 space-y-10">
        {grouped.map(group => (
          <section key={group.rarity}>
            <h2 className={`mb-4 inline-block rounded border px-3 py-1 text-lg font-black uppercase tracking-wider ${rarityClasses(group.rarity)}`}>
              {group.rarity} ({group.items.length})
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {group.items.map(w => {
                const top = Math.max(0, ...w.variants.map(v => v.price));
                return (
                  <Link
                    key={w.id}
                    href={`/values/${w.id}`}
                    className="card hover:border-accent/50 hover:no-underline"
                  >
                    {w.imagePath && (
                      <div className="mb-3 flex h-20 items-center justify-center rounded bg-dark-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={w.imagePath}
                          alt={w.displayName}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                    <div className="truncate font-bold text-white">{w.displayName}</div>
                    <div className="mb-2 text-xs text-gray-500">{w.weaponType}</div>
                    {top > 0 ? (
                      <div className="text-sm font-bold text-accent">{top.toLocaleString()} gems</div>
                    ) : (
                      <div className="text-sm text-gray-600">no data</div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <BuyCTA campaign="values-bottom" shopPath="/gems" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Sniper Duels Item Values',
            description: `Live community-tracked values for ${weapons.length} Sniper Duels weapons across rarity tiers.`,
            numberOfItems: weapons.length,
            itemListElement: weapons.slice(0, 50).map((w, i) => {
              const top = Math.max(0, ...w.variants.map(v => v.price));
              return {
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITE_URL}/values/${w.id}`,
                item: {
                  '@type': 'Product',
                  name: w.displayName,
                  category: `${w.rarity} ${w.weaponType}`,
                  url: `${SITE_URL}/values/${w.id}`,
                  ...(top > 0 && {
                    offers: {
                      '@type': 'Offer',
                      price: top,
                      priceCurrency: 'GEM',
                      availability: 'https://schema.org/InStock',
                    },
                  }),
                },
              };
            }),
          }),
        }}
      />
    </>
  );
}
