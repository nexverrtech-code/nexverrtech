import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Crumb } from '@/lib/seo';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  /** Full trail including Home. The last item is the current page. */
  items: Crumb[];
  className?: string;
}

/**
 * The visible trail on every deep page. It is rendered from the same array that
 * produces the BreadcrumbList structured data in `routeSeo.ts`, so what a
 * visitor sees and what a crawler reads cannot disagree.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8125rem] font-semibold text-ink-faint">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.path}>
              <li className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="text-ink-muted">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="transition-colors duration-200 hover:text-ink"
                  >
                    {item.name}
                  </Link>
                )}
              </li>

              {isLast ? null : (
                <li aria-hidden="true" className="flex items-center">
                  <ChevronRight className="h-3.5 w-3.5 text-ink-faint/70" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
