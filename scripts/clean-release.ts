import { readdirSync, renameSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const releaseDir = join(__dirname, '..', 'release');
const oldDir = join(releaseDir, 'Old');

if (!existsSync(oldDir)) mkdirSync(oldDir, { recursive: true });

const files = readdirSync(releaseDir, { withFileTypes: true });
const exeFiles = files
  .filter((f) => f.isFile() && f.name.endsWith('.exe'))
  .sort((a, b) => a.name.localeCompare(b.name));

const newest = exeFiles.reduce((best, f) => {
  const time = statSync(join(releaseDir, f.name)).mtimeMs;
  return time > (best ? statSync(join(releaseDir, best.name)).mtimeMs : 0) ? f : best;
}, null as (typeof exeFiles[0]) | null);
console.log(`Keeping newest: ${newest.name}`);

for (const file of exeFiles) {
  if (file.name === newest.name) continue;
  const src = join(releaseDir, file.name);
  const dest = join(oldDir, file.name);
  renameSync(src, dest);
  console.log(`  Moved: ${file.name} -> Old/`);
}

const blockmaps = readdirSync(releaseDir)
  .filter((f) => f.endsWith('.blockmap') && !f.startsWith(newest.name.replace('.exe', '')));
for (const bm of blockmaps) {
  const src = join(releaseDir, bm);
  const dest = join(oldDir, bm);
  renameSync(src, dest);
  console.log(`  Moved: ${bm}`);
}

console.log('Clean.');
