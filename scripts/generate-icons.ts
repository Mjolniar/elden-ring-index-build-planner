import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  const table: number[] = [];
  for (let i = 0; i < 256; i++) {
    let v = i;
    for (let j = 0; j < 8; j++) {
      v = v & 1 ? 0xedb88320 ^ (v >>> 1) : v >>> 1;
    }
    table[i] = v;
  }
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeB = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.concat([typeB, data]);
  const crc = crc32(crcBuf);
  const crcBytes = Buffer.alloc(4);
  crcBytes.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeB, data, crcBytes]);
}

function createPNG(pixels: Buffer, width: number, height: number): Buffer {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowOff = y * (1 + width * 4);
    raw[rowOff] = 0;
    pixels.copy(raw, rowOff + 1, y * width * 4, (y + 1) * width * 4);
  }

  const deflated = deflateSync(raw);

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdrData),
    chunk('IDAT', deflated),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function rectFill(pixels: Uint8Array, x: number, y: number, w: number, h: number, r: number, g: number, b: number, a: number) {
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      const px = x + dx;
      const py = y + dy;
      if (px < 0 || px >= 256 || py < 0 || py >= 256) continue;
      const off = (py * 256 + px) * 4;
      pixels[off] = r;
      pixels[off + 1] = g;
      pixels[off + 2] = b;
      pixels[off + 3] = a;
    }
  }
}

function setPixel(pixels: Uint8Array, px: number, py: number, r: number, g: number, b: number, a: number) {
  if (px < 0 || px >= 256 || py < 0 || py >= 256) return;
  const off = (py * 256 + px) * 4;
  pixels[off] = r;
  pixels[off + 1] = g;
  pixels[off + 2] = b;
  pixels[off + 3] = a;
}

function drawRing(pixels: Uint8Array, cx: number, cy: number, outerR: number, innerR: number, r: number, g: number, b: number, a: number) {
  for (let y = Math.max(0, cy - outerR); y < Math.min(256, cy + outerR); y++) {
    for (let x = Math.max(0, cx - outerR); x < Math.min(256, cx + outerR); x++) {
      const d = dist(x, y, cx, cy);
      if (d > innerR && d <= outerR) {
        setPixel(pixels, x, y, r, g, b, a);
      }
    }
  }
}

function drawLine(pixels: Uint8Array, x1: number, y1: number, x2: number, y2: number, thick: number, r: number, g: number, b: number, a: number) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const steps = Math.max(dx, dy);
  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    const px = Math.round(x1 + (x2 - x1) * t);
    const py = Math.round(y1 + (y2 - y1) * t);
    for (let ty = -thick; ty <= thick; ty++) {
      for (let tx = -thick; tx <= thick; tx++) {
        setPixel(pixels, px + tx, py + ty, r, g, b, a);
      }
    }
  }
}

function drawGlyph(pixels: Uint8Array, ox: number, oy: number, glyph: string[], r: number, g: number, b: number, a: number, scale: number) {
  for (let gy = 0; gy < glyph.length; gy++) {
    const row = glyph[gy];
    for (let gx = 0; gx < row.length; gx++) {
      if (row[gx] === '#') {
        rectFill(pixels, ox + gx * scale, oy + gy * scale, scale, scale, r, g, b, a);
      }
    }
  }
}

function generateVanillaIcon(): Buffer {
  const size = 256;
  const buf = Buffer.alloc(size * size * 4);
  const pixels = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);

  // Dark blue background
  rectFill(pixels, 0, 0, 256, 256, 20, 20, 50, 255);

  // Subtle inner gradient
  const cx = 128, cy = 128;
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const d = dist(x, y, cx, cy) / 150;
      const off = (y * 256 + x) * 4;
      const fade = Math.max(0, Math.min(1, 1 - d));
      pixels[off] = Math.round(20 + 30 * fade);
      pixels[off + 1] = Math.round(20 + 20 * fade);
      pixels[off + 2] = Math.round(50 + 20 * fade);
    }
  }

  // Outer gold ring
  const gold = [255, 215, 0];
  drawRing(pixels, cx, cy, 90, 80, gold[0], gold[1], gold[2], 255);

  // Inner thin ring
  drawRing(pixels, cx, cy, 75, 73, gold[0], gold[1], gold[2], 180);

  // "ER" text in gold, centered
  // E glyph (7 rows x 5 cols)
  const E = [
    '#####',
    '#    ',
    '#####',
    '#    ',
    '#####',
    '     ',
    '     ',
  ];
  // R glyph (7 rows x 5 cols)
  const R = [
    '#####',
    '#   #',
    '#####',
    '#  # ',
    '#   #',
    '     ',
    '     ',
  ];
  const scale = 5;
  drawGlyph(pixels, 75, 110, E, gold[0], gold[1], gold[2], 255, scale);
  drawGlyph(pixels, 125, 110, R, gold[0], gold[1], gold[2], 255, scale);

  return createPNG(buf, size, size);
}

