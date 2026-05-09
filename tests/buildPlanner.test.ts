import { describe, expect, it } from 'vitest';
import type { ItemRecord } from '../src/types';
import {
  BUILD_PRESETS,
  buildLevelRank,
  buildPlannerMatches,
  filterBuildPresets,
  isFreeformRequirement,
  normalizeBuildName,
} from '../src/buildPlanner';

function record(itemName: string, area: string | null, locationName = `Found ${itemName}`): ItemRecord {
  return {
    id: `${itemName}-${area ?? 'unknown'}`,
    itemName,
    originalItem: null,
    locationName,
    area,
    sourceType: 'ground_pickup',
    isKeyItem: false,
    rawLine: `${itemName}: ${locationName}`,
    section: 'spoilers',
  };
}

describe('build planner matching', () => {
  it('normalizes punctuation and aliases for build item lookup', () => {
    expect(normalizeBuildName("Flame, Grant Me Strength")).toBe('flame grant me strength');
    const preset = BUILD_PRESETS.find((build) => build.id === 'flame-dancer-build-level-150')!;
    const matches = buildPlannerMatches(preset, [
      record('Flame Grant Me Strength', 'Caelid'),
      record("Giant's Red Braid", 'Mountaintops of the Giants'),
    ]);

    expect(matches.find((match) => match.requirement.name === 'Flame, Grant Me Strength')?.record?.itemName)
      .toBe('Flame Grant Me Strength');
  });

  it('sorts found requirements before missing requirements by rough area progression', () => {
    const preset = BUILD_PRESETS.find((build) => build.id === 'flame-dancer-build-level-150')!;
    const matches = buildPlannerMatches(preset, [
      record('Shard of Alexander', 'Farum Azula'),
      record("Giant's Red Braid", 'Mountaintops of the Giants'),
      record('Golden Vow', 'Limgrave'),
    ]);

    expect(matches.slice(0, 3).map((match) => match.record?.itemName)).toEqual([
      'Golden Vow',
      "Giant's Red Braid",
      'Shard of Alexander',
    ]);
    expect(matches.at(-1)?.record).toBeNull();
  });

  it('filters builds by selected stat combinations', () => {
    const strengthFaith = filterBuildPresets(['Strength', 'Faith'], true);
    expect(strengthFaith.length).toBeGreaterThan(5);
    expect(strengthFaith.every((build) =>
      build.statTags.includes('Strength') && build.statTags.includes('Faith')
    )).toBe(true);
  });

  it('orders filtered builds by progression bucket and then name', () => {
    const dexterity = filterBuildPresets(['Dexterity'], true);
    const sortKeys = dexterity.map((build) => `${buildLevelRank(build.level)}:${build.name}`);
    expect(sortKeys).toEqual([...sortKeys].sort((a, b) => a.localeCompare(b)));
  });

  it('marks generic build notes as free-form instead of missing spoiler-log items', () => {
    expect(isFreeformRequirement({ name: 'Light Armor', kind: 'armor' })).toBe(true);
    expect(isFreeformRequirement({ name: 'Seal that weighs nothing', kind: 'seal' })).toBe(true);
    expect(isFreeformRequirement({ name: 'Shard of Alexander', kind: 'talisman' })).toBe(false);

    const preset = BUILD_PRESETS.find((build) => build.id === 'black-arrow-build-level-150-200-journey-2')!;
    const matches = buildPlannerMatches(preset, []);
    const sealNote = matches.find((match) => match.requirement.name === 'Seal that weighs nothing');
    expect(sealNote).toMatchObject({ record: null, isFreeform: true });
  });
});
