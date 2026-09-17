import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/effects/Reveal';
import { companies, hasCompanies } from '@/data/companies';
import { projects } from '@/data/projects';

/**
 * A quiet credibility band under the hero.
 *
 * It shows the businesses NEXVERR has actually delivered for, each linking to
 * its own case study, and nothing else: no client count, no star rating, no
 * "trusted by 100+ businesses". Logos appear only once `companies.ts` holds
 * real artwork the company has permission to display.
 */
export function TrustedBy() {
  if (projects.length === 0 && !hasCompanies) return null;

  return (
    <section className="border-y border-hairline bg-surface-deep/30" aria-labelledby="trusted-by-heading">
      <Container className="py-8 sm:py-10">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-12">
          <h2
            id="trusted-by-heading"
            className="shrink-0 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink-faint"
          >
            Businesses that trust NEXVERR
          </h2>

          {hasCompanies ? (
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {companies.map((company) => (
                <li key={company.name}>
                  <img
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={36}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group flex flex-wrap items-baseline gap-x-2.5 text-sm font-bold tracking-tight text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {project.client}
                    <span className="text-xs font-semibold text-ink-faint">{project.industry}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
