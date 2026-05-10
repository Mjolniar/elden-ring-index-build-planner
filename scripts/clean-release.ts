import { readdirSync, renameSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const releaseDir = join(__dirname, '..', 'release');
const oldDir = join(releaseDir, 'Old');

if (!existsSync(oldDir)) mkdirSync(oldDir, { recursive: true });

const files = readdirSync(releaseDir, { withFileTypes: true });
const exeFiles = files
  .filter((f) => f.isFile() && f.name.endsWith('.exe'))
  .sort((a, b) => a.name.localeCompare(b.name));

function productPrefix(name: string): string {
  const prefix = name.replace(/\s+\d+\.\d+\.\d+.*$/, '');
  if (prefix === 'Elden Ring Randomizer Index and Build Planner') {
    return 'Elden Ring Randomizer Index';
  }
  return prefix;
}

function moveToOld(srcName: string, logSuffix = '-> Old/'): boolean {
  const src = join(releaseDir, srcName);
  const dest = join(oldDir, srcName);
  try {
    renameSync(src, dest);
    console.log(`  Moved: ${srcName} ${logSuffix}`);
    return true;
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
    if (code === 'EBUSY' || code === 'EPERM') {
      console.warn(`  Skipped locked artifact: ${srcName}`);
      return false;
    }
    throw error;
  }
}

const groups = new Map<string, typeof exeFiles>();
for (const file of exeFiles) {
  const prefix = productPrefix(file.name);
  if (!groups.has(prefix)) groups.set(prefix, []);
  groups.get(prefix)!.push(file);
}

const newestByPrefix = new Map<string, (typeof exeFiles)[number]>();
for (const [prefix, group] of groups) {
  const newest = group.reduce((best, f) => {
    const time = statSync(join(releaseDir, f.name)).mtimeMs;
    return time > (best ? statSync(join(releaseDir, best.name)).mtimeMs : 0) ? f : best;
  }, null as (typeof group[0]) | null);
  if (!newest) continue;
  newestByPrefix.set(prefix, newest);
}

for (const [prefix, group] of groups) {
  const newest = newestByPrefix.get(prefix);
  if (!newest) continue;
  console.log(`Keeping newest ${prefix}: ${newest.name}`);

  for (const file of group) {
    if (file.name === newest.name) continue;
    moveToOld(file.name);
  }
}

const keptBlockmapStems = new Set(
  [...newestByPrefix.values()].map((file) => file.name.replace(/\.exe$/, '')),
);

const blockmaps = readdirSync(releaseDir)
  .filter((f) => f.endsWith('.blockmap'));
for (const bm of blockmaps) {
  const matchesKeptInstaller = [...keptBlockmapStems].some((stem) => bm.startsWith(stem));
  if (!matchesKeptInstaller) {
    moveToOld(bm, '');
  }
}

console.log('Clean.');
