import { useMemo, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { Reveal } from '@/components/effects/Reveal';
import { AmbientGlow } from '@/components/effects/AmbientGlow';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { NotFoundContent } from '@/components/sections/NotFoundContent';
import { getProjectBySlug } from '@/data/projects';
import { serviceMap } from '@/data/services';
import { industryMap } from '@/data/industries';
import { useInquiry } from '@/context/InquiryContext';
import { useSeo } from '@/hooks/useSeo';
import { notFoundSeo, projectSeo } from '@/lib/routeSeo';
import { track } from '@/lib/analytics';
import { padIndex } from '@/lib/utils';

interface CaseSectionProps {
  /** Sequential number shown in the left rail. */
  index: number;
  id: string;
  title: string;
  children: ReactNode;
}

/**
 * One numbered chapter of the case study: number and heading in a left rail,
 * content on the right. An editorial layout rather than another card grid, and
 * the same rhythm all the way down the page.
 */
function CaseSection({ index, id, title, children }: CaseSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-t border-hairline py-12 lg:py-16"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-16">
        <Reveal>
          <p className="text-xs font-extrabold tracking-[0.22em] text-brand-cyan">
            {padIndex(index - 1)}
          </p>
          <h2 id={`${id}-heading`} className="mt-3 text-sub">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.06}>{children}</Reveal>
      </div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex max-w-prose flex-col gap-4 text-lead text-ink-muted">
      {items.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </div>
  );
}

