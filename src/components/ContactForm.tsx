'use client';

import { useRef, useState } from 'react';

type Field = 'name' | 'email' | 'message';

const errorsFor: Record<Field, string> = {
  name: 'Write the name we should use.',
  email: 'Write an email address with an @, like name@example.com.',
  message: 'Write a few sentences about what happened.',
};

// The one form recipe: labels you can see, errors under their fields on submit, one status line,
// and a confirmation only after the server said it got the message.
export default function ContactForm({
  context,
  submitLabel = 'Request a free match',
  sentLine = 'Your match request is in. A person on our team will email you.',
  caseTypes,
}: {
  context?: string;
  submitLabel?: string;
  sentLine?: string;
  caseTypes?: string[];
}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const found: Partial<Record<Field, string>> = {};
    if (!data.name?.trim()) found.name = errorsFor.name;
    if (!/^\S+@\S+\.\S+$/.test(data.email || '')) found.email = errorsFor.email;
    if (!data.message?.trim()) found.message = errorsFor.message;
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus('submitting');
    try {
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

  const input =
    'h-12 w-full rounded-[6px] border border-ink/30 bg-paper px-3 text-base text-ink aria-[invalid=true]:border-2 aria-[invalid=true]:border-[#a3261b]';
  const err = 'text-[14px] font-medium text-[#a3261b]';
  const count = Object.keys(errors).length;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-[14px] font-medium">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} className={input} />
        {errors.name && <p id="name-err" className={err}>{errors.name}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-[14px] font-medium">Email</label>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} className={input} />
        {errors.email && <p id="email-err" className={err}>{errors.email}</p>}
      </div>
      {caseTypes && caseTypes.length > 0 && (
        <div className="grid gap-2">
          <label htmlFor="caseType" className="text-[14px] font-medium">Type of case</label>
          <select id="caseType" name="caseType" defaultValue="" className={input}>
            <option value="">Not sure</option>
            {caseTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}
      <div className="grid gap-2">
        <label htmlFor="message" className="text-[14px] font-medium">What happened</label>
        <textarea id="message" name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} className={`${input} h-auto min-h-[200px] py-3`} />
        {errors.message && <p id="message-err" className={err}>{errors.message}</p>}
      </div>
      <div>
        <button type="submit" disabled={status === 'submitting'} className="btn btn-primary w-full sm:w-auto">
          {submitLabel}
        </button>
        <p role="status" className="mt-3 min-h-[1.5em] text-[15px]">
          {count > 0 && `${count === 1 ? 'One field needs' : `${count} fields need`} a fix.`}
          {status === 'submitting' && 'Sending…'}
          {status === 'sent' && sentLine}
          {status === 'error' && 'That did not send. Your words are still here; please try again.'}
        </p>
      </div>
    </form>
  );
}
