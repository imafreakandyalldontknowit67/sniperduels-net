/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Don't advertise the framework/version to attackers scanning for n-day Next.js CVEs.
  poweredByHeader: false,
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
    // CSP: 'unsafe-inline' on script/style is required because Next.js App Router
    // hydration + JSON-LD via dangerouslySetInnerHTML both emit inline tags.
    // Nonce-based CSP would force per-request rendering and break full SSG.
    // The other directives (frame-ancestors, img-src allowlist, object-src none,
    // base-uri, form-action) still close real attack vectors even with inline allowed.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.sniperduels.com https://sniperduels.shop",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; ');

    const securityHeaders = [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'Content-Security-Policy', value: csp },
    ];

    return [
      // Apply security headers to every response.
      { source: '/:path*', headers: securityHeaders },
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
