import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: '#e1ad2d', light: '#f0c040', dark: '#c4961f' },
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
        sans: ['var(--font-pixel)', 'monospace'],
      },
      animation: {
        'pixel-fade-up': 'pixel-fade-up 0.4s steps(4) forwards',
        'pixel-fade-in': 'pixel-fade-in 0.5s steps(4) forwards',
        'pixel-bob': 'pixel-bob 2.5s steps(3) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'pixel-fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '50%': { opacity: '0.5', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pixel-fade-in': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        'pixel-bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'glow-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(225,173,45,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(225,173,45,0.6)) drop-shadow(0 0 40px rgba(225,173,45,0.2))' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
