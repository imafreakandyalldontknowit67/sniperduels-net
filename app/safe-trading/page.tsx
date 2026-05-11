import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import DiscordButton from '@/components/DiscordButton';
import { DISCORD_INVITE } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Is Buying Sniper Duels Gems Safe? | sniperduels.net',
  description:
    'Yes — buying Sniper Duels gems through sniperduels.shop is fully safe. Here\'s exactly how the auto-trade bot works, what protections you get, and what to watch out for elsewhere.',
  alternates: { canonical: 'https://sniperduels.net/safe-trading' },
};

export default function SafeTradingPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Is buying Sniper Duels gems <span className="text-accent">safe?</span>
        </h1>
        <p className="text-lg text-gray-400">
          Short answer: yes — when you buy through a verified marketplace with auto-trade and refund guarantees.
          Here&apos;s how to spot the safe ones.
        </p>
      </header>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <div className="border-[3px] border-emerald-500/60 bg-emerald-500/5 p-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">Safe</div>
          <h2 className="mb-2 text-xl font-black uppercase tracking-wider text-white">sniperduels.shop</h2>
          <ul className="space-y-1 text-sm text-gray-200">
            <li>✓ Automated trade bot in private Roblox server</li>
            <li>✓ Wallet held until delivery confirmed</li>
            <li>✓ Auto-refund if bot can&apos;t reach you in 30 min</li>
            <li>✓ 13+ verified vendors, all background-checked</li>
            <li>✓ Full transcript of every order</li>
          </ul>
        </div>
        <div className="border-[3px] border-red-500/60 bg-red-500/5 p-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-red-300">Risky</div>
          <h2 className="mb-2 text-xl font-black uppercase tracking-wider text-white">Random sellers</h2>
          <ul className="space-y-1 text-sm text-gray-200">
            <li>✗ Pay first, hope they deliver</li>
            <li>✗ No middleman — common scam vector</li>
            <li>✗ No refund if they ghost you</li>
            <li>✗ Account-sharing = TOS violation, ban risk</li>
            <li>✗ Stolen-account inventory (chargebacks → your loss)</li>
          </ul>
        </div>
      </section>

      <section className="mb-10 prose prose-invert max-w-none text-gray-300">
        <h2 className="heading-pixel">How the safe flow works</h2>
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
        <h2 className="heading-pixel">Red flags to avoid</h2>
        <ul>
          <li><strong className="text-white">Anyone asking for your Roblox password</strong> — never share it. Trades happen in-game, not by sharing accounts.</li>
          <li><strong className="text-white">Sellers wanting payment via gift cards or untraceable methods</strong> — usually scams.</li>
          <li><strong className="text-white">No middleman offered for high-value trades</strong> — open a{' '}
            <Link href="/middleman" className="text-accent hover:underline">free middleman ticket</Link> instead.</li>
          <li><strong className="text-white">Prices way below market</strong> — if it&apos;s less than $2 per 1k gems, it&apos;s likely stolen inventory or a chargeback risk.</li>
          <li><strong className="text-white">Pressure to buy &quot;right now or the deal is gone&quot;</strong> — classic scam tactic.</li>
        </ul>
      </section>

      <div className="mt-10 border-[3px] border-accent/60 bg-gradient-to-br from-dark-800 to-dark-900 p-6 text-center" style={{ boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.4), 0 4px 0 rgba(0,0,0,0.5)' }}>
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
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is buying Sniper Duels gems safe?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes — buying Sniper Duels gems via sniperduels.shop is safe. Orders are brokered by an automated trade bot in a private Roblox server. Your money is held in escrow until delivery is confirmed, and orders are auto-refunded if the bot cannot reach you within 30 minutes.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I get banned for buying Sniper Duels gems?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. The trade bot exchanges gems with your account in-game — no account credentials are ever shared. Roblox prohibits account sharing, not in-game item trading. As long as you never share your password, you cannot be banned for this.',
                },
              },
              {
                '@type': 'Question',
                name: 'What if the seller scams me?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'On sniperduels.shop the trade bot delivers, not the vendor — so a vendor cannot scam you directly. If anything goes wrong (bot offline, no inventory, etc.) you are auto-refunded to your wallet within 30 minutes.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
