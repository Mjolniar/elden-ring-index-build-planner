// Extracts parenthesized area from a location string like "Limgrave (Stormveil Castle)"
// Also handles "Location Name in m10_00_00_00 (Area)" patterns from debug text.
export function extractArea(locationText: string): string | null {
  const match = locationText.match(/\(([^)]+)\)\s*$/);
  return match ? match[1].trim() : null;
}

// Strips trailing parenthesized qualifier to get a clean location name.
export function stripAreaSuffix(locationText: string): string {
  return locationText.replace(/\s*\([^)]+\)\s*$/, '').trim();
}

// Extracts item name and optional "was X" original from strings like:
//   "Bloodhound's Fang (was Torch)"
//   "Rold Medallion [key]"
//   "Ancient Dragon Smithing Stone"
export function parseItemField(raw: string): { itemName: string; originalItem: string | null; isKeyItem: boolean } {
  let working = raw.trim();
  let isKeyItem = false;

  // Strip [key] or (key) annotations
  if (/\[key\]/i.test(working)) {
    isKeyItem = true;
    working = working.replace(/\s*\[key\]/gi, '').trim();
  }
  if (/\(key\)/i.test(working)) {
    isKeyItem = true;
    working = working.replace(/\s*\(key\)/gi, '').trim();
  }

  // Extract "(was X)" or "(replaced X)" original
  const wasMatch = working.match(/\s*\(\s*(?:was|replaced?)\s+(.+?)\s*\)\s*$/i);
  let originalItem: string | null = null;
  if (wasMatch) {
    originalItem = wasMatch[1].trim();
    working = working.slice(0, wasMatch.index).trim();
  }

  return { itemName: working, originalItem, isKeyItem };
}

let _counter = 0;
export function makeId(): string {
  return `rec-${++_counter}`;
}

export function resetIdCounter(): void {
  _counter = 0;
}
