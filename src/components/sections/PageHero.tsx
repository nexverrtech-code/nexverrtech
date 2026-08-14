import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/effects/Reveal';
import { AmbientGlow } from '@/components/effects/AmbientGlow';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Shared masthead for every inner page — one implementation, one rhythm. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-14 pt-[calc(var(--nx-nav-height)+3.5rem)] sm:pb-16 lg:pb-20 lg:pt-[calc(var(--nx-nav-height)+5rem)]">
      <div aria-hidden="true" className="nx-grid-bg nx-mask-fade-b absolute inset-0 opacity-50" />
      <AmbientGlow className="-right-32 -top-40" tone="blue" size={560} />

      <Container className="relative">
        <Reveal className="max-w-3xl">
          <p className="nx-eyebrow">
            <span aria-hidden="true" className="h-px w-8 bg-brand-cyan/60" />
            {eyebrow}
          </p>
          <h1 className="mt-6 text-section">{title}</h1>
          {description ? (
            <p className="mt-6 max-w-prose text-lead text-ink-muted">{description}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
