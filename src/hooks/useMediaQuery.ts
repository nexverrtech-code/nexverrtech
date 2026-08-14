import { useEffect, useState } from 'react';

/** Subscribes to a media query. SSR-safe and listener-cleaned. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True below the `md` breakpoint — drives the simplified mobile hero. */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/** True when the device has a real pointer, i.e. parallax is worth running. */
export function useHasFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
