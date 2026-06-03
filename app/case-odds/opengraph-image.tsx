import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Sniper Duels Case Odds & Crate Contents';

export default function Image() {
  return renderOgImage('Case Odds & Crate Contents', 'What drops from every case');
}