/** Only sections with real, verified content render — nothing is padded out. */
export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);
  const { openInquiry } = useInquiry();

  const seo = useMemo(
    () => (project ? projectSeo(project) : { ...notFoundSeo, path: `/projects/${slug}` }),
    [project, slug],
  );

  useSeo(seo);

  if (!project) return <NotFoundContent />;

  const relatedServices = project.relatedServices
    .map((serviceSlug) => serviceMap[serviceSlug])
    .filter(Boolean);
  const relatedIndustry = project.relatedIndustry
    ? industryMap[project.relatedIndustry]
    : undefined;

  // Numbering follows what actually renders, so the sequence never skips.
  let step = 0;
  const next = () => (step += 1);

  const facts = [
    { label: 'Client', value: project.client },
    { label: 'Location', value: project.location },
    { label: 'Industry', value: project.industry },
    { label: 'Project type', value: project.projectType },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-[calc(var(--nx-nav-height)+2.5rem)] lg:pb-16 lg:pt-[calc(var(--nx-nav-height)+4rem)]">
        <div aria-hidden="true" className="nx-grid-bg nx-mask-fade-b absolute inset-0 opacity-50" />
        <AmbientGlow className="-right-24 -top-32" tone="violet" size={520} />

        <Container className="relative">
          <Breadcrumbs items={seo.breadcrumbs ?? []} className="mb-8" />

          <Reveal className="max-w-3xl">
            <p className="nx-eyebrow">
              <span aria-hidden="true" className="h-px w-8 bg-brand-cyan/60" />
              {project.projectType}
            </p>

            <h1 className="mt-6 text-section">{project.client}</h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-bold text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
                {project.location}
              </span>
              <span aria-hidden="true" className="text-ink-faint">
                /
              </span>
              <span>{project.industry}</span>
            </p>

            <p className="mt-6 max-w-prose text-lead text-ink-muted">{project.summary}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-surface-deep px-5 py-5">
                  <dt className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm font-extrabold tracking-tight text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <Container>
        <Reveal as="figure" className="overflow-hidden rounded-3xl border border-hairline">
          <SmartImage
            src={project.screenshots?.[0]?.src}
            alt={project.screenshots?.[0]?.alt ?? `${project.client} — project`}
            width={1600}
            // A real screenshot gets the full 16:9 frame. The branded stand-in
            // does not need to be that tall, and a 700px panel of nothing at the
            // top of a case study reads as a missing image.
            height={project.screenshots?.[0] ? 900 : 520}
            priority
            frameClassName="rounded-none border-0"
            sizes="(min-width: 1320px) 1280px, 100vw"
          />
        </Reveal>
      </Container>

      <Container className="pb-4">
        <CaseSection index={next()} id="about-client" title="About the client">
          <Paragraphs items={[project.about]} />
        </CaseSection>

        {project.challenge ? (
          <CaseSection index={next()} id="challenge" title="Business challenge">
            <Paragraphs items={project.challenge} />
          </CaseSection>
        ) : null}

        {project.solution ? (
          <CaseSection index={next()} id="solution" title="The NEXVERR solution">
            <Paragraphs items={project.solution} />
          </CaseSection>
        ) : null}

        {project.experience ? (
          <CaseSection index={next()} id="experience" title="Project experience">
            <Paragraphs items={project.experience} />
          </CaseSection>
        ) : null}

        {project.features && project.features.length > 0 ? (
          <CaseSection index={next()} id="features" title="Key features">
            <ul className="grid gap-3 sm:grid-cols-2">
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
          </CaseSection>
        ) : null}

        {project.technology && project.technology.length > 0 ? (
          <CaseSection index={next()} id="technology" title="Technology">
            <ul className="flex flex-wrap gap-2">
              {project.technology.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-hairline px-3.5 py-2 text-xs font-bold text-ink-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </CaseSection>
        ) : null}

        {project.screenshots && project.screenshots.length > 1 ? (
          <CaseSection index={next()} id="screenshots" title="Project screenshots">
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.screenshots.slice(1).map((shot) => (
                <li key={shot.src}>
                  <figure>
                    <SmartImage
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      className="rounded-xl border border-hairline"
                      sizes="(min-width: 640px) 45vw, 100vw"
                    />
                    {shot.caption ? (
                      <figcaption className="mt-2 text-xs text-ink-faint">{shot.caption}</figcaption>
                    ) : null}
                  </figure>
                </li>
              ))}
            </ul>
          </CaseSection>
        ) : null}

        {project.outcome && project.outcome.length > 0 ? (
          <CaseSection index={next()} id="outcome" title="Project outcome">
            <dl className="grid gap-5 sm:grid-cols-2">
              {project.outcome.map((item) => (
                <div key={item.label} className="nx-card p-5">
                  <dt className="text-xs font-semibold text-ink-faint">{item.label}</dt>
                  <dd className="mt-1.5 text-lg font-extrabold tracking-tight text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </CaseSection>
        ) : null}

        {relatedServices.length > 0 ? (
          <CaseSection index={next()} id="related-services" title="Related services">
            <ul className="grid gap-3 sm:grid-cols-2">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="nx-card group flex h-full flex-col gap-1.5 p-5"
                  >
                    <span className="flex items-center justify-between gap-3 text-[0.9375rem] font-extrabold tracking-tight text-ink">
                      {service.title}
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-cyan"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-muted">{service.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {relatedIndustry ? (
              <p className="mt-6 text-sm font-semibold text-ink-muted">
                Related industry:{' '}
                <Link
                  to={`/solutions/${relatedIndustry.slug}`}
                  className="font-bold text-brand-cyan transition-opacity duration-200 hover:opacity-80"
                >
                  {relatedIndustry.name} solutions
                </Link>
              </p>
            ) : null}
          </CaseSection>
        ) : null}

        <CaseSection index={next()} id="start" title="Start your project">
          <p className="max-w-prose text-lead text-ink-muted">
            If you run a business like this one, the starting point is the same: a conversation
            about how it actually works today.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                track('project_cta_click', { project: project.slug, source: 'case-study' });
                openInquiry();
              }}
            >
              Start a Project
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-full border border-hairline px-6 text-[0.9375rem] font-bold text-ink-muted transition-colors duration-300 hover:border-white/20 hover:text-ink"
            >
              All projects
            </Link>
          </div>
        </CaseSection>
      </Container>
    </>
  );
}
