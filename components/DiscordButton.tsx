import type { ReactNode } from 'react';

// Inline Discord brand mark — lucide doesn't ship one, so we inline the official
// Discord wordmark glyph as a single path. Sized via parent font.
function DiscordIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
    </svg>
  );
}

type Size = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<Size, { box: string; icon: string; text: string }> = {
  sm: { box: 'min-h-[40px] px-3 py-2',     icon: 'h-4 w-4', text: 'text-xs' },
  md: { box: 'min-h-[48px] px-5 py-3',     icon: 'h-5 w-5', text: 'text-sm sm:text-base' },
  lg: { box: 'min-h-[56px] px-6 py-3.5',   icon: 'h-6 w-6', text: 'text-base sm:text-lg' },
};

type Props = {
  href: string;
  children: ReactNode;
  size?: Size;
  className?: string;
  /** When true, button stretches to fill its container (good for mobile drawers) */
  fullWidth?: boolean;
};

export default function DiscordButton({ href, children, size = 'md', className = '', fullWidth = false }: Props) {
  const s = SIZE_CLASSES[size];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`pixel-btn-press inline-flex items-center justify-center gap-2.5 border-[3px] border-[#3b45a3] bg-[#5865F2] font-bold uppercase tracking-wider text-white ${s.box} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        boxShadow: 'inset 0 3px 0 rgba(255, 255, 255, 0.30), inset 0 -3px 0 rgba(0, 0, 0, 0.30), 0 3px 0 #000',
      }}
    >
      <DiscordIcon className={`${s.icon} flex-shrink-0`} />
      <span className={`${s.text} whitespace-nowrap leading-none`}>{children}</span>
    </a>
  );
}
