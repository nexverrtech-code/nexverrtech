import { motion } from 'framer-motion';

interface HeroGrowthPathProps {
  reducedMotion: boolean;
  delay?: number;
}

/**
 * The trajectory leaving the mark: solution → growth. It rises through the
 * centre rather than sitting in a corner, so it reads as a consequence of the
 * transformation and not as a chart pasted on top.
 */
export function HeroGrowthPath({ reducedMotion, delay = 2.7 }: HeroGrowthPathProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      fill="none"
    >
      <defs>
        <linearGradient id="nxGrowthGradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#00C8FF" stopOpacity="0" />
          <stop offset="35%" stopColor="#00C8FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7B1FFF" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <motion.path
        d="M14 82 C 30 78, 38 66, 50 50 C 62 34, 72 24, 88 16"
        stroke="url(#nxGrowthGradient)"
        strokeWidth={0.6}
        strokeLinecap="round"
        initial={reducedMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
        animate={reducedMotion ? { opacity: 0.7 } : { pathLength: 1, opacity: 0.9 }}
        transition={{ delay: reducedMotion ? 0.1 : delay, duration: 1.1, ease: 'easeOut' }}
      />

      {/* Trajectory head */}
      <motion.path
        d="M82.5 15 L88.5 15.5 L88 21.5"
        stroke="#A78BFF"
        strokeWidth={0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: reducedMotion ? 0.1 : delay + 0.9, duration: 0.4 }}
      />
    </svg>
  );
}
