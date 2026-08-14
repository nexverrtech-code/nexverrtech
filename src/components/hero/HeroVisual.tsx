import { useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { HeroConnections } from './HeroConnections';
import { HeroDataStream } from './HeroDataStream';
import { HeroGrowthPath } from './HeroGrowthPath';
import { HeroLogoCore } from './HeroLogoCore';
import { HeroTechnologyNode } from './HeroTechnologyNode';
import { desktopNodes, mobileNodes } from './heroNodes';

interface HeroVisualProps {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}

/**
 * The NEXVERR transformation engine:
 * idea → business challenge → NEXVERR → digital solution → growth.
 *
 * Mobile gets a genuinely simpler composition (three nodes, no ring, no pointer
 * effects) rather than a scaled-down copy of the desktop scene.
 */
export function HeroVisual({ parallaxX, parallaxY }: HeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(containerRef);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const nodes = isMobile ? mobileNodes : desktopNodes;
  const active = inViewport && !reducedMotion;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-[34rem]"
      aria-hidden="true"
    >
      <HeroConnections
        nodes={nodes}
        reducedMotion={reducedMotion}
        active={active}
        activeNodeId={activeNodeId}
        startGap={isMobile ? 17 : 15}
        endGap={isMobile ? 11 : 9}
        showRing={!isMobile}
      />

      <HeroGrowthPath reducedMotion={reducedMotion} delay={isMobile ? 2.2 : 2.6} />

      <HeroDataStream active={active} nodes={nodes} />

      <HeroLogoCore
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reducedMotion={reducedMotion}
        active={inViewport}
        focused={activeNodeId !== null}
      />

      {nodes.map((node, index) => (
        <HeroTechnologyNode
          key={node.id}
          node={node}
          index={index}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          reducedMotion={reducedMotion}
          interactive={!isMobile}
          isActive={activeNodeId === node.id}
          onActivate={setActiveNodeId}
        />
      ))}
    </div>
  );
}
