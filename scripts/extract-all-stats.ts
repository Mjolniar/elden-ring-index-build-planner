import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const h = readFileSync(join(__dirname, '..', 'Builds _ Elden Ring Wiki.htm'), 'utf8');
const tsPath = join(__dirname, '..', 'src', 'buildPlanner.ts');

const text = h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');

// Extract unique stat blocks
const statNames = ['Vigor','Mind','Endurance','Strength','Dexterity','Intelligence','Faith','Arcane'];
const seen = new Set<string>();
const blocks: { stats: Record<string,number>; level?: number }[] = [];
const vigorRegex = /(\d+)\s+vigor/gi;
let vm: RegExpExecArray | null;

while ((vm = vigorRegex.exec(text)) !== null) {
  const chunk = text.substring(Math.max(0, vm.index - 20), Math.min(text.length, vm.index + 500));
  const stats: Record<string,number> = {};
  for (const s of statNames) {
    const m = chunk.match(new RegExp(`(\\d+)\\s+${s}\\b`, 'i'));
    if (m) stats[s] = parseInt(m[1]);
  }
  if (Object.keys(stats).length < 4) continue;
  const key = JSON.stringify(stats);
  if (seen.has(key)) continue;
  seen.add(key);
  const lm = chunk.match(/(?:at\s+)?level\s+(\d+)/i);
  blocks.push({ stats, level: lm ? parseInt(lm[1]) : undefined });
}

console.log(`${blocks.length} unique stat blocks`);

let ts = readFileSync(tsPath, 'utf8');

// Find build preset IDs (only those followed by "name" field)
const idPositions: { id: string; pos: number }[] = [];
let idIdx = ts.indexOf('"id": "');
while (idIdx !== -1) {
  const end = ts.indexOf('"', idIdx + 7);
  const id = ts.substring(idIdx + 7, end);
  const after = ts.substring(idIdx, idIdx + 120);
  if (after.includes('"name"') && !after.includes('"node_id"')) {
    idPositions.push({ id, pos: idIdx });
  }
  idIdx = ts.indexOf('"id": "', idIdx + 10);
}

console.log(`${idPositions.length} preset IDs found`);

// Phase 1: score and collect patches
interface Patch { id: string; pos: number; stats: Record<string,number> }
const patches: Patch[] = [];
const used = new Set<string>();

for (const block of blocks) {
  const blockStats = new Set(Object.keys(block.stats));
  let bestId = '', bestScore = -1;

  for (const { id, pos } of idPositions) {
    if (used.has(id)) continue;
    const reqIdx = ts.indexOf('"requirements"', pos);
    if (reqIdx === -1 || reqIdx - pos > 5000) continue;
    const mid = ts.substring(pos, reqIdx);
    if (mid.includes('"statValues"')) continue;

    const tm = mid.match(/"statTags":\s*\[([\s\S]*?)\]/);
    if (!tm) continue;
    const tags = new Set(tm[1].replace(/"/g, '').split(',').map((s: string) => s.trim()));

    let score = 0;
    const lm = mid.match(/"level":\s*"([^"]+)"/);
    if (lm && block.level) {
      const pl = parseInt(lm[1]);
      if (!isNaN(pl)) {
        const diff = Math.abs(pl - block.level);
        if (diff <= 10) score += 500; else if (diff <= 25) score += 200; else if (diff <= 50) score += 50;
      }
    }
    for (const s of blockStats) {
      if (tags.has(s)) score += 100;
    }
    if (score > bestScore) { bestScore = score; bestId = id; }
  }

  if (bestId && bestScore >= 100) {
    used.add(bestId);
    const pos = idPositions.find(p => p.id === bestId)!.pos;
    patches.push({ id: bestId, pos, stats: block.stats });
  }
}

console.log(`Matched ${patches.length} blocks`);

// Phase 2: apply in reverse order so earlier positions stay valid
patches.sort((a, b) => b.pos - a.pos);
for (const { pos, stats } of patches) {
  const reqIdx = ts.indexOf('"requirements"', pos);
  if (reqIdx === -1) continue;
  ts = ts.substring(0, reqIdx) + `"statValues": ${JSON.stringify(stats)},\n    ` + ts.substring(reqIdx);
}

writeFileSync(tsPath, ts, 'utf8');
console.log(`Patched ${patches.length} builds.`);
