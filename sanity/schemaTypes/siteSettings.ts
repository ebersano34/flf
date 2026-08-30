import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string', initialValue: 'Free Lawyer Finder' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'defaultSeoDescription', title: 'Default Meta Description', type: 'text', rows: 2 }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'contactPhone', title: 'Contact Phone', type: 'string' }),
    defineField({
      name: 'organizationType',
      title: 'Schema.org Organization Type',
      type: 'string',
      description: 'Used for structured data. This site is a referral service, not a law firm itself.',
      initialValue: 'LegalService',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'url' }],
    }),
  ],
  preview: {
    select: { title: 'siteTitle' },
  },
});
