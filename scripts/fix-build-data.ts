import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const filePath = join(__dirname, '..', 'src', 'buildPlanner.ts');
let content = readFileSync(filePath, 'utf8');

function correctKind(name: string, currentKind: string): string {
  const lower = name.trim().toLowerCase();
  if (!lower) return currentKind;

  // Known talismans that might match weapon patterns
  if (lower === 'assassin\'s cerulean dagger' || lower === 'assassin\'s crimson dagger' ||
      lower === 'assasin\'s cerulean dagger' || lower === 'assasin\'s crimson dagger' ||
      lower === 'primal glintstone blade') return 'talisman';

  // Keep known spells correct regardless of name
  if (lower === 'loretta\'s greatbow' || lower === 'founding rain of stars' ||
      lower === 'greatblade phalanx') return 'spell';

  // Ash of War prefix always wins
  if (lower.startsWith('ash of war:')) return 'ash';

  // Known ashes of war (might have weapon-like names)
  if (lower === 'sword dance' || lower === 'unblockable blade' ||
      lower === 'barrage' || lower === 'mighty shot' ||
      lower === 'piercing fang' || lower === 'spinning slash' ||
      lower === 'double slash' || lower === 'repeating thrust' ||
      lower === 'phantom slash' || lower === 'bloody slash' ||
      lower === 'sacred blade' || lower === 'flaming strike' ||
      lower === 'royal knight\'s resolve' || lower === 'cragblade' ||
      lower === 'car sovereignty' ||
      lower === 'black flame tornado' || lower === 'sacred order' ||
      lower === 'storm blade' || lower === 'endure' || lower === 'parry' ||
      lower === 'blood tax' || lower === 'carian retaliation' ||
      lower === 'golden land' || lower === 'corpse wax cutter' ||
      lower === 'taker\'s flames' || lower === 'taker\'s flame' ||
      lower === 'blade of death' || lower === 'rain of arrows' ||
      lower === 'impaling thrust' || lower === 'loretta\'s slash' ||
      lower === 'destined death' || lower === 'waterfowl dance' ||
      lower === 'wild strikes' || lower === 'stamp upward cut' ||
      lower === 'giant hunt' || lower === 'vow of the indomitable' ||
      lower === 'prayerful strike' || lower === 'golden slam' ||
      lower === 'lifesteal fist' || lower === 'eochaid\'s dancing blade' ||
      lower === 'flame dance' || lower === 'bloodhound\'s finesse' ||
      lower === 'dynast\'s finesse' || lower === 'freezing mist' ||
      lower === 'savage claws' || lower === 'contagious fury') return 'ash';

  // Known spears/lances that might also be spell names (Loretta's Greatbow is a spell, but handled above)
  if (lower === 'death ritual spear') return 'weapon';

  // Actual ashes: if currently tagged as ash, trust it (but fix obvious cases above)
  if (currentKind === 'spell') return 'spell';
  if (currentKind === 'ash') return 'ash';

  // Talismans: check FIRST (some contain "shield" or "dagger" in name)
  if (/\b(talisman|charm|insignia|prosthes|soreseal|scarseal|cameo|exultation|medallion)\b/i.test(lower)) return 'talisman';
  if (/\b(?:heirloom|canvas|arson)\b/i.test(lower)) return 'talisman';
  if (/\b(?:great-jar|smiting|warrior jar)\b/i.test(lower)) return 'talisman';
  // Specific talisman overrides
  if (lower === 'blade of mercy') return 'talisman';
  if (lower === 'lord of blood\'s exultation') return 'talisman';
  if (lower === 'kindred of rot\'s exultation') return 'talisman';
  if (lower === 'enraged divine beast') return 'talisman';
  if (lower === 'shattered stone talisman') return 'talisman';
  if (lower === 'crusade insignia') return 'talisman';
  if (lower === 'blessed blue dew talisman') return 'talisman';

  // Shields: actual shields (not talismans containing "shield" in name)
  if (/shield|buckler|greatshield/i.test(lower) && !/talisman|charm|insignia/i.test(lower)) return 'shield';

  // Seals (sacred seals for incantations)
  if (/\bseal\b/i.test(lower) && !/talisman|charm|insignia|greatshield/i.test(lower)) return 'seal';

  // Staves (glintstone staves)
  if (/\b(staff|scepter)\b/i.test(lower)) return 'staff';

  // Armor: helms, chest pieces, gauntlets, greaves, sets
  if (/\b(set|armor|helm|hood|mask|gauntlets|greaves|robe|trousers|blossom|dress|gown|surcoat|shirt|wrap|loincloth)\b/i.test(lower)) return 'armor';
  if (/\b(?:crown|circlet|tiara|veil|priestess heart|rock heart)\b/i.test(lower)) return 'armor';

  // Weapons
  if (/\b(sword|blade|bow|katana|spear|lance|hammer|axe|flail|claw|rapier|halberd|scythe|greatsword|twinblade|torch|mace|club|greataxe|greatsword|pickaxe|anchor|glaive|guisarme|fork|spike|wheel|finger|naginata|uchigatana|wakizashi|estoc|epee|cannon|ballista|fist|caestus|whip|crossbow|shotel)\b/i.test(lower)) return 'weapon';
  if (/\b(?:great ?katana|great ?spear|great ?hammer|great ?axe|great ?bow|great ?club|light ?bow|colossal)\b/i.test(lower)) return 'weapon';

  return currentKind;
}

let fixes = 0;
let errors = 0;

content = content.replace(/"name":\s*"([^"]+)"(\s*,\s*\n?\s*)"kind":\s*"([^"]+)"/g,
  (match, name, sep, currentKind) => {
    const fixed = correctKind(name, currentKind);
    if (fixed !== currentKind && currentKind !== fixed) {
      fixes++;
      console.log(`  ${currentKind} -> ${fixed}: ${name.substring(0, 70)}`);
      return `"name": "${name}"${sep}"kind": "${fixed}"`;
    }
    return match;
  }
);

writeFileSync(filePath, content, 'utf8');
console.log(`\nFixed ${fixes} requirement kinds`);
