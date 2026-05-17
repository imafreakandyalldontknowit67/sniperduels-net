import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MessageSquare,
  ShieldCheck,
  Coins,
  Gift,
  Users,
  Star,
} from 'lucide-react';
import DiscordButton from '@/components/DiscordButton';
import SectionBanner from '@/components/SectionBanner';
import { DISCORD_INVITE, SITE_URL, SHOP_URL, shopLink } from '@/lib/config';

const D_TITLE = 'Sniper Duels Discord — Official Trading & Community Server';
const D_DESC =
  'Join the official Sniper Duels Discord server — 4,500+ members. Trade items, find middlemen, get value updates, chat with the community. Free Discord invite.';

export const metadata: Metadata = {
  title: D_TITLE,
  description: D_DESC,
  alternates: { canonical: `${SITE_URL}/discord` },
  openGraph: {
    title: D_TITLE,
    description: D_DESC,
    url: `${SITE_URL}/discord`,
    images: ['/og-banner.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: D_TITLE,
    description: D_DESC,
    images: ['/og-banner.webp'],
  },
};

const PERKS = [
  {
    icon: MessageSquare,
    title: 'Trading Channels',
    body: 'Dedicated #・selling, #・buying and #・trading rooms — post your offers, browse what other duelers want to move.',
  },
  {
    icon: ShieldCheck,
    title: 'Free Middleman Service',
    body: 'Verified mm-* channels with tiered middlemen for any cash trade. They hold the item until payment lands.',
  },
  {
    icon: Coins,
    title: 'Live Value Updates',
    body: 'Price-shift pings the moment SDValues bumps a sniper or knife. Never trade off a stale value list.',
  },
  {
    icon: Gift,
    title: 'Giveaways',
    body: 'Staff-hosted gem and skin giveaways. Vouches are public, payouts are tracked, drops are real.',
  },
  {
    icon: Users,
    title: 'Friend Finder',
    body: 'Match up with other duelers for squad play, scrims, and case-opening sessions.',
  },
  {
    icon: Star,
    title: 'Vouches & Reputation',
    body: 'Every successful trade gets logged. Build rep, check buyer/seller history before you ship items.',
  },
];

const STATS = [
  { value: '4,500+', label: 'Members' },
  { value: '60,000+', label: 'Messages / week' },
  { value: '450', label: 'Daily actives' },
  { value: '24/7', label: 'Trading' },
];

const RULES = [
  'No scams — confirmed scammers are permanently banned and flagged across the network.',
  'Use a verified middleman for any USD or crypto trade. Cash-first scams are the #1 reason people get burned.',
  'No spam, no advertising other servers, no DM solicitations. Trade posts stay in trade channels.',
  'English in main chats. Use the regional channels if you need another language.',
  'Be civil — racism, slurs and harassment get you an instant ban with no appeal.',
  'No fake giveaways or impersonating staff. Only roles with the verified badge run drops.',
];

const CHANNELS = [
  { name: '#・w-or-l', desc: 'Worth-or-loss polling — drop a trade screenshot, the community votes if it was W or L.' },
  { name: '#・selling', desc: 'List items you\'re selling. Format: item, condition, asking price (gems or USD).' },
  { name: '#・buying', desc: 'Looking for a specific sniper or knife? Post here and let sellers ping you.' },
  { name: '#・trading', desc: 'Item-for-item swaps. Use the in-game atomic trade window — no middleman needed.' },
  { name: '#・games', desc: 'LFG for squads, scrims, and casual lobby fills.' },
  { name: 'mm-chat', desc: 'Middleman request hub — open a ticket and a verified MM joins your private Roblox server.' },
];

const FAQ = [
  {
    q: 'How do I join the Sniper Duels Discord?',
    a: `Click the "Join Discord" button on this page or open ${DISCORD_INVITE} in any browser. Discord works in-app, on desktop, and on mobile — no account verification beyond a normal Discord login is required.`,
  },
  {
    q: 'Is the Sniper Duels Discord free?',
    a: 'Yes — 100% free. There is no paid tier, no subscription, and no fee to join. Trading, middleman service, value updates, and giveaways are all available the moment you join.',
  },
  {
    q: 'Can I trade on the Discord?',
    a: 'Yes. Post your offer in #・selling, #・buying or #・trading. For in-game gem-for-item swaps the atomic trade window handles escrow automatically. For cash trades (USD or crypto) open a middleman ticket so a verified MM holds the item until payment lands.',
  },
  {
    q: 'How do I find a middleman?',
    a: 'Open the mm-chat channel and create a ticket — a verified middleman will claim it and join your private Roblox server within minutes. Trial / MM / Senior MM / Head MM tiers cover any trade size from $0 to unlimited, all free.',
  },
  {
    q: 'Are giveaways real?',
    a: 'Yes. All giveaways are hosted by staff with public vouches posted after every payout. Winners are pulled by Discord\'s built-in giveaway bot — no entry fee, no DM scams, no "click this link to claim".',
  },
  {
    q: 'Can I sell my items for gems or USD?',
    a: 'Both. Post in #・selling with your asking price in either currency. For high-value items (over $50 USD or 50k gems) we strongly recommend opening a middleman ticket so the MM holds your item until the buyer\'s payment is confirmed.',
  },
];

export default function DiscordPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Discord Server</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          4,565 members · Free to join · Trading + middleman + value updates · 24/7
        </p>
      </header>

      <section className="mb-10 prose prose-invert max-w-none text-gray-300">
        <p className="text-base leading-relaxed sm:text-lg">
          The official <strong className="text-white">Sniper Duels Discord</strong> is where the
          community actually trades. With <strong className="text-white">4,500+ members</strong> active
          across trading, middleman, and value channels, the Sniper Duels Discord server is the
          fastest place to buy, sell or swap snipers and knives — and the only place where every
          high-value cash trade gets a free verified middleman. New value drops from SDValues
          ping the second they hit, staff-run giveaways post real payout vouches, and the
          friend-finder channels match you up with duelers for squad play. Joining the Sniper
          Duels official Discord takes about five seconds, costs nothing, and gives you access
          to live trading channels, vouches, and the same middleman service this site offers.
        </p>
      </section>

      <section className="mb-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <DiscordButton href={DISCORD_INVITE} size="lg">
          <span data-invite-source="discord-landing-hero">Join Discord</span>
        </DiscordButton>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          discord.gg/sniperduels · 1-click invite
        </span>
      </section>

      <section className="mb-12">
        <SectionBanner color="gold" eyebrow="Six reasons people actually open Discord every day">
          What You Get In Our Discord
        </SectionBanner>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map(p => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="border-[3px] border-dark-500 bg-dark-700 p-5"
              >
                <Icon className="mb-2 h-7 w-7 text-accent" strokeWidth={2.5} />
                <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white sm:text-lg">
                  {p.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">{p.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <SectionBanner color="blue" eyebrow="Hard numbers, not vibes">
          Server Stats
        </SectionBanner>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map(s => (
            <div
              key={s.label}
              className="border-[3px] border-accent/60 bg-accent/5 p-4 text-center"
            >
              <div className="text-2xl font-black text-accent sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-300 sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionBanner color="gold" eyebrow="Keep the server clean — and your trades safe">
          Server Rules
        </SectionBanner>
        <ul className="space-y-3">
          {RULES.map((r, i) => (
            <li
              key={i}
              className="flex gap-4 border-[3px] border-dark-500 bg-dark-700 p-4"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-[2px] border-accent-dark bg-accent text-sm font-black text-dark-900">
                {i + 1}
              </div>
              <div className="pt-1 text-sm leading-relaxed text-gray-200">{r}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <SectionBanner color="blue" eyebrow="The channels everyone actually uses">
          Featured Channels
        </SectionBanner>
        <div className="grid gap-3 sm:grid-cols-2">
          {CHANNELS.map(c => (
            <div
              key={c.name}
              className="border-[3px] border-dark-500 bg-dark-700 p-4"
            >
              <div className="mb-1 text-sm font-bold uppercase tracking-wider text-accent">
                {c.name}
              </div>
              <div className="text-xs leading-relaxed text-gray-300 sm:text-sm">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionBanner color="gold" eyebrow="Everything new members ask in the first day">
          Discord FAQ
        </SectionBanner>
        <div className="space-y-3">
          {FAQ.map(({ q, a }) => (
            <details
              key={q}
              className="group border-[3px] border-dark-500 bg-dark-700 p-4 open:border-accent/60"
            >
              <summary className="cursor-pointer list-none text-sm font-bold uppercase tracking-wider text-white sm:text-base">
                <span className="mr-2 text-accent group-open:hidden">+</span>
                <span className="mr-2 hidden text-accent group-open:inline">−</span>
                {q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <div
        className="mb-10 border-[3px] border-accent/60 bg-gradient-to-br from-dark-800 to-dark-900 p-6 text-center md:p-8"
        style={{
          boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.4), 0 4px 0 rgba(0,0,0,0.5)',
        }}
      >
        <h2 className="mb-2 text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
          Ready to join?
        </h2>
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400 sm:text-sm">
          4,565 duelers already trading inside. Free, 1-click invite.
        </p>
        <div className="flex justify-center">
          <DiscordButton href={DISCORD_INVITE} size="lg">
            <span data-invite-source="discord-landing-footer">Join Discord</span>
          </DiscordButton>
        </div>
      </div>

      <section className="mb-4">
        <SectionBanner color="blue" align="left" eyebrow="Once you're inside the Discord — these are the next stops">
          While You&apos;re Here
        </SectionBanner>
        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href={shopLink('/gems', 'discord-landing')}
            target="_blank"
            rel="noopener"
            className="group border-[3px] border-dark-500 bg-dark-700 p-4 hover:border-accent/60 hover:no-underline"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">
              Looking for gems?
            </div>
            <div className="text-base font-bold uppercase tracking-wider text-white sm:text-lg">
              Buy on our shop <span className="text-accent group-hover:translate-x-1">→</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">From $2.65 / 1k · 24/7 auto-delivery</div>
          </a>
          <Link
            href="/values"
            className="group border-[3px] border-dark-500 bg-dark-700 p-4 hover:border-accent/60 hover:no-underline"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">
              Check the values
            </div>
            <div className="text-base font-bold uppercase tracking-wider text-white sm:text-lg">
              Item value list <span className="text-accent group-hover:translate-x-1">→</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">Live values · Updated every 6h</div>
          </Link>
          <Link
            href="/middleman"
            className="group border-[3px] border-dark-500 bg-dark-700 p-4 hover:border-accent/60 hover:no-underline"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">
              Need a middleman?
            </div>
            <div className="text-base font-bold uppercase tracking-wider text-white sm:text-lg">
              Free MM service <span className="text-accent group-hover:translate-x-1">→</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">Verified · All trade sizes · Free</div>
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sniper Duels',
              url: SITE_URL,
              logo: `${SITE_URL}/gem_icon.png`,
              sameAs: [DISCORD_INVITE, SHOP_URL],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Discord', item: `${SITE_URL}/discord` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ]),
        }}
      />
    </>
  );
}
