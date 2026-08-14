import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { TeamCard } from '@/components/cards/TeamCard';
import { Reveal } from '@/components/effects/Reveal';
import { approachSteps } from '@/data/approach';
import { foundingTeam } from '@/data/team';
import { headquarters } from '@/data/branches';
import { siteConfig } from '@/lib/config';
import { useSeo } from '@/hooks/useSeo';
import { padIndex } from '@/lib/utils';

export default function About() {
  useSeo({
    title: 'About — NEXVERR TECHNOLOGIES, Erode',
    description:
      'NEXVERR TECHNOLOGIES is a technology company based in Erode, Tamil Nadu, focused on business digitalization and custom software built around how a business actually works.',
    path: '/about',
  });

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A technology partner, not a vendor"
        description={`${siteConfig.name} is based in ${headquarters.city}, ${headquarters.state}. We work on business digitalization and custom software — understanding how a business runs, then building the systems that make it run better.`}
      />

      <section className="nx-section-tight" aria-labelledby="who-we-are-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <Reveal>
              <h2 id="who-we-are-heading" className="text-sub">
                Who we are
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-5 text-lead text-ink-muted">
              <p>
                We are a team of developers, designers and business-facing people who kept seeing
                the same thing: businesses buying software that forces them to change how they
                work, instead of software shaped around how they already do.
              </p>
              <p>
                So we start the other way round. Before anything gets designed or written, we spend
                time on the workflow — who does what, where it slows down, and what the business
                actually needs the system to produce.
              </p>
              <p className="font-bold text-ink">{siteConfig.statement}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="nx-section-tight" aria-labelledby="approach-heading">
        <Container>
          <Reveal>
            <h2 id="approach-heading" className="text-sub">
              Our approach
            </h2>
            <p className="mt-4 max-w-prose text-lead text-ink-muted">
              Four stages, and we stay involved through all of them.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step, index) => (
              <Reveal as="li" key={step.id} delay={index * 0.06}>
                <div className="nx-card h-full p-6">
                  <span className="text-xs font-extrabold tracking-[0.18em] text-brand-cyan">
                    {padIndex(index)}
                  </span>
                  <h3 className="mt-3 text-[1.0625rem] font-extrabold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="nx-section-tight" aria-labelledby="team-heading">
        <Container>
          <Reveal>
            <h2 id="team-heading" className="text-sub">
              Founding team
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {foundingTeam.map((member, index) => (
              <Reveal as="li" key={member.name} delay={index * 0.06}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <StartYourProject />
    </>
  );
}
