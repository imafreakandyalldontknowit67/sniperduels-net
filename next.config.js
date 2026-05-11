/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.sniperduels.com' },
      { protocol: 'https', hostname: 'sniperduels.shop' },
    ],
  },
  async redirects() {
    return [];
  },
};
