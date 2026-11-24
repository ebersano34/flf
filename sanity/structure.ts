import type { StructureResolver } from 'sanity/desk';

// The Home Page and Site Settings are single documents: they open directly, with no list.
const singletons = ['homePage', 'siteSettings'];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Home Page').id('homePage').child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem().title('Site Settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletons.includes(item.getId() as string)),
    ]);
