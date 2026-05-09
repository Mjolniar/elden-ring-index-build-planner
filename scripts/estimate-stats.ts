import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const GAMEDATA = process.env.ERDB_DATA ?? join(tmpdir(), 'erdb-gamedata');
const TS_PATH = join(__dirname, '..', 'src', 'buildPlanner.ts');
const ALL_STATS = ['Vigor', 'Mind', 'Endurance', 'Strength', 'Dexterity', 'Intelligence', 'Faith', 'Arcane'];

// Softcap targets used for calculated builds' recommended allocation.
const PRIMARY_TARGET: Record<string, number> = {
  Vigor: 60, Mind: 50, Endurance: 40,
  Strength: 54,   // effective 80 when two-handing
  Dexterity: 80,
  Intelligence: 60, Faith: 60, Arcane: 45,
};
const SECONDARY_TARGET: Record<string, number> = {
  Vigor: 50, Mind: 30, Endurance: 30,
  Strength: 25, Dexterity: 20,
  Intelligence: 16, Faith: 16, Arcane: 16,
};
const BASELINE: Record<string, number> = {
  Vigor: 40, Mind: 15, Endurance: 20,
  Strength: 10, Dexterity: 10,
  Intelligence: 7, Faith: 7, Arcane: 7,
};

type StatMap = Map<string, Partial<Record<string, number>>>;

function parseCsv(path: string, colMap: Record<string, string>): StatMap {
  const lines = readFileSync(path, 'utf8').split(/\r?\n/);
  const headers = lines[0].split(';');
  const nameIdx = headers.indexOf('Row Name');
  const statCols = Object.entries(colMap).map(([csvCol, stat]) => ({
    idx: headers.indexOf(csvCol), stat,
  }));
  const map: StatMap = new Map();
  for (const line of lines.slice(1)) {
    const f = line.split(';');
    let name = f[nameIdx]?.trim();
    if (!name) continue;
    name = name.replace(/^\[[^\]]+\]\s*/, '');
    const reqs: Partial<Record<string, number>> = {};
    for (const { idx, stat } of statCols) {
      const val = parseInt(f[idx] ?? '');
      if (val > 0) reqs[stat] = val;
    }
    map.set(name.toLowerCase(), reqs);
  }
  return map;
}

const weaponDB = parseCsv(join(GAMEDATA, 'EquipParamWeapon.csv'), {
  properStrength:  'Strength',
  properAgility:   'Dexterity',
  properMagic:     'Intelligence',
  properFaith:     'Faith',
  properLuck:      'Arcane',
});
const spellDB = parseCsv(join(GAMEDATA, 'Magic.csv'), {
  requirementIntellect: 'Intelligence',
  requirementFaith:     'Faith',
  requirementLuck:      'Arcane',
});
console.log(`DB loaded — weapons: ${weaponDB.size}, spells: ${spellDB.size}`);

function itemRequirements(requirements: Array<{ name: string; kind: string }>): Record<string, number> {
  const mins: Record<string, number> = {};
  for (const { name, kind } of requirements) {
    const key = name.toLowerCase().trim();
    const reqs = (kind === 'spell' ? spellDB.get(key) : undefined)
              ?? weaponDB.get(key)
              ?? spellDB.get(key);
    if (!reqs) continue;
    for (const [stat, val] of Object.entries(reqs)) {
      if (val) mins[stat] = Math.max(mins[stat] ?? 0, val);
    }
  }
  return mins;
}

function softcapRecommended(
  mins: Record<string, number>,
  primaryStats: string[],
  secondaryStats: string[],
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const stat of ALL_STATS) {
    const min = mins[stat] ?? 0;
    const target = primaryStats.includes(stat)   ? (PRIMARY_TARGET[stat] ?? 60)
                 : secondaryStats.includes(stat) ? (SECONDARY_TARGET[stat] ?? 20)
                 :                                  (BASELINE[stat] ?? 7);
    result[stat] = Math.max(min, target);
  }
  return result;
}

// ─── Load and prepare the TS file ────────────────────────────────────────────
let ts = readFileSync(TS_PATH, 'utf8');

