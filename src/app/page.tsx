import Link from 'next/link';
import type { Metadata } from 'next';
import { client } from '../../sanity/lib/client';
import { allPracticeAreasQuery } from '../../sanity/lib/queries';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Free Lawyer Finder — Helping Those Who Need It Most',
  description:
    'A free referral service connecting people who have been hurt or exploited with the best available attorney in their area — no ads, no fees, no catch.',
};

type PracticeAreaCard = {
  _id: string;
  title: string;
  slug: string;
  heroHeadline: string;
  isFree: boolean;
};

export default async function HomePage() {
  let practiceAreas: PracticeAreaCard[] = [];
  try {
    practiceAreas = await client.fetch(allPracticeAreasQuery);
  } catch {
    practiceAreas = [];
  }

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Free Lawyer Finder',
    url: 'https://freelawyerfinder.com',
    description:
      'A free attorney referral service connecting injured or exploited individuals with vetted lawyers, run by legal-industry insiders rather than advertisers.',
    priceRange: 'Free',
  };

  return (
    <>
      <JsonLd data={orgJsonLd} />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-dark">
              No ads. No fees. No catch.
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Get Introduced to the Best Legal Help Possible — For Free
            </h1>
            <p className="mt-5 max-w-lg text-lg text-charcoal/80">
              The internet will rarely find you the best lawyer — just the best
              advertiser. We&apos;re legal-industry insiders who volunteer our
              connections to match people without means or connections to the
              right attorney for their case.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="rounded-md bg-ink px-6 py-3 font-medium text-paper hover:bg-ink-light"
              >
                Get Matched With an Attorney
              </Link>
              <Link
                href="/nominate-an-attorney"
                className="rounded-md border border-ink px-6 py-3 font-medium text-ink hover:bg-ink/5"
              >
                Nominate an Attorney
              </Link>
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg bg-ink/5">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/QLvpI12-ZLY"
              title="How Free Lawyer Finder works"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Practice areas */}
      <section className="bg-ink/[0.03] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold">What kind of legal help do you need?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(practiceAreas.length > 0
              ? practiceAreas
              : [
                  { _id: '1', title: 'Personal Injury', slug: 'injury', heroHeadline: 'Injured?', isFree: true },
                  { _id: '2', title: 'Employment', slug: 'employment', heroHeadline: 'Employment Issue?', isFree: true },
                  { _id: '3', title: 'Medical Malpractice', slug: 'medical-malpractice', heroHeadline: 'Medical Malpractice?', isFree: true },
                  { _id: '4', title: 'Pharmaceutical & Medical Device', slug: 'pharmaceutical-medical-device', heroHeadline: 'Harmed by a Drug or Device?', isFree: true },
                  { _id: '5', title: 'Criminal Defense', slug: 'criminal-defense', heroHeadline: 'Facing Criminal Charges?', isFree: false },
                  { _id: '6', title: 'Family Law', slug: 'family-law', heroHeadline: 'Family Law Matter?', isFree: false },
                ]
            ).map((area) => (
              <Link
                key={area._id}
                href={`/${area.slug}`}
                className="group rounded-lg border border-ink/10 bg-paper p-6 transition-colors hover:border-amber"
              >
                <h3 className="text-xl font-semibold text-ink group-hover:text-amber-dark">
                  {area.heroHeadline}
                </h3>
                <p className="mt-2 text-sm text-charcoal/70">
                  {area.isFree ? 'Free referral service.' : 'Referral available — attorney fees may apply.'}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-amber-dark">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-3xl font-semibold">How It Works</h2>
        <p className="mt-4 text-charcoal/80">
          We&apos;re a small group of non-lawyers who&apos;ve worked in the legal
          industry for decades. We&apos;ve seen how underprivileged people go
          without proper representation simply because they don&apos;t know a
          lawyer or have the right connections — left instead to search online,
          where the results favor whoever advertises best, not who&apos;s best
          for the case.
        </p>
        <p className="mt-4 text-charcoal/80">
          We can&apos;t help everyone. This service exists for people who have
          been seriously hurt or exploited and don&apos;t have the means to find
          a good attorney on their own. If that&apos;s you, tell us what
          happened and we&apos;ll get back to you as soon as we can.
        </p>
        <Link
          href="/contact-us"
          className="mt-6 inline-block rounded-md bg-amber px-6 py-3 font-medium text-ink-dark hover:bg-amber-dark"
        >
          Tell Us What Happened
        </Link>
      </section>
    </>
  );
}