function drawArrowHead(pixels: Uint8Array, px: number, py: number, dx: number, dy: number, r: number, g: number, b: number, a: number) {
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return;
  const nx = dx / len;
  const ny = dy / len;
  const wingLen = 12;

  const wx = -ny * wingLen;
  const wy = nx * wingLen;

  setPixel(pixels, Math.round(px), Math.round(py), r, g, b, a);
  for (let i = 0; i <= wingLen; i++) {
    const ex = Math.round(px - nx * i + wx * (i / wingLen));
    const ey = Math.round(py - ny * i + wy * (i / wingLen));
    setPixel(pixels, ex, ey, r, g, b, a);

    const ex2 = Math.round(px - nx * i - wx * (i / wingLen));
    const ey2 = Math.round(py - ny * i - wy * (i / wingLen));
    setPixel(pixels, ex2, ey2, r, g, b, a);
  }
}

function generateRandomizerIcon(): Buffer {
  const size = 256;
  const buf = Buffer.alloc(size * size * 4);
  const pixels = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);

  const cx = 128, cy = 128;

  // Dark red background with gradient
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const d = dist(x, y, cx, cy) / 150;
      const off = (y * 256 + x) * 4;
      const fade = Math.max(0, Math.min(1, 1 - d));
      pixels[off] = Math.round(35 + 20 * fade);
      pixels[off + 1] = Math.round(10 + 5 * fade);
      pixels[off + 2] = Math.round(10 + 5 * fade);
      pixels[off + 3] = 255;
    }
  }

  // Gold ring (same as vanilla)
  const gold = [255, 215, 0];
  drawRing(pixels, cx, cy, 90, 80, gold[0], gold[1], gold[2], 255);
  drawRing(pixels, cx, cy, 75, 73, gold[0], gold[1], gold[2], 180);

  // Crossed shuffle arrows
  const arrowColor = gold;
  const arrowOff = 50;
  drawLine(pixels, cx - arrowOff, cy - arrowOff, cx + arrowOff, cy + arrowOff, 5, arrowColor[0], arrowColor[1], arrowColor[2], 255);
  drawLine(pixels, cx - arrowOff, cy + arrowOff, cx + arrowOff, cy - arrowOff, 5, arrowColor[0], arrowColor[1], arrowColor[2], 255);

  // Arrow heads at the four endpoints
  drawArrowHead(pixels, cx + arrowOff + 5, cy + arrowOff + 5, 15, 15, arrowColor[0], arrowColor[1], arrowColor[2], 255);
  drawArrowHead(pixels, cx - arrowOff - 5, cy - arrowOff - 5, -15, -15, arrowColor[0], arrowColor[1], arrowColor[2], 255);
  drawArrowHead(pixels, cx + arrowOff + 5, cy - arrowOff - 5, 15, -15, arrowColor[0], arrowColor[1], arrowColor[2], 255);
  drawArrowHead(pixels, cx - arrowOff - 5, cy + arrowOff + 5, -15, 15, arrowColor[0], arrowColor[1], arrowColor[2], 255);

  return createPNG(buf, size, size);
}

const assetsDir = join(__dirname, '..', 'assets');
import { mkdirSync } from 'node:fs';
mkdirSync(assetsDir, { recursive: true });

const vanillaPng = generateVanillaIcon();
writeFileSync(join(assetsDir, 'icon-vanilla.png'), vanillaPng);
console.log('Generated: assets/icon-vanilla.png');

const randomizerPng = generateRandomizerIcon();
writeFileSync(join(assetsDir, 'icon-randomizer.png'), randomizerPng);
console.log('Generated: assets/icon-randomizer.png');
