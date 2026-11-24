import type { Config } from 'tailwindcss';

// Design tokens from the 2026 home page redesign (tasteskill: palette "Newsprint and brass",
// type Red Hat Display / Red Hat Text). The token names are the ones the rest of the site
// already uses, so every page picks up the new look without class changes.
const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Near-black ink: text, the primary button, the dark band.
        ink: {
          DEFAULT: '#181715',
          light: '#2b2a27',
          dark: '#0e0d0c',
        },
        // Brass accent: small marks, focus, highlights. Too light for text on paper,
        // so text uses amber-dark (5.9:1 on paper).
        amber: {
          DEFAULT: '#bfb21a',
          light: '#d6cb4a',
          dark: '#5f5808',
        },
        sage: {
          DEFAULT: '#4f6b54',
        },
        paper: '#e8e8e3',
        surface: '#dcdcd6',
        muted: '#5c5b56',
        charcoal: '#181715',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-text)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-text)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
        wrap: '1280px',
      },
      borderRadius: {
        btn: '8px',
        frame: '20px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
