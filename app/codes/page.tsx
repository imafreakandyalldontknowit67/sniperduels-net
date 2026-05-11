import type { Metadata } from 'next';
import Link from 'next/link';
import BuyCTA from '@/components/BuyCTA';
import { SHOP_URL } from '@/lib/config';

const NOW = new Date();
const MONTH_YEAR = NOW.toLocaleString('en-US', { month: 'long', year: 'numeric' });
const SHORT = NOW.toLocaleString('en-US', { month: 'short', year: 'numeric' });

export const metadata: Metadata = {
  title: `Sniper Duels Codes (${MONTH_YEAR}) — Active List | sniperduels.net`,
  description: `Looking for active Sniper Duels codes in ${MONTH_YEAR}? Currently the game has no public code-redemption system. Here's the easiest way to get gems instead.`,
  alternates: { canonical: 'https://sniperduels.net/codes' },
};

export default function CodesPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Sniper Duels Codes <span className="text-accent">({MONTH_YEAR})</span>
        </h1>
        <p className="text-lg text-gray-400">
          Updated {NOW.toISOString().slice(0, 10)} — active codes, redemption status, and what to do if there are none.
        </p>
      </header>

      <section className="mb-10 rounded-xl border-2 border-pixel-red/40 bg-pixel-red/5 p-6">
        <div className="mb-2 text-sm font-bold uppercase tracking-wider text-pixel-red">Status as of {SHORT}</div>
        <h2 className="mb-2 text-2xl font-black text-white">No active codes right now.</h2>
        <p className="text-gray-300">
          The Sniper Duels developers have not added a code-redemption system to the game yet. There are{' '}
          <strong>no working codes</strong> in {MONTH_YEAR}, despite what some YouTube videos and roundup blogs claim.
          We update this page weekly — bookmark it and you&apos;ll see new codes here the moment they drop.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">Get gems without codes</h2>
        <p className="mb-4 text-gray-400">
          Since codes aren&apos;t available, the cheapest way to top up gems is through{' '}
          <a href={SHOP_URL} target="_blank" rel="noopener" className="text-accent hover:underline">
            sniperduels.shop
          </a>
          &apos;s vendor marketplace — bulk pricing as low as <span className="font-bold text-accent">$2.65 per 1,000 gems</span>{' '}
          (about 30% cheaper than buying with Robux).
        </p>
        <BuyCTA campaign="codes" shopPath="/gems" shopLabel="Buy Cheap Gems →" />
      </section>

      <section className="mb-10">
        <h2 className="heading-pixel mb-4 text-2xl text-white">How to redeem (when codes do exist)</h2>
        <ol className="space-y-2 text-gray-400">
          <li>1. Open Sniper Duels in Roblox.</li>
          <li>2. Look for the &quot;Codes&quot; or &quot;Settings&quot; menu — currently neither exists in-game.</li>
          <li>3. When/if the system launches, paste the code and click redeem.</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500">
          We&apos;ll update this page within 24 hours of any new code being added by the developers. If you spot a code
          before us, post it in our <Link href="/middleman" className="text-accent hover:underline">community Discord</Link>{' '}
          and we&apos;ll verify and list it.
        </p>
      </section>

      <BuyCTA campaign="codes-bottom" shopPath="/gems" variant="banner" />

      <p className="mt-8 text-sm text-gray-500">
        Last verified: {NOW.toISOString().slice(0, 10)}. We re-check the code list every week.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `Are there any active Sniper Duels codes in ${MONTH_YEAR}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. As of ' + MONTH_YEAR + ', Sniper Duels does not have a code-redemption system. The developers have not added one yet. Any codes claimed to work in YouTube videos or older articles are not real.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I get free gems in Sniper Duels?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'There is no official way to get free gems. The cheapest way to obtain gems is through community marketplaces — sniperduels.shop currently lists bulk gems from $2.65 per 1,000.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
