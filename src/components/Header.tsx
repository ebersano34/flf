import Link from 'next/link';
import { client } from '../../sanity/lib/client';
import { allPracticeAreasQuery } from '../../sanity/lib/queries';
import { fallbackCases } from '@/lib/homeDefaults';
import { Mark } from './Icon';
import MobileMenu from './MobileMenu';

type PracticeAreaNavItem = { _id: string; title: string; slug: string };

export const MAIN_ACTION = { label: 'Request a free match', href: '/#match' };

// The split nav from the redesign: words on the left, the name in the middle, the one
// main button on the right. One opaque bar with a hairline, the same at every scroll depth.
export default async function Header() {
  let practiceAreas: PracticeAreaNavItem[] = [];
  try {
    practiceAreas = await client.fetch(allPracticeAreasQuery);
  } catch {
    practiceAreas = [];
  }
  if (practiceAreas.length === 0) practiceAreas = fallbackCases.map((c) => ({ _id: c._id, title: c.title, slug: c.slug || '' }));

  const words = [
    { label: 'About', href: '/about-us' },
    { label: 'Mission', href: '/our-mission' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <header className="nav fixed inset-x-0 top-0 z-30 border-b border-ink/15 bg-paper">
      <a
        href="#content"
        className="sr-only z-40 rounded-btn bg-ink px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div className="wrap flex h-[var(--nav)] items-center justify-between gap-6">
        <nav aria-label="Main" className="hidden flex-1 items-center gap-7 text-[15px] font-medium lg:flex">
          <div className="group relative">
            <Link href="/#cases" className="flex items-center gap-1 py-6 no-underline">
              Cases
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <div className="invisible absolute left-0 top-full z-10 min-w-[260px] border border-ink/15 bg-paper py-2 opacity-0 transition-opacity delay-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:transition-none group-focus-within:delay-0">
              {practiceAreas.map((area) => (
                <Link key={area._id} href={`/${area.slug}`} className="block px-4 py-2 no-underline hover:bg-surface">
                  {area.title}
                </Link>
              ))}
            </div>
          </div>
          {words.map((w) => (
            <Link key={w.href} href={w.href} className="no-underline hover:underline">
              {w.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex items-center gap-2 font-display text-xl no-underline lg:text-[24px]">
          <Mark size={20} />
          Free Lawyer Finder
        </Link>

        <div className="hidden flex-1 justify-end sm:flex">
          <Link href={MAIN_ACTION.href} className="btn btn-primary">
            {MAIN_ACTION.label}
          </Link>
        </div>
        <MobileMenu
          items={[{ label: 'Cases', href: '/#cases' }, ...words, { label: 'Contact', href: '/contact-us' }]}
          action={MAIN_ACTION}
        />
      </div>
    </header>
  );
}
