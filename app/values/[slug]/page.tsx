import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BuyCTA from '@/components/BuyCTA';
import { allWeaponsIncludingUnpriced, weaponBySlug, rarityClasses, demandClasses, shopSellsThis, allWeapons, defaultPrice, weaponsGeneratedAt, relatedWeapons, isSeoIndexable } from '@/lib/weapons';
import { shopLink, DISCORD_INVITE, SITE_URL, SITE_NAME } from '@/lib/config';
import { formatGems } from '@/lib/values-filter';
import DiscordButton from '@/components/DiscordButton';
import WeaponCard from '@/components/values/WeaponCard';

export function generateStaticParams() {
  // Generate detail pages for ALL weapons even unpriced ones — direct links shouldn't 404.
  return allWeaponsIncludingUnpriced().map(w => ({ slug: w.id }));
}

// Combine the skin name + weapon type, but skip the type when the display
// name already contains it (so "Karambit of Destiny" + "Karambit" stays as
// "Karambit of Destiny", not "Karambit of Destiny Karambit").
function weaponFullName(displayName: string, weaponType: string): string {
  if (!weaponType) return displayName;
  if (displayName.toLowerCase().includes(weaponType.toLowerCase())) return displayName;
  return `${displayName} ${weaponType}`;
}

// "Adurite" → "an Adurite Bayonet"; "Crimson" → "a Crimson Karambit"
function nounPhrase(displayName: string, weaponType: string): string {
  const article = /^[aeiouAEIOU]/.test(displayName) ? 'an' : 'a';
  return `${article} ${weaponFullName(displayName, weaponType)}`;
}

// "april-fools-case" → "April Fools Case"
function formatCrate(crate: string): string {
  return crate
    .split(/[-_\s]+/)
    .map(w => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ''))
    .join(' ');
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function demandContext(demand: string): string {
  const d = demand.toLowerCase();
  if (d === 'high' || d === 'overpaid') return 'highly sought after by traders and collectors';
  if (d === 'medium' || d === 'mid') return 'moderately popular in the trading community';
  if (d === 'low') return 'less commonly traded, which may make finding buyers harder';
  return 'not yet well-established in the trading market';
}

function rarityDescription(rarity: string): string {
  const r = rarity.toLowerCase();
  if (r === 'knife') return 'the exclusive Knife tier, one of the rarest categories';
  if (r === 'godly') return 'the Godly tier, among the most coveted items in the game';
  if (r === 'ancient') return 'the Ancient tier, a highly prestigious rarity class';
  if (r === 'vintage') return 'the Vintage tier, prized for its scarcity';
  if (r === 'secret') return 'the Secret tier, a hidden gem in the rarity hierarchy';
  if (r === 'legendary') return 'the Legendary tier, well above average in rarity';
  if (r === 'collectable') return 'the Collectable tier, valued by dedicated collectors';
  if (r === 'epic') return 'the Epic tier, a solid mid-to-high rarity item';
  if (r === 'rare') return 'the Rare tier, a step above common drops';
  if (r === 'uncommon') return 'the Uncommon tier, slightly harder to find than common items';
  return `the ${rarity} tier`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = weaponBySlug(slug);
  if (!w) return { title: 'Weapon not found' };
  const prices = w.variants.map(v => v.price).filter(p => p > 0);
  const top = prices.length ? Math.max(...prices) : 0;
  const low = prices.length ? Math.min(...prices) : 0;
  const fullName = weaponFullName(w.displayName, w.weaponType);
  const detailTitle = `${w.displayName} Value — Sniper Duels | ${SITE_NAME}`;
  const detailDesc = `${fullName} is worth ${top > 0 ? `${top.toLocaleString()} gems` : 'TBD'} in Sniper Duels. See current ${w.displayName} value, price history, demand level, and trade tips.`;
  const detailUrl = `${SITE_URL}/values/${w.id}`;
  const indexable = isSeoIndexable(w);
  return {
    title: detailTitle,
    description: detailDesc,
    alternates: { canonical: detailUrl },
    // Pages too thin to deserve a sitemap slot also get noindex on the page
    // itself, so direct links / referrals don't pull them into the index.
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: `${fullName} — Sniper Duels Value`,
      description: detailDesc,
      url: detailUrl,
      images: w.imagePath ? [{ url: w.imagePath }] : [],
    },
    twitter: {
      title: `${fullName} — Sniper Duels Value`,
      description: detailDesc,
      images: w.imagePath ? [w.imagePath] : undefined,
    },
  };
}

