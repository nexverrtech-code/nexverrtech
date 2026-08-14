/** Shown while a lazily-loaded route chunk arrives. Deliberately quiet. */
export function RouteFallback() {
  return (
    <div
      className="grid min-h-[60svh] place-items-center px-4"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-5">
        <img
          src="/brand/nexverr-symbol.png"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 animate-glow-pulse"
        />
        <div className="h-px w-24 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-shimmer bg-brand-gradient bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  );
}
