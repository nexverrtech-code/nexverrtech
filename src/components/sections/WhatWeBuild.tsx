import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { SolutionCard } from '@/components/cards/SolutionCard';
import { Reveal } from '@/components/effects/Reveal';
import { solutionGroups } from '@/data/solutions';
import { getServicesByGroup } from '@/data/services';

/**
 * Six capability groups instead of twenty service cards. The full catalog lives
 * on /services, which keeps the homepage answering one question at a time.
 */
export function WhatWeBuild() {
  return (
    <section className="nx-section relative" aria-labelledby="what-we-build-heading">
      <Container>
        <SectionHeading
          eyebrow="What We Build"
          title={<span id="what-we-build-heading">Technology for the way your business runs</span>}
          description="Six areas of work. Each one starts with what the business needs to get done, not with a technology we happen to like."
          action={
            <ButtonLink to="/services" variant="secondary">
              View All Services
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {solutionGroups.map((group, index) => (
            <Reveal as="li" key={group.id} delay={index * 0.06}>
              <SolutionCard group={group} serviceCount={getServicesByGroup(group.id).length} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
