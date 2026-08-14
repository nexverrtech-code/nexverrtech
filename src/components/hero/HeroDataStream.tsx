import { motion } from 'framer-motion';
import { HERO_CENTER, type HeroNode } from './heroNodes';

interface HeroDataStreamProps {
  active: boolean;
  /** Outbound particles are aimed at these nodes. */
  nodes: HeroNode[];
}

/**
 * The transformation itself, in two movements.
 *
 * Inbound: unformed input — ideas, requirements, workflows, problems — drifting
 * in from beyond the edges in muted violet. Deliberately wordless; the movement
 * carries the meaning, so nothing has to be labelled on screen.
 *
 * Outbound: what leaves the core is not what arrived. Bright, directed, and
 * travelling to a specific solution.
 *
 * Drawn in the same 0–100 viewBox as the connections, so every particle lands
 * exactly on its node at any container size.
 */
const INBOUND = [
  { x: -12, y: -8, delay: 0, duration: 3.4 },
  { x: -18, y: 44, delay: 0.7, duration: 3.9 },
  { x: -6, y: 106, delay: 1.4, duration: 3.6 },
  { x: 112, y: -6, delay: 0.35, duration: 4.1 },
  { x: 118, y: 52, delay: 1.1, duration: 3.5 },
  { x: 104, y: 110, delay: 1.9, duration: 3.8 },
];

export function HeroDataStream({ active, nodes }: HeroDataStreamProps) {
  if (!active) return null;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="nx-motion-optional pointer-events-none absolute inset-0 z-10 h-full w-full"
      fill="none"
    >
      <defs>
        <radialGradient id="nxStreamIn">
          <stop offset="0%" stopColor="#C7B2FF" />
          <stop offset="55%" stopColor="#7B1FFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7B1FFF" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="nxStreamOut">
          <stop offset="0%" stopColor="#EAFBFF" />
          <stop offset="55%" stopColor="#00C8FF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#00C8FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Raw input arriving */}
      {INBOUND.map((stream, index) => (
        <motion.circle
          key={`in-${index}`}
          r={1.1}
          fill="url(#nxStreamIn)"
          initial={{ cx: stream.x, cy: stream.y, opacity: 0 }}
          animate={{
            cx: [stream.x, HERO_CENTER.x],
            cy: [stream.y, HERO_CENTER.y],
            opacity: [0, 0.95, 0.9, 0],
          }}
          transition={{
            duration: stream.duration,
            delay: 1.0 + stream.delay,
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: 'easeIn',
            times: [0, 0.28, 0.82, 1],
          }}
        />
      ))}

      {/* Finished solutions leaving for their destination */}
      {nodes.map((node, index) => (
        <motion.circle
          key={`out-${node.id}`}
          r={1.3}
          fill="url(#nxStreamOut)"
          initial={{ cx: HERO_CENTER.x, cy: HERO_CENTER.y, opacity: 0 }}
          animate={{
            cx: [HERO_CENTER.x, node.x],
            cy: [HERO_CENTER.y, node.y],
            opacity: [0, 1, 0.9, 0],
          }}
          transition={{
            duration: 2.2,
            delay: 2.8 + index * 0.42,
            repeat: Infinity,
            repeatDelay: 3.6,
            ease: 'easeOut',
            times: [0, 0.2, 0.75, 1],
          }}
        />
      ))}
    </svg>
  );
}
