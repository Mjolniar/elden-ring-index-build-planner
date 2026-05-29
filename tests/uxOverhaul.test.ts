/**
 * UX overhaul tests.
 *
 * All production logic imported from actual source modules — no duplication.
 *
 * TODO (follow-up): hideItemNames / click-to-reveal feature
 *   A "hide item names until clicked" control was considered but deferred.
 *   When implemented, add tests here that cover:
 *   - Default value (false)
 *   - Storage key scoping per source
 *   - SearchTable renders blurred/masked item names when enabled
 *   - Clicking/revealing a row unhides the name for that row only
 *   - Search still matches masked rows by actual name (or excludes — TBD)
 */

import { describe, expect, it } from 'vitest';
import type { ItemRecord, FilterState, SpoilerSettings } from '../src/types';
import { applyFilters } from '../src/searchFilters';
import { DEFAULT_SPOILER_SETTINGS, normalizeSpoilerSettings } from '../src/spoilerSettings';
import {
  regionGroupsForRecords,
  rootRegionForArea,
  itemsForRegionSelection,
} from '../src/itemClassifiers';

// ---------------------------------------------------------------------------
// Shared test helpers
// ---------------------------------------------------------------------------

function rec(
  itemName: string,
  area: string | null = 'Limgrave',
  originalItem: string | null = null,
  locationName = `Found in ${area ?? 'unknown'}`,
): ItemRecord {
  return {
    id: itemName,
    itemName,
    originalItem,
    locationName,
    area,
    sourceType: 'ground_pickup',
    isKeyItem: false,
    rawLine: `${locationName}: ${itemName}`,
    section: 'spoilers',
  };
}

const DEFAULT_FILTERS: FilterState = { search: '', sourceType: 'all', keyItemsOnly: false };

function searchFilter(
  records: ItemRecord[],
  query: string,
  spoiler: SpoilerSettings = DEFAULT_SPOILER_SETTINGS,
  sourceKind: 'vanilla' | 'randomizer-log' = 'vanilla',
): ItemRecord[] {
  return applyFilters(records, { ...DEFAULT_FILTERS, search: query }, spoiler, sourceKind);
}

// ---------------------------------------------------------------------------
// normalizeSpoilerSettings — backward compatibility
// ---------------------------------------------------------------------------

describe('normalizeSpoilerSettings', () => {
  it('returns all defaults for an empty object (no stored data)', () => {
    const result = normalizeSpoilerSettings({});
    expect(result).toEqual(DEFAULT_SPOILER_SETTINGS);
  });

  it('fills in hideOriginalItem=false when key is missing from old stored value', () => {
    const oldStored = {
      spoilerMode: true,
      showArea: false,
      showSource: true,
      showHint: false,
      hintDifficulty: 'hard' as const,
      // hideOriginalItem and randomizedPlacementSearchOnly absent
    };
    const result = normalizeSpoilerSettings(oldStored);
    expect(result.hideOriginalItem).toBe(false);
    expect(result.randomizedPlacementSearchOnly).toBe(false);
    // Existing stored values preserved
    expect(result.spoilerMode).toBe(true);
    expect(result.showArea).toBe(false);
    expect(result.hintDifficulty).toBe('hard');
  });

  it('preserves explicitly stored true values for new fields', () => {
    const result = normalizeSpoilerSettings({
      hideOriginalItem: true,
      randomizedPlacementSearchOnly: true,
    });
    expect(result.hideOriginalItem).toBe(true);
    expect(result.randomizedPlacementSearchOnly).toBe(true);
    // Other fields fall back to defaults
    expect(result.spoilerMode).toBe(false);
    expect(result.showArea).toBe(true);
  });

  it('does not mutate the defaults object', () => {
    const before = { ...DEFAULT_SPOILER_SETTINGS };
    normalizeSpoilerSettings({ spoilerMode: true });
    expect(DEFAULT_SPOILER_SETTINGS).toEqual(before);
  });
});

// ---------------------------------------------------------------------------
// DEFAULT_SPOILER_SETTINGS
// ---------------------------------------------------------------------------

