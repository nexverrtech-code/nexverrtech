import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/effects/Reveal';

export interface RelatedLink {
  label: string;
  to: string;
  description?: string;
  /** Small label above the title, e.g. "Service" or "Industry". */
  kind?: string;
}

interface RelatedLinksProps {
  title: string;
  description?: string;
  links: RelatedLink[];
  id?: string;
}

/**
 * Internal links, only ever rendered from a genuine relationship in the data —
 * a service an industry actually uses, a project that really involved that
 * service. Nothing here is generated to spread link equity around.
 */
export function RelatedLinks({ title, description, links, id = 'related' }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="nx-section-tight" aria-labelledby={`${id}-heading`}>
      <Container>
        <Reveal>
          <h2 id={`${id}-heading`} className="text-sub">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">{description}</p>
          ) : null}
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link, index) => (
            <Reveal as="li" key={link.to} delay={Math.min(index, 6) * 0.05}>
              <article className="nx-card group h-full">
                <Link to={link.to} className="flex h-full flex-col gap-2 p-5 sm:p-6">
                  {link.kind ? (
                    <span className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                      {link.kind}
                    </span>
                  ) : null}

                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[1.0625rem] font-extrabold leading-snug tracking-tight text-ink">
                      {link.label}
                    </h3>
                    <ArrowUpRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-brand-cyan"
                      aria-hidden="true"
                    />
                  </div>

                  {link.description ? (
                    <p className="text-sm leading-relaxed text-ink-muted">{link.description}</p>
                  ) : null}
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
