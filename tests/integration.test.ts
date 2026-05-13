import { describe, it, expect, beforeEach } from 'vitest';
import { buildVanillaDataset, buildRandomizerDataset, originalItemLabel, locationColumnLabel, missingItemText, plannerNote, itemSourceDescription, SOURCE_IDS } from '../src/dataSources';
import { storageKey, favoritesKey, acquiredKey, spoilerSettingsKey, userBuildsKey, buildFavoritesKey, browserCacheKey, activeSourceKey } from '../src/storageKeys';
import type { ParseResult } from '../src/types';

describe('dataSources', () => {
  describe('buildVanillaDataset', () => {
    it('returns a vanilla dataset with records', () => {
      const ds = buildVanillaDataset();
      expect(ds.id).toBe('vanilla');
      expect(ds.kind).toBe('vanilla');
      expect(ds.records.length).toBeGreaterThan(0);
    });
  });

  describe('buildRandomizerDataset', () => {
    it('wraps a parse result correctly', () => {
      const result: ParseResult = {
        records: [{ id: '1', itemName: 'Test', originalItem: null, locationName: 'Here', area: null, sourceType: 'unknown', isKeyItem: false, rawLine: '', section: 'Weapons' }],
        diagnostics: { totalLines: 1, parsedRecords: 1, unmatchedLines: [], warnings: [], sections: ['Weapons'] },
        seed: 'abc123',
        header: ['Item', 'Location'],
      };
      const ds = buildRandomizerDataset(result, 'test.txt');
      expect(ds.id).toBe('randomizer-log');
      expect(ds.kind).toBe('randomizer-log');
      expect(ds.records).toEqual(result.records);
      expect(ds.seed).toBe('abc123');
      expect(ds.diagnostics).toBe(result.diagnostics);
      expect(ds.filename).toBe('test.txt');
    });
  });

  describe('originalItemLabel', () => {
    it('returns "Source data" for vanilla', () => {
      expect(originalItemLabel('vanilla')).toBe('Source data');
    });
    it('returns "Replaced" for randomizer-log', () => {
      expect(originalItemLabel('randomizer-log')).toBe('Replaced');
    });
  });

  describe('locationColumnLabel', () => {
    it('returns "Location" for vanilla', () => {
      expect(locationColumnLabel('vanilla')).toBe('Location');
    });
    it('returns "Randomized location" for randomizer-log', () => {
      expect(locationColumnLabel('randomizer-log')).toBe('Randomized location');
    });
  });

  describe('missingItemText', () => {
    it('returns database message for vanilla', () => {
      expect(missingItemText('vanilla')).toBe('Not found in item database');
    });
    it('returns spoiler log message for randomizer-log', () => {
      expect(missingItemText('randomizer-log')).toBe('Not found in loaded spoiler log');
    });
  });

  describe('plannerNote', () => {
    it('returns vanilla note for vanilla', () => {
      expect(plannerNote('vanilla')).toContain('vanilla');
    });
    it('returns randomized note for randomizer-log', () => {
      expect(plannerNote('randomizer-log')).toContain('randomized');
    });
  });

  describe('itemSourceDescription', () => {
    it('returns "item database" for vanilla', () => {
      expect(itemSourceDescription('vanilla')).toBe('item database');
    });
    it('returns "loaded spoiler log" for randomizer-log', () => {
      expect(itemSourceDescription('randomizer-log')).toBe('loaded spoiler log');
    });
  });
});

describe('storageKeys', () => {
  it('uses the shared app prefix', () => {
    const key = storageKey('test-id', 'favorites');
    expect(key).toContain('elden-ring-index-build-planner');
    expect(key).toContain('test-id');
    expect(key).toContain('favorites');
  });

  it('source IDs produce distinct keys', () => {
    expect(favoritesKey(SOURCE_IDS.vanilla)).not.toBe(favoritesKey(SOURCE_IDS.randomizer));
  });

  it('vanilla and randomizer keys do not collide', () => {
    const vKey = acquiredKey(SOURCE_IDS.vanilla);
    const rKey = acquiredKey(SOURCE_IDS.randomizer);
    expect(vKey).not.toBe(rKey);
    expect(vKey).toContain('vanilla');
    expect(rKey).toContain('randomizer-log');
  });

  it('favorites keys differ by source', () => {
    expect(favoritesKey('vanilla')).not.toBe(favoritesKey('randomizer-log'));
  });

  it('acquired keys differ by source', () => {
    expect(acquiredKey('vanilla')).not.toBe(acquiredKey('randomizer-log'));
  });

  it('user builds keys differ by source', () => {
    expect(userBuildsKey('vanilla')).not.toBe(userBuildsKey('randomizer-log'));
  });

  it('build favorites keys differ by source', () => {
    expect(buildFavoritesKey('vanilla')).not.toBe(buildFavoritesKey('randomizer-log'));
  });

  it('spoiler settings keys differ by source', () => {
    expect(spoilerSettingsKey('vanilla')).not.toBe(spoilerSettingsKey('randomizer-log'));
  });

  it('browser cache keys differ by source', () => {
    expect(browserCacheKey('vanilla')).not.toBe(browserCacheKey('randomizer-log'));
  });

  it('active source key is app-level not source-scoped', () => {
    const key = activeSourceKey();
    expect(key).toContain('active-source');
    expect(key).not.toContain('vanilla');
    expect(key).not.toContain('randomizer-log');
  });
});
