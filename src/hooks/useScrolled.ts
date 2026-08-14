import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled past `threshold`. Uses a passive listener and
 * only re-renders on the boundary crossing, not on every scroll frame.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const evaluate = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}
