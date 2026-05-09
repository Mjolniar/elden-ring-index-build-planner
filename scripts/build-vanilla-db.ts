import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

interface CellValue { row: number; col: number; value: string }

// Emoji characters used as source-type indicators in the spreadsheet.
// + not * — avoids consuming surrounding whitespace at every position.
const ICON_RE = /[💰🦴💀📜💎🌱🗡️⚔️⚪🌳🌑🌻🩸✉️☠️👑]+/gu;

// An entry whose NAME starts with one of these icons is a boss / location / note
// row from the completion tracker sheet — not an item.
const BOSS_ICON_PREFIX = /^[🌻🌑⚪🗡️💎💀🦴🌱💰📜🌳🩸✉️☠️👑]/u;

// Location cell contains an item-effect description rather than a place name.
const DESCRIPTION_RE = /\b(raises|increases|decreases|reduces|restores)\b|\bFP Cost\b|\bMaximum HP\b|\bDamage taken\b|\bSuccessive hits\b|\bInvincibility Frames\b|\bOne of the\b|^\d+%\s+\w/i;
const LOCATION_CATEGORY_RE = /^(incantations?|sorceries?|sorcery|ashes of war|ash of war|talismans?|weapons?|armor)$/i;
const RUNE_VALUE_RE = /^\d{1,3}(?:,\d{3})*\s+Runes?$/i;

