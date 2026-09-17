/**
 * A minimal geometric type renderer for the social cards.
 *
 * The brand pipeline has no image or font dependency — PNGs are decoded and
 * encoded by hand in `png.mjs` — so there is nothing here that can rasterise a
 * real typeface. Rather than shipping social cards with no words on them, or
 * adding a headless browser to the build, each uppercase letter is defined as a
 * few strokes on a 10-unit cap height and drawn as an anti-aliased distance
 * field. The result is a uniform-stroke geometric alphabet: not Manrope, but
 * deliberately technical, and consistent with the mark it sits beside.
 *
 * Only the characters the cards actually use are defined. An undefined
 * character throws, so a new card with an unsupported glyph fails the build
 * loudly instead of shipping a hole in the artwork.
 */

/** Sample an ellipse arc. Angles in degrees; y grows downward. */
function arc(cx, cy, rx, ry, from, to, steps = 28) {
  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
    points.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
  }
  return points;
}

/** Catmull-Rom smoothing, for the letters that are easier to define by feel. */
function smooth(points, steps = 6) {
  if (points.length < 3) return points;
  const out = [points[0]];

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    for (let s = 1; s <= steps; s += 1) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push([
        0.5 *
          (2 * p1[0] +
            (-p0[0] + p2[0]) * t +
            (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
            (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 *
          (2 * p1[1] +
            (-p0[1] + p2[1]) * t +
            (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
            (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ]);
    }
  }

  return out;
}

const W = 7; // standard glyph advance, in cap-height units

/** `{ width, strokes: [[x, y], …][] }` per character. */
export const GLYPHS = {
  ' ': { width: 3.4, strokes: [] },
  '-': { width: 4.6, strokes: [[[0.4, 5], [4.2, 5]]] },
  '/': { width: 4.8, strokes: [[[0.2, 10], [4.6, 0]]] },
  '.': { width: 2.6, strokes: [[[1.1, 9.7], [1.3, 9.7]]] },
  ',': { width: 2.6, strokes: [[[1.3, 9.4], [0.7, 10.8]]] },
  "'": { width: 2.4, strokes: [[[1.2, 0], [1.2, 2.4]]] },
  '&': {
    width: 7.6,
    strokes: [
      smooth([
        [7.2, 10],
        [2.8, 5.6],
        [1.6, 3.6],
        [2.4, 1],
        [4.4, 0.6],
        [5.4, 2],
        [4.6, 3.8],
        [1.2, 6.2],
        [0.6, 8.2],
        [2, 9.8],
        [4.4, 9.4],
        [6.4, 6.6],
      ]),
    ],
  },

  A: { width: W, strokes: [[[0, 10], [3.5, 0], [7, 10]], [[1.35, 6.2], [5.65, 6.2]]] },
  B: {
    width: 7.2,
    strokes: [
      [[0, 0], [0, 10]],
      [[0, 0], [4, 0]],
      arc(4, 2.5, 2.4, 2.5, -90, 90),
      [[0, 5], [4.1, 5]],
      arc(4.1, 7.5, 2.7, 2.5, -90, 90),
      [[0, 10], [4.1, 10]],
    ],
  },
  C: { width: W, strokes: [arc(3.5, 5, 3.5, 5, 58, 302)] },
  D: {
    width: 7.2,
    strokes: [
      [[0, 0], [0, 10]],
      [[0, 0], [3, 0]],
      arc(3, 5, 4, 5, -90, 90),
      [[0, 10], [3, 10]],
    ],
  },
  E: { width: 6.6, strokes: [[[6.4, 0], [0, 0], [0, 10], [6.4, 10]], [[0, 5], [5.2, 5]]] },
  F: { width: 6.4, strokes: [[[6.4, 0], [0, 0], [0, 10]], [[0, 5], [5.1, 5]]] },
  G: { width: 7.4, strokes: [arc(3.6, 5, 3.6, 5, 0, 302), [[4.2, 5.2], [7.2, 5.2]]] },
  H: { width: W, strokes: [[[0, 0], [0, 10]], [[7, 0], [7, 10]], [[0, 5], [7, 5]]] },
  I: { width: 2.4, strokes: [[[1.2, 0], [1.2, 10]]] },
  J: { width: 6.4, strokes: [[[6.2, 0], [6.2, 6.8]], arc(3.2, 6.8, 3, 3.2, 0, 180)] },
  K: {
    width: 7,
    strokes: [[[0, 0], [0, 10]], [[6.6, 0], [0.4, 5.4]], [[1.6, 4.4], [7, 10]]],
  },
  L: { width: 6.2, strokes: [[[0, 0], [0, 10], [6.2, 10]]] },
  M: { width: 8.6, strokes: [[[0, 10], [0, 0], [4.3, 6.4], [8.6, 0], [8.6, 10]]] },
  N: { width: 7.4, strokes: [[[0, 10], [0, 0], [7.4, 10], [7.4, 0]]] },
  O: { width: 7.6, strokes: [arc(3.8, 5, 3.8, 5, 0, 360)] },
  P: {
    width: 7,
    strokes: [[[0, 10], [0, 0], [3.6, 0]], arc(3.6, 3.1, 3, 3.1, -90, 90), [[0, 6.2], [3.6, 6.2]]],
  },
  Q: { width: 7.6, strokes: [arc(3.8, 5, 3.8, 5, 0, 360), [[4.6, 7.2], [7.4, 10]]] },
  R: {
    width: 7.2,
    strokes: [
      [[0, 10], [0, 0], [3.5, 0]],
      arc(3.5, 3.1, 3, 3.1, -90, 90),
      [[0, 6.2], [3.5, 6.2]],
      [[3.2, 6.2], [7.2, 10]],
    ],
  },
  S: {
    width: 7,
    strokes: [
      smooth([
        [6.5, 2.1],
        [5.4, 0.5],
        [3, 0.2],
        [0.9, 1.1],
        [0.5, 3],
        [1.9, 4.3],
        [5.2, 5.6],
        [6.5, 7],
        [6.1, 8.9],
        [3.9, 9.8],
        [1.5, 9.5],
        [0.4, 8],
      ]),
    ],
  },
  T: { width: W, strokes: [[[0, 0], [7, 0]], [[3.5, 0], [3.5, 10]]] },
  U: {
    width: 7.2,
    strokes: [[[0, 0], [0, 6.6]], arc(3.6, 6.6, 3.6, 3.4, 180, 0), [[7.2, 6.6], [7.2, 0]]],
  },
  V: { width: 7.2, strokes: [[[0, 0], [3.6, 10], [7.2, 0]]] },
  W: { width: 9.6, strokes: [[[0, 0], [2.1, 10], [4.8, 3.4], [7.5, 10], [9.6, 0]]] },
  X: { width: 7, strokes: [[[0, 0], [7, 10]], [[7, 0], [0, 10]]] },
  Y: { width: 7, strokes: [[[0, 0], [3.5, 5.2], [7, 0]], [[3.5, 5.2], [3.5, 10]]] },
  Z: { width: 6.8, strokes: [[[0, 0], [6.8, 0], [0, 10], [6.8, 10]]] },

  0: { width: 7.2, strokes: [arc(3.6, 5, 3.6, 5, 0, 360)] },
  1: { width: 4, strokes: [[[0.4, 1.8], [2.6, 0], [2.6, 10]]] },
  2: {
    width: 6.8,
    strokes: [smooth([[0.4, 2.4], [1.8, 0.4], [4.4, 0.3], [6, 1.8], [5.4, 4], [0.3, 10], [6.8, 10]])],
  },
  3: {
    width: 6.8,
    strokes: [
      smooth([[0.5, 1.6], [2.6, 0.2], [5.4, 1], [5.4, 3.6], [3, 4.9]]),
      smooth([[3, 4.9], [6, 5.8], [6.2, 8.4], [3.6, 9.9], [0.6, 8.8]]),
    ],
  },
  4: { width: 7.2, strokes: [[[5.2, 0], [0.2, 7.2], [7.2, 7.2]], [[5.2, 0], [5.2, 10]]] },
  5: {
    width: 6.8,
    strokes: [
      [[6.2, 0], [1, 0], [0.6, 4.4]],
      smooth([[0.6, 4.4], [3.4, 3.6], [6.2, 5.2], [6, 8.4], [3.2, 9.9], [0.5, 8.8]]),
    ],
  },
  6: {
    width: 7,
    strokes: [smooth([[6, 0.6], [3, 0.4], [0.8, 2.6], [0.4, 6.6], [1.8, 9.4], [4.8, 9.8], [6.6, 7.8], [5.8, 5.4], [2.8, 4.8], [0.6, 6.4]])],
  },
  7: { width: 6.6, strokes: [[[0, 0], [6.6, 0], [2.6, 10]]] },
  8: {
    width: 7,
    strokes: [arc(3.5, 2.5, 2.9, 2.5, 0, 360), arc(3.5, 7.4, 3.5, 2.6, 0, 360)],
  },
  9: {
    width: 7,
    strokes: [smooth([[1, 9.4], [4, 9.6], [6.2, 7.4], [6.6, 3.4], [5.2, 0.6], [2.2, 0.2], [0.4, 2.2], [1.2, 4.6], [4.2, 5.2], [6.4, 3.6]])],
  },
};

/** Advance width of a string, in cap-height units, including tracking. */
export function measure(text, tracking) {
  let width = 0;
  for (const char of text) {
    const glyph = GLYPHS[char];
    if (!glyph) throw new Error(`No glyph defined for "${char}" (in "${text}")`);
    width += glyph.width + tracking;
  }
  return Math.max(0, width - tracking);
}

function blend(image, x, y, color, alpha) {
  if (alpha <= 0 || x < 0 || y < 0 || x >= image.width || y >= image.height) return;
  const a = Math.min(1, alpha);
  const d = (y * image.width + x) * 4;
  image.data[d] = Math.round(image.data[d] + (color[0] - image.data[d]) * a);
  image.data[d + 1] = Math.round(image.data[d + 1] + (color[1] - image.data[d + 1]) * a);
  image.data[d + 2] = Math.round(image.data[d + 2] + (color[2] - image.data[d + 2]) * a);
  image.data[d + 3] = Math.max(image.data[d + 3], Math.round(255 * a));
}

/** Shortest distance from a point to a line segment. */
function distanceToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  const t = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSquared));
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

/**
 * Draws a line of text with its cap-top at `y` and its left edge at `x`.
 *
 * Coverage is accumulated into a single mask before compositing, so the
 * overlaps at a letter's joins never paint twice and show as a dark seam.
 */
export function drawText(image, text, { x, y, size, tracking = 0.16, color, opacity = 1 }) {
  const unit = size / 10;
  const half = (size * 0.125) / 2;
  const coverage = new Float32Array(image.width * image.height);

  let penX = x;

  for (const char of text) {
    const glyph = GLYPHS[char];
    if (!glyph) throw new Error(`No glyph defined for "${char}" (in "${text}")`);

    for (const stroke of glyph.strokes) {
      for (let i = 0; i < stroke.length - 1; i += 1) {
        const ax = penX + stroke[i][0] * unit;
        const ay = y + stroke[i][1] * unit;
        const bx = penX + stroke[i + 1][0] * unit;
        const by = y + stroke[i + 1][1] * unit;

        const minX = Math.max(0, Math.floor(Math.min(ax, bx) - half - 1));
        const maxX = Math.min(image.width - 1, Math.ceil(Math.max(ax, bx) + half + 1));
        const minY = Math.max(0, Math.floor(Math.min(ay, by) - half - 1));
        const maxY = Math.min(image.height - 1, Math.ceil(Math.max(ay, by) + half + 1));

        for (let py = minY; py <= maxY; py += 1) {
          for (let px = minX; px <= maxX; px += 1) {
            const distance = distanceToSegment(px + 0.5, py + 0.5, ax, ay, bx, by);
            const alpha = Math.max(0, Math.min(1, half + 0.5 - distance));
            const index = py * image.width + px;
            if (alpha > coverage[index]) coverage[index] = alpha;
          }
        }
      }
    }

    penX += (glyph.width + tracking * 10) * unit;
  }

  for (let py = 0; py < image.height; py += 1) {
    for (let px = 0; px < image.width; px += 1) {
      const alpha = coverage[py * image.width + px];
      if (alpha > 0) blend(image, px, py, color, alpha * opacity);
    }
  }

  return penX - x;
}

/** Width in pixels a string occupies at `size`. */
export function textWidth(text, size, tracking = 0.16) {
  const unit = size / 10;
  let width = 0;
  for (const char of text) {
    const glyph = GLYPHS[char];
    if (!glyph) throw new Error(`No glyph defined for "${char}" (in "${text}")`);
    width += (glyph.width + tracking * 10) * unit;
  }
  return Math.max(0, width - tracking * 10 * unit);
}
