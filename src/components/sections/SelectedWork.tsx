import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button, ButtonLink } from '@/components/ui/Button';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Reveal } from '@/components/effects/Reveal';
import { featuredProjects, hasProjects } from '@/data/projects';
import { useInquiry } from '@/context/InquiryContext';

/**
 * Selected work. While `projects.ts` has no entries, this renders an honest
 * invitation rather than placeholder cards pretending to be case studies.
 */
export function SelectedWork() {
  const { openInquiry } = useInquiry();

  return (
    <section className="nx-section relative" aria-labelledby="selected-work-heading">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title={<span id="selected-work-heading">Built, deployed and supported</span>}
          description="A look at the kind of systems we build and the businesses they run."
          action={
            hasProjects ? (
              <ButtonLink to="/projects" variant="secondary">
                View All Projects
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </ButtonLink>
            ) : undefined
          }
        />

        {hasProjects ? (
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal as="li" key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-12 lg:mt-14">
            <div className="nx-card overflow-hidden">
              <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[1.35fr_1fr] lg:p-12">
                <div>
                  <h3 className="text-sub">Case studies are being prepared.</h3>
                  <p className="mt-4 max-w-prose text-lead text-ink-muted">
                    We would rather show you the real thing than a placeholder. Tell us what you
                    are building and we will walk you through work relevant to it — the problem,
                    the system we designed, and how it runs today.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button onClick={() => openInquiry()}>
                      Start a Conversation
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Button>
                    <ButtonLink to="/services" variant="secondary">
                      See What We Build
                    </ButtonLink>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="relative hidden aspect-[4/3] place-items-center rounded-2xl border border-hairline bg-[radial-gradient(circle_at_35%_25%,rgba(0,106,245,0.24),transparent_62%),radial-gradient(circle_at_75%_78%,rgba(123,31,255,0.2),transparent_60%)] lg:grid"
                >
                  <img
                    src="/brand/nexverr-symbol.png"
                    alt=""
                    width={72}
                    height={72}
                    className="h-16 w-16 opacity-40"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
