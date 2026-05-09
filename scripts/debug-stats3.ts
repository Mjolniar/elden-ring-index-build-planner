import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const h = readFileSync(join(__dirname, '..', 'Builds _ Elden Ring Wiki.htm'), 'utf8');

// Find every occurrence of "Vigor" preceded by a number and followed by "Mind" within 500 chars
// This catches stat blocks in any format
const statBlockRegex = /(\d+)\s+(?:<\/a>\s*)?,?\s*(?:<a[^>]*>)?Vigor(?:<\/a>)?\s*,?\s+(\d+)\s+(?:<\/a>\s*)?,?\s*(?:<a[^>]*>)?Mind(?:<\/a>)?\s*,?\s+(\d+)\s+(?:<\/a>\s*)?,?\s*(?:<a[^>]*>)?Endurance/g;

let count = 0;
let m: RegExpExecArray | null;
while ((m = statBlockRegex.exec(h)) !== null) {
  count++;
  // Find the context around this match
  const start = Math.max(0, m.index - 100);
  const end = Math.min(h.length, m.index + 500);
  const context = h.substring(start, end).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`#${count}: VIG${m[1]} MND${m[2]} END${m[3]} ... "${context.substring(0, 150)}"`);
  if (count >= 10) break;
}
console.log(`\nTotal: ${count}`);
