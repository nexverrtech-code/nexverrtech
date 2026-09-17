import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  /** Seconds before the transition starts, for staggering a list. */
  delay?: number;
  /** Distance in px the element travels on entry. */
  distance?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'figure';
}

/**
 * Scroll-in transition used across every section.
 *
 * This deliberately does not use the animation library: a page can hold fifty
 * of these, and CSS transitions driven by one IntersectionObserver each cost a
 * fraction of the main-thread work that fifty animated components do. It
 * animates opacity and transform only, fires once, and honours
 * `prefers-reduced-motion` in CSS so the content is visible even before the
 * observer runs.
 */
export function Reveal({ children, delay = 0, distance = 16, className, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    // Without observer support the content simply appears — never hidden.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -64px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  const style = {
    '--nx-reveal-y': `${distance}px`,
    transitionDelay: delay ? `${delay}s` : undefined,
  } as CSSProperties;

  return createElement(
    as as string,
    { ref, className: cn('nx-reveal', visible && 'is-visible', className), style },
    children,
  );
}
