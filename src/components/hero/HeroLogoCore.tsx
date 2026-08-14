import { motion, useTransform, type MotionValue } from 'framer-motion';
import { NexverrMark } from '@/components/brand/NexverrMark';

interface HeroLogoCoreProps {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reducedMotion: boolean;
  /** Idle loops stop when the hero scrolls out of view. */
  active: boolean;
  /** Brightens the core while a solution node is hovered. */
  focused: boolean;
}

/**
 * The transformation engine's core.
 *
 * The mark builds itself in one continuous pen stroke, hands over to the solid
 * letterform, launches its trajectory, then settles: breathing plate, drifting
 * halo, counter-rotating rings and an energy ripple released on each pulse.
 *
 * Centring is on the outer element and motion on the inner ones, because Framer
 * writes the full `transform` property and would drop a translate class.
 */
export function HeroLogoCore({
  parallaxX,
  parallaxY,
  reducedMotion,
  active,
  focused,
}: HeroLogoCoreProps) {
  const x = useTransform(parallaxX, [-1, 1], [3, -3]);
  const y = useTransform(parallaxY, [-1, 1], [3, -3]);
  const idle = !reducedMotion && active;

  return (
    <div className="absolute left-1/2 top-1/2 z-20" style={{ transform: 'translate(-50%, -50%)' }}>
      <motion.div
        style={reducedMotion ? undefined : { x, y }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reducedMotion ? 0 : 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative grid place-items-center">
          {/* Halo — pulses as the streams land, then breathes */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute h-[15rem] w-[15rem] rounded-full sm:h-[17rem] sm:w-[17rem]"
            style={{
              background:
                'radial-gradient(circle, rgba(0,200,255,0.28) 0%, rgba(0,106,245,0.15) 42%, transparent 70%)',
            }}
            animate={
              idle
                ? { opacity: focused ? 0.95 : [0.4, 0.85, 0.55, 0.7, 0.5] }
                : { opacity: 0.55 }
            }
            transition={
              idle && !focused
                ? { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }
                : { duration: 0.4 }
            }
          />

          {/* Energy ripples released by the transformation pulse */}
          {idle
            ? [0, 1].map((ring) => (
                <motion.span
                  key={ring}
                  aria-hidden="true"
                  className="nx-motion-optional pointer-events-none absolute h-32 w-32 rounded-full border border-brand-cyan/40 sm:h-36 sm:w-36"
                  initial={{ scale: 0.72, opacity: 0 }}
                  animate={{ scale: [0.72, 1.85], opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 3.4,
                    delay: 2.1 + ring * 1.7,
                    repeat: Infinity,
                    repeatDelay: 3.4,
                    ease: 'easeOut',
                  }}
                />
              ))
            : null}

          {/* Counter-rotating rings */}
          {!reducedMotion ? (
            <>
              <motion.div
                aria-hidden="true"
                className="nx-motion-optional pointer-events-none absolute h-[9.5rem] w-[9.5rem] rounded-full opacity-45 sm:h-[11rem] sm:w-[11rem]"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, rgba(0,200,255,0.55) 60deg, transparent 130deg, transparent 210deg, rgba(123,31,255,0.45) 280deg, transparent 340deg)',
                  maskImage:
                    'radial-gradient(circle, transparent 62%, #000 64%, #000 76%, transparent 78%)',
                  WebkitMaskImage:
                    'radial-gradient(circle, transparent 62%, #000 64%, #000 76%, transparent 78%)',
                }}
                animate={active ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  active ? { duration: 26, repeat: Infinity, ease: 'linear' } : { duration: 0 }
                }
              />

              <motion.div
                aria-hidden="true"
                className="nx-motion-optional pointer-events-none absolute h-[12.5rem] w-[12.5rem] rounded-full opacity-30 sm:h-[14rem] sm:w-[14rem]"
                style={{
                  border: '1px dashed rgba(155, 167, 199, 0.35)',
                }}
                animate={active ? { rotate: -360 } : { rotate: 0 }}
                transition={
                  active ? { duration: 44, repeat: Infinity, ease: 'linear' } : { duration: 0 }
                }
              />
            </>
          ) : null}

          {/* Glass plate holding the mark */}
          <motion.div
            className="nx-glass relative grid h-28 w-28 place-items-center rounded-[1.75rem] transition-colors duration-500 sm:h-32 sm:w-32"
            style={focused ? { borderColor: 'rgba(0,200,255,0.4)' } : undefined}
            animate={idle ? { scale: [1, 1.04, 1, 1.02, 1] } : { scale: 1 }}
            transition={
              idle
                ? { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }
                : { duration: 0.2 }
            }
          >
            <NexverrMark
              className="h-14 w-14 sm:h-16 sm:w-16"
              animated={!reducedMotion}
              idle={idle}
              startDelay={0.45}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
