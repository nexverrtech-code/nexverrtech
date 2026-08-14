import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { brandAssets } from '@/components/brand/brandAssets';

interface LogoProps {
  /** `compact` for the navbar, `full` adds the tagline row for the footer. */
  variant?: 'compact' | 'full';
  /** Symbol only — no wordmark. */
  symbolOnly?: boolean;
  className?: string;
  asLink?: boolean;
  onClick?: () => void;
}

/**
 * The lockup: symbol, NEXVERR with the X carrying the brand gradient, and the
 * TECHNOLOGIES rule beneath — the same hierarchy as the master logo, set in
 * Manrope so it stays crisp at every size and legible on the dark ground.
 */
export function Logo({
  variant = 'compact',
  symbolOnly = false,
  className,
  asLink = true,
  onClick,
}: LogoProps) {
  const content = (
    <>
      <img
        src={brandAssets.symbol}
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
        loading="eager"
        decoding="async"
      />

      {symbolOnly ? null : (
        <span className="flex flex-col leading-none">
          <span className="text-[1.0625rem] font-extrabold tracking-[0.16em] text-ink sm:text-lg">
            NE<span className="nx-gradient-text">X</span>VERR
          </span>

          {/* TECHNOLOGIES, flanked by rules as in the master lockup */}
          <span className="mt-1.5 flex items-center gap-1.5">
            <span aria-hidden="true" className="h-px w-2 bg-ink-faint/60" />
            <span className="text-[0.5rem] font-bold tracking-[0.3em] text-ink-muted">
              TECHNOLOGIES
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-ink-faint/60" />
          </span>

          {variant === 'full' ? (
            <span className="mt-2 text-[0.5rem] font-bold tracking-[0.26em] text-brand-cyan">
              {siteConfig.tagline}
            </span>
          ) : null}
        </span>
      )}
    </>
  );

  if (!asLink) {
    return <div className={cn('flex items-center gap-3', className)}>{content}</div>;
  }

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        'flex items-center gap-3 rounded-lg transition-opacity duration-300 hover:opacity-90',
        className,
      )}
    >
      {content}
    </Link>
  );
}
