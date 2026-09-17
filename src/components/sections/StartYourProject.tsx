import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/effects/Reveal';
import { useInquiry } from '@/context/InquiryContext';
import { siteConfig } from '@/lib/config';
import { track } from '@/lib/analytics';

interface StartYourProjectProps {
  title?: string;
  description?: string;
  /** Preselects the service in the inquiry form. */
  presetService?: string;
  /** Where this instance is rendered, for analytics. */
  source?: string;
}

/**
 * The conversion section. One primary action — Start a Project — with a single
 * quieter alternative for visitors who are not ready to describe a project yet.
 */
export function StartYourProject({
  title = 'Have a Project in Mind?',
  description = "Tell us what you're building. We'll help you figure out the right solution.",
  presetService,
  source = 'cta-section',
}: StartYourProjectProps) {
  const { openInquiry } = useInquiry();

  return (
    <section className="nx-section-tight relative" aria-labelledby="start-project-heading">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-hairline">
            {/* Brand wash */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,200,255,0.20),transparent_55%),radial-gradient(circle_at_82%_85%,rgba(123,31,255,0.22),transparent_55%)]"
            />
            <div aria-hidden="true" className="nx-grid-bg absolute inset-0 opacity-40" />

            <div className="relative px-6 py-14 text-center sm:px-10 sm:py-16 lg:py-20">
              <p className="nx-eyebrow justify-center">{siteConfig.tagline}</p>

              <h2 id="start-project-heading" className="mx-auto mt-6 max-w-2xl text-section">
                {title}
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-lead text-ink-muted">{description}</p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => {
                    track('start_project_click', { source, service: presetService });
                    openInquiry(presetService);
                  }}
                >
                  Start a Project
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>

                <ButtonLink
                  to="/contact"
                  variant="secondary"
                  size="lg"
                  onClick={() => track('contact_click', { source })}
                >
                  Talk to NEXVERR
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
