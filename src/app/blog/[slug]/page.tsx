import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { client } from '../../../../sanity/lib/client';
import { postBySlugQuery, allPostSlugsQuery } from '../../../../sanity/lib/queries';
import FaqSection from '@/components/FaqSection';
import JsonLd from '@/components/JsonLd';

export const revalidate = 3600;

type Props = { params: { slug: string } };

async function getPost(slug: string) {
  return client.fetch(postBySlugQuery, { slug });
}

export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(allPostSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-charcoal/60">
          <Link href="/">Home</Link> /{' '}
          <Link href={`/${post.practiceArea?.slug}`}>{post.practiceArea?.title}</Link> /{' '}
          <span>{post.title}</span>
        </nav>
        <h1 className="text-4xl font-semibold">{post.title}</h1>
        <p className="mt-2 text-sm text-charcoal/60">
          Published {new Date(post.publishedAt).toLocaleDateString()}
          {post.updatedAt && ` · Updated ${new Date(post.updatedAt).toLocaleDateString()}`}
        </p>
        <div className="prose prose-lg mt-8 max-w-none prose-headings:font-display prose-headings:text-ink">
          <PortableText value={post.body} />
        </div>
      </article>
      <FaqSection faqs={post.faqs} />
    </>
  );
}
