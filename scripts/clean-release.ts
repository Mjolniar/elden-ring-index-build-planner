import { readdirSync, renameSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const releaseDir = join(__dirname, '..', 'release');
const oldDir = join(releaseDir, 'Old');

if (!existsSync(oldDir)) mkdirSync(oldDir, { recursive: true });

const files = readdirSync(releaseDir, { withFileTypes: true });
const releaseArtifacts = files
  .filter((f) => f.isFile() && (f.name.endsWith('.exe') || f.name.endsWith('.zip')))
  .sort((a, b) => a.name.localeCompare(b.name));

function productPrefix(name: string): string {
  const prefix = name.replace(/\s+\d+\.\d+\.\d+(?:-[^\s]+)?(?:\s+(?:Portable|Setup))?\.(?:exe|zip).*$/, '');
  if (prefix === 'Elden Ring Randomizer Index and Build Planner') {
    return 'Elden Ring Randomizer Index';
  }
  return prefix;
}

function artifactKind(name: string): 'installer' | 'portable' {
  return name.endsWith('.zip') || name.includes(' Portable.') ? 'portable' : 'installer';
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

const groups = new Map<string, typeof releaseArtifacts>();
for (const file of releaseArtifacts) {
  const key = `${productPrefix(file.name)}::${artifactKind(file.name)}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key)!.push(file);
}

const newestByGroup = new Map<string, (typeof releaseArtifacts)[number]>();
for (const [key, group] of groups) {
  const newest = group.reduce((best, f) => {
    const time = statSync(join(releaseDir, f.name)).mtimeMs;
    return time > (best ? statSync(join(releaseDir, best.name)).mtimeMs : 0) ? f : best;
  }, null as (typeof group[0]) | null);
  if (!newest) continue;
  newestByGroup.set(key, newest);
}

for (const [key, group] of groups) {
  const newest = newestByGroup.get(key);
  if (!newest) continue;
  const [prefix, kind] = key.split('::');
  console.log(`Keeping newest ${prefix} ${kind}: ${newest.name}`);

  for (const file of group) {
    if (file.name === newest.name) continue;
    moveToOld(file.name);
  }
}

const keptBlockmapStems = new Set(
  [...newestByGroup.values()]
    .filter((file) => file.name.endsWith('.exe'))
    .map((file) => file.name.replace(/\.exe$/, '')),
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
