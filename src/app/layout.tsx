import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Self-hosted variable fonts (no build-time call to Google Fonts).
const display = localFont({
  src: '../fonts/red-hat-display-latin-wght-normal.woff2',
  weight: '300 900',
  variable: '--font-display',
  display: 'swap',
});
const text = localFont({
  src: '../fonts/red-hat-text-latin-wght-normal.woff2',
  weight: '300 700',
  variable: '--font-text',
  display: 'swap',
});

const SITE_URL = 'https://freelawyerfinder.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Free Lawyer Finder: free attorney matching by a real person',
    template: '%s | Free Lawyer Finder',
  },
  description:
    'A person on our team reads what happened to you and introduces you to an attorney who handles cases like yours, at no cost to you.',
  openGraph: {
    type: 'website',
    siteName: 'Free Lawyer Finder',
    url: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="content" className="flex-1 pt-[var(--nav)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
