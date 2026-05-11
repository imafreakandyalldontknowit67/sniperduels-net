import Link from 'next/link';
import type { ReactNode, CSSProperties } from 'react';

type Variant = 'gold' | 'blue-wide' | 'blue';

const SPRITES: Record<Variant, { src: string; defaultH: string; labelClass: string }> = {
  // Big gold CTA — primary buy action
  gold: {
    src: '/images/pixel/pngs/asset-59.png',
    defaultH: 'h-[60px] sm:h-[64px]',
    labelClass: 'text-dark-900',
  },
  // Wide blue — secondary CTA / login style (matches Header.tsx:259 in .shop)
  'blue-wide': {
    src: '/images/pixel/pngs/asset-64.png',
    defaultH: 'h-[44px] sm:h-[48px]',
    labelClass: 'text-white',
  },
  // Compact blue chip
  blue: {
    src: '/images/pixel/pngs/asset-60.png',
    defaultH: 'h-[44px] sm:h-[48px]',
    labelClass: 'text-white',
  },
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Override default height if you need a bigger/smaller chip */
  heightClass?: string;
  /** Inline style override (rare) */
  style?: CSSProperties;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
};

type ButtonProps = CommonProps & {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

type Props = AnchorProps | ButtonProps;

export default function SpriteButton(props: Props) {
  const { variant = 'gold', children, className = '', heightClass, style } = props;
  const sprite = SPRITES[variant];
  const h = heightClass ?? sprite.defaultH;
  const labelSize = variant === 'gold' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm';

  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sprite.src}
        alt=""
        aria-hidden
        className={`${h} w-auto select-none`}
        style={{ imageRendering: 'pixelated' }}
        draggable={false}
      />
      <span
        className={`absolute inset-0 flex items-center justify-center ${labelSize} font-bold uppercase tracking-wider whitespace-nowrap px-4 ${sprite.labelClass}`}
      >
        {children}
      </span>
    </>
  );

  const wrapperClass = `relative inline-flex items-center justify-center pixel-btn-press ${className}`;

  if ('href' in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener" className={wrapperClass} style={style}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={wrapperClass} style={style}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={'onClick' in props ? props.onClick : undefined}
      className={wrapperClass}
      style={style}
    >
      {inner}
    </button>
  );
}
