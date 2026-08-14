import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import type { SolutionGroup } from '@/data/solutions';

interface SolutionCardProps {
  group: SolutionGroup;
  /** Number of catalog services in this group, shown as context. */
  serviceCount: number;
}

export function SolutionCard({ group, serviceCount }: SolutionCardProps) {
  return (
    <article className="nx-card group h-full">
      <Link
        to={`/services?group=${group.id}`}
        className="flex h-full flex-col gap-5 p-6 sm:p-7"
        aria-label={`${group.title} — view services`}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
            <Icon name={group.icon} className="h-5 w-5" />
          </span>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-ink-faint transition-all duration-300 group-hover:text-brand-cyan"
            aria-hidden="true"
          />
        </div>

        <div className="mt-auto">
          <h3 className="text-[1.1875rem] font-extrabold tracking-tight">{group.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{group.summary}</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">
            {serviceCount} {serviceCount === 1 ? 'service' : 'services'}
          </p>
        </div>
      </Link>
    </article>
  );
}
