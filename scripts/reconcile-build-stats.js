const { existsSync, readFileSync, writeFileSync } = require('node:fs');
const { join, resolve } = require('node:path');

const root = resolve(__dirname, '..');
const tsPath = join(root, 'src', 'buildPlanner.ts');
const htmlCandidates = [
  join(root, 'Builds _ Elden Ring Wiki.htm'),
  join(root, '..', 'elden-ring-randomizer-index', 'Builds _ Elden Ring Wiki.htm'),
  join(root, '..', 'Elden Ring Master', 'elden-ring-randomizer-index', 'Builds _ Elden Ring Wiki.htm'),
];
const htmlPath = htmlCandidates.find((candidate) => existsSync(candidate));

const STATS = ['Vigor', 'Mind', 'Endurance', 'Strength', 'Dexterity', 'Intelligence', 'Faith', 'Arcane'];
const BASELINE = {
  Vigor: 30,
  Mind: 10,
  Endurance: 15,
  Strength: 10,
  Dexterity: 10,
  Intelligence: 7,
  Faith: 7,
  Arcane: 7,
};
const SOFT_CAP = {
  Vigor: 60,
  Mind: 50,
  Endurance: 50,
  Strength: 80,
  Dexterity: 80,
  Intelligence: 80,
  Faith: 80,
  Arcane: 80,
};
const STARTING_CLASSES = [
  { name: 'Vagabond', level: 9, stats: { Vigor: 15, Mind: 10, Endurance: 11, Strength: 14, Dexterity: 13, Intelligence: 9, Faith: 9, Arcane: 7 } },
  { name: 'Warrior', level: 8, stats: { Vigor: 11, Mind: 12, Endurance: 11, Strength: 10, Dexterity: 16, Intelligence: 10, Faith: 8, Arcane: 9 } },
  { name: 'Hero', level: 7, stats: { Vigor: 14, Mind: 9, Endurance: 12, Strength: 16, Dexterity: 9, Intelligence: 7, Faith: 8, Arcane: 11 } },
  { name: 'Bandit', level: 5, stats: { Vigor: 10, Mind: 11, Endurance: 10, Strength: 9, Dexterity: 13, Intelligence: 9, Faith: 8, Arcane: 14 } },
  { name: 'Astrologer', level: 6, stats: { Vigor: 9, Mind: 15, Endurance: 9, Strength: 8, Dexterity: 12, Intelligence: 16, Faith: 7, Arcane: 9 } },
  { name: 'Prophet', level: 7, stats: { Vigor: 10, Mind: 14, Endurance: 8, Strength: 11, Dexterity: 10, Intelligence: 7, Faith: 16, Arcane: 10 } },
  { name: 'Samurai', level: 9, stats: { Vigor: 12, Mind: 11, Endurance: 13, Strength: 12, Dexterity: 15, Intelligence: 9, Faith: 8, Arcane: 8 } },
  { name: 'Prisoner', level: 9, stats: { Vigor: 11, Mind: 12, Endurance: 11, Strength: 11, Dexterity: 14, Intelligence: 14, Faith: 6, Arcane: 9 } },
  { name: 'Confessor', level: 10, stats: { Vigor: 10, Mind: 13, Endurance: 10, Strength: 12, Dexterity: 12, Intelligence: 9, Faith: 14, Arcane: 9 } },
  { name: 'Wretch', level: 1, stats: { Vigor: 10, Mind: 10, Endurance: 10, Strength: 10, Dexterity: 10, Intelligence: 10, Faith: 10, Arcane: 10 } },
];

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripHtml(value) {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stableKey(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function buildNameKey(name) {
  return stableKey(
    name
      .replace(/\([^)]*\)/g, ' ')
      .replace(/\bElden Ring\b/gi, ' ')
      .replace(/\b(Guide|Build|Shadow of the Erdtree|Journey)\b/gi, ' ')
      .replace(/\bLevel\b\s*\d+(?:\s*-\s*\d+)?/gi, ' ')
  );
}

function targetLevelFor(preset) {
  const exact = `${preset.level} ${preset.name}`.match(/\bLevel\s+(\d+)\b/i);
  if (exact) return Number(exact[1]);
  if (preset.level === 'Beginner') return 50;
  if (preset.level === 'Level 150-200') return 150;
  if (preset.level === 'SOTE') return 150;
  if (preset.level === 'All Game') return 100;
  if (preset.level === 'General') return 150;
  return 150;
}

function exactTargetLevelFor(preset) {
  const exact = `${preset.level} ${preset.name}`.match(/\bLevel\s+(\d+)\b/i);
  return exact ? Number(exact[1]) : undefined;
}

function statTotalLevel(stats) {
  if (!STATS.every((stat) => Number.isFinite(stats[stat]))) return undefined;
  return STATS.reduce((sum, stat) => sum + stats[stat], 0) - 79;
}

function parseStatsFromText(chunk) {
  const stats = {};
  for (const stat of STATS) {
    const match = chunk.match(new RegExp(`(?:^|\\D)(\\d{1,3})\\s+${stat}\\b`, 'i'));
    if (!match) continue;
    const value = Number(match[1]);
    if (value > 0 && value <= 99) stats[stat] = value;
  }
  return stats;
}

function extractSourceStatsByAnchor() {
  if (!htmlPath) return new Map();
  const html = readFileSync(htmlPath, 'utf8');
  const headings = [];
  const headingRe = /<h3[^>]*class="[^"]*bonfire[^"]*"[^>]*>[\s\S]*?<\/h3>/gi;
  let headingMatch;
  while ((headingMatch = headingRe.exec(html)) !== null) {
    headings.push({ start: headingMatch.index, end: headingRe.lastIndex, html: headingMatch[0] });
  }

  const byAnchor = new Map();
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const id = heading.html.match(/<a\s+id="([^"]+)"/i)?.[1];
    if (!id) continue;
    const nextStart = headings[i + 1]?.start ?? html.length;
    const title = stripHtml(heading.html);
    const bodyText = stripHtml(html.slice(heading.end, nextStart));
    const candidates = [];

    const slashRe = /Level\s+(\d{2,3})\s*:\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{1,2})/gi;
    let slashMatch;
    while ((slashMatch = slashRe.exec(bodyText)) !== null) {
      const stats = {};
      STATS.forEach((stat, statIndex) => {
        stats[stat] = Number(slashMatch[statIndex + 2]);
      });
      candidates.push({ level: Number(slashMatch[1]), stats, quality: 5 });
    }

    let searchIndex = 0;
    const lowerText = bodyText.toLowerCase();
    while ((searchIndex = lowerText.indexOf('vigor', searchIndex)) !== -1) {
      const chunk = bodyText.slice(Math.max(0, searchIndex - 180), searchIndex + 900);
      const stats = parseStatsFromText(chunk);
      const count = Object.keys(stats).length;
      if (count >= 6) {
        const nearby = bodyText.slice(Math.max(0, searchIndex - 450), searchIndex + 140);
        const levelMatch = chunk.match(/(?:level|at level|after level)\s+(\d{2,3})/i)
          ?? nearby.match(/(?:level|at level|after level)\s+(\d{2,3})/i);
        candidates.push({
          level: levelMatch ? Number(levelMatch[1]) : statTotalLevel(stats),
          stats,
          quality: count + (levelMatch ? 2 : 0),
        });
      }
      searchIndex += 5;
    }

    const unique = new Map();
    for (const candidate of candidates) {
      const completed = completeStats(candidate.stats);
      if (!STATS.every((stat) => Number.isFinite(completed[stat]))) continue;
      const level = statTotalLevel(completed) ?? candidate.level;
      const key = `${level}:${JSON.stringify(completed)}`;
      const current = unique.get(key);
      if (!current || candidate.quality > current.quality) {
        unique.set(key, { level, stats: completed, quality: candidate.quality });
      }
    }

    if (unique.size > 0) {
      const entry = { anchor: id, key: stableKey(id), title, titleKey: buildNameKey(title), candidates: [...unique.values()] };
      const list = byAnchor.get(entry.key) ?? [];
      list.push(entry);
      byAnchor.set(entry.key, list);
    }
  }
  return byAnchor;
}

