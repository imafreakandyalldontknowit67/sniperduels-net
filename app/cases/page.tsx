import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCases, getCaseItems, getCaseItemsIncludingUnpriced } from '@/lib/cases';
import { SITE_URL } from '@/lib/config';

const CASES_TITLE = 'Sniper Duels Cases — All Cases, Items, and Values 2026';
const CASES_DESC =
  'Every Sniper Duels case — Classic, Skin Cases, April Fools, Halloween, Christmas, Release. See items in each case, current values, and odds.';

export const metadata: Metadata = {
  title: CASES_TITLE,
  description: CASES_DESC,
  alternates: { canonical: `${SITE_URL}/cases` },
  openGraph: { title: CASES_TITLE, description: CASES_DESC, url: `${SITE_URL}/cases` },
  twitter: { title: CASES_TITLE, description: CASES_DESC },
};

export default function CasesHubPage() {
  const cases = getAllCases();

  // Per-case stats (priced count + a representative image) computed once at
  // build time — these pages are SSG so this only runs during `next build`.
  const caseStats = cases.map(c => {
    const items = getCaseItems(c.slug);
    const totalItems = getCaseItemsIncludingUnpriced(c.slug).length;
    const rep = items.find(w => w.imagePath);
    return { ...c, itemCount: totalItems, pricedCount: items.length, repImage: rep?.imagePath ?? null };
  });

  return (
    <>
      <header className="mb-6">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Cases</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          All {cases.length} cases · {caseStats.reduce((s, c) => s + c.pricedCount, 0)} tracked items · Updated every 6h
        </p>
      </header>

      <section className="mb-10 prose prose-invert max-w-none text-gray-300">
        <p>
          Sniper Duels cases drop in-game from event spawns, daily login rewards and special holiday events.
          Each case contains a fixed pool of <strong className="text-white">knives, AWPs, snipers and other items</strong>,
          and the rarity tier determines drop odds. This is the full <strong className="text-white">Sniper Duels case list</strong>{' '}
          for 2026 — every case currently in the game, every item that drops from it, and live community values.
        </p>
        <p>
          Looking for a specific item&apos;s gem value? Use the{' '}
          <Link href="/values" className="text-accent hover:underline">all-items value list</Link>{' '}
          to search by name. For trade-up logic, scam protection and how to safely flip case items in our community,
          see <Link href="/safe-trading" className="text-accent hover:underline">safe trading</Link>{' '}
          and grab a <Link href="/middleman" className="text-accent hover:underline">free middleman</Link> for any
          cash deals.
        </p>
      </section>

      <section className="mb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caseStats.map(c => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="group flex flex-col border-[3px] border-dark-500 bg-dark-700 transition-colors hover:border-accent/60 hover:no-underline"
            >
              {c.repImage ? (
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.repImage}
                    alt={`${c.displayName} representative item`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 text-4xl text-dark-500">?</div>
              )}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg font-bold uppercase tracking-wider text-white group-hover:text-accent">
                    {c.displayName}
                  </h2>
                  <span className="shrink-0 border-[2px] border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                    {c.itemCount} items
                  </span>
                </div>
                <p className="line-clamp-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
                  {c.description}
                </p>
                <div className="mt-auto pt-2 text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">
                  View case items →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-3 sm:grid-cols-3">
        <Link href="/values" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Look up</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">All item values</div>
        </Link>
        <Link href="/safe-trading" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Read</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">Safe trading guide</div>
        </Link>
        <Link href="/middleman" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Use</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">Free middleman</div>
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Cases', item: `${SITE_URL}/cases` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Sniper Duels Cases',
              description: `All ${cases.length} Sniper Duels cases with item pools and live community values.`,
              numberOfItems: cases.length,
              itemListElement: cases.map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: c.displayName,
                url: `${SITE_URL}/cases/${c.slug}`,
              })),
            },
          ]),
        }}
      />
    </>
  );
}
