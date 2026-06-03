import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Sniper Duels Weapon Tier List';

export default function Image() {
  return renderOgImage('Weapon Tier List', 'Every weapon ranked S to D');
}
