import { readFileSync } from 'node:fs';
import { parseSpoilerLog } from '../src/parser';

const file = process.argv[2];

if (!file) {
  console.error('Usage: vite-node scripts/inspect-spoiler-log.ts <spoiler-log-path>');
  process.exit(1);
}

const result = parseSpoilerLog(readFileSync(file, 'utf8'));

console.log(JSON.stringify({
  file,
  seed: result.seed,
  records: result.records.length,
  sections: result.diagnostics.sections,
  unmatched: result.diagnostics.unmatchedLines.length,
  warnings: result.diagnostics.warnings,
  sample: result.records.slice(0, 5),
}, null, 2));
