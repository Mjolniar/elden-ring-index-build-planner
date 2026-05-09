import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Weapon-unique skills that are NOT standalone Ash of War items.
// These are always attached to their weapon and won't appear separately in spoiler logs.
// Map: skill name -> { weapon name, aliases }
const WEAPON_SKILL_MAP: Record<string, { weapon: string; aliases?: string[] }> = {
  'ancient lightning spear': { weapon: 'Bolt of Gransax' },
  'blade of death': { weapon: 'Black Knife' },
  'blind spot': { weapon: 'Backhand Blade' },
  'blinkbolt: twinaxe': { weapon: 'Death Knight\'s Twin Axes', aliases: ['Death Knight Twin Axes'] },
  'bloodblade dance': { weapon: 'Eleonora\'s Poleblade' },
  'bloodhound\'s finesse': { weapon: 'Bloodhound\'s Fang' },
  'braggart\'s roar': { weapon: 'Battle Axe' },
  'contagious fury': { weapon: 'Jellyfish Shield' },
  'corpse piler': { weapon: 'Rivers of Blood' },
  'corpse wax cutter': { weapon: 'Gargoyle\'s Blackblade', aliases: ['Gargoyles Blackblade'] },
  'cursed-blood slice': { weapon: 'Morgott\'s Cursed Sword' },
  'destined death': { weapon: 'Maliketh\'s Black Blade' },
  'devonia\'s vortex': { weapon: 'Devonia\'s Hammer' },
  'dragonwound slash': { weapon: 'Dragon Greatclaw' },
  'dynast\'s finesse': { weapon: 'Bloody Helice' },
  'eochaid\'s dancing blade': { weapon: 'Marais Executioner\'s Sword' },
  'euporia vortex': { weapon: 'Euporia' },
  'fan shot': { weapon: 'Smithscript Shield' },
  'flame dance': { weapon: 'Obsidian Lamina' },
  'flame spit': { weapon: 'Drake Knight weapons', aliases: [] },
  'freezing mist': { weapon: 'Icerind Hatchet' },
  'ghostflame ignition': { weapon: 'Death\'s Poker' },
  'glintblade phalanx': { weapon: 'Carian Knight\'s Sword' },
  'glintstone dart': { weapon: 'Glintstone Kris' },
  'gold breaker': { weapon: 'Rellana\'s Twinblade', aliases: ['Rellana Twinblade'] },
  'golden tempering': { weapon: 'Sword of Light' },
  'gravity bolt': { weapon: 'Meteoric Ore Blade' },
  'horn calling': { weapon: 'Horned Warrior weapons' },
  'ice lightning sword': { weapon: 'Dragonscale Blade' },
  'magma guillotine': { weapon: 'Magma Wyrm\'s Scalesword' },
  'magma shower': { weapon: 'Magma Blade' },
  'messmer\'s assault': { weapon: 'Spear of the Impaler' },
  'mists of eternal sleep': { weapon: 'Velvet Sword of St. Trina' },
  'mists of slumber': { weapon: 'Sword of St. Trina' },
  'moon-and-fire stance': { weapon: 'Rellana\'s Twin Blades' },
  'moonlight greatsword': { weapon: 'Dark Moon Greatsword' },
  'nebula': { weapon: 'Bastard\'s Stars' },
  'needle piercer': { weapon: 'Swift Spear' },
  'night-and-flame stance': { weapon: 'Sword of Night and Flame' },
  'night-and-flame-stance': { weapon: 'Sword of Night and Flame' },
  'onze\'s line of stars': { weapon: 'Star-Lined Sword' },
  'ordovis\' vortex': { weapon: 'Ordovis\'s Greatsword' },
  'overhead stance': { weapon: 'Dual wielded axes' },
  'reduvia blood blade': { weapon: 'Reduvia' },
  'regal roar': { weapon: 'Axe of Godfrey' },
  'revenge of the night': { weapon: 'Sword of Night' },
  'ruinous ghostflame': { weapon: 'Helphen\'s Steeple' },
  'sacred phalanx': { weapon: 'Golden Order Greatsword' },
  'scarlet rot': { weapon: 'Rotten weapons' },
  'seppuku and carian retaliation': { weapon: 'Misericorde', aliases: ['Misericorde'] },
  'shadow sunflower headbutt': { weapon: 'Shadow Sunflower Blossom' },
  'sorcery of the crozier': { weapon: 'Staff of the Great Beyond' },
  'spearcall ritual': { weapon: 'Death Ritual Spear' },
  'starcaller cry': { weapon: 'Starscourge Greatsword' },
  'taker\'s flame': { weapon: 'Blasphemous Blade' },
  'taker\'s flames': { weapon: 'Blasphemous Blade' },
  'the queen\'s black flame': { weapon: 'Godslayer\'s Greatsword' },
  'transient moonlight': { weapon: 'Moonveil' },
  'unblockable blade': { weapon: 'Coded Sword' },
  'viper bite': { weapon: 'Venomous Fang' },
  'waterfowl dance': { weapon: 'Hand of Malenia' },
  'wave of destruction': { weapon: 'Devastation' },
  'wave of gold': { weapon: 'Sacred Relic Sword' },
  'white light charge': { weapon: 'Euporia' },
  'witching hour slash': { weapon: 'Sword of Night' },
  'wolf\'s assault': { weapon: 'Royal Greatsword' },
  'zamor ice storm': { weapon: 'Zamor Curved Sword' },
};

const filePath = join(__dirname, '..', 'src', 'buildPlanner.ts');
let content = readFileSync(filePath, 'utf8');

let replacedCount = 0;

for (const [skillName, mapping] of Object.entries(WEAPON_SKILL_MAP)) {
  // Match the requirement with this name and kind=ash
  const searchNames = [skillName, ...(mapping.aliases ?? [])];
  for (const name of searchNames) {
    const pattern = new RegExp(
      `"name":\\s*"${escapeRegex(name)}"\\s*,\\s*\\n\\s*"kind":\\s*"ash"`,
      'gi'
    );
    const replacement = `"name": "${mapping.weapon}",\n        "kind": "weapon"`;
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      replacedCount++;
      console.log(`  ash -> weapon: "${name}" -> "${mapping.weapon}"`);
    }
  }
}

writeFileSync(filePath, content, 'utf8');
console.log(`\nMapped ${replacedCount} weapon-unique skills to their actual weapons.`);

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
