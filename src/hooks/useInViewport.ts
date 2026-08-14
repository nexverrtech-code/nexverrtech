import { useEffect, useState, type RefObject } from 'react';

/**
 * Tracks whether an element is on screen. The hero uses this to stop its idle
 * animation loops once the visitor scrolls past — no wasted frames below the fold.
 */
export function useInViewport(ref: RefObject<Element | null>, rootMargin = '96px'): boolean {
  const [inViewport, setInViewport] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inViewport;
}
