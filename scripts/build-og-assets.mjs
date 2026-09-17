/**
 * Social preview cards.
 *
 *   npm run og
 *
 * One 1200×630 PNG per entry in `src/lib/ogCards.ts`, written to `public/og/`.
 * Cards are generated rather than designed by hand for the same reason the
 * brand files are: the card a route points at and the card that exists on disk
 * are then the same list, and adding a page cannot leave a broken preview
 * behind.
 *
 * Each card is the brand ground — navy gradient, two brand lights, the
 * technical grid — with the mark, an eyebrow, the title and a footnote set in
 * the geometric alphabet from `lib/text.mjs`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { alphaBounds, blank, composite, crop, decodePng, encodePng, resize } from './lib/png.mjs';
import { drawText, textWidth } from './lib/text.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const WIDTH = 1200;
const HEIGHT = 630;
const MARGIN = 84;
const CONTENT_WIDTH = WIDTH - MARGIN * 2;
const TITLE_TRACKING = 0.17;

const INK = [248, 250, 255];
const MUTED = [155, 167, 199];

const TONES = {
  cyan: { accent: [0, 200, 255], light: [0, 200, 255] },
  blue: { accent: [0, 200, 255], light: [0, 106, 245] },
  violet: { accent: [154, 122, 255], light: [123, 31, 255] },
};

/** The brand ground: diagonal navy gradient, two lights, faint grid. */
function ground(tone) {
  const card = blank(WIDTH, HEIGHT);
  const lights = [
    { x: 0.78, y: 0.2, radius: 0.7, rgb: tone.light, strength: 0.45 },
    { x: 0.08, y: 0.96, radius: 0.6, rgb: [123, 31, 255], strength: 0.26 },
    { x: 0.86, y: 0.12, radius: 0.28, rgb: [0, 200, 255], strength: 0.2 },
  ];

  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      const d = (y * WIDTH + x) * 4;
      const u = x / WIDTH;
      const v = y / HEIGHT;

      // Base gradient #030922 → #0B1638 across the diagonal.
      const t = Math.min(1, (u + v) / 2);
      let r = 3 + (11 - 3) * t;
      let g = 9 + (22 - 9) * t;
      let b = 34 + (56 - 34) * t;

      for (const light of lights) {
        const dx = (u - light.x) * (WIDTH / HEIGHT);
        const dy = v - light.y;
        const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / light.radius) ** 2 * light.strength;
        r += (light.rgb[0] - r) * falloff;
        g += (light.rgb[1] - g) * falloff;
        b += (light.rgb[2] - b) * falloff;
      }

      // The same 60px technical grid the site background uses.
      if (x % 60 === 0 || y % 60 === 0) {
        r += 5;
        g += 11;
        b += 17;
      }

      card.data[d] = Math.round(r);
      card.data[d + 1] = Math.round(g);
      card.data[d + 2] = Math.round(b);
      card.data[d + 3] = 255;
    }
  }

  return card;
}

function fillRect(image, x, y, width, height, color, alpha = 1) {
  for (let py = y; py < y + height; py += 1) {
    for (let px = x; px < x + width; px += 1) {
      if (px < 0 || py < 0 || px >= image.width || py >= image.height) continue;
      const d = (py * image.width + px) * 4;
      for (let c = 0; c < 3; c += 1) {
        image.data[d + c] = Math.round(image.data[d + c] + (color[c] - image.data[d + c]) * alpha);
      }
    }
  }
}

/** Largest title size at which every line still fits the content column. */
function fitTitle(lines, max = 78, min = 40) {
  for (let size = max; size >= min; size -= 2) {
    if (lines.every((line) => textWidth(line, size, TITLE_TRACKING) <= CONTENT_WIDTH)) return size;
  }
  return min;
}

function renderCard(card, mark) {
  const tone = TONES[card.tone] ?? TONES.blue;
  const image = ground(tone);

  // Mark, top left.
  const markHeight = 96;
  const markWidth = Math.round((mark.width / mark.height) * markHeight);
  composite(image, resize(mark, markWidth, markHeight), MARGIN, MARGIN - 18);

  // Accent rule above the eyebrow.
  fillRect(image, MARGIN, 250, 58, 4, tone.accent, 0.95);

  drawText(image, card.eyebrow, {
    x: MARGIN + 78,
    y: 244,
    size: 20,
    tracking: 0.36,
    color: tone.accent,
    opacity: 0.95,
  });

  const size = fitTitle(card.lines);
  const lineHeight = Math.round(size * 1.22);
  let y = 300;

  for (const line of card.lines) {
    drawText(image, line, { x: MARGIN, y, size, tracking: TITLE_TRACKING, color: INK });
    y += lineHeight;
  }

  if (card.footnote) {
    drawText(image, card.footnote, {
      x: MARGIN,
      y: HEIGHT - MARGIN - 20,
      size: 20,
      tracking: 0.3,
      color: MUTED,
      opacity: 0.92,
    });
  }

  // Brand gradient rule along the bottom edge.
  for (let x = 0; x < WIDTH; x += 1) {
    const t = x / WIDTH;
    const color =
      t < 0.45
        ? [0 + (0 - 0) * t, 200 + (106 - 200) * (t / 0.45), 255 + (245 - 255) * (t / 0.45)]
        : [
            0 + (123 - 0) * ((t - 0.45) / 0.55),
            106 + (31 - 106) * ((t - 0.45) / 0.55),
            245 + (255 - 245) * ((t - 0.45) / 0.55),
          ];
    fillRect(image, x, HEIGHT - 6, 1, 6, color.map(Math.round), 1);
  }

  return image;
}

async function loadCards() {
  const server = await createServer({
    root,
    mode: 'production',
    logLevel: 'warn',
    appType: 'custom',
    server: { middlewareMode: true },
    // Nothing is served from this instance — it exists only to evaluate the
    // app's TypeScript modules. Skipping dependency discovery avoids a scan
    // that would still be running when the server closes.
    optimizeDeps: { noDiscovery: true, include: [] },
  });

  try {
    const { ogCards } = await server.ssrLoadModule('/src/lib/ogCards.ts');
    return ogCards;
  } finally {
    await server.close();
  }
}

const MASTER_CANDIDATES = ['brand/logo-master.png', 'public/brand/nexverr-symbol.png'];

async function main() {
  const masterPath = MASTER_CANDIDATES.map((p) => resolve(root, p)).find((p) => existsSync(p));
  if (!masterPath) {
    throw new Error(`No mark found. Expected one of: ${MASTER_CANDIDATES.join(', ')}`);
  }

  const master = decodePng(await readFile(masterPath));
  const mark = crop(master, alphaBounds(master));
  const cards = await loadCards();

  await mkdir(resolve(root, 'public/og'), { recursive: true });

  console.log(`\nMark: ${masterPath.replace(root, '.')}`);

  for (const card of cards) {
    const buffer = encodePng(renderCard(card, mark));
    const target = resolve(root, `public/og/${card.key}.png`);
    await writeFile(target, buffer);
    console.log(`  og/${`${card.key}.png`.padEnd(38)} ${(buffer.length / 1024).toFixed(1)} kB`);
  }

  console.log(`\n${cards.length} social cards written to public/og.\n`);
}

main().catch((error) => {
  console.error(`\nSocial card generation failed:\n${error.message}\n`);
  process.exit(1);
});
