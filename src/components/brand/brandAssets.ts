/**
 * Brand asset paths — the single place the app refers to the logo.
 *
 * Every file below is generated from `brand/logo-master.png` by `npm run brand`
 * (social cards come from `npm run og`). Replace that master, re-run the
 * scripts, and nothing in the app changes.
 */
export const brandAssets = {
  /** 192×192. What the interface renders — never larger than 76 CSS pixels. */
  symbol: '/brand/nexverr-mark.png',
  /** 512×512. Used where a full-resolution mark is expected, e.g. schema. */
  logo: '/brand/nexverr-symbol.png',
  favicon: '/brand/favicon.png',
  appleTouchIcon: '/brand/apple-touch-icon.png',
  ogImage: '/og/og-default.png',
} as const;

/**
 * The mark is built along a single rising axis: up the left stem, down the
 * diagonal, up the right stem, then out through the arrow. The hero reveals it
 * along that same axis, so the logo appears to draw itself in its own direction
 * of travel rather than simply fading in.
 */
export const MARK_REVEAL_ANGLE = -45;
