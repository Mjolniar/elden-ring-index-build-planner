import type { BuildPreset, BuildRequirementMatch, BuildItemKind, BuildStat } from './buildPlanner';
import { buildStatCategory, isFreeformRequirement } from './buildPlanner';

const ELEMENT_PATTERNS: Array<{ label: string; pattern: RegExp; effect: string }> = [
  {
    label: 'bleed',
    pattern: /\b(blood|bloody|bloodflame|hemorrhage|white mask|eleonora|rivers of blood|mohg|swarm of flies|seppuku|reduvia)\b/i,
    effect: 'status buildup through repeated hits',
  },
  {
    label: 'frost',
    pattern: /\b(frost|cold|ice|rime|zamor|dark moon|moonblade|helphen|freezing)\b/i,
    effect: 'frostbite buildup plus weapon damage',
  },
  {
    label: 'fire',
    pattern: /\b(fire|flame|flaming|giantsflame|black flame|blasphemous|magma|scorch|hellfire|burn)\b/i,
    effect: 'fire damage from weapons, skills, or incantations',
  },
  {
    label: 'lightning',
    pattern: /\b(lightning|thunder|bolt|ancient dragon|dragonscale|lancer|dragoon)\b/i,
    effect: 'lightning damage from mid-range casts or weapon skills',
  },
  {
    label: 'holy',
    pattern: /\b(holy|sacred|golden|order|erdtree|euporia|black blade|maliketh|paladin|crusader)\b/i,
    effect: 'holy damage and faith utility',
  },
  {
    label: 'magic',
    pattern: /\b(magic|glint|glintstone|carian|comet|moonveil|moonlight|moon|sorcery|crystal|nebula|meteor|gravity|haima|stars|night)\b/i,
    effect: 'magic damage from sorceries or intelligence-scaling weapons',
  },
  {
    label: 'dragon',
    pattern: /\b(dragon|drake|agheel|ekzykes|greyoll|dragonmaw|dragonclaw|communion)\b/i,
    effect: 'dragon incantation burst damage',
  },
  {
    label: 'rot / poison',
    pattern: /\b(rot|scarlet|poison|venom|pest|kindred)\b/i,
    effect: 'damage-over-time status buildup',
  },
  {
    label: 'madness',
    pattern: /\b(frenzy|frenzied|madness|vyke)\b/i,
    effect: 'frenzy incantations and madness buildup',
  },
  {
    label: 'sleep',
    pattern: /\b(sleep|trina|velvet)\b/i,
    effect: 'sleep setup followed by weapon damage',
  },
];

type CombatProfile = {
  combatType: string;
  range: 'melee' | 'ranged' | 'hybrid';
  actions: string;
};

const WEAPON_STYLE_PATTERNS: Array<{ pattern: RegExp } & CombatProfile> = [
  { pattern: /\b(bow|longbow|shortbow|greatbow|crossbow)\b/i, combatType: 'ranged weapon', range: 'ranged', actions: 'Maintain distance; use ammunition and enemy recovery windows.' },
  { pattern: /\b(staff|scepter|glintstone|sorcery)\b/i, combatType: 'sorcery caster', range: 'ranged', actions: 'Cast from range; manage FP and cast commitment.' },
  { pattern: /\b(seal|incantation|communion|prayerbook)\b/i, combatType: 'incantation hybrid', range: 'hybrid', actions: 'Use buffs or incantations, then commit to melee or close-range casts.' },
  { pattern: /\b(colossal|giant-crusher|greatsword|great axe|greataxe|crozier|crusher)\b/i, combatType: 'heavy melee', range: 'melee', actions: 'Use large attacks, stance damage, and deliberate recovery windows.' },
  { pattern: /\b(claw|katar|dagger|rapier|fist|hand|backhand|twinblade|curved sword|scimitar)\b/i, combatType: 'fast melee', range: 'melee', actions: 'Use repeated hits, short recovery, and status application where available.' },
  { pattern: /\b(spear|lance|naginata|halberd|swordspear|war sickle)\b/i, combatType: 'reach melee', range: 'melee', actions: 'Use longer melee range, pokes, and counter-hit spacing.' },
  { pattern: /\b(shield|greatshield|guard|tower)\b/i, combatType: 'guard melee', range: 'melee', actions: 'Use blocking, guard counters, and stable trades.' },
  { pattern: /\b(katana|moonveil|nagakiba|uchigatana|ronin|samurai)\b/i, combatType: 'katana melee', range: 'melee', actions: 'Use quick entries, weapon skills, and bleed or magic where present.' },
];

