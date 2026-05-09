import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const h = readFileSync(join(__dirname, '..', 'Builds _ Elden Ring Wiki.htm'), 'utf8');
const patterns = ['Recommended Stats', 'Stat Spread', 'Stat Priority', 'Level:', 'Vigor:', 'RL ', 'level '];
patterns.forEach((p) => {
  const c = (h.match(new RegExp(p, 'gi')) || []).length;
  console.log(`${p}: ${c}`);
});
