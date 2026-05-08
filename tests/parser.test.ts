import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseSpoilerLog } from '../src/parser';
import { parseItemField, extractArea, stripAreaSuffix } from '../src/parser/normalize';
import { inferSourceType } from '../src/parser/sourceType';

function fixture(name: string): string {
  return readFileSync(join(__dirname, 'fixtures', name), 'utf-8');
}

// ---- normalize helpers ----
describe('parseItemField', () => {
  it('extracts plain item name', () => {
    const r = parseItemField('Moonveil');
    expect(r.itemName).toBe('Moonveil');
    expect(r.originalItem).toBeNull();
    expect(r.isKeyItem).toBe(false);
  });

  it('extracts original item from "(was X)"', () => {
    const r = parseItemField('Rold Medallion (was Godrick\'s Great Rune)');
    expect(r.itemName).toBe('Rold Medallion');
    expect(r.originalItem).toBe('Godrick\'s Great Rune');
  });

  it('extracts original item from "(replaced X)"', () => {
    const r = parseItemField('Bloodhound\'s Fang (replaced Torch)');
    expect(r.originalItem).toBe('Torch');
  });

  it('strips [key] flag', () => {
    const r = parseItemField('Rold Medallion (was Godrick\'s Great Rune) [key]');
    expect(r.isKeyItem).toBe(true);
    expect(r.itemName).toBe('Rold Medallion');
  });

  it('strips (key) flag', () => {
    const r = parseItemField('Academy Glintstone Key (key)');
    expect(r.isKeyItem).toBe(true);
    expect(r.itemName).toBe('Academy Glintstone Key');
  });
});

describe('extractArea', () => {
  it('extracts trailing parenthesised area', () => {
    expect(extractArea('Dropped by Godrick (Stormveil Castle)')).toBe('Stormveil Castle');
  });

  it('returns null when no parens', () => {
    expect(extractArea('Dropped by Godrick')).toBeNull();
  });
});

describe('stripAreaSuffix', () => {
  it('removes trailing parens', () => {
    expect(stripAreaSuffix('Dropped by Godrick (Stormveil Castle)')).toBe('Dropped by Godrick');
  });
});

// ---- source type inference ----
describe('inferSourceType', () => {
  it('detects boss drop', () => expect(inferSourceType('Dropped by Godrick the Grafted')).toBe('boss_drop'));
  it('detects shop', () => expect(inferSourceType('Sold by Patches')).toBe('shop'));
  it('detects shop by "for N runes"', () => expect(inferSourceType('Available for 5000 runes')).toBe('shop'));
  it('detects ground pickup (corpse)', () => expect(inferSourceType('On a corpse in the ruins')).toBe('ground_pickup'));
  it('detects ground pickup (chest)', () => expect(inferSourceType('In a chest behind the door')).toBe('ground_pickup'));
  it('detects starting loadout', () => expect(inferSourceType('Starting loadout Wretch class')).toBe('starting_loadout'));
  it('falls back to unknown', () => expect(inferSourceType('Some unrecognised text')).toBe('unknown'));
});

// ---- full spoiler log parse (colon format) ----
describe('parseSpoilerLog - colon format', () => {
  const text = fixture('sample_full_log.txt');
  const result = parseSpoilerLog(text);

  it('extracts seed', () => {
    expect(result.seed).toBe('2847391056');
  });

  it('parses item records', () => {
    expect(result.records.length).toBeGreaterThan(10);
  });

  it('marks key items correctly', () => {
    const keyItems = result.records.filter((r) => r.isKeyItem);
    expect(keyItems.length).toBeGreaterThan(0);
    const rold = keyItems.find((r) => r.itemName === 'Rold Medallion');
    expect(rold).toBeDefined();
  });

  it('captures original items', () => {
    const godrick = result.records.find((r) => r.itemName === 'Rold Medallion' && r.section.includes('all'));
    expect(godrick?.originalItem).toBe("Godrick's Great Rune");
  });

  it('infers boss_drop for "Dropped by" locations', () => {
    const r = result.records.find((r) => r.locationName === 'Dropped by Godrick the Grafted');
    expect(r?.sourceType).toBe('boss_drop');
  });

  it('infers shop for "Sold by" locations', () => {
    const r = result.records.find((r) => r.locationName?.includes('Sold by Patches'));
    expect(r?.sourceType).toBe('shop');
  });

  it('infers starting_loadout', () => {
    const r = result.records.find((r) => r.sourceType === 'starting_loadout');
    expect(r).toBeDefined();
  });

  it('captures area from parentheses', () => {
    const r = result.records.find((r) => r.itemName === 'Rold Medallion');
    expect(r?.area).toBe('Stormveil Castle');
  });

  it('has no critical warnings', () => {
    const fatal = result.diagnostics.warnings.filter((w) =>
      w.includes('No item records')
    );
    expect(fatal.length).toBe(0);
  });
});

