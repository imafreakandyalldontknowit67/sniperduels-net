import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Sniper Duels Value List 2026';

export default function Image() {
  return renderOgImage('Value List 2026', 'Live gem values · Updated every 6h');
}
