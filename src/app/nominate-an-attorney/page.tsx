import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Nominate an Attorney',
  description:
    'Know a great attorney who does right by their clients? Nominate them to be part of our free referral network.',
};

export default function NominateAttorneyPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Nominate an Attorney</h1>
      <p className="mt-3 text-charcoal/80">
        Know a lawyer who consistently does right by their clients — not just
        someone who advertises well? Tell us about them, and we&apos;ll
        consider them for our referral network.
      </p>
      <div className="mt-10">
        <ContactForm context="Attorney Nomination" submitLabel="Send the nomination" sentLine="Your nomination is in. Thank you." />
      </div>
    </section>
  );
}
