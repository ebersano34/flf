import type { MetadataRoute } from 'next';
import { client } from '../../sanity/lib/client';
import { allPracticeAreaSlugsQuery, allPostSlugsQuery } from '../../sanity/lib/queries';

const SITE_URL = 'https://freelawyerfinder.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let practiceAreaSlugs: string[] = [];
  let postSlugs: string[] = [];

  try {
    practiceAreaSlugs = await client.fetch(allPracticeAreaSlugsQuery);
    postSlugs = await client.fetch(allPostSlugsQuery);
  } catch {
    // Sanity not configured yet at build time — fall back to static routes only.
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about-us`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/our-mission`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact-us`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/nominate-an-attorney`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
  ];

  const practiceAreaRoutes: MetadataRoute.Sitemap = practiceAreaSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...practiceAreaRoutes, ...postRoutes];
}
