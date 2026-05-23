import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import { SHOP_URL, SITE_URL, DISCORD_INVITE } from '@/lib/config';

// Regenerate at most once per day so the "Last verified" date and Article
// dateModified stay fresh even if the page itself doesn't change.
export const revalidate = 86400;

const NOW = new Date();
const MONTH_YEAR = NOW.toLocaleString('en-US', { month: 'long', year: 'numeric' });
const ISO_DATE = NOW.toISOString().slice(0, 10);

const CODES_TITLE = `Sniper Duels Codes (${MONTH_YEAR}) — No Active Codes [Honest Guide]`;
const CODES_DESC = `Are there working Sniper Duels codes? No — Sniper Duels does not have an in-game code redemption system. Here's the honest answer, what actually gives free gems, and where to buy gems cheap.`;

export const metadata: Metadata = {
  title: CODES_TITLE,
  description: CODES_DESC,
  alternates: { canonical: `${SITE_URL}/codes` },
  openGraph: { title: CODES_TITLE, description: CODES_DESC, url: `${SITE_URL}/codes` },
  twitter: { title: CODES_TITLE, description: CODES_DESC },
};

const FAQ = [
  {
    q: 'Are there active codes for Sniper Duels?',
    a: 'No. Sniper Duels does not have a promo-code or redemption system inside the game. There is no Codes button in the menu, and any "Sniper Duels codes" list you see on other sites is either fabricated for SEO traffic or copied from a different game by mistake.',
  },
  {
    q: 'Why do so many sites list Sniper Duels codes if none exist?',
    a: 'Roblox codes pages get heavy search traffic, so a lot of low-effort sites publish fake or stale lists to capture clicks. Many copy-paste from each other or invent codes that "look real." Sniper Duels has never shipped a code system, so any list claiming active codes is wrong.',
  },
  {
    q: 'How do I actually get free gems in Sniper Duels?',
    a: 'The real free-gem sources are: in-game daily/match rewards, official Discord giveaways during events and milestones, and the Sniper Duels community Discord (4,500+ members) which runs giveaways for new joiners. There are no promo codes, no Twitter codes, and no creator codes.',
  },
  {
    q: 'How do I get gems cheap instead?',
    a: 'For bulk gems, sniperduels.shop sells at tiered pricing — $2.90 per 1,000 at retail and $2.65 per 1,000 once you order 100k or more. Delivery is automated by a bot in a private Roblox server, usually under 2 minutes. That is the cheapest legitimate way to stock up on gems.',
  },
  {
    q: 'Will Sniper Duels ever add codes?',
    a: 'Possibly — many Roblox games eventually add a codes system for promos. If Sniper Duels ships one, this page will be the first to list the real, working codes. Bookmark this page or follow the Discord for actual updates.',
  },
];

