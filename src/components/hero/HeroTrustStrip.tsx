import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { capabilityStatements } from '@/data/approach';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Capability statements, not metrics. No client counts, ratings or badges appear
 * anywhere on this site until there are verified numbers to put behind them.
 */
export function HeroTrustStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3">
      {capabilityStatements.map((statement, index) => (
        <motion.li
          key={statement}
          className="flex items-center gap-2 text-[0.8125rem] font-semibold text-ink-muted"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-cyan/15 text-brand-cyan">
            <Check className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden="true" />
          </span>
          {statement}
        </motion.li>
      ))}
    </ul>
  );
}
