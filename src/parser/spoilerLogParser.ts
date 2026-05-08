import type { ItemRecord, ParseResult } from '../types';
import { createDiagnostics, addUnmatched, addWarning, addSection } from './diagnostics';
import { extractArea, stripAreaSuffix, parseItemField, makeId, resetIdCounter } from './normalize';
import { inferSourceType } from './sourceType';

// -----------------------------------------------------------------------
// Section name normalisation
// -----------------------------------------------------------------------
function normSection(raw: string): string {
  return raw.replace(/^[-=*\s]+|[-=*\s]+$/g, '').toLowerCase().trim();
}

// Known section keyword patterns — must match the *whole* trimmed line (colon optional)
const SECTION_KEYWORD_RE =
  /^(?:key items?(?:\s+locations?)?(?:\s+placements?)?|all\s+item(?:s|\s+locations?|\s+placements?)?|item(?:s|\s+locations?|\s+placements?)?|enemy\s+(?:locations?|placements?)|enemies|starting\s+(?:loadouts?|equipment)?|shops?)\s*:?\s*$/i;

function isSectionHeader(line: string): string | null {
  // Decorated: "--- Key item locations ---"  or  "=== All items ==="
  const decorated = line.match(/^[-=*]{2,}\s*(.+?)\s*[-=*]{2,}$/);
  if (decorated) return normSection(decorated[1]);

  // Real randomizer logs use one-sided markers, e.g. "-- Hints for key items:"
  const oneSided = line.match(/^[-=*]{2,}\s*(.+?)\s*:?\s*$/);
  if (oneSided) return normSection(oneSided[1]);

  // Keyword-only plain header (strict whitelist to avoid false positives on title lines)
  if (SECTION_KEYWORD_RE.test(line)) return normSection(line.replace(/:?\s*$/, ''));

  return null;
}

// -----------------------------------------------------------------------
// Line parsers for individual item entries
// -----------------------------------------------------------------------

// Format A (most common): "Location text (Area): Item Name (was Original) [key]"
function tryParseLocationColon(
  line: string,
  section: string,
  diag: ReturnType<typeof createDiagnostics>
): ItemRecord | null {
  // Split on first ": " that comes after a non-trivial location part
  const colonIdx = line.indexOf(': ');
  if (colonIdx < 3) return null;

  const locationRaw = line.slice(0, colonIdx).trim();
  const itemRaw = line.slice(colonIdx + 2).trim();

  if (!itemRaw) return null;

  const { itemName, originalItem, isKeyItem } = parseItemField(itemRaw);
  const area = extractArea(locationRaw);
  const locationName = area ? stripAreaSuffix(locationRaw) : locationRaw;
  const sourceType = inferSourceType(locationRaw);

  if (!itemName) {
    addWarning(diag, `Empty item name parsed from: ${line}`);
    return null;
  }

  return {
    id: makeId(),
    itemName,
    originalItem,
    locationName,
    area,
    sourceType,
    isKeyItem,
    rawLine: line,
    section,
  };
}

// Format B (key items section): "Item Name: Location text (Area)"
function tryParseItemColon(
  line: string,
  section: string,
  _diag: ReturnType<typeof createDiagnostics>
): ItemRecord | null {
  const colonIdx = line.indexOf(': ');
  if (colonIdx < 2) return null;

  const itemRaw = line.slice(0, colonIdx).trim();
  const locationRaw = line.slice(colonIdx + 2).trim();

  if (!locationRaw || !itemRaw) return null;

  // Heuristic: in key-item sections the left side is a simple item name (no "Dropped by", etc.)
  if (/\b(dropped by|sold by|on a|chest|corpse|near)\b/i.test(itemRaw)) return null;

  const { itemName, originalItem, isKeyItem: kFlag } = parseItemField(itemRaw);
  const area = extractArea(locationRaw);
  const locationName = area ? stripAreaSuffix(locationRaw) : locationRaw;
  const sourceType = inferSourceType(locationRaw);

  return {
    id: makeId(),
    itemName,
    originalItem,
    locationName,
    area,
    sourceType,
    isKeyItem: kFlag || section.includes('key'),
    rawLine: line,
    section,
  };
}

// Real randomizer format:
// "Star Shower in Limgrave: Sold by Sellen. Replaces Glintstone Pebble."
function tryParseSpoilerPlacement(
  line: string,
  section: string,
  _diag: ReturnType<typeof createDiagnostics>
): ItemRecord | null {
  const match = line.match(/^(.+?)\s+in\s+([^:]+):\s+(.+)$/i);
  if (!match) return null;

  const itemRaw = match[1].trim();
  const area = match[2].trim();
  let locationRaw = match[3].trim();
  let originalItem: string | null = null;

  const replacesMatch = locationRaw.match(/\s+Replaces\s+(.+?)\.?\s*$/i);
  if (replacesMatch) {
    originalItem = replacesMatch[1].replace(/\.\s*$/, '').trim();
    locationRaw = locationRaw.slice(0, replacesMatch.index).trim();
  }

  locationRaw = locationRaw.replace(/\.\s*$/, '').trim();

  if (!itemRaw || !locationRaw) return null;

  return {
    id: makeId(),
    itemName: itemRaw,
    originalItem,
    locationName: locationRaw,
    area,
    sourceType: inferSourceType(locationRaw),
    isKeyItem: section.includes('key'),
    rawLine: line,
    section,
  };
}

