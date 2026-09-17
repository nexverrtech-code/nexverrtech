import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { AmbientGlow } from '@/components/effects/AmbientGlow';
import { brandAssets } from '@/components/brand/brandAssets';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { projects } from '@/data/projects';

const POPULAR = [
  { label: 'All services', to: '/services' },
  { label: 'Industry solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'Insights', to: '/blog' },
  { label: 'About NEXVERR', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/**
 * The not-found page body.
 *
 * Shared by `/404` and by the detail routes when a slug does not resolve, so a
 * bad link always lands on the same page — and, on a deployed build, with a
 * real 404 status rather than a homepage served as 200.
 *
 * It offers a way onward rather than a dead end: the main sections, the most
 * asked-for services, and the delivered projects.
 */
export function NotFoundContent() {
  const topServices = services.slice(0, 6);
  const topIndustries = industries.slice(0, 6);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div aria-hidden="true" className="nx-grid-bg nx-mask-fade-b absolute inset-0 opacity-40" />
      <AmbientGlow className="left-1/2 top-24 -translate-x-1/2" tone="blue" size={620} />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <img
            src={brandAssets.symbol}
            alt=""
            width={56}
            height={56}
            className="mx-auto h-14 w-14 opacity-50"
            decoding="async"
          />

          <p className="nx-eyebrow mt-8 justify-center">Error 404</p>
          <h1 className="mt-5 text-section">This page took a different route.</h1>
          <p className="mx-auto mt-5 max-w-prose text-lead text-ink-muted">
            The page you were looking for does not exist, or it has moved. Everything below is
            still exactly where it should be.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/">
              Back to Home
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              Contact Us
            </ButtonLink>
          </div>
        </div>

        <nav aria-label="Site sections" className="mt-16">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {POPULAR.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-bold text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 grid gap-8 border-t border-hairline pt-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
              Services
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
              Solutions
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {topIndustries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    to={`/solutions/${industry.slug}`}
                    className="text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
              Projects
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {project.client}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
