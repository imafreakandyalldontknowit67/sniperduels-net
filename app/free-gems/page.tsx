import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import SectionBanner from '@/components/SectionBanner';
import { SITE_URL, DISCORD_INVITE } from '@/lib/config';

const TITLE = 'How to Get Free Gems in Sniper Duels (2026) — Legit Ways + Scam Warning';
const DESC =
  'The honest guide to getting free gems in Sniper Duels. Earn gems by playing matches, leveling up, and trading up items — plus why "free gem generator" sites are scams that steal accounts.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/free-gems` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/free-gems` },
  twitter: { title: TITLE, description: DESC },
};

const SECTIONS = [
  { id: 'legit-ways', title: 'Legit Ways to Earn Free Gems In-Game' },
  { id: 'trading-up', title: 'Trading Up Items for More Value' },
  { id: 'scam-warning', title: 'Warning: Free Gem Generators Are Scams' },
  { id: 'cheapest', title: 'Fastest Way: Buy Cheap Gems' },
  { id: 'discord', title: 'Join the Discord for Trades & Giveaways' },
];

const FAQ = [
  {
    q: 'Can you get free gems in Sniper Duels?',
    a: 'Yes — you can earn gems for free by playing matches, leveling up your account, and claiming daily and event rewards inside Sniper Duels. You can also grow your gem total by trading up lower-value items for higher-value ones. There is no instant "free gem button," but consistent play and smart trading add up over time.',
  },
  {
    q: 'Are free gem generators safe?',
    a: 'No. "Free gem generators" and "gem hack" sites are scams. Roblox and Sniper Duels do not have any external tool that adds gems to your account. These sites exist to steal your Roblox login, hijack your account, or trick you into bot verification and surveys. Never enter your password or username anywhere outside the official Roblox site.',
  },
  {
    q: "What's the cheapest way to get gems in Sniper Duels?",
    a: 'The cheapest reliable way to get gems is to buy them from sniperduels.shop, where bulk gems start around $2.65 per 1,000 — well below the in-game Robux store. Orders are auto-delivered by a trade bot, so you never share your password and there is no account risk.',
  },
  {
    q: 'Do free gem codes exist for Sniper Duels?',
    a: 'Sniper Duels occasionally releases in-game promo codes for small rewards, but there are no codes that hand out large amounts of free gems. Any site or video promising a "secret gem code" is almost always clickbait or a scam. Check the official Discord for legitimate, current codes.',
  },
  {
    q: 'Will I get banned for using a free gem generator?',
    a: 'You risk far worse than a ban — most generators are phishing pages built to steal your account. If you enter your Roblox credentials, your account can be hijacked, your items traded away, and your gems drained. Avoid them entirely and only get gems through in-game play or a trusted seller.',
  },
];

