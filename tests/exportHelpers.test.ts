import { describe, expect, it } from 'vitest';
import type { ItemRecord, SpoilerSettings } from '../src/types';
import { sanitizeRecordsForExport, recordsToCSV } from '../src/exportHelpers';
import { DEFAULT_SPOILER_SETTINGS } from '../src/spoilerSettings';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rec(
  itemName: string,
  locationName: string,
  area: string | null,
  originalItem: string | null = null,
): ItemRecord {
  return {
    id: itemName,
    itemName,
    originalItem,
    locationName,
    area,
    sourceType: 'ground_pickup',
    isKeyItem: false,
    rawLine: `${locationName}: ${itemName}${originalItem ? ` (Replaces ${originalItem})` : ''}`,
    section: 'spoilers',
  };
}

const FULL_SETTINGS: SpoilerSettings = { ...DEFAULT_SPOILER_SETTINGS };
const SPOILER_ON: SpoilerSettings = { ...DEFAULT_SPOILER_SETTINGS, spoilerMode: true };
const HIDE_REPLACED: SpoilerSettings = { ...DEFAULT_SPOILER_SETTINGS, hideOriginalItem: true };
const SPOILER_AND_HIDE: SpoilerSettings = {
  ...DEFAULT_SPOILER_SETTINGS,
  spoilerMode: true,
  hideOriginalItem: true,
};
// spoilerMode=true with showArea/showSource toggled off
const SPOILER_HIDE_AREA: SpoilerSettings = {
  ...DEFAULT_SPOILER_SETTINGS,
  spoilerMode: true,
  showArea: false,
};
const SPOILER_HIDE_SOURCE: SpoilerSettings = {
  ...DEFAULT_SPOILER_SETTINGS,
  spoilerMode: true,
  showSource: false,
};
const SPOILER_HIDE_AREA_AND_SOURCE: SpoilerSettings = {
  ...DEFAULT_SPOILER_SETTINGS,
  spoilerMode: true,
  showArea: false,
  showSource: false,
};

const RECORDS: ItemRecord[] = [
  rec('Uchigatana', 'Dragonburnt Ruins', 'Limgrave', 'Dagger'),
  rec('Longsword', 'Church of Elleh', 'Limgrave', null),
];

// ---------------------------------------------------------------------------
// sanitizeRecordsForExport
// ---------------------------------------------------------------------------

