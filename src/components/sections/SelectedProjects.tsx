import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Reveal } from '@/components/effects/Reveal';
import { featuredProjects, hasProjects } from '@/data/projects';

/**
 * Selected work on the homepage. Deliberately short — two cards and a way
 * through to the full list, so the homepage keeps moving.
 */
export function SelectedProjects() {
  if (!hasProjects) return null;

  return (
    <section className="nx-section relative" aria-labelledby="selected-projects-heading">
      <Container>
        <SectionHeading
          eyebrow="Selected Projects"
          title={<span id="selected-projects-heading">Built for Real Businesses.</span>}
          description="From business websites to digital platforms, NEXVERR builds technology around the way businesses actually work."
          action={
            <ButtonLink to="/projects" variant="secondary">
              View All Projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14">
          {featuredProjects.slice(0, 2).map((project, index) => (
            <Reveal as="li" key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} source="home" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
