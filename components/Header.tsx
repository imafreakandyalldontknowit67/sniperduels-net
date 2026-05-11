'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { shopLink, DISCORD_INVITE } from '@/lib/config';
import SpriteButton from './SpriteButton';
import DiscordButton from './DiscordButton';

const NAV = [
  { href: '/gems', label: 'Gems' },
  { href: '/snipers', label: 'Snipers' },
  { href: '/knives', label: 'Knives' },
  { href: '/values', label: 'Values' },
  { href: '/middleman', label: 'Middleman' },
  { href: '/codes', label: 'Codes' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-[3px] border-dark-700 bg-dark-900/95 backdrop-blur">
      <div className="mx-auto flex h-[56px] max-w-[1100px] items-center justify-between px-3 sm:h-[64px] md:h-[72px] md:px-4">
        {/* Wordmark */}
        <Link href="/" className="flex items-baseline gap-1 hover:no-underline">
          <span className="text-base font-black uppercase tracking-wider text-white sm:text-lg">
            <span className="text-accent">SNIPER</span>DUELS
          </span>
          <span className="border-[2px] border-accent/60 bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
            .net
          </span>
        </Link>

        {/* Desktop nav (centered) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {NAV.map(n => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`pixel-underline text-sm font-bold uppercase tracking-wider transition-colors hover:text-white ${
                  active ? 'pixel-underline-active text-white' : 'text-pixel-blue-light'
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: CTA + mobile hamburger */}
        <div className="flex items-center gap-2">
          <SpriteButton
            href={shopLink('/gems', 'header')}
            external
            variant="gold"
            heightClass="h-[40px] sm:h-[44px]"
          >
            Buy Gems
          </SpriteButton>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="btn-icon ml-1 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <nav className="border-t-[3px] border-dark-700 bg-dark-900 md:hidden">
          <div className="mx-auto max-w-[1100px] px-3 py-2">
            {NAV.map(n => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-dark-700 px-3 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                    active ? 'nav-drawer-active' : 'text-pixel-blue-light hover:text-white'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <div className="mt-3 px-1">
              <DiscordButton href={DISCORD_INVITE} fullWidth>Join Discord</DiscordButton>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
