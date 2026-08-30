import { PortableText } from '@portabletext/react';
import JsonLd from './JsonLd';

type Faq = {
  _id: string;
  question: string;
  answer: any;
};

// Flattens portable text blocks to plain text for the structured-data answer field.
function blocksToPlainText(blocks: any): string {
  if (!blocks) return '';
  return blocks
    .map((block: any) =>
      block._type === 'block' ? (block.children || []).map((c: any) => c.text).join('') : ''
    )
    .join(' ')
    .trim();
}

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: blocksToPlainText(faq.answer),
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd data={faqJsonLd} />
      <h2 id="faq-heading" className="mb-6 text-2xl font-semibold">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-ink/10">
        {faqs.map((faq) => (
          <details key={faq._id} className="group py-4">
            <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
              <span className="flex items-center justify-between">
                {faq.question}
                <span className="ml-4 text-amber transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <div className="prose prose-sm mt-3 max-w-none text-charcoal/90">
              <PortableText value={faq.answer} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
