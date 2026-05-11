import type { ReactNode } from 'react';

// Sprite-backed panel — mirrors .shop's ShopCategories pattern.
// asset-87.png provides the chunky pixel-art frame; content sits on top.
// Use ONLY for marketing-surface trust trios. Don't use for catalog grids
// (sprite doesn't tile well at narrow widths and over-spriting kills density).
type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export default function SpritePanel({
  children,
  className = '',
  innerClassName = '',
}: Props) {
  return (
    <div className={`relative flex flex-col items-center text-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/pixel/pngs/asset-87.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full select-none"
        style={{ imageRendering: 'pixelated' }}
        draggable={false}
      />
      <div
        className={`relative z-10 flex h-full w-full flex-col pt-6 pb-6 px-6 sm:px-8 ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