function completeStats(stats) {
  const completed = {};
  for (const stat of STATS) {
    completed[stat] = Number.isFinite(stats[stat]) ? Number(stats[stat]) : BASELINE[stat];
  }
  return completed;
}

function parseArray(segment, key) {
  const match = segment.match(new RegExp(`"${key}":\\s*\\[([\\s\\S]*?)\\]`));
  return match ? [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];
}

function parseObject(segment, key) {
  const match = segment.match(new RegExp(`"${key}":\\s*(\\{[^}]*\\})`));
  if (!match) return {};
  try {
    return JSON.parse(match[1]);
  } catch {
    return {};
  }
}

function chooseSourceCandidate(preset, sourceByAnchor) {
  const keys = [
    buildNameKey(preset.name),
    stableKey(preset.id.replace(/-build-level.*$/i, '').replace(/-build-beginner$/i, '').replace(/-build$/i, '')),
  ];
  const wanted = targetLevelFor(preset);
  const options = [];

  for (const key of keys) {
    for (const entry of sourceByAnchor.get(key) ?? []) {
      for (const candidate of entry.candidates) {
        options.push({ ...candidate, entry });
      }
    }
  }

  if (!options.length) return null;
  const exactTarget = exactTargetLevelFor(preset);
  if (exactTarget) {
    const exactOptions = options.filter((option) => option.level === exactTarget);
    if (!exactOptions.length) return null;
    options.length = 0;
    options.push(...exactOptions);
  }
  options.sort((a, b) => {
    const levelDiff = Math.abs((a.level ?? wanted) - wanted) - Math.abs((b.level ?? wanted) - wanted);
    if (levelDiff !== 0) return levelDiff;
    return b.quality - a.quality;
  });
  return options[0];
}

