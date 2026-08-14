import { MapPin } from 'lucide-react';
import { headquarters } from '@/data/branches';

/**
 * Where we are, answered in the hero rather than three scrolls down.
 *
 * Reads from `src/data/branches.ts`, so adding an office there updates this and
 * the contact page together. Links to the map only when one is configured.
 */
export function HeroLocation() {
  if (!headquarters) return null;

  const label = [headquarters.city, headquarters.state, headquarters.country]
    .filter(Boolean)
    .join(', ');

  const content = (
    <>
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-70 nx-motion-optional" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan" />
      </span>
      <MapPin className="h-3.5 w-3.5 text-brand-cyan" aria-hidden="true" />
      <span>{label}</span>
    </>
  );

  const className =
    'inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] px-3 py-1.5 text-[0.6875rem] font-bold tracking-[0.08em] text-ink-muted transition-colors duration-300';

  if (!headquarters.mapUrl) {
    return (
      <p className={className}>
        <span className="sr-only">Based in </span>
        {content}
      </p>
    );
  }

  return (
    <a
      href={headquarters.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} nx-touch-inline hover:border-brand-cyan/35 hover:text-ink`}
      aria-label={`Based in ${label} — view on map`}
    >
      {content}
    </a>
  );
}
