import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WeaponCard from '@/components/values/WeaponCard';
import { getAllCases, getCase, getCaseItems, getCaseItemsIncludingUnpriced } from '@/lib/cases';
import { defaultPrice, weaponsGeneratedAt } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

/** SSG: emit one static page per known case. */
export function generateStaticParams() {
  return getAllCases().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: 'Case not found' };
  const title = `${c.displayName} — Sniper Duels Items, Values & Drop List`;
  const description = `All items in the Sniper Duels ${c.displayName}. Live values for every knife and sniper, sorted by rarity. Updated every 6 hours.`;
  const url = `${SITE_URL}/cases/${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

/** Format a date as e.g. "May 15, 2026" — used for the per-page "last updated"
 *  line so users can see this isn't a stale 2023 scrape. */
function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const items = getCaseItems(c.slug);
  const totalItems = getCaseItemsIncludingUnpriced(c.slug).length;

  // Sort by default gem price descending — highest-value items first puts the
  // most-searched-for skins above the fold.
  const sorted = [...items].sort((a, b) => defaultPrice(b) - defaultPrice(a));
  const top3 = sorted.slice(0, 3);
  const top3Names = top3
    .map(w => (w.displayName.toLowerCase().includes(w.weaponType.toLowerCase()) ? w.displayName : `${w.displayName} ${w.weaponType}`))
    .join(', ');

  const lastUpdated = formatDate(weaponsGeneratedAt());

  return (
    <>
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/cases" className="hover:text-accent">Cases</Link> /{' '}
        <span className="text-gray-300">{c.displayName}</span>
      </nav>

      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          {c.displayName}
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          {totalItems} items · {items.length} priced · Last updated {lastUpdated}
        </p>
      </header>

      <section className="mb-10 prose prose-invert max-w-none text-gray-300">
        <p>{c.description}</p>
        {top3.length > 0 && (
          <p>
            The {c.displayName} contains <strong className="text-white">{totalItems} items</strong>
            {top3.length >= 3 ? (
              <> including <strong className="text-white">{top3Names}</strong>.</>
            ) : (
              <>.</>
            )}{' '}
            Items below are sorted by current gem value — most valuable first. Click any item for full condition-by-condition pricing.
          </p>
        )}
      </section>

      {sorted.length > 0 ? (
        <section className="mb-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {sorted.map(w => <WeaponCard key={w.id} weapon={w} />)}
          </div>
        </section>
      ) : (
        <section className="mb-12 border-[3px] border-dark-500 bg-dark-700 p-6 text-center text-gray-400">
          No tracked items in this case yet. Check back after the next SDValues refresh.
        </section>
      )}

      {/* Related / sidebar-as-row at the bottom */}
      <section className="mb-10 grid gap-3 sm:grid-cols-3">
        <Link href="/values" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Look up</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">All item values</div>
        </Link>
        <Link href="/cases" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Browse</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">All cases</div>
        </Link>
        <Link href="/safe-trading" className="border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline">
          <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Read</div>
          <div className="text-base font-bold uppercase tracking-wider text-white">Safe trading guide</div>
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
                { '@type': 'ListItem', position: 3, name: c.displayName, item: `${SITE_URL}/cases/${c.slug}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `${c.displayName} — Sniper Duels Item Pool`,
              description: `All ${totalItems} items in the Sniper Duels ${c.displayName}, with live gem values.`,
              numberOfItems: sorted.length,
              itemListElement: sorted.map((w, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: w.displayName.toLowerCase().includes(w.weaponType.toLowerCase())
                  ? w.displayName
                  : `${w.displayName} ${w.weaponType}`,
                url: `${SITE_URL}/values/${w.id}`,
                image: w.imagePath || undefined,
                description: defaultPrice(w) > 0 ? `${defaultPrice(w).toLocaleString()} gems` : undefined,
              })),
            },
          ]),
        }}
      />
    </>
  );
}