// ---- arrow format ----
describe('parseSpoilerLog - arrow format', () => {
  const text = fixture('sample_arrow_format.txt');
  const result = parseSpoilerLog(text);

  it('parses records from arrow format', () => {
    expect(result.records.length).toBeGreaterThan(2);
  });

  it('extracts seed', () => {
    expect(result.seed).toBe('9912345678');
  });
});

// ---- real randomizer v0.11.4 format ----
describe('parseSpoilerLog - real v0.11.4 format', () => {
  const text = fixture('sample_real_v0114_log.txt');
  const result = parseSpoilerLog(text);

  it('extracts seed from options line', () => {
    expect(result.seed).toBe('551803685');
  });

  it('removes key hint summaries when a real spoiler entry exists', () => {
    expect(result.records.find((r) => r.rawLine === 'Rold Medallion: In Hidden Path to the Haligtree')).toBeUndefined();
  });

  it('parses item-in-area spoiler placement lines', () => {
    expect(result.records.find((r) => r.itemName === 'Star Shower')).toMatchObject({
      area: 'Limgrave',
      locationName: 'Sold by Sellen',
      originalItem: 'Glintstone Pebble',
      sourceType: 'shop',
    });
  });

  it('handles spoiler item names that contain a colon', () => {
    expect(result.records.find((r) => r.itemName === 'Ash of War: Carian Retaliation')).toMatchObject({
      area: 'Limgrave',
      originalItem: 'Cracked Pot',
    });
  });

  it('preserves key item state on real spoiler entries after dedupe', () => {
    expect(result.records.find((r) => r.itemName === 'Rold Medallion')).toMatchObject({
      isKeyItem: true,
      section: 'spoilers',
    });
  });

  it('skips cost, drop-chance, and numeric metadata rows', () => {
    const noise = result.records.filter((r) =>
      r.rawLine.includes('cost:') ||
      r.rawLine.includes('Drop chance for') ||
      r.rawLine === '(1000)'
    );
    expect(noise).toHaveLength(0);
    expect(result.diagnostics.unmatchedLines).not.toContain('  (cost: 3500)');
    expect(result.diagnostics.unmatchedLines).not.toContain('Drop chance for 1: 0.1%');
  });
});

// ---- edge cases ----
describe('parseSpoilerLog - edge cases', () => {
  const text = fixture('sample_edge_cases.txt');
  const result = parseSpoilerLog(text);

  it('puts unparseable lines in unmatched, not records', () => {
    const unmatched = result.diagnostics.unmatchedLines.join(' ');
    expect(unmatched).toContain('no colon separator');
  });

  it('still parses valid lines around the bad one', () => {
    expect(result.records.length).toBeGreaterThan(3);
  });

  it('handles item names with brackets like Smithing-Stone Miner\'s Bell Bearing [1]', () => {
    const r = result.records.find((r) => r.itemName.includes('Bell Bearing'));
    expect(r).toBeDefined();
  });
});

// ---- empty / garbage input ----
describe('parseSpoilerLog - empty input', () => {
  it('returns zero records and a warning for empty input', () => {
    const result = parseSpoilerLog('');
    expect(result.records.length).toBe(0);
    expect(result.diagnostics.warnings.length).toBeGreaterThan(0);
  });

  it('returns zero records for pure garbage', () => {
    const result = parseSpoilerLog('jklasdfjklasdf\nnot a spoiler log at all\n!!!');
    expect(result.records.length).toBe(0);
  });
});