// Area inference: checked in order, first match wins.
const AREA_MAP: [RegExp, string][] = [
  // Weeping Peninsula (before Limgrave so Castle Morne etc. match correctly)
  [/castle morne/i,             'Weeping Peninsula'],
  [/weeping peninsula/i,        'Weeping Peninsula'],
  [/tombsward/i,                'Weeping Peninsula'],
  [/impaler.s catacombs/i,      'Weeping Peninsula'],
  [/fourth church of marika/i,  'Weeping Peninsula'],
  // Limgrave
  [/stormveil/i,                'Limgrave'],
  [/stormhill/i,                'Limgrave'],
  [/limgrave/i,                 'Limgrave'],
  [/groveside/i,                'Limgrave'],
  [/murkwater/i,                'Limgrave'],
  [/summonwater/i,              'Limgrave'],
  [/fringefolk/i,               'Limgrave'],
  [/stranded graveyard/i,       'Limgrave'],
  [/warmaster.s shack/i,        'Limgrave'],
  [/gatefront/i,                'Limgrave'],
  [/dragon.burnt/i,             'Limgrave'],
  [/coastal cave/i,             'Limgrave'],
  [/highroad cave/i,            'Limgrave'],
  [/church of elleh/i,          'Limgrave'],
  [/kale shop/i,                'Limgrave'],
  [/knight bernahl shop/i,      'Limgrave'],
  [/sorceress sellen/i,         'Limgrave'],
  [/bloody finger nerijus/i,    'Limgrave'],
  [/chapel of anticipation/i,   'Limgrave'],
  // Liurnia
  [/raya lucaria/i,             'Liurnia'],
  [/liurnia/i,                  'Liurnia'],
  [/caria manor/i,              'Liurnia'],
  [/academy gate/i,             'Liurnia'],
  [/rose church/i,              'Liurnia'],
  [/revenger.s shack/i,         'Liurnia'],
  [/converted tower/i,          'Liurnia'],
  [/laskyar/i,                  'Liurnia'],
  [/ruin.strewn/i,              'Liurnia'],
  [/albinaurics/i,              'Liurnia'],
  [/frenzied flame village/i,   'Liurnia'],
  [/church of inhibition/i,     'Liurnia'],
  [/bellum/i,                   'Liurnia'],
  [/church of vows/i,           'Liurnia'],
  [/miriel/i,                   'Liurnia'],
  [/preceptor seluvis/i,        'Liurnia'],
  [/seluvis/i,                  'Liurnia'],
  [/ranni.s questline/i,        'Liurnia'],
  [/royal knight loretta/i,     'Liurnia'],
  [/thops/i,                    'Liurnia'],
  // Caelid (before Altus so Redmane etc. match)
  [/redmane castle/i,           'Caelid'],
  [/caelid/i,                   'Caelid'],
  [/sellia/i,                   'Caelid'],
  [/dragonbarrow/i,             'Caelid'],
  [/dragonsbarrow/i,            'Caelid'],
  [/bestial sanctum/i,          'Caelid'],
  [/fort gael/i,                'Caelid'],
  [/caelem ruins/i,             'Caelid'],
  [/aeonia/i,                   'Caelid'],
  [/gaol cave/i,                'Caelid'],
  [/forsaken ruins/i,           'Caelid'],
  [/street of sages ruins/i,    'Caelid'],
  [/gowry/i,                    'Caelid'],
  [/commander o.neil/i,         'Caelid'],
  [/gael tunnel/i,              'Caelid'],
  // Mt. Gelmir (before Altus)
  [/mt\.? gelmir/i,             'Mt. Gelmir'],
  [/gelmir hero.s grave/i,      'Mt. Gelmir'],
  [/volcano manor/i,            'Mt. Gelmir'],
  [/hermit.s shack/i,           'Mt. Gelmir'],
  [/road of iniquity/i,         'Mt. Gelmir'],
  [/hermit village/i,           'Mt. Gelmir'],
  [/patches shop/i,             'Mt. Gelmir'],
  [/bernhahl at volcano manor/i,'Mt. Gelmir'],
  [/bernahl at volcano manor/i, 'Mt. Gelmir'],
  [/recusant bernahl/i,         'Mt. Gelmir'],
  // Altus Plateau (after specific sub-areas)
  [/leyndell royal capital/i,   'Altus Plateau'],
  [/altus plateau/i,            'Altus Plateau'],
  [/auriza/i,                   'Altus Plateau'],
  [/sainted hero.s grave/i,     'Altus Plateau'],
  [/old altus tunnel/i,         'Altus Plateau'],
  [/abandoned coffin/i,         'Altus Plateau'],
  [/lux ruins/i,                'Altus Plateau'],
  [/dominula/i,                 'Altus Plateau'],
  [/shaded castle/i,            'Altus Plateau'],
  [/leyndell.*ashen/i,          'Altus Plateau'],
  [/leyndell/i,                 'Altus Plateau'],
  [/subterranean shunning/i,    'Altus Plateau'],
  [/forbidden lands/i,          'Altus Plateau'],
  [/elemer of the br/i,         'Altus Plateau'],
  // Mountaintops of the Giants
  [/giant.conquering/i,         'Mountaintops of the Giants'],
  [/castle sol/i,               'Mountaintops of the Giants'],
  [/mountaintops/i,             'Mountaintops of the Giants'],
  [/zamor ruins/i,              'Mountaintops of the Giants'],
  [/flame peak/i,               'Mountaintops of the Giants'],
  // Consecrated Snowfield
  [/consecrated snowfield/i,    'Consecrated Snowfield'],
  [/ordina/i,                   'Consecrated Snowfield'],
  [/inner consecrated/i,        'Consecrated Snowfield'],
  // Underground / Rivers
  [/siofra/i,                   'Siofra River'],
  [/nokron/i,                   'Nokron, Eternal City'],
  [/nokstella/i,                'Ainsel River'],
  [/ainsel/i,                   'Ainsel River'],
  [/deeproot/i,                 'Deeproot Depths'],
  [/lake of rot/i,              'Lake of Rot'],
  [/grand cloister/i,           'Lake of Rot'],
  [/mohgwyn/i,                  'Mohgwyn Palace'],
  // Crumbling Farum Azula
  [/farum azula/i,              'Crumbling Farum Azula'],
  [/crumbling farum/i,          'Crumbling Farum Azula'],
  // Haligtree
  [/elphael/i,                  "Miquella's Haligtree"],
  [/haligtree/i,                "Miquella's Haligtree"],
  // Shadow of the Erdtree DLC
  [/enir.ilim/i,                'Shadow of the Erdtree'],
  [/scadu/i,                    'Shadow of the Erdtree'],
  [/rauh/i,                     'Shadow of the Erdtree'],
  [/cerulean coast/i,           'Shadow of the Erdtree'],
  [/gravesite plain/i,          'Shadow of the Erdtree'],
  [/shadow.keep/i,              'Shadow of the Erdtree'],
  [/finger ruins/i,             'Shadow of the Erdtree'],
  [/jagged peak/i,              'Shadow of the Erdtree'],
  [/abyssal woods/i,            'Shadow of the Erdtree'],
  // Non-map but concrete acquisition contexts.
  [/roundtable hold/i,          'Roundtable Hold'],
  [/twin maiden husks?/i,       'Roundtable Hold'],
  [/enia shop/i,                'Roundtable Hold'],
  [/automatically rec(?:ei|ie)ved/i, 'Starting Loadout'],
];

function extractArea(loc: string): string {
  for (const [re, area] of AREA_MAP) {
    if (re.test(loc)) return area;
  }
  return 'Various';
}

