import { brandAssets } from '@/components/brand/brandAssets';
import { cn } from '@/lib/utils';

interface SmartImageProps {
  /** Absolute path under `public/`. When absent, a branded panel is rendered. */
  src?: string;
  alt: string;
  width: number;
  height: number;
  /** Above the fold. Loads eagerly and is fetched at high priority. */
  priority?: boolean;
  className?: string;
  /** Applied to the wrapper, e.g. `aspect-[16/10]`. */
  frameClassName?: string;
  sizes?: string;
}

/**
 * The one image component on the site.
 *
 * Every image carries intrinsic `width`/`height` so the browser can reserve the
 * space before the file arrives — a layout shift avoided is worth more than any
 * amount of CLS tuning afterwards. Non-critical images are lazy and decoded off
 * the main thread; anything marked `priority` is loaded eagerly with a high
 * fetch priority, which is what an LCP image needs.
 *
 * When `src` is empty it renders a branded panel instead of a broken frame, so
 * a real photograph or screenshot can be dropped in later without touching the
 * page around it.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  frameClassName,
  sizes,
}: SmartImageProps) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'grid place-items-center overflow-hidden rounded-2xl border border-hairline',
          'bg-[radial-gradient(circle_at_30%_20%,rgba(0,106,245,0.26),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(123,31,255,0.2),transparent_60%)]',
          frameClassName,
        )}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <img
          src={brandAssets.symbol}
          alt=""
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="h-12 w-12 opacity-40 sm:h-14 sm:w-14"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // React 18 does not type `fetchpriority`; the lowercase attribute is what
      // the browser reads, so it is set through the DOM name directly.
      {...({ fetchpriority: priority ? 'high' : undefined } as Record<string, string | undefined>)}
      className={cn('h-auto w-full', className)}
    />
  );
}
