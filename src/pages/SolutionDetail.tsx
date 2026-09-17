import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { FaqSection } from '@/components/sections/FaqSection';
import { RelatedLinks } from '@/components/sections/RelatedLinks';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { NotFoundContent } from '@/components/sections/NotFoundContent';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/effects/Reveal';
import { getIndustryBySlug } from '@/data/industries';
import { serviceMap } from '@/data/services';
import { getProjectsForIndustry } from '@/data/projects';
import { getPostsForSolution } from '@/data/blog';
import { useSeo } from '@/hooks/useSeo';
import { notFoundSeo, solutionSeo } from '@/lib/routeSeo';
import { padIndex } from '@/lib/utils';

export default function SolutionDetail() {
  const { slug = '' } = useParams();
  const industry = getIndustryBySlug(slug);

  const seo = useMemo(
    () => (industry ? solutionSeo(industry) : { ...notFoundSeo, path: `/solutions/${slug}` }),
    [industry, slug],
  );

  useSeo(seo);

  if (!industry) return <NotFoundContent />;

  const services = industry.services.map((serviceSlug) => serviceMap[serviceSlug]).filter(Boolean);
  const caseStudies = getProjectsForIndustry(industry.slug);
  const articles = getPostsForSolution(industry.slug);

  return (
    <>
      <PageHero
        eyebrow={`${industry.name} solutions`}
        title={industry.headline}
        description={industry.intro}
        breadcrumbs={seo.breadcrumbs}
        tone="violet"
      >
        <span className="inline-flex items-center gap-3 rounded-full border border-hairline px-4 py-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-gradient-soft text-brand-cyan">
            <Icon name={industry.icon} className="h-3.5 w-3.5" />
          </span>
          <span className="text-[0.8125rem] font-bold text-ink-muted">{industry.focus}</span>
        </span>
      </PageHero>

      <section className="nx-section-tight pt-0" aria-labelledby="challenges-heading">
        <Container>
          <Reveal>
            <h2 id="challenges-heading" className="text-sub">
              Where {industry.name.toLowerCase()} businesses lose time
            </h2>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
              These are the patterns we see before a system exists. If two or three of them sound
              familiar, there is usually something worth building.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {industry.challenges.map((challenge, index) => (
              <Reveal as="li" key={challenge.title} delay={Math.min(index, 4) * 0.05}>
                <div className="nx-card h-full p-6">
                  <span className="text-xs font-extrabold tracking-[0.2em] text-brand-cyan">
                    {padIndex(index)}
                  </span>
                  <h3 className="mt-3 text-[1.0625rem] font-extrabold tracking-tight">
                    {challenge.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {challenge.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="nx-section-tight" aria-labelledby="approach-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal>
              <h2 id="approach-heading" className="text-sub">
                How we build for {industry.name.toLowerCase()}
              </h2>
            </Reveal>

            <Reveal delay={0.06} className="flex max-w-prose flex-col gap-5 text-lead text-ink-muted">
              {industry.approach.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="nx-section-tight" aria-labelledby="capabilities-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal>
              <h2 id="capabilities-heading" className="text-sub">
                What the system usually covers
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
                Scope is agreed per project — this is the ground the work normally covers for a{' '}
                {industry.name.toLowerCase()} business.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <ul className="flex flex-col gap-3">
                {industry.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-3 rounded-xl border border-hairline px-4 py-3.5"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-cyan/15 text-brand-cyan">
                      <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-ink">{capability}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {caseStudies.length > 0 ? (
        <section className="nx-section-tight" aria-labelledby="case-study-heading">
          <Container>
            <Reveal>
              <h2 id="case-study-heading" className="text-sub">
                Related work
              </h2>
            </Reveal>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {caseStudies.map((project) => (
                <Reveal as="li" key={project.slug}>
                  <ProjectCard project={project} source={`solution-${industry.slug}`} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <RelatedLinks
        id="services"
        title={`Services that apply to ${industry.name.toLowerCase()}`}
        description="Each of these is a service in its own right. Most projects in this industry use two or three of them together."
        links={services.map((service) => ({
          kind: 'Service',
          label: service.title,
          to: `/services/${service.slug}`,
          description: service.summary,
        }))}
      />

      {articles.length > 0 ? (
        <section className="nx-section-tight" aria-labelledby="reading-heading">
          <Container>
            <Reveal>
              <h2 id="reading-heading" className="text-sub">
                Worth reading first
              </h2>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-3">
              {articles.map((post) => (
                <Reveal as="li" key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="nx-card group flex items-start justify-between gap-6 p-5"
                  >
                    <span>
                      <span className="block text-[0.9375rem] font-extrabold tracking-tight text-ink">
                        {post.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">
                        {post.excerpt}
                      </span>
                    </span>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-cyan"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <FaqSection
        id={`faq-${industry.slug}`}
        faqs={industry.faqs}
        title={`${industry.name} software questions`}
      />

      <StartYourProject
        title={`Building for a ${industry.name.toLowerCase()} business?`}
        description="Tell us how the operation runs today and we will map what it would take."
        source={`solution-${industry.slug}`}
      />
    </>
  );
}
