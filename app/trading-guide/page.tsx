import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, DISCORD_INVITE } from '@/lib/config';
import BuyCTA from '@/components/BuyCTA';

const TITLE = 'Sniper Duels Trading Guide 2026 — How to Trade Safely';
const DESC =
  'Complete guide to trading in Sniper Duels. Learn how to check values, use middlemen, avoid scams, and get the best deals on weapons and knives.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/trading-guide` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/trading-guide` },
  twitter: { title: TITLE, description: DESC },
};

const SECTIONS = [
  { id: 'introduction', title: 'Introduction to Trading' },
  { id: 'checking-values', title: 'How to Check Item Values' },
  { id: 'trading-process', title: 'Step-by-Step Trading Process' },
  { id: 'using-middleman', title: 'Using a Middleman' },
  { id: 'common-scams', title: 'Common Scams & How to Avoid Them' },
  { id: 'tips', title: 'Tips for Getting Good Deals' },
  { id: 'finding-partners', title: 'Where to Find Trade Partners' },
];

const FAQ = [
  {
    q: 'Is trading safe in Sniper Duels?',
    a: 'Trading can be safe if you use trusted middlemen and verify item values before accepting any trade. Always use the sniperduels.net value list to confirm prices and never rush into a deal.',
  },
  {
    q: 'How do I know if an item is worth what someone claims?',
    a: 'Check the item on sniperduels.net/values — our database tracks live community prices for every weapon. Compare the listed value against what the other player is offering.',
  },
  {
    q: 'What is a middleman and why should I use one?',
    a: 'A middleman is a trusted third party who holds both players\' items during a trade to prevent scams. Our community Discord provides free verified middlemen for any trade.',
  },
  {
    q: 'Can I get scammed while trading?',
    a: 'Yes, scams do happen. Common scams include item switching (swapping a rare for a common at the last second), fake overpay offers, and impersonating middlemen. Always verify identities and values.',
  },
  {
    q: 'What are the most traded items in Sniper Duels?',
    a: 'Godly and ancient tier snipers are the most actively traded, followed by rare knives and collectibles. High-demand items are easier to trade and tend to hold their value better.',
  },
];

