import Link from 'next/link';
import type { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import { allPostsQuery } from '../../../sanity/lib/queries';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guides and answers on personal injury, employment law, medical malpractice, and more — written to actually help, not to sell you anything.',
};

export default async function BlogIndexPage() {
  let posts: any[] = [];
  try {
    posts = await client.fetch(allPostsQuery);
  } catch {
    posts = [];
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Blog</h1>
      <p className="mt-3 text-charcoal/80">
        Straight answers to the questions people actually have, organized by
        legal issue.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-charcoal/60">
          No posts published yet — check back soon.
        </p>
      ) : (
        <ul className="mt-10 divide-y divide-ink/10">
          {posts.map((post) => (
            <li key={post._id} className="py-6">
              <Link href={`/blog/${post.slug}`} className="group">
                <p className="text-xs font-mono uppercase tracking-wide text-amber-dark">
                  {post.practiceArea?.title}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-ink group-hover:text-amber-dark">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-charcoal/70">{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
