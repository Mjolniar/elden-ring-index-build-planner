import type { ItemRecord } from './types';
import { BUILD_PRESETS, normalizeBuildName, isFreeformRequirement, getAreaRank } from './buildPlanner';
import { getItemStats } from './itemStats';

// Items whose names match these words are never weapons even if they have Str/Dex requirements.
const NON_WEAPON_RE = /\b(shield|greatshield|buckler|targe|staff|seal)\b/i;

let _weaponSet: Set<string> | null = null;

function weaponNameSet(): Set<string> {
  if (_weaponSet) return _weaponSet;
  const s = new Set<string>();
  for (const preset of BUILD_PRESETS) {
    for (const req of preset.requirements) {
      if (req.kind === 'weapon' && !isFreeformRequirement(req)) {
        s.add(normalizeBuildName(req.name));
      }
    }
  }
  return (_weaponSet = s);
}

/**
 * Returns true if this item record is a weapon.
 *
 * Detection order:
 * 1. Exact match against the build-preset weapon catalogue (highest confidence).
 * 2. Present in item-stat requirements with a Strength or Dexterity value,
 *    and the name does not identify it as a shield, staff, or seal.
 *
 * Conservative by design: spells, ashes, talismans, armor, and ambiguous
 * items are excluded. Items not meeting either criterion return false.
 */
export function isWeaponRecord(record: ItemRecord): boolean {
  if (weaponNameSet().has(normalizeBuildName(record.itemName))) return true;
  if (NON_WEAPON_RE.test(record.itemName)) return false;
  const stats = getItemStats(record.itemName);
  return !!stats && ('Strength' in stats || 'Dexterity' in stats);
}

/**
 * Returns the unique non-null area strings present in the given records,
 * sorted by rough area progression (earliest game areas first).
 */
export function regionsForRecords(records: ItemRecord[]): string[] {
  const areaMinRank = new Map<string, number>();
  for (const r of records) {
    if (!r.area) continue;
    const rank = getAreaRank(r);
    const cur = areaMinRank.get(r.area);
    if (cur === undefined || rank < cur) areaMinRank.set(r.area, rank);
  }
  return [...areaMinRank.entries()]
    .sort(([a, ar], [b, br]) => ar - br || a.localeCompare(b))
    .map(([area]) => area);
}

/**
 * Returns weapon records whose area is in the given set.
 * Returns an empty array when regions is empty.
 */
export function weaponsForRegions(records: ItemRecord[], regions: ReadonlySet<string>): ItemRecord[] {
  if (!regions.size) return [];
  return records.filter((r) => isWeaponRecord(r) && r.area !== null && regions.has(r.area));
}
