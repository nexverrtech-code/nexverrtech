import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/effects/Reveal';
import { useInquiry } from '@/context/InquiryContext';
import { siteConfig } from '@/lib/config';

/** The conversion section. One heading, one action, nothing to distract from it. */
export function StartYourProject() {
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
                Have a Project in Mind?
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-lead text-ink-muted">
                Tell us what you&rsquo;re building. We&rsquo;ll help you figure out the right
                solution.
              </p>

              <div className="mt-9 flex justify-center">
                <Button size="lg" onClick={() => openInquiry()}>
                  Start a Conversation
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
