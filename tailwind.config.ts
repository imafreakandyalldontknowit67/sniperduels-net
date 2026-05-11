import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#e1ad2d',  // matches sniperduels.shop gold
          light: '#f0c040',
          dark: '#c2a10e',
        },
        'pixel-blue': { DEFAULT: '#3084b1', dark: '#205ad7', light: '#4a9fd4' },
        'pixel-red': '#b43824',
        dark: {
          950: '#070708',
          900: '#0a0a0b',
          800: '#121214',
          700: '#1a1a1e',
          600: '#242429',
          500: '#2e2e35',
          400: '#3a3a42',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
