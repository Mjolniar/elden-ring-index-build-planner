import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const filePath = join(__dirname, '..', 'src', 'buildPlanner.ts');
let content = readFileSync(filePath, 'utf8');

// Match each build preset and process its requirements array
const buildRegex = /(  \{\s*\n\s*"id":\s*"([^"]+)"[\s\S]*?"requirements":\s*\[)([\s\S]*?)(\n\s*\][\s\S]*?\n  \})/g;

let dedupCount = 0;

content = content.replace(buildRegex, (match, prefix, buildId, reqsBlock, suffix) => {
  // Parse each requirement object
  const reqPattern = /(\{\s*\n\s*"name":\s*"([^"]+)"\s*,\s*\n\s*"kind":\s*"([^"]+)"\s*(?:,\s*\n\s*"(?:aliases|optional)"[^}]*\s*)?\s*\},?\s*\n?)/g;
  const reqs = [...reqsBlock.matchAll(reqPattern)];

  if (reqs.length <= 1) return match;

  // Find duplicates by name (case-insensitive) within same kind
  const seen = new Map<string, string>();
  const unique: string[] = [];

  for (const r of reqs) {
    const fullMatch = r[1];
    const name = r[2].toLowerCase().trim();
    const kind = r[3].toLowerCase().trim();
    const key = `${name}::${kind}`;

    if (seen.has(key)) {
      dedupCount++;
      // Remove the trailing comma if present
      const cleanMatch = fullMatch.replace(/,\s*$/, '').replace(/\n$/, '');
      // Find and remove it from the reqsBlock
      reqsBlock = reqsBlock.replace(cleanMatch, '');
      console.log(`  Dedup in ${buildId}: "${r[2]}" (${kind})`);
    } else {
      seen.set(key, fullMatch);
    }
  }

  // Clean up any resulting double commas
  reqsBlock = reqsBlock.replace(/,\s*\n\s*,\s*\n/g, ',\n');
  reqsBlock = reqsBlock.replace(/\n\s*\n\s*\n/g, '\n\n');
  // Remove trailing comma before ]
  reqsBlock = reqsBlock.replace(/,\s*(\n\s*\])/g, '$1');

  return prefix + reqsBlock + suffix;
});

writeFileSync(filePath, content, 'utf8');
console.log(`\nDeduplicated ${dedupCount} entries.`);
