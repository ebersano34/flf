import Link from 'next/link';
import { client } from '../../sanity/lib/client';
import { allPracticeAreasQuery } from '../../sanity/lib/queries';

type PracticeAreaNavItem = {
  _id: string;
  title: string;
  slug: string;
};

export default async function Header() {
  let practiceAreas: PracticeAreaNavItem[] = [];
  try {
    practiceAreas = await client.fetch(allPracticeAreasQuery);
  } catch {
    // Sanity not configured yet — nav still renders with core links.
    practiceAreas = [];
  }

  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold text-ink">
          Free Lawyer Finder
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium text-ink md:flex">
          <Link href="/about-us">About Us</Link>
          <div className="group relative">
            <button className="flex items-center gap-1" aria-haspopup="true">
              Types of Attorney
            </button>
            <div className="invisible absolute left-0 top-full z-10 min-w-[220px] rounded-md border border-ink/10 bg-paper py-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
              {practiceAreas.map((area) => (
                <Link
                  key={area._id}
                  href={`/${area.slug}`}
                  className="block px-4 py-2 hover:bg-ink/5"
                >
                  {area.title}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/our-mission">Our Mission</Link>
          <Link href="/blog">Blog</Link>
          <Link
            href="/contact-us"
            className="rounded-md bg-ink px-4 py-2 text-paper hover:bg-ink-light"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
