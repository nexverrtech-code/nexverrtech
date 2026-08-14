/**
 * Minimal PNG decoder/encoder for 8-bit RGBA, plus alpha-aware resampling.
 *
 * Written by hand so the brand pipeline needs no image dependency: Node's zlib
 * does the compression and everything else is a few hundred lines of pixel work.
 */
import { deflateSync, inflateSync } from 'node:zlib';

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/* ------------------------------------------------------------------ CRC32 */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i += 1) c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/* ----------------------------------------------------------------- decode */

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  return pb <= pc ? b : c;
}

/**
 * @returns {{ width: number, height: number, data: Uint8ClampedArray }} RGBA
 */
export function decodePng(buffer) {
  if (!buffer.subarray(0, 8).equals(SIGNATURE)) throw new Error('Not a PNG file');

  let offset = 8;
  let header = null;
  const idat = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const body = buffer.subarray(offset + 8, offset + 8 + length);

    if (type === 'IHDR') {
      header = {
        width: body.readUInt32BE(0),
        height: body.readUInt32BE(4),
        bitDepth: body[8],
        colorType: body[9],
        interlace: body[12],
      };
    } else if (type === 'IDAT') {
      idat.push(body);
    } else if (type === 'IEND') {
      break;
    }

    offset += 12 + length;
  }

  if (!header) throw new Error('PNG has no IHDR');
  if (header.bitDepth !== 8) throw new Error(`Unsupported bit depth ${header.bitDepth} (need 8)`);
  if (header.interlace !== 0) throw new Error('Interlaced PNGs are not supported');

  const channelsByType = { 0: 1, 2: 3, 4: 2, 6: 4 };
  const channels = channelsByType[header.colorType];
  if (!channels) throw new Error(`Unsupported colour type ${header.colorType}`);

  const { width, height } = header;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = new Uint8ClampedArray(width * height * 4);
  const previous = new Uint8Array(stride);
  const current = new Uint8Array(stride);

  let pos = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[pos];
    pos += 1;
    raw.copy(current, 0, pos, pos + stride);
    pos += stride;

    for (let i = 0; i < stride; i += 1) {
      const a = i >= channels ? current[i - channels] : 0;
      const b = previous[i];
      const c = i >= channels ? previous[i - channels] : 0;

      switch (filter) {
        case 0:
          break;
        case 1:
          current[i] = (current[i] + a) & 0xff;
          break;
        case 2:
          current[i] = (current[i] + b) & 0xff;
          break;
        case 3:
          current[i] = (current[i] + ((a + b) >> 1)) & 0xff;
          break;
        case 4:
          current[i] = (current[i] + paeth(a, b, c)) & 0xff;
          break;
        default:
          throw new Error(`Unknown filter type ${filter}`);
      }
    }

    // Normalise every colour type up to RGBA.
    for (let x = 0; x < width; x += 1) {
      const s = x * channels;
      const d = (y * width + x) * 4;

      if (channels === 4) {
        out[d] = current[s];
        out[d + 1] = current[s + 1];
        out[d + 2] = current[s + 2];
        out[d + 3] = current[s + 3];
      } else if (channels === 3) {
        out[d] = current[s];
        out[d + 1] = current[s + 1];
        out[d + 2] = current[s + 2];
        out[d + 3] = 255;
      } else if (channels === 2) {
        out[d] = out[d + 1] = out[d + 2] = current[s];
        out[d + 3] = current[s + 1];
      } else {
        out[d] = out[d + 1] = out[d + 2] = current[s];
        out[d + 3] = 255;
      }
    }

    previous.set(current);
  }

  return { width, height, data: out };
}

/* ----------------------------------------------------------------- encode */

function chunk(type, body) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(body.length, 0);
  const typed = Buffer.concat([Buffer.from(type, 'ascii'), body]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typed), 0);
  return Buffer.concat([length, typed, crc]);
}

