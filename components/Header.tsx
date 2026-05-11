import Link from 'next/link';
import { shopLink } from '@/lib/config';

const NAV = [
  { href: '/gems', label: 'Gems' },
  { href: '/skins', label: 'Skins' },
  { href: '/supplies', label: 'Supplies' },
  { href: '/values', label: 'Values' },
  { href: '/middleman', label: 'Middleman' },
  { href: '/codes', label: 'Codes' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-dark-700 bg-dark-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-white hover:no-underline">
          <span className="text-xl font-black tracking-tight text-accent">SNIPER</span>
          <span className="text-xl font-black tracking-tight">DUELS</span>
          <span className="hidden rounded-sm border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent md:inline">.net</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-dark-800 hover:text-white hover:no-underline"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={shopLink('/gems', 'header')}
          target="_blank"
          rel="noopener"
          className="btn-primary px-3 py-2 text-sm md:px-5 md:py-2.5"
        >
          Buy Gems →
        </a>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-dark-700 px-3 py-2 md:hidden">
        {NAV.map(n => (
          <Link
            key={n.href}
            href={n.href}
            className="whitespace-nowrap rounded px-3 py-1 text-xs font-medium text-gray-300 hover:bg-dark-800 hover:text-white hover:no-underline"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
