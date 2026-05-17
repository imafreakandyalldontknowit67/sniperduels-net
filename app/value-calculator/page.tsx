import type { Metadata } from 'next';
import { Suspense } from 'react';
import BuyCTA from '@/components/BuyCTA';
import SectionBanner from '@/components/SectionBanner';
import TradeCalculator from '@/components/calculator/TradeCalculator';
import { allWeapons, slimForBrowser } from '@/lib/weapons';
import { SITE_URL } from '@/lib/config';

const VC_TITLE = 'Sniper Duels Value Calculator — Trade Calculator for Gem Values';
const VC_DESC =
  'Free Sniper Duels value calculator. Pick items + quantities, get total gem value instantly. Compare trades. Live values from SDValues, updated every 6 hours.';

export const metadata: Metadata = {
  title: VC_TITLE,
  description: VC_DESC,
  alternates: { canonical: `${SITE_URL}/value-calculator` },
  openGraph: { title: VC_TITLE, description: VC_DESC, url: `${SITE_URL}/value-calculator` },
  twitter: { title: VC_TITLE, description: VC_DESC },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How does the Sniper Duels value calculator work?',
    a: 'Pick items from each side of the trade, set quantities, and the calculator multiplies each item by its current default-condition gem value, sums both sides, and shows you the difference. Values are pulled live from SDValues and refresh on this site every 6 hours.',
  },
  {
    q: 'Where do the values come from?',
    a: 'All values are sourced from SDValues, the Sniper Duels community value list, and refreshed every 6 hours. Each item uses its default condition price — open the item on /values to see all condition variants.',
  },
  {
    q: 'Can I share my trade calculation with a friend?',
    a: 'Yes. The full calculator state is saved in the URL — copy the address bar and paste it anywhere. Whoever opens it sees the exact same trade laid out, both sides, with the same totals.',
  },
  {
    q: 'What if I owe gems on a trade?',
    a: 'If your side is worth less than theirs, the calculator shows the gem deficit and links straight to sniperduels.shop with a pre-filled quantity so you can top up the difference. Cheapest gem rate is $2.65/k at the bulk tier.',
  },
  {
    q: 'Does the calculator support all weapons and conditions?',
    a: 'It covers every Sniper Duels weapon currently tracked (218+) using the default condition value. For condition-specific pricing (Well Worn vs Mint), browse the item page on /values — each variant is listed with its own gem price.',
  },
];

export default function ValueCalculatorPage() {
  const weapons = allWeapons();
  const slim = slimForBrowser(weapons);

  return (
    <>
      <header className="mb-6">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl lg:text-[52px]">
          Sniper Duels <span className="text-accent">Value Calculator</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Free trade calculator · {weapons.length} weapons · Updated every 6h from SDValues
        </p>
      </header>

      <section className="mb-8 max-w-3xl text-sm leading-relaxed text-gray-300">
        <p>
          The <strong className="text-white">Sniper Duels value calculator</strong> is a free trade
          calculator that helps you check the gem value of any in-game trade before you commit.
          Drop items into the &quot;their offer&quot; and &quot;your offer&quot; columns, set
          quantities, and this gem value calculator instantly totals each side and shows the
          difference. Use it as a quick trade calculator before middlemanning, to size up an offer
          someone DMs you, or to plan a multi-item bundle. Every trade value here is sourced from
          <strong className="text-white"> SDValues</strong> and refreshed every 6 hours, so you get
          the same numbers the community trades by. Copy the URL after building a trade to share
          it with anyone — the calculator state is fully bookmarkable.
        </p>
      </section>

      <SectionBanner color="gold" align="left" eyebrow="Add items to each side · Subtotals + difference update live · URL auto-syncs for sharing">
        Build a Trade
      </SectionBanner>

      <Suspense fallback={<div className="border-[3px] border-dark-500 bg-dark-700 p-10 text-center text-sm text-gray-500">Loading calculator…</div>}>
        <TradeCalculator weapons={slim} />
      </Suspense>

      {/* FAQ */}
      <section className="mt-12">
        <SectionBanner color="blue" align="left" eyebrow="Common questions about the calculator">
          How To Use The Calculator
        </SectionBanner>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="border-[3px] border-dark-500 bg-dark-700 p-5">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-white sm:text-base">
                {f.q}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <BuyCTA campaign="value-calculator-bottom" shopPath="/gems" variant="banner" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Sniper Duels Value Calculator',
              description: VC_DESC,
              url: `${SITE_URL}/value-calculator`,
              applicationCategory: 'WebApplication',
              applicationSubCategory: 'Trade Calculator',
              operatingSystem: 'Web',
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              isAccessibleForFree: true,
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              creator: { '@id': `${SITE_URL}#org` },
              about: { '@id': `${SITE_URL}#game` },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Value Calculator', item: `${SITE_URL}/value-calculator` },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
