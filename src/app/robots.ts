import type { MetadataRoute } from 'next';

const SITE_URL = 'https://freelawyerfinder.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // General rule for all crawlers, including standard search engines.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
      // Explicitly allow known AI/LLM crawlers. Many sites accidentally block
      // these with blanket bot-blocking rules — being explicitly permissive
      // here is what makes a site eligible to be cited by AI answer engines.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
