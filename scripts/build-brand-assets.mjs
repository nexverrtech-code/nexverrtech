/**
 * Derives every brand asset the site uses from one master file.
 *
 *   npm run brand
 *
 * Master:  brand/logo-master.png   (transparent background, any size)
 * Outputs: public/brand/nexverr-symbol.png   512×512  — full-size mark, schema + print
 *          public/brand/nexverr-mark.png     192×192  — the mark the UI actually renders
 *          public/brand/favicon.png           96×96   — browser tab
 *          public/brand/apple-touch-icon.png 180×180  — iOS home screen, on brand navy
 *
 * Re-run it whenever the logo changes, then `npm run og` for the social cards.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { alphaBounds, crop, decodePng, encodePng, padToSquare } from './lib/png.mjs';

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

// What the interface actually renders. The UI never shows the mark above 76 CSS
// pixels, so serving the 512px file to every visitor spent 150 kB on detail no
// screen displays.
await write('public/brand/nexverr-mark.png', encodePng(padToSquare(trimmed, 192, 0.94)));

await write('public/brand/favicon.png', encodePng(padToSquare(trimmed, 96, 0.94)));

/* ------------------------------------------ iOS icon, on the brand ground */

await write(
  'public/brand/apple-touch-icon.png',
  encodePng(padToSquare(trimmed, 180, 0.7, [3, 9, 34, 255])),
);

console.log('\nBrand assets rebuilt from the master logo.\n');