describe('sanitizeRecordsForExport', () => {
  it('full detail mode: includes location and replacedItem', () => {
    const out = sanitizeRecordsForExport(RECORDS, FULL_SETTINGS, 'randomizer-log');
    expect(out[0].location).toBe('Dragonburnt Ruins');
    expect(out[0].replacedItem).toBe('Dagger');
  });

  it('never includes rawLine', () => {
    const out = sanitizeRecordsForExport(RECORDS, FULL_SETTINGS, 'randomizer-log');
    for (const r of out) {
      expect(Object.keys(r)).not.toContain('rawLine');
    }
  });

  it('spoilerMode: omits location field entirely', () => {
    const out = sanitizeRecordsForExport(RECORDS, SPOILER_ON, 'randomizer-log');
    expect(Object.keys(out[0])).not.toContain('location');
    expect(Object.keys(out[1])).not.toContain('location');
  });

  it('hideOriginalItem + randomizer-log: omits replacedItem', () => {
    const out = sanitizeRecordsForExport(RECORDS, HIDE_REPLACED, 'randomizer-log');
    expect(Object.keys(out[0])).not.toContain('replacedItem');
  });

  it('hideOriginalItem + vanilla: still includes location, replacedItem unaffected', () => {
    // vanilla records have no originalItem but the field is unrelated to vanilla
    const out = sanitizeRecordsForExport(RECORDS, HIDE_REPLACED, 'vanilla');
    // location is not hidden because spoilerMode is off
    expect(out[0].location).toBe('Dragonburnt Ruins');
    // replacedItem omission only applies to randomizer-log
    expect(out[0].replacedItem).toBe('Dagger');
  });

  it('spoilerMode + hideOriginalItem: omits both location and replacedItem', () => {
    const out = sanitizeRecordsForExport(RECORDS, SPOILER_AND_HIDE, 'randomizer-log');
    expect(Object.keys(out[0])).not.toContain('location');
    expect(Object.keys(out[0])).not.toContain('replacedItem');
  });

  it('preserves item, area, sourceType, keyItem, section in all modes', () => {
    for (const settings of [FULL_SETTINGS, SPOILER_ON, HIDE_REPLACED, SPOILER_AND_HIDE]) {
      const out = sanitizeRecordsForExport(RECORDS, settings, 'randomizer-log');
      expect(out[0].item).toBe('Uchigatana');
      expect(out[0].area).toBe('Limgrave');
      expect(out[0].sourceType).toBe('ground_pickup');
      expect(out[0].keyItem).toBe(false);
      expect(out[0].section).toBe('spoilers');
    }
  });

  it('record with no originalItem omits replacedItem even in full mode', () => {
    const out = sanitizeRecordsForExport(RECORDS, FULL_SETTINGS, 'randomizer-log');
    expect(Object.keys(out[1])).not.toContain('replacedItem');
  });

  it('spoilerMode + showArea=false: omits area field', () => {
    const out = sanitizeRecordsForExport(RECORDS, SPOILER_HIDE_AREA, 'randomizer-log');
    expect(Object.keys(out[0])).not.toContain('area');
    expect(Object.keys(out[1])).not.toContain('area');
  });

  it('spoilerMode + showSource=false: omits sourceType field', () => {
    const out = sanitizeRecordsForExport(RECORDS, SPOILER_HIDE_SOURCE, 'randomizer-log');
    expect(Object.keys(out[0])).not.toContain('sourceType');
    expect(Object.keys(out[1])).not.toContain('sourceType');
  });

  it('spoilerMode + showArea=true: still includes area field', () => {
    const out = sanitizeRecordsForExport(RECORDS, SPOILER_ON, 'randomizer-log');
    expect(out[0].area).toBe('Limgrave');
  });

  it('showArea=false without spoilerMode: area still included', () => {
    const settings: SpoilerSettings = { ...DEFAULT_SPOILER_SETTINGS, showArea: false };
    const out = sanitizeRecordsForExport(RECORDS, settings, 'randomizer-log');
    expect(out[0].area).toBe('Limgrave');
  });

  it('spoilerMode + showArea=false + showSource=false: omits both area and sourceType', () => {
    const out = sanitizeRecordsForExport(RECORDS, SPOILER_HIDE_AREA_AND_SOURCE, 'randomizer-log');
    expect(Object.keys(out[0])).not.toContain('area');
    expect(Object.keys(out[0])).not.toContain('sourceType');
  });
});

// ---------------------------------------------------------------------------
// recordsToCSV
// ---------------------------------------------------------------------------

function parseCSV(csv: string): { headers: string[]; rows: string[][] } {
  // naive unquoter for test assertions: strips outer quotes, unescapes ""
  function unquote(v: string) {
    return v.replace(/^"|"$/g, '').replace(/""/g, '"');
  }
  const lines = csv.split('\n').map((l) => l.split(',').map(unquote));
  return { headers: lines[0], rows: lines.slice(1) };
}

