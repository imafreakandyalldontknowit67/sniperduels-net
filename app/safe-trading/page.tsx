import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import BuyCTA from '@/components/BuyCTA';
import DiscordButton from '@/components/DiscordButton';
import SectionBanner from '@/components/SectionBanner';
import { DISCORD_INVITE, SITE_URL } from '@/lib/config';

const ST_TITLE = 'Is Buying Sniper Duels Gems Safe?';
const ST_DESC =
  'Yes — buying Sniper Duels gems via sniperduels.shop is safe. See how the auto-trade bot works, what protections you get, and what to avoid.';

export const metadata: Metadata = {
  title: ST_TITLE,
  description: ST_DESC,
  alternates: { canonical: `${SITE_URL}/safe-trading` },
  openGraph: { title: ST_TITLE, description: ST_DESC, url: `${SITE_URL}/safe-trading` },
  twitter: { title: ST_TITLE, description: ST_DESC },
};

export default function SafeTradingPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Is buying Sniper Duels gems <span className="text-accent">safe?</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Yes — through a verified marketplace with auto-trade + refund guarantee.
        </p>
      </header>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <div className="border-[3px] border-emerald-500/60 bg-emerald-500/5 p-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">Safe</div>
          <h2 className="mb-2 text-xl font-black uppercase tracking-wider text-white">sniperduels.shop</h2>
          <ul className="space-y-1.5 text-sm text-gray-200">
            <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" strokeWidth={3} />Automated trade bot in private Roblox server</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" strokeWidth={3} />Wallet held until delivery confirmed</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" strokeWidth={3} />Auto-refund if bot can&apos;t reach you in 30 min</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" strokeWidth={3} />13+ verified vendors, all background-checked</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" strokeWidth={3} />Full transcript of every order</li>
          </ul>
        </div>
        <div className="border-[3px] border-red-500/60 bg-red-500/5 p-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-red-300">Risky</div>
          <h2 className="mb-2 text-xl font-black uppercase tracking-wider text-white">Random sellers</h2>
          <ul className="space-y-1.5 text-sm text-gray-200">
            <li className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" strokeWidth={3} />Pay first, hope they deliver</li>
            <li className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" strokeWidth={3} />No middleman — common scam vector</li>
            <li className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" strokeWidth={3} />No refund if they ghost you</li>
            <li className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" strokeWidth={3} />Account-sharing = TOS violation, ban risk</li>
            <li className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" strokeWidth={3} />Stolen-account inventory (chargebacks → your loss)</li>
          </ul>
        </div>
      </section>

      <section className="mb-10 prose prose-invert max-w-none text-gray-300">
        <SectionBanner color="gold" align="left" eyebrow="Money in escrow → bot delivery → auto-refund if anything fails">
          How The Safe Flow Works
        </SectionBanner>
        <ol>
          <li>You pick a gem amount and pay on sniperduels.shop. Money goes to escrow.</li>
          <li>The trade bot pulls your order off the queue and finds an available vendor.</li>
          <li>You get a Discord ping when the bot is ready to trade. You join a private Roblox server.</li>
          <li>You hit &quot;I&apos;m Ready&quot;. The bot trades you the exact gem amount.</li>
          <li>Delivery confirmed → escrow releases to vendor. You&apos;re done.</li>
          <li>If the bot can&apos;t reach you within 30 minutes (you went offline, etc.), you&apos;re auto-refunded to wallet.</li>
        </ol>
        <p>
          <strong className="text-white">No account sharing. No login credentials shared. No risk of ban.</strong>{' '}
          Roblox doesn&apos;t care about in-game item trades — only account sharing is forbidden.
        </p>
      </section>

      <BuyCTA campaign="safe-trading-mid" shopPath="/gems" variant="banner" />

      <section className="mt-10 prose prose-invert max-w-none text-gray-300">
        <SectionBanner color="blue" align="left" eyebrow="If you see any of these — walk away.">
          Red Flags To Avoid
        </SectionBanner>
        <ul>
          <li><strong className="text-white">Anyone asking for your Roblox password</strong> — never share it. Trades happen in-game, not by sharing accounts.</li>
          <li><strong className="text-white">Sellers wanting payment via gift cards or untraceable methods</strong> — usually scams.</li>
          <li><strong className="text-white">No middleman offered for high-value trades</strong> — open a{' '}
            <Link href="/middleman" className="text-accent hover:underline">free middleman ticket</Link> instead.</li>
          <li><strong className="text-white">Prices way below market</strong> — if it&apos;s less than $2 per 1k gems, it&apos;s likely stolen inventory or a chargeback risk.</li>
          <li><strong className="text-white">Pressure to buy &quot;right now or the deal is gone&quot;</strong> — classic scam tactic.</li>
        </ul>
      </section>

      {/* FAQ — visible HTML mirrors JSON-LD for E-E-A-T and AI Overview eligibility */}
      <section className="mb-12 mt-10">
        <SectionBanner color="blue" eyebrow="Common questions about safe Sniper Duels trading">
          FAQ
        </SectionBanner>
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white">Is sniperduels.net safe?</h3>
            <p className="text-sm">Yes. sniperduels.net is a community marketplace backed by sniperduels.shop, which uses an automated trade bot and escrow system. Your payment is held until gems are delivered in-game, and you get an automatic refund if delivery fails within 30 minutes.</p>
          </div>
          <div>
            <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white">How do I avoid getting scammed in Sniper Duels?</h3>
            <p className="text-sm">Use the official sniperduels.shop auto-trade bot for gem purchases and request a free verified middleman for cash trades. Never share your Roblox password, avoid gift-card payments, and reject sellers who refuse escrow or middleman services.</p>
          </div>
          <div>
            <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white">What is a middleman trade?</h3>
            <p className="text-sm">A middleman trade uses a verified third party who holds the seller&apos;s item until the buyer&apos;s payment is confirmed. This eliminates the risk of either side scamming. On sniperduels.net, middleman services are always free and handled by tiered, vetted moderators.</p>
          </div>
          <div>
            <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white">Can I get banned for trading in Sniper Duels?</h3>
            <p className="text-sm">No. In-game item and gem trading is a built-in Sniper Duels feature. Roblox only prohibits account sharing. The sniperduels.shop trade bot never asks for your password — it trades with you inside a private Roblox server, which is fully permitted.</p>
          </div>
          <div>
            <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white">How do I report a scammer?</h3>
            <p className="text-sm">Open a ticket in the sniperduels.net Discord server with screenshots of the conversation, trade screen, and any payment receipts. The moderation team reviews reports within 24 hours and blacklists confirmed scammers from all community services.</p>
          </div>
          <div>
            <h3 className="mb-2 text-base font-bold uppercase tracking-wider text-white">What payment methods are safe for Sniper Duels trades?</h3>
            <p className="text-sm">Cash App, Venmo, PayPal, Apple Pay, Google Pay, bank transfers, and major cryptocurrencies are all accepted on sniperduels.shop. Avoid gift cards and untraceable payment methods — these are the most common vectors for scams in Roblox trading.</p>
          </div>
        </div>
      </section>

      <div className="border-[3px] border-accent/60 bg-gradient-to-br from-dark-800 to-dark-900 p-6 text-center" style={{ boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.4), 0 4px 0 rgba(0,0,0,0.5)' }}>
        <h2 className="mb-2 text-2xl font-black uppercase tracking-wider text-white">Buy with full protection</h2>
        <p className="mb-4 text-gray-400">Auto-trade bot + 30-min refund guarantee + free middleman.</p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/gems" className="btn-primary">View gem prices →</Link>
          <DiscordButton href={DISCORD_INVITE}>Join Discord</DiscordButton>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Safe Trading', item: `${SITE_URL}/safe-trading` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Is sniperduels.net safe?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. sniperduels.net is a community marketplace backed by sniperduels.shop, which uses an automated trade bot and escrow system. Your payment is held until gems are delivered in-game, and you get an automatic refund if delivery fails within 30 minutes.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I avoid getting scammed in Sniper Duels?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Use the official sniperduels.shop auto-trade bot for gem purchases and request a free verified middleman for cash trades. Never share your Roblox password, avoid gift-card payments, and reject sellers who refuse escrow or middleman services.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is a middleman trade?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'A middleman trade uses a verified third party who holds the seller\'s item until the buyer\'s payment is confirmed. This eliminates the risk of either side scamming. On sniperduels.net, middleman services are always free and handled by tiered, vetted moderators.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I get banned for trading in Sniper Duels?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. In-game item and gem trading is a built-in Sniper Duels feature. Roblox only prohibits account sharing. The sniperduels.shop trade bot never asks for your password — it trades with you inside a private Roblox server, which is fully permitted.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I report a scammer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Open a ticket in the sniperduels.net Discord server with screenshots of the conversation, trade screen, and any payment receipts. The moderation team reviews reports within 24 hours and blacklists confirmed scammers from all community services.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What payment methods are safe for Sniper Duels trades?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Cash App, Venmo, PayPal, Apple Pay, Google Pay, bank transfers, and major cryptocurrencies are all accepted on sniperduels.shop. Avoid gift cards and untraceable payment methods — these are the most common vectors for scams in Roblox trading.',
                  },
                },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