export default function TradingGuidePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Trading Guide', item: `${SITE_URL}/trading-guide` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Sniper Duels Trading Guide 2026',
      datePublished: '2026-01-15T00:00:00Z',
      dateModified: '2026-05-17T00:00:00Z',
      author: { '@type': 'Organization', name: 'sniperduels.net', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'sniperduels.net',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/gem_icon.png` },
      },
      description: DESC,
      image: [`${SITE_URL}/og-banner.webp`],
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/trading-guide` },
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
          Sniper Duels <span className="text-accent">Trading Guide</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Complete guide to safe trading · 2026
        </p>
      </header>

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

      {/* Section 1: Introduction */}
      <section id="introduction" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Introduction to Trading</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          Trading is one of the core activities in Sniper Duels. Players exchange weapons, knives, and other
          collectibles to build their dream inventories, complete sets, or make profit. Understanding how trading
          works is essential whether you&apos;re a casual collector or a serious trader.
        </p>
        <p className="mb-3 text-white/70 leading-relaxed">
          In Sniper Duels, you can trade snipers, knives, and collectible items with other players. Each item has
          a gem value determined by its rarity, demand, and condition. Trading allows you to convert items you
          don&apos;t need into ones you want, upgrade your collection, or accumulate value over time.
        </p>
        <p className="text-white/70 leading-relaxed">
          The trading economy is player-driven, meaning prices fluctuate based on supply and demand. New crate
          releases, game updates, and community events can all shift values significantly. Staying informed about
          current prices is the single most important thing you can do as a trader.
        </p>
      </section>

      {/* Section 2: Checking Values */}
      <section id="checking-values" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">How to Check Item Values</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          Before any trade, you should verify the current value of items involved. Never rely on what the other
          player tells you an item is worth — always check independently. Here&apos;s how:
        </p>
        <ol className="mb-4 space-y-3 text-white/70">
          <li className="flex gap-2">
            <span className="font-bold text-accent">1.</span>
            Visit <Link href="/values" className="text-cyan-400 hover:text-cyan-300">sniperduels.net/values</Link> and
            search for the item by name.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-accent">2.</span>
            Check the gem price for the specific condition (Factory New, Minimal Wear, etc.) being offered.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-accent">3.</span>
            Note the demand level — high-demand items are easier to re-sell and may command a premium.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-accent">4.</span>
            Compare both sides of the trade to ensure the total value is fair or in your favor.
          </li>
        </ol>
        <p className="text-white/70 leading-relaxed">
          Our value database is updated regularly from SDValues community data, reflecting actual trade prices
          rather than arbitrary numbers. Items with &quot;High&quot; or &quot;Overpaid&quot; demand are typically
          worth slightly more than their listed value in practice.
        </p>
      </section>

      {/* Section 3: Trading Process */}
      <section id="trading-process" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Step-by-Step Trading Process</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          Follow these steps for a smooth, safe trade in Sniper Duels:
        </p>
        <ol className="space-y-4 text-white/70">
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 1: Find a trade partner.</span> Use Discord trade channels,
            in-game chat, or community forums. Look for reputable traders with trade history.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 2: Agree on terms.</span> Discuss what each side is offering.
            Both players should check values independently on sniperduels.net.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 3: Verify identities.</span> Make sure you&apos;re trading
            with who you think you are. Check their Roblox profile and Discord account match.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 4: Use a middleman for high-value trades.</span> For trades
            worth over 50k gems, always use a verified middleman from our Discord.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 5: Execute the trade.</span> Join the same server, initiate
            the trade, carefully verify items in the trade window, then confirm.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 6: Double-check your inventory.</span> After the trade
            completes, verify you received the correct items in the correct condition.
          </li>
        </ol>
      </section>

      {/* Section 4: Using a Middleman */}
      <section id="using-middleman" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Using a Middleman</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          A middleman (MM) is a trusted, verified person who temporarily holds both players&apos; items during a
          trade to eliminate the risk of one party scamming the other. This is especially important for
          cross-server trades, high-value deals, or when trading with someone you don&apos;t know.
        </p>
        <p className="mb-3 text-white/70 leading-relaxed">
          Our <Link href="/middleman" className="text-cyan-400 hover:text-cyan-300">middleman service</Link> provides
          free, verified middlemen available through Discord. Here&apos;s how it works:
        </p>
        <ol className="mb-4 space-y-2 text-white/70 pl-4">
          <li>1. Open a middleman ticket in our Discord server.</li>
          <li>2. A verified MM will be assigned to your trade.</li>
          <li>3. Both players trade their items to the MM.</li>
          <li>4. The MM verifies both sets of items are correct.</li>
          <li>5. The MM trades each player their received items.</li>
        </ol>
        <p className="text-white/70 leading-relaxed">
          Never accept a middleman suggested by the other trader — always use one from a verified, official source.
          Scammers often use fake middlemen (friends or alt accounts) to steal items.
        </p>
      </section>

      {/* Section 5: Common Scams */}
      <section id="common-scams" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Common Scams & How to Avoid Them</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          Knowledge is your best defense. Here are the most common scams in Sniper Duels trading and how to
          protect yourself. For a more detailed breakdown, visit our{' '}
          <Link href="/safe-trading" className="text-cyan-400 hover:text-cyan-300">safe trading guide</Link>.
        </p>
        <div className="space-y-4">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <h3 className="mb-1 font-bold text-red-300">Item Switching</h3>
            <p className="text-sm text-white/70">
              The scammer shows a valuable item, then swaps it for a cheaper look-alike at the last second.
              <strong className="text-white"> Prevention:</strong> Always carefully check the exact item name and
              condition in the trade window before confirming.
            </p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <h3 className="mb-1 font-bold text-red-300">Fake Overpay</h3>
            <p className="text-sm text-white/70">
              Someone offers way above market value for your item, but asks you to &quot;add a small item&quot; first.
              They then cancel after receiving your add.
              <strong className="text-white"> Prevention:</strong> If an offer seems too good to be true, it is.
            </p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <h3 className="mb-1 font-bold text-red-300">Fake Middleman</h3>
            <p className="text-sm text-white/70">
              The scammer suggests using a &quot;middleman&quot; who is actually their friend or alt account.
              <strong className="text-white"> Prevention:</strong> Only use middlemen from official, verified sources
              like our Discord.
            </p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <h3 className="mb-1 font-bold text-red-300">Value Manipulation</h3>
            <p className="text-sm text-white/70">
              Someone claims an item is worth much more than it actually is, citing fake or outdated value lists.
              <strong className="text-white"> Prevention:</strong> Always check sniperduels.net/values for current prices.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Tips */}
      <section id="tips" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Tips for Getting Good Deals</h2>
        <ul className="space-y-3 text-white/70">
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Buy low after updates:</strong> When new crates drop, older items often temporarily lose value as players rush to get new ones. This is a great time to buy.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Trade in bulk:</strong> Offering multiple lower-value items for one high-value item often means you can get a slight discount, as the seller values liquidity.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Watch demand levels:</strong> Items with &quot;High&quot; demand are easier to flip. Buy undervalued high-demand items and sell at full price.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Be patient:</strong> Don&apos;t rush trades. The right buyer will pay fair value — desperate selling leads to losses.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Diversify:</strong> Don&apos;t put all your gems into one item. Spread across different rarities and categories to reduce risk.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Track price trends:</strong> Items that are consistently rising in value are worth holding. Those declining should be sold before they drop further.</span>
          </li>
        </ul>
      </section>

      {/* Section 7: Finding Partners */}
      <section id="finding-partners" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Where to Find Trade Partners</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          Finding reliable trade partners is crucial for a good trading experience. Here are the best places:
        </p>
        <div className="space-y-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="mb-1 font-bold text-white">Sniper Duels Discord</h3>
            <p className="text-sm text-white/70">
              Our{' '}
              <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300">
                community Discord
              </a>{' '}
              has dedicated trading channels with thousands of active traders. This is the safest and most active
              place to find trade partners.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="mb-1 font-bold text-white">In-Game Trading</h3>
            <p className="text-sm text-white/70">
              You can find traders directly in Sniper Duels servers. Look for players advertising in chat. Be extra
              cautious with in-game trades as there&apos;s less accountability.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="mb-1 font-bold text-white">sniperduels.shop Marketplace</h3>
            <p className="text-sm text-white/70">
              For a guaranteed safe transaction, use the{' '}
              <a href="https://sniperduels.shop" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300">
                official marketplace
              </a>{' '}
              where trades are automated with built-in escrow protection.
            </p>
          </div>
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

      <BuyCTA campaign="trading-guide" shopPath="/gems" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
