import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/effects/Reveal';
import { AmbientGlow } from '@/components/effects/AmbientGlow';
import { industries } from '@/data/industries';

/**
 * Industries as compact chips rather than ten cards — enough for a visitor to
 * recognise themselves, without turning into a second services section.
 */
export function SolutionsIndustries() {
  return (
    <section className="nx-section relative overflow-hidden" aria-labelledby="industries-heading">
      <AmbientGlow className="-left-40 top-10" tone="violet" size={520} />

      <Container className="relative">
        <SectionHeading
          eyebrow="Solutions"
          title={<span id="industries-heading">Solutions Built Around Your Business</span>}
          description="From retail and education to healthcare, hospitality and manufacturing, we build solutions around the way your business works."
          action={
            <ButtonLink to="/solutions" variant="secondary">
              Explore Solutions
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {industries.map((industry, index) => (
            <Reveal as="li" key={industry.slug} delay={index * 0.03}>
              <div className="nx-card flex h-full items-center gap-3 px-4 py-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
                  <Icon name={industry.icon} className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold tracking-tight">{industry.name}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
