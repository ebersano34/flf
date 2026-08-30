import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Free Lawyer Finder is run by legal-industry insiders who volunteer their connections to help people find the right attorney — for free.',
};

export default function AboutUsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Who We Are</h1>
      <div className="prose prose-lg mt-8 max-w-none">
        <p>
          We are a team of industry insiders who have worked with law firms for
          years. We&apos;ve seen firsthand how people with means and
          connections are able to find great lawyers for their cases, while
          everyone else is left to research attorneys on their own.
        </p>
        <p>
          We don&apos;t charge to find you an attorney, and you&apos;re never
          obligated to use our recommendation. Our only goal is to put people
          who genuinely need help in front of the right lawyer for their
          situation — not whoever spent the most on advertising.
        </p>
      </div>
    </section>
  );
}
