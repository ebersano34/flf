import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Falls back to a placeholder so builds/pages don't hard-crash before you've
// set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local (or in Vercel). Once set,
// this picks up your real project automatically. Until then, every page that
// fetches from Sanity is already wrapped in try/catch and will render with
// empty/fallback content instead of erroring.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast, cached reads — content updates propagate within ~60s
});

const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}
