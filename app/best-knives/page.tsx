import type { Metadata } from 'next';
import Link from 'next/link';
import { weaponsByCategory, defaultPrice } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';
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

const FAQ = [
  {
    q: 'What is the best knife in Sniper Duels?',
    a: 'The best knife in Sniper Duels is the one with the highest community gem value — the top entry on this list. Knife value is driven by rarity and trade demand, so the #1 knife is both the rarest and the most wanted. This page re-ranks every knife by live SDValues data so the top pick stays current.',
  },
  {
    q: 'Which knife is worth the most gems in Sniper Duels?',
    a: 'The knife worth the most gems is whichever sits at position 1 in the ranking above. Prices come from SDValues community trade data, so the most valuable knife is the one holding the highest verified gem value at the time you read this. Rare knife variants can command massive gem values.',
  },
  {
    q: 'Why are some Sniper Duels knives so expensive?',
    a: 'Knives are among the most collectible items in the game. Limited-edition and event variants have tiny supply, and strong collector demand pushes their gem value far above common knives — even though every knife performs the same in a duel.',
  },
  {
    q: 'How do I get the best knives in Sniper Duels?',
    a: 'You can unbox knives from cases, trade items or gems for them, or buy gems cheaply and trade up. Check each knife’s value page for condition pricing, and use the community Discord to find sellers and a free middleman for high-value trades.',
  },
];

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
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Best Knives in Sniper Duels',
      description: `The top ${knives.length} Sniper Duels knives ranked by community gem value.`,
      numberOfItems: knives.length,
      itemListElement: knives.map((w, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: w.displayName,
        url: `${SITE_URL}/values/${w.id}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    ...top5.map(w => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: w.displayName,
      image: w.imagePath || `${SITE_URL}/gem_icon.png`,
      description: `${w.displayName} — ${w.rarity} rarity knife in Sniper Duels`,
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

      <section className="mt-12 mb-10">
        <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map(f => (
            <div key={f.q} className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 font-bold text-white">{f.q}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <BuyCTA campaign="best-knives" shopPath="/gems" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
