import { motion, useTransform, type MotionValue } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { HeroNode } from './heroNodes';

interface HeroTechnologyNodeProps {
  node: HeroNode;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reducedMotion: boolean;
  index: number;
  /** Hover captions and highlighting are desktop-only. */
  interactive: boolean;
  isActive: boolean;
  onActivate: (id: string | null) => void;
}

/**
 * A solution type emerging from the mark. Scales out of the centre, then floats.
 * Hovering lights the node, its spoke and the core, and reveals a one-line
 * description — the visitor can interrogate the diagram rather than just watch it.
 *
 * Centring lives on the outer element and motion on the inner one, because
 * Framer writes the whole `transform` property and would drop a translate class.
 */
export function HeroTechnologyNode({
  node,
  parallaxX,
  parallaxY,
  reducedMotion,
  index,
  interactive,
  isActive,
  onActivate,
}: HeroTechnologyNodeProps) {
  // Outer nodes travel a little further than the logo, which reads as depth.
  const depth = 4;
  const x = useTransform(parallaxX, [-1, 1], [depth, -depth]);
  const y = useTransform(parallaxY, [-1, 1], [depth, -depth]);

  return (
    <div
      className="absolute z-20"
      style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        style={reducedMotion ? undefined : { x, y }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: reducedMotion ? index * 0.04 : node.delay,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className="nx-anim-float group relative"
          style={{ animationDelay: `${index * 0.6}s`, animationDuration: `${7 + index * 0.4}s` }}
          onMouseEnter={interactive ? () => onActivate(node.id) : undefined}
          onMouseLeave={interactive ? () => onActivate(null) : undefined}
        >
          <motion.div
            className={cn(
              'nx-glass flex items-center gap-2 rounded-full px-3 py-2 shadow-[0_8px_28px_-14px_rgba(0,0,0,0.9)] transition-colors duration-300 sm:px-3.5',
              isActive && 'border-brand-cyan/45',
            )}
            animate={
              reducedMotion
                ? undefined
                : { scale: isActive ? 1.08 : 1, y: isActive ? -2 : 0 }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={cn(
                'grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset transition-all duration-300',
                isActive ? 'ring-brand-cyan/40' : 'ring-white/10',
              )}
            >
              <Icon name={node.icon} className="h-3.5 w-3.5" />
            </span>
            <span className="whitespace-nowrap text-[0.625rem] font-extrabold tracking-[0.16em] text-ink sm:text-[0.6875rem]">
              {node.label}
            </span>
          </motion.div>

          {interactive ? (
            <div
              role="presentation"
              className={cn(
                'pointer-events-none absolute left-1/2 top-full z-30 mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-hairline bg-surface-deep/95 px-2.5 py-1.5 text-[0.6875rem] font-semibold text-ink-muted shadow-lift transition-all duration-200',
                isActive ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0',
              )}
            >
              {node.caption}
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