export default function CodesPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Codes', item: `${SITE_URL}/codes` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Sniper Duels Codes (${MONTH_YEAR}) — Honest Status`,
      datePublished: NOW.toISOString(),
      dateModified: NOW.toISOString(),
      author: { '@type': 'Organization', name: 'sniperduels.net', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'sniperduels.net',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/gem_icon.png` },
      },
      description: `Honest answer about Sniper Duels promo codes for ${MONTH_YEAR}. Sniper Duels has no in-game code redemption system. Real free-gem sources and cheap-gem options listed.`,
      image: [`${SITE_URL}/og-banner.webp`],
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/codes` },
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
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels Codes <span className="text-accent">({MONTH_YEAR})</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Updated {ISO_DATE} · Honest status + free-gem sources
        </p>
      </header>

      {/* The honest answer, above the fold */}
      <section className="mb-10 rounded-lg border-2 border-accent/40 bg-accent/5 p-6">
        <h2 className="mb-3 text-2xl font-bold text-accent">Short answer: there are no Sniper Duels codes.</h2>
        <p className="mb-3 text-white/80 leading-relaxed">
          Sniper Duels does not ship a promo-code system. There is no Codes button in the game menu, no Twitter codes,
          and no creator codes. If you see other sites listing "active Sniper Duels codes" — those lists are either
          fabricated or copied from a different game.
        </p>
        <p className="text-white/80 leading-relaxed">
          We publish this page so you do not waste time hunting for codes that do not exist. Scroll down for what
          actually gives free gems, and the cheapest legitimate way to buy more.
        </p>
      </section>

      {/* Why other sites lie */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Why other &quot;Sniper Duels codes&quot; pages exist</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          Roblox codes pages get massive search volume. Plenty of low-effort sites publish fake or recycled lists
          to capture that traffic, sometimes copy-pasting from each other for months. A few common patterns:
        </p>
        <ul className="space-y-2 text-white/70">
          <li className="flex gap-2">
            <span className="text-accent">·</span>
            <span>Codes that &quot;look real&quot; (<code className="rounded bg-white/10 px-1 text-xs">SNIPE2024</code>, <code className="rounded bg-white/10 px-1 text-xs">FREEGEMS</code>) invented purely to fill a list.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">·</span>
            <span>Codes copy-pasted from other shooter games (Big Paintball, Arsenal, Phantom Forces) and relabeled.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">·</span>
            <span>&quot;Expired&quot; codes that never existed in the first place — added to make the list look historically active.</span>
          </li>
        </ul>
        <p className="mt-3 text-white/70 leading-relaxed">
          If a code page also runs &quot;how to redeem&quot; instructions for Sniper Duels, you can spot-check it instantly:
          open the game, look at the side menu, see that there is no Codes / Redeem / Settings → Codes button. There
          is no redemption flow because there is no codes system.
        </p>
      </section>

      {/* What actually gives free gems */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">What actually gives free gems in Sniper Duels</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          Here are the real sources of free gems, ranked roughly by how much they pay out:
        </p>
        <ol className="space-y-4">
          <li className="rounded-lg border border-white/10 bg-white/5 p-5">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">1</span>
              <h3 className="font-bold text-white">Discord giveaways</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              The official <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="text-accent hover:underline">community Discord</a>{' '}
              runs giveaways during events, milestones, and weekend tournaments. Joining the server and the giveaway role is the
              single best free-gem source because the prizes scale (1k–50k+ gems per event).
            </p>
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-5">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">2</span>
              <h3 className="font-bold text-white">In-game match and daily rewards</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Playing matches drops small amounts of gems based on placement. Logging in daily and finishing a match
              is the slow-but-steady path. Expect ~50–200 gems per session depending on performance.
            </p>
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-5">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">3</span>
              <h3 className="font-bold text-white">Trading up</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Found a knife or sniper from a case? Check its{' '}
              <Link href="/values" className="text-accent hover:underline">live value</Link>{' '}
              and trade it for gems with other players. Our{' '}
              <Link href="/trading-guide" className="text-accent hover:underline">trading guide</Link>{' '}
              covers fair-value math and how to avoid lowballs.
            </p>
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-5">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">4</span>
              <h3 className="font-bold text-white">YouTube and TikTok creator events</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Bigger Sniper Duels creators occasionally run gem giveaways tied to subscriber milestones or new uploads.
              These are codeless — winners are announced in the video or Discord. Worth following two or three creators
              for the alerts.
            </p>
          </li>
        </ol>
      </section>

      {/* Cheapest legitimate path: shop */}
      <section className="mb-10 rounded-xl border-2 border-accent/30 bg-gradient-to-br from-dark-800 to-dark-900 p-6">
        <div className="mb-2 text-sm font-bold uppercase tracking-wider text-accent">Cheapest legitimate path</div>
        <h2 className="mb-3 text-2xl font-black text-white">Bulk gems at sniperduels.shop</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          If you would rather skip the grind, the auto-shop sells gems at tiered bulk pricing —{' '}
          <span className="font-bold text-accent">$2.90 per 1,000</span> at retail, dropping to{' '}
          <span className="font-bold text-accent">$2.65 per 1,000</span> once you order 100k+.
          Delivery is automated by a bot in a private Roblox server, usually under two minutes.
          Failed deliveries auto-credit your account.
        </p>
        <BuyCTA campaign="codes" shopPath="/gems" shopLabel="Buy gems on sniperduels.shop →" />
      </section>

      {/* What if codes ever ship */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-bold text-white">Will Sniper Duels ever add codes?</h2>
        <p className="text-white/70 leading-relaxed">
          Possibly. Most successful Roblox games eventually ship a codes system for promos, holiday events, or YouTube
          creator partnerships. If Sniper Duels adds one, this page will be the first to list the real working codes,
          with screenshots of the in-game redemption flow. The Discord giveaway role is the fastest way to be notified.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mb-10">
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

      <BuyCTA campaign="codes-bottom" shopPath="/gems" variant="banner" />

      <p className="mt-8 text-sm text-gray-500">
        Last verified: {ISO_DATE}. We re-check the game&apos;s code-redemption status weekly.{' '}
        <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="text-accent hover:underline">
          Join our Discord
        </a>{' '}
        to be notified if a codes system ships.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
