import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_URL, SHOP_URL, DISCORD_INVITE } from '@/lib/config';

const pixelEmulator = localFont({
  src: '../public/fonts/PixelEmulator-xq08.ttf',
  variable: '--font-pixel',
  // 'optional' avoids the FOIT→swap CLS on H1. The 21KB TTF nearly always
  // loads within 100ms; if not, fallback monospace renders and we don't swap.
  display: 'optional',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sniper Duels — Cheapest Gems, Skins & Supplies | sniperduels.net',
    template: '%s | sniperduels.net',
  },
  description:
    'Buy Sniper Duels gems from $2.65/k, plus skins, sharkmats and middleman trading. Same-day delivery via the official sniperduels.shop auto-store.',
  keywords: [
    'sniper duels',
    'sniper duels gems',
    'sniper duels gems for sale',
    'cheap sniper duels gems',
    'sniper duels values',
    'sniper duels middleman',
    'sniper duels supplies',
    'roblox sniper duels',
  ],
  icons: { icon: '/gem_icon.png', shortcut: '/gem_icon.png' },
  // Defaults — every page should override `openGraph.title/description` and
  // `twitter.title/description` in its own metadata export so each social
  // preview is unique. The image fallback applies sitewide.
  openGraph: {
    type: 'website',
    siteName: 'sniperduels.net',
    url: SITE_URL,
    images: ['/og-banner.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-banner.webp'],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#7ec8e3',
  width: 'device-width',
  initialScale: 1,
};

const SITE_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#org`,
    name: 'sniperduels.net',
    url: SITE_URL,
    logo: `${SITE_URL}/gem_icon.png`,
    sameAs: [SHOP_URL, DISCORD_INVITE],
    description: 'Community marketplace and value list for Sniper Duels (Roblox).',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#site`,
    name: 'sniperduels.net',
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}#org` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/values?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  // The canonical entity this whole site is about. Pulls sniperduels.net into
  // the Sniper Duels Knowledge-Graph cluster so AI Overviews + Perplexity
  // associate us with the game.
  {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    '@id': `${SITE_URL}#game`,
    name: 'Sniper Duels',
    alternateName: ['SniperDuels', 'Roblox Sniper Duels'],
    gamePlatform: 'Roblox',
    applicationCategory: 'Game',
    playMode: 'MultiPlayer',
    inLanguage: 'en',
    genre: ['Shooter', 'First-person shooter', 'PvP'],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pixelEmulator.variable}>
      <head>
        {/* Preconnect to the weapon-image CDN so the TLS handshake is warm by
            the time we paint cards. Critical when /snipers /knives hydrate
            with raw <img> to images.sniperduels.com. */}
        <link rel="preconnect" href="https://images.sniperduels.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.sniperduels.com" />
      </head>
      <body className="min-h-screen bg-dark-900 text-white">
        <Header />
        <main className="mx-auto max-w-[1100px] px-4 pt-[64px] sm:pt-[72px] md:pt-[80px] pb-12">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD) }}
        />
      </body>
    </html>
  );
}
