import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Tell us what happened and we will do our best to connect you with the right attorney — free, with no obligation.',
};

export default function ContactUsPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Contact Us</h1>
      <p className="mt-3 text-charcoal/80">
        Have another legal issue — criminal defense, family law, or something
        else? We still may be able to help. Our service is always free to you,
        though attorneys in these areas typically charge a fee. Let us know
        what&apos;s going on and we&apos;ll do our best to connect you with
        someone in your area.
      </p>
      <div className="mt-10">
        <ContactForm context="Contact page" submitLabel="Send your message" sentLine="Your message is in. A person on our team will email you." />
      </div>
    </section>
  );
}
