import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { client } from '../../../sanity/lib/client';
import {
  practiceAreaBySlugQuery,
  allPracticeAreaSlugsQuery,
} from '../../../sanity/lib/queries';
import FaqSection from '@/components/FaqSection';
import JsonLd from '@/components/JsonLd';
import ContactForm from '@/components/ContactForm';

export const revalidate = 3600; // ISR: re-check content every hour

type Props = { params: { practiceArea: string } };

async function getPracticeArea(slug: string) {
  return client.fetch(practiceAreaBySlugQuery, { slug });
}

export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(allPracticeAreaSlugsQuery);
    return slugs.map((slug) => ({ practiceArea: slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = await getPracticeArea(params.practiceArea);
  if (!area) return {};
  return {
    title: area.seoTitle || area.title,
    description: area.seoDescription || area.heroSubhead,
  };
}

export default async function PracticeAreaPage({ params }: Props) {
  const area = await getPracticeArea(params.practiceArea);
  if (!area) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: area.title,
    about: area.title,
    description: area.seoDescription || area.heroSubhead,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-charcoal/60">
          <Link href="/">Home</Link> / <span>{area.title}</span>
        </nav>

        <h1 className="text-4xl font-semibold">{area.heroHeadline}</h1>
        {area.heroSubhead && (
          <p className="mt-4 text-lg text-charcoal/80">{area.heroSubhead}</p>
        )}

        {!area.isFree && (
          <p className="mt-4 rounded-md bg-amber/10 px-4 py-3 text-sm text-ink-dark">
            Our referral is always free to you. Attorneys in this practice area
            typically charge a fee for their services.
          </p>
        )}

        {area.videoUrl && (
          <div className="mt-8 aspect-video overflow-hidden rounded-lg bg-ink/5">
            <iframe
              className="h-full w-full"
              src={area.videoUrl}
              title={`${area.title} — how it works`}
              loading="lazy"
              allowFullScreen
            />
          </div>
        )}

        {area.body && (
          <div className="prose prose-lg mt-10 max-w-none prose-headings:font-display prose-headings:text-ink">
            <PortableText value={area.body} />
          </div>
        )}

        <div className="mt-12 rounded-lg border border-ink/10 bg-ink/[0.03] p-8">
          <h2 className="text-2xl font-semibold">Ready to talk to someone?</h2>
          <p className="mt-2 text-charcoal/80">
            Tell us what happened and we&apos;ll do our best to connect you with
            the right attorney.
          </p>
          <div className="mt-6">
            <ContactForm context={area.title} />
          </div>
        </div>
      </section>

      <FaqSection faqs={area.faqs} />

      {area.relatedPosts?.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Related Reading</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {area.relatedPosts.map((post: any) => (
              <li key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-md border border-ink/10 p-4 hover:border-amber"
                >
                  <span className="font-medium text-ink">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
