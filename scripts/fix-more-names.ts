import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const f = join(__dirname, '..', 'src', 'buildPlanner.ts');
let c = readFileSync(f, 'utf8');

// Generic/family name fixes (singularize so includes matching works)
const renames: [string, string][] = [
  ['"Scorpion Charms"', '"Scorpion Charm"'],
  ['"Curved Swords"', '"Curved Sword"'],
  ['"Melee Weapon"', '"Any melee weapon"'],
  ['"Chain Gloves"', '"Chain Gauntlets"'],
  ['"Chain Greaves"', '"Chain Leggings"'],
  ['"Blighted Exultation"', '"Lord of Blood\'s Exultation"'], // possible data error
  // Fix combined talisman entries - use the primary one
  ['"Bull-Goat\'s Talisman and Shard of Alexander"', '"Bull-Goat\'s Talisman"'],
  ['"Claw Talisman and Dragoncrest Greatshield Talisman"', '"Claw Talisman"'],
  ['"Flock\'s Canvas Talisman and Dragoncrest Greatshield Talisman"', '"Flock\'s Canvas Talisman"'],
  ['"Green Turtle Talisman and Viridian Amber Medallion +2"', '"Green Turtle Talisman"'],
  ['"Lord of Blood\'s Exultation and Shard of Alexander"', '"Lord of Blood\'s Exultation"'],
  ['"Lord of Blood\'s Exultation and Spear Talisman ( Dagger Talisman )"', '"Lord of Blood\'s Exultation"'],
  ['"Millicent\'s Prosthesis and Winged Sword Insignia"', '"Millicent\'s Prosthesis"'],
  // Fix parenthetical alternatives - use the primary item
  ['"Rotten Winged Sword Insignia ( Winged Sword Insignia )"', '"Rotten Winged Sword Insignia"'],
  ['"Shard of Alexander ( Ritual Sword Talisman )"', '"Shard of Alexander"'],
  ['"Spear Talisman ( Lord of Blood\'s Exultation )"', '"Spear Talisman"'],
  ['"Magic Scorpion Charm ( Ritual Sword Talisman )"', '"Magic Scorpion Charm"'],
  ['"Uchigatana ( Wakizashi )"', '"Uchigatana"'],
  // Spell combos
  ['"Carian Greatsword and Glintstone Pebble"', '"Carian Greatsword"'],
  ['"Glintstone Pebble and Carian Greatsword"', '"Carian Greatsword"'],
  ['"Glintstone Pebble and Carian Slicer"', '"Carian Slicer"'],
  ['"Catch Flame and Bloodflame Blade"', '"Bloodflame Blade"'],
  ['"Catch Flame and Dragonfire"', '"Dragonfire"'],
  ['"Zamor Ice Storm and Freezing Mist"', '"Zamor Ice Storm"'],
  ['"Blessing of the Erdtree and Flame, Grant Me Strength"', '"Blessing of the Erdtree"'],
  ['"Blessing\'s Boon and Flame, Grant Me Strength"', '"Blessing\'s Boon"'],
  ['"Poison Mist and Swarm of Flies"', '"Poison Mist"'],
  ['"Flame, Grant Me Strength and/ Golden Vow"', '"Flame, Grant Me Strength"'],
  ['"Explosive Ghostflame . Terra Magica"', '"Explosive Ghostflame"'],
  ['"Litany of Proper Death ."', '"Litany of Proper Death"'],
  // Mis-entries  
  ['"more suggested talismans in the video."', '"Flexible talisman slot"'],
  ['"other Buffs you like"', '"Flexible buff spell"'],
  ['"other Incantations you want."', '"Flexible incantation"'],
  ['"Gold Breaker"', '"Golden Order Greatsword"'], // weapon skill -> weapon
  // Specific item fixes
  ['"Haligtree Knight Set and Greathelm"', '"Haligtree Knight Armor"'],
  ['"Raptor\'s Black Feathers and other Armor that allows medium rolling"', '"Raptor\'s Black Feathers"'],
  ['"Silver Tear Mask and Armor"', '"Silver Tear Mask"'],
  ['"White Mask and and the heaviest Armor that still allows you to medium roll"', '"White Mask"'],
  ['"White Mask and light armor for Light Equip Load setup."', '"White Mask"'],
  ['"Haima Glintstone Crown and other gloves and legs that allow you to med roll"', '"Haima Glintstone Crown"'],
  ['"Alberich\'s Set (for extra Thorn Sorcery damage)"', '"Alberich\'s Robe"'],
  ['"Black Knife Set (so your footsteps are muffled)"', '"Black Knife Armor"'],
  ['"Uses Lamenter\'s Mask"', '"Lamenter\'s Mask"'],
  ['"Uses Priestess Heart"', '"Priestess Heart"'],
  ['"Uses Rock Heart"', '"Rock Heart"'],
];

for (const [old, neu] of renames) {
  if (c.includes(old)) {
    c = c.split(old).join(neu);
    console.log(`  Fixed: ${old.substring(0, 70)} -> ${neu}`);
  }
}

writeFileSync(f, c, 'utf8');
console.log('\nDone.');
