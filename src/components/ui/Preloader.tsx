import { useEffect, useState } from 'react';
import { brandAssets } from '@/components/brand/brandAssets';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

/** How long the fade-out runs. Must match `.nx-preloader` in animations.css. */
const FADE_MS = 300;

/**
 * The brand moment between the first paint and the app being ready.
 *
 * It holds for exactly as long as that takes and not a millisecond longer: the
 * timer that used to keep it on screen for 700 ms was 700 ms of hidden hero,
 * paid for by every visitor on every load. `index.html` paints the same mark
 * before the bundle arrives, so the sequence still reads as one continuous
 * brand moment — it just no longer waits for its own animation to finish.
 *
 * Written in CSS rather than with the animation library, because this component
 * mounts on every page: importing the library here would put it in the first
 * chunk of every route, for one fade.
 */
export function Preloader() {
  const [phase, setPhase] = useState<'visible' | 'leaving' | 'gone'>('visible');

  useEffect(() => {
    // Two frames: one to paint the mark, one to start fading it out.
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setPhase('leaving'));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== 'leaving') return;
    const timer = window.setTimeout(() => setPhase('gone'), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div
      className={cn(
        'nx-preloader pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-base',
        phase === 'leaving' && 'is-leaving',
      )}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${siteConfig.name}`}
    >
      <div className="relative grid place-items-center">
        <div
          aria-hidden="true"
          className="nx-motion-optional pointer-events-none absolute h-52 w-52 animate-glow-pulse rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(0,200,255,0.30) 0%, rgba(0,106,245,0.16) 40%, transparent 70%)',
          }}
        />

        <img
          src={brandAssets.symbol}
          alt=""
          width={76}
          height={76}
          className="relative h-[4.75rem] w-[4.75rem]"
          fetchPriority="high"
        />

        <div aria-hidden="true" className="mt-8 h-px w-32 overflow-hidden bg-white/10">
          <div className="nx-preloader-bar h-full w-full bg-brand-gradient" />
        </div>

        <p className="mt-5 text-[0.625rem] font-bold tracking-[0.4em] text-ink-faint">
          {siteConfig.tagline}
        </p>
      </div>
    </div>
  );
}
