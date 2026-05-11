import { shopLink, DISCORD_INVITE } from '@/lib/config';
import DiscordButton from './DiscordButton';
import SpriteButton from './SpriteButton';

type Props = {
  campaign: string;
  shopPath?: string;
  /** Short label for the gold sprite CTA (no arrow needed; the sprite has its own visual weight) */
  shopLabel?: string;
  showDiscord?: boolean;
  variant?: 'inline' | 'banner';
};

export default function BuyCTA({
  campaign,
  shopPath = '/gems',
  shopLabel = 'Buy Gems',
  showDiscord = true,
  variant = 'inline',
}: Props) {
  if (variant === 'banner') {
    return (
      <div
        className="my-10 border-[3px] border-accent/60 bg-gradient-to-br from-dark-800 to-dark-900 p-6 sm:p-8 md:p-10"
        style={{ boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.4), 0 4px 0 rgba(0,0,0,0.5)' }}
      >
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="text-center md:text-left">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-accent sm:text-xs">
              Ready to buy?
            </div>
            <div className="text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl md:text-4xl">
              Get gems in <span className="text-accent">minutes</span>
            </div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs md:text-sm">
              Bulk from $2.65/k · 24/7 auto-delivery · 1,200+ orders
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-col items-center gap-3 sm:flex-row">
            <SpriteButton variant="gold" href={shopLink(shopPath, campaign)} external>
              {shopLabel}
            </SpriteButton>
            {showDiscord && <DiscordButton href={DISCORD_INVITE} size="md">Discord</DiscordButton>}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <SpriteButton variant="gold" href={shopLink(shopPath, campaign)} external>
        {shopLabel}
      </SpriteButton>
      {showDiscord && <DiscordButton href={DISCORD_INVITE}>Join Discord</DiscordButton>}
    </div>
  );
}
