import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCases, getCaseItemsIncludingUnpriced } from '@/lib/cases';
import { defaultPrice, rarityClasses, type Weapon } from '@/lib/weapons';
import { SITE_URL, DISCORD_INVITE } from '@/lib/config';

const TITLE = 'Sniper Duels Case Odds & Crate Contents (2026) — What Drops From Every Case';
const DESC =
  'Sniper Duels case odds explained honestly: what every crate contains by rarity tier, which cases hold knives and secrets, and whether cases are worth it. No fake drop rates — real contents only.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/case-odds` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/case-odds` },
  twitter: { title: TITLE, description: DESC },
};

/** Display order for rarity tiers — rarest/most-wanted first.
 *  These are the rarity strings that actually appear on Sniper Duels case items. */
const RARITY_ORDER = [
  'secret',
  'knife',
  'legendary',
  'epic',
  'rare',
  'uncommon',
  'common',
  'collectable',
  'unobtainable',
] as const;

/** Plain-English meaning of each rarity tier. We describe relative rarity
 *  ("rarer than X"), NOT a percentage, because no official drop rates exist. */
const RARITY_MEANING: Record<string, string> = {
  secret: 'The rarest tier — secret skins are the hardest to pull and usually the most valuable items a case can drop.',
  knife: 'Knife-tier melee finishes. Knives are the headline pulls of most cases and the rarest of the standard item tiers.',
  legendary: 'Legendary skins — high-tier sniper and AWP finishes, below knives but well above the common pool.',
  epic: 'Epic skins — strong mid-tier drops that show up more often than legendaries.',
  rare: 'Rare skins — the common-but-still-collectible middle of the pool.',
  uncommon: 'Uncommon skins — frequent filler drops with low individual value.',
  common: 'Common skins — the most frequent, lowest-value drops in a case.',
  collectable: 'Collectables — event/collectable items grouped outside the main rarity ladder.',
  unobtainable: 'Unobtainable — items no longer available from the live case pool.',
};

function rarityRank(r: string): number {
  const i = RARITY_ORDER.indexOf(r.toLowerCase() as (typeof RARITY_ORDER)[number]);
  return i === -1 ? RARITY_ORDER.length : i;
}

function itemFullName(w: Weapon): string {
  return w.displayName.toLowerCase().includes(w.weaponType.toLowerCase())
    ? w.displayName
    : `${w.displayName} ${w.weaponType}`;
}

/** Group a case's items by rarity tier, sorted rarest-first, items sorted by value. */
function groupByRarity(items: Weapon[]) {
  const groups = new Map<string, Weapon[]>();
  for (const w of items) {
    const key = (w.rarity || 'unknown').toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(w);
  }
  return [...groups.entries()]
    .map(([rarity, ws]) => ({
      rarity,
      items: [...ws].sort((a, b) => defaultPrice(b) - defaultPrice(a)),
    }))
    .sort((a, b) => rarityRank(a.rarity) - rarityRank(b.rarity));
}

const FAQ = [
  {
    q: 'What are the odds of getting a knife in Sniper Duels?',
    a: 'Sniper Duels does not officially publish per-item drop rates, so anyone quoting an exact knife percentage is guessing. What we can say honestly: knives sit at one of the rarest tiers in a case, so they drop far less often than uncommon or rare skins. Cases with a large knife pool (like the Classic Case) give you more distinct knives to potentially pull, but each individual knife is still a low-chance drop.',
  },
  {
    q: 'Which case is best to open in Sniper Duels?',
    a: 'The "best" case depends on what you want. The Classic Case has the deepest pool of knives and AWP skins, so it offers the most variety of high-value pulls. Event cases (Christmas, Halloween, April Fools, Valentine\'s) drop limited skins that can hold value because they stop being obtainable after the event. Since no official odds exist, judge a case by its contents and the live gem values of those items — both of which are listed on this page and the value list.',
  },
  {
    q: 'Are Sniper Duels cases worth it?',
    a: 'For most players, opening cases is gambling: the expected value usually sits below the gem cost, because the common and uncommon pool drops far more often than knives or secrets. Cases are worth it if you enjoy the unboxing and want a shot at a rare skin. If you specifically want a particular knife or AWP, trading or buying it directly is almost always cheaper and more certain than chasing it through case openings.',
  },
  {
    q: 'Does Sniper Duels publish official case drop rates?',
    a: 'No. There is no official drop-rate table for Sniper Duels cases. We deliberately do not invent percentages — instead we show exactly what each case contains, grouped by rarity tier, so you can see the real pool. Rarer tiers (secret, knife) drop less often than common tiers; that ordering is reliable even though the exact numbers are not published.',
  },
  {
    q: 'How do I see what a specific case contains?',
    a: 'Each case has its own page with the full item list and live community gem values, and this page summarizes every case by rarity tier. Click any item to open its value page for condition-by-condition pricing. To find a specific skin fast, use the all-items value list and search by name.',
  },
];

