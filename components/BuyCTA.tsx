import { shopLink, DISCORD_INVITE } from '@/lib/config';

type Props = {
  campaign: string;
  shopPath?: string;
  shopLabel?: string;
  showDiscord?: boolean;
  variant?: 'inline' | 'banner';
};

export default function BuyCTA({
  campaign,
  shopPath = '/gems',
  shopLabel = 'Buy on sniperduels.shop →',
  showDiscord = true,
  variant = 'inline',
}: Props) {
  if (variant === 'banner') {
    return (
      <div className="my-8 border-[3px] border-accent/60 bg-gradient-to-br from-dark-800 to-dark-900 p-6 md:p-8" style={{ boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.4), 0 4px 0 rgba(0,0,0,0.5)' }}>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">Ready to buy?</div>
            <div className="text-2xl font-black uppercase tracking-wider text-white md:text-3xl">Get gems in minutes</div>
            <div className="mt-1 text-sm text-gray-400">From $2.65/k bulk · Auto-delivery 24/7 · 1,200+ orders fulfilled</div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <a href={shopLink(shopPath, campaign)} target="_blank" rel="noopener" className="btn-primary">
              {shopLabel}
            </a>
            {showDiscord && (
              <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="btn-discord">
                Join Discord
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={shopLink(shopPath, campaign)} target="_blank" rel="noopener" className="btn-primary">
        {shopLabel}
      </a>
      {showDiscord && (
        <a href={DISCORD_INVITE} target="_blank" rel="noopener" className="btn-secondary">
          Join Discord →
        </a>
      )}
    </div>
  );
}
