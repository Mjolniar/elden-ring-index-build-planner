import { readdirSync, renameSync, mkdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const releaseDir = join(__dirname, '..', 'release');
const oldDir = join(releaseDir, 'Old');

if (!existsSync(oldDir)) mkdirSync(oldDir, { recursive: true });

const files = readdirSync(releaseDir, { withFileTypes: true });
const exeFiles = files
  .filter((f) => f.isFile() && f.name.endsWith('.exe'))
  .sort((a, b) => a.name.localeCompare(b.name));

if (exeFiles.length <= 1) {
  console.log('Only one exe in release, nothing to move.');
  process.exit(0);
}

const newest = exeFiles[exeFiles.length - 1];
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