export default function CaseOddsPage() {
  const cases = getAllCases();

  // Build per-case rarity breakdowns at build time (SSG).
  const caseData = cases.map(c => {
    const items = getCaseItemsIncludingUnpriced(c.slug);
    const groups = groupByRarity(items);
    const hasKnife = groups.some(g => g.rarity === 'knife');
    const hasSecret = groups.some(g => g.rarity === 'secret');
    return { ...c, totalItems: items.length, groups, hasKnife, hasSecret };
  });

  const totalItems = caseData.reduce((s, c) => s + c.totalItems, 0);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Case Odds', item: `${SITE_URL}/case-odds` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Sniper Duels Case Odds & Crate Contents',
      datePublished: '2026-06-03T00:00:00Z',
      dateModified: '2026-06-03T00:00:00Z',
      author: { '@type': 'Organization', name: 'sniperduels.net', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'sniperduels.net',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/gem_icon.png` },
      },
      description: DESC,
      image: [`${SITE_URL}/og-banner.webp`],
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/case-odds` },
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
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/cases" className="hover:text-accent">Cases</Link> /{' '}
        <span className="text-gray-300">Case Odds</span>
      </nav>

      <header className="mb-6">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Case Odds</span> &amp; Crate Contents
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          {cases.length} cases · {totalItems} items mapped by rarity · No fake drop rates
        </p>
      </header>

      <section className="mb-8 prose prose-invert max-w-none text-gray-300">
        <p>
          <strong className="text-white">Sniper Duels does not officially publish case drop rates</strong>, so this
          page shows the honest version: exactly what every crate contains, grouped by rarity tier, with rarer tiers
          listed first. You won&apos;t find invented percentages here — you&apos;ll find the real item pool, live gem
          values, and clear guidance on whether opening a case is worth it.
        </p>
      </section>

      {/* Rarity tier explainer */}
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
          How rarity tiers work
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-400">
          Every item in a case belongs to a rarity tier. Tiers are ordered from rarest to most common — a higher tier
          drops <em>less</em> often, even though the exact odds aren&apos;t published. The ladder below applies across
          all Sniper Duels cases:
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {RARITY_ORDER.filter(r => RARITY_MEANING[r]).map(r => (
            <div key={r} className="flex gap-3 border-[3px] border-dark-500 bg-dark-700 p-3">
              <span
                className={`h-fit shrink-0 border-[2px] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${rarityClasses(r)}`}
              >
                {r}
              </span>
              <span className="text-xs leading-relaxed text-gray-400">{RARITY_MEANING[r]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Per-case contents by rarity */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
          What&apos;s inside each case, by rarity
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-gray-400">
          Each table lists the full drop pool for a case, grouped by rarity tier (rarest first). Click any item to see
          its live value. Because exact percentages aren&apos;t official, treat higher tiers as &quot;harder to
          pull&quot; rather than a fixed number.
        </p>

        <div className="space-y-10">
          {caseData.map(c => (
            <article key={c.slug} className="border-[3px] border-dark-500 bg-dark-700/40 p-4 sm:p-6">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold uppercase tracking-wider text-white sm:text-xl">
                  <Link href={`/cases/${c.slug}`} className="hover:text-accent hover:no-underline">
                    {c.displayName}
                  </Link>
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">
                  {c.totalItems} items
                  {c.hasKnife ? ' · has knives' : ''}
                  {c.hasSecret ? ' · has secrets' : ''}
                </span>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-gray-400 sm:text-sm">{c.description}</p>

              <div className="space-y-4">
                {c.groups.map(g => (
                  <div key={g.rarity}>
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`border-[2px] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${rarityClasses(g.rarity)}`}
                      >
                        {g.rarity}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {g.items.length} {g.items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map(w => {
                        const price = defaultPrice(w);
                        return (
                          <li key={w.id}>
                            <Link
                              href={`/values/${w.id}`}
                              className="inline-flex items-center gap-2 border-[2px] border-dark-500 bg-dark-800 px-2.5 py-1 text-xs text-gray-300 transition-colors hover:border-accent/60 hover:text-accent hover:no-underline"
                            >
                              <span>{itemFullName(w)}</span>
                              {price > 0 && (
                                <span className="text-[10px] font-bold text-accent">
                                  {price.toLocaleString()}g
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">
                <Link href={`/cases/${c.slug}`} className="hover:text-accent">
                  Full {c.displayName} page →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Are cases worth it? */}
      <section className="mb-12 prose prose-invert max-w-none text-gray-300">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
          Are Sniper Duels cases worth it?
        </h2>
        <p>
          Honest answer: for most players, opening cases is <strong className="text-white">gambling</strong>. The
          common and uncommon pool drops far more often than knives or secrets, so the average opening returns less in
          gem value than it costs. Because Sniper Duels doesn&apos;t publish odds, no one can promise you an
          &quot;expected value&quot; — but the math almost always favors the case, not the opener.
        </p>
        <p>
          Cases <em>are</em> worth it if you enjoy the unboxing itself and want a real shot at a rare pull. If your goal
          is a specific knife or AWP skin, you&apos;re far better off{' '}
          <Link href="/values" className="text-accent hover:underline">checking the Sniper Duels value list</Link>{' '}
          and trading for it directly — it&apos;s cheaper and certain. Want to do that with gems instead of grinding?
          See <Link href="/gems" className="text-accent hover:underline">gem pricing</Link>. And for the knives most
          worth chasing, read our{' '}
          <Link href="/best-knives" className="text-accent hover:underline">best knives guide</Link>.
        </p>
        <p className="text-sm text-gray-400">
          A simple rule: if the items you actually want sit in the rare tiers of a case, expect to open many before one
          lands. Trading up from cheaper items is usually the faster path to a specific skin.
        </p>
      </section>

      {/* Discord CTA */}
      <section className="mb-10 border-[3px] border-accent/40 bg-accent/5 p-6 text-center">
        <h2 className="mb-2 text-lg font-bold uppercase tracking-wider text-white sm:text-xl">
          Discuss drops &amp; see live unboxings
        </h2>
        <p className="mx-auto mb-4 max-w-2xl text-sm leading-relaxed text-gray-300">
          Want real pull data, live unboxings, and other openers&apos; experiences? Our community shares case results
          daily. Compare what actually drops, find traders for the skin you&apos;re chasing, and get a free middleman
          for high-value deals.
        </p>
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-[3px] border-accent bg-accent/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-accent transition-colors hover:bg-accent/20 hover:no-underline"
        >
          Join the Sniper Duels Discord →
        </a>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-6 text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
          Case odds — frequently asked questions
        </h2>
        <div className="space-y-4">
          {FAQ.map(f => (
            <div key={f.q} className="border-[3px] border-dark-500 bg-dark-700 p-5">
              <h3 className="mb-2 font-bold text-white">{f.q}</h3>
              <p className="text-sm leading-relaxed text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/cases" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Browse</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">All cases</div>
        </Link>
        <Link href="/values" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Look up</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">Sniper Duels value list</div>
        </Link>
        <Link href="/best-knives" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Rankings</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">Best knives</div>
        </Link>
        <Link href="/gems" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Get</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">Buy gems</div>
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
