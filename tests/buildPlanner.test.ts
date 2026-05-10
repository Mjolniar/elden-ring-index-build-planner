import { describe, expect, it } from 'vitest';
import type { ItemRecord, BuildItemKind } from '../src/types';
import {
  BUILD_PRESETS,
  buildLevelRank,
  buildPlannerMatches,
  computeSoulCost,
  filterBuildPresets,
  isFreeformRequirement,
  normalizeBuildName,
} from '../src/buildPlanner';
import { buildNotesFor } from '../src/buildNotes';
import type { BuildRequirement } from '../src/buildPlanner';

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

  it('dedupes repeated requirements before rendering build matches', () => {
    const preset = BUILD_PRESETS.find((build) => build.id === 'blasphemous-herald-build-level-150')!;
    const matches = buildPlannerMatches(preset, []);
    const blackbladeRows = matches.filter((match) => match.requirement.name === "Gargoyle's Blackblade");

    expect(blackbladeRows).toHaveLength(1);
  });
});

describe('build notes', () => {
  it('describes the selected build identity from actual requirements', () => {
    const preset = BUILD_PRESETS.find((build) => build.id === 'archer-build-beginner')!;
    const notes = buildNotesFor(preset, buildPlannerMatches(preset, [
      record('Shortbow', 'Limgrave'),
      record('Longbow', 'Roundtable Hold'),
      record('Ash of War: Mighty Shot', 'Weeping Peninsula'),
    ]));

    expect(notes.join(' ')).toContain('Shortbow and Longbow');
    expect(notes.join(' ')).toContain('Combat type: ranged weapon');
    expect(notes.join(' ')).toContain('Weeping Peninsula');
  });

  it('varies notes by combat theme instead of repeating the same generic copy', () => {
    const archer = BUILD_PRESETS.find((build) => build.id === 'archer-build-beginner')!;
    const dragon = BUILD_PRESETS.find((build) => build.id === 'dragon-priest-build-beginner')!;
    const archerNotes = buildNotesFor(archer, buildPlannerMatches(archer, [])).join('\n');
    const dragonNotes = buildNotesFor(dragon, buildPlannerMatches(dragon, [])).join('\n');

    expect(archerNotes).not.toBe(dragonNotes);
    expect(dragonNotes).toMatch(/dragon|incantation|elemental/i);
  });

  it('keeps generated notes objective instead of editorial', () => {
    const blockedPhrases = /\b(leans into|gives it more than one angle|expect the shopping list|tighten as|should feel|main flavor|rhythm|chunky|cash(?:ing)? in)\b/i;
    for (const preset of BUILD_PRESETS.slice(0, 40)) {
      const notes = buildNotesFor(preset, buildPlannerMatches(preset, [])).join('\n');
      expect(notes).not.toMatch(blockedPhrases);
    }
  });
});

describe('build data integrity', () => {
  const allRequirements = BUILD_PRESETS.flatMap((preset) =>
    preset.requirements.map((req) => ({ preset: preset.id, ...req }))
  );

  const VALID_KINDS = ['weapon', 'shield', 'seal', 'staff', 'armor', 'talisman', 'spell', 'ash', 'optional'];

  it('all requirements have valid kind values', () => {
    for (const req of allRequirements) {
      expect(VALID_KINDS).toContain(req.kind);
    }
  });

  it('no requirement names start with conjunction words', () => {
    const bad = allRequirements.filter((req) =>
      /^\s*(and|but|or|also)\b/i.test(req.name)
    );
    if (bad.length) {
      console.log('Requirements with conjunction prefix:', bad.map((r) => `${r.preset}: "${r.name}"`));
    }
    expect(bad).toHaveLength(0);
  });

  it('talisman-like names have kind=talisman unless freeform', () => {
    const mismatches = allRequirements.filter((req) => {
      if (isFreeformRequirement(req)) return false;
      const n = req.name.toLowerCase();
      const looksTalisman = /\b(talisman|charm|insignia|prosthes|soreseal|scarseal|cameo|exultation|medallion|heirloom|canvas)\b/i.test(n);
      return looksTalisman && req.kind !== 'talisman';
    });
    if (mismatches.length) {
      console.log('Talisman-like items with wrong kind:', mismatches.map((r) => `${r.preset}: "${r.name}" kind=${r.kind}`));
    }
    expect(mismatches).toHaveLength(0);
  });

  it('seal-like names have kind=seal unless freeform', () => {
    const mismatches = allRequirements.filter((req) => {
      if (isFreeformRequirement(req)) return false;
      const n = req.name.toLowerCase();
      const looksSeal = /\bseal\b/i.test(n) && !/talisman|charm|insignia|greatshield/i.test(n);
      return looksSeal && req.kind !== 'seal';
    });
    if (mismatches.length) {
      console.log('Seal-like items with wrong kind:', mismatches.map((r) => `${r.preset}: "${r.name}" kind=${r.kind}`));
    }
    expect(mismatches).toHaveLength(0);
  });

  it('staff/scepter names have kind=staff unless freeform', () => {
    const mismatches = allRequirements.filter((req) => {
      if (isFreeformRequirement(req)) return false;
      const n = req.name.toLowerCase();
      const looksStaff = /\b(staff|scepter)\b/i.test(n);
      return looksStaff && req.kind !== 'staff';
    });
    if (mismatches.length) {
      console.log('Staff-like items with wrong kind:', mismatches.map((r) => `${r.preset}: "${r.name}" kind=${r.kind}`));
    }
    expect(mismatches).toHaveLength(0);
  });

  it('freeform-like requirement names are detected by isFreeformRequirement', () => {
    const missed = allRequirements.filter((req) => {
      const n = req.name.toLowerCase();
      const looksFreeform = /\b(armor (that|you|as|with|for|to|good|pieces)|high poise|med roll|medium roll|heaviest|weighs nothing|of your choice|you can|you want|you like|as long as|still allows|other (weapon|armor|talisman|curved|colossus)|in the video|suggested|recommended)\b/i.test(n);
      return looksFreeform && !isFreeformRequirement(req);
    });
    if (missed.length) {
      console.log('Freeform-like items NOT detected:', missed.map((r) => `${r.preset}: "${r.name}"`));
    }
    expect(missed).toHaveLength(0);
  });

  it('exact-level builds resolve to their displayed rune level', () => {
    const mismatches = BUILD_PRESETS
      .map((preset) => {
        const match = `${preset.level} ${preset.name}`.match(/\bLevel\s+(\d+)\b/i);
        if (!match || preset.level.includes('-')) return null;
        const cost = computeSoulCost(preset);
        return cost?.targetLevel === Number(match[1])
          ? null
          : `${preset.id}: expected RL ${match[1]}, got ${cost?.targetLevel ?? 'none'}`;
      })
      .filter(Boolean);

    if (mismatches.length) console.log('Exact-level stat mismatches:', mismatches);
    expect(mismatches).toHaveLength(0);
  });

  it('marks every recommended allocation as source-backed or estimated', () => {
    const missing = BUILD_PRESETS.filter((preset) =>
      preset.statRecommended && !['source', 'estimated'].includes(preset.statSource ?? '')
    );

    if (missing.length) console.log('Missing stat source labels:', missing.map((preset) => preset.id));
    expect(missing).toHaveLength(0);
  });
});
