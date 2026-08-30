'use client';

import { useState } from 'react';

export default function ContactForm({ context }: { context?: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // Wire this up to Formspree, a Next.js API route, or your intake CRM.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, context }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-md border border-sage/30 bg-sage/10 p-6 text-sage">
        <p className="font-medium">Thank you — we received your information.</p>
        <p className="mt-1 text-sm text-charcoal/80">
          Our team reviews every submission personally and will reach out as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-ink/20 px-4 py-2 focus:border-amber"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-ink/20 px-4 py-2 focus:border-amber"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
          Tell us what happened
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-md border border-ink/20 px-4 py-2 focus:border-amber"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-md bg-amber px-6 py-3 font-medium text-ink-dark hover:bg-amber-dark disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong sending this. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
