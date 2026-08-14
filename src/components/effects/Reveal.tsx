import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** Distance in px the element travels on entry. */
  distance?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}

/**
 * Scroll-in transition used across every section. Animates transform/opacity
 * only, fires once, and collapses to a plain element under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 16,
  className,
  as = 'div',
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const Component = motion[as];

  if (reducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
