import { useId } from 'react';
import { motion } from 'framer-motion';
import { MARK_REVEAL_ANGLE, brandAssets } from './brandAssets';

interface NexverrMarkProps {
  className?: string;
  /** Runs the reveal sweep. False shows the finished mark instantly. */
  animated?: boolean;
  /** Keeps the sheen sweep running. Switched off when the hero leaves the viewport. */
  idle?: boolean;
  /** Seconds before the reveal begins. */
  startDelay?: number;
  title?: string;
}

/**
 * The NEXVERR mark.
 *
 * This is the real logo artwork, not a redrawing of it — so the entrance cannot
 * stroke a path. Instead the mark is revealed by a wipe running along its own
 * rising axis (bottom-left → top-right, the direction the ribbon travels and the
 * arrow points), which reads as the logo building itself while staying pixel-
 * faithful to the original.
 *
 * A light sheen then passes through it on idle, masked by the artwork's own
 * alpha channel.
 */
export function NexverrMark({
  className,
  animated = false,
  idle = false,
  startDelay = 0,
  title = 'NEXVERR',
}: NexverrMarkProps) {
  // Scoped ids so two marks on one page never share defs.
  const uid = useId().replace(/[:]/g, '');
  const maskId = `nxReveal-${uid}`;

  return (
    <div className={`relative ${className ?? ''}`}>
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        role="img"
        aria-label={title}
      >
        <title>{title}</title>

        {animated ? (
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
              {/* Rotated so its leading edge is perpendicular to the mark's axis.
                  Sweeping the rect's x therefore uncovers the logo diagonally. */}
              <motion.rect
                y={-30}
                width={200}
                height={180}
                fill="#fff"
                transform={`rotate(${MARK_REVEAL_ANGLE} 60 60)`}
                initial={{ x: -230 }}
                animate={{ x: -40 }}
                transition={{ delay: startDelay, duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
              />
            </mask>
          </defs>
        ) : null}

        <image
          href={brandAssets.symbol}
          x={0}
          y={0}
          width={120}
          height={120}
          preserveAspectRatio="xMidYMid meet"
          mask={animated ? `url(#${maskId})` : undefined}
        />
      </svg>

      {/* Light passing through the artwork, clipped by its own alpha channel */}
      {idle ? (
        <div
          aria-hidden="true"
          className="nx-motion-optional pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            maskImage: `url(${brandAssets.symbol})`,
            WebkitMaskImage: `url(${brandAssets.symbol})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
          }}
        >
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background:
                'linear-gradient(100deg, transparent, rgba(223,246,255,0.75), transparent)',
            }}
            initial={{ x: '-160%' }}
            animate={{ x: '420%' }}
            transition={{
              delay: startDelay + 1.5,
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 5.5,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
