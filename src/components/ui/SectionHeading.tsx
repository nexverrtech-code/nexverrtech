import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/effects/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** Rendered to the right of the heading on wide screens (e.g. a "view all" link). */
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  action,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between',
        centered && 'lg:flex-col lg:items-center',
        className,
      )}
    >
      <Reveal className={cn('max-w-2xl', centered && 'mx-auto text-center')}>
        {eyebrow ? (
          <p className="nx-eyebrow mb-4">
            <span aria-hidden="true" className="h-px w-6 bg-brand-cyan/60" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-section">{title}</h2>
        {description ? (
          <p className={cn('mt-5 text-lead text-ink-muted', centered && 'mx-auto')}>{description}</p>
        ) : null}
      </Reveal>

      {action ? (
        <Reveal delay={0.1} className={cn('shrink-0', centered && 'mx-auto')}>
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
