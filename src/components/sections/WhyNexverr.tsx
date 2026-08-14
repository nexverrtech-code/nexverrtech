import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/effects/Reveal';
import { approachSteps } from '@/data/approach';
import { padIndex } from '@/lib/utils';

/**
 * The working method, as four steps on a single connected line:
 * Understand → Design → Build → Support.
 */
export function WhyNexverr() {
  return (
    <section className="nx-section relative" aria-labelledby="why-nexverr-heading">
      <Container>
        <SectionHeading
          eyebrow="Why NEXVERR"
          title={<span id="why-nexverr-heading">Technology That Starts With Your Business</span>}
          description="Software is the output. The work starts with understanding how you operate — and does not stop when the product goes live."
        />

        <div className="relative mt-14 lg:mt-16">
          {/* The connecting line, desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-brand-cyan/50 via-brand-blue/40 to-brand-purple/30 lg:block"
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {approachSteps.map((step, index) => (
              <Reveal as="li" key={step.id} delay={index * 0.08} className="relative">
                <span
                  aria-hidden="true"
                  className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-hairline bg-surface-deep text-sm font-extrabold tracking-wider text-brand-cyan"
                >
                  {padIndex(index)}
                </span>

                <h3 className="mt-5 text-[1.1875rem] font-extrabold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
