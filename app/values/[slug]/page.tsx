import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BuyCTA from '@/components/BuyCTA';
import { allWeapons, weaponBySlug, rarityClasses, shopSellsThis } from '@/lib/weapons';
import { shopLink, DISCORD_INVITE } from '@/lib/config';

export function generateStaticParams() {
  return allWeapons().map(w => ({ slug: w.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const w = weaponBySlug(params.slug);
  if (!w) return { title: 'Weapon not found' };
  const top = Math.max(0, ...w.variants.map(v => v.price));
  return {
    title: `${w.displayName} Value — ${w.rarity.toUpperCase()} ${w.weaponType} | Sniper Duels`,
    description: `Current value of the ${w.displayName} (${w.rarity} ${w.weaponType}) in Sniper Duels: from ${top.toLocaleString()} gems. Live prices across all conditions.`,
    alternates: { canonical: `https://sniperduels.net/values/${w.id}` },
    openGraph: {
      title: `${w.displayName} — Sniper Duels Value`,
      images: w.imagePath ? [{ url: w.imagePath }] : [],
    },
  };
}

export default function WeaponPage({ params }: { params: { slug: string } }) {
  const w = weaponBySlug(params.slug);
  if (!w) notFound();

  const top = Math.max(0, ...w.variants.map(v => v.price));
  const ourShopHasIt = shopSellsThis(w);

  return (
    <>
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/values" className="hover:text-accent">Values</Link> /{' '}
        <span className="text-gray-300">{w.displayName}</span>
      </nav>

      <header className="mb-8 grid gap-8 md:grid-cols-[200px_1fr] md:items-start">
        {w.imagePath && (
          <div className="flex h-48 items-center justify-center rounded-lg border border-dark-600 bg-dark-800 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.imagePath} alt={w.displayName} className="max-h-full max-w-full object-contain" />
          </div>
        )}
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className={`inline-block rounded border px-2 py-0.5 text-xs font-bold uppercase ${rarityClasses(w.rarity)}`}>
              {w.rarity}
            </span>
            <span className="inline-block rounded border border-dark-500 bg-dark-800 px-2 py-0.5 text-xs font-semibold text-gray-300">
              {w.weaponType}
            </span>
            {w.crate && (
              <span className="inline-block rounded border border-dark-500 bg-dark-800 px-2 py-0.5 text-xs font-semibold text-gray-300">
                {w.crate}
              </span>
            )}
            {w.demand && w.demand !== 'Unknown' && (
              <span className="inline-block rounded border border-pixel-blue/40 bg-pixel-blue/10 px-2 py-0.5 text-xs font-bold text-pixel-blue-light">
                Demand: {w.demand}
              </span>
            )}
          </div>
          <h1 className="mb-2 text-4xl font-black md:text-5xl">{w.displayName}</h1>
          {top > 0 && (
            <p className="text-lg text-gray-400">
              Top value: <span className="font-bold text-accent">{top.toLocaleString()} gems</span>
            </p>
          )}
        </div>
      </header>

      {/* Conditions table */}
      {w.variants.length > 0 && (
        <section className="mb-8 overflow-hidden rounded-lg border border-dark-500 bg-dark-800">
          <div className="border-b border-dark-600 bg-dark-700/50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
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

      {/* CTA */}
      <section className="mb-10 rounded-xl border-2 border-accent/30 bg-gradient-to-br from-dark-800 to-dark-900 p-6">
        {ourShopHasIt ? (
          <>
            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-accent">In stock at sniperduels.shop</div>
            <h2 className="mb-3 text-2xl font-black text-white">Buy {w.displayName} now</h2>
            <p className="mb-4 text-gray-400">
              We carry this skin in our auto-shop. Fixed price, instant delivery, full refund if anything goes wrong.
            </p>
            <a href={shopLink('/shop', `weapon-${w.id}`)} target="_blank" rel="noopener" className="btn-primary">
              Buy on sniperduels.shop →
            </a>
          </>
        ) : (
          <>
            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-pixel-blue-light">Find in our community</div>
            <h2 className="mb-3 text-2xl font-black text-white">Looking for {w.displayName}?</h2>
            <p className="mb-4 text-gray-400">
              Post in our Discord trading channels — verified vendors and traders are active 24/7.
              Use our <Link href="/middleman" className="text-accent hover:underline">free middleman service</Link>{' '}
              for any high-value trade.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="btn-discord">
                Join Discord →
              </a>
              <a href={shopLink('/gems', `weapon-${w.id}-gems`)} target="_blank" rel="noopener" className="btn-secondary">
                Buy gems for trades
              </a>
            </div>
          </>
        )}
      </section>

      {/* Trading tips */}
      <section className="mb-10 prose prose-invert max-w-none text-gray-300">
        <h2 className="heading-pixel text-xl text-white">Trading the {w.displayName}</h2>
        <p>
          {w.displayName} is a <strong className="text-white">{w.rarity}-rarity {w.weaponType}</strong> in Sniper Duels.
          {w.crate && <> It originally drops from the <strong className="text-white">{w.crate}</strong>.</>}
          {top > 0 && <> Current top value is <span className="font-bold text-accent">{top.toLocaleString()} gems</span>.</>}
        </p>
        <p>
          When trading any {w.rarity} item, always use a <Link href="/middleman" className="text-accent hover:underline">verified middleman</Link>{' '}
          to avoid scams. Check the condition (Mint, Standard, Worn) carefully — Mint Condition typically commands 20-40% more than Standard.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-500">
        Browse other items: <Link href="/values" className="text-accent hover:underline">All Sniper Duels values →</Link>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `${w.displayName} (Sniper Duels)`,
            description: `${w.rarity} ${w.weaponType} weapon in Sniper Duels. Top value: ${top.toLocaleString()} gems.`,
            image: w.imagePath || undefined,
            brand: { '@type': 'Brand', name: 'Sniper Duels' },
            category: w.weaponType,
            offers: top > 0 ? {
              '@type': 'Offer',
              price: top,
              priceCurrency: 'GEM',
              availability: 'https://schema.org/InStock',
              url: `https://sniperduels.net/values/${w.id}`,
            } : undefined,
          }),
        }}
      />
    </>
  );
}
