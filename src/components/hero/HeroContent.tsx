import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HeroCTA } from './HeroCTA';
import { HeroLocation } from './HeroLocation';
import { HeroTrustStrip } from './HeroTrustStrip';

/**
 * The message, in the order a visitor actually forms questions:
 * who is this → can they help me → what do I do next.
 */
export function HeroContent() {
  const reducedMotion = useReducedMotion();

  const enter = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reducedMotion ? 0 : delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative z-10 max-w-3xl">
      <motion.div className="flex flex-wrap items-center gap-x-4 gap-y-3" {...enter(0.1)}>
        <p className="nx-eyebrow">
          <span aria-hidden="true" className="h-px w-8 bg-brand-cyan/60" />
          {siteConfig.tagline}
        </p>
        <HeroLocation />
      </motion.div>

      <motion.h1 id="hero-heading" className="mt-6 text-display" {...enter(0.2)}>
        Turn Your Business Challenges
        <br className="hidden sm:block" />{' '}
        <span className="nx-gradient-text">Into Digital Solutions.</span>
      </motion.h1>

      <motion.p className="mt-6 max-w-xl text-lead text-ink-muted" {...enter(0.32)}>
        We understand how your business works, then build the software, systems and digital
        experiences that help it work better.
      </motion.p>

      <motion.div className="mt-9" {...enter(0.44)}>
        <HeroCTA />
      </motion.div>

      <div className="mt-10">
        <HeroTrustStrip />
      </div>
    </div>
  );
}
