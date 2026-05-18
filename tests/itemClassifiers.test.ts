import { describe, expect, it } from 'vitest';
import type { ItemRecord } from '../src/types';
import { isWeaponRecord, regionsForRecords, weaponsForRegions } from '../src/itemClassifiers';

function rec(itemName: string, area: string | null = 'Limgrave', locationName = `Found in ${area ?? 'unknown'}`): ItemRecord {
  return {
    id: itemName,
    itemName,
    originalItem: null,
    locationName,
    area,
    sourceType: 'ground_pickup',
    isKeyItem: false,
    rawLine: `${locationName}: ${itemName}`,
    section: 'spoilers',
  };
}

// ---------------------------------------------------------------------------
// isWeaponRecord
// ---------------------------------------------------------------------------

describe('isWeaponRecord', () => {
  it('detects obvious weapons from build presets', () => {
    expect(isWeaponRecord(rec('Uchigatana'))).toBe(true);
    expect(isWeaponRecord(rec('Claymore'))).toBe(true);
    expect(isWeaponRecord(rec('Blasphemous Blade'))).toBe(true);
    expect(isWeaponRecord(rec('Moonveil'))).toBe(true);
  });

  it('detects weapons via stat requirements (Str/Dex) not in presets', () => {
    // Zweihander has Str 19, Dex 11 in itemStats and may not be in every build
    expect(isWeaponRecord(rec('Zweihander'))).toBe(true);
    // Zamor Curved Sword has Str/Dex
    expect(isWeaponRecord(rec('Zamor Curved Sword'))).toBe(true);
  });

  it('excludes shields even with Strength requirements', () => {
    expect(isWeaponRecord(rec('Banished Knight\'s Shield'))).toBe(false);
    expect(isWeaponRecord(rec('Wolf Crest Shield'))).toBe(false);
  });

  it('excludes staves', () => {
    expect(isWeaponRecord(rec('Academy Glintstone Staff'))).toBe(false);
    expect(isWeaponRecord(rec('Carian Glintstone Staff'))).toBe(false);
  });

  it('excludes sacred seals', () => {
    expect(isWeaponRecord(rec('Finger Seal'))).toBe(false);
    expect(isWeaponRecord(rec('Godslayer\'s Seal'))).toBe(false);
  });

  it('excludes spells without Str/Dex requirements', () => {
    // Spells have Faith/Int/Arc requirements only
    expect(isWeaponRecord(rec('Wrath of Gold'))).toBe(false);
    expect(isWeaponRecord(rec('Black Flame'))).toBe(false);
  });

  it('excludes talismans (not in item stats with Str/Dex)', () => {
    expect(isWeaponRecord(rec('Shard of Alexander'))).toBe(false);
    expect(isWeaponRecord(rec('Erdtree\'s Favor'))).toBe(false);
  });

  it('returns false for completely unknown item names', () => {
    expect(isWeaponRecord(rec('Some Random Nonexistent Item XYZ'))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// regionsForRecords
// ---------------------------------------------------------------------------

describe('regionsForRecords', () => {
  it('returns unique region strings', () => {
    const records = [
      rec('Uchigatana', 'Limgrave'),
      rec('Claymore', 'Limgrave'),
      rec('Moonveil', 'Caelid'),
    ];
    const regions = regionsForRecords(records);
    expect(regions).toContain('Limgrave');
    expect(regions).toContain('Caelid');
    expect(new Set(regions).size).toBe(regions.length);
  });

  it('excludes records with null area', () => {
    const records = [rec('Uchigatana', 'Limgrave'), rec('Some Item', null)];
    const regions = regionsForRecords(records);
    expect(regions).not.toContain(null);
    expect(regions.every((r) => r !== null && r !== undefined)).toBe(true);
  });

  it('returns empty array for empty input', () => {
    expect(regionsForRecords([])).toEqual([]);
  });

  it('sorts Limgrave before late-game areas', () => {
    const records = [
      rec('Item A', 'Crumbling Farum Azula'),
      rec('Item B', 'Limgrave'),
      rec('Item C', 'Mountaintops of the Giants'),
    ];
    const regions = regionsForRecords(records);
    const limIdx = regions.indexOf('Limgrave');
    const mountIdx = regions.indexOf('Mountaintops of the Giants');
    const azulaIdx = regions.indexOf('Crumbling Farum Azula');
    expect(limIdx).toBeLessThan(mountIdx);
    expect(mountIdx).toBeLessThan(azulaIdx);
  });
});

// ---------------------------------------------------------------------------
// weaponsForRegions
// ---------------------------------------------------------------------------

describe('weaponsForRegions', () => {
  const records = [
    rec('Uchigatana', 'Limgrave'),
    rec('Claymore', 'Limgrave'),
    rec('Moonveil', 'Caelid'),
    rec('Shard of Alexander', 'Caelid'),   // talisman — not a weapon
    rec('Finger Seal', 'Limgrave'),         // seal — not a weapon
  ];

  it('returns only weapon records in the selected region(s)', () => {
    const result = weaponsForRegions(records, new Set(['Limgrave']));
    expect(result.map((r) => r.itemName)).toContain('Uchigatana');
    expect(result.map((r) => r.itemName)).toContain('Claymore');
    expect(result.map((r) => r.itemName)).not.toContain('Finger Seal');
  });

  it('supports multi-region selection', () => {
    const result = weaponsForRegions(records, new Set(['Limgrave', 'Caelid']));
    const names = result.map((r) => r.itemName);
    expect(names).toContain('Uchigatana');
    expect(names).toContain('Moonveil');
    expect(names).not.toContain('Shard of Alexander');
  });

  it('returns empty array when regions set is empty', () => {
    expect(weaponsForRegions(records, new Set())).toEqual([]);
  });

  it('returns empty array when no records match the region', () => {
    expect(weaponsForRegions(records, new Set(['Leyndell, Royal Capital']))).toEqual([]);
  });

  it('excludes records with null area even if isWeapon', () => {
    const nullAreaRecords = [rec('Uchigatana', null)];
    expect(weaponsForRegions(nullAreaRecords, new Set(['Limgrave']))).toEqual([]);
  });
});