// "Foo Drop (Bar Location)" → "Bar Location". Otherwise return cleaned string.
function cleanLocation(raw: string): string {
  // Strip icons and ** annotation markers, then normalise whitespace.
  let loc = raw
    .replace(ICON_RE, '')
    .replace(/\*\*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // "SomeBoss Drop (Actual Location)" → use the parenthetical as the location.
  const dropParen = loc.match(/^.+?\bDrop\s*\(([^)]+)\)\s*$/i);
  if (dropParen) loc = dropParen[1].trim();

  if (/bernahl/i.test(loc) && /recusant bernahl/i.test(loc)) {
    loc = 'Bernahl at Volcano Manor';
  }

  loc = loc.replace(/Giant Conquering Hero's Grave/gi, "Giant-Conquering Hero's Grave");
  loc = loc.replace(/Automatically Recieved/gi, 'Automatically Received');

  return loc.replace(/^[,\s]+|[,\s]+$/g, '').trim();
}

function parseXLSX(xlsxDir: string): { sheetName: string; cells: CellValue[] }[] {
  const ss = readFileSync(join(xlsxDir, 'xl', 'sharedStrings.xml'), 'utf8');
  const dom = new JSDOM(ss, { contentType: 'text/xml' });

  // Join ALL <t> runs inside each <si> — required for rich-text cells.
  const strings = [...dom.window.document.querySelectorAll('si')].map(si =>
    [...si.querySelectorAll('t')].map(t => t.textContent || '').join('')
  );

  const wb = readFileSync(join(xlsxDir, 'xl', 'workbook.xml'), 'utf8');
  const wbDom = new JSDOM(wb, { contentType: 'text/xml' });
  const sheets = [...wbDom.window.document.querySelectorAll('sheet')].map((s, i) => ({
    name: s.getAttribute('name') || `Sheet${i + 1}`,
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
          value = c.getAttribute('t') === 's'
            ? (strings[parseInt(v.textContent || '0')] || '')
            : (v.textContent || '');
        }
        cells.push({ row: rowNum, col: colNum, value });
      });
    });

    results.push({ sheetName: sheets[i]?.name || `Sheet${i + 1}`, cells });
  }
  return results;
}

// Source-type priority: shop > boss_drop > event > enemy_drop > ground_pickup
function sourceTypeFromLoc(rawLoc: string): string {
  if (rawLoc.includes('💰')) return 'shop';
  if (rawLoc.includes('💎')) return 'boss_drop';
  if (rawLoc.includes('💀')) return 'boss_drop';
  if (rawLoc.includes('📜')) return 'event';
  if (rawLoc.includes('🦴')) return 'enemy_drop';
  if (rawLoc.includes('🌱')) return 'ground_pickup';
  if (/automatically rec(?:ei|ie)ved/i.test(rawLoc)) return 'starting_loadout';
  if (/\bDrop\b/i.test(rawLoc)) return 'enemy_drop';
  if (/\bquest\b/i.test(rawLoc)) return 'event';
  return 'ground_pickup';
}

function isDescriptionLoc(loc: string): boolean {
  return DESCRIPTION_RE.test(loc) || /^[a-z]/.test(loc) || LOCATION_CATEGORY_RE.test(loc) || RUNE_VALUE_RE.test(loc);
}

// Names that are section headers or spreadsheet notes, not items.
const HEADER_RE = /^(MELEE|RANGED|DAGGERS|STRAIGHT|GREATSWORDS|COLOSSAL|KATANAS|CURVED|BOWS|LIGHT BOW|GREATBOW|CROSSBOW|BALLISTA|STAFF|SEAL|SMALL|MEDIUM|ASHES|WHETBLADE|KEY|NOTE|OTHER|OFF|HELM|CHEST|GAUNTLET|GREAVE|TALISMAN BAG|ARMOR SET|LOCATION|COLLECTED|NAME|FALSE|TRUE|BOSSES|INVADERS)/i;
const INVALID_LOC = new Set(['0', 'location', 'collected', 'false', 'true', 'name', 'killed', '']);

const base = join(__dirname, '..');
const rawItems: { name: string; rawLoc: string; location: string; sourceType: string }[] = [];
const ITEM_NAME_FIXES = new Map<string, string>([
  ['Zamor Cuved Sword', 'Zamor Curved Sword'],
]);

