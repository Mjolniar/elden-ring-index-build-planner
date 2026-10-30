import type { ItemRecord, FilterState, SpoilerSettings, DataSourceKind } from './types';

/**
 * Applies the active filter state + spoiler display settings to a record list.
 *
 * Search-scope rules:
 * - Full detail (spoilerMode off): matches itemName, locationName, area,
 *   and (unless randomizedPlacementSearchOnly) originalItem.
 * - Spoiler mode on: matches itemName, area only,
 *   and (unless randomizedPlacementSearchOnly) originalItem.
 * - randomizedPlacementSearchOnly only suppresses originalItem matching
 *   when sourceKind is 'randomizer-log'. Vanilla is unaffected.
 */
export function applyFilters(
  records: ItemRecord[],
  f: FilterState,
  s: SpoilerSettings,
  sourceKind: DataSourceKind | string,
): ItemRecord[] {
  const q = f.search.toLowerCase().trim();
  return records.filter((r) => {
    if (f.keyItemsOnly && !r.isKeyItem) return false;
    if (f.sourceType !== 'all' && r.sourceType !== f.sourceType) return false;
    if (q) {
      let haystack: string;
      if (s.spoilerMode) {
        haystack = `${r.itemName} ${r.area ?? ''}`.toLowerCase();
        if (!s.randomizedPlacementSearchOnly && r.originalItem) {
          haystack += ` ${r.originalItem}`.toLowerCase();
        }
      } else {
        haystack = `${r.itemName} ${r.locationName} ${r.area ?? ''}`.toLowerCase();
        if (!(s.randomizedPlacementSearchOnly && sourceKind === 'randomizer-log') && r.originalItem) {
          haystack += ` ${r.originalItem}`.toLowerCase();
        }
      }
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
