import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

interface CellValue { row: number; col: number; value: string }

function parseXLSX(xlsxDir: string): { sheetName: string; cells: CellValue[] }[] {
  const ss = readFileSync(join(xlsxDir, 'xl', 'sharedStrings.xml'), 'utf8');
  const dom = new JSDOM(ss, { contentType: 'text/xml' });
  const strings = [...dom.window.document.querySelectorAll('si')].map(si => {
    const t = si.querySelector('t');
    return t?.textContent || '';
  });

  const wb = readFileSync(join(xlsxDir, 'xl', 'workbook.xml'), 'utf8');
  const wbDom = new JSDOM(wb, { contentType: 'text/xml' });
  const sheets = [...wbDom.window.document.querySelectorAll('sheet')].map((s, i) => ({
    name: s.getAttribute('name') || `Sheet${i+1}`,
    id: s.getAttribute('sheetId') || '',
    idx: i,
  }));

  const wsDir = join(xlsxDir, 'xl', 'worksheets');
  const files = readdirSync(wsDir).filter(f => f.endsWith('.xml')).sort();
  const results: { sheetName: string; cells: CellValue[] }[] = [];

  for (let i = 0; i < files.length; i++) {
    const xml = readFileSync(join(wsDir, files[i]), 'utf8');
    const wsDom = new JSDOM(xml, { contentType: 'text/xml' });
    const cells: CellValue[] = [];

    wsDom.window.document.querySelectorAll('row').forEach(row => {
      const rowNum = parseInt(row.getAttribute('r') || '0');
      row.querySelectorAll('c').forEach(c => {
        const ref = c.getAttribute('r') || '';
        const colNum = ref.charCodeAt(0) - 65;
        const v = c.querySelector('v');
        let value = '';
        if (v) {
          if (c.getAttribute('t') === 's') {
            value = strings[parseInt(v.textContent || '0')] || '';
          } else {
            value = v.textContent || '';
          }
        }
        cells.push({ row: rowNum, col: colNum, value });
      });
    });

    results.push({ sheetName: sheets[i]?.name || `Sheet${i+1}`, cells });
  }
  return results;
}

const base = join(__dirname, '..');
const allItems: { name: string; location: string; sourceType: string }[] = [];

for (const dir of ['xlsx-extract-weapons', 'xlsx-extract-comp']) {
  const sheets = parseXLSX(join(base, dir));
  for (const sheet of sheets) {
    const rows = new Map<number, CellValue[]>();
    for (const c of sheet.cells) {
      if (!rows.has(c.row)) rows.set(c.row, []);
      rows.get(c.row)!.push(c);
    }
    for (const [_, rc] of rows) {
      for (const [nc, lc] of [[0,1],[3,4],[6,7],[9,10],[12,13]] as [number,number][]) {
        const n = rc.find(c => c.col === nc);
        const l = rc.find(c => c.col === lc);
        if (!n || !l || !n.value || !l.value) continue;
        const name = n.value.trim();
        const loc = l.value.trim();
        if (!name || name === 'LOCATION' || name === 'COLLECTED' || name === 'NAME' || name === 'FALSE'
          || name.match(/^(MELEE|RANGED|DAGGERS|STRAIGHT|GREATSWORDS|COLOSSAL|KATANAS|CURVED|BOWS|LIGHT BOW|GREATBOW|CROSSBOW|BALLISTA|STAFF|SEAL|SMALL|MEDIUM|ASHES|WHETBLADE|KEY|NOTE|OTHER|OFF|HELM|CHEST|GAUNTLET|GREAVE|TALISMAN BAG|ARMOR SET)/i)
          || name.length < 2 || name.length > 90) continue;
        if (!loc || loc === 'COLLECTED' || loc === 'FALSE') continue;

        const sourceType = loc.includes('💰') ? 'shop' : loc.includes('🦴') ? 'enemy_drop'
          : loc.includes('💀') ? 'boss_drop' : loc.includes('📜') ? 'event'
          : loc.includes('💎') ? 'boss_drop' : loc.includes('🌱') ? 'ground_pickup'
          : loc.includes('Drop') ? 'enemy_drop' : loc.includes('quest') ? 'event' : 'ground_pickup';

        const cleanLoc = loc.replace(/[💰🦴💀📜💎🌱🗡️⚔️⚪🌳🌑🌻💎☠️👑]*\s*/g, '').replace(/^\s*,\s*/, '').trim();
        if (!allItems.find(i => i.name === name)) {
          allItems.push({ name, location: cleanLoc || 'Acquired in-game', sourceType });
        }
      }
    }
  }
}

// Deduplicate by name
const seen = new Set<string>();
const unique = allItems.filter(i => {
  const key = i.name.toLowerCase();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log(`Parsed ${allItems.length} items, ${unique.length} unique`);

// CSV fallback for items without locations
function readCSV(path: string): { name: string; extra: string }[] {
  try {
    const raw = readFileSync(path, 'utf8');
    const lines = raw.trim().split('\n');
    const result: { name: string; extra: string }[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
      const n = cols[1] || '';
      if (n && !n.toLowerCase().includes('unused')) result.push({ name: n, extra: cols[4] || '' });
    }
    return result;
  } catch { return []; }
}

const DATA_DIR = join(__dirname, '..', 'elden-ring-data');
const locMap = new Map<string, string>();
const srcMap = new Map<string, string>();
for (const i of unique) { locMap.set(i.name, i.location); srcMap.set(i.name, i.sourceType); }

const talismans = readCSV(join(DATA_DIR, 'talismans.csv'));
const incantations = readCSV(join(DATA_DIR, 'incantations.csv'));
const sorceries = readCSV(join(DATA_DIR, 'sorceries.csv'));
const armors = readCSV(join(DATA_DIR, 'armors.csv'));

const OUT = join(base, 'src', 'vanillaData.ts');
let out = `import type { ItemRecord } from './types';\n\nlet _c=0;\n`;
out += `function r(n:string,l:string,s:ItemRecord['sourceType']):ItemRecord{return{id:'v-'+ ++_c,itemName:n,originalItem:null,locationName:l,area:'',sourceType:s,isKeyItem:false,rawLine:'',section:'vanilla'};}\n\n`;
out += `export const VANILLA_ITEMS:ItemRecord[]=[\n`;

function add(n: string, src: string, floc: string) {
  out += ` r(${JSON.stringify(n)},${JSON.stringify(locMap.get(n)||floc)},'${srcMap.get(n)||src}'),\n`;
}

for (const i of unique) add(i.name, i.sourceType, i.location);
for (const t of talismans) { if (!locMap.has(t.name)) add(t.name, 'ground_pickup', t.extra); }
for (const i of incantations) { if (!locMap.has(i.name)) add(i.name, 'ground_pickup', i.extra); }
for (const s of sorceries) { if (!locMap.has(s.name)) add(s.name, 'ground_pickup', s.extra); }
for (const a of armors) { if (!locMap.has(a.name)) add(a.name, 'enemy_drop', `Slot: ${a.extra}`); }

out += `];\n`;
writeFileSync(OUT, out, 'utf8');
console.log(`Wrote ${out.split('\n').filter(l=>l.includes('r(')).length} entries.`);
