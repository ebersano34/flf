'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from './Icon';

type Item = { label: string; href: string };

// Under 1024px the nav words move into a full-screen sheet behind one menu button.
export default function MobileMenu({ items, action }: { items: Item[]; action: Item }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Menu'}
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-btn bg-surface"
      >
        <Icon name={open ? 'x' : 'menu'} size={20} />
      </button>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[var(--nav)] z-30 flex flex-col bg-paper">
          <nav aria-label="Menu" className="wrap flex flex-1 flex-col pt-2">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="flex h-14 items-center border-b border-ink/15 text-lg no-underline"
              >
                {it.label}
              </Link>
            ))}
          </nav>
          <div className="wrap pb-8 pt-4">
            <Link href={action.href} onClick={() => setOpen(false)} className="btn btn-primary w-full">
              {action.label}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