const ROLE_BY_KIND: Partial<Record<BuildItemKind, string>> = {
  weapon: 'main weapon',
  staff: 'casting focus',
  seal: 'incantation focus',
  shield: 'defensive anchor',
  spell: 'signature cast',
  ash: 'weapon art',
  talisman: 'build amplifier',
};

function cleanNameList(items: string[], limit: number): string[] {
  return [...new Set(items.filter(Boolean))].slice(0, limit);
}

function joinHuman(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function isPluralPhrase(text: string): boolean {
  return /\band\b|,|\bdual\b|\btwin\b|\bclaws\b|\bfists\b|\bspells\b/i.test(text);
}

function requirementNames(preset: BuildPreset, kind: BuildItemKind): string[] {
  return preset.requirements
    .filter((req) => req.kind === kind && !isFreeformRequirement(req))
    .map((req) => req.name);
}

function allRequirementText(preset: BuildPreset): string {
  return [
    preset.name,
    preset.summary,
    preset.level,
    preset.requirements.map((req) => req.name).join(' '),
  ].join(' ');
}

function summaryCenterpiece(preset: BuildPreset): string | null {
  const match = preset.summary.match(/\busing\s+(.+?)(?:\.|$)/i);
  if (!match) return null;
  return match[1]
    .replace(/\bby default\b/gi, '')
    .replace(/\bsuch as\b.+$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function chooseCenterpiece(preset: BuildPreset): { name: string; kind: BuildItemKind } | null {
  const fromSummary = summaryCenterpiece(preset);
  if (fromSummary) {
    const matchingReq = preset.requirements.find((req) => fromSummary.toLowerCase().includes(req.name.toLowerCase()));
    return { name: fromSummary, kind: matchingReq?.kind ?? 'weapon' };
  }

  const priority: BuildItemKind[] = ['weapon', 'staff', 'seal', 'spell', 'ash', 'shield', 'talisman'];
  for (const kind of priority) {
    const req = preset.requirements.find((candidate) => candidate.kind === kind && !isFreeformRequirement(candidate));
    if (req) return { name: req.name, kind };
  }
  return null;
}

function strongestStats(preset: BuildPreset): BuildStat[] {
  const ranked = Object.entries(preset.statRecommended ?? preset.statRequired ?? {})
    .filter((entry): entry is [BuildStat, number] => typeof entry[1] === 'number')
    .sort((a, b) => b[1] - a[1])
    .map(([stat]) => stat);
  return ranked.length ? ranked.slice(0, 3) : preset.primaryStats.slice(0, 3);
}

function inferThemes(preset: BuildPreset): Array<{ label: string; effect: string }> {
  const text = allRequirementText(preset);
  const themes = ELEMENT_PATTERNS.filter((theme) => theme.pattern.test(text));
  if (themes.length) return themes.slice(0, 3);

  const stats = new Set([...preset.primaryStats, ...preset.secondaryStats]);
  if (stats.has('Intelligence')) {
    return [{ label: 'magic', effect: 'intelligence-scaling spell or weapon damage' }];
  }
  if (stats.has('Faith')) {
    return [{ label: 'faith', effect: 'faith-scaling buffs, incantations, or weapon damage' }];
  }
  if (stats.has('Arcane')) {
    return [{ label: 'arcane', effect: 'arcane scaling and status buildup' }];
  }
  if (stats.has('Strength')) {
    return [{ label: 'physical', effect: 'physical damage and stance damage' }];
  }
  if (stats.has('Dexterity')) {
    return [{ label: 'physical', effect: 'physical damage from faster weapon actions' }];
  }
  return [{ label: 'flexible', effect: 'general weapon damage with adaptable equipment slots' }];
}

function inferWeaponStyle(preset: BuildPreset): CombatProfile {
  const text = allRequirementText(preset);
  const matched = WEAPON_STYLE_PATTERNS.find((candidate) => candidate.pattern.test(text));
  if (matched) return matched;
  if (requirementNames(preset, 'spell').length >= 3) {
    return { combatType: 'spell caster', range: 'ranged', actions: 'Use multiple spells; manage FP, cast time, and target distance.' };
  }
  if (requirementNames(preset, 'spell').length && !requirementNames(preset, 'weapon').length) {
    return { combatType: 'burst caster', range: 'ranged', actions: 'Use one or two high-value casts during safe openings.' };
  }
  if (requirementNames(preset, 'staff').length || requirementNames(preset, 'seal').length) {
    return { combatType: 'caster hybrid', range: 'hybrid', actions: 'Use ranged casts and melee actions from the same stat spread.' };
  }
  return { combatType: 'melee', range: 'melee', actions: 'Use weapon attacks and standard opening-based melee timing.' };
}

function describeSupport(preset: BuildPreset): string | null {
  const spells = cleanNameList(requirementNames(preset, 'spell'), 4);
  const ashes = cleanNameList(requirementNames(preset, 'ash'), 3);
  const talismans = cleanNameList(requirementNames(preset, 'talisman'), 4);
  const catalysts = cleanNameList([...requirementNames(preset, 'staff'), ...requirementNames(preset, 'seal')], 2);

  if (spells.length >= 3) {
    return `Spells: ${joinHuman(spells)}. Function: ranged damage, buffs, or utility depending on cast.`;
  }
  if (spells.length) {
    const castingPackage = joinHuman([...catalysts, ...spells].slice(0, 4));
    const hasWeapon = requirementNames(preset, 'weapon').length > 0;
    return `Casting tools: ${castingPackage}. Function: ${hasWeapon ? 'support the main weapon' : 'primary ranged or utility action'}.`;
  }
  if (ashes.length) {
    const ashText = joinHuman(ashes);
    return `Skills: ${ashText}. Function: weapon-skill damage, range, stance damage, or status application.`;
  }
  if (talismans.length >= 2) {
    return `Talismans: ${joinHuman(talismans)}. Function: damage, stat, equip-load, or resource modifiers.`;
  }
  return null;
}

function describeAreas(buildMatches: BuildRequirementMatch[]): string | null {
  const areas = cleanNameList(
    buildMatches
      .filter((match) => match.record?.area && !match.isFreeform)
      .map((match) => match.record!.area!),
    4
  );
  if (!areas.length) return null;
  return `Mapped areas: ${joinHuman(areas)}. These are matched item areas, not an optimized route.`;
}

function describeFreeform(buildMatches: BuildRequirementMatch[]): string | null {
  const freeform = buildMatches
    .filter((match) => match.isFreeform)
    .map((match) => match.requirement.name);
  if (!freeform.length) return null;
  return `Flexible rows: ${joinHuman(cleanNameList(freeform, 3))}. These are equipment categories, not exact item records.`;
}

export function buildNotesFor(preset: BuildPreset, buildMatches: BuildRequirementMatch[]): string[] {
  const centerpiece = chooseCenterpiece(preset);
  const themes = inferThemes(preset);
  const style = inferWeaponStyle(preset);
  const stats = strongestStats(preset);
  const statText = joinHuman(stats);
  const centerIsPlural = centerpiece ? isPluralPhrase(centerpiece.name) : false;
  const centerRole = centerpiece ? ROLE_BY_KIND[centerpiece.kind] ?? 'centerpiece' : 'centerpiece';
  const centerRoleText = centerIsPlural && centerRole === 'main weapon' ? 'main weapons' : centerRole;
  const themeText = themes.map((theme) => theme.label).join(' / ');
  const effectText = themes.map((theme) => theme.effect).join('; ');

  const notes: string[] = [];
  if (centerpiece) {
    notes.push(`Core: ${centerpiece.name}. Role: ${centerRoleText}. Stat focus: ${statText || buildStatCategory(preset)}.`);
  } else {
    notes.push(`Core: ${buildStatCategory(preset)}. Role: derived from listed equipment. Stat focus: ${statText || buildStatCategory(preset)}.`);
  }

  notes.push(`Combat type: ${style.combatType}. Range: ${style.range}. Primary actions: ${style.actions}`);
  notes.push(`Damage/status: ${themeText}. Function: ${effectText}.`);

  const support = describeSupport(preset);
  if (support) notes.push(support);

  const areas = describeAreas(buildMatches);
  if (areas) notes.push(areas);

  const freeform = describeFreeform(buildMatches);
  if (freeform) notes.push(freeform);

  return notes;
}
