import Link from 'next/link';
import type { Weapon } from '@/lib/weapons';
import { rarityClasses, defaultPrice } from '@/lib/weapons';
import { formatGems, demandStars } from '@/lib/values-filter';

type Props = {
  weapon: Weapon;
  /** Above-the-fold cards should set true for eager image loading */
  priority?: boolean;
};

const STAR_TOTAL = 5;

function DemandStars({ demand }: { demand: string }) {
  const filled = demandStars(demand);
  return (
    <div className="flex items-center gap-0.5" aria-label={`Demand: ${demand}`}>
      {Array.from({ length: STAR_TOTAL }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-3 w-3 ${i < filled ? 'text-accent' : 'text-dark-500'}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function WeaponCard({ weapon, priority = false }: Props) {
  const price = defaultPrice(weapon);
  return (
    <Link
      href={`/values/${weapon.id}`}
      className="group flex flex-col border-[3px] border-dark-500 bg-dark-700 transition-colors hover:border-accent/60 hover:no-underline"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900">
        {weapon.imagePath ? (
          // Raw <img> against images.sniperduels.com directly — Cloudflare CDN
          // serves cached WebP in ~100ms globally. Skips Next/Image's transcode
          // bottleneck (had been serializing 1100+ transcodes on cold container,
          // causing slow first-paint per image). The 1024×1024 webp is ~185KB,
          // browser downscales for the card. Lazy + async = no blocking.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={weapon.imagePath}
            alt={weapon.displayName}
            // Explicit dimensions match the source 1024×1024 — CSS still
            // downscales to the card width, but the browser pre-allocates
            // layout space so cards don't reflow on image load (kills CLS).
            width={1024}
            height={1024}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'low'}
            className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-dark-500">?</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-2.5 sm:p-3">
        <div className="flex min-w-0 items-start justify-between gap-1">
          <span className={`inline-block shrink-0 border-[2px] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${rarityClasses(weapon.rarity)}`}>
            {weapon.rarity}
          </span>
          <span className="min-w-0 truncate text-right text-[9px] font-bold uppercase tracking-wider text-gray-500">
            {weapon.weaponType}
          </span>
        </div>
        <div className="line-clamp-2 min-h-[2.25rem] text-sm font-bold leading-tight text-white">
          {weapon.displayName}
        </div>
        <div className="flex items-center justify-between border-t border-dark-600 pt-2">
          <span className="text-sm font-black text-accent">
            {price > 0 ? `${formatGems(price)} g` : '—'}
          </span>
          <DemandStars demand={weapon.demand} />
        </div>
      </div>
    </Link>
  );
}
