/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
};