function chooseBaseClass(statRequired, primaryStats, secondaryStats) {
  let best = STARTING_CLASSES[0];
  let bestScore = Infinity;
  for (const startingClass of STARTING_CLASSES) {
    let score = 0;
    for (const stat of STATS) {
      const required = statRequired[stat] ?? 0;
      score += Math.max(0, required - startingClass.stats[stat]) * 12;
      if (primaryStats.includes(stat)) score -= startingClass.stats[stat] * 2;
      if (secondaryStats.includes(stat)) score -= startingClass.stats[stat];
    }
    if (score < bestScore) {
      bestScore = score;
      best = startingClass;
    }
  }
  return best;
}

function priorityForTarget(targetLevel, primaryStats, secondaryStats) {
  const support = ['Vigor', 'Endurance', 'Mind'];
  const ordered = [];
  for (const stat of ['Vigor', ...primaryStats, ...secondaryStats, ...support, ...STATS]) {
    if (!ordered.includes(stat)) ordered.push(stat);
  }
  const cap = {};
  for (const stat of STATS) {
    if (targetLevel <= 50) cap[stat] = stat === 'Vigor' ? 30 : primaryStats.includes(stat) ? 35 : secondaryStats.includes(stat) ? 20 : BASELINE[stat];
    else if (targetLevel <= 100) cap[stat] = stat === 'Vigor' ? 40 : primaryStats.includes(stat) ? 55 : secondaryStats.includes(stat) ? 30 : BASELINE[stat];
    else if (targetLevel <= 150) cap[stat] = stat === 'Vigor' ? 50 : primaryStats.includes(stat) ? SOFT_CAP[stat] : secondaryStats.includes(stat) ? 35 : BASELINE[stat];
    else cap[stat] = stat === 'Vigor' ? 60 : primaryStats.includes(stat) ? SOFT_CAP[stat] : secondaryStats.includes(stat) ? 50 : BASELINE[stat];
  }
  return { ordered, cap };
}

