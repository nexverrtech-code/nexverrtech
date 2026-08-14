import { useMediaQuery } from './useMediaQuery';

/**
 * Honoured everywhere motion is decorative: particles, parallax, data pulses and
 * the hero entrance choreography all collapse to simple fades when this is true.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