for (const dir of ['xlsx-extract-weapons', 'xlsx-extract-comp']) {
  const sheets = parseXLSX(join(base, dir));
  for (const sheet of sheets) {
    const rows = new Map<number, CellValue[]>();
    for (const c of sheet.cells) {
      if (!rows.has(c.row)) rows.set(c.row, []);
      rows.get(c.row)!.push(c);
    }

    for (const [, rc] of rows) {
      for (const [nc, lc] of [[0, 1], [3, 4], [6, 7], [9, 10], [12, 13]] as [number, number][]) {
        const n = rc.find(c => c.col === nc);
        const l = rc.find(c => c.col === lc);
        if (!n?.value || !l?.value) continue;

        const rawName = n.value.trim();
        const rawLoc  = l.value.trim();

        // Skip header rows, invalid names, names starting with an icon (boss/location entries).
        if (!rawName || rawName.length < 2 || rawName.length > 90) continue;
        if (HEADER_RE.test(rawName)) continue;
        if (/\b(BOSSES|INVADERS)\s*\(/i.test(rawName)) continue;
        if (BOSS_ICON_PREFIX.test(rawName)) continue;
        if (rawName.includes('**')) continue;

        // Skip invalid / non-location values in the location column.
        if (INVALID_LOC.has(rawLoc.toLowerCase())) continue;
        if (/^\d+$/.test(rawLoc)) continue; // pure numbers
        if (DESCRIPTION_RE.test(rawLoc)) continue; // item effect description, not a location
        if (LOCATION_CATEGORY_RE.test(rawLoc)) continue; // CSV/category label, not a location
        if (RUNE_VALUE_RE.test(rawLoc)) continue; // remembrance sell value, not a location
        if (/^[a-z]/.test(rawLoc)) continue; // lowercase-start = continuation of description text

        // Strip trailing legend markers (* for legendary, ! for remembrance) from item names.
        const cleanedName = rawName.replace(/[*!]+$/, '').trim();
        const name = ITEM_NAME_FIXES.get(cleanedName) || cleanedName;

        const location  = cleanLocation(rawLoc);
        const sourceType = sourceTypeFromLoc(rawLoc);

        if (!location) continue;
        rawItems.push({ name, rawLoc, location, sourceType });
      }
    }
  }
}

// Deduplicate: keep first occurrence of each lowercased name.
const seen = new Set<string>();
const unique = rawItems.filter(i => {
  const key = i.name.toLowerCase();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log(`Parsed ${rawItems.length} rows, ${unique.length} unique items`);

// CSV fallback for categories that may be missing from the XLSX.
function readCSV(path: string): { name: string; extra: string }[] {
  try {
    const raw = readFileSync(path, 'utf8');
    return raw.trim().split('\n').slice(1).map(line => {
      const cols = line.split(',').map(c => c.replace(/^"|"$/g, '').trim());
      return { name: cols[1] || '', extra: cols[4] || '' };
    }).filter(r => r.name && !r.name.toLowerCase().includes('unused'));
  } catch { return []; }
}

const DATA_DIR = join(base, 'elden-ring-data');
const locMap = new Map(unique.map(i => [i.name, i.location]));
const srcMap = new Map(unique.map(i => [i.name, i.sourceType]));

const talismans    = readCSV(join(DATA_DIR, 'talismans.csv'));
const incantations = readCSV(join(DATA_DIR, 'incantations.csv'));
const sorceries    = readCSV(join(DATA_DIR, 'sorceries.csv'));

// Build output.
const OUT = join(base, 'src', 'vanillaData.ts');

// Generate area lookup inline in the output file.
const areaMapSrc = AREA_MAP.map(([re, a]) => `  [/${re.source}/${re.flags}, ${JSON.stringify(a)}]`).join(',\n');

let out = `import type { ItemRecord } from './types';\n\n`;
out += `const AREA_MAP: [RegExp, string][] = [\n${areaMapSrc},\n];\n\n`;
out += `function inferArea(loc: string): string {\n  for (const [re, a] of AREA_MAP) { if (re.test(loc)) return a; } return 'Various';\n}\n\n`;
out += `let _c = 0;\n`;
out += `function r(n: string, l: string, s: ItemRecord['sourceType']): ItemRecord {\n`;
out += `  return { id: 'v-' + ++_c, itemName: n, originalItem: null, locationName: l, area: inferArea(l), sourceType: s, isKeyItem: false, rawLine: n + ' — ' + l, section: 'vanilla' };\n}\n\n`;
out += `export const VANILLA_ITEMS: ItemRecord[] = [\n`;

function add(name: string, src: string, fallbackLoc: string) {
  const loc = locMap.get(name) || fallbackLoc;
  const st  = srcMap.get(name) || src;
  out += ` r(${JSON.stringify(name)}, ${JSON.stringify(loc)}, '${st}'),\n`;
}

for (const i of unique) add(i.name, i.sourceType, i.location);
for (const t of talismans) {
  if (!locMap.has(t.name)) {
    const loc = t.extra || '';
    if (loc && !isDescriptionLoc(loc)) add(t.name, 'ground_pickup', loc);
  }
}
for (const i of incantations) {
  if (!locMap.has(i.name)) {
    const loc = i.extra || '';
    if (loc && !isDescriptionLoc(loc)) add(i.name, 'ground_pickup', loc);
  }
}
for (const s of sorceries) {
  if (!locMap.has(s.name)) {
    const loc = s.extra || '';
    if (loc && !isDescriptionLoc(loc)) add(s.name, 'ground_pickup', loc);
  }
}

out += `];\n`;
writeFileSync(OUT, out, 'utf8');

const count = (out.match(/^ r\(/mg) || []).length;
console.log(`Wrote ${count} entries to vanillaData.ts`);
