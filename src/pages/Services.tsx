import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Reveal } from '@/components/effects/Reveal';
import { services } from '@/data/services';
import { solutionGroups, type SolutionGroupId } from '@/data/solutions';
import { useSeo } from '@/hooks/useSeo';
import { cn } from '@/lib/utils';

const ALL = 'all';

/** Full catalog with a group filter kept in the URL, so a filtered view is shareable. */
export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get('group') ?? ALL;

  useSeo({
    title: 'Services — Custom Software, ERP, Mobile & AI | NEXVERR TECHNOLOGIES',
    description:
      'The full NEXVERR service catalog: websites and e-commerce, ERP, CRM, POS and billing systems, mobile apps, automation, AI/ML, cloud, UI/UX and SaaS product development.',
    path: '/services',
  });

  const filtered = useMemo(
    () => (active === ALL ? services : services.filter((service) => service.group === active)),
    [active],
  );

  const setGroup = (group: string) => {
    setSearchParams(group === ALL ? {} : { group }, { replace: true });
  };

  const filters: { id: string; label: string }[] = [
    { id: ALL, label: 'All Services' },
    ...solutionGroups.map((group) => ({ id: group.id as SolutionGroupId, label: group.title })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything we build, in one place"
        description="Twenty services across six areas of work. If you are not sure which one fits, describe the problem and we will point you at the right starting place."
      />

      <section className="pb-4" aria-label="Service catalog">
        <Container>
          <div
            role="group"
            aria-label="Filter services by category"
            className="flex flex-wrap gap-2"
          >
            {filters.map((filter) => {
              const isActive = active === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setGroup(filter.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'rounded-full border px-4 py-2.5 text-[0.8125rem] font-bold transition-colors duration-300',
                    isActive
                      ? 'border-brand-cyan/40 bg-brand-cyan/10 text-ink'
                      : 'border-hairline text-ink-muted hover:border-white/20 hover:text-ink',
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={Math.min(index, 8) * 0.04}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </ul>

          {filtered.length === 0 ? (
            <p className="mt-10 text-lead text-ink-muted">
              No services in this category yet.
            </p>
          ) : null}
        </Container>
      </section>

      <StartYourProject />
    </>
  );
}
