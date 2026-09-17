import { useEffect } from 'react';
import { applySeo, type SeoInput } from '@/lib/seo';

/**
 * Applies page-level metadata and structured data on mount and whenever the
 * page's SEO entry changes.
 *
 * The dependency is a serialised copy of the input rather than the object
 * itself: route entries carry nested schema arrays that are rebuilt on every
 * render, so an identity comparison would rewrite the whole head on each pass.
 */
export function useSeo(input: SeoInput) {
  const serialised = JSON.stringify(input);

  useEffect(() => {
    applySeo(JSON.parse(serialised) as SeoInput);
  }, [serialised]);
}
