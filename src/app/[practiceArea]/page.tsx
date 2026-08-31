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
  try {
    return await client.fetch(practiceAreaBySlugQuery, { slug });
  } catch (error) {
    console.error(`Failed to fetch practice area "${slug}":`, error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(allPracticeAreaSlugsQuery);
    return slugs.map((slug) => ({ practiceArea: slug }));
  } catch (error) {
    console.error('Failed to fetch practice area slugs:', error);
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

      <section className="mx-auto max-w-4xl px-6 pt-16">
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
      </section>

      {/* 1. At-a-glance summary */}
      {area.quickFacts?.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pt-10">
          <div className="rounded-lg border border-ink/15 bg-ink/[0.03] p-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/60">
              At a Glance
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {area.quickFacts.map((fact: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
                  <span className="mt-1 text-amber-dark">●</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 2. Why marketing misleads / sub-specialty matters */}
      {(area.whyMarketingMisleads || area.subNiches?.length > 0) && (
        <section className="mx-auto max-w-4xl px-6 pt-12">
          <h2 className="text-2xl font-semibold text-ink">
            Not All {area.title} Lawyers Are the Same
          </h2>
          {area.whyMarketingMisleads && (
            <div className="prose prose-lg mt-4 max-w-none prose-headings:font-display">
              <PortableText value={area.whyMarketingMisleads} />
            </div>
          )}
          {area.subNiches?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {area.subNiches.map((niche: string, i: number) => (
                <span
                  key={i}
                  className="rounded-full border border-ink/20 bg-paper px-3 py-1 text-sm text-ink"
                >
                  {niche}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 3. Risks of the wrong lawyer */}
      {area.risksOfWrongLawyer && (
        <section className="mx-auto max-w-4xl px-6 pt-12">
          <div className="rounded-lg border-l-4 border-amber bg-amber/5 p-6">
            <h2 className="text-2xl font-semibold text-ink">
              The Risk of Picking the Wrong Lawyer
            </h2>
            <div className="prose prose-lg mt-4 max-w-none prose-headings:font-display">
              <PortableText value={area.risksOfWrongLawyer} />
            </div>
          </div>
        </section>
      )}

      {/* 4. Human matching process */}
      {area.humanMatchingProcess && (
        <section className="mx-auto max-w-4xl px-6 pt-12">
          <h2 className="text-2xl font-semibold text-ink">
            You&apos;ll Be Matched by a Real Person — Not an Algorithm
          </h2>
          <div className="prose prose-lg mt-4 max-w-none prose-headings:font-display">
            <PortableText value={area.humanMatchingProcess} />
          </div>
        </section>
      )}

      {/* 5. What the legal process looks like */}
      {area.legalProcessSteps?.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pt-12">
          <h2 className="text-2xl font-semibold text-ink">What Happens Next</h2>
          <ol className="mt-6 space-y-6">
            {area.legalProcessSteps.map((step: any, i: number) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink font-mono text-sm text-paper">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{step.stepTitle}</p>
                  {step.stepDescription && (
                    <p className="mt-1 text-charcoal/80">{step.stepDescription}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 6. Videos */}
      {area.videos?.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pt-12">
          <h2 className="text-2xl font-semibold text-ink">Watch: How It Works</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {area.videos.map((video: any, i: number) => (
              <div key={i}>
                <div className="aspect-video overflow-hidden rounded-lg bg-ink/5">
                  <iframe
                    className="h-full w-full"
                    src={video.url}
                    title={video.title || `${area.title} video ${i + 1}`}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
                {(video.title || video.caption) && (
                  <p className="mt-2 text-sm text-charcoal/70">
                    {video.title}
                    {video.caption && <span className="block text-charcoal/50">{video.caption}</span>}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Optional legacy/extra content */}
      {area.body && (
        <section className="mx-auto max-w-4xl px-6 pt-12">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink">
            <PortableText value={area.body} />
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-lg border border-ink/10 bg-ink/[0.03] p-8">
          <h2 className="text-2xl font-semibold">Ready to talk to someone?</h2>
          <p className="mt-2 text-charcoal/80">
            Tell us what happened and a real person on our team will personally
            find the right attorney for your situation.
          </p>
          <div className="mt-6">
            <ContactForm context={area.title} />
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
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