function estimatedStats(preset) {
  const targetLevel = targetLevelFor(preset);
  const base = chooseBaseClass(preset.statRequired, preset.primaryStats, preset.secondaryStats);
  const stats = {};
  for (const stat of STATS) {
    stats[stat] = Math.max(base.stats[stat], preset.statRequired[stat] ?? 0);
  }
  let currentLevel = base.level + STATS.reduce((sum, stat) => sum + Math.max(0, stats[stat] - base.stats[stat]), 0);
  if (currentLevel >= targetLevel) return { stats, level: currentLevel };

  const { ordered, cap } = priorityForTarget(targetLevel, preset.primaryStats, preset.secondaryStats);
  while (currentLevel < targetLevel) {
    let advanced = false;
    for (const stat of ordered) {
      if (currentLevel >= targetLevel) break;
      if (stats[stat] >= 99) continue;
      if (stats[stat] >= cap[stat] && ordered.some((s) => stats[s] < cap[s] && stats[s] < 99)) continue;
      stats[stat]++;
      currentLevel++;
      advanced = true;
    }
    if (!advanced) break;
  }
  return { stats, level: targetLevel };
}

function jsonStatMap(stats) {
  const ordered = {};
  for (const stat of STATS) {
    if (Number.isFinite(stats[stat]) && stats[stat] > 0) ordered[stat] = stats[stat];
  }
  return JSON.stringify(ordered);
}

const sourceByAnchor = extractSourceStatsByAnchor();
let ts = readFileSync(tsPath, 'utf8');
const patches = [];
const stats = { source: 0, estimated: 0, sourceSections: [...sourceByAnchor.values()].flat().length };

let search = ts.indexOf('"id": "');
while (search !== -1) {
  const idEnd = ts.indexOf('"', search + 7);
  const id = ts.substring(search + 7, idEnd);
  const reqIdx = ts.indexOf('"requirements"', search);
  if (reqIdx === -1 || reqIdx - search > 6000) {
    search = ts.indexOf('"id": "', search + 10);
    continue;
  }
  const segment = ts.substring(search, reqIdx);
  if (!segment.includes('"name"') || segment.includes('"node_id"')) {
    search = ts.indexOf('"id": "', search + 10);
    continue;
  }

  const preset = {
    id,
    name: segment.match(/"name":\s*"([^"]+)"/)?.[1] ?? id,
    level: segment.match(/"level":\s*"([^"]+)"/)?.[1] ?? 'General',
    primaryStats: parseArray(segment, 'primaryStats'),
    secondaryStats: parseArray(segment, 'secondaryStats'),
    statRequired: parseObject(segment, 'statRequired'),
  };

  const source = chooseSourceCandidate(preset, sourceByAnchor);
  const chosen = source
    ? {
        stats: source.stats,
        level: source.level ?? statTotalLevel(source.stats),
        source: 'source',
        note: `Source build page: ${source.entry.title}`,
      }
    : {
        ...estimatedStats(preset),
        source: 'estimated',
        note: `Estimated to match ${targetLevelFor(preset)} from item requirements and primary/secondary stat tags.`,
      };

  const cleaned = segment
    .replace(/\s*"statRecommended":\s*\{[^}]*\},?\r?\n/g, '')
    .replace(/\s*"statSource":\s*"[^"]+",?\r?\n/g, '')
    .replace(/\s*"statSourceNote":\s*"[^"]*",?\r?\n/g, '')
    .replace(/\s*"statLevel":\s*\d+,?\r?\n/g, '');
  const cleanedSegment = cleaned.replace(/\s*$/, '\n');

  const insert =
    `${cleanedSegment}` +
    `    "statRecommended": ${jsonStatMap(chosen.stats)},\n` +
    `    "statSource": "${chosen.source}",\n` +
    `    "statSourceNote": ${JSON.stringify(chosen.note)},\n` +
    (chosen.level ? `    "statLevel": ${chosen.level},\n` : '') +
    '    ';
  patches.push({ start: search, end: reqIdx, value: insert });
  stats[chosen.source]++;

  search = ts.indexOf('"id": "', search + 10);
}

patches.sort((a, b) => b.start - a.start);
for (const patch of patches) {
  ts = ts.substring(0, patch.start) + patch.value + ts.substring(patch.end);
}

writeFileSync(tsPath, ts, 'utf8');
console.log(`Source stat sections: ${stats.sourceSections}`);
console.log(`Updated presets: source=${stats.source}, estimated=${stats.estimated}`);
console.log(`HTML source: ${htmlPath ?? 'not found'}`);
