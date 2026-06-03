import type { Metadata } from 'next';
import Link from 'next/link';
import { allWeapons, defaultPrice, topPrice } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';
import BuyCTA from '@/components/BuyCTA';

const TITLE = 'Sniper Duels Tier List 2026 — Best Weapons Ranked S to D';
const DESC =
  'Complete Sniper Duels tier list ranking every weapon from S tier to D tier based on gem value and demand. Updated regularly with the latest community prices.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/tier-list` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/tier-list` },
  twitter: { title: TITLE, description: DESC },
};

const TIER_COLORS: Record<string, string> = {
  S: 'text-yellow-400 border-yellow-400/60 bg-yellow-400/10',
  A: 'text-purple-400 border-purple-400/60 bg-purple-400/10',
  B: 'text-blue-400 border-blue-400/60 bg-blue-400/10',
  C: 'text-green-400 border-green-400/60 bg-green-400/10',
  D: 'text-gray-400 border-gray-400/60 bg-gray-400/10',
};

const TIER_LABELS: Record<string, string> = {
  S: 'S Tier — Elite',
  A: 'A Tier — Excellent',
  B: 'B Tier — Good',
  C: 'C Tier — Average',
  D: 'D Tier — Below Average',
};

const FAQ = [
  {
    q: 'How is the Sniper Duels tier list ranked?',
    a: 'Every weapon is ranked purely by its current community gem value from SDValues. The top 5% of items by value land in S tier, the next 15% in A tier, then 30% in B, 30% in C, and the bottom 20% in D. Because it tracks live prices, the tiers shift as the market moves.',
  },
  {
    q: 'What is the best weapon in Sniper Duels?',
    a: 'The best weapon by value is the #1 item in S tier above — the rarest, highest-demand piece in the game right now. Note that tiers here reflect collectible value and trade demand, not in-duel performance, since all weapons fire the same way.',
  },
  {
    q: 'Does a higher tier mean a weapon is better in a duel?',
    a: 'No. Tiers rank value and demand, not stats. Every sniper and knife behaves identically in a match, so an S-tier item is more valuable and easier to trade, but it gives no gameplay advantage over a D-tier weapon.',
  },
  {
    q: 'How often is the tier list updated?',
    a: 'The underlying values refresh every 6 hours from SDValues community data, and the page re-ranks weapons each time it regenerates. Join the Sniper Duels Discord to get pinged the moment a weapon’s value — and therefore its tier — changes.',
  },
];

export default function TierListPage() {
  const weapons = [...allWeapons()].sort((a, b) => defaultPrice(b) - defaultPrice(a));
  const total = weapons.length;

  // Assign tiers by percentile
  const sEnd = Math.ceil(total * 0.05);
  const aEnd = sEnd + Math.ceil(total * 0.15);
  const bEnd = aEnd + Math.ceil(total * 0.30);
  const cEnd = bEnd + Math.ceil(total * 0.30);

  const tiers: { label: string; weapons: typeof weapons }[] = [
    { label: 'S', weapons: weapons.slice(0, sEnd) },
    { label: 'A', weapons: weapons.slice(sEnd, aEnd) },
    { label: 'B', weapons: weapons.slice(aEnd, bEnd) },
    { label: 'C', weapons: weapons.slice(bEnd, cEnd) },
    { label: 'D', weapons: weapons.slice(cEnd) },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Tier List', item: `${SITE_URL}/tier-list` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Sniper Duels Weapon Tier List',
      description: `All ${total} Sniper Duels weapons ranked by value into S, A, B, C, and D tiers.`,
      numberOfItems: total,
      itemListElement: weapons.map((w, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/values/${w.id}`,
        name: w.displayName,
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
  ];

  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl">
          Sniper Duels <span className="text-accent">Tier List</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          {total} weapons ranked · Based on gem value · Updated regularly
        </p>
      </header>

      <section className="mb-10">
        <p className="text-white/70 leading-relaxed">
          Our Sniper Duels tier list ranks every weapon based on its current gem value as tracked by the community.
          S-tier weapons represent the top 5% most valuable items in the game — these are the rarest, most sought-after
          pieces that hold or gain value over time. A-tier covers the next 15%, followed by B (30%), C (30%), and D (bottom 20%).
          Prices update regularly from SDValues community data, so tiers shift as the market moves.
          Stretch your gem budget with the latest{' '}
          <Link href="/codes" className="text-accent hover:underline">Sniper Duels codes</Link>, or{' '}
          <Link href="/discord" className="text-accent hover:underline">join the Sniper Duels Discord</Link> to
          track tier movements in real time.
        </p>
      </section>

      {tiers.map(({ label, weapons: tierWeapons }) => (
        <section key={label} className="mb-10">
          <h2 className={`mb-4 text-2xl font-bold border-b-2 pb-2 ${TIER_COLORS[label].split(' ').slice(0, 1).join(' ')} border-current`}>
            {TIER_LABELS[label]} <span className="text-sm text-white/50">({tierWeapons.length} weapons)</span>
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tierWeapons.map(w => (
              <Link
                key={w.id}
                href={`/values/${w.id}`}
                className={`flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-white/5 ${TIER_COLORS[label]}`}
              >
                {w.imagePath && (
                  <img
                    src={w.imagePath}
                    alt={w.displayName}
                    className="h-10 w-10 object-contain"
                    loading="lazy"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-white">{w.displayName}</div>
                  <div className="text-xs text-white/50">{defaultPrice(w).toLocaleString()} gems</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

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

      <BuyCTA campaign="tier-list" shopPath="/gems" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
