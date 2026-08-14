import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/effects/Reveal';
import { AmbientGlow } from '@/components/effects/AmbientGlow';
import { getProjectBySlug } from '@/data/projects';
import { useInquiry } from '@/context/InquiryContext';
import { useSeo } from '@/hooks/useSeo';

/** Only sections with real content render — nothing is padded out with filler. */
export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);
  const { openInquiry } = useInquiry();

  useSeo({
    title: project
      ? `${project.title} — NEXVERR TECHNOLOGIES`
      : 'Project not found — NEXVERR TECHNOLOGIES',
    description: project?.summary ?? 'This project could not be found.',
    path: `/projects/${slug}`,
    type: 'article',
    noIndex: !project,
  });

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-[calc(var(--nx-nav-height)+3rem)] lg:pt-[calc(var(--nx-nav-height)+4.5rem)]">
        <div aria-hidden="true" className="nx-grid-bg nx-mask-fade-b absolute inset-0 opacity-50" />
        <AmbientGlow className="-right-24 -top-32" tone="violet" size={520} />

        <Container className="relative">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>

          <Reveal className="mt-8 max-w-3xl">
            <p className="nx-eyebrow">{project.industry}</p>
            <h1 className="mt-5 text-section">{project.title}</h1>
            <p className="mt-6 max-w-prose text-lead text-ink-muted">{project.summary}</p>

            {project.tags.length > 0 ? (
              <ul className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-hairline px-3 py-1.5 text-xs font-bold text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </Container>
      </section>

      {project.image ? (
        <Container>
          <Reveal>
            <img
              src={project.image}
              alt={`${project.title} interface`}
              className="w-full rounded-2xl border border-hairline object-cover"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </Container>
      ) : null}

      <section className="nx-section-tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-10">
              {project.overview ? (
                <Reveal>
                  <h2 className="text-sub">Overview</h2>
                  <p className="mt-4 max-w-prose text-lead text-ink-muted">{project.overview}</p>
                </Reveal>
              ) : null}

              {project.challenge ? (
                <Reveal>
                  <h2 className="text-sub">Business challenge</h2>
                  <p className="mt-4 max-w-prose text-lead text-ink-muted">{project.challenge}</p>
                </Reveal>
              ) : null}

              {project.solution ? (
                <Reveal>
                  <h2 className="text-sub">Solution</h2>
                  <p className="mt-4 max-w-prose text-lead text-ink-muted">{project.solution}</p>
                </Reveal>
              ) : null}

              {project.features && project.features.length > 0 ? (
                <Reveal>
                  <h2 className="text-sub">Features</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 rounded-xl border border-hairline px-4 py-3"
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-cyan/15 text-brand-cyan">
                          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden="true" />
                        </span>
                        <span className="text-sm font-semibold text-ink">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>

            <aside className="flex flex-col gap-6">
              {project.technology && project.technology.length > 0 ? (
                <Reveal>
                  <div className="nx-card p-6">
                    <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                      Technology
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.technology.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-ink-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              {project.results && project.results.length > 0 ? (
                <Reveal delay={0.06}>
                  <div className="nx-card p-6">
                    <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                      Results
                    </h2>
                    <dl className="mt-4 flex flex-col gap-4">
                      {project.results.map((result) => (
                        <div key={result.label}>
                          <dt className="text-xs font-semibold text-ink-faint">{result.label}</dt>
                          <dd className="mt-1 text-lg font-extrabold tracking-tight text-ink">
                            {result.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={0.12}>
                <div className="nx-card p-6">
                  <h2 className="text-base font-extrabold tracking-tight">
                    Building something similar?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    Tell us how your operation runs and we will map what it would take.
                  </p>
                  <Button className="mt-5" fullWidth onClick={() => openInquiry()}>
                    Start Your Project
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </Reveal>
            </aside>
          </div>

          {project.screenshots && project.screenshots.length > 0 ? (
            <Reveal className="mt-14">
              <h2 className="text-sub">Screenshots</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((shot) => (
                  <li key={shot.src}>
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      className="w-full rounded-xl border border-hairline object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </Container>
      </section>
    </>
  );
}
