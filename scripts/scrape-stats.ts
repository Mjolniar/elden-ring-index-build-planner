import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TS_PATH = join(__dirname, '..', 'src', 'buildPlanner.ts');

async function main() {
  let ts = readFileSync(TS_PATH, 'utf8');

  // Get all build names and IDs
  const presetRegex = /"id":\s*"([^"]+)"[\s\S]{0,300}?"name":\s*"([^"]+)"[\s\S]{0,2000}?"requirements":\s*\[/g;
  const presets: { id: string; name: string; idx: number }[] = [];
  let pm: RegExpExecArray | null;
  while ((pm = presetRegex.exec(ts)) !== null) {
    if (ts.substring(pm.index, pm.index + 2000).includes('"statValues"')) continue;
    presets.push({ id: pm[1], name: pm[2], idx: pm.index });
  }

  console.log(`${presets.length} presets need stat values`);

  const browser = await chromium.launch({ headless: true });
  let patched = 0;

  for (const preset of presets) {
    if (patched >= 100) break; // limit for now

    // Build URL from name
    const encodedName = preset.name.replace(/ /g, '+').replace(/'/g, '%27');
    const url = `https://eldenring.wiki.fextralife.com/${encodedName}`;

    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1000);

      const text = await page.evaluate(() => document.body.innerText);
      await page.close();

      const statMatch = text.match(/stat allocation at level (\d+)\s*(?:focuses|prioritizes)\s+on\s+([^.]*\.)/i);
      if (!statMatch) continue;

      const level = parseInt(statMatch[1]);
      const raw = statMatch[2];

      const statNames = ['Vigor','Mind','Endurance','Strength','Dexterity','Intelligence','Faith','Arcane'];
      const stats: Record<string, string> = {};
      for (const s of statNames) {
        const m = raw.match(new RegExp(`(\\d+)\\s+${s}`, 'i'));
        if (m) stats[s] = m[1];
      }
      if (Object.keys(stats).length < 3) continue;

      const reqIdx = ts.indexOf('"requirements":', preset.idx);
      if (reqIdx === -1 || reqIdx > preset.idx + 5000) continue;

      const statsJson = JSON.stringify(stats);
      ts = ts.substring(0, reqIdx) + `"statValues": ${statsJson},\n    ` + ts.substring(reqIdx);
      patched++;
      console.log(`  ${preset.name} (L${level}): ${JSON.stringify(stats)}`);
    } catch {
      // Page not found or timeout, skip
    }
  }

  writeFileSync(TS_PATH, ts, 'utf8');
  console.log(`\nPatched ${patched} builds.`);
  await browser.close();
}

main().catch(console.error);
