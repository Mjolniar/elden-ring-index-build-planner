import { describe, expect, it } from 'vitest';
import type { ItemRecord, BuildItemKind } from '../src/types';
import {
  BUILD_PRESETS,
  BUILD_STATS,
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
});

// ─── Canonical kind sets ───────────────────────────────────────────────────────
// These lists are ground-truth: every time these items appear in a build
// requirement, they must carry the stated kind. If a fix ever regresses,
// these tests will catch it immediately without relying on name heuristics.

describe('canonical requirement kinds', () => {
  const allRequirements = BUILD_PRESETS.flatMap((p) =>
    p.requirements.map((r) => ({ preset: p.id, ...r }))
  );

  function assertKind(names: string[], expectedKind: BuildItemKind, label: string) {
    const matches = allRequirements.filter(
      (r) => names.includes(r.name) && !isFreeformRequirement(r)
    );
    const wrong = matches.filter((r) => r.kind !== expectedKind);
    if (wrong.length) {
      console.log(`${label} with wrong kind:`, wrong.map((r) => `${r.preset}: "${r.name}" kind=${r.kind}`));
    }
    expect(wrong).toHaveLength(0);
  }

  it('known talismans always have kind=talisman', () => {
    assertKind([
      'Shard of Alexander',
      "Millicent's Prosthesis",
      'Godfrey Icon',
      'Radagon Icon',
      'Carian Filigreed Crest',
      'Ritual Sword Talisman',
      'Ritual Shield Talisman',
      'Dragoncrest Greatshield Talisman',
      "Lord of Blood's Exultation",
      "Kindred of Rot's Exultation",
      'Rotten Winged Sword Insignia',
      'Winged Sword Insignia',
      'Green Turtle Talisman',
      'Two-Headed Turtle Talisman',
      "Great-Jar's Arsenal",
      "Erdtree's Favor",
      'Claw Talisman',
      'Axe Talisman',
      'Spear Talisman',
      'Fire Scorpion Charm',
      'Magic Scorpion Charm',
      'Lightning Scorpion Charm',
      'Sacred Scorpion Charm',
      'Graven-Mass Talisman',
      "Flock's Canvas Talisman",
      "Old Lord's Talisman",
      "Arrow's Sting Talisman",
      'Blue Dancer Charm',
      'Blade of Mercy',
      'Blessed Blue Dew Talisman',
      'Blessed Dew Talisman',
    ], 'talisman', 'Known talismans');
  });

  it('known weapons always have kind=weapon', () => {
    assertKind([
      'Flamberge',
      'Nagakiba',
      'Uchigatana',
      'Erdsteel Dagger',
      'Black Knife',
      "Bloodhound's Fang",
      "Gargoyle's Blackblade",
      "Gargoyle's Greatsword",
      'Cinquedea',
      'Cross-Naginata',
      "Maliketh's Black Blade",
      'Black Bow',
      'Rivers of Blood',
      'Moonveil',
      'Blasphemous Blade',
      'Sword of Night and Flame',
      'Zweihander',
      'Claymore',
      'Greatsword',
    ], 'weapon', 'Known weapons');
  });

  it('known seals always have kind=seal', () => {
    assertKind([
      'Clawmark Seal',
      "Godslayer's Seal",
      'Golden Order Seal',
      'Erdtree Seal',
      'Dragon Communion Seal',
      'Finger Seal',
      'Frenzied Flame Seal',
      "Giant's Seal",
      'Gravel Stone Seal',
      "Fire Knight's Seal",
    ], 'seal', 'Known seals');
  });

  it('known staves always have kind=staff', () => {
    assertKind([
      'Carian Glintstone Staff',
      'Meteorite Staff',
      'Academy Glintstone Staff',
      "Lusat's Glintstone Staff",
      "Azur's Glintstone Staff",
      'Staff of the Guilty',
      "Demi-Human Queen's Staff",
      "Prince of Death's Staff",
      'Rotten Crystal Staff',
      "Helphen's Steeple",
    ], 'staff', 'Known staves');
  });
});

// ─── Stat model integrity ──────────────────────────────────────────────────────

describe('stat model integrity', () => {
  it('computeSoulCost uses statRecommended when present, falls back to statRequired', () => {
    const withBoth = BUILD_PRESETS.find((p) => p.statRecommended && p.statRequired);
    expect(withBoth).toBeTruthy();
    const cost = computeSoulCost(withBoth!);
    expect(cost).not.toBeNull();
    expect(cost!.cost).toBeGreaterThan(0);
    expect(cost!.targetLevel).toBeGreaterThan(0);
  });

  it('computeSoulCost returns null for presets with no stat data', () => {
    const noStats = BUILD_PRESETS.find((p) => !p.statRecommended && !p.statRequired);
    if (noStats) {
      expect(computeSoulCost(noStats)).toBeNull();
    }
  });

  it('presets with primaryStats have statRecommended covering those stats', () => {
    const violations: string[] = [];
    for (const preset of BUILD_PRESETS) {
      if (!preset.primaryStats.length || !preset.statRecommended) continue;
      for (const stat of preset.primaryStats) {
        const val = preset.statRecommended[stat] ?? 0;
        if (val <= 0) {
          violations.push(`${preset.id}: primaryStat "${stat}" missing from statRecommended`);
        }
      }
    }
    if (violations.length) {
      console.log('Stat coverage violations:', violations);
    }
    expect(violations).toHaveLength(0);
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
