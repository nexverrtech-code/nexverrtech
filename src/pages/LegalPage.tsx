import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/effects/Reveal';
import type { LegalDocument } from '@/data/legal';
import type { Crumb } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

interface LegalPageProps {
  document: LegalDocument;
  breadcrumbs?: Crumb[];
  /** The other legal page, linked at the foot. */
  counterpart: { label: string; to: string };
}

/** Shared layout for the two legal documents — one implementation, one rhythm. */
export function LegalPage({ document, breadcrumbs, counterpart }: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={document.title}
        description={document.summary}
        breadcrumbs={breadcrumbs}
      >
        <p className="text-sm font-semibold text-ink-faint">
          Effective from{' '}
          <time dateTime={document.effectiveDate}>{formatDate(document.effectiveDate)}</time>
        </p>
      </PageHero>

      <section className="nx-section-tight pt-0" aria-label={document.title}>
        <Container>
          <div className="max-w-prose">
            {document.sections.map((section, index) => (
              <Reveal key={section.heading} className={index === 0 ? '' : 'mt-11'}>
                <h2 className="text-sub">{section.heading}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.4375rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-muted">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}

            <Reveal className="mt-14 border-t border-hairline pt-8">
              <p className="text-sm font-semibold text-ink-muted">
                See also{' '}
                <Link
                  to={counterpart.to}
                  className="font-bold text-brand-cyan transition-opacity duration-200 hover:opacity-80"
                >
                  {counterpart.label}
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
