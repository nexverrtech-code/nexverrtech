/**
 * Derives every brand asset the site uses from one master file.
 *
 *   npm run brand
 *
 * Master:  brand/logo-master.png   (transparent background, any size)
 * Outputs: public/brand/nexverr-symbol.png   512×512  — the mark everywhere in the UI
 *          public/brand/favicon.png           96×96   — browser tab
 *          public/brand/apple-touch-icon.png 180×180  — iOS home screen, on brand navy
 *          public/og/og-default.png         1200×630  — social preview card
 *
 * Re-run it whenever the logo changes; nothing else needs touching.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  alphaBounds,
  blank,
  composite,
  crop,
  decodePng,
  encodePng,
  padToSquare,
  resize,
} from './lib/png.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Preferred location first; the others are where the file has lived before. */
const MASTER_CANDIDATES = ['brand/logo-master.png', 'src/styles/image/logo.png'];

const masterPath = MASTER_CANDIDATES.map((p) => resolve(root, p)).find((p) => existsSync(p));
if (!masterPath) {
  console.error(
    `No master logo found. Put a transparent PNG at:\n  ${MASTER_CANDIDATES[0]}\nthen run npm run brand again.`,
  );
  process.exit(1);
}

const write = async (relativePath, buffer) => {
  const target = resolve(root, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, buffer);
  console.log(`  ${relativePath.padEnd(38)} ${(buffer.length / 1024).toFixed(1)} kB`);
};

console.log(`\nMaster: ${masterPath.replace(root, '.')}`);

const master = decodePng(await readFile(masterPath));
const bounds = alphaBounds(master);
const trimmed = crop(master, bounds);

console.log(
  `Source ${master.width}×${master.height} → trimmed to ${trimmed.width}×${trimmed.height}\n`,
);

/* ------------------------------------------------------- the mark, square */

await write('public/brand/nexverr-symbol.png', encodePng(padToSquare(trimmed, 512, 0.94)));
await write('public/brand/favicon.png', encodePng(padToSquare(trimmed, 96, 0.94)));

/* ------------------------------------------ iOS icon, on the brand ground */

await write(
  'public/brand/apple-touch-icon.png',
  encodePng(padToSquare(trimmed, 180, 0.7, [3, 9, 34, 255])),
);

/* ------------------------------------------------------ social card, 1200×630 */

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const card = blank(OG_WIDTH, OG_HEIGHT);

// Brand ground: deep navy with a blue light behind the mark and a violet
// counter-light bottom-left, painted per pixel so it needs no rasteriser.
const lights = [
  { x: 0.68, y: 0.42, radius: 0.62, rgb: [0, 106, 245], strength: 0.5 },
  { x: 0.12, y: 0.9, radius: 0.55, rgb: [123, 31, 255], strength: 0.32 },
  { x: 0.68, y: 0.42, radius: 0.24, rgb: [0, 200, 255], strength: 0.22 },
];

for (let y = 0; y < OG_HEIGHT; y += 1) {
  for (let x = 0; x < OG_WIDTH; x += 1) {
    const d = (y * OG_WIDTH + x) * 4;
    const u = x / OG_WIDTH;
    const v = y / OG_HEIGHT;

    // Base gradient #030922 → #0B1638 across the diagonal.
    const t = Math.min(1, (u + v) / 2);
    let r = 3 + (11 - 3) * t;
    let g = 9 + (22 - 9) * t;
    let b = 34 + (56 - 34) * t;

    for (const light of lights) {
      const dx = (u - light.x) * (OG_WIDTH / OG_HEIGHT);
      const dy = v - light.y;
      const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / light.radius) ** 2 * light.strength;
      r += (light.rgb[0] - r) * falloff;
      g += (light.rgb[1] - g) * falloff;
      b += (light.rgb[2] - b) * falloff;
    }

    // Faint technical grid, matching the site background.
    if (x % 60 === 0 || y % 60 === 0) {
      r += 6;
      g += 12;
      b += 18;
    }

    card.data[d] = Math.round(r);
    card.data[d + 1] = Math.round(g);
    card.data[d + 2] = Math.round(b);
    card.data[d + 3] = 255;
  }
}

const ogMarkHeight = 300;
const ogMarkWidth = Math.round((trimmed.width / trimmed.height) * ogMarkHeight);
composite(
  card,
  resize(trimmed, ogMarkWidth, ogMarkHeight),
  Math.round(OG_WIDTH * 0.66 - ogMarkWidth / 2),
  Math.round((OG_HEIGHT - ogMarkHeight) / 2),
);

await write('public/og/og-default.png', encodePng(card));

console.log('\nBrand assets rebuilt from the master logo.\n');
