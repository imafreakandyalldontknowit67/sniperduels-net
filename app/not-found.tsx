import Link from 'next/link';
import type { Metadata } from 'next';
import SpriteButton from '@/components/SpriteButton';
import DiscordButton from '@/components/DiscordButton';
import { shopLink, DISCORD_INVITE } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for is gone — but the cheapest Sniper Duels gems and the free Discord middleman are right here.',
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl py-8 text-center sm:py-12">
      <div className="mb-6 inline-block border-[2px] border-accent/60 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
        Error 404
      </div>
      <h1 className="mb-4 text-3xl font-bold uppercase tracking-wider sm:text-5xl md:text-6xl">
        That weapon is <span className="text-accent">missing</span>
      </h1>
      <p className="mx-auto mb-8 max-w-md text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
        The page you tried to load doesn&apos;t exist (or got renamed). Try one of these instead.
      </p>
      <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <SpriteButton variant="gold" href={shopLink('/gems', 'not-found')} external>
          Buy Gems
        </SpriteButton>
        <DiscordButton href={DISCORD_INVITE} size="lg">Join Discord</DiscordButton>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/snipers"
          className="group flex items-center justify-between border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline"
        >
          <div className="text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Browse</div>
            <div className="text-base font-bold uppercase tracking-wider text-white">Sniper Values</div>
          </div>
          <span className="text-2xl text-accent group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href="/knives"
          className="group flex items-center justify-between border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline"
        >
          <div className="text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Browse</div>
            <div className="text-base font-bold uppercase tracking-wider text-white">Knife Values</div>
          </div>
          <span className="text-2xl text-accent group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href="/middleman"
          className="group flex items-center justify-between border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline"
        >
          <div className="text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Use</div>
            <div className="text-base font-bold uppercase tracking-wider text-white">Free Middleman</div>
          </div>
          <span className="text-2xl text-accent group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href="/cheap-gems"
          className="group flex items-center justify-between border-[3px] border-dark-500 bg-dark-700 p-4 transition-colors hover:border-accent/60 hover:no-underline"
        >
          <div className="text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Compare</div>
            <div className="text-base font-bold uppercase tracking-wider text-white">Cheap Gems</div>
          </div>
          <span className="text-2xl text-accent group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
