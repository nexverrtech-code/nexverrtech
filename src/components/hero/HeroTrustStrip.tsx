import { Check } from 'lucide-react';
import { capabilityStatements } from '@/data/approach';

/**
 * Capability statements, not metrics. No client counts, ratings or badges
 * appear anywhere on this site until there are verified numbers behind them.
 */
export function HeroTrustStrip() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3">
      {capabilityStatements.map((statement) => (
        <li
          key={statement}
          className="flex items-center gap-2 text-[0.8125rem] font-semibold text-ink-muted"
        >
          <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-cyan/15 text-brand-cyan">
            <Check className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden="true" />
          </span>
          {statement}
        </li>
      ))}
    </ul>
  );
}
