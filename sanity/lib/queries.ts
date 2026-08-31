import { groq } from 'next-sanity';

export const allPracticeAreasQuery = groq`
  *[_type == "practiceArea"] | order(title asc) {
    _id, title, "slug": slug.current, heroHeadline, isFree
  }
`;

export const practiceAreaBySlugQuery = groq`
  *[_type == "practiceArea" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, isFree, heroHeadline, heroSubhead,
    quickFacts, subNiches, whyMarketingMisleads, risksOfWrongLawyer,
    humanMatchingProcess, legalProcessSteps, videos, body,
    seoTitle, seoDescription, seoKeywords,
    faqs[]-> { _id, question, answer },
    relatedPosts[]-> { _id, title, "slug": slug.current, excerpt, coverImage, publishedAt }
  }
`;

export const allPracticeAreaSlugsQuery = groq`
  *[_type == "practiceArea" && defined(slug.current)][].slug.current
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, coverImage, publishedAt,
    "practiceArea": practiceArea->{ title, "slug": slug.current }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, excerpt, coverImage, body, publishedAt, updatedAt,
    seoTitle, seoDescription,
    faqs[]-> { _id, question, answer },
    "practiceArea": practiceArea->{ title, "slug": slug.current }
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle, tagline, defaultSeoDescription, logo, contactEmail, contactPhone,
    organizationType, socialLinks
  }
`;
