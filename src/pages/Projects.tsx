import { useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Reveal } from '@/components/effects/Reveal';
import { projects } from '@/data/projects';
import { useSeo } from '@/hooks/useSeo';
import { routeSeo } from '@/lib/routeSeo';
import { itemListJsonLd } from '@/lib/seo';

export default function Projects() {
  const seo = useMemo(
    () => ({
      ...routeSeo.projects,
      schema: [
        ...routeSeo.projects.schema,
        itemListJsonLd('Projects by NEXVERR TECHNOLOGIES', projects.map((project) => ({ name: project.title, path: `/projects/${project.slug}` }))),
      ],
    }),
    [],
  );

  useSeo(seo);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Real Businesses. Real Solutions. Built by NEXVERR."
        description="Explore selected digital projects built around real business requirements."
        breadcrumbs={routeSeo.projects.breadcrumbs}
      />

      <section className="nx-section-tight pt-0" aria-label="Project list">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal as="li" key={project.slug} delay={Math.min(index, 6) * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10">
            <p className="max-w-prose text-sm leading-relaxed text-ink-faint">
              Case studies are published here once the client is happy for the details to be
              shared. Where a figure or a screenshot is not yet confirmed, the page says nothing
              rather than filling the space.
            </p>
          </Reveal>
        </Container>
      </section>

      <StartYourProject
        title="Have a project in mind?"
        description="Let's discuss your business requirement."
        source="projects"
      />
    </>
  );
}
