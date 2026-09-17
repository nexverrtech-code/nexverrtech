import { Plus } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/effects/Reveal';
import type { Faq } from '@/data/faq';

interface FaqSectionProps {
  faqs: Faq[];
  title?: string;
  /** Unique id so more than one section can never collide on a page. */
  id?: string;
  description?: string;
}

/**
 * Questions people actually ask, as native `<details>` elements.
 *
 * Built on the platform's own disclosure element rather than a custom
 * accordion: keyboard support, screen-reader semantics and find-in-page all
 * work without a line of JavaScript, and the answers stay in the HTML, which is
 * what makes the matching FAQ structured data honest.
 */
export function FaqSection({ faqs, title = 'Common questions', id = 'faq', description }: FaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="nx-section-tight" aria-labelledby={`${id}-heading`}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <h2 id={`${id}-heading`} className="text-sub">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
                {description}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="flex flex-col">
              {faqs.map((faq) => (
                <li key={faq.question} className="border-b border-hairline first:border-t">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[0.9375rem] font-bold text-ink transition-colors duration-200 hover:text-brand-cyan [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <Plus
                        className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 ease-smooth group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="max-w-prose pb-6 pr-8 text-sm leading-relaxed text-ink-muted">
                      {faq.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
