import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/effects/Reveal';
import { hasProjects, visibleProjects } from '@/data/projects';
import { useInquiry } from '@/context/InquiryContext';
import { useSeo } from '@/hooks/useSeo';
import { routeSeo } from '@/lib/routeSeo';

export default function Projects() {
  const { openInquiry } = useInquiry();

  useSeo(routeSeo.projects);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work we have built and still support"
        description="Case studies are published here once the client is happy for the details to be shared — the problem, the system, and how it runs today."
      />

      <section className="nx-section-tight" aria-label="Project list">
        <Container>
          {hasProjects ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project, index) => (
                <Reveal as="li" key={project.slug} delay={Math.min(index, 6) * 0.05}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal>
              <div className="nx-card px-6 py-14 text-center sm:px-10 sm:py-16">
                <img
                  src="/brand/nexverr-symbol.png"
                  alt=""
                  width={56}
                  height={56}
                  className="mx-auto h-14 w-14 opacity-45"
                  loading="lazy"
                  decoding="async"
                />

                <h2 className="mt-8 text-sub">Case studies are being prepared.</h2>
                <p className="mx-auto mt-4 max-w-prose text-lead text-ink-muted">
                  We would rather show you something real than fill this page with placeholders.
                  Tell us what you are working on and we will walk you through the systems we have
                  built for situations like it.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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
            </Reveal>
          )}
        </Container>
      </section>

      <StartYourProject />
    </>
  );
}
