import Link from 'next/link';
import { SHOP_URL, DISCORD_INVITE } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="border-t border-dark-700 bg-dark-900">
      <div className="mx-auto max-w-[1100px] px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 text-lg font-black">
              <span className="text-accent">SNIPER</span>DUELS<span className="text-xs text-accent">.net</span>
            </div>
            <p className="text-sm text-gray-400">
              Cheapest Sniper Duels gems, skins and supplies — backed by the official{' '}
              <a href={SHOP_URL} target="_blank" rel="noopener" className="text-accent hover:underline">
                sniperduels.shop
              </a>{' '}
              auto-store.
            </p>
          </div>
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-300">Buy</div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/gems" className="hover:text-accent">Gems</Link></li>
              <li><Link href="/cheap-gems" className="hover:text-accent">Cheap Gems</Link></li>
              <li><Link href="/skins" className="hover:text-accent">Skins</Link></li>
              <li><Link href="/supplies" className="hover:text-accent">Supplies</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-300">Values</div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/values" className="hover:text-accent">All Items</Link></li>
              <li><Link href="/snipers" className="hover:text-accent">Snipers</Link></li>
              <li><Link href="/knives" className="hover:text-accent">Knives</Link></li>
              <li><Link href="/middleman" className="hover:text-accent">Free Middleman</Link></li>
              <li><Link href="/safe-trading" className="hover:text-accent">Safe Trading</Link></li>
              <li><Link href="/codes" className="hover:text-accent">Codes</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-300">Connect</div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href={DISCORD_INVITE} target="_blank" rel="noopener" className="hover:text-accent">Discord</a></li>
              <li><a href={SHOP_URL} target="_blank" rel="noopener" className="hover:text-accent">sniperduels.shop</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-dark-700 pt-6 text-xs text-gray-500">
          <p>
            sniperduels.net — community resource. Not affiliated with the developers of Sniper Duels (Roblox). Roblox and Sniper Duels are trademarks of their respective owners.
          </p>
          <p className="mt-2">© 2026 sniperduels.net</p>
        </div>
      </div>
    </footer>
  );
}
