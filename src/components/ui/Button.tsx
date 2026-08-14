import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-tight transition-[transform,box-shadow,background-color,border-color,opacity] duration-300 ease-smooth disabled:pointer-events-none disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-3';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-gradient text-white shadow-[0_10px_40px_-12px_rgba(0,106,245,0.8)] hover:shadow-[0_16px_50px_-12px_rgba(0,106,245,0.95)] hover:-translate-y-0.5',
  secondary:
    'nx-glass text-ink hover:border-white/20 hover:-translate-y-0.5 hover:bg-white/[0.06]',
  ghost: 'text-ink-muted hover:text-ink hover:bg-white/[0.05]',
  whatsapp:
    'bg-[#1FA855] text-white shadow-[0_10px_36px_-14px_rgba(31,168,85,0.9)] hover:bg-[#199a4c] hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, fullWidth, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      {children}
    </button>
  );
});

interface ButtonLinkProps extends CommonProps {
  to: string;
  /** External links render as an anchor with the right rel attributes. */
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

export function ButtonLink({
  to,
  external,
  variant = 'primary',
  size = 'md',
  className,
  children,
  fullWidth,
  ariaLabel,
  onClick,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Link>
  );
}
