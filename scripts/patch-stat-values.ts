import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const htmlPath = join(__dirname, '..', 'Builds _ Elden Ring Wiki.htm');
const tsPath = join(__dirname, '..', 'src', 'buildPlanner.ts');

const html = readFileSync(htmlPath, 'utf8');
let ts = readFileSync(tsPath, 'utf8');

// Extract all stat allocation blocks with their preceding headings
const statRe = /<p>(?:The build's )?stat allocation at level (\d+)[^<]*focuses on ([\s\S]*?)<\/p>/gi;

interface StatBlock {
  level: number;
  stats: Record<string, number>;
  heading: string;
}

const blocks: StatBlock[] = [];
let sm: RegExpExecArray | null;

while ((sm = statRe.exec(html)) !== null) {
  const level = parseInt(sm[1]);
  const rawText = sm[2].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

  // Parse "55 Vigor, 27 Mind, 40 Endurance..."
  const stats: Record<string, number> = {};
  const pairs = rawText.match(/(\d+)\s+(\w+)/g);
  if (pairs) {
    for (const p of pairs) {
      const m = p.match(/(\d+)\s+(\w+)/);
      if (!m) continue;
      const val = parseInt(m[1]);
      const stat = m[2];
      if (['Vigor','Mind','Endurance','Strength','Dexterity','Intelligence','Faith','Arcane'].includes(stat)) {
        stats[stat] = val;
      }
    }
  }
  if (Object.keys(stats).length < 3) continue;

  // Find nearest preceding h3/h4 heading (build section name)
  const before = html.substring(Math.max(0, sm.index - 3000), sm.index);
  const headingMatch = before.match(/<h[34][^>]*>(.*?)<\/h[34]>/);
  let heading = headingMatch ? headingMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim() : '';

  blocks.push({ level, stats, heading });
}

console.log(`Found ${blocks.length} stat allocation blocks`);

// Deduplicate by stats + level (some pages may have duplicates)
const unique = new Map<string, StatBlock>();
for (const b of blocks) {
  const key = `${b.level}:${JSON.stringify(b.stats)}`;
  if (!unique.has(key)) unique.set(key, b);
}
console.log(`Unique: ${unique.size}`);

// Match to build presets
let patched = 0;

for (const block of unique.values()) {
  const presetRegex = /"id":\s*"([^"]+)"[\s\S]{0,500}?"name":\s*"([^"]*?)",[\s\S]{0,500}?"statTags":\s*\[(.*?)\][\s\S]{0,3000}?"requirements":\s*\[/g;
  let pm: RegExpExecArray | null;

  let best: { id: string; name: string; score: number } | null = null;

  while ((pm = presetRegex.exec(ts)) !== null) {
    const presetId = pm[1];
    const presetName = pm[2];
    const tagsStr = pm[3].replace(/"/g, '');
    if (!tagsStr) continue;
    const tags = tagsStr.split(',').map((s: string) => s.trim());

    // Skip if already has statValues
    const start = pm.index;
    const end = pm.index + pm[0].length;
    if (ts.substring(start, end).includes('"statValues"')) continue;

    // Heading match (bonus score)
    let score = 0;
    if (block.heading && presetName) {
      const h = block.heading.toLowerCase().replace(/[^a-z0-9]/g, '');
      const p = presetName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (h === p) score += 5000;
      else if (h.includes(p) || p.includes(h)) score += 2000;
    }

    // Level bonus
    const levelStr = ts.substring(start, end).match(/"level":\s*"([^"]+)"/);
    if (levelStr) {
      const presetLevel = levelStr[1];
      if (presetLevel.startsWith('Level')) {
        const pl = parseInt(presetLevel);
        if (!isNaN(pl) && Math.abs(pl - block.level) <= 25) score += 100;
      }
    }

    // Stat tag overlap
    const blockStats = new Set(Object.keys(block.stats));
    for (const t of tags) {
      if (blockStats.has(t)) score += 50;
    }

    if (!best || score > best.score) {
      best = { id: presetId, name: presetName, score };
    }
  }

  if (best && best.score >= 100) {
    const idx = ts.indexOf(`"requirements":`, ts.indexOf(`"id": "${best.id}"`));
    if (idx === -1) continue;

    const statsJson = JSON.stringify(block.stats);
    ts = ts.substring(0, idx) + `"statValues": ${statsJson},\n    ` + ts.substring(idx);
    patched++;
    console.log(`  ${best.name} (L${block.level}): ${JSON.stringify(block.stats)}`);
  }
}

writeFileSync(tsPath, ts, 'utf8');
console.log(`\nPatched ${patched} builds.`);
