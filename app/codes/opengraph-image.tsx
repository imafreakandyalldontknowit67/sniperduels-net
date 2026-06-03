import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Sniper Duels Codes — Honest Guide';

export default function Image() {
  return renderOgImage('Codes — Honest Guide', 'The truth about Sniper Duels codes');
}
