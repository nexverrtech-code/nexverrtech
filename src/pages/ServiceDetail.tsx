import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/effects/Reveal';
import { AmbientGlow } from '@/components/effects/AmbientGlow';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { getServicesByGroup, serviceMap } from '@/data/services';
import { solutionGroupMap } from '@/data/solutions';
import { approachSteps } from '@/data/approach';
import { useSeo } from '@/hooks/useSeo';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';
import { serviceSeo } from '@/lib/routeSeo';
import { JsonLd } from '@/components/seo/JsonLd';
import { useInquiry } from '@/context/InquiryContext';
import { padIndex } from '@/lib/utils';

export default function ServiceDetail() {
  const { slug = '' } = useParams();
  const service = serviceMap[slug];
  const { openInquiry } = useInquiry();

  // `seoTitle` and `metaDescription` are written per service so no two pages
  // compete for the same query or share a search snippet. An unknown slug is
  // marked noindex rather than inheriting a real service's metadata.
  useSeo(
    service
      ? serviceSeo(service)
      : {
          title: 'Service not found — NEXVERR TECHNOLOGIES',
          description: 'This service could not be found.',
          path: `/services/${slug}`,
          noIndex: true,
        },
  );

  if (!service) return <Navigate to="/services" replace />;

  const group = solutionGroupMap[service.group];
  const related = getServicesByGroup(service.group)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.title,
            description: service.description,
            path: `/services/${service.slug}`,
            category: group.title,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <section className="relative overflow-hidden pb-12 pt-[calc(var(--nx-nav-height)+3rem)] lg:pt-[calc(var(--nx-nav-height)+4.5rem)]">
        <div aria-hidden="true" className="nx-grid-bg nx-mask-fade-b absolute inset-0 opacity-50" />
        <AmbientGlow className="-right-24 -top-32" tone="cyan" size={520} />

        <Container className="relative">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All services
          </Link>

          <Reveal className="mt-8 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
                <Icon name={service.icon} className="h-5 w-5" />
              </span>
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                {group.title}
              </span>
            </div>

            <h1 className="mt-6 text-section ">{service.title}</h1>
            <p className="mt-6 max-w-prose text-lead text-ink-muted">{service.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => openInquiry(service.title)}>
                Discuss This Service
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              <ButtonLink to="/contact" variant="secondary">
                Contact Us
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="nx-section-tight" aria-labelledby="covers-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <h2 id="covers-heading" className="text-sub">
                What this typically covers
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
                Scope is agreed per project. This is the ground the work usually covers — we
                confirm what is in and out before anything is built.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
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

      <section className="nx-section-tight" aria-labelledby="process-heading">
        <Container>
          <h2 id="process-heading" className="text-sub">
            How we run it
          </h2>

          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step, index) => (
              <Reveal as="li" key={step.id} delay={index * 0.06}>
                <div className="nx-card h-full p-5">
                  <span className="text-xs font-extrabold tracking-[0.18em] text-brand-cyan">
                    {padIndex(index)}
                  </span>
                  <h3 className="mt-3 text-base font-extrabold tracking-tight text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="nx-section-tight" aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="text-sub">
              Related services
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal as="li" key={item.slug} delay={index * 0.06}>
                  <ServiceCard service={item} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
