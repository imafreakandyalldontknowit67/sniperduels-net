/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    // Tree-shake lucide-react barrel imports — saves ~25KB raw / ~5KB br on First Load JS.
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.sniperduels.com', pathname: '/weapons/**' },
      { protocol: 'https', hostname: 'sniperduels.shop' },
    ],
    // Tuned for the values grid: 2-col mobile (~50vw), 3/4/5/6-col on larger viewports.
    deviceSizes: [170, 200, 220, 340, 400, 440, 640, 750, 828, 1080],
    imageSizes: [170, 200, 220, 340, 440],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [];
  },
  async headers() {
    return [
      // Long-cache public assets (PNG/WEBP/SVG/JPG/AVIF/ICO/font files).
      // Next.js automatically immutable-caches /_next/static/* but NOT /public/* —
      // this fills that gap so repeat visitors don't re-download the 580KB of
      // sprite PNGs, og-banner, gem_icon, etc. on every navigation.
      {
        source: '/:path*.png',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.webp',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.svg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.jpg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.avif',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.ttf',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.woff2',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Sitemap + robots can refresh hourly — clients should re-check
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }],
      },
    ];
  },
};
