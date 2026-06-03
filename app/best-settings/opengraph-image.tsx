import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Best Sniper Duels Settings & Sensitivity';

export default function Image() {
  return renderOgImage('Best Settings & Sensitivity', 'Sensitivity · FPS · keybinds · aim');
}
