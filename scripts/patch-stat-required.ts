/**
 * Recomputes statRequired for every build preset.
 * statRequired = max(item stat minimums) across all named requirements.
 *
 * Source priority:
 *   1. Fextralife JSON (exact name match — most reliable)
 *   2. Magic.csv (spells with name-stripped prefix match)
 *   3. EquipParamWeapon.csv (weapons/shields/seals/staves)
 *
 * Freeform / armor / talisman / ash requirements are skipped.
 * Validates statRequired <= statRecommended and flags violations.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { BUILD_PRESETS, isFreeformRequirement } from '../src/buildPlanner';
import type { BuildPreset } from '../src/buildPlanner';

const GAMEDATA    = process.env.ERDB_DATA ?? join(tmpdir(), 'erdb-gamedata');
const TS_PATH     = join(__dirname, '..', 'src', 'buildPlanner.ts');
const FEXTRA_JSON = 'C:\\Users\\Mjolniar\'s PC\\Desktop\\AI\\Code Projects\\Elden Ring Master\\Elden Ring Fextra Harvester\\output\\fextra-location-overrides.json';

type StatName = 'Strength' | 'Dexterity' | 'Intelligence' | 'Faith' | 'Arcane';
type StatReqs = Partial<Record<StatName, number>>;

// ─── Source 1: Fextralife JSON ────────────────────────────────────────────────

function buildFextraDb(): Map<string, StatReqs> {
  const db = new Map<string, StatReqs>();
  try {
    const entries = JSON.parse(readFileSync(FEXTRA_JSON, 'utf8')) as Array<{
      itemName: string;
      stats?: { requires?: Record<string, number> };
    }>;
    for (const e of entries) {
      if (!e.stats?.requires) continue;
      const req: StatReqs = {};
      for (const [k, v] of Object.entries(e.stats.requires)) {
        if (v > 0) (req as Record<string, number>)[k] = v;
      }
      if (Object.keys(req).length > 0) {
        db.set(e.itemName.toLowerCase(), req);
      }
    }
  } catch {
    console.warn('  Warning: could not load Fextralife JSON — using CSV fallback only');
  }
  return db;
}

// ─── Source 2 & 3: Game CSVs ─────────────────────────────────────────────────

function parseCsv(path: string): string[][] {
  return readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map(l => l.split(';'));
}

function buildWeaponDb(): Map<string, StatReqs> {
  const rows = parseCsv(join(GAMEDATA, 'EquipParamWeapon.csv'));
  const h = rows[0];
  const nameIdx = h.indexOf('Row Name');
  const strIdx  = h.indexOf('properStrength');
  const dexIdx  = h.indexOf('properAgility');
  const intIdx  = h.indexOf('properMagic');
  const faiIdx  = h.indexOf('properFaith');
  const arcIdx  = h.indexOf('properLuck');
  const db = new Map<string, StatReqs>();
  for (const row of rows.slice(1)) {
    const raw = row[nameIdx]?.trim();
    if (!raw) continue;
    const req: StatReqs = {};
    const str = parseInt(row[strIdx] ?? '0'); if (str > 0) req.Strength     = str;
    const dex = parseInt(row[dexIdx] ?? '0'); if (dex > 0) req.Dexterity    = dex;
    const int = parseInt(row[intIdx] ?? '0'); if (int > 0) req.Intelligence = int;
    const fai = parseInt(row[faiIdx] ?? '0'); if (fai > 0) req.Faith        = fai;
    const arc = parseInt(row[arcIdx] ?? '0'); if (arc > 0) req.Arcane       = arc;
    db.set(raw.toLowerCase(), req);
  }
  return db;
}

function buildSpellDb(): Map<string, StatReqs> {
  const rows = parseCsv(join(GAMEDATA, 'Magic.csv'));
  const h = rows[0];
  const nameIdx = h.indexOf('Row Name');
  const intIdx  = h.indexOf('requirementIntellect');
  const faiIdx  = h.indexOf('requirementFaith');
  const arcIdx  = h.indexOf('requirementLuck');
  const db = new Map<string, StatReqs>();
  for (const row of rows.slice(1)) {
    const raw = row[nameIdx]?.trim();
    if (!raw) continue;
    const key = raw.replace(/^\[[^\]]+\]\s*/, '').toLowerCase();
    const req: StatReqs = {};
    const int = parseInt(row[intIdx] ?? '0'); if (int > 0) req.Intelligence = int;
    const fai = parseInt(row[faiIdx] ?? '0'); if (fai > 0) req.Faith        = fai;
    const arc = parseInt(row[arcIdx] ?? '0'); if (arc > 0) req.Arcane       = arc;
    if (!db.has(key)) db.set(key, req);
  }
  return db;
}

