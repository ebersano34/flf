import Icon from '../Icon';
import type { HomeContent } from '@/lib/homeDefaults';

type Diagram = HomeContent['diagram'];

function Node({ icon, label, sub }: { icon: string; label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[10px] border border-ink/10 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(24,23,21,.06)]">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md border border-ink/10 bg-paper text-ink">
        <Icon name={icon} size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-medium leading-tight">{label}</span>
        {sub && <span className="block text-[12.5px] leading-tight text-muted">{sub}</span>}
      </span>
    </div>
  );
}

function Core({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[10px] border border-ink/10 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(24,23,21,.06)]">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-amber text-ink">
        <Icon name="user-check" size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-medium leading-tight">{label}</span>
        {sub && <span className="block text-[12.5px] leading-tight text-muted">{sub}</span>}
      </span>
    </div>
  );
}

// A still diagram: the request goes to a person, who matches it to one of three kinds of case.
// Drawn in HTML and one SVG of lines, so it needs no script and scales with its frame.
export default function MatchDiagram({ d }: { d: Diagram }) {
  const alt = `${d.inputLabel} goes to ${d.coreLabel}, who matches it to an attorney for the exact kind of case: ${d.lanes
    .map((l) => `${l.label.toLowerCase()} (${l.sub.toLowerCase()})`)
    .join(', ')}.`;
  return (
    <figure role="img" aria-label={alt} className="m-0 h-full w-full">
      {/* desktop and tablet: left to right */}
      <div className="relative hidden h-full min-h-[360px] sm:block">
        {/* the connecting lines, as hairline boxes */}
        <span aria-hidden="true" className="absolute left-[33%] top-1/2 h-px w-[11%] bg-ink/30" />
        <span aria-hidden="true" className="absolute left-[56%] top-1/2 h-px w-[6%] bg-amber-dark/70" />
        <span aria-hidden="true" className="absolute left-[62%] top-[25%] h-[50%] w-px bg-amber-dark/70" />
        {[25, 50, 75].map((t) => (
          <span key={t} aria-hidden="true" className="absolute left-[62%] h-px w-[6%] bg-amber-dark/70" style={{ top: `${t}%` }} />
        ))}
        <div className="absolute left-[4%] top-1/2 w-[29%] -translate-y-1/2">
          <Node icon="file-text" label={d.inputLabel} sub={d.inputSub} />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Core label={d.coreLabel} sub={d.coreSub} />
        </div>
        {d.lanes.map((l, i) => (
          <div key={l.label + i} className="absolute left-[68%] w-[28%] -translate-y-1/2" style={{ top: `${25 + i * 25}%` }}>
            <Node icon={l.icon} label={l.label} sub={l.sub} />
          </div>
        ))}
      </div>
      {/* phone: the person, then the three kinds of case */}
      <div className="flex flex-col gap-3 sm:hidden">
        <Core label={d.coreLabel} sub={d.coreSub} />
        <div className="grid grid-cols-3 gap-2">
          {d.lanes.map((l, i) => (
            <div key={l.label + i} className="flex flex-col items-center gap-1 rounded-[10px] border border-ink/10 bg-white px-1 py-2 text-center">
              <Icon name={l.icon} size={18} />
              <span className="text-[13px] font-medium leading-tight">{l.label}</span>
              <span className="text-[12px] leading-tight text-muted">{l.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
