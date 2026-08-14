import { useEffect, type RefObject } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { useHasFinePointer } from './useMediaQuery';
import { useReducedMotion } from './useReducedMotion';

export interface PointerParallax {
  /** -1 … 1, springed. Multiply by a small pixel budget per layer. */
  x: MotionValue<number>;
  y: MotionValue<number>;
  enabled: boolean;
}

/**
 * Normalised pointer offset from the centre of `ref`, spring-smoothed.
 * Disabled on touch devices and when reduced motion is requested — the logo
 * should drift, never chase the cursor.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>): PointerParallax {
  const finePointer = useHasFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 70, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 70, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
      rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const onPointerLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    element.addEventListener('pointermove', onPointerMove, { passive: true });
    element.addEventListener('pointerleave', onPointerLeave);
    return () => {
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [enabled, ref, rawX, rawY]);

  return { x, y, enabled };
}