// Format C: "Location -> Item (was Original)"  or  "Item -> Location"
function tryParseArrow(
  line: string,
  section: string,
  diag: ReturnType<typeof createDiagnostics>
): ItemRecord | null {
  const arrowIdx = line.indexOf(' -> ');
  if (arrowIdx < 0) return null;

  const left = line.slice(0, arrowIdx).trim();
  const right = line.slice(arrowIdx + 4).trim();

  if (!left || !right) return null;

  // Decide which side is the location vs item by checking for location-like keywords
  const leftIsLoc = /\b(dropped by|sold by|on a|chest|corpse|near|at |in )\b/i.test(left);

  const [locationRaw, itemRaw] = leftIsLoc ? [left, right] : [right, left];
  const { itemName, originalItem, isKeyItem } = parseItemField(itemRaw);
  const area = extractArea(locationRaw);
  const locationName = area ? stripAreaSuffix(locationRaw) : locationRaw;
  const sourceType = inferSourceType(locationRaw);

  if (!itemName) {
    addWarning(diag, `Empty item name (arrow format) from: ${line}`);
    return null;
  }

  return {
    id: makeId(),
    itemName,
    originalItem,
    locationName,
    area,
    sourceType,
    isKeyItem,
    rawLine: line,
    section,
  };
}

// -----------------------------------------------------------------------
// Main parse entry
// -----------------------------------------------------------------------

const ITEM_SECTIONS = new Set([
  'all items', 'all item locations', 'item locations', 'item placements',
  'all item placements', 'key item locations', 'key items',
  'key item placements', 'key items locations', 'items',
  'hints for key items', 'hints for bell bearings', 'hints for core mechanics',
  'hints for quest items', 'spoilers',
]);

function isItemFirstSection(section: string): boolean {
  return section.includes('key') || section.startsWith('hints for');
}

function isMetadataNoiseLine(line: string): boolean {
  return (
    /^\(\s*cost\s*:\s*[\d,]+\s*\)$/i.test(line) ||
    /^drop chance for\s+\d+\s*:\s*[\d.]+%\s*$/i.test(line) ||
    /^\([\d,]+\)\s*$/.test(line)
  );
}

export function parseSpoilerLog(text: string): ParseResult {
  resetIdCounter();
  const diag = createDiagnostics();
  const records: ItemRecord[] = [];
  const header: string[] = [];
  let seed: string | null = null;

  const lines = text.split(/\r?\n/);
  diag.totalLines = lines.length;

  // Pre-pass: find seed anywhere in the file so the title line cannot interfere
  for (const l of lines) {
    const m = l.match(/\bseed[:\s]+(\d+)/i);
    if (m) { seed = m[1]; break; }
  }

  let currentSection = '';
  let inHeaderBlock = true;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) continue;

    // Section header detection (runs in both header and body)
    const sectionName = isSectionHeader(line);
    if (sectionName) {
      inHeaderBlock = false;
      currentSection = sectionName;
      addSection(diag, sectionName);
      continue;
    }

    // Collect header metadata (title, options, etc.)
    if (inHeaderBlock) {
      header.push(line);
      continue;
    }

    // Skip sections we don't parse item records from (enemy placements, etc.)
    if (!ITEM_SECTIONS.has(currentSection)) continue;

    // Skip per-entry metadata emitted by the randomizer, not standalone item placements.
    if (isMetadataNoiseLine(line)) continue;

    // Try each format in order of specificity
    const record = isItemFirstSection(currentSection)
      ? tryParseItemColon(line, currentSection, diag) ??
        tryParseSpoilerPlacement(line, currentSection, diag) ??
        tryParseArrow(line, currentSection, diag) ??
        tryParseLocationColon(line, currentSection, diag)
      : tryParseSpoilerPlacement(line, currentSection, diag) ??
        tryParseLocationColon(line, currentSection, diag) ??
        tryParseArrow(line, currentSection, diag) ??
        tryParseItemColon(line, currentSection, diag);

    if (record) {
      records.push(record);
      diag.parsedRecords++;
    } else {
      addUnmatched(diag, raw);
    }
  }

  if (records.length === 0) {
    addWarning(diag, 'No item records were parsed. The spoiler log format may not be recognised. Check the unmatched lines for clues.');
  }

  return { records, diagnostics: diag, seed, header };
}
