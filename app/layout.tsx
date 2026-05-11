import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/config';

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
  openGraph: {
    type: 'website',
    siteName: 'sniperduels.net',
    title: 'Sniper Duels — Cheapest Gems, Skins & Supplies',
    description:
      'Buy Sniper Duels gems from $2.65/k. Plus skins, sharkmats and free middleman trades. Auto-delivery in minutes.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sniper Duels — Cheapest Gems, Skins & Supplies',
    description: 'Buy Sniper Duels gems, skins and supplies. Same-day auto-delivery.',
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-dark-950 text-white">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
