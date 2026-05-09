import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = 'C:/Users/Mjolniar\'s PC/Desktop/elden-ring-data';
const OUT_PATH = join(__dirname, '..', 'src', 'vanillaData.ts');

function readCSV(path: string): { headers: string[]; rows: Record<string,string>[] } {
  const raw = readFileSync(path, 'utf8');
  const lines = raw.trim().split('\n');
  const headers = lines[0].split(',');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    // Handle quoted fields
    const row: Record<string,string> = {};
    let current = '';
    let inQuotes = false;
    let col = 0;
    for (const ch of lines[i]) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) {
        row[headers[col] || `col${col}`] = current.trim();
        current = '';
        col++;
      } else {
        current += ch;
      }
    }
    row[headers[col] || `col${col}`] = current.trim();
    rows.push(row);
  }
  return { headers, rows };
}

interface VanillaEntry {
  name: string;
  category: string;
  location?: string;
  area?: string;
  sourceType?: string;
  isKeyItem?: boolean;
}

const entries: VanillaEntry[] = [];

// Weapons
const wpn = readCSV(join(DATA_DIR, 'weapons.csv'));
for (const r of wpn.rows) {
  if (!r.name || r.name.toLowerCase().includes('unused')) continue;
  const scales = r.scalesWith ? r.scalesWith.replace(/[^a-zA-Z,]/g, '') : '';
  entries.push({ name: r.name, category: 'weapon', location: `Category: ${r.category || 'Weapon'}. Scales: ${scales || 'Varies'}` });
}

// Shields
const shd = readCSV(join(DATA_DIR, 'shields.csv'));
for (const r of shd.rows) {
  if (!r.name) continue;
  entries.push({ name: r.name, category: 'shield', location: `Category: ${r.category || 'Shield'}` });
}

// Talismans
const tal = readCSV(join(DATA_DIR, 'talismans.csv'));
for (const r of tal.rows) {
  if (!r.name) continue;
  entries.push({ name: r.name, category: 'talisman', location: r.effect || 'Talisman' });
}

// Armor
const arm = readCSV(join(DATA_DIR, 'armors.csv'));
for (const r of arm.rows) {
  if (!r.name) continue;
  const cat = r.category || 'Armor';
  entries.push({ name: r.name, category: 'armor', location: `Slot: ${cat}` });
}

// Ashes of War
const ash = readCSV(join(DATA_DIR, 'ashes.csv'));
for (const r of ash.rows) {
  if (!r.name) continue;
  const cleanName = r.name.replace(/^Ash Of War:\s*/i, '');
  entries.push({ name: `Ash of War: ${cleanName}`, category: 'ash', location: `Affinity: ${r.affinity || 'Standard'}` });
}

// Incantations
const inc = readCSV(join(DATA_DIR, 'incantations.csv'));
for (const r of inc.rows) {
  if (!r.name) continue;
  const reqs = r.requires ? r.requires.replace(/[\[\]{}'"]/g, '').replace(/name:/g, '').replace(/amount:/g, '') : '';
  entries.push({ name: r.name, category: 'spell', location: `${r.type || 'Incantation'}. FP: ${r.cost || '?'}. Req: ${reqs}` });
}

// Sorceries
const sor = readCSV(join(DATA_DIR, 'sorceries.csv'));
for (const r of sor.rows) {
  if (!r.name) continue;
  const reqs = r.requires ? r.requires.replace(/[\[\]{}'"]/g, '').replace(/name:/g, '').replace(/amount:/g, '') : '';
  entries.push({ name: r.name, category: 'spell', location: `${r.type || 'Sorcery'}. FP: ${r.cost || '?'}. Req: ${reqs}` });
}

// Key items from items.csv
const itm = readCSV(join(DATA_DIR, 'items.csv'));
for (const r of itm.rows) {
  if (!r.name) continue;
  const isKey = /key|medallion|great rune|remembrance|bell bearing|whetstone|needle|memory stone|talisman pouch|golden seed|sacred tear|flask|map/i.test(r.name);
  entries.push({
    name: r.name,
    category: 'optional',
    location: r.obtainedFrom || r.type || 'Item',
    isKeyItem: isKey,
  });
}

// Generate the TS file
let out = `import type { ItemRecord } from './types';\n\n`;
out += `let _c = 0;\n`;
out += `function r(n: string, l: string, a: string, s: ItemRecord['sourceType'], k = false): ItemRecord {\n`;
out += `  return { id: 'v-'+ ++_c, itemName: n, originalItem: null, locationName: l, area: a, sourceType: s, isKeyItem: k, rawLine: n+' -- '+l+' ('+a+')', section: 'vanilla' };\n`;
out += `}\n\n`;
out += `export const VANILLA_ITEMS: ItemRecord[] = [\n`;

const areaMap: Record<string,string> = {
  weapon: '', shield: '', talisman: '', armor: '', ash: '', spell: '', optional: '',
};

for (const e of entries) {
  const area = areaMap[e.category] || '';
  const source: string = 'ground_pickup';
  out += `  r(${JSON.stringify(e.name)}, ${JSON.stringify(e.location || '')}, ${JSON.stringify(area)}, '${source}', ${e.isKeyItem || false}),\n`;
}

out += `];\n`;
writeFileSync(OUT_PATH, out, 'utf8');
console.log(`Generated ${entries.length} vanilla item entries.`);
