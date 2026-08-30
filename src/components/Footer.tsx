import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper/80">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-lg text-paper">Free Lawyer Finder</p>
            <p className="mt-2 max-w-sm">
              A free referral service, run by legal-industry insiders, connecting
              people who have been hurt or exploited with the best attorney for
              their situation — no advertising fees, no kickbacks.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2">
            <Link href="/about-us">About Us</Link>
            <Link href="/our-mission">Our Mission</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact-us">Contact Us</Link>
            <Link href="/nominate-an-attorney">Nominate an Attorney</Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-paper/10 pt-6 text-xs text-paper/50">
          © {new Date().getFullYear()} Free Lawyer Finder. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
