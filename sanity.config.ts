import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Free Lawyer Finder CMS',
  projectId: 'wud5fj7s',
  dataset: 'production',
  plugins: [deskTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Singletons cannot be created again from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !['homePage', 'siteSettings'].includes(schemaType)),
  },
});