console.log('Loading databases...');
const fextraDb = buildFextraDb();
const weaponDb = buildWeaponDb();
const spellDb  = buildSpellDb();
console.log(`  Fextra JSON: ${fextraDb.size} items with requires`);
console.log(`  Weapon CSV:  ${weaponDb.size} entries`);
console.log(`  Spell CSV:   ${spellDb.size} entries`);

// ─── Lookup (fextra → CSV fallback) ──────────────────────────────────────────

function lookupReqs(name: string, kind: string): StatReqs | null {
  const key = name.toLowerCase().trim();

  // Fextra first (exact name match)
  const fextra = fextraDb.get(key);
  if (fextra) return Object.keys(fextra).length > 0 ? fextra : null;

  // CSV fallback
  if (kind === 'spell') {
    const spell = spellDb.get(key);
    if (spell) return Object.keys(spell).length > 0 ? spell : null;
  }
  const weapon = weaponDb.get(key);
  if (weapon) return Object.keys(weapon).length > 0 ? weapon : null;

  return null;
}

// ─── Per-build computation ────────────────────────────────────────────────────

function computeStatRequired(preset: BuildPreset): {
  statRequired: StatReqs;
  missing: string[];
} {
  const mins: Record<string, number> = {};
  const missing: string[] = [];

  for (const req of preset.requirements) {
    if (isFreeformRequirement(req)) continue;
    if (['armor', 'talisman', 'ash', 'optional'].includes(req.kind)) continue;

    const reqs = lookupReqs(req.name, req.kind)
      ?? req.aliases?.map(a => lookupReqs(a, req.kind)).find(r => r != null)
      ?? null;

    if (!reqs) {
      missing.push(`${req.name} (${req.kind})`);
      continue;
    }
    for (const [stat, val] of Object.entries(reqs)) {
      if (val) mins[stat] = Math.max(mins[stat] ?? 0, val);
    }
  }

  const statRequired: StatReqs = {};
  for (const [stat, val] of Object.entries(mins)) {
    if (val > 0) (statRequired as Record<string, number>)[stat] = val;
  }
  return { statRequired, missing };
}

// ─── Apply to buildPlanner.ts ─────────────────────────────────────────────────

let ts = readFileSync(TS_PATH, 'utf8');
const allMissing: string[] = [];
let violations = 0;

interface Patch { startIdx: number; newStatRequired: StatReqs; presetId: string }
const patches: Patch[] = [];

for (const preset of BUILD_PRESETS) {
  const { statRequired, missing } = computeStatRequired(preset);
  if (missing.length > 0) allMissing.push(`[${preset.id}] ${missing.join(', ')}`);

  // Flag where statRequired exceeds statRecommended
  if (preset.statRecommended) {
    for (const [stat, reqVal] of Object.entries(statRequired)) {
      const recVal = (preset.statRecommended as Record<string, number>)[stat] ?? 0;
      if (reqVal > recVal) {
        console.warn(`  VIOLATION ${preset.id}: statRequired.${stat}=${reqVal} > statRecommended.${stat}=${recVal}`);
        violations++;
      }
    }
  }

  const startIdx = ts.indexOf(`"id": "${preset.id}"`);
  if (startIdx === -1) { console.warn(`  Could not find ${preset.id}`); continue; }
  patches.push({ presetId: preset.id, startIdx, newStatRequired: statRequired });
}

// Apply in reverse order so positions stay valid
patches.sort((a, b) => b.startIdx - a.startIdx);

for (const { startIdx, newStatRequired } of patches) {
  const reqIdx = ts.indexOf('"requirements"', startIdx);
  if (reqIdx === -1 || reqIdx - startIdx > 6000) continue;

  const segment = ts.substring(startIdx, reqIdx);
  const newJson = `"statRequired": ${JSON.stringify(newStatRequired)},`;

  if (segment.includes('"statRequired"')) {
    ts = ts.substring(0, startIdx)
      + segment.replace(/"statRequired":\s*\{[^}]*\},?\s*/g, newJson + '\n    ')
      + ts.substring(reqIdx);
  } else {
    const recIdx = segment.indexOf('"statRecommended"');
    const insertAt = recIdx !== -1 ? startIdx + recIdx : reqIdx;
    ts = ts.substring(0, insertAt) + newJson + '\n    ' + ts.substring(insertAt);
  }
}

writeFileSync(TS_PATH, ts, 'utf8');
console.log(`\nPatched ${patches.length} builds. Violations: ${violations}`);

if (allMissing.length) {
  console.log(`\nItems not found in any DB (${allMissing.length} presets):`);
  for (const m of allMissing) console.log(`  ${m}`);
}
