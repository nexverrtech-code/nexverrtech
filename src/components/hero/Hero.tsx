import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';

/**
 * Hero section. The pointer parallax is owned here and passed down, so the
 * background, the mark and the nodes all respond to one shared motion value
 * with different travel budgets.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y } = usePointerParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pb-16 pt-[calc(var(--nx-nav-height)+2.5rem)] sm:pb-24 lg:flex lg:min-h-[92svh] lg:items-center lg:pb-24 lg:pt-[calc(var(--nx-nav-height)+3rem)]"
    >
      <HeroBackground parallaxX={x} parallaxY={y} />

      <Container className="relative w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 xl:gap-16">
          <HeroContent />

          <div className="order-last">
            <HeroVisual parallaxX={x} parallaxY={y} />
          </div>
        </div>
      </Container>
    </section>
  );
}