export function encodePng({ width, height, data }) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);

  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (stride + 1);
    // Filter 1 (Sub) compresses flat and gradient artwork noticeably better
    // than no filtering, and costs nothing to apply.
    raw[rowStart] = 1;
    for (let i = 0; i < stride; i += 1) {
      const value = data[y * stride + i];
      const left = i >= 4 ? data[y * stride + i - 4] : 0;
      raw[rowStart + 1 + i] = (value - left) & 0xff;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    SIGNATURE,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* -------------------------------------------------------------- utilities */

/** Tight bounding box of everything above `threshold` alpha. */
export function alphaBounds({ width, height, data }, threshold = 8) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) throw new Error('Image is fully transparent');
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

export function crop(image, box) {
  const data = new Uint8ClampedArray(box.width * box.height * 4);

  for (let y = 0; y < box.height; y += 1) {
    for (let x = 0; x < box.width; x += 1) {
      const s = ((box.y + y) * image.width + (box.x + x)) * 4;
      const d = (y * box.width + x) * 4;
      data[d] = image.data[s];
      data[d + 1] = image.data[s + 1];
      data[d + 2] = image.data[s + 2];
      data[d + 3] = image.data[s + 3];
    }
  }

  return { width: box.width, height: box.height, data };
}

/**
 * Box-filter resample. Colour is averaged in premultiplied space so semi
 * transparent edges do not pull dark fringes into the artwork.
 */
export function resize(image, targetWidth, targetHeight) {
  const data = new Uint8ClampedArray(targetWidth * targetHeight * 4);
  const scaleX = image.width / targetWidth;
  const scaleY = image.height / targetHeight;

  for (let y = 0; y < targetHeight; y += 1) {
    const y0 = Math.floor(y * scaleY);
    const y1 = Math.max(y0 + 1, Math.ceil((y + 1) * scaleY));

    for (let x = 0; x < targetWidth; x += 1) {
      const x0 = Math.floor(x * scaleX);
      const x1 = Math.max(x0 + 1, Math.ceil((x + 1) * scaleX));

      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let sumA = 0;
      let count = 0;

      for (let sy = y0; sy < Math.min(y1, image.height); sy += 1) {
        for (let sx = x0; sx < Math.min(x1, image.width); sx += 1) {
          const s = (sy * image.width + sx) * 4;
          const a = image.data[s + 3];
          sumR += image.data[s] * a;
          sumG += image.data[s + 1] * a;
          sumB += image.data[s + 2] * a;
          sumA += a;
          count += 1;
        }
      }

      const d = (y * targetWidth + x) * 4;
      if (sumA > 0) {
        data[d] = Math.round(sumR / sumA);
        data[d + 1] = Math.round(sumG / sumA);
        data[d + 2] = Math.round(sumB / sumA);
        data[d + 3] = Math.round(sumA / count);
      }
    }
  }

  return { width: targetWidth, height: targetHeight, data };
}

export function blank(width, height, rgba = [0, 0, 0, 0]) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = rgba[0];
    data[i + 1] = rgba[1];
    data[i + 2] = rgba[2];
    data[i + 3] = rgba[3];
  }
  return { width, height, data };
}

/** Source-over composite of `top` onto `base` at (dx, dy). */
export function composite(base, top, dx, dy) {
  for (let y = 0; y < top.height; y += 1) {
    const by = dy + y;
    if (by < 0 || by >= base.height) continue;

    for (let x = 0; x < top.width; x += 1) {
      const bx = dx + x;
      if (bx < 0 || bx >= base.width) continue;

      const s = (y * top.width + x) * 4;
      const d = (by * base.width + bx) * 4;
      const sa = top.data[s + 3] / 255;
      if (sa === 0) continue;

      const da = base.data[d + 3] / 255;
      const outA = sa + da * (1 - sa);

      for (let c = 0; c < 3; c += 1) {
        base.data[d + c] = Math.round(
          (top.data[s + c] * sa + base.data[d + c] * da * (1 - sa)) / outA,
        );
      }
      base.data[d + 3] = Math.round(outA * 255);
    }
  }

  return base;
}

/** Centres `image` on a square canvas, scaled to `coverage` of the edge. */
export function padToSquare(image, size, coverage = 0.86, background = [0, 0, 0, 0]) {
  const longest = Math.max(image.width, image.height);
  const scale = (size * coverage) / longest;
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = blank(size, size, background);
  return composite(
    canvas,
    resize(image, width, height),
    Math.round((size - width) / 2),
    Math.round((size - height) / 2),
  );
}
