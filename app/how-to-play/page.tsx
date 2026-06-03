import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, DISCORD_INVITE } from '@/lib/config';
import BuyCTA from '@/components/BuyCTA';

const TITLE = 'How to Play Sniper Duels — Beginner Guide for New Players (2026)';
const DESC =
  'New to Sniper Duels? Learn how to play with this complete beginner guide — the objective, basic controls, weapons and skins, how to get gems, and tips to win your first duels.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/how-to-play` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/how-to-play` },
  twitter: { title: TITLE, description: DESC },
};

const SECTIONS = [
  { id: 'what-is', title: 'What Is Sniper Duels?' },
  { id: 'objective', title: 'The Objective — How a Duel Works' },
  { id: 'getting-started', title: 'Getting Started (Controls Basics)' },
  { id: 'weapons-skins', title: 'Weapons & Skins' },
  { id: 'gems', title: 'How to Get Gems' },
  { id: 'tips', title: 'Tips for New Players' },
  { id: 'community', title: 'Join the Community' },
];

const FAQ = [
  {
    q: 'How do you play Sniper Duels?',
    a: 'In Sniper Duels you spawn into a round, aim your sniper rifle at opponents, and try to land shots to eliminate them before they eliminate you. Move to avoid enemy fire, line up your crosshair, and click to shoot. Win rounds to earn rewards, unlock new weapons, and climb the leaderboard.',
  },
  {
    q: 'Is Sniper Duels free?',
    a: 'Yes. Sniper Duels is a free-to-play Roblox game — anyone with a Roblox account can play it at no cost. Optional in-game purchases like gems and cosmetic skins are available, but they are not required to play, compete, or improve.',
  },
  {
    q: 'How do I get better at Sniper Duels?',
    a: 'Practice your aim, learn the maps so you know common sightlines and cover spots, and keep moving so you are harder to hit. Watching experienced players and asking for tips in the community Discord is one of the fastest ways to improve, since regulars share strategies and gameplay clips.',
  },
  {
    q: 'Do I need to buy gems to play Sniper Duels?',
    a: 'No. Gems are an in-game currency used mainly for cosmetics and unlocking items, not for core gameplay. You can earn currency by playing, and skins are visual only — they do not give you a competitive advantage in a duel. Buying gems simply lets you unlock cosmetics faster.',
  },
  {
    q: 'What controls does Sniper Duels use?',
    a: 'On PC you move with WASD, aim with the mouse, click to fire, and jump with the spacebar — standard Roblox shooter controls. On mobile and console you use the on-screen joystick or controller equivalents. The exact layout can change with updates, so check the in-game settings menu for the current key bindings.',
  },
];

