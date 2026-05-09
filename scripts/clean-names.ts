import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const filePath = join(__dirname, '..', 'src', 'buildPlanner.ts');
let content = readFileSync(filePath, 'utf8');

// 1. Fix "and " prefixed actual item names (remove the prefix)
const andToFix: [string, string][] = [
  ['and Sword of Night and Flame', 'Sword of Night and Flame'],
  ['and Flame, Grant Me Strength', 'Flame, Grant Me Strength'],
  ['and Rotten Winged Sword Insignia', 'Rotten Winged Sword Insignia'],
  ['and Godfrey Icon', 'Godfrey Icon'],
  ['and Green Turtle Talisman', 'Green Turtle Talisman'],
  ['and Golden Order Seal', 'Golden Order Seal'],
  ['and Dragoncrest Greatshield Talisman', 'Dragoncrest Greatshield Talisman'],
  ['and Terra Magica', 'Terra Magica'],
  ['and Dragon Communion Seal', 'Dragon Communion Seal'],
  ['and Green Turtle Talisman', 'Green Turtle Talisman'],
  ['and Sacred Seal', 'Sacred Seal'],
  ['and Blessing\'s Boon', 'Blessing\'s Boon'],
];

for (const [oldName, newName] of andToFix) {
  content = content.replace(`"name": "${oldName}"`, `"name": "${newName}"`);
  console.log(`  Fixed: "${oldName}" -> "${newName}"`);
}

// 2. Fix specific edge cases
const fixes: [string, string, string][] = [
  // Fix kind back to armor for the freeform armor description
  [
    '"name": "armor that adds up to 51 Poise the Bull-Goat\'s Talisman equipped",\n        "kind": "talisman"',
    '"name": "armor that adds up to 51 Poise the Bull-Goat\'s Talisman equipped",\n        "kind": "armor"'
  ],
  // Fix typo and kind for Shadown Sunflower Blossom
  [
    '"name": "Shadown Sunflower Blossom",\n        "kind": "armor"',
    '"name": "Shadow Sunflower Blossom",\n        "kind": "weapon"'
  ],
  // Fix build summary typo
  [
    'using Shadown Sunflower Blossom',
    'using Shadow Sunflower Blossom'
  ],
  // Fix build name typo
  [
    '"name": "Shadown Sunflower Blossom"',
    '"name": "Shadow Sunflower Blossom"'
  ],
  // Clean up freeform armor notes: remove "and " prefix from freeform ones
  [
    '"name": "and armor as long as you can med roll"',
    '"name": "Armor as long as you can med roll"'
  ],
  [
    '"name": "and other Armor you want"',
    '"name": "Armor you want"'
  ],
  [
    '"name": "and armor that allows you to med roll"',
    '"name": "Armor that allows you to med roll"'
  ],
  [
    '"name": "and heavy armor good Poise"',
    '"name": "Armor with high poise"'
  ],
  [
    '"name": "and that still allows you to medium roll"',
    '"name": "Armor that still allows medium roll"'
  ],
  [
    '"name": "and more suggested talismans in the video"',
    '"name": "Flexible talisman slot"'
  ],
  [
    '"name": "and Armor high Poise."',
    '"name": "Armor with high poise"'
  ],
  [
    '"name": "and Armor that allows you to medium roll"',
    '"name": "Armor that allows medium roll"'
  ],
  [
    '"name": "and other Armor that gives you lots of Poise"',
    '"name": "Armor with high poise"'
  ],
  [
    '"name": "and armor that allows you to med roll"',
    '"name": "Armor that allows med roll"'
  ],
  // Fix "but " prefixed freeform items
  [
    '"name": "but you can use you like"',
    '"name": "Ash of War of your choice"'
  ],
  [
    '"name": "but get pieces that increase Intelligence when possible"',
    '"name": "Armor pieces that increase Intelligence"'
  ],
  // Fix "and Sacred Seal" - this one should stay as seal
  [
    '"name": "and Sacred Seal"',
    '"name": "Sacred Seal"'
  ],
];

for (const [oldStr, newStr] of fixes) {
  if (content.includes(oldStr)) {
    content = content.replace(oldStr, newStr);
    console.log(`  Fixed data: ${oldStr.substring(0, 70)}...`);
  }
}

writeFileSync(filePath, content, 'utf8');
console.log('\nCleanup complete.');
