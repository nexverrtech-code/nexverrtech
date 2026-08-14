import { motion } from 'framer-motion';
import { connectionPath, ringPath, type HeroNode } from './heroNodes';

interface HeroConnectionsProps {
  nodes: HeroNode[];
  reducedMotion: boolean;
  active: boolean;
  /** Node currently hovered, if any — its spoke lights up. */
  activeNodeId: string | null;
  /** Gap left around the centre logo, in viewBox units (= % of the square). */
  startGap?: number;
  endGap?: number;
  /** The ring is desktop-only; three nodes do not make a convincing system. */
  showRing?: boolean;
}

/**
 * The network: spokes from the mark out to each solution, a ring binding the
 * solutions into one system, and light travelling along both.
 *
 * The travelling pulse is a dashed overlay stroke animated in CSS, so it runs
 * off the main thread instead of a per-frame JS loop.
 */
export function HeroConnections({
  nodes,
  reducedMotion,
  active,
  activeNodeId,
  startGap = 15,
  endGap = 9,
  showRing = true,
}: HeroConnectionsProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="absolute inset-0 z-0 h-full w-full"
      fill="none"
    >
      <defs>
        <linearGradient id="nxLineGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#006AF5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7B1FFF" stopOpacity="0.25" />
        </linearGradient>

        <radialGradient id="nxRingGradient">
          <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7B1FFF" stopOpacity="0.18" />
        </radialGradient>
      </defs>

      {/* The system ring */}
      {showRing ? (
        <motion.path
          d={ringPath(nodes)}
          stroke="url(#nxRingGradient)"
          strokeWidth={0.28}
          strokeLinecap="round"
          strokeDasharray="2 3"
          initial={reducedMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
          animate={reducedMotion ? { opacity: 0.55 } : { pathLength: 1, opacity: 0.75 }}
          transition={{ delay: reducedMotion ? 0 : 2.35, duration: 1.1, ease: 'easeOut' }}
        />
      ) : null}

      {nodes.map((node, index) => {
        const line = connectionPath(node, startGap, endGap);
        const isActive = activeNodeId === node.id;

        return (
          <g key={node.id}>
            <motion.line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#nxLineGradient)"
              strokeLinecap="round"
              initial={reducedMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: reducedMotion ? undefined : 1,
                opacity: isActive ? 1 : 0.85,
                strokeWidth: isActive ? 0.7 : 0.35,
              }}
              transition={{
                pathLength: {
                  delay: reducedMotion ? 0 : 2.15 + index * 0.06,
                  duration: 0.55,
                  ease: 'easeOut',
                },
                opacity: { duration: 0.3 },
                strokeWidth: { duration: 0.3 },
              }}
            />

            {/* Travelling data point */}
            {!reducedMotion && active ? (
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={isActive ? '#DFF6FF' : '#8FE6FF'}
                strokeWidth={isActive ? 1.3 : 0.8}
                strokeLinecap="round"
                /* Period of 24 divides the 240-unit keyframe travel exactly, so
                   the pulse loops without a visible jump. */
                strokeDasharray="1.5 22.5"
                className="nx-anim-dash nx-motion-optional"
                style={{
                  animationDelay: `${2.6 + index * 0.35}s`,
                  animationDuration: isActive ? '1.5s' : '3.2s',
                  opacity: isActive ? 1 : 0.85,
                }}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
