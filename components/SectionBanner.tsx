import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Headline color — defaults to gold (accent). Use 'blue' for category contrast. */
  color?: 'gold' | 'blue' | 'white';
  /** Optional eyebrow line under the headline */
  eyebrow?: ReactNode;
  /** Center-align (default) or left-align for in-flow sections */
  align?: 'center' | 'left';
  className?: string;
};

const COLOR: Record<NonNullable<Props['color']>, string> = {
  gold: 'text-accent',
  blue: 'text-pixel-blue-light',
  white: 'text-white',
};

export default function SectionBanner({
  children,
  color = 'gold',
  eyebrow,
  align = 'center',
  className = '',
}: Props) {
  const wrap = align === 'center' ? 'text-center' : 'text-left';
  return (
    <div className={`mb-6 sm:mb-8 md:mb-10 ${wrap} ${className}`}>
      <h2 className={`heading-pixel ${COLOR[color]}`}>{children}</h2>
      {eyebrow && (
        <p
          className={`mt-2 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider leading-relaxed text-gray-400 ${
            align === 'center' ? 'mx-auto max-w-2xl' : ''
          }`}
        >
          {eyebrow}
        </p>
      )}
    </div>
  );
}