export default function HowToPlayPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'How to Play', item: `${SITE_URL}/how-to-play` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'How to Play Sniper Duels',
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
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/how-to-play` },
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
          How to Play <span className="text-accent">Sniper Duels</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Beginner guide for new players · 2026
        </p>
      </header>

      {/* Direct-answer intro (server-rendered, quotable) */}
      <section className="mb-10">
        <p className="text-white/70 leading-relaxed">
          Sniper Duels is a free-to-play Roblox first-person shooter where you face off against other players in
          fast sniper-rifle battles. You play by aiming your scope, landing shots to eliminate opponents, and
          staying on the move to avoid getting hit. Win rounds to earn rewards, unlock weapons, and collect skins.
          This beginner guide covers the objective, controls, gems, and tips to win your first duels.
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

      {/* Section 1: What is Sniper Duels */}
      <section id="what-is" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">What Is Sniper Duels?</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          Sniper Duels is a competitive player-versus-player shooter on Roblox built around sniper rifles. Instead
          of spray-and-pray combat, the focus is on precision: each shot counts, and a single well-placed hit can
          decide a duel. Matches are quick, so you can jump in for one round or grind for hours.
        </p>
        <p className="text-white/70 leading-relaxed">
          The game is free to play and accessible to anyone with a Roblox account on PC, mobile, or console. Beyond
          the core combat, Sniper Duels has a deep cosmetic and collecting side — weapons and skins of different
          rarities that players show off, unlock, and trade with one another.
        </p>
      </section>

      {/* Section 2: Objective */}
      <section id="objective" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">The Objective — How a Duel Works</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          The goal in Sniper Duels is simple: eliminate your opponents before they eliminate you. You spawn into a
          round, locate enemy players, and use your sniper rifle to land shots. Landing accurate hits eliminates
          opponents and scores you points; getting hit sends you back to respawn.
        </p>
        <p className="text-white/70 leading-relaxed">
          Because everyone is using a sniper, positioning and aim matter far more than raw firepower. Good players
          use cover, control the high ground and long sightlines, and reposition constantly so they are harder to
          pin down. Winning rounds earns you progression and rewards that you can put toward weapons and cosmetics.
        </p>
      </section>

      {/* Section 3: Getting Started / Controls */}
      <section id="getting-started" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Getting Started (Controls Basics)</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          If you are new to Roblox shooters, the controls will feel familiar fast. Here are the basics to get you
          into your first duel:
        </p>
        <ul className="mb-4 space-y-3 text-white/70">
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Move:</strong> Use the WASD keys on PC, or the on-screen joystick on mobile, to walk and strafe.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Aim:</strong> Move your mouse to line up the crosshair. Many snipers let you scope in for a tighter, more accurate shot.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Shoot:</strong> Click (or tap the fire button) to take a shot. Time it for when your crosshair is on the target.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Jump &amp; dodge:</strong> Press the spacebar to jump and keep moving — a stationary player is an easy target.</span>
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed">
          Control layouts can change between updates and differ slightly across platforms, so open the in-game
          settings menu to see and customize the current key bindings before you jump in.
        </p>
      </section>

      {/* Section 4: Weapons & Skins */}
      <section id="weapons-skins" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Weapons &amp; Skins</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          As you play, you unlock and collect different weapons and cosmetic skins. Skins are mostly visual — they
          change how your sniper looks without giving a gameplay advantage — but rarer ones carry serious prestige
          and trade value in the community. Collecting and showing off skins is a big part of the game&apos;s appeal.
        </p>
        <p className="text-white/70 leading-relaxed">
          Want to know what everything is worth before you spend or trade? Check the{' '}
          <Link href="/values" className="text-cyan-400 hover:text-cyan-300">Sniper Duels value list</Link> for live
          community gem prices, see our{' '}
          <Link href="/best-snipers" className="text-cyan-400 hover:text-cyan-300">best snipers</Link> ranking for the
          top picks, and use the{' '}
          <Link href="/tier-list" className="text-cyan-400 hover:text-cyan-300">weapon tier list</Link> to see how
          every weapon stacks up from S to D.
        </p>
      </section>

      {/* Section 5: How to Get Gems */}
      <section id="gems" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">How to Get Gems</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          Gems are the premium currency in Sniper Duels, used mainly for unlocking cosmetics and items. You can earn
          some currency simply by playing and winning rounds, but if you want to unlock skins faster, you can buy
          gems directly. Remember: gems are for cosmetics and progression, not a pay-to-win advantage.
        </p>
        <p className="text-white/70 leading-relaxed">
          To stock up, see our{' '}
          <Link href="/gems" className="text-cyan-400 hover:text-cyan-300">how to get gems</Link> guide for the best
          rates, or buy gems directly from the official{' '}
          <a href="https://sniperduels.shop" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300">
            sniperduels.shop
          </a>{' '}
          marketplace.
        </p>
      </section>

      {/* Section 6: Tips */}
      <section id="tips" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Tips for New Players</h2>
        <ul className="space-y-3 text-white/70">
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Keep moving:</strong> Strafe and reposition between shots. A player who stands still is the easiest kill in the game.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Pre-aim sightlines:</strong> Keep your crosshair where enemies are likely to appear so you react faster than they do.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Use cover:</strong> Peek, shoot, and pull back behind cover instead of standing out in the open.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Practice your aim:</strong> Accuracy beats speed with a sniper. Take the extra split-second to line up a clean shot.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Don&apos;t chase looks over skill:</strong> Skins are cool, but they won&apos;t win duels — your aim and movement will.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Learn from others:</strong> Watch experienced players and ask questions in the community to pick up strategies fast.</span>
          </li>
        </ul>
      </section>

      {/* Section 7: Community / CTA */}
      <section id="community" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Join the Community</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          The fastest way to improve at Sniper Duels is to learn from players who already know the game inside out.
          Our community Discord is full of experienced players who share aim tips, strategies, gameplay clips, and
          help newcomers get started — plus trading channels and free middlemen if you ever want to trade skins.
        </p>
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-5">
          <h3 className="mb-2 font-bold text-white">Learn from experienced players</h3>
          <p className="mb-4 text-sm text-white/70 leading-relaxed">
            Got a question, want to find a duel, or looking to level up your skills?{' '}
            <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300">
              Join the Sniper Duels Discord
            </a>{' '}
            and play with the community.
          </p>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener"
            className="inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-dark-900 transition-opacity hover:opacity-90"
          >
            Join the Discord →
          </a>
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

      <BuyCTA campaign="how-to-play" shopPath="/gems" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
