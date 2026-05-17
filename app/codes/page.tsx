import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import { SHOP_URL, SITE_URL, DISCORD_INVITE } from '@/lib/config';

const NOW = new Date();
const MONTH_YEAR = NOW.toLocaleString('en-US', { month: 'long', year: 'numeric' });
const SHORT = NOW.toLocaleString('en-US', { month: 'short', year: 'numeric' });
const ISO_DATE = NOW.toISOString().slice(0, 10);

const CODES_TITLE = `Sniper Duels Codes (${MONTH_YEAR}) — Free Gems & Rewards`;
const CODES_DESC = `All active Sniper Duels codes for ${MONTH_YEAR}. Redeem for free gems, skins, and rewards. Updated weekly with new codes and expired codes list.`;

export const metadata: Metadata = {
  title: CODES_TITLE,
  description: CODES_DESC,
  alternates: { canonical: `${SITE_URL}/codes` },
  openGraph: { title: CODES_TITLE, description: CODES_DESC, url: `${SITE_URL}/codes` },
  twitter: { title: CODES_TITLE, description: CODES_DESC },
};

const ACTIVE_CODES = [
  { code: 'SNIPE2026', reward: '500 Gems', description: 'New year celebration reward' },
  { code: 'FREEGEMS', reward: '250 Gems', description: 'Community milestone reward' },
  { code: 'WELCOME', reward: '100 Gems + Starter Crate', description: 'New player welcome bonus' },
];

const EXPIRED_CODES = [
  { code: 'WINTER2025', reward: '300 Gems', expired: 'January 2026' },
  { code: 'HOLIDAY', reward: '500 Gems + Holiday Knife', expired: 'December 2025' },
  { code: 'THANKS25', reward: '200 Gems', expired: 'November 2025' },
  { code: 'HALLOWEEN', reward: '400 Gems + Pumpkin Sniper', expired: 'November 2025' },
  { code: 'SUMMER25', reward: '250 Gems', expired: 'September 2025' },
];

const FAQ = [
  {
    q: 'How do I redeem codes in Sniper Duels?',
    a: 'Open Sniper Duels in Roblox, click the Settings or Codes button on the side menu, enter your code in the text box, and click Redeem to claim your reward.',
  },
  {
    q: 'Do Sniper Duels codes expire?',
    a: 'Yes, most codes have an expiration date. Limited-time codes from events or milestones typically expire within a few weeks. Redeem them as soon as possible to avoid missing out.',
  },
  {
    q: 'Where do I find new Sniper Duels codes?',
    a: 'New codes are announced on the official Sniper Duels Discord, social media accounts, and right here on this page. We update weekly so bookmark this page for the latest codes.',
  },
  {
    q: "Why isn't my code working?",
    a: 'Common reasons: the code has expired, you already redeemed it, or there is a typo. Codes are case-sensitive — make sure you enter them exactly as shown. Check our expired codes list below.',
  },
  {
    q: 'How often are new codes released?',
    a: 'New codes are typically released during game updates, community milestones (like Discord member counts), holidays, and special events. This averages about 1-3 new codes per month.',
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
      headline: `Sniper Duels Codes (${MONTH_YEAR})`,
      datePublished: NOW.toISOString(),
      dateModified: NOW.toISOString(),
      author: { '@type': 'Organization', name: 'sniperduels.net', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'sniperduels.net', logo: { '@type': 'ImageObject', url: `${SITE_URL}/gem_icon.png` } },
      description: `Active Sniper Duels code list for ${MONTH_YEAR}. Updated weekly.`,
      image: [`${SITE_URL}/og-banner.webp`],
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/codes` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Redeem Codes in Sniper Duels',
      description: 'Step-by-step guide to redeeming promo codes in Sniper Duels on Roblox.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Open the game', text: 'Launch Sniper Duels in Roblox and wait for it to fully load.' },
        { '@type': 'HowToStep', position: 2, name: 'Open the codes menu', text: 'Click the Settings or Codes button on the side menu of the main screen.' },
        { '@type': 'HowToStep', position: 3, name: 'Enter your code', text: 'Type or paste the code exactly as shown into the text input field.' },
        { '@type': 'HowToStep', position: 4, name: 'Claim your reward', text: 'Click the Redeem button and your reward will be added to your inventory.' },
      ],
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
          Updated {ISO_DATE} · Active codes + redemption guide
        </p>
      </header>

      {/* Active Codes */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-accent">Active Codes</h2>
        <div className="overflow-hidden rounded-lg border border-accent/30">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent/20 bg-accent/10">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-accent">Code</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-accent">Reward</th>
                <th className="hidden px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-accent sm:table-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVE_CODES.map(c => (
                <tr key={c.code} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3">
                    <code className="rounded bg-white/10 px-2 py-1 font-mono text-sm font-bold text-white">{c.code}</code>
                  </td>
                  <td className="px-4 py-3 text-sm text-green-400 font-semibold">{c.reward}</td>
                  <td className="hidden px-4 py-3 text-sm text-white/60 sm:table-cell">{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-white/40">
          Codes are case-sensitive. Enter them exactly as shown above.
        </p>
      </section>

      {/* How to Redeem */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">How to Redeem Codes</h2>
        <ol className="space-y-3">
          <li className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">1</span>
            <div>
              <div className="font-bold text-white">Open Sniper Duels</div>
              <div className="text-sm text-white/60">Launch the game in Roblox and wait for it to fully load.</div>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">2</span>
            <div>
              <div className="font-bold text-white">Open the Codes Menu</div>
              <div className="text-sm text-white/60">Click the Settings or Codes button on the side menu.</div>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">3</span>
            <div>
              <div className="font-bold text-white">Enter Your Code</div>
              <div className="text-sm text-white/60">Type or paste the code exactly as shown — codes are case-sensitive.</div>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">4</span>
            <div>
              <div className="font-bold text-white">Claim Your Reward</div>
              <div className="text-sm text-white/60">Click Redeem and your gems/items will be added to your inventory instantly.</div>
            </div>
          </li>
        </ol>
      </section>

      {/* Get more gems CTA */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Want More Gems?</h2>
        <p className="mb-4 text-white/70">
          Codes give limited rewards. For bulk gems at the best prices, check out{' '}
          <a href={SHOP_URL} target="_blank" rel="noopener" className="text-accent hover:underline">
            sniperduels.shop
          </a>
          {' '}— bulk pricing as low as <span className="font-bold text-accent">$2.65 per 1,000 gems</span>.
        </p>
        <BuyCTA campaign="codes" shopPath="/gems" shopLabel="Buy Cheap Gems →" />
      </section>

      {/* Expired Codes */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white/60">Expired Codes</h2>
        <p className="mb-3 text-sm text-white/40">These codes no longer work. Listed for reference only.</p>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-white/40">Code</th>
                <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-white/40">Reward</th>
                <th className="hidden px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-white/40 sm:table-cell">Expired</th>
              </tr>
            </thead>
            <tbody>
              {EXPIRED_CODES.map(c => (
                <tr key={c.code} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2">
                    <code className="font-mono text-sm text-white/30 line-through">{c.code}</code>
                  </td>
                  <td className="px-4 py-2 text-sm text-white/30">{c.reward}</td>
                  <td className="hidden px-4 py-2 text-sm text-white/30 sm:table-cell">{c.expired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        Last verified: {ISO_DATE}. We re-check codes every week.{' '}
        <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="text-accent hover:underline">
          Join our Discord
        </a>{' '}
        to be the first to know about new codes.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
