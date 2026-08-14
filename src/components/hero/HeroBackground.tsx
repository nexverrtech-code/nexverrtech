import { motion, type MotionValue } from 'framer-motion';
import { useTransform } from 'framer-motion';

interface HeroBackgroundProps {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}

/**
 * Static ambience: grid, two brand lights and a vignette. Everything is a CSS
 * gradient — no canvas, no particle system, no repaint cost while scrolling.
 */
export function HeroBackground({ parallaxX, parallaxY }: HeroBackgroundProps) {
  // The deepest layer moves least — 2px of travel is enough to read as depth.
  const gridX = useTransform(parallaxX, [-1, 1], [2, -2]);
  const gridY = useTransform(parallaxY, [-1, 1], [2, -2]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="nx-grid-bg nx-mask-fade-b absolute inset-0 opacity-70"
        style={{ x: gridX, y: gridY }}
      />

      {/* A slow pass of light down the grid, so the backdrop is never quite still */}
      <div className="nx-mask-fade-b absolute inset-0 overflow-hidden">
        <div
          className="nx-anim-scan nx-motion-optional absolute inset-x-0 h-40"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(0,200,255,0.07) 45%, rgba(0,200,255,0.12) 50%, rgba(0,200,255,0.07) 55%, transparent)',
          }}
        />
      </div>

      {/* Brand lights */}
      <div
        className="nx-ambient -right-32 -top-40 h-[36rem] w-[36rem] md:right-0"
        style={{
          background:
            'radial-gradient(circle, rgba(0,106,245,0.22) 0%, rgba(0,200,255,0.10) 38%, transparent 70%)',
        }}
      />
      <div
        className="nx-ambient -left-40 top-1/3 h-[30rem] w-[30rem]"
        style={{
          background: 'radial-gradient(circle, rgba(123,31,255,0.16) 0%, transparent 68%)',
        }}
      />

      {/* Horizon line that grounds the section against the next one */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />
    </div>
  );
}
