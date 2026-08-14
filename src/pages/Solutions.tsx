import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/effects/Reveal';
import { industries } from '@/data/industries';
import { solutionGroups } from '@/data/solutions';
import { getServicesByGroup } from '@/data/services';
import { useSeo } from '@/hooks/useSeo';

export default function Solutions() {
  useSeo({
    title: 'Solutions by Industry — Retail, Education, Healthcare | NEXVERR TECHNOLOGIES',
    description:
      'Solutions built around how your business works — retail, e-commerce, education, healthcare, hospitality, manufacturing, real estate, fitness, logistics and finance.',
    path: '/solutions',
  });

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Solutions Built Around Your Business"
        description="Every industry has its own rhythm — what gets counted, who approves what, and where the day actually gets stuck. We design around that, then build."
      />

      <section className="nx-section-tight" aria-labelledby="industries-heading">
        <Container>
          <h2 id="industries-heading" className="text-sub">
            Industries we build for
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal as="li" key={industry.slug} delay={Math.min(index, 6) * 0.05}>
                <div className="nx-card h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
                    <Icon name={industry.icon} className="h-[1.125rem] w-[1.125rem]" />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-extrabold tracking-tight">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{industry.focus}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 max-w-prose text-sm leading-relaxed text-ink-faint">
            Not listed here? The approach does not change — we start by understanding the workflow,
            then design around it.
          </p>
        </Container>
      </section>

      <section className="nx-section-tight" aria-labelledby="capability-heading">
        <Container>
          <h2 id="capability-heading" className="text-sub">
            What we bring to each of them
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionGroups.map((group, index) => (
              <Reveal as="li" key={group.id} delay={index * 0.05}>
                <article className="nx-card group h-full">
                  <Link to={`/services?group=${group.id}`} className="flex h-full flex-col p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
                      <Icon name={group.icon} className="h-[1.125rem] w-[1.125rem]" />
                    </span>
                    <h3 className="mt-5 text-[1.0625rem] font-extrabold tracking-tight">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{group.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-brand-cyan">
                      {getServicesByGroup(group.id).length} services
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <StartYourProject />
    </>
  );
}
