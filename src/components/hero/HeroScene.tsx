import { useRef } from 'react';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { HeroVisual } from './HeroVisual';

/**
 * The transformation-engine visual, and everything that animates it.
 *
 * Split out and loaded lazily on purpose: this is the only part of the site
 * that genuinely needs the animation library, and keeping it behind a dynamic
 * import means the library is no longer in the first chunk of every page. The
 * hero's words and buttons render immediately; the scene fades in behind them a
 * moment later, into space the layout has already reserved.
 */
export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { x, y } = usePointerParallax(sceneRef);

  return (
    <div ref={sceneRef} className="animate-fade-up">
      <HeroVisual parallaxX={x} parallaxY={y} />
    </div>
  );
}