describe('DEFAULT_SPOILER_SETTINGS', () => {
  it('has hideOriginalItem false', () => {
    expect(DEFAULT_SPOILER_SETTINGS.hideOriginalItem).toBe(false);
  });

  it('has randomizedPlacementSearchOnly false', () => {
    expect(DEFAULT_SPOILER_SETTINGS.randomizedPlacementSearchOnly).toBe(false);
  });

  it('has spoilerMode false', () => {
    expect(DEFAULT_SPOILER_SETTINGS.spoilerMode).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// applyFilters — randomizedPlacementSearchOnly search scope
// Tests exercise the production implementation in src/searchFilters.ts.
// ---------------------------------------------------------------------------

describe('applyFilters — randomizedPlacementSearchOnly', () => {
  const records = [
    rec('Uchigatana', 'Limgrave', 'Dagger'),
    rec('Longsword', 'Leyndell', null),
    rec('Zweihander', 'Caelid', 'Grafted Blade Greatsword'),
  ];

  it('includes originalItem in search when flag is off (vanilla)', () => {
    const results = searchFilter(records, 'Dagger', DEFAULT_SPOILER_SETTINGS, 'vanilla');
    expect(results.map((r) => r.itemName)).toContain('Uchigatana');
  });

  it('includes originalItem in search when flag is off (randomizer)', () => {
    const results = searchFilter(records, 'Grafted', DEFAULT_SPOILER_SETTINGS, 'randomizer-log');
    expect(results.map((r) => r.itemName)).toContain('Zweihander');
  });

  it('excludes originalItem from search when flag is on in randomizer mode', () => {
    const settings: SpoilerSettings = { ...DEFAULT_SPOILER_SETTINGS, randomizedPlacementSearchOnly: true };
    const results = searchFilter(records, 'Grafted', settings, 'randomizer-log');
    expect(results).toHaveLength(0);
  });

  it('still searches item name when flag is on', () => {
    const settings: SpoilerSettings = { ...DEFAULT_SPOILER_SETTINGS, randomizedPlacementSearchOnly: true };
    const results = searchFilter(records, 'Uchigatana', settings, 'randomizer-log');
    expect(results.map((r) => r.itemName)).toContain('Uchigatana');
  });

  it('flag has no effect in vanilla mode — originalItem still searched', () => {
    const settings: SpoilerSettings = { ...DEFAULT_SPOILER_SETTINGS, randomizedPlacementSearchOnly: true };
    const results = searchFilter(records, 'Dagger', settings, 'vanilla');
    expect(results.map((r) => r.itemName)).toContain('Uchigatana');
  });

  it('excludes originalItem in spoilerMode when flag is on', () => {
    const settings: SpoilerSettings = {
      ...DEFAULT_SPOILER_SETTINGS,
      spoilerMode: true,
      randomizedPlacementSearchOnly: true,
    };
    const results = searchFilter(records, 'Grafted', settings, 'randomizer-log');
    expect(results).toHaveLength(0);
  });

  it('empty query returns all records', () => {
    const results = applyFilters(records, DEFAULT_FILTERS, DEFAULT_SPOILER_SETTINGS, 'vanilla');
    expect(results).toHaveLength(records.length);
  });
});

// ---------------------------------------------------------------------------
// applyFilters — sourceType and keyItemsOnly filters
// ---------------------------------------------------------------------------

describe('applyFilters — sourceType and keyItemsOnly', () => {
  const records = [
    { ...rec('Medallion', 'Limgrave'), sourceType: 'boss_drop' as const, isKeyItem: true },
    { ...rec('Sword', 'Limgrave'), sourceType: 'ground_pickup' as const, isKeyItem: false },
    { ...rec('Ring', 'Caelid'), sourceType: 'shop' as const, isKeyItem: false },
  ];

  it('filters by sourceType', () => {
    const results = applyFilters(
      records,
      { ...DEFAULT_FILTERS, sourceType: 'boss_drop' },
      DEFAULT_SPOILER_SETTINGS,
      'vanilla',
    );
    expect(results.map((r) => r.itemName)).toEqual(['Medallion']);
  });

  it('filters keyItems only', () => {
    const results = applyFilters(
      records,
      { ...DEFAULT_FILTERS, keyItemsOnly: true },
      DEFAULT_SPOILER_SETTINGS,
      'vanilla',
    );
    expect(results.map((r) => r.itemName)).toEqual(['Medallion']);
  });
});

// ---------------------------------------------------------------------------
// Region grouping: root region selection includes all child locations
// ---------------------------------------------------------------------------

describe('regionGroupsForRecords — root selection scope', () => {
  const mixed = [
    rec('Sword A', 'Stormveil Castle'),
    rec('Axe B', 'Mistwood'),
    rec('Dagger C', 'Stormhill'),
    rec('Spear D', 'Leyndell, Royal Capital'),
  ];

  it('groups Stormveil, Mistwood, Stormhill under Limgrave', () => {
    const groups = regionGroupsForRecords(mixed);
    const limgrave = groups.find((g) => g.root === 'Limgrave');
    expect(limgrave).toBeDefined();
    expect(limgrave!.count).toBe(3);
    const areaNames = limgrave!.areas.map((a) => a.area);
    expect(areaNames).toContain('Stormveil Castle');
    expect(areaNames).toContain('Mistwood');
    expect(areaNames).toContain('Stormhill');
  });

  it('groups Leyndell under its own root', () => {
    const groups = regionGroupsForRecords(mixed);
    const leyndell = groups.find((g) => g.root === 'Leyndell');
    expect(leyndell).toBeDefined();
    expect(leyndell!.count).toBe(1);
  });

  it('root count equals sum of all child area counts', () => {
    const groups = regionGroupsForRecords(mixed);
    for (const group of groups) {
      const areaSum = group.areas.reduce((s, a) => s + a.count, 0);
      expect(group.count).toBe(areaSum);
    }
  });
});

// ---------------------------------------------------------------------------
// itemsForRegionSelection — production helper from itemClassifiers
// ---------------------------------------------------------------------------

describe('itemsForRegionSelection', () => {
  const records = [
    rec('Item A', 'Stormveil Castle'),
    rec('Item B', 'Mistwood'),
    rec('Item C', 'Leyndell, Royal Capital'),
    rec('Item D', null),
  ];

  it('returns empty array when no root selected', () => {
    expect(itemsForRegionSelection(records, null, null)).toHaveLength(0);
  });

  it('selecting Limgrave root includes Stormveil and Mistwood items', () => {
    const result = itemsForRegionSelection(records, 'Limgrave', null);
    const names = result.map((r) => r.itemName);
    expect(names).toContain('Item A');
    expect(names).toContain('Item B');
    expect(names).not.toContain('Item C');
    expect(names).not.toContain('Item D');
  });

  it('selecting child area narrows to that area only', () => {
    const result = itemsForRegionSelection(records, 'Limgrave', 'Stormveil Castle');
    expect(result.map((r) => r.itemName)).toEqual(['Item A']);
  });

  it('items with null area are excluded', () => {
    const result = itemsForRegionSelection(records, 'Limgrave', null);
    expect(result.every((r) => r.area !== null)).toBe(true);
  });

  it('returns all item types (not only weapons)', () => {
    const mixed = [
      { ...rec('Weapon1', 'Stormveil Castle'), sourceType: 'boss_drop' as const },
      { ...rec('Talisman1', 'Stormveil Castle'), sourceType: 'ground_pickup' as const },
      { ...rec('Spell1', 'Stormveil Castle'), sourceType: 'shop' as const },
    ];
    const result = itemsForRegionSelection(mixed, 'Limgrave', 'Stormveil Castle');
    expect(result).toHaveLength(3);
  });
});

// ---------------------------------------------------------------------------
// rootRegionForArea — mapping child areas to roots
// ---------------------------------------------------------------------------

describe('rootRegionForArea', () => {
  it('maps Stormveil Castle to Limgrave', () => {
    expect(rootRegionForArea('Stormveil Castle')).toBe('Limgrave');
  });

  it('maps Raya Lucaria Academy to Liurnia', () => {
    expect(rootRegionForArea('Raya Lucaria Academy')).toBe('Liurnia');
  });

  it('maps Volcano Manor to Mt. Gelmir', () => {
    expect(rootRegionForArea('Volcano Manor')).toBe('Mt. Gelmir');
  });

  it('returns the value itself when no group matches', () => {
    expect(rootRegionForArea('Unknown Place XYZ')).toBe('Unknown Place XYZ');
  });

  it('matches root name directly (case-insensitive)', () => {
    expect(rootRegionForArea('limgrave')).toBe('Limgrave');
  });
});
