import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '@/lib/analytics';

/**
 * Boots analytics and reports one page view per route.
 *
 * The view is sent on a microtask after the route renders so `document.title`
 * has already been updated by `useSeo` — otherwise every hit would carry the
 * previous page's title.
 */
export function useAnalytics(): void {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      trackPageView(`${pathname}${search}`, document.title);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, search]);
}
