import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import type { Service } from '@/data/services';
import { solutionGroupMap } from '@/data/solutions';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="nx-card group h-full">
      <Link to={`/services/${service.slug}`} className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
            <Icon name={service.icon} className="h-[1.125rem] w-[1.125rem]" />
          </span>
          <span className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
            {solutionGroupMap[service.group].title}
          </span>
        </div>

        <h3 className="text-[1.0625rem] font-extrabold leading-snug tracking-tight text-white">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">{service.summary}</p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-brand-cyan">
          Details
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>
    </article>
  );
}
