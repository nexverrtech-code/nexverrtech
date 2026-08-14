import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteConfig } from '@/lib/config';

/** Short by design — long enough to feel composed, never long enough to annoy. */
const HOLD_MS = 700;

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reducedMotion ? 120 : HOLD_MS);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] grid place-items-center bg-base"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${siteConfig.name}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative grid place-items-center">
            {/* Glow behind the mark */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute h-52 w-52 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,200,255,0.30) 0%, rgba(0,106,245,0.16) 40%, transparent 70%)',
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: reducedMotion ? 0.5 : [0.35, 0.9, 0.55], scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />

            <motion.img
              src="/brand/nexverr-symbol.png"
              alt=""
              width={76}
              height={76}
              className="relative h-[4.75rem] w-[4.75rem]"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: reducedMotion ? 1 : [0.88, 1.04, 1] }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Progress hairline */}
            <div className="mt-8 h-px w-32 overflow-hidden bg-white/10">
              <motion.div
                className="h-full w-full bg-brand-gradient"
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reducedMotion ? 0.1 : 0.75, ease: 'easeInOut' }}
              />
            </div>

            <p className="mt-5 text-[0.625rem] font-bold tracking-[0.4em] text-ink-faint">
              {siteConfig.tagline}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
