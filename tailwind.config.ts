import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep teal — trust, calm authority. Not the generic "law firm navy."
        ink: {
          DEFAULT: '#1B3A4B',
          light: '#274F63',
          dark: '#12262F',
        },
        // Warm amber — hope, human warmth, a nod to justice without the cliché gold.
        amber: {
          DEFAULT: '#C9932F',
          light: '#E0B15C',
          dark: '#9C7222',
        },
        // Quiet sage — used sparingly for reassurance/success states.
        sage: {
          DEFAULT: '#6B8F71',
        },
        paper: '#FAF9F6',
        charcoal: '#22282B',
      },
      fontFamily: {
        display: ['var(--font-source-serif)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
