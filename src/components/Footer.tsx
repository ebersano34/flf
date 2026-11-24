import Link from 'next/link';
import { client } from '../../sanity/lib/client';
import { homePageQuery } from '../../sanity/lib/queries';
import { withDefaults } from '@/lib/homeDefaults';
import Icon, { Mark } from './Icon';
import { MAIN_ACTION } from './Header';

const columns = [
  {
    title: 'Cases',
    links: [
      { label: 'Personal injury', href: '/injury' },
      { label: 'Employment', href: '/employment' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About us', href: '/about-us' },
      { label: 'Our mission', href: '/our-mission' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Questions', href: '/#questions' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Attorneys',
    links: [
      { label: 'Nominate an attorney', href: '/nominate-an-attorney' },
      { label: 'Contact us', href: '/contact-us' },
    ],
  },
];

// The closing screen on every page: the ask once more (its words come from the Home Page
// document), then the directory and the legal row.
export default async function Footer() {
  let doc = null;
  try {
    doc = await client.fetch(homePageQuery);
  } catch {
    doc = null;
  }
  const home = withDefaults(doc);

  return (
    <footer className="closing flex min-h-[100svh] flex-col bg-paper pb-[var(--padb)] pt-[var(--padt)]" aria-labelledby="close-h">
      <div className="wrap flex flex-1 flex-col justify-between gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="close-h" className="t-h2">{home.closeHeading}</h2>
            <p className="t-lead mt-4">{home.closeLine}</p>
          </div>
          <Link href={MAIN_ACTION.href} className="btn btn-primary w-full md:w-auto">
            {home.primaryCtaLabel}
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-12">
            <div className="col-span-2 md:col-span-4">
              <Link href="/" className="flex items-center gap-2 font-display text-xl no-underline">
                <Mark size={18} />
                Free Lawyer Finder
              </Link>
              <p className="mt-4 hidden font-display text-[22px] leading-snug sm:block">Free attorney matching by a person</p>
            </div>
            {columns.map((col) => (
              <div key={col.title} className="md:col-span-2">
                <h3 className="t-label font-body text-muted">{col.title}</h3>
                <ul className="mt-4 space-y-1 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="inline-flex min-h-[44px] items-center no-underline hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-ink/15 pt-6 text-[13px] text-muted sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Free Lawyer Finder</span>
            <span>Free Lawyer Finder is not a law firm and does not give legal advice.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
