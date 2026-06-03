import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'How to Play Sniper Duels';

export default function Image() {
  return renderOgImage('How to Play', 'Beginner guide for new players');
}