// Phase 0: save scraped allocations keyed by preset id before stripping anything.
const savedScraped = new Map<string, Record<string, number>>();
{
  let s = ts.indexOf('"id": "');
  while (s !== -1) {
    const idEnd = ts.indexOf('"', s + 7);
    const id = ts.substring(s + 7, idEnd);
    const reqIdx = ts.indexOf('"requirements"', s);
    if (reqIdx !== -1 && reqIdx - s < 5000) {
      const mid = ts.substring(s, reqIdx);
      if (mid.includes('"statSource": "scraped"')) {
        // Try old field name (statValues) or new (statRequired)
        const m = mid.match(/"stat(?:Values|Required)":\s*(\{[^}]*\})/);
        if (m) try { savedScraped.set(id, JSON.parse(m[1])); } catch {}
      }
    }
    s = ts.indexOf('"id": "', s + 10);
  }
}
console.log(`Saved ${savedScraped.size} scraped allocations`);

// Phase 1: strip all existing stat injection fields (old and new names).
ts = ts.replace(/"statValues":\s*\{[^}]*\},\s*\n\s*/g, '');
ts = ts.replace(/"statRequired":\s*\{[^}]*\},\s*\n\s*/g, '');
ts = ts.replace(/"statRecommended":\s*\{[^}]*\},\s*\n\s*/g, '');
ts = ts.replace(/"statSource":\s*"[^"]+",\s*\n\s*/g, '');

// Phase 2: find preset positions in the now-clean file.
const idPositions: Array<{ id: string; pos: number }> = [];
let search = ts.indexOf('"id": "');
while (search !== -1) {
  const idEnd = ts.indexOf('"', search + 7);
  const id = ts.substring(search + 7, idEnd);
  const after = ts.substring(search, search + 120);
  if (after.includes('"name"') && !after.includes('"node_id"')) {
    idPositions.push({ id, pos: search });
  }
  search = ts.indexOf('"id": "', search + 10);
}
console.log(`Presets found: ${idPositions.length}`);

// Phase 3: build patch list.
const patches: Array<{ pos: number; inject: string }> = [];
let nScraped = 0, nCalculated = 0;

for (const { id, pos } of idPositions) {
  const reqIdx = ts.indexOf('"requirements"', pos);
  if (reqIdx === -1 || reqIdx - pos > 5000) continue;
  const mid = ts.substring(pos, reqIdx);

  const extract = (re: RegExp) => {
    const m = mid.match(re);
    return m ? m[1].replace(/"/g, '').split(',').map((s: string) => s.trim()).filter(Boolean) : [];
  };
  const primaryStats   = extract(/"primaryStats":\s*\[([\s\S]*?)\]/);
  const secondaryStats = extract(/"secondaryStats":\s*\[([\s\S]*?)\]/);

  // Walk requirements array.
  let depth = 0, i = reqIdx + 14;
  while (i < ts.length) {
    if (ts[i] === '[') depth++;
    else if (ts[i] === ']') { depth--; if (depth === 0) { i++; break; } }
    i++;
  }
  const reqSection = ts.substring(reqIdx, i);
  const names = [...reqSection.matchAll(/"name":\s*"([^"]+)"/g)].map(m => m[1]);
  const kinds = [...reqSection.matchAll(/"kind":\s*"([^"]+)"/g)].map(m => m[1]);
  const requirements = names.map((name, j) => ({ name, kind: kinds[j] ?? 'weapon' }));

  const statRequired = itemRequirements(requirements);

  let statRecommended: Record<string, number>;
  let source: string;
  if (savedScraped.has(id)) {
    statRecommended = savedScraped.get(id)!;
    source = 'scraped';
    nScraped++;
  } else {
    statRecommended = softcapRecommended(statRequired, primaryStats, secondaryStats);
    source = 'calculated';
    nCalculated++;
  }

  const reqLine  = Object.keys(statRequired).length > 0
    ? `"statRequired": ${JSON.stringify(statRequired)},\n    `
    : '';
  const recLine  = `"statRecommended": ${JSON.stringify(statRecommended)},\n    `;
  const srcLine  = `"statSource": "${source}",\n    `;

  patches.push({ pos: reqIdx, inject: reqLine + recLine + srcLine });
}

// Phase 4: apply patches in reverse order so earlier positions stay valid.
patches.sort((a, b) => b.pos - a.pos);
for (const { pos, inject } of patches) {
  ts = ts.substring(0, pos) + inject + ts.substring(pos);
}

writeFileSync(TS_PATH, ts, 'utf8');
console.log(`Done — scraped: ${nScraped}, calculated: ${nCalculated}`);
