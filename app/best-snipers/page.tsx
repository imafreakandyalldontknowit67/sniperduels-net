import type { Metadata } from 'next';
import Link from 'next/link';
import { weaponsByCategory, defaultPrice, topPrice } from '@/lib/weapons';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import BuyCTA from '@/components/BuyCTA';

const TITLE = 'Best Snipers in Sniper Duels 2026 — Top Picks & Values';
const DESC =
  'Discover the best snipers in Sniper Duels ranked by value and demand. See current gem prices, demand levels, and where to buy the top sniper rifles.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/best-snipers` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/best-snipers` },
  twitter: { title: TITLE, description: DESC },
};

const FAQ = [
  {
    q: 'What is the best sniper in Sniper Duels?',
    a: 'The best sniper in Sniper Duels is the one with the highest community gem value — currently the top entry on this list. Value tracks rarity and trade demand, so the #1 sniper is both the rarest and the most sought-after on the market. This page re-ranks every sniper by live SDValues data, so the top pick stays current.',
  },
  {
    q: 'Which sniper is worth the most gems in Sniper Duels?',
    a: 'The sniper worth the most gems is whichever sits at position 1 in the ranking above. Prices come from SDValues community trade data, so the most valuable sniper is the one holding the highest verified gem value at the time you read this — high-demand snipers tend to hold or gain value over time.',
  },
  {
    q: 'Are expensive snipers better in Sniper Duels?',
    a: 'Not necessarily for gameplay — every sniper fires the same way, so value is driven by rarity and looks, not stats. A high-value sniper is a better collectible and easier to trade, but it does not give a competitive advantage in a duel.',
  },
  {
    q: 'How do I get the best snipers in Sniper Duels?',
    a: 'You can pull snipers from cases, trade for them using items or gems, or buy gems cheaply and trade up. Check each sniper’s value page for condition pricing, and join the community Discord to find sellers and a free middleman for high-value trades.',
  },
];

export default function BestSnipersPage() {
  const snipers = [...weaponsByCategory('snipers')]
    .sort((a, b) => defaultPrice(b) - defaultPrice(a))
    .slice(0, 20);

  const top5 = snipers.slice(0, 5);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Best Snipers', item: `${SITE_URL}/best-snipers` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Best Snipers in Sniper Duels',
      description: `The top ${snipers.length} Sniper Duels snipers ranked by community gem value.`,
      numberOfItems: snipers.length,
      itemListElement: snipers.map((w, i) => ({
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
      description: `${w.displayName} — ${w.rarity} rarity sniper in Sniper Duels`,
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
          Best Snipers in <span className="text-accent">Sniper Duels</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Top {snipers.length} snipers ranked by gem value · Updated regularly
        </p>
      </header>

      <section className="mb-10">
        <p className="text-white/70 leading-relaxed">
          Looking for the most valuable sniper rifles in Sniper Duels? This guide ranks the top snipers by their
          current gem value as tracked by the community. Whether you&apos;re building your collection, looking for
          investment-worthy pieces, or just curious what the best snipers are — this list has you covered. Prices
          are sourced from SDValues and reflect real trade data. High-demand snipers tend to hold value well and
          are easier to trade, making them ideal picks for both new and experienced players. Each sniper links to
          its full value page with condition breakdowns and price history.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {snipers.map((w, i) => (
          <div
            key={w.id}
            className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
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
            <div className="mb-3 text-lg font-bold text-accent">{defaultPrice(w).toLocaleString()} gems</div>
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
          <li><Link href="/snipers" className="text-cyan-400 hover:text-cyan-300">All Snipers</Link> — Full sniper category listing</li>
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

      <BuyCTA campaign="best-snipers" shopPath="/gems" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
