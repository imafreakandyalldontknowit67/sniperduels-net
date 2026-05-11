'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { shopLink, DISCORD_INVITE } from '@/lib/config';

const NAV = [
  { href: '/gems', label: 'Gems' },
  { href: '/skins', label: 'Skins' },
  { href: '/supplies', label: 'Supplies' },
  { href: '/values', label: 'Values' },
  { href: '/middleman', label: 'Middleman' },
  { href: '/codes', label: 'Codes' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-[3px] border-dark-700 bg-dark-900/95 backdrop-blur">
      <div className="mx-auto flex h-[56px] max-w-6xl items-center justify-between px-3 sm:h-[64px] md:h-[72px] md:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:no-underline">
          <Image
            src="/images/logo.png"
            alt="Sniper Duels"
            width={36}
            height={36}
            priority
            style={{ imageRendering: 'pixelated' }}
            className="h-8 w-8 sm:h-9 sm:w-9"
          />
          <span className="hidden border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:inline">
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
          <a
            href={shopLink('/gems', 'header')}
            target="_blank"
            rel="noopener"
            className="btn-primary px-3 py-2 text-xs sm:text-sm md:px-4 md:py-2.5"
          >
            Buy Gems →
          </a>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Open menu"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center border-[2px] border-dark-500 bg-dark-800 text-pixel-blue-light hover:border-accent hover:text-accent md:hidden"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <nav className="border-t-[3px] border-dark-700 bg-dark-900 md:hidden">
          <div className="mx-auto max-w-6xl px-3 py-2">
            {NAV.map(n => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-dark-700 px-2 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                    active ? 'text-accent' : 'text-pixel-blue-light hover:text-white'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener"
              className="block px-2 py-3 text-sm font-bold uppercase tracking-wider text-[#5865F2] hover:text-white"
            >
              Join Discord →
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
