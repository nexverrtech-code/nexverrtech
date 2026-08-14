import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** The one place the site's max-width and responsive gutters are defined. */
export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return <Tag className={cn('nx-container', className)}>{children}</Tag>;
}
