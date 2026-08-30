import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Mission',
  description:
    'Our mission is to make sure people who have been seriously hurt or exploited — but lack means or connections — can still find great legal representation.',
};

export default function OurMissionPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold">How It Works</h1>
      <div className="prose prose-lg mt-8 max-w-none">
        <p>
          We&apos;re a small group of non-lawyers who&apos;ve worked in the
          legal industry for decades. Our team has seen how underprivileged
          people often don&apos;t get proper legal representation — not
          because their case lacks merit, but because they don&apos;t know a
          lawyer or have good connections. Left to research online, they find
          local attorneys who are simply good at advertising, not necessarily
          good at the law.
        </p>
        <p>
          We can&apos;t help everyone. This service exists for people who have
          been seriously hurt or exploited and don&apos;t have the means to
          find a good attorney on their own.
        </p>
        <p>
          If that&apos;s you, tell us what happened and we&apos;ll get back to
          you as soon as we can.
        </p>
      </div>
      <Link
        href="/contact-us"
        className="mt-6 inline-block rounded-md bg-amber px-6 py-3 font-medium text-ink-dark hover:bg-amber-dark"
      >
        Tell Us What Happened
      </Link>
    </section>
  );
}
