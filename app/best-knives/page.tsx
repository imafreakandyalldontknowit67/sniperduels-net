import type { Metadata } from 'next';
import Link from 'next/link';
import { weaponsByCategory, defaultPrice } from '@/lib/weapons';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import BuyCTA from '@/components/BuyCTA';

const TITLE = 'Best Knives in Sniper Duels 2026 — Top Picks & Values';
const DESC =
  'Discover the best knives in Sniper Duels ranked by value and demand. See current gem prices, demand levels, and where to buy the top knives.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/best-knives` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/best-knives` },
  twitter: { title: TITLE, description: DESC },
};

export default function BestKnivesPage() {
  const knives = [...weaponsByCategory('knives')]
    .sort((a, b) => defaultPrice(b) - defaultPrice(a))
    .slice(0, 20);

  const top5 = knives.slice(0, 5);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Best Knives', item: `${SITE_URL}/best-knives` },
      ],
    },
    ...top5.map(w => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: w.displayName,
      image: w.imagePath || `${SITE_URL}/gem_icon.png`,
      description: `${w.displayName} — ${w.rarity} rarity knife in Sniper Duels`,
      offers: {
        '@type': 'Offer',
        price: defaultPrice(w),
        priceCurrency: 'GEM',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: SITE_NAME },
      },
    })),
  ];

  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl">
          Best Knives in <span className="text-accent">Sniper Duels</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Top {knives.length} knives ranked by gem value · Updated regularly
        </p>
      </header>

      <section className="mb-10">
        <p className="text-white/70 leading-relaxed">
          Knives are some of the most collectible items in Sniper Duels, with rare variants commanding massive gem
          values. This guide ranks the best knives by their current market price, helping you identify which ones
          are worth pursuing for your inventory. High-demand knives trade quickly and tend to appreciate in value,
          making them solid choices for both collectors and traders. All prices are sourced from SDValues community
          data and reflect actual trade activity. Click any knife to see its full value breakdown by condition.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {knives.map((w, i) => (
          <div
            key={w.id}
            className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-400">
                {i + 1}
              </span>
              {w.imagePath && (
                <img src={w.imagePath} alt={w.displayName} className="h-12 w-12 object-contain" loading="lazy" />
              )}
            </div>
            <h3 className="mb-1 text-sm font-bold text-white">{w.displayName}</h3>
            <div className="mb-1 text-xs text-white/50">
              {w.rarity} · Demand: <span className="capitalize">{w.demand || 'Unknown'}</span>
            </div>
            <div className="mb-3 text-lg font-bold text-cyan-400">{defaultPrice(w).toLocaleString()} gems</div>
            <div className="mt-auto flex gap-2">
              <Link href={`/values/${w.id}`} className="text-xs text-cyan-400 hover:text-cyan-300">
                View Value →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-12 mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Related Pages</h2>
        <ul className="space-y-2 text-white/70">
          <li><Link href="/values" className="text-cyan-400 hover:text-cyan-300">All Item Values</Link> — Browse every weapon in the game</li>
          <li><Link href="/gems" className="text-cyan-400 hover:text-cyan-300">Buy Gems</Link> — Get gems at the best rates</li>
          <li><Link href="/knives" className="text-cyan-400 hover:text-cyan-300">All Knives</Link> — Full knife category listing</li>
        </ul>
      </section>

      <BuyCTA campaign="best-knives" shopPath="/gems" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
