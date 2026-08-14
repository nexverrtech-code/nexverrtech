import { useEffect } from 'react';
import { applySeo, type SeoInput } from '@/lib/seo';

/** Applies page-level metadata on mount and whenever the inputs change. */
export function useSeo(input: SeoInput) {
  const { title, description, path, image, type, noIndex } = input;

  useEffect(() => {
    applySeo({ title, description, path, image, type, noIndex });
  }, [title, description, path, image, type, noIndex]);
}
