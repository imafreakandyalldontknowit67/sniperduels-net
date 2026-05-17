import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, DISCORD_INVITE } from '@/lib/config';

const TITLE = 'Sniper Duels Update & Patch Notes 2026';
const DESC =
  'Latest Sniper Duels updates and patch notes for 2026. Stay informed about new weapons, balance changes, bug fixes, and upcoming features.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/update` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/update` },
  twitter: { title: TITLE, description: DESC },
};

const UPDATES = [
  {
    title: 'May 2026 Update',
    date: '2026-05-15',
    items: [
      'New weapon crate added with 5 exclusive snipers',
      'Balance adjustments to vintage weapon values',
      'Trading system stability improvements',
      'New cosmetic knife skins available',
      'Bug fix: gem display rounding error corrected',
    ],
  },
  {
    title: 'April 2026 Update',
    date: '2026-04-10',
    items: [
      'Spring event with limited-time collectibles',
      'Two new godly-tier snipers introduced',
      'Improved server performance and reduced lag',
      'Updated lobby and menu UI',
    ],
  },
  {
    title: 'March 2026 Update',
    date: '2026-03-05',
    items: [
      'New map rotation added',
      'Weapon demand system rebalanced',
      'Three new knife variants released',
      'Anti-cheat improvements deployed',
    ],
  },
];

export default function UpdatePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Updates', item: `${SITE_URL}/update` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Sniper Duels Update & Patch Notes 2026',
      datePublished: '2026-01-01T00:00:00Z',
      dateModified: '2026-05-15T00:00:00Z',
      author: { '@type': 'Organization', name: 'sniperduels.net', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'sniperduels.net',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/gem_icon.png` },
      },
      description: DESC,
      image: [`${SITE_URL}/og-banner.webp`],
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/update` },
    },
  ];

  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl">
          Sniper Duels <span className="text-accent">Update Log</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Patch notes & game updates · 2026
        </p>
      </header>

      {/* Subscribe CTA */}
      <section className="mb-10 rounded-lg border border-accent/40 bg-accent/5 p-6">
        <h2 className="mb-2 text-xl font-bold text-white">Never miss an update</h2>
        <p className="mb-4 text-white/70">
          Join our Discord community to get notified about new updates, codes, and events the moment they drop.
        </p>
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener"
          className="inline-block rounded-lg bg-[#5865F2] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Join Discord for Updates →
        </a>
      </section>

      {/* Updates */}
      {UPDATES.map((update, i) => (
        <section key={update.date} className="mb-8">
          <div className="mb-3 flex items-baseline gap-3">
            <h2 className={`text-2xl font-bold ${i === 0 ? 'text-accent' : 'text-white'}`}>
              {update.title}
            </h2>
            <span className="text-xs text-white/40">{update.date}</span>
            {i === 0 && (
              <span className="rounded bg-accent/20 px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
                Latest
              </span>
            )}
          </div>
          <ul className="space-y-2 pl-4">
            {update.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Related links */}
      <section className="mt-12 rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="mb-3 text-lg font-bold text-white">After each update</h2>
        <ul className="space-y-2 text-white/70">
          <li><Link href="/values" className="text-cyan-400 hover:text-cyan-300">Check Updated Values</Link> — Prices shift after new content drops</li>
          <li><Link href="/codes" className="text-cyan-400 hover:text-cyan-300">New Codes</Link> — Updates sometimes come with promotional codes</li>
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
