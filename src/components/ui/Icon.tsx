import { iconRegistry, type IconName } from '@/data/icons';

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

/** Resolves a data-file icon name to its Lucide component. */
export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Component = iconRegistry[name];
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
