import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const GAMEDATA = process.env.ERDB_DATA ?? join(tmpdir(), 'erdb-gamedata');
const TS_PATH = join(__dirname, '..', 'src', 'buildPlanner.ts');
const ALL_STATS = ['Vigor', 'Mind', 'Endurance', 'Strength', 'Dexterity', 'Intelligence', 'Faith', 'Arcane'];

// Softcap targets — primary stats are pushed to the first meaningful softcap,
// secondaries to a useful-but-not-dominant level, everything else to a
// survivability / mobility baseline.
const PRIMARY_TARGET: Record<string, number> = {
  Vigor: 60, Mind: 50, Endurance: 40,
  Strength: 54,       // effective 80 when two-handing
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
    name = name.replace(/^\[[^\]]+\]\s*/, ''); // strip [Sorcery] / [Incantation]
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

function estimateStats(
  requirements: Array<{ name: string; kind: string }>,
  primaryStats: string[],
  secondaryStats: string[],
): Record<string, number> {
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

// ─── Patch buildPlanner.ts ────────────────────────────────────────────────
let ts = readFileSync(TS_PATH, 'utf8');

const idPositions: Array<{ pos: number }> = [];
let search = ts.indexOf('"id": "');
while (search !== -1) {
  const after = ts.substring(search, search + 120);
  if (after.includes('"name"') && !after.includes('"node_id"')) {
    idPositions.push({ pos: search });
  }
  search = ts.indexOf('"id": "', search + 10);
}
console.log(`Presets found: ${idPositions.length}`);

const patches: Array<{ pos: number; inject: string }> = [];
let scraped = 0, calculated = 0, alreadyDone = 0;

for (const { pos } of idPositions) {
  const reqIdx = ts.indexOf('"requirements"', pos);
  if (reqIdx === -1 || reqIdx - pos > 5000) continue;
  const mid = ts.substring(pos, reqIdx);

  const hasValues = mid.includes('"statValues"');
  const hasSource = mid.includes('"statSource"');

  if (hasValues && hasSource) { alreadyDone++; continue; }

  if (hasValues && !hasSource) {
    patches.push({ pos: reqIdx, inject: `"statSource": "scraped",\n    ` });
    scraped++;
    continue;
  }

  // No statValues yet — estimate from weapon requirements + softcap rules.
  const extract = (re: RegExp) => {
    const m = mid.match(re);
    return m ? m[1].replace(/"/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];
  };
  const primaryStats   = extract(/"primaryStats":\s*\[([\s\S]*?)\]/);
  const secondaryStats = extract(/"secondaryStats":\s*\[([\s\S]*?)\]/);

  // Walk the requirements array with bracket counting to find its end.
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

  const stats = estimateStats(requirements, primaryStats, secondaryStats);
  patches.push({
    pos: reqIdx,
    inject: `"statValues": ${JSON.stringify(stats)},\n    "statSource": "calculated",\n    `,
  });
  calculated++;
}

patches.sort((a, b) => b.pos - a.pos);
for (const { pos, inject } of patches) {
  ts = ts.substring(0, pos) + inject + ts.substring(pos);
}

writeFileSync(TS_PATH, ts, 'utf8');
console.log(`Tagged scraped: ${scraped}, estimated: ${calculated}, already complete: ${alreadyDone}`);
