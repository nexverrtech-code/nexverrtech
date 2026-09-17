import { NotFoundContent } from '@/components/sections/NotFoundContent';
import { useSeo } from '@/hooks/useSeo';
import { notFoundSeo } from '@/lib/routeSeo';

/**
 * `/404` and any unmatched route.
 *
 * On a deployed build this file is also what `dist/404.html` renders, which is
 * the page the host returns with a real 404 status for an unknown URL.
 */
export default function NotFound() {
  useSeo(notFoundSeo);
  return <NotFoundContent />;
}
