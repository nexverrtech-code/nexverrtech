/**
 * Brand asset paths — the single place the app refers to the logo.
 *
 * Every file below is generated from `brand/logo-master.png` by `npm run brand`.
 * Replace that master and re-run the script; nothing in the app changes.
 */
export const brandAssets = {
  /** Square, transparent, 512×512. Used everywhere in the UI. */
  symbol: '/brand/nexverr-symbol.png',
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
