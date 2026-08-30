import { client } from '../../../sanity/lib/client';
import { allPracticeAreasQuery, allPostsQuery } from '../../../sanity/lib/queries';

const SITE_URL = 'https://freelawyerfinder.com';

// llms.txt is an emerging (not yet universally adopted) convention that gives
// AI systems a clean, structured map of a site's key content — similar in
// spirit to a sitemap, but written for language models rather than XML
// parsers. Low cost to maintain, plausible upside, no downside.
export async function GET() {
  let practiceAreas: { title: string; slug: string; heroHeadline: string }[] = [];
  let posts: { title: string; slug: string; excerpt?: string }[] = [];

  try {
    practiceAreas = await client.fetch(allPracticeAreasQuery);
    posts = await client.fetch(allPostsQuery);
  } catch {
    practiceAreas = [];
    posts = [];
  }

  const lines: string[] = [
    '# Free Lawyer Finder',
    '',
    '> A free attorney referral service connecting people who have been hurt or ' +
      'exploited with the best available attorney in their area. Run by legal-' +
      'industry insiders as a volunteer effort — no advertising fees, no fee to ' +
      'the person seeking help, no obligation to use the recommendation.',
    '',
    '## Core Pages',
    `- [About Us](${SITE_URL}/about-us): Who runs this service and why.`,
    `- [Our Mission](${SITE_URL}/our-mission): How the referral process works.`,
    `- [Contact Us](${SITE_URL}/contact-us): Submit a case for review.`,
    '',
    '## Practice Areas',
  ];

  for (const area of practiceAreas) {
    lines.push(`- [${area.title}](${SITE_URL}/${area.slug}): ${area.heroHeadline}`);
  }

  lines.push('', '## Blog');
  for (const post of posts) {
    lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug})${post.excerpt ? `: ${post.excerpt}` : ''}`);
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