describe('recordsToCSV', () => {
  it('full detail: header includes Location and Replaced Item columns', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, FULL_SETTINGS, 'randomizer-log'));
    expect(headers).toContain('Location');
    expect(headers).toContain('Replaced Item');
  });

  it('full detail: Location column contains exact location name', () => {
    const { headers, rows } = parseCSV(recordsToCSV(RECORDS, FULL_SETTINGS, 'randomizer-log'));
    const locIdx = headers.indexOf('Location');
    expect(rows[0][locIdx]).toBe('Dragonburnt Ruins');
  });

  it('full detail: Replaced Item column contains original item', () => {
    const { headers, rows } = parseCSV(recordsToCSV(RECORDS, FULL_SETTINGS, 'randomizer-log'));
    const repIdx = headers.indexOf('Replaced Item');
    expect(rows[0][repIdx]).toBe('Dagger');
  });

  it('spoilerMode: header does NOT contain Location', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, SPOILER_ON, 'randomizer-log'));
    expect(headers).not.toContain('Location');
  });

  it('spoilerMode: still includes Item and Area', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, SPOILER_ON, 'randomizer-log'));
    expect(headers).toContain('Item');
    expect(headers).toContain('Area');
  });

  it('hideOriginalItem + randomizer-log: header does NOT contain Replaced Item', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, HIDE_REPLACED, 'randomizer-log'));
    expect(headers).not.toContain('Replaced Item');
  });

  it('hideOriginalItem + vanilla: Replaced Item column still present', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, HIDE_REPLACED, 'vanilla'));
    expect(headers).toContain('Replaced Item');
  });

  it('spoilerMode + hideOriginalItem: neither Location nor Replaced Item in header', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, SPOILER_AND_HIDE, 'randomizer-log'));
    expect(headers).not.toContain('Location');
    expect(headers).not.toContain('Replaced Item');
  });

  it('never includes a Raw Line column', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, FULL_SETTINGS, 'randomizer-log'));
    expect(headers.join(',')).not.toMatch(/raw/i);
  });

  it('row count matches record count', () => {
    const { rows } = parseCSV(recordsToCSV(RECORDS, FULL_SETTINGS, 'vanilla'));
    expect(rows).toHaveLength(RECORDS.length);
  });

  it('header column count matches data row column count', () => {
    for (const [settings, kind] of [
      [FULL_SETTINGS, 'randomizer-log'],
      [SPOILER_ON, 'randomizer-log'],
      [HIDE_REPLACED, 'randomizer-log'],
      [SPOILER_AND_HIDE, 'randomizer-log'],
      [FULL_SETTINGS, 'vanilla'],
      [SPOILER_HIDE_AREA, 'randomizer-log'],
      [SPOILER_HIDE_SOURCE, 'randomizer-log'],
      [SPOILER_HIDE_AREA_AND_SOURCE, 'randomizer-log'],
    ] as const) {
      const { headers, rows } = parseCSV(recordsToCSV(RECORDS, settings, kind));
      for (const row of rows) {
        expect(row).toHaveLength(headers.length);
      }
    }
  });

  it('spoilerMode + showArea=false: header does NOT contain Area', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, SPOILER_HIDE_AREA, 'randomizer-log'));
    expect(headers).not.toContain('Area');
  });

  it('spoilerMode + showSource=false: header does NOT contain Source Type', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, SPOILER_HIDE_SOURCE, 'randomizer-log'));
    expect(headers).not.toContain('Source Type');
  });

  it('spoilerMode + showArea=true: Area column still present', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, SPOILER_ON, 'randomizer-log'));
    expect(headers).toContain('Area');
  });

  it('showArea=false without spoilerMode: Area column still present', () => {
    const settings: SpoilerSettings = { ...DEFAULT_SPOILER_SETTINGS, showArea: false };
    const { headers } = parseCSV(recordsToCSV(RECORDS, settings, 'randomizer-log'));
    expect(headers).toContain('Area');
  });

  it('spoilerMode + showArea=false + showSource=false: neither Area nor Source Type in header', () => {
    const { headers } = parseCSV(recordsToCSV(RECORDS, SPOILER_HIDE_AREA_AND_SOURCE, 'randomizer-log'));
    expect(headers).not.toContain('Area');
    expect(headers).not.toContain('Source Type');
  });

  it('spoilerMode + showArea=false: Area column value not present in data rows', () => {
    const { headers, rows } = parseCSV(recordsToCSV(RECORDS, SPOILER_HIDE_AREA, 'randomizer-log'));
    expect(headers).not.toContain('Area');
    // The row should still have the correct length (no stray empty cell for area)
    expect(rows[0]).toHaveLength(headers.length);
  });
});