export default function FreeGemsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Free Gems', item: `${SITE_URL}/free-gems` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'How to Get Free Gems in Sniper Duels',
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
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/free-gems` },
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
          How to Get <span className="text-accent">Free Gems</span> in Sniper Duels
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Legit in-game methods · Scam warning · Cheapest gems · 2026
        </p>
      </header>

      {/* Direct-answer intro (server-rendered, quotable) */}
      <section className="mb-10">
        <p className="text-lg text-white/80 leading-relaxed">
          You can get free gems in Sniper Duels by playing matches, leveling up your account, and claiming daily
          and event rewards in-game. You can also grow your gem total by trading up lower-value items. There is no
          legitimate &quot;free gem generator&quot; — those sites are scams that steal Roblox accounts.
        </p>
      </section>

      {/* Table of Contents */}
      <nav className="mb-10 rounded-lg border border-white/10 bg-white/5 p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/50">Table of Contents</h2>
        <ol className="space-y-1.5">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-cyan-400 hover:text-cyan-300 text-sm">
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Section 1: Legit ways */}
      <section id="legit-ways" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Legit Ways to Earn Free Gems In-Game</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          Every gem you earn for free in Sniper Duels comes from playing the game itself. There&apos;s no shortcut
          button, but these in-game methods are 100% safe and never put your account at risk:
        </p>
        <div className="space-y-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="mb-1 font-bold text-white">Play and win matches</h3>
            <p className="text-sm text-white/70">
              Completing duels and rounds rewards you with gems. Winning generally pays out more than losing, so the
              better you play, the faster your gems add up. Consistent daily play is the single biggest free source.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="mb-1 font-bold text-white">Level up your account</h3>
            <p className="text-sm text-white/70">
              As you earn XP and rank up, the game hands out milestone rewards. Higher levels can unlock larger
              one-time gem bonuses, so playing toward the next level is worth it. Tuning your{' '}
              <Link href="/best-settings" className="text-cyan-400 hover:text-cyan-300">best settings</Link> helps you
              win more and level faster.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="mb-1 font-bold text-white">Claim daily &amp; login rewards</h3>
            <p className="text-sm text-white/70">
              Logging in regularly lets you claim daily rewards, which often include gems. Streaks usually pay more
              the longer you keep them going, so it&apos;s worth hopping in even for a minute each day.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="mb-1 font-bold text-white">Take part in events &amp; updates</h3>
            <p className="text-sm text-white/70">
              Seasonal events, limited-time modes, and major updates frequently come with bonus gem rewards or
              free crates. Keep an eye on the{' '}
              <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300">
                official Discord
              </a>{' '}
              so you don&apos;t miss time-limited gem giveaways.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/50 leading-relaxed">
          Exact gem amounts change between updates, so we don&apos;t list fixed numbers here — check in-game to see
          your current rewards.
        </p>
      </section>

      {/* Section 2: Trading up */}
      <section id="trading-up" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Trading Up Items for More Value</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          Even without spending a cent, you can grow your gem value by trading smartly. The idea is simple: trade
          lower-value items for higher-value ones, or pick up undervalued items and re-trade them at full price.
          Done patiently, this is one of the most effective free ways to build wealth in Sniper Duels.
        </p>
        <p className="mb-3 text-white/70 leading-relaxed">
          The key is knowing what everything is actually worth. Always check the{' '}
          <Link href="/values" className="text-cyan-400 hover:text-cyan-300">Sniper Duels value list</Link>{' '}
          before any trade so you never give away more than you get. To learn the full process — checking values,
          using middlemen, and avoiding scams — read our{' '}
          <Link href="/trading-guide" className="text-cyan-400 hover:text-cyan-300">complete trading guide</Link>.
        </p>
        <p className="text-white/70 leading-relaxed">
          Trading up takes time and a bit of market knowledge, but it costs nothing and the gains compound. Many
          traders started with a single common item and worked their way up to godly-tier inventories purely through
          fair trades.
        </p>
      </section>

      {/* Section 3: Scam warning */}
      <section id="scam-warning" className="mb-10">
        <SectionBanner color="blue" align="left" eyebrow="Read this before you type your password anywhere">
          Warning: Free Gem Generators Are Scams
        </SectionBanner>
        <div className="rounded-lg border-[3px] border-red-500/40 bg-red-500/10 p-5 sm:p-6">
          <p className="mb-3 text-white/80 leading-relaxed">
            <strong className="text-red-300">There is no such thing as a free gem generator for Sniper Duels.</strong>{' '}
            Roblox does not let any external website add gems, Robux, or items to your account. Every site, video, or
            ad promising &quot;free gems,&quot; a &quot;gem hack,&quot; or an &quot;unlimited gems glitch&quot; is a
            scam designed to take something from you.
          </p>
          <p className="mb-3 text-white/80 leading-relaxed">Here&apos;s how these scams actually work:</p>
          <ul className="mb-4 space-y-2 text-sm text-white/75">
            <li className="flex gap-2">
              <span className="text-red-400">✕</span>
              <span><strong className="text-white">Phishing logins:</strong> They show a fake Roblox login page. The moment you enter your username and password, the scammer owns your account and drains your gems and items.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">✕</span>
              <span><strong className="text-white">&quot;Human verification&quot; loops:</strong> Endless surveys, app installs, and offers that never deliver gems — they just earn the scammer ad money and your data.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">✕</span>
              <span><strong className="text-white">Malware downloads:</strong> Some sites push a &quot;gem tool&quot; .exe or browser extension that steals your saved passwords and cookies.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">✕</span>
              <span><strong className="text-white">Discord token stealers:</strong> Fake bots or links that grab your Discord session and use your account to spread the scam further.</span>
            </li>
          </ul>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-white/80 leading-relaxed">
              <strong className="text-accent">Golden rule:</strong> never enter your Roblox password anywhere except
              the official roblox.com site, and never share your account, cookie, or 2FA code with anyone. The only
              ways to get gems are playing in-game or buying from a trusted seller who trades with you{' '}
              <em>in-game</em> — without ever asking for your login.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Cheapest / buy */}
      <section id="cheapest" className="mb-10">
        <SectionBanner color="gold" eyebrow="No grinding, no risk — auto-delivered by the trade bot">
          Fastest Way: Buy Cheap Gems
        </SectionBanner>
        <p className="mb-3 text-white/70 leading-relaxed">
          Earning gems in-game is free but slow, and trading up takes patience. If you want gems now, the fastest
          and safest option is to{' '}
          <a href="https://sniperduels.shop" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300">
            buy cheap Sniper Duels gems
          </a>{' '}
          from the official shop. Bulk gems start around{' '}
          <span className="text-accent font-bold">$2.65 per 1,000</span> — far below the in-game Robux store.
        </p>
        <p className="mb-3 text-white/70 leading-relaxed">
          Unlike scam generators, this is completely safe: a trade bot meets you in a private Roblox server and
          trades the gems directly to your character. <strong className="text-white">You never share your
          password</strong>, and orders are auto-delivered within minutes. It&apos;s the closest thing to
          &quot;instant gems&quot; that actually exists.
        </p>
        <BuyCTA campaign="free-gems" shopPath="/gems" variant="banner" />
      </section>

      {/* Section 5: Discord CTA */}
      <section id="discord" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Join the Discord for Trades &amp; Giveaways</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          The community Discord is the best free resource for any Sniper Duels player. It runs regular gem and item
          giveaways, hosts thousands of active traders, lists legitimate current codes, and provides verified
          middlemen so your trades stay safe.{' '}
          <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300">
            Join the Sniper Duels Discord
          </a>{' '}
          to catch giveaways and find trade partners.
        </p>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          New to trading? Start with the{' '}
          <Link href="/trading-guide" className="text-cyan-400 hover:text-cyan-300">trading guide</Link>, keep the{' '}
          <Link href="/values" className="text-cyan-400 hover:text-cyan-300">value list</Link> open, and never accept
          a deal you haven&apos;t double-checked.
        </div>
      </section>

      {/* FAQ Section */}
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

      <BuyCTA campaign="free-gems-bottom" shopPath="/gems" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
