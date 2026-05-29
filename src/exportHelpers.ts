import type { ItemRecord, SpoilerSettings, DataSourceKind } from './types';
import { DEFAULT_SPOILER_SETTINGS } from './spoilerSettings';

// ---------------------------------------------------------------------------
// Sanitized export record
// ---------------------------------------------------------------------------

/**
 * A flattened, spoiler-aware representation of an ItemRecord for export.
 * Fields that the user has chosen to hide are omitted rather than set to null
 * so the exported file structure is unambiguous.
 */
export interface ExportRecord {
  item: string;
  /** Omitted when spoilerMode is active. */
  location?: string;
  /** Omitted when spoilerMode is active and showArea is false. */
  area?: string;
  /** Omitted when spoilerMode is active and showSource is false. */
  sourceType?: string;
  keyItem: boolean;
  section: string;
  /** Omitted when hideOriginalItem is active for randomizer-log sources. */
  replacedItem?: string;
}

// ---------------------------------------------------------------------------
// Core helpers (pure, no browser dependencies — fully testable)
// ---------------------------------------------------------------------------

/**
 * Converts a raw ItemRecord list to spoiler-sanitized ExportRecords.
 *
 * Rules:
 * - `locationName` is omitted when `spoilerMode` is true.
 * - `originalItem` / replacedItem is omitted when the source is
 *   `randomizer-log` and `hideOriginalItem` is true.
 * - `rawLine` is never included (it is debug/parser data that can contain
 *   "Replaces …" metadata in randomizer logs).
 */
export function sanitizeRecordsForExport(
  records: ItemRecord[],
  spoilerSettings: SpoilerSettings = DEFAULT_SPOILER_SETTINGS,
  sourceKind: DataSourceKind | string = 'vanilla',
): ExportRecord[] {
  const { spoilerMode, showArea, showSource, hideOriginalItem } = spoilerSettings;
  const hideLocation = spoilerMode;
  const hideArea = spoilerMode && !showArea;
  const hideSource = spoilerMode && !showSource;
  const hideReplaced = sourceKind === 'randomizer-log' && hideOriginalItem;

  return records.map((r) => {
    const out: ExportRecord = {
      item: r.itemName,
      keyItem: r.isKeyItem,
      section: r.section,
    };
    if (!hideLocation) out.location = r.locationName;
    if (!hideArea) out.area = r.area ?? '';
    if (!hideSource) out.sourceType = r.sourceType;
    if (!hideReplaced && r.originalItem != null) out.replacedItem = r.originalItem;
    return out;
  });
}

/**
 * Serialises sanitized records to a CSV string.
 *
 * Column set is determined by the same spoiler rules as sanitization, so the
 * header row always matches the data rows.
 */
export function recordsToCSV(
  records: ItemRecord[],
  spoilerSettings: SpoilerSettings = DEFAULT_SPOILER_SETTINGS,
  sourceKind: DataSourceKind | string = 'vanilla',
): string {
  const { spoilerMode, showArea, showSource, hideOriginalItem } = spoilerSettings;
  const hideLocation = spoilerMode;
  const hideArea = spoilerMode && !showArea;
  const hideSource = spoilerMode && !showSource;
  const hideReplaced = sourceKind === 'randomizer-log' && hideOriginalItem;

  const header: string[] = ['Item'];
  if (!hideLocation) header.push('Location');
  if (!hideArea) header.push('Area');
  if (!hideSource) header.push('Source Type');
  header.push('Key Item');
  if (!hideReplaced) header.push('Replaced Item');
  header.push('Section');

  function esc(v: string | boolean | null | undefined): string {
    return `"${String(v ?? '').replace(/"/g, '""')}"`;
  }

  const rows = records.map((r) => {
    const cells: (string | boolean | null | undefined)[] = [r.itemName];
    if (!hideLocation) cells.push(r.locationName);
    if (!hideArea) cells.push(r.area ?? '');
    if (!hideSource) cells.push(r.sourceType);
    cells.push(r.isKeyItem ? 'yes' : '');
    if (!hideReplaced) cells.push(r.originalItem ?? '');
    cells.push(r.section);
    return cells.map(esc).join(',');
  });

  return [header.map(esc).join(','), ...rows].join('\n');
}
