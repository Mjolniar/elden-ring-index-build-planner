import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const h = readFileSync(join(__dirname, '..', 'Builds _ Elden Ring Wiki.htm'), 'utf8');
const lines = h.split('\n');
let count = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('stat allocation')) {
    console.log(`${i}: ${lines[i].substring(0, 250)}`);
    count++;
  }
  if (count >= 20) break;
}
console.log(`\nTotal lines with "stat allocation": ${count}`);
