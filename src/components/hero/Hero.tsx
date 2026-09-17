import { Suspense, lazy } from 'react';
import { Container } from '@/components/ui/Container';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';

const HeroScene = lazy(() => import('./HeroScene'));

/**
 * Hero section. The message renders on the first pass with no JavaScript
 * animation involved; the animated scene is fetched separately and drops into
 * space that is already reserved for it, so it cannot shift the page.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pb-16 pt-[calc(var(--nx-nav-height)+2.5rem)] sm:pb-24 lg:flex lg:min-h-[92svh] lg:items-center lg:pb-24 lg:pt-[calc(var(--nx-nav-height)+3rem)]"
    >
      <HeroBackground />

      <Container className="relative w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 xl:gap-16">
          <HeroContent />

          <div className="order-last">
            {/* The fallback reserves the scene's exact footprint. */}
            <Suspense
              fallback={
                <div
                  aria-hidden="true"
                  className="mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-[34rem]"
                />
              }
            >
              <HeroScene />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
