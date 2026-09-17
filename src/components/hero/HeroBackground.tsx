/**
 * Static ambience: grid, two brand lights and a vignette.
 *
 * Everything is a CSS gradient — no canvas, no particle system, no repaint cost
 * while scrolling, and no animation library in the critical path. The pointer
 * parallax lives with the hero scene, which arrives after first paint; this
 * layer has to be on screen immediately, so it stays still.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="nx-grid-bg nx-mask-fade-b absolute inset-0 opacity-70" />

      {/* A slow pass of light down the grid, so the backdrop is never quite still */}
      <div className="nx-mask-fade-b absolute inset-0 overflow-hidden">
        <div
          className="nx-anim-scan nx-motion-optional absolute inset-x-0 h-40"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(0,200,255,0.07) 45%, rgba(0,200,255,0.12) 50%, rgba(0,200,255,0.07) 55%, transparent)',
          }}
        />
      </div>

      {/* Brand lights */}
      <div
        className="nx-ambient -right-32 -top-40 h-[36rem] w-[36rem] md:right-0"
        style={{
          background:
            'radial-gradient(circle, rgba(0,106,245,0.22) 0%, rgba(0,200,255,0.10) 38%, transparent 70%)',
        }}
      />
      <div
        className="nx-ambient -left-40 top-1/3 h-[30rem] w-[30rem]"
        style={{
          background: 'radial-gradient(circle, rgba(123,31,255,0.16) 0%, transparent 68%)',
        }}
      />

      {/* Horizon line that grounds the section against the next one */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />
    </div>
  );
}
