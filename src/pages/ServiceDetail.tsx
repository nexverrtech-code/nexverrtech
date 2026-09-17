import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/effects/Reveal';
import { AmbientGlow } from '@/components/effects/AmbientGlow';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { FaqSection } from '@/components/sections/FaqSection';
import { RelatedLinks } from '@/components/sections/RelatedLinks';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { NotFoundContent } from '@/components/sections/NotFoundContent';
import { getServicesByGroup, serviceMap } from '@/data/services';
import { getServiceContent } from '@/data/serviceContent';
import { getIndustriesForService } from '@/data/industries';
import { getProjectsForService } from '@/data/projects';
import { getPostsForService } from '@/data/blog';
import { solutionGroupMap } from '@/data/solutions';
import { approachSteps } from '@/data/approach';
import { useSeo } from '@/hooks/useSeo';
import { notFoundSeo, serviceSeo } from '@/lib/routeSeo';
import { useInquiry } from '@/context/InquiryContext';
import { track } from '@/lib/analytics';
import { padIndex } from '@/lib/utils';

export default function ServiceDetail() {
  const { slug = '' } = useParams();
  const service = serviceMap[slug];
  const { openInquiry } = useInquiry();

  // `seoTitle` and `metaDescription` are written per service so no two pages
  // compete for the same query or share a search snippet. An unknown slug gets
  // the not-found page rather than inheriting a real service's metadata.
  const seo = useMemo(
    () =>
      service
        ? serviceSeo(service, getServiceContent(service.slug).faqs ?? [])
        : { ...notFoundSeo, path: `/services/${slug}` },
    [service, slug],
  );

  useSeo(seo);

  if (!service) return <NotFoundContent />;

  const group = solutionGroupMap[service.group];
  const content = getServiceContent(service.slug);
  const related = getServicesByGroup(service.group)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);
  const industries = getIndustriesForService(service.slug);
  const caseStudies = getProjectsForService(service.slug);
  const articles = getPostsForService(service.slug);

  const startInquiry = () => {
    track('service_cta_click', { service: service.slug });
    openInquiry(service.title);
  };

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-[calc(var(--nx-nav-height)+2.5rem)] lg:pb-16 lg:pt-[calc(var(--nx-nav-height)+4rem)]">
        <div aria-hidden="true" className="nx-grid-bg nx-mask-fade-b absolute inset-0 opacity-50" />
        <AmbientGlow className="-right-24 -top-32" tone="cyan" size={520} />

        <Container className="relative">
          <Breadcrumbs items={seo.breadcrumbs ?? []} className="mb-8" />

          <Reveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
                <Icon name={service.icon} className="h-5 w-5" />
              </span>
              <Link
                to={`/services?group=${group.id}`}
                className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint transition-colors duration-200 hover:text-ink-muted"
              >
                {group.title}
              </Link>
            </div>

            <h1 className="mt-6 text-section">{service.title}</h1>
            <p className="mt-6 max-w-prose text-lead text-ink-muted">
              {content.intro ?? service.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={startInquiry}>
                Start a Project
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              <ButtonLink
                to="/contact"
                variant="secondary"
                onClick={() => track('contact_click', { source: `service-${service.slug}` })}
              >
                Talk to NEXVERR
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {content.problem || content.solution ? (
        <section className="nx-section-tight" aria-labelledby="problem-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {content.problem ? (
                <Reveal>
                  <h2 id="problem-heading" className="text-sub">
                    The problem
                  </h2>
                  <div className="mt-5 flex max-w-prose flex-col gap-4 text-lead text-ink-muted">
                    {content.problem.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              ) : null}

              {content.solution ? (
                <Reveal delay={0.06}>
                  <h2 className="text-sub">What we do about it</h2>
                  <div className="mt-5 flex max-w-prose flex-col gap-4 text-lead text-ink-muted">
                    {content.solution.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="nx-section-tight" aria-labelledby="covers-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal>
              <h2 id="covers-heading" className="text-sub">
                What this typically covers
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
                Scope is agreed per project. This is the ground the work usually covers — we
                confirm what is in and out before anything is built.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <ul className="flex flex-col gap-3">
                {service.covers.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-hairline px-4 py-3.5"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-cyan/15 text-brand-cyan">
                      <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {content.benefits || content.whoFor ? (
        <section className="nx-section-tight" aria-labelledby="benefits-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {content.benefits ? (
                <Reveal>
                  <h2 id="benefits-heading" className="text-sub">
                    What you get
                  </h2>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {content.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-sm text-ink-muted">
                        <span
                          aria-hidden="true"
                          className="mt-[0.4375rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan"
                        />
                        <span className="font-semibold text-ink">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {content.whoFor ? (
                <Reveal delay={0.06}>
                  <h2 className="text-sub">Who this is for</h2>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {content.whoFor.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span
                          aria-hidden="true"
                          className="mt-[0.4375rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple"
                        />
                        <span className="font-semibold text-ink-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {content.useCases && content.useCases.length > 0 ? (
        <section className="nx-section-tight" aria-labelledby="use-cases-heading">
          <Container>
            <Reveal>
              <h2 id="use-cases-heading" className="text-sub">
                Typical use cases
              </h2>
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.useCases.map((useCase, index) => (
                <Reveal as="li" key={useCase.title} delay={index * 0.05}>
                  <div className="nx-card h-full p-6">
                    <h3 className="text-[1.0625rem] font-extrabold tracking-tight">
                      {useCase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {useCase.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="nx-section-tight" aria-labelledby="process-heading">
        <Container>
          <Reveal>
            <h2 id="process-heading" className="text-sub">
              How we run it
            </h2>
          </Reveal>

          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step, index) => (
              <Reveal as="li" key={step.id} delay={index * 0.05}>
                <div className="nx-card h-full p-5">
                  <span className="text-xs font-extrabold tracking-[0.18em] text-brand-cyan">
                    {padIndex(index)}
                  </span>
                  <h3 className="mt-3 text-base font-extrabold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {caseStudies.length > 0 ? (
        <section className="nx-section-tight" aria-labelledby="case-study-heading">
          <Container>
            <Reveal>
              <h2 id="case-study-heading" className="text-sub">
                Related work
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
                Projects where this service was part of the engagement.
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {caseStudies.map((project) => (
                <Reveal as="li" key={project.slug}>
                  <ProjectCard project={project} source={`service-${service.slug}`} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {industries.length > 0 ? (
        <RelatedLinks
          id="industries"
          title="Where this is used"
          description="Industries where this service is usually part of the solution."
          links={industries.slice(0, 6).map((industry) => ({
            kind: 'Industry',
            label: `${industry.name} solutions`,
            to: `/solutions/${industry.slug}`,
            description: industry.focus,
          }))}
        />
      ) : null}

      {articles.length > 0 ? (
        <RelatedLinks
          id="reading"
          title="Related reading"
          links={articles.map((post) => ({
            kind: 'Article',
            label: post.title,
            to: `/blog/${post.slug}`,
            description: post.excerpt,
          }))}
        />
      ) : null}

      {related.length > 0 ? (
        <section className="nx-section-tight" aria-labelledby="related-heading">
          <Container>
            <Reveal>
              <h2 id="related-heading" className="text-sub">
                Related services
              </h2>
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal as="li" key={item.slug} delay={index * 0.05}>
                  <ServiceCard service={item} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <FaqSection
        id={`faq-${service.slug}`}
        faqs={content.faqs ?? []}
        title={`${service.title} — common questions`}
      />

      <StartYourProject
        title={`Need ${service.title.toLowerCase()}?`}
        description="Describe the business problem. We will come back with the approach, not a generic quote."
        presetService={service.title}
        source={`service-${service.slug}`}
      />
    </>
  );
}