export default async function WeaponPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = weaponBySlug(slug);
  if (!w) notFound();

  const prices = w.variants.map(v => v.price).filter(p => p > 0);
  const top = prices.length ? Math.max(...prices) : 0;
  const low = prices.length ? Math.min(...prices) : 0;
  const ourShopHasIt = shopSellsThis(w);
  const fullName = weaponFullName(w.displayName, w.weaponType);
  const related = relatedWeapons(w, 6);
  const lastUpdated = weaponsGeneratedAt();

  // FAQ items
  const faqItems = [
    {
      '@type': 'Question',
      name: `What is ${fullName} worth in Sniper Duels?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: top > 0
          ? `The ${fullName} is currently valued between ${low.toLocaleString()} and ${top.toLocaleString()} gems in Sniper Duels, depending on condition. Mint Condition typically commands the highest price.`
          : `The ${fullName} does not have a confirmed market price yet. Check back soon as values are updated regularly.`,
      },
    },
    {
      '@type': 'Question',
      name: `How rare is ${fullName}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `The ${fullName} belongs to ${rarityDescription(w.rarity)} in Sniper Duels. Its current demand level is ${w.demand || 'Unknown'}, meaning it is ${demandContext(w.demand)}.`,
      },
    },
    {
      '@type': 'Question',
      name: `How do I get ${fullName}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: w.crate
          ? `The ${fullName} can be obtained from the ${formatCrate(w.crate)} in Sniper Duels. You can also acquire it through player-to-player trading${w.tradeable !== false ? ' — in-game gem trades are direct and safe' : ''}.`
          : `The ${fullName} can be acquired through player-to-player trading in Sniper Duels${w.tradeable !== false ? '. In-game gem trades are atomic and don\'t require a middleman' : ''}.`,
      },
    },
  ];

  return (
    <>
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/values" className="hover:text-accent">Values</Link> /{' '}
        <span className="text-gray-300">{w.displayName}</span>
      </nav>

      <header className="mb-8 grid gap-6 md:grid-cols-[320px_1fr] md:items-start">
        {w.imagePath ? (
          <div className="flex aspect-square items-center justify-center border-[3px] border-dark-500 bg-dark-800 p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={w.imagePath}
              alt={w.displayName}
              className="max-h-full max-w-full object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        ) : (
          <div className="flex aspect-square items-center justify-center border-[3px] border-dark-500 bg-dark-800 text-6xl text-dark-500">?</div>
        )}
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className={`inline-block border-[2px] px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${rarityClasses(w.rarity)}`}>
              {w.rarity}
            </span>
            <span className="inline-block border-[2px] border-dark-400 bg-dark-800 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-gray-300">
              {w.weaponType}
            </span>
            {w.crate && (
              <span className="inline-block border-[2px] border-dark-400 bg-dark-800 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-gray-300">
                {w.crate}
              </span>
            )}
            {w.demand && w.demand !== 'Unknown' && (
              <span className={`inline-block border-[2px] px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${demandClasses(w.demand)}`}>
                Demand: {w.demand}
              </span>
            )}
          </div>
          <h1 className="mb-2 text-2xl font-bold uppercase tracking-wider sm:text-3xl md:text-4xl">
            {fullName} <span className="text-accent">Value</span>
          </h1>
          {top > 0 ? (
            <p className="text-lg text-gray-400">
              Top value: <span className="font-bold text-accent">{top.toLocaleString()} gems</span>
            </p>
          ) : (
            <p className="text-sm text-gray-500">No market value tracked yet for this weapon.</p>
          )}
        </div>
      </header>

      {/* Conditions table */}
      {w.variants.length > 0 && (
        <section className="mb-8 overflow-hidden border-[3px] border-dark-500 bg-dark-700">
          <div className="border-b-[3px] border-dark-600 bg-dark-800/60 px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Values by condition
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-600 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-2 text-left">Condition</th>
                <th className="px-5 py-2 text-right">Value (gems)</th>
              </tr>
            </thead>
            <tbody>
              {w.variants.map((v, i) => (
                <tr key={i} className="border-b border-dark-700 last:border-0">
                  <td className="px-5 py-3 font-medium">{v.condition}</td>
                  <td className="px-5 py-3 text-right text-lg font-bold text-accent">
                    {v.price > 0 ? v.price.toLocaleString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Unique content block — programmatic description */}
      <section className="mb-10 prose prose-invert max-w-none text-white/70">
        <h2 className="heading-pixel text-white">About the {fullName}</h2>
        <p>
          {w.displayName} is {nounPhrase(w.displayName, w.weaponType)} classified under {rarityDescription(w.rarity)} in Sniper Duels.
          {top > 0 && low > 0 && low !== top && <> Currently valued between <strong className="text-accent">{formatGems(low)}</strong> and <strong className="text-accent">{formatGems(top)} gems</strong>, the price varies based on condition — Mint Condition commands a premium over Well Worn.</>}
          {top > 0 && low === top && <> Currently valued at <strong className="text-accent">{formatGems(top)} gems</strong> across all tracked conditions.</>}
          {top === 0 && <> This item does not have a confirmed market value yet, but values are refreshed regularly.</>}
        </p>
        <p>
          {w.demand && w.demand !== 'Unknown'
            ? <>With <strong className="text-white">{w.demand} demand</strong>, the {fullName} is {demandContext(w.demand)}. </>
            : <>Demand data for this item is still being gathered. </>
          }
          {w.crate
            ? <>It originally drops from the <strong className="text-white">{formatCrate(w.crate)}</strong>, so you may find it by opening that case or through direct trades with other players.</>
            : <>It can be acquired through player-to-player trading in the Sniper Duels community.</>
          }
          {w.tradeable === false
            ? <> Note that this item is currently <strong className="text-white">not tradeable</strong>.</>
            : <> This item is <strong className="text-white">tradeable</strong> — in-game gem swaps are atomic and safe, while cash deals should use a <Link href="/middleman" className="text-accent hover:underline">middleman</Link>.</>
          }
          {w.marketStatus && w.marketStatus !== 'Active' && <> Market status: <strong className="text-white">{w.marketStatus}</strong>.</>}
        </p>
      </section>

      {/* CTA */}
      <section className="mb-10 rounded-xl border-2 border-accent/30 bg-gradient-to-br from-dark-800 to-dark-900 p-6">
        {ourShopHasIt ? (
          <>
            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-accent">In stock at sniperduels.shop</div>
            <h2 className="mb-3 text-2xl font-black text-white">Buy {nounPhrase(w.displayName, w.weaponType)} now</h2>
            <p className="mb-4 text-gray-400">
              We carry this skin in our auto-shop. Fixed price, instant delivery, full refund if anything goes wrong.
            </p>
            <a href={shopLink('/shop', `weapon-${w.id}`)} target="_blank" rel="noopener" className="btn-primary">
              Buy on sniperduels.shop
            </a>
          </>
        ) : (
          <>
            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-pixel-blue-light">Find in our community</div>
            <h2 className="mb-3 text-2xl font-black text-white">Looking for {nounPhrase(w.displayName, w.weaponType)}?</h2>
            <p className="mb-4 text-gray-400">
              Post in our Discord trading channels — verified vendors and traders are active 24/7.
              For in-game gem trades you don&apos;t need a middleman (Sniper Duels lets you swap atomically).
              Buying for <span className="text-white">cash (USD/crypto)</span>?{' '}
              <Link href="/middleman" className="text-accent hover:underline">Use a free middleman</Link> so the
              seller can&apos;t scam you.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <DiscordButton href={DISCORD_INVITE}>Join Discord</DiscordButton>
              <a href={shopLink('/gems', `weapon-${w.id}-gems`)} target="_blank" rel="noopener" className="btn-secondary">
                Buy gems for trades
              </a>
            </div>
          </>
        )}
      </section>

      {/* Trading tips */}
      <section className="mb-10 prose prose-invert max-w-none text-gray-300">
        <h2 className="heading-pixel">Trading the {fullName}</h2>
        <p>
          The {fullName} is a <strong className="text-white">{w.rarity}-rarity {w.weaponType}</strong> in Sniper Duels.
          {w.crate && <> It originally drops from the <strong className="text-white">{formatCrate(w.crate)}</strong>.</>}
          {top > 0 && <> Current top value is <span className="font-bold text-accent">{top.toLocaleString()} gems</span>.</>}
        </p>
        <p>
          <strong className="text-white">In-game gem trades are direct</strong> — Sniper Duels lets two players atomically
          swap items + gems in one trade window, so no middleman is needed for gem-priced trades. If you&apos;re buying or
          selling for <strong className="text-white">USD or crypto</strong>, that&apos;s when a verified{' '}
          <Link href="/middleman" className="text-accent hover:underline">middleman</Link> matters — they hold the item
          until cash payment lands. Check the condition (Mint, Standard, Worn) carefully — Mint Condition typically commands
          20-40% more than Standard.
        </p>
      </section>

      {/* Related items */}
      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="heading-pixel mb-4 text-accent">Similar Weapons</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {related.map(x => <WeaponCard key={x.id} weapon={x} />)}
          </div>
        </section>
      )}

      {/* Last updated */}
      <p className="mt-4 text-xs text-white/40">
        Last updated: {formatDate(lastUpdated)}
      </p>

      <p className="mt-4 text-sm text-gray-500">
        Browse other items: <Link href="/values" className="text-accent hover:underline">All Sniper Duels values →</Link>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Values', item: `${SITE_URL}/values` },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: w.rarity?.toLowerCase() === 'knife' ? 'Knives' : 'Snipers',
                  item: w.rarity?.toLowerCase() === 'knife' ? `${SITE_URL}/knives` : `${SITE_URL}/snipers`,
                },
                { '@type': 'ListItem', position: 4, name: w.displayName, item: `${SITE_URL}/values/${w.id}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: `${fullName} (Sniper Duels)`,
              description: `${w.rarity} ${w.weaponType} skin in Sniper Duels${top > 0 ? `. Top value: ${top.toLocaleString()} gems.` : '.'}`,
              sku: w.id,
              image: w.imagePath || undefined,
              brand: { '@type': 'Brand', name: 'Sniper Duels' },
              category: w.weaponType,
              url: `${SITE_URL}/values/${w.id}`,
              ...(top > 0 && low > 0 ? {
                offers: {
                  '@type': 'AggregateOffer',
                  lowPrice: low.toString(),
                  highPrice: top.toString(),
                  priceCurrency: 'XXX',
                  offerCount: w.variants.filter(v => v.price > 0).length.toString(),
                },
              } : {}),
              ...(w.crate ? { isRelatedTo: { '@type': 'Thing', name: formatCrate(w.crate) } } : {}),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems,
            },
          ]),
        }}
      />
    </>
  );
}
