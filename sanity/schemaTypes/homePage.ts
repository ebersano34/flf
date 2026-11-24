import { defineArrayMember, defineField, defineType } from 'sanity';
import { homeDefaults } from '../../src/lib/homeDefaults';

// The home page, as one document. Every field starts with the redesign's copy, so a new
// document is already a finished page; the site also falls back to the same copy
// (src/lib/homeDefaults.ts) until this document is published.
export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'sections', title: 'Sections' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroKicker',
      title: 'Line above the headline',
      type: 'string',
      group: 'hero',
      description: 'One short line with a hard fact, e.g. "$0 to you, and no obligation to use the match".',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Headline (H1)',
      type: 'string',
      group: 'hero',
      description: 'Name the service and who it is for, in plain words. 45 characters at most so it stays on three lines.',
      validation: (Rule) => Rule.required().max(45),
    }),
    defineField({
      name: 'heroLead',
      title: 'Line under the headline',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'How it works and the main benefit, 15 to 30 words.',
    }),
    defineField({ name: 'primaryCtaLabel', title: 'Main button', type: 'string', group: 'hero', description: 'The same words in the header, the hero, the form and the close.' }),
    defineField({ name: 'secondaryCtaLabel', title: 'Second button', type: 'string', group: 'hero' }),
    defineField({
      name: 'diagram',
      title: 'Matching diagram',
      type: 'object',
      group: 'hero',
      description: 'The picture beside the headline: a request, the person who reads it, and three kinds of case.',
      fields: [
        { name: 'inputLabel', title: 'Left node', type: 'string' },
        { name: 'inputSub', title: 'Left node, small line', type: 'string' },
        { name: 'coreLabel', title: 'Middle node', type: 'string' },
        { name: 'coreSub', title: 'Middle node, small line', type: 'string' },
        {
          name: 'lanes',
          title: 'Right nodes (three)',
          type: 'array',
          validation: (Rule) => Rule.length(3),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'lane',
              fields: [
                { name: 'label', title: 'Kind of case', type: 'string' },
                { name: 'sub', title: 'Kind of lawyer', type: 'string' },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: { list: ['truck', 'stethoscope', 'briefcase', 'pill', 'scale', 'house'] },
                },
              ],
              preview: { select: { title: 'label', subtitle: 'sub' } },
            }),
          ],
        },
      ],
    }),
    defineField({ name: 'statementLabel', title: 'Statement label', type: 'string', group: 'sections' }),
    defineField({
      name: 'statementText',
      title: 'Statement',
      type: 'text',
      rows: 3,
      group: 'sections',
      description: '12 to 40 words. It darkens word by word as visitors scroll past.',
    }),
    defineField({
      name: 'statementHighlight',
      title: 'Words to stress in the statement',
      type: 'string',
      group: 'sections',
      description: 'Copy these words exactly as they appear in the statement.',
    }),
    defineField({ name: 'casesHeading', title: 'Case types heading', type: 'string', group: 'sections' }),
    defineField({
      name: 'casesIntro',
      title: 'Case types intro',
      type: 'text',
      rows: 2,
      group: 'sections',
      description: 'The rows come from the Practice Area documents (title, home page summary, free or fee-based).',
    }),
    defineField({ name: 'introVideoUrl', title: 'Video beside the case types (YouTube URL)', type: 'url', group: 'sections' }),
    defineField({ name: 'faqHeading', title: 'Questions heading', type: 'string', group: 'sections' }),
    defineField({ name: 'faqIntro', title: 'Questions intro (who we are)', type: 'text', rows: 3, group: 'sections' }),
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      group: 'sections',
      description: 'Five or six. Leave empty to show the built-in questions.',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }],
    }),
    defineField({ name: 'videosHeading', title: 'Videos heading', type: 'string', group: 'sections' }),
    defineField({ name: 'videosIntro', title: 'Videos intro', type: 'string', group: 'sections' }),
    defineField({
      name: 'videos',
      title: 'Videos (three)',
      type: 'array',
      group: 'sections',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'homeVideo',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'One line', type: 'string' },
            { name: 'url', title: 'YouTube URL', type: 'url' },
          ],
          preview: { select: { title: 'title', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({ name: 'formHeading', title: 'Form heading', type: 'string', group: 'sections' }),
    defineField({ name: 'formIntro', title: 'Form intro', type: 'text', rows: 2, group: 'sections' }),
    defineField({
      name: 'formSteps',
      title: 'What happens next (steps beside the form)',
      type: 'array',
      group: 'sections',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({ name: 'closeHeading', title: 'Closing heading', type: 'string', group: 'sections' }),
    defineField({ name: 'closeLine', title: 'Closing line', type: 'string', group: 'sections' }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      group: 'seo',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters.'),
    }),
  ],
  // A new Home Page document opens filled with the redesign's copy (questions are references, so they start empty).
  initialValue: () => {
    const { faqs, diagram, ...rest } = homeDefaults;
    return { ...rest, diagram: { ...diagram, lanes: diagram.lanes.map((l, i) => ({ _key: `lane${i}`, _type: 'lane', ...l })) }, videos: homeDefaults.videos.map((v, i) => ({ _key: `video${i}`, _type: 'homeVideo', ...v })) };
  },
  preview: { prepare: () => ({ title: 'Home Page' }) },
});
