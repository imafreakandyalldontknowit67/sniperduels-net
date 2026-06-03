import { ImageResponse } from 'next/og';

// Shared 1200×630 OG card renderer for the per-route opengraph-image.tsx files.
// Solid dark brand background (#0a0a0b = dark-900) with the gold accent
// (#e1ad2d) used for the page title — matches the site's pixel/gaming theme.
// Static text only (no live data) so generation is fast and never fails a build.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const ACCENT = '#e1ad2d';
const ACCENT_LIGHT = '#f0c040';
const BG = '#0a0a0b';
const BG_PANEL = '#121214';

export function renderOgImage(title: string, eyebrow = 'sniperduels.net') {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: BG,
          backgroundImage: `radial-gradient(circle at 50% 0%, ${BG_PANEL} 0%, ${BG} 70%)`,
          padding: '80px',
          border: `10px solid ${ACCENT}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: ACCENT,
          }}
        >
          Sniper Duels
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
            color: '#ffffff',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 30,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: ACCENT_LIGHT,
          }}
        >
          {eyebrow}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
