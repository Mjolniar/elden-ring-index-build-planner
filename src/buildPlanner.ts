import type { ItemRecord } from './types';

export type BuildStat = 'Vigor' | 'Mind' | 'Endurance' | 'Strength' | 'Dexterity' | 'Intelligence' | 'Faith' | 'Arcane';
export type BuildItemKind = 'weapon' | 'shield' | 'seal' | 'staff' | 'armor' | 'talisman' | 'spell' | 'ash' | 'optional';

export interface BuildRequirement {
  name: string;
  kind: BuildItemKind;
  aliases?: string[];
  optional?: boolean;
}

export interface BuildPreset {
  id: string;
  name: string;
  level: string;
  primaryStats: BuildStat[];
  secondaryStats: BuildStat[];
  statTags: BuildStat[];
  statRequired?: Partial<Record<BuildStat, number>>;
  statRecommended?: Partial<Record<BuildStat, number>>;
  statSource?: 'scraped' | 'calculated';
  startingClass?: string;
  summary: string;
  sourceUrl: string;
  requirements: BuildRequirement[];
}

export interface StartingClass {
  name: string;
  level: number;
  stats: Record<BuildStat, number>;
}

export const STARTING_CLASSES: StartingClass[] = [
  { name: 'Vagabond', level: 9, stats: { Vigor: 15, Mind: 10, Endurance: 11, Strength: 14, Dexterity: 13, Intelligence: 9, Faith: 9, Arcane: 7 } },
  { name: 'Warrior', level: 8, stats: { Vigor: 11, Mind: 12, Endurance: 11, Strength: 10, Dexterity: 16, Intelligence: 10, Faith: 8, Arcane: 9 } },
  { name: 'Hero', level: 7, stats: { Vigor: 14, Mind: 9, Endurance: 12, Strength: 16, Dexterity: 9, Intelligence: 7, Faith: 8, Arcane: 11 } },
  { name: 'Bandit', level: 5, stats: { Vigor: 10, Mind: 11, Endurance: 10, Strength: 9, Dexterity: 13, Intelligence: 9, Faith: 8, Arcane: 14 } },
  { name: 'Astrologer', level: 6, stats: { Vigor: 9, Mind: 15, Endurance: 9, Strength: 8, Dexterity: 12, Intelligence: 16, Faith: 7, Arcane: 9 } },
  { name: 'Prophet', level: 7, stats: { Vigor: 10, Mind: 14, Endurance: 8, Strength: 11, Dexterity: 10, Intelligence: 7, Faith: 16, Arcane: 10 } },
  { name: 'Samurai', level: 9, stats: { Vigor: 12, Mind: 11, Endurance: 13, Strength: 12, Dexterity: 15, Intelligence: 9, Faith: 8, Arcane: 8 } },
  { name: 'Prisoner', level: 9, stats: { Vigor: 11, Mind: 12, Endurance: 11, Strength: 11, Dexterity: 14, Intelligence: 14, Faith: 6, Arcane: 9 } },
  { name: 'Confessor', level: 10, stats: { Vigor: 10, Mind: 13, Endurance: 10, Strength: 12, Dexterity: 12, Intelligence: 9, Faith: 14, Arcane: 9 } },
  { name: 'Wretch', level: 1, stats: { Vigor: 10, Mind: 10, Endurance: 10, Strength: 10, Dexterity: 10, Intelligence: 10, Faith: 10, Arcane: 10 } },
];

export interface BuildRequirementMatch {
  requirement: BuildRequirement;
  record: ItemRecord | null;
  areaRank: number;
  isFreeform: boolean;
}

export const BUILD_STATS: BuildStat[] = ["Vigor","Mind","Endurance","Strength","Dexterity","Intelligence","Faith","Arcane"];

export const BUILD_PRESETS: BuildPreset[] = [
  {
    "id": "all-knowing-sage",
    "name": "All-Knowing Sage",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Intelligence",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Faith",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Intelligence / Faith build using Staff of the Great Beyond.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":12,"Intelligence":40,"Faith":50},
    "statRecommended": {"Vigor":55,"Mind":38,"Endurance":33,"Intelligence":80,"Faith":60},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Staff of the Great Beyond",
        "kind": "staff"
      },
      {
        "name": "Sword of Night and Flame",
        "kind": "weapon"
      },
      {
        "name": "Greathelm",
        "kind": "armor"
      },
      {
        "name": "All-Knowing Armor",
        "kind": "armor"
      },
      {
        "name": "All-Knowing Gauntlets",
        "kind": "armor"
      },
      {
        "name": "All-Knowing Greaves",
        "kind": "armor"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flock's Canvas Talisman",
        "kind": "talisman"
      },
      {
        "name": "Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Multilayered Ring of Light",
        "kind": "spell"
      },
      {
        "name": "Elden Stars",
        "kind": "spell"
      },
      {
        "name": "Knight's Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Ancient Dragons' Lightning Strike",
        "kind": "spell"
      },
      {
        "name": "Flame of the Fell God",
        "kind": "spell"
      },
      {
        "name": "Giantsflame Take Thee",
        "kind": "spell"
      },
      {
        "name": "Frenzied Burst",
        "kind": "spell"
      },
      {
        "name": "Rykard's Rancor",
        "kind": "spell"
      },
      {
        "name": "Ancient Death Rancor",
        "kind": "spell"
      },
      {
        "name": "Night Comet",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Mass of Putrescence",
        "kind": "spell"
      },
      {
        "name": "Pest-Thread Spears",
        "kind": "spell"
      },
      {
        "name": "Stone of Gurranq",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "archer-build-beginner",
    "name": "Archer Build (Beginner)",
    "level": "Beginner",
    "primaryStats": [
      "Mind",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Mind",
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Mind / Dexterity build using Shortbow and Longbow.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":8,"Dexterity":10},
    "statRecommended": {"Vigor":50,"Mind":50,"Endurance":30,"Strength":10,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Shortbow",
        "kind": "weapon"
      },
      {
        "name": "Light",
        "kind": "armor"
      },
      {
        "name": "medium weight",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Barrage",
        "kind": "ash"
      },
      {
        "name": "Ash of War: Mighty Shot",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "barbarian-build-beginner",
    "name": "Barbarian Build (Beginner)",
    "level": "Beginner",
    "primaryStats": [
      "Endurance",
      "Strength"
    ],
    "secondaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "statTags": [
      "Endurance",
      "Strength",
      "Vigor",
      "Dexterity"
    ],
    "summary": "Endurance / Strength build using Zweihander.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":19,"Dexterity":11},
    "statRecommended": {"Vigor":40,"Mind":15,"Endurance":30,"Strength":25,"Dexterity":14,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Zweihander",
        "kind": "weapon"
      },
      {
        "name": "other Colossus Weapon",
        "kind": "weapon"
      },
      {
        "name": "Heavies you can and still med roll (high Poise ideal)",
        "kind": "armor"
      },
      {
        "name": "Ash of War: War Cry",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "battlemage-build-level-100",
    "name": "Battlemage Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind",
      "Strength"
    ],
    "statTags": [
      "Intelligence",
      "Vigor",
      "Mind",
      "Strength"
    ],
    "summary": "Intelligence build using Carian Glintstone Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Dexterity":14,"Intelligence":27},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":25,"Dexterity":14,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Carian Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "that can med roll",
        "kind": "armor"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Carian Slicer",
        "kind": "spell"
      },
      {
        "name": "Carian Greatsword",
        "kind": "spell"
      },
      {
        "name": "Carian Piercer",
        "kind": "spell"
      },
      {
        "name": "Glintstone Pebble",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "berserker-build-beginner",
    "name": "Berserker Build (Beginner)",
    "level": "Beginner",
    "primaryStats": [
      "Vigor",
      "Endurance"
    ],
    "secondaryStats": [
      "Strength",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Endurance",
      "Strength",
      "Dexterity"
    ],
    "summary": "Vigor / Endurance build using Claymore and Lordsworn's Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":13},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":40,"Strength":25,"Dexterity":20,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Claymore",
        "kind": "weapon"
      },
      {
        "name": "Heaviest you can wear and still med roll",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Quickstep",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "black-arrow-build-level-150-200-journey-2",
    "name": "Black Arrow Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Faith"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor",
      "Faith"
    ],
    "summary": "Strength / Dexterity build using Black Bow.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":9,"Dexterity":20,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":54,"Dexterity":80,"Intelligence":7,"Faith":25,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Black Bow",
        "kind": "weapon"
      },
      {
        "name": "Seal that weighs nothing",
        "kind": "seal"
      },
      {
        "name": "Little",
        "kind": "armor"
      },
      {
        "name": "no Armor",
        "kind": "armor"
      },
      {
        "name": "Old Lord's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Arrow's Sting Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Blue Dancer Charm",
        "kind": "talisman"
      },
      {
        "name": "Barrage",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "black-blade-build-level-150-200-journey-2",
    "name": "Black Blade Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Strength",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Faith",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Faith build using Maliketh's Black Blade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":34,"Dexterity":12,"Faith":46},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":48,"Strength":80,"Faith":12,"Arcane":11},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Maliketh's Black Blade",
        "kind": "weapon"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Maliketh's Armor",
        "kind": "armor"
      },
      {
        "name": "Armor high Poise",
        "kind": "armor"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Sacred Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing of the Erdtree",
        "kind": "spell"
      },
      {
        "name": "Black Blade",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "black-flame-spellblade-build-level-100",
    "name": "Black Flame Spellblade Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Dexterity",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Dexterity",
      "Faith",
      "Vigor",
      "Mind"
    ],
    "summary": "Dexterity / Faith build using Cross-Naginata.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":22,"Faith":28,"Arcane":10},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":18,"Dexterity":80,"Intelligence":7,"Faith":60,"Arcane":10},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Cross-Naginata",
        "kind": "weapon"
      },
      {
        "name": "Flamberge",
        "kind": "weapon"
      },
      {
        "name": "Scythe",
        "kind": "weapon"
      },
      {
        "name": "Grave Scythe",
        "kind": "weapon"
      },
      {
        "name": "Nagakiba",
        "kind": "weapon"
      },
      {
        "name": "Uchigatana",
        "kind": "weapon"
      },
      {
        "name": "Godslayer's Seal",
        "kind": "seal"
      },
      {
        "name": "that allows for med roll",
        "kind": "armor"
      },
      {
        "name": "Repeating Thrust",
        "kind": "ash"
      },
      {
        "name": "Spinning Slash",
        "kind": "ash"
      },
      {
        "name": "Sword Dance",
        "kind": "ash"
      },
      {
        "name": "Double Slash",
        "kind": "ash"
      },
      {
        "name": "Bloodflame Blade",
        "kind": "spell"
      },
      {
        "name": "Black Flame Blade",
        "kind": "spell"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Scouring Black Flame",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "black-guard-all-game",
    "name": "Black Guard (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Dexterity",
      "Arcane"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Arcane",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity / Arcane build using Clinging Bone.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":24,"Dexterity":22,"Arcane":23,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":25,"Strength":22,"Dexterity":18,"Intelligence":16,"Faith":74,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Clinging Bone",
        "kind": "weapon"
      },
      {
        "name": "Scorpion Kite Shield",
        "kind": "shield"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Greathelm",
        "kind": "armor"
      },
      {
        "name": "Royal Remains Armor",
        "kind": "armor"
      },
      {
        "name": "Lionel's Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Royal Remains Greaves",
        "kind": "armor"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      {
        "name": "Lifesteal Fist",
        "kind": "ash"
      },
      {
        "name": "Marais Executioner's Sword",
        "kind": "weapon"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "black-hammer",
    "name": "Black Hammer",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Mind",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Faith build using Black Steel Greathammer.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":4,"Faith":25,"Intelligence":17},
    "statRecommended": {"Vigor":55,"Mind":30,"Endurance":40,"Strength":45,"Faith":45},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Black Steel Greathammer",
        "kind": "weapon"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "Black Steel Greatshield",
        "kind": "shield"
      },
      {
        "name": "Helm of Night",
        "kind": "armor"
      },
      {
        "name": "Black Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Gauntlets of Night",
        "kind": "armor"
      },
      {
        "name": "Black Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Blade of Mercy",
        "kind": "talisman"
      },
      {
        "name": "Sacred Blade",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "black-knife-assassin-build-level-150",
    "name": "Black Knife Assassin Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Dexterity",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Dexterity",
      "Faith",
      "Vigor"
    ],
    "summary": "Dexterity / Faith build using Erdsteel Dagger.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":8,"Dexterity":12,"Faith":38},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":10,"Dexterity":80,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Erdsteel Dagger",
        "kind": "weapon"
      },
      {
        "name": "Black Knife",
        "kind": "weapon"
      },
      {
        "name": "Sacred Seal",
        "kind": "seal"
      },
      {
        "name": "Black Knife Hood",
        "kind": "armor"
      },
      {
        "name": "Black Knife Armor",
        "kind": "armor"
      },
      {
        "name": "Fire Prelate Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Fire Prelate Greaves",
        "kind": "armor"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Black Knife",
        "kind": "weapon"
      },
      {
        "name": "Bloodhound's Step",
        "kind": "ash"
      },
      {
        "name": "Parry",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing of the Erdtree",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "blackflame-apostle-build-level-50",
    "name": "Blackflame Apostle Build (Level 50)",
    "level": "Level 50",
    "primaryStats": [
      "Mind",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "statTags": [
      "Mind",
      "Faith",
      "Vigor",
      "Dexterity"
    ],
    "summary": "Mind / Faith build using Weapon that has Bleed on it by default such as the Uchigatana.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":24,"Faith":27,"Arcane":10},
    "statRecommended": {"Vigor":50,"Mind":50,"Endurance":20,"Strength":18,"Dexterity":24,"Intelligence":7,"Faith":60,"Arcane":10},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Weapon that has Bleed on it by default such as the Uchigatana",
        "kind": "weapon"
      },
      {
        "name": "Nightrider Flail",
        "kind": "weapon"
      },
      {
        "name": "Bloodhound's Fang",
        "kind": "weapon"
      },
      {
        "name": "Godslayer's Seal",
        "kind": "seal"
      },
      {
        "name": "Bloody Slash",
        "kind": "ash"
      },
      {
        "name": "Unsheathe work well",
        "kind": "ash"
      },
      {
        "name": "Ash of War of your choice",
        "kind": "ash"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Black Flame Blade",
        "kind": "spell"
      },
      {
        "name": "Bloodflame Blade",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "blackflame-bushido-build-level-150",
    "name": "Blackflame Bushido Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Dexterity",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Dexterity",
      "Faith",
      "Vigor",
      "Mind"
    ],
    "summary": "Dexterity / Faith build using Cross-Naginata.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":22,"Faith":42,"Arcane":10},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":18,"Dexterity":80,"Intelligence":7,"Faith":60,"Arcane":10},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Cross-Naginata",
        "kind": "weapon"
      },
      {
        "name": "Nagakiba",
        "kind": "weapon"
      },
      {
        "name": "Godslayer's Seal",
        "kind": "seal"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "White Reed Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Phantom Slash",
        "kind": "ash"
      },
      {
        "name": "Sword Dance",
        "kind": "ash"
      },
      {
        "name": "Double Slash",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Bloodflame Blade",
        "kind": "spell"
      },
      {
        "name": "Black Flame Blade",
        "kind": "spell"
      },
      {
        "name": "Scouring Black Flame",
        "kind": "spell"
      },
      {
        "name": "Black Flame Ritual",
        "kind": "spell"
      },
      {
        "name": "Black Flame's Protection",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "blasphemous-beastmaster-build-level-100",
    "name": "Blasphemous Beastmaster Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Strength",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Strength",
      "Faith",
      "Vigor",
      "Mind"
    ],
    "summary": "Strength / Faith build using Clawmark Seal.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":22,"Faith":25,"Dexterity":15},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":54,"Dexterity":15,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Blasphemous Blade",
        "kind": "weapon"
      },
      {
        "name": "Cinquedea",
        "kind": "weapon"
      },
      {
        "name": "that still allows you to med roll",
        "kind": "armor"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Shield Talisman +1",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Stone of Gurranq",
        "kind": "spell"
      },
      {
        "name": "Beast Claw",
        "kind": "spell"
      },
      {
        "name": "Bestial Sling",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "blasphemous-herald-build-level-150",
    "name": "Blasphemous Herald Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Faith",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Faith build using Blasphemous Blade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":22,"Dexterity":15,"Faith":38},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":15,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Blasphemous Blade",
        "kind": "weapon"
      },
      {
        "name": "Gargoyle's Blackblade",
        "kind": "weapon"
      },
      {
        "name": "Gargoyle's Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Raptor's Black Feathers",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Gargoyle's Blackblade",
        "kind": "weapon"
      },
      {
        "name": "Flaming Strike",
        "kind": "ash"
      },
      {
        "name": "Sacred Order",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing of the Erdtree",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Stone of Gurranq",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "blazing-blackblade-all-game",
    "name": "Blazing Blackblade (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Faith build using Hookclaws.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":8,"Dexterity":14,"Faith":25},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":14,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Hookclaws",
        "kind": "weapon"
      },
      {
        "name": "Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Maliketh's Armor",
        "kind": "armor"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      {
        "name": "Flaming Strike",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "blazing-bushido-build-level-100",
    "name": "Blazing Bushido Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor",
      "Mind"
    ],
    "summary": "Strength / Dexterity build using Nagakiba.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Dexterity":22,"Faith":15,"Arcane":10},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":54,"Dexterity":80,"Intelligence":7,"Faith":15,"Arcane":10},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Nagakiba",
        "kind": "weapon"
      },
      {
        "name": "Greatbow",
        "kind": "weapon"
      },
      {
        "name": "Finger Seal",
        "kind": "seal"
      },
      {
        "name": "that still allows med roll",
        "kind": "armor"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Blessed Dew Talisman",
        "kind": "talisman"
      },
      {
        "name": "Arrow's Sting Talisman",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Unsheathe",
        "kind": "ash"
      },
      {
        "name": "Rain of Arrows",
        "kind": "ash"
      },
      {
        "name": "Bloodflame Blade",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "blazing-executioner-build-all-levels",
    "name": "Blazing Executioner Build (All Levels)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Strength"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Endurance"
    ],
    "summary": "Vigor / Strength build using Crescent Moon Axe.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":25,"Dexterity":15},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":15,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Crescent Moon Axe",
        "kind": "weapon"
      },
      {
        "name": "Raging Wolf Armor",
        "kind": "armor"
      },
      {
        "name": "Blaidd's Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flaming Strike",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "blood-dancer-build-level-100",
    "name": "Blood Dancer Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Mind",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Mind",
      "Dexterity"
    ],
    "summary": "Vigor / Arcane build using Eleonora's Poleblade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":21,"Arcane":19,"Faith":17},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":20,"Strength":12,"Dexterity":21,"Intelligence":7,"Faith":17,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Eleonora's Poleblade",
        "kind": "weapon"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Mask of Confidence",
        "kind": "armor"
      },
      {
        "name": "Armor as long as you can med roll",
        "kind": "armor"
      },
      {
        "name": "Eleonora's Poleblade",
        "kind": "weapon"
      },
      {
        "name": "Dragonclaw",
        "kind": "spell"
      },
      {
        "name": "Dragonice",
        "kind": "spell"
      },
      {
        "name": "Rotten Breath",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Lightning Spear",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "blood-dragon-build-level-50",
    "name": "Blood Dragon Build (Level 50)",
    "level": "Level 50",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Endurance",
      "Dexterity",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Endurance",
      "Dexterity",
      "Faith"
    ],
    "summary": "Vigor / Arcane build using Dual Scimitars.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":17,"Arcane":13},
    "statRecommended": {"Vigor":55,"Mind":38,"Endurance":20,"Strength":8,"Dexterity":12,"Intelligence":16,"Faith":80,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Dual Scimitars",
        "kind": "seal"
      },
      {
        "name": "other Curved Swords that can use Ashes of War",
        "kind": "seal"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Heaviest you can wear and still med roll",
        "kind": "armor"
      },
      {
        "name": "Bloody Slash",
        "kind": "ash"
      },
      {
        "name": "Dragonclaw",
        "kind": "spell"
      },
      {
        "name": "Rotten Breath",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "blood-lancer",
    "name": "Blood Lancer",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Mind",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Arcane build using Sword Lance.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":55,"Mind":24,"Endurance":37,"Strength":30,"Dexterity":50,"Intelligence":20,"Faith":16,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Sword Lance",
        "kind": "weapon"
      },
      {
        "name": "Gaius's Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Blood Tax",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "bloodblade-build-beginner",
    "name": "Bloodblade Build (Beginner)",
    "level": "Beginner",
    "primaryStats": [
      "Vigor",
      "Endurance"
    ],
    "secondaryStats": [
      "Dexterity",
      "Arcane"
    ],
    "statTags": [
      "Vigor",
      "Endurance",
      "Dexterity",
      "Arcane"
    ],
    "summary": "Vigor / Endurance build using Scimitar.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":7,"Dexterity":13},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":40,"Strength":10,"Dexterity":20,"Intelligence":7,"Faith":7,"Arcane":16},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Scimitar",
        "kind": "weapon"
      },
      {
        "name": "that can Parry",
        "kind": "shield"
      },
      {
        "name": "Heaviest you can wear and still Med Roll",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Bloody Slash",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "bloodhound-build-all-levels",
    "name": "Bloodhound Build (All Levels)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Strength"
    ],
    "summary": "Vigor / Dexterity build using Bloodhound's Fang.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":17},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":20,"Strength":25,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Bloodhound's Fang",
        "kind": "weapon"
      },
      {
        "name": "Raptor's Black Feathers",
        "kind": "armor"
      },
      {
        "name": "armor that adds up to 51 Poise the Bull-Goat's Talisman equipped",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      
    ]
  },
  {
    "id": "bloody-ballerina-build-level-150-200-journey-2",
    "name": "Bloody Ballerina Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Endurance"
    ],
    "summary": "Vigor / Arcane build using Bloody Helice.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":19,"Arcane":17},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":16,"Dexterity":19,"Intelligence":7,"Faith":7,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Bloody Helice",
        "kind": "weapon"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "Armor you want",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      
    ]
  },
  {
    "id": "bloody-beastclaw",
    "name": "Bloody Beastclaw",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Arcane build using Beast Claw.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":8},
    "statRecommended": {"Vigor":25,"Mind":50,"Endurance":13,"Arcane":99},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Beast Claw",
        "kind": "spell"
      },
      {
        "name": "Horned Warrior Helm",
        "kind": "armor"
      },
      {
        "name": "Horned Warrior Armor",
        "kind": "armor"
      },
      {
        "name": "Lionel's Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Horned Warrior Greaves",
        "kind": "armor"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Crusade Insignia",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Savage Claws",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "bloody-bowman-build-level-150",
    "name": "Bloody Bowman Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor"
    ],
    "summary": "Strength / Dexterity build using Black Bow.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":9,"Dexterity":20},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":54,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Black Bow",
        "kind": "weapon"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "Light Armor",
        "kind": "armor"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Arrow's Sting Talisman",
        "kind": "talisman"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Barrage",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "blue-baller-all-game",
    "name": "Blue Baller (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Strength / Intelligence build using Iron Ball.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":11,"Dexterity":8,"Intelligence":12},
    "statRecommended": {"Vigor":50,"Mind":43,"Endurance":10,"Strength":9,"Dexterity":12,"Intelligence":80,"Faith":25,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Iron Ball",
        "kind": "weapon"
      },
      {
        "name": "Greathelm",
        "kind": "armor"
      },
      {
        "name": "Tree Surcoat",
        "kind": "armor"
      },
      {
        "name": "Scaled Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Scaled Greaves",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent’s Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Endure",
        "kind": "ash"
      },
      {
        "name": "Scholar's Armament",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "carian-cavalier-build-level-150-200-journey-2",
    "name": "Carian Cavalier Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Dexterity build using Loretta's War Sickle.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Dexterity":16,"Intelligence":20},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":80,"Intelligence":20,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Loretta's War Sickle",
        "kind": "staff"
      },
      {
        "name": "Staff",
        "kind": "staff"
      },
      {
        "name": "Royal Knight Armor",
        "kind": "armor"
      },
      {
        "name": "high Poise",
        "kind": "armor"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Loretta's Slash",
        "kind": "ash"
      },
      {
        "name": "Icerind Hatchet",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "carian-cleaver-build-all-game",
    "name": "Carian Cleaver Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Mind",
      "Intelligence"
    ],
    "secondaryStats": [
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Mind",
      "Intelligence",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Mind / Intelligence build using Iron Cleaver.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Dexterity":14,"Intelligence":60},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":25,"Strength":50,"Dexterity":50,"Intelligence":16,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Iron Cleaver",
        "kind": "staff"
      },
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Carian Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Carian Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Banished Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Banished Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Royal Knight's Resolve",
        "kind": "ash"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "carian-knight",
    "name": "Carian Knight",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Intelligence build using Carian Sorcery Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Intelligence":29},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":10,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Carian Sorcery Sword",
        "kind": "weapon"
      },
      {
        "name": "Wolf Crest Shield",
        "kind": "shield"
      },
      {
        "name": "Carian Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Rellana's Armor",
        "kind": "armor"
      },
      {
        "name": "Beast Champion Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Rellana's Greaves",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Blade of Mercy",
        "kind": "talisman"
      },
      {
        "name": "Crusade Insignia",
        "kind": "talisman"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Impaling Thrust",
        "kind": "ash"
      },
      {
        "name": "Carian Retaliation",
        "kind": "ash"
      },
      {
        "name": "Glintblade Trio",
        "kind": "shield"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "spell"
      },
      {
        "name": "Rellana's Twin Moons",
        "kind": "shield"
      },
      {
        "name": "Scholar's Shield",
        "kind": "shield"
      }
    ]
  },
  {
    "id": "carian-shield-knight",
    "name": "Carian Shield Knight",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Intelligence"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Mind",
      "Endurance",
      "Intelligence"
    ],
    "summary": "Vigor / Strength build.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":50,"Mind":31,"Endurance":25,"Strength":12,"Dexterity":19,"Intelligence":80,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Carian Thrusting Shield",
        "kind": "shield"
      },
      {
        "name": "Royal Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Rellana's Armor",
        "kind": "armor"
      },
      {
        "name": "Royal Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Royal Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Blade of Mercy",
        "kind": "talisman"
      },
      {
        "name": "Cragblade",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "carian-sovereignty",
    "name": "Carian Sovereignty",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Intelligence build using Claymore.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":13,"Intelligence":60},
    "statRecommended": {"Vigor":55,"Mind":30,"Endurance":25,"Strength":16,"Dexterity":16,"Intelligence":16,"Faith":70,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Claymore",
        "kind": "weapon"
      },
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Spellblade's Traveling Attire",
        "kind": "armor"
      },
      {
        "name": "Rakshasa Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Carian Sovereignty",
        "kind": "ash"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "spell"
      },
      {
        "name": "Great Glintstone Shard",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "carian-spellknight-build-level-150",
    "name": "Carian Spellknight Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence build using Longsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":10,"Dexterity":10,"Intelligence":60,"Faith":18},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":10,"Dexterity":10,"Intelligence":60,"Faith":18,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Longsword",
        "kind": "staff"
      },
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Carian Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "Carian Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Spellblade's Traveling Attire",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Carian Grandeur",
        "kind": "ash"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Scholar's Shield",
        "kind": "shield"
      },
      {
        "name": "Great Glintstone Shard",
        "kind": "spell"
      },
      {
        "name": "Rykard's Rancor",
        "kind": "spell"
      },
      {
        "name": "Founding Rain of Stars",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "carian-twinblade",
    "name": "Carian Twinblade",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Dexterity",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Strength / Dexterity build using Rellana's Twinblade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Intelligence":17,"Faith":25},
    "statRecommended": {"Vigor":55,"Mind":28,"Endurance":25,"Strength":13,"Dexterity":83},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "Rellana's Armor",
        "kind": "armor"
      },
      {
        "name": "Rellana's Cameo",
        "kind": "talisman"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Rellana's Twin Blades",
        "kind": "weapon"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "champion-build-level-50",
    "name": "Champion Build (Level 50)",
    "level": "Level 50",
    "primaryStats": [
      "Endurance",
      "Strength"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Endurance",
      "Strength",
      "Vigor",
      "Mind"
    ],
    "summary": "Endurance / Strength build using Lordsworn's Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":13,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":40,"Strength":54,"Dexterity":13,"Intelligence":7,"Faith":25,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Lordsworn's Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Claymore",
        "kind": "weapon"
      },
      {
        "name": "Banished Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Determination",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "cold-blooded-raptor-build-level-100",
    "name": "Cold-Blooded Raptor Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Strength",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Strength",
      "Intelligence",
      "Vigor",
      "Mind"
    ],
    "summary": "Strength / Intelligence build using Bloodhound Claws.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":15,"Intelligence":32,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":54,"Dexterity":15,"Intelligence":60,"Faith":25,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Bloodhound Claws",
        "kind": "staff"
      },
      {
        "name": "Sacrificial Axe",
        "kind": "weapon"
      },
      {
        "name": "Academy Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Raptor's Black Feathers",
        "kind": "armor"
      },
      {
        "name": "Haima Glintstone Crown",
        "kind": "armor"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Royal Knight's Resolve",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Great Glintstone Shard",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Adula's Moonblade",
        "kind": "spell"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "coldstorm-cleric-build-all-game",
    "name": "Coldstorm Cleric Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Mind",
      "Endurance",
      "Faith"
    ],
    "summary": "Vigor / Strength build using Chainlink Flail.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":32,"Dexterity":12,"Faith":19},
    "statRecommended": {"Vigor":50,"Mind":25,"Endurance":30,"Strength":65,"Dexterity":13,"Intelligence":16,"Faith":25,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Chainlink Flail",
        "kind": "weapon"
      },
      {
        "name": "Cuckoo Greatshield",
        "kind": "shield"
      },
      {
        "name": "Greatshield",
        "kind": "shield"
      },
      {
        "name": "Marais Mask",
        "kind": "armor"
      },
      {
        "name": "Noble's Traveling Garb",
        "kind": "armor"
      },
      {
        "name": "Scaled Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Scaled Greaves",
        "kind": "armor"
      },
      {
        "name": "Bull-goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dagger Talisman",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Stormcaller",
        "kind": "ash"
      },
      {
        "name": "Fire's Deadly Sin",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "colossal-crusher-build-level-150",
    "name": "Colossal Crusher Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength build using Giant-Crusher.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":60,"Dexterity":9},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":60,"Dexterity":10,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Giant-Crusher",
        "kind": "weapon"
      },
      {
        "name": "Highland Axe",
        "kind": "weapon"
      },
      {
        "name": "Bull-Goat Armor",
        "kind": "armor"
      },
      {
        "name": "other high Poise Armor",
        "kind": "armor"
      },
      {
        "name": "Roar Medallion",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Crimson Dagger",
        "kind": "talisman"
      },
      {
        "name": "Troll's Roar",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "colossal-knight-build-level-50",
    "name": "Colossal Knight Build (Level 50)",
    "level": "Level 50",
    "primaryStats": [
      "Strength"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength build using Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":31,"Dexterity":12},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":12,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Heaviest you can wear and still med roll",
        "kind": "armor"
      },
      {
        "name": "War Cry",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "colossus-guardian-build-level-100",
    "name": "Colossus Guardian Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Strength"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength build using Prelate's Inferno Crozier.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":45,"Dexterity":8,"Faith":15},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":10,"Intelligence":7,"Faith":15,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Prelate's Inferno Crozier",
        "kind": "seal"
      },
      {
        "name": "Sacred Seal and a Dagger",
        "kind": "seal"
      },
      {
        "name": "Lionel's Armor",
        "kind": "armor"
      },
      {
        "name": "Roar Medallion",
        "kind": "talisman"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Barbaric Roar",
        "kind": "ash"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Bestial Vitality",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "crimson-duelist-build-level-150-200-journey-2",
    "name": "Crimson Duelist Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Endurance"
    ],
    "summary": "Vigor / Arcane build using Rogier's Rapier.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":8,"Dexterity":17},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":10,"Dexterity":17,"Intelligence":7,"Faith":7,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Rogier's Rapier",
        "kind": "weapon"
      },
      {
        "name": "Small Shield",
        "kind": "shield"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Misericorde",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "crucible-knight-build-level-150-200-journey-2",
    "name": "Crucible Knight Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Strength",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Strength",
      "Faith",
      "Vigor",
      "Mind"
    ],
    "summary": "Strength / Faith build using Ordovis' Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":25,"Faith":27,"Dexterity":13},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":54,"Dexterity":13,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Ordovis' Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Crucible Axe Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Flock's Canvas Talisman",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Ordovis's Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Aspects of the Crucible: Tail",
        "kind": "spell"
      },
      {
        "name": "Aspects of the Crucible: Horns",
        "kind": "spell"
      },
      {
        "name": "Aspects of the Crucible: Breath",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "crusader-build-level-150",
    "name": "Crusader Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Mind"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Mind"
    ],
    "summary": "Vigor / Faith build using Gargoyle's Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":10,"Faith":50},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":20,"Strength":18,"Dexterity":10,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Gargoyle's Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Brass Shield",
        "kind": "shield"
      },
      {
        "name": "Haligtree Knight Helm",
        "kind": "armor"
      },
      {
        "name": "armor that allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flock's Canvas Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Sacred Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Barricade Shield",
        "kind": "shield"
      },
      {
        "name": "Sword Dance",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing of the Erdtree",
        "kind": "spell"
      },
      {
        "name": "Elden Stars",
        "kind": "spell"
      },
      {
        "name": "Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Black Blade",
        "kind": "spell"
      },
      {
        "name": "Black Flame's Protection",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "crystal-mage-build-level-100",
    "name": "Crystal Mage Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence build using Crystal Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Intelligence":52,"Faith":12,"Dexterity":14},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":20,"Dexterity":14,"Intelligence":60,"Faith":12,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Crystal Staff",
        "kind": "staff"
      },
      {
        "name": "Finger Seal",
        "kind": "seal"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "that still allows you to med roll",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Shield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Crystal Torrent",
        "kind": "spell"
      },
      {
        "name": "Shattering Crystal",
        "kind": "spell"
      },
      {
        "name": "Glintstone Pebble",
        "kind": "spell"
      },
      {
        "name": "Great Glintstone Shard",
        "kind": "spell"
      },
      {
        "name": "Comet",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Bestial Vitality",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "dark-knight-build-level-150",
    "name": "Dark Knight Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Intelligence build using Helphen's Steeple.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":19,"Dexterity":12,"Intelligence":38},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":19,"Dexterity":12,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Helphen's Steeple",
        "kind": "staff"
      },
      {
        "name": "Dark Moon Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Staff of Loss",
        "kind": "staff"
      },
      {
        "name": "Night's Cavalry Armor",
        "kind": "armor"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Primal Glintstone Blade",
        "kind": "talisman"
      },
      {
        "name": "Helphen's Steeple",
        "kind": "staff"
      },
      {
        "name": "Night Comet",
        "kind": "spell"
      },
      {
        "name": "Night Shard",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "dark-paladin",
    "name": "Dark Paladin",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Endurance",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind"
    ],
    "statTags": [
      "Vigor",
      "Endurance",
      "Dexterity",
      "Mind"
    ],
    "summary": "Vigor / Endurance / Dexterity build using Milady.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":25},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":40,"Strength":10,"Dexterity":80,"Intelligence":7,"Faith":25,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Milady",
        "kind": "weapon"
      },
      {
        "name": "Wolf Crest Shield",
        "kind": "shield"
      },
      {
        "name": "Solitude Armor",
        "kind": "armor"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Cragblade",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "darkmoon-spellblade-build-level-100",
    "name": "Darkmoon Spellblade Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Mind",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Mind",
      "Intelligence",
      "Vigor"
    ],
    "summary": "Mind / Intelligence build using Dark Moon Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":12,"Intelligence":38},
    "statRecommended": {"Vigor":50,"Mind":50,"Endurance":20,"Strength":16,"Dexterity":12,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Dark Moon Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Carian Glintblade Staff",
        "kind": "staff"
      },
      {
        "name": "that still allows med rolling",
        "kind": "armor"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Radagon Icon",
        "kind": "talisman"
      },
      {
        "name": "Stargazer Heirloom",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Magic Glintblade",
        "kind": "spell"
      },
      {
        "name": "Glintstone Pebble",
        "kind": "spell"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Unseen Form",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "death-knight-build-level-150",
    "name": "Death Knight Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence build using Sword of Night and Flame.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":12,"Intelligence":60,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":12,"Dexterity":12,"Intelligence":60,"Faith":25,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Sword of Night and Flame",
        "kind": "weapon"
      },
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Frenzied Flame Seal",
        "kind": "seal"
      },
      {
        "name": "Carian Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "Night's Cavalry Helm",
        "kind": "armor"
      },
      {
        "name": "Night's Cavalry Armor",
        "kind": "armor"
      },
      {
        "name": "Lionel's Greaves",
        "kind": "armor"
      },
      {
        "name": "Lionel's Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Rancorcall",
        "kind": "spell"
      },
      {
        "name": "Ancient Death Rancor",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "death-mage-build-level-150-200-journey-2",
    "name": "Death Mage Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Intelligence",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Faith",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence / Faith build using Sword of Night and Flame.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":12,"Intelligence":42,"Faith":30},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":12,"Dexterity":12,"Intelligence":60,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Sword of Night and Flame",
        "kind": "weapon"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "Prince of Death's Staff",
        "kind": "staff"
      },
      {
        "name": "Armor that allows you to medium roll.",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Rancorcall",
        "kind": "spell"
      },
      {
        "name": "Ancient Death Rancor",
        "kind": "spell"
      },
      {
        "name": "Explosive Ghostflame",
        "kind": "spell"
      },
      {
        "name": "Rykard's Rancor",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "deathblade-build-level-100",
    "name": "Deathblade Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Intelligence",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Faith",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence / Faith build using Sword of Night and Flame.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":12,"Intelligence":34,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":12,"Dexterity":12,"Intelligence":60,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Sword of Night and Flame",
        "kind": "weapon"
      },
      {
        "name": "Prince of Death's Staff",
        "kind": "staff"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "that allows you to med roll. Spellblade Set boosts Night and Flame's Magic attack by 2% per piece",
        "kind": "armor"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Shield Talisman +1",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Magic Glintblade",
        "kind": "spell"
      },
      {
        "name": "Ancient Death Rancor",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "devonia-s-hammer",
    "name": "Devonia's Hammer",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Mind",
      "Endurance",
      "Faith"
    ],
    "summary": "Vigor / Strength build using Devonia's Hammer.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":40},
    "statRecommended": {"Vigor":55,"Mind":30,"Endurance":25,"Strength":50,"Dexterity":25,"Intelligence":16,"Faith":25,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Devonia's Hammer",
        "kind": "weapon"
      },
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Crucible Hammer-Helm",
        "kind": "armor"
      },
      {
        "name": "Crucible Tree Armor",
        "kind": "armor"
      },
      {
        "name": "Crucible Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Crucible Greaves",
        "kind": "armor"
      },
      {
        "name": "Two-Handed Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "divine-warrior",
    "name": "Divine Warrior",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Faith build using Euporia.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":25},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":10,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Euporia",
        "kind": "weapon"
      },
      {
        "name": "Divine Bird Helm",
        "kind": "armor"
      },
      {
        "name": "Two-Handed Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "double-dragon",
    "name": "Double Dragon",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Endurance",
      "Strength",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Endurance",
      "Strength",
      "Dexterity"
    ],
    "summary": "Vigor / Arcane build using Dane's Footwork.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":55,"Mind":26,"Endurance":30,"Strength":12,"Dexterity":70,"Intelligence":21,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Dane's Footwork",
        "kind": "weapon"
      },
      {
        "name": "Poisoned Hand",
        "kind": "weapon"
      },
      {
        "name": "Rock Heart",
        "kind": "armor"
      },
      {
        "name": "Shattered Stone Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Kindred of Rot's Exultation",
        "kind": "talisman"
      },
      {
        "name": "The Poison Flower Blooms Twice",
        "kind": "ash"
      },
      {
        "name": "Any weapon with Scarlet Rot",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "dragon-dancer-build-level-150-200-journey-2",
    "name": "Dragon Dancer Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Mind",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Mind",
      "Faith"
    ],
    "summary": "Vigor / Arcane build using Regalia of Eochaid.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":24,"Dexterity":18,"Arcane":23,"Faith":28},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":20,"Strength":24,"Dexterity":18,"Intelligence":7,"Faith":28,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Regalia of Eochaid",
        "kind": "weapon"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Silver Tear Mask",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Marais Executioner's Sword",
        "kind": "weapon"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Dragonclaw",
        "kind": "spell"
      },
      {
        "name": "Dragonmaw",
        "kind": "spell"
      },
      {
        "name": "Agheel's Flame",
        "kind": "spell"
      },
      {
        "name": "Ekzyke's Decay",
        "kind": "spell"
      },
      {
        "name": "Greyoll's Roar",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "dragon-god",
    "name": "Dragon God",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Mind",
      "Arcane"
    ],
    "secondaryStats": [
      "Endurance",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Mind",
      "Arcane",
      "Endurance",
      "Faith"
    ],
    "summary": "Vigor / Mind / Arcane build using Dragon Communion Seal.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":10,"Arcane":10,"Strength":12,"Dexterity":8},
    "statRecommended": {"Vigor":50,"Mind":26,"Endurance":25,"Strength":14,"Dexterity":35,"Intelligence":16,"Faith":60,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Bloodfiend's Fork",
        "kind": "weapon"
      },
      {
        "name": "Blue Dancer Charm",
        "kind": "talisman"
      },
      {
        "name": "Crusade Insignia",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Sword Dance",
        "kind": "ash"
      },
      {
        "name": "Battle Axe",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "dragon-knight-build-level-100",
    "name": "Dragon Knight Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Mind",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Mind",
      "Faith"
    ],
    "summary": "Vigor / Arcane build using that can use Bloody Slash.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":25,"Arcane":15,"Strength":20,"Dexterity":14},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":20,"Strength":20,"Dexterity":14,"Intelligence":7,"Faith":25,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "that can use Bloody Slash",
        "kind": "seal"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Silver Tear Mask",
        "kind": "armor"
      },
      {
        "name": "Armor that allows you to med roll",
        "kind": "armor"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "talisman"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Faithful's Canvas Talisman",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Bloody Slash",
        "kind": "ash"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing's Boon",
        "kind": "spell"
      },
      {
        "name": "Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Stone of Gurranq",
        "kind": "spell"
      },
      {
        "name": "Agheel's Flame",
        "kind": "spell"
      },
      {
        "name": "Smarag's Glintstone Breath",
        "kind": "spell"
      },
      {
        "name": "Rotten Breath",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "dragon-priest-build-beginner",
    "name": "Dragon Priest Build (Beginner)",
    "level": "Beginner",
    "primaryStats": [
      "Vigor",
      "Mind"
    ],
    "secondaryStats": [
      "Faith",
      "Arcane"
    ],
    "statTags": [
      "Vigor",
      "Mind",
      "Faith",
      "Arcane"
    ],
    "summary": "Vigor / Mind build.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":15,"Arcane":12},
    "statRecommended": {"Vigor":60,"Mind":50,"Endurance":20,"Strength":10,"Dexterity":10,"Intelligence":7,"Faith":16,"Arcane":16},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Dragonfire",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "dragon-priestess",
    "name": "Dragon Priestess",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Faith build using Erdtree Seal.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":40,"Strength":4},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":10,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Coded Sword",
        "kind": "weapon"
      },
      {
        "name": "Gravel Stone Seal",
        "kind": "seal"
      },
      {
        "name": "Priestess Heart",
        "kind": "armor"
      },
      {
        "name": "Flock's Canvas Talisman",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Lightning Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Knight's Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Ancient Dragons' Lightning Strike",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "dragon-warrior-build-level-150",
    "name": "Dragon Warrior Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Endurance",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Endurance",
      "Faith"
    ],
    "summary": "Vigor / Arcane build using Bandit's Curved Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":11,"Dexterity":13,"Faith":25,"Arcane":16},
    "statRecommended": {"Vigor":55,"Endurance":25,"Faith":30,"Arcane":50},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Bandit's Curved Sword",
        "kind": "weapon"
      },
      {
        "name": "Any curved sword",
        "kind": "weapon"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "Armor with high poise",
        "kind": "armor"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Primal Glintstone Blade",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Seppuku",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing's Boon",
        "kind": "spell"
      },
      {
        "name": "Ekzyke's Decay",
        "kind": "spell"
      },
      {
        "name": "Dragonclaw",
        "kind": "spell"
      },
      {
        "name": "Dragonmaw",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "dragonscale-daimyo-build-level-150-200-journey-2",
    "name": "Dragonscale Daimyo Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor"
    ],
    "summary": "Strength / Dexterity build using Dragonscale Blade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Dexterity":20},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":54,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Dragonscale Blade",
        "kind": "weapon"
      },
      {
        "name": "Uchigatana",
        "kind": "weapon"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Armor that allows you to medium roll.",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flaming Strike",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "dragonslayer-shadow",
    "name": "Dragonslayer Shadow",
    "level": "SOTE",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Dexterity",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Strength / Dexterity build using Dragon-Hunter's Great Katana.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":30,"Dexterity":14},
    "statRecommended": {"Vigor":50,"Mind":33,"Endurance":35,"Strength":55,"Dexterity":12,"Intelligence":16,"Faith":7,"Arcane":35},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Dragon-Hunter's Great Katana",
        "kind": "weapon"
      },
      {
        "name": "Rakshasa Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Two-Handed Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragon Greatclaw",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "drake-knight-build-level-150-200-journey-2",
    "name": "Drake Knight Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Strength",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Strength",
      "Faith",
      "Vigor"
    ],
    "summary": "Strength / Faith build using Magma Wyrm's Scalesword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":24,"Dexterity":15,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":54,"Dexterity":15,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Magma Wyrm's Scalesword",
        "kind": "weapon"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Armor that allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Magma Wyrm's Scalesword",
        "kind": "weapon"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "duel-sword-duelist",
    "name": "Duel Sword Duelist",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance",
      "Faith"
    ],
    "summary": "Vigor / Dexterity build using Horned Warrior's Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":40},
    "statRecommended": {"Vigor":50,"Mind":40,"Endurance":25,"Strength":8,"Dexterity":12,"Intelligence":81,"Faith":7,"Arcane":10},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Horned Warrior's Sword",
        "kind": "weapon"
      },
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Divine Bird Helm",
        "kind": "armor"
      },
      {
        "name": "Leda's Armor",
        "kind": "armor"
      },
      {
        "name": "Leyndell Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Malformed Dragon Greaves",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Sacred Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Any Horned Warrior weapon",
        "kind": "weapon"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "elementalist-build-level-150",
    "name": "Elementalist Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Intelligence",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Faith",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence / Faith build using Prince of Death's Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":6,"Intelligence":23,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":10,"Dexterity":10,"Intelligence":60,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Prince of Death's Staff",
        "kind": "staff"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "that still allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Marika's Soreseal",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Primal Glintstone Blade",
        "kind": "talisman"
      },
      {
        "name": "Stone of Gurranq",
        "kind": "spell"
      },
      {
        "name": "Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Catch Flame",
        "kind": "spell"
      },
      {
        "name": "Great Glintstone Shard",
        "kind": "spell"
      },
      {
        "name": "Triple Rings of Light",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "enchanted-knight-build-level-50",
    "name": "Enchanted Knight Build (Level 50)",
    "level": "Level 50",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Intelligence build using Carian Glintstone Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":8,"Intelligence":27},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":12,"Dexterity":10,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Carian Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Blue-Gold Kite Shield",
        "kind": "shield"
      },
      {
        "name": "Carian Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Barricade Shield",
        "kind": "ash"
      },
      {
        "name": "Carian Slicer",
        "kind": "spell"
      },
      {
        "name": "Carian Piercer",
        "kind": "spell"
      },
      {
        "name": "Carian Greatsword",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "eochaid-executioner-build-level-150",
    "name": "Eochaid Executioner Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength",
      "Arcane"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Strength",
      "Arcane",
      "Vigor"
    ],
    "summary": "Strength / Arcane build using Marais Executioner's Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":24,"Dexterity":18,"Arcane":23,"Faith":15},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":54,"Dexterity":18,"Intelligence":7,"Faith":15,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Marais Executioner's Sword",
        "kind": "weapon"
      },
      {
        "name": "Regalia of Eochaid",
        "kind": "weapon"
      },
      {
        "name": "Banished Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "Shield you like",
        "kind": "shield"
      },
      {
        "name": "that still allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "fire-knight-impaler",
    "name": "Fire Knight Impaler",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Faith",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity / Faith build using Spear of the Impaler.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":40},
    "statRecommended": {"Vigor":55,"Mind":42,"Endurance":25,"Strength":14,"Dexterity":12,"Intelligence":16,"Faith":30,"Arcane":50},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Spear of the Impaler",
        "kind": "weapon"
      },
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Fire Knight's Seal",
        "kind": "seal"
      },
      {
        "name": "Winged Serpent Helm",
        "kind": "armor"
      },
      {
        "name": "Fire Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Fire Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Fire Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "flame-dancer-build-level-150",
    "name": "Flame Dancer Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Faith",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Faith build using Giant's Red Braid.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":12,"Faith":42},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":12,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Giant's Red Braid",
        "kind": "seal"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Greatshield",
        "kind": "shield"
      },
      {
        "name": "Armor that has high Poise.",
        "kind": "armor"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Obsidian Lamina",
        "kind": "weapon"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Black Flame Ritual",
        "kind": "spell"
      },
      {
        "name": "Flame, Fall Upon Them",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "flame-guardian-all-game",
    "name": "Flame Guardian (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Mind",
      "Faith"
    ],
    "secondaryStats": [
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Mind",
      "Faith",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Mind / Faith build using Curved Great Club.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":24,"Dexterity":10,"Faith":41},
    "statRecommended": {"Vigor":60,"Mind":25,"Endurance":30,"Strength":13,"Dexterity":12,"Intelligence":16,"Faith":25,"Arcane":80},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Curved Great Club",
        "kind": "weapon"
      },
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Finger Seal",
        "kind": "seal"
      },
      {
        "name": "Bloodsoaked Mask",
        "kind": "armor"
      },
      {
        "name": "Bloodsoaked Manchettes",
        "kind": "armor"
      },
      {
        "name": "Blackflame Monk Armor",
        "kind": "armor"
      },
      {
        "name": "Blackflame Monk Greaves",
        "kind": "armor"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      {
        "name": "Flaming Strike",
        "kind": "ash"
      },
      {
        "name": "Flame of the Fell God",
        "kind": "spell"
      },
      {
        "name": "Giantsflame Take Thee",
        "kind": "spell"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Frenzied Burst",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "freezing-battlemage-build-level-150",
    "name": "Freezing Battlemage Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence build using Lusat's Glintstone Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Intelligence":52,"Dexterity":14},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":20,"Dexterity":14,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Lusat's Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Carian Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Snow Witch Hat",
        "kind": "armor"
      },
      {
        "name": "Armor that still allows medium roll",
        "kind": "armor"
      },
      {
        "name": "Graven-School Talisman",
        "kind": "talisman"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Carian Slicer",
        "kind": "spell"
      },
      {
        "name": "Adula's Moonblade",
        "kind": "spell"
      },
      {
        "name": "Carian Piercer",
        "kind": "spell"
      },
      {
        "name": "Glintstone Icecrag",
        "kind": "spell"
      },
      {
        "name": "Zamor Ice Storm",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "frenzied-acolyte-build-level-100",
    "name": "Frenzied Acolyte Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Faith",
      "Arcane"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Faith",
      "Arcane",
      "Vigor",
      "Mind"
    ],
    "summary": "Faith / Arcane build using Dragon Communion Seal.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":27,"Arcane":10,"Strength":4},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":10,"Dexterity":10,"Intelligence":7,"Faith":60,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Frenzied Flame Seal",
        "kind": "seal"
      },
      {
        "name": "Gravel Stone Seal",
        "kind": "seal"
      },
      {
        "name": "Godslayer's Seal",
        "kind": "seal"
      },
      {
        "name": "melee Weapon that can take an Ash of War",
        "kind": "seal"
      },
      {
        "name": "Silver Tear Mask",
        "kind": "armor"
      },
      {
        "name": "Commoner's Garb",
        "kind": "armor"
      },
      {
        "name": "Noble's Gloves",
        "kind": "armor"
      },
      {
        "name": "Noble's Trousers",
        "kind": "armor"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Faithful's Canvas Talisman",
        "kind": "talisman"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Bloodhound's Step",
        "kind": "ash"
      },
      {
        "name": "The Flame of Frenzy",
        "kind": "spell"
      },
      {
        "name": "Frenzied Burst",
        "kind": "spell"
      },
      {
        "name": "Black Flame",
        "kind": "spell"
      },
      {
        "name": "Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "frost-knight-build-level-100",
    "name": "Frost Knight Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence build using Clayman's Harpoon.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":10,"Intelligence":29},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":12,"Dexterity":10,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Clayman's Harpoon",
        "kind": "weapon"
      },
      {
        "name": "Staff",
        "kind": "staff"
      },
      {
        "name": "Carian Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "that still allows you to med roll",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Ice Spear",
        "kind": "ash"
      },
      {
        "name": "Carian Retaliation",
        "kind": "ash"
      },
      {
        "name": "Scholar's Shield",
        "kind": "shield"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Magic Glintblade",
        "kind": "spell"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "spell"
      },
      {
        "name": "Scholar's Armament",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "frost-paladin-build-level-150-200-journey-2",
    "name": "Frost Paladin Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Mind"
    ],
    "secondaryStats": [
      "Strength",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Mind",
      "Strength",
      "Dexterity"
    ],
    "summary": "Vigor / Mind build using Zamor Curved Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":18,"Faith":25},
    "statRecommended": {"Vigor":60,"Mind":50,"Endurance":20,"Strength":25,"Dexterity":20,"Intelligence":7,"Faith":25,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Zamor Curved Sword",
        "kind": "weapon"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Kite Shield",
        "kind": "shield"
      },
      {
        "name": "Shield",
        "kind": "shield"
      },
      {
        "name": "Fingerprint Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing's Boon",
        "kind": "spell"
      },
      {
        "name": "Heal",
        "kind": "spell"
      },
      {
        "name": "other buffs you like",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "frost-fu-monk",
    "name": "Frost-Fu Monk",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Dexterity",
      "Intelligence"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Dexterity",
      "Intelligence",
      "Endurance"
    ],
    "summary": "Vigor / Strength / Dexterity / Intelligence build using Dryleaf Arts.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":55,"Mind":25,"Endurance":27,"Strength":11,"Dexterity":80,"Intelligence":16,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Dryleaf Arts",
        "kind": "weapon"
      },
      {
        "name": "Dane's Hat",
        "kind": "armor"
      },
      {
        "name": "Messmer Soldier Armor",
        "kind": "armor"
      },
      {
        "name": "Horned Warrior Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Horned Warrior Greaves",
        "kind": "armor"
      },
      {
        "name": "Blue Dancer Charm",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Divine Beast Frost Stomp",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "ghostblade-build-all-game",
    "name": "Ghostblade Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Dexterity",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Dexterity",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Strength / Dexterity / Intelligence build using Death's Poker.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":15,"Dexterity":17,"Intelligence":14},
    "statRecommended": {"Vigor":55,"Mind":27,"Endurance":40,"Strength":35,"Dexterity":12,"Intelligence":16,"Faith":50,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Death's Poker",
        "kind": "weapon"
      },
      {
        "name": "Staff of Loss",
        "kind": "staff"
      },
      {
        "name": "Scorpion Kite Shield",
        "kind": "shield"
      },
      {
        "name": "Sanguine Noble Hood",
        "kind": "armor"
      },
      {
        "name": "Maliketh's Armor",
        "kind": "armor"
      },
      {
        "name": "Maliketh's Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Maliketh's Greaves",
        "kind": "armor"
      },
      {
        "name": "armor high protection and 51+ Poise",
        "kind": "armor"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flexible talisman slot",
        "kind": "talisman"
      },
      {
        "name": "Death's Poker",
        "kind": "weapon"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "gladiator-build-all-game",
    "name": "Gladiator Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Dexterity",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Strength / Dexterity build using Highland Axe.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":30,"Dexterity":9},
    "statRecommended": {"Vigor":60,"Mind":25,"Endurance":30,"Strength":13,"Dexterity":12,"Arcane":80},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Highland Axe",
        "kind": "weapon"
      },
      {
        "name": "Redmane Greatshield",
        "kind": "shield"
      },
      {
        "name": "Rotten Duelist Helm",
        "kind": "armor"
      },
      {
        "name": "Rotten Gravekeeper Cloak",
        "kind": "armor"
      },
      {
        "name": "Bull-Goat Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Rotten Duelist Greaves",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Dagger Talisman",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Flexible talisman slot",
        "kind": "talisman"
      },
      {
        "name": "Stamp (Upward Cut)",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "godslayer-build-level-150-200-journey-2",
    "name": "Godslayer Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Strength",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Strength",
      "Faith"
    ],
    "summary": "Vigor / Dexterity build using Godslayer's Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Dexterity":22,"Faith":25},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":20,"Strength":25,"Dexterity":80,"Intelligence":7,"Faith":25,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Godslayer's Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Sacred Seal",
        "kind": "seal"
      },
      {
        "name": "Armor high Poise",
        "kind": "armor"
      },
      {
        "name": "the higher the better.",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "gold-breaker-build-ng",
    "name": "Gold Breaker Build (NG+)",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Endurance",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Dexterity",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Endurance",
      "Strength",
      "Mind",
      "Dexterity",
      "Faith"
    ],
    "summary": "Vigor / Endurance / Strength build using Marika's Hammer.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":34,"Dexterity":12,"Faith":25},
    "statRecommended": {"Vigor":55,"Mind":35,"Endurance":35,"Strength":55,"Dexterity":20,"Intelligence":16,"Faith":25,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Marika's Hammer",
        "kind": "weapon"
      },
      {
        "name": "Golden Greatshield",
        "kind": "shield"
      },
      {
        "name": "Leyndell Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Rellana's Twin Blades",
        "kind": "weapon"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "golden-champion-build-level-150",
    "name": "Golden Champion Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Dexterity build using Ornamental Straight Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":14,"Dexterity":14,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":14,"Dexterity":80,"Intelligence":7,"Faith":25,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Ornamental Straight Sword",
        "kind": "weapon"
      },
      {
        "name": "Sacred Seal",
        "kind": "seal"
      },
      {
        "name": "Banished Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "Banished Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Sword of Light",
        "kind": "weapon"
      },
      {
        "name": "Golden Parry",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing's Boon",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "golden-sword-sage-build-level-150-200-journey-2",
    "name": "Golden Sword Sage Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Intelligence",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Faith",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence / Faith build using Coded Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":50,"Strength":12,"Dexterity":12,"Intelligence":31},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":12,"Dexterity":12,"Intelligence":60,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Coded Sword",
        "kind": "weapon"
      },
      {
        "name": "Sword of Night and Flame",
        "kind": "weapon"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "Blue-Gold Kite Shield",
        "kind": "shield"
      },
      {
        "name": "Radiant Gold Mask",
        "kind": "armor"
      },
      {
        "name": "Armor with high poise",
        "kind": "armor"
      },
      {
        "name": "Sacred Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Ritual Shield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Barricade Shield",
        "kind": "shield"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing of the Erdtree",
        "kind": "spell"
      },
      {
        "name": "Discus of Light",
        "kind": "spell"
      },
      {
        "name": "Triple Rings of Light",
        "kind": "spell"
      },
      {
        "name": "Radagon's Rings of Light",
        "kind": "spell"
      },
      {
        "name": "Elden Stars",
        "kind": "spell"
      },
      {
        "name": "Litany of Proper Death",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "goldeneye-bow-build-level-100",
    "name": "Goldeneye Bow Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Mind",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "statTags": [
      "Mind",
      "Faith",
      "Vigor",
      "Dexterity"
    ],
    "summary": "Mind / Faith build using Erdtree Bow.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":9,"Dexterity":20,"Faith":50,"Arcane":16},
    "statRecommended": {"Vigor":50,"Mind":50,"Endurance":20,"Strength":10,"Dexterity":20,"Intelligence":7,"Faith":60,"Arcane":16},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Erdtree Bow",
        "kind": "weapon"
      },
      {
        "name": "Black Bow",
        "kind": "weapon"
      },
      {
        "name": "Finger Seal",
        "kind": "seal"
      },
      {
        "name": "you can wear and still medium roll. Silver Tear Mask is good if you don't boost Arcane.",
        "kind": "armor"
      },
      {
        "name": "Arrow's Reach Talisman",
        "kind": "talisman"
      },
      {
        "name": "Arrow's Sting Talisman",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Sacred Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Mighty Shot",
        "kind": "ash"
      },
      {
        "name": "Barrage",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing of the Erdtree",
        "kind": "spell"
      },
      {
        "name": "Protection of the Erdtree",
        "kind": "spell"
      },
      {
        "name": "Swarm of Flies",
        "kind": "spell"
      },
      {
        "name": "Elden Stars",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "gravity-god-build-level-150",
    "name": "Gravity God Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor"
    ],
    "summary": "Strength / Dexterity build using Fallingstar Beast Jaw.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":34,"Dexterity":14,"Intelligence":20,"Faith":15},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":54,"Dexterity":80,"Intelligence":20,"Faith":15,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Fallingstar Beast Jaw",
        "kind": "seal"
      },
      {
        "name": "Sacred Seal",
        "kind": "seal"
      },
      {
        "name": "Okina Mask",
        "kind": "armor"
      },
      {
        "name": "Raptor's Black Feathers",
        "kind": "armor"
      },
      {
        "name": "Armor that allows medium roll",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Meteoric Ore Blade",
        "kind": "weapon"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "gravity-sorcerer",
    "name": "Gravity Sorcerer",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Faith"
    ],
    "summary": "Vigor / Intelligence build using Carian Regal Scepter.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":8,"Dexterity":10,"Intelligence":60,"Faith":17},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":20,"Strength":10,"Dexterity":10,"Intelligence":60,"Faith":17,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Meteorite Staff",
        "kind": "staff"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "Preceptor's Big Hat",
        "kind": "armor"
      },
      {
        "name": "Ruler's Robe",
        "kind": "armor"
      },
      {
        "name": "Preceptor's Gloves",
        "kind": "armor"
      },
      {
        "name": "Preceptor's Trousers",
        "kind": "armor"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      }
    ]
  },
  {
    "id": "grim-reaper-build-level-150-200-journey-2",
    "name": "Grim Reaper Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Strength",
      "Arcane"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Strength",
      "Arcane",
      "Vigor"
    ],
    "summary": "Strength / Arcane build using Grave Scythe.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":17,"Dexterity":13,"Faith":25,"Arcane":10},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":54,"Dexterity":13,"Intelligence":7,"Faith":25,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Grave Scythe",
        "kind": "weapon"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Stormcaller",
        "kind": "ash"
      },
      {
        "name": "Bloodflame Blade",
        "kind": "spell"
      },
      {
        "name": "Poison Armament",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Poison Mist",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "guardian-golem-build-all-game",
    "name": "Guardian Golem Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Strength"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Endurance"
    ],
    "summary": "Vigor / Strength build using Golem's Halberd.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":36,"Dexterity":14},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":14,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Golem's Halberd",
        "kind": "weapon"
      },
      {
        "name": "that has at least 51 Poise",
        "kind": "armor"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Royal Knight's Resolve",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "haima-hoplite-build-all-game",
    "name": "Haima Hoplite Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Strength / Intelligence build using Clayman's Harpoon.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":32,"Dexterity":10,"Intelligence":28},
    "statRecommended": {"Vigor":50,"Mind":29,"Endurance":30,"Strength":35,"Dexterity":35,"Intelligence":35,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Clayman's Harpoon",
        "kind": "weapon"
      },
      {
        "name": "Academy Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Cuckoo Greatshield",
        "kind": "shield"
      },
      {
        "name": "Cuckoo Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Blaidd's Armor",
        "kind": "armor"
      },
      {
        "name": "Cuckoo Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Cuckoo Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "armor high protection and 51+ Poise",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Flexible talisman slot",
        "kind": "talisman"
      },
      {
        "name": "Repeating Thrust",
        "kind": "ash"
      },
      {
        "name": "Impaling Thrust",
        "kind": "ash"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Scholar's Armament",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "hellfire-herald-build-level-100",
    "name": "Hellfire Herald Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Endurance"
    ],
    "summary": "Vigor / Faith build using Iron Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":10,"Faith":25},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":18,"Dexterity":10,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Iron Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Raptor's Black Feathers",
        "kind": "armor"
      },
      {
        "name": "the heaviest you can wear and still med roll",
        "kind": "armor"
      },
      {
        "name": "Royal Knight's Resolve",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Blessing's Boon",
        "kind": "spell"
      },
      {
        "name": "Lightning Spear",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "howling-starfist-build-level-150",
    "name": "Howling Starfist Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Dexterity build using Star Fist.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":9,"Faith":12,"Arcane":10},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":12,"Dexterity":80,"Intelligence":7,"Faith":12,"Arcane":10},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Star Fist",
        "kind": "weapon"
      },
      {
        "name": "Highland Axe",
        "kind": "weapon"
      },
      {
        "name": "Frenzied Flame Seal",
        "kind": "seal"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "Armor with high poise",
        "kind": "armor"
      },
      {
        "name": "Roar Medallion",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Beast's Roar",
        "kind": "ash"
      },
      {
        "name": "Bloodflame Blade",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "inquisitor-build-level-150",
    "name": "Inquisitor Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Dexterity build using Ghiza's Wheel.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":28,"Dexterity":18},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Ghiza's Wheel",
        "kind": "weapon"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Heaviest you can wear and still medium roll",
        "kind": "armor"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      
    ]
  },
  {
    "id": "knight-blade",
    "name": "Knight Blade",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity build using Backhand Blade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":14},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":14,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Backhand Blade",
        "kind": "weapon"
      },
      {
        "name": "Great Turtle Shell",
        "kind": "shield"
      },
      {
        "name": "Black Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      
    ]
  },
  {
    "id": "kung-fu-katarist-build-all-game",
    "name": "Kung Fu Katarist Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Faith build using Katar.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":8,"Dexterity":10,"Faith":40,"Arcane":10,"Intelligence":13},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":10,"Intelligence":13,"Faith":60,"Arcane":10},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Katar",
        "kind": "seal"
      },
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Haligtree Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Blackflame Monk Armor",
        "kind": "armor"
      },
      {
        "name": "Scaled Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Scaled Greaves",
        "kind": "armor"
      },
      {
        "name": "armor high protection and 51+ Poise",
        "kind": "armor"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Flexible talisman slot",
        "kind": "talisman"
      },
      {
        "name": "Impaling Thrust",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Electrify Armament",
        "kind": "spell"
      },
      {
        "name": "Bloodflame Blade",
        "kind": "spell"
      },
      {
        "name": "Order's Blade",
        "kind": "spell"
      },
      {
        "name": "Wrath of Gold",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "lightning-dragoon-build-level-150",
    "name": "Lightning Dragoon Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Dexterity build using Bolt of Gransax.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":34,"Dexterity":40,"Faith":38},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":34,"Dexterity":80,"Intelligence":7,"Faith":38,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Bolt of Gransax",
        "kind": "weapon"
      },
      {
        "name": "Cleanrot Spear",
        "kind": "weapon"
      },
      {
        "name": "Treespear",
        "kind": "weapon"
      },
      {
        "name": "Golden Greatshield",
        "kind": "shield"
      },
      {
        "name": "Consort's Mask",
        "kind": "armor"
      },
      {
        "name": "Leyndell Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Golden Order Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing of the Erdtree",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "lightning-lancer-build-level-100",
    "name": "Lightning Lancer Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Endurance",
      "Strength",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Dexterity"
    ],
    "statTags": [
      "Endurance",
      "Strength",
      "Faith",
      "Mind",
      "Dexterity"
    ],
    "summary": "Endurance / Strength / Faith build using Treespear.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":34,"Dexterity":22,"Faith":25},
    "statRecommended": {"Vigor":60,"Mind":20,"Endurance":25,"Strength":8,"Dexterity":75,"Intelligence":16,"Faith":25,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Treespear",
        "kind": "weapon"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Gravel Stone Seal",
        "kind": "seal"
      },
      {
        "name": "Golden Greatshield",
        "kind": "shield"
      },
      {
        "name": "Brass Shield",
        "kind": "shield"
      },
      {
        "name": "Leyndell Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Sacred Order",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Barricade Shield",
        "kind": "shield"
      },
      {
        "name": "Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Electrify Armament",
        "kind": "spell"
      },
      {
        "name": "Blessing's Boon",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "lord-build-level-150-200-journey-2",
    "name": "Lord Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Dexterity build using Axe of Godfrey.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":42,"Dexterity":14},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Axe of Godfrey",
        "kind": "weapon"
      },
      {
        "name": "Highland Axe",
        "kind": "weapon"
      },
      {
        "name": "Armor that allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Roar Medallion",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      
    ]
  },
  {
    "id": "mad-king-build-level-150-200-journey-2",
    "name": "Mad King Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Dexterity",
      "Arcane"
    ],
    "secondaryStats": [
      "Vigor",
      "Faith"
    ],
    "statTags": [
      "Dexterity",
      "Arcane",
      "Vigor",
      "Faith"
    ],
    "summary": "Dexterity / Arcane build using Morgott's Cursed Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":14,"Dexterity":35,"Arcane":17,"Faith":31},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":14,"Dexterity":80,"Intelligence":7,"Faith":31,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Morgott's Cursed Sword",
        "kind": "weapon"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Frenzied Flame Seal",
        "kind": "seal"
      },
      {
        "name": "Heaviest you can wear and still medium roll",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Swarm of Flies",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Unendurable Frenzy",
        "kind": "spell"
      },
      {
        "name": "Frenzied Burst",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "mage-build-beginner",
    "name": "Mage Build (Beginner)",
    "level": "Beginner",
    "primaryStats": [
      "Mind",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Mind",
      "Intelligence",
      "Vigor",
      "Endurance"
    ],
    "summary": "Mind / Intelligence build using Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Intelligence":27},
    "statRecommended": {"Vigor":50,"Mind":50,"Endurance":30,"Strength":10,"Dexterity":10,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Staff",
        "kind": "staff"
      },
      {
        "name": "melee weapon",
        "kind": "staff"
      },
      {
        "name": "100% Physical Block",
        "kind": "shield"
      },
      {
        "name": "Light Armor",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Glintblade Phalanx",
        "kind": "ash"
      },
      {
        "name": "Glintstone Pebble",
        "kind": "spell"
      },
      {
        "name": "Glintstone Arc",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Great Glintstone Shard",
        "kind": "spell"
      },
      {
        "name": "Carian Slicer",
        "kind": "spell"
      },
      {
        "name": "Carian Piercer",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "magic-archer-build-level-50",
    "name": "Magic Archer Build (Level 50)",
    "level": "Level 50",
    "primaryStats": [
      "Vigor",
      "Strength"
    ],
    "secondaryStats": [
      "Endurance",
      "Intelligence"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Endurance",
      "Intelligence"
    ],
    "summary": "Vigor / Strength build using Horn Bow.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":14,"Intelligence":12},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":14,"Intelligence":16,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Horn Bow",
        "kind": "weapon"
      },
      {
        "name": "Misbegotten Shortbow",
        "kind": "weapon"
      },
      {
        "name": "Heaviest you can and still med roll",
        "kind": "armor"
      },
      {
        "name": "Rain of Arrows",
        "kind": "ash"
      },
      {
        "name": "Mighty Shot",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "magic-dragonknight-build-level-150",
    "name": "Magic Dragonknight Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Arcane"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Arcane",
      "Vigor",
      "Endurance"
    ],
    "summary": "Arcane build using Ripple Blade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Dexterity":14,"Arcane":20,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":20,"Dexterity":14,"Intelligence":7,"Faith":25,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Ripple Blade",
        "kind": "weapon"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Silver Tear Mask",
        "kind": "armor"
      },
      {
        "name": "other Armor good Poise",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flock's Canvas Talisman",
        "kind": "talisman"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Smarag's Glintstone Breath",
        "kind": "spell"
      },
      {
        "name": "Agheel's Flame",
        "kind": "spell"
      },
      {
        "name": "Borealis's Mist",
        "kind": "spell"
      },
      {
        "name": "Ekzyke's Decay",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "magma-blade",
    "name": "Magma Blade",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Mind",
      "Endurance",
      "Dexterity"
    ],
    "summary": "Vigor / Strength build using Magma Blade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":36,"Dexterity":15,"Faith":40},
    "statRecommended": {"Vigor":50,"Mind":20,"Endurance":38,"Strength":10,"Dexterity":85,"Intelligence":16,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Magma Blade",
        "kind": "weapon"
      },
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "One-Eyed Shield",
        "kind": "shield"
      },
      {
        "name": "Fire Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Fire Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Scaled Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Scaled Greaves",
        "kind": "armor"
      },
      {
        "name": "Talisman of the Dread",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Any Drake Knight weapon",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "magus-build-level-50",
    "name": "Magus Build (Level 50)",
    "level": "Level 50",
    "primaryStats": [
      "Dexterity",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Dexterity",
      "Intelligence",
      "Vigor"
    ],
    "summary": "Dexterity / Intelligence build using Rapier.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":7,"Dexterity":12,"Intelligence":24},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":10,"Dexterity":80,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Rapier",
        "kind": "weapon"
      },
      {
        "name": "Carian Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Glintblade Phalanx",
        "kind": "ash"
      },
      {
        "name": "Scholar's Armament",
        "kind": "spell"
      },
      {
        "name": "Carian Greatsword",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "maternal-mage",
    "name": "Maternal Mage",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Intelligence build using Carian Regal Scepter.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":8,"Dexterity":10,"Intelligence":60},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":10,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Maternal Staff",
        "kind": "staff"
      },
      {
        "name": "High Priest Hat",
        "kind": "armor"
      },
      {
        "name": "Finger Maiden Robe",
        "kind": "armor"
      },
      {
        "name": "Bull-Goat Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Bull-Goat Greaves",
        "kind": "armor"
      },
      {
        "name": "Crusade Insignia",
        "kind": "talisman"
      },
      {
        "name": "Blessed Blue Dew Talisman",
        "kind": "talisman"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Glintstone Nail",
        "kind": "spell"
      },
      {
        "name": "Glintstone Nails",
        "kind": "spell"
      },
      {
        "name": "Fleeting Microcosm",
        "kind": "spell"
      },
      {
        "name": "Cherishing Fingers",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "messmer-flame",
    "name": "Messmer Flame",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Mind",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Faith build using Fire Knight's Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":30,"Strength":35,"Dexterity":34,"Intelligence":17,"Faith":25,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Fire Knight's Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Fire Knight's Seal",
        "kind": "seal"
      },
      {
        "name": "Messmer's Helm",
        "kind": "armor"
      },
      {
        "name": "Fire Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Fire Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Fire Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Fire Serpent",
        "kind": "spell"
      },
      {
        "name": "Messmer's Orb",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "meteor-mage-build-level-150",
    "name": "Meteor Mage Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence build using Carian Regal Scepter.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":8,"Dexterity":10,"Intelligence":60},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":10,"Dexterity":10,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Meteorite Staff",
        "kind": "staff"
      },
      {
        "name": "Frenzied Flame Seal",
        "kind": "seal"
      },
      {
        "name": "Light Armor",
        "kind": "armor"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "talisman"
      },
      {
        "name": "Spinning Weapon",
        "kind": "ash"
      },
      {
        "name": "Collapsing Stars",
        "kind": "spell"
      },
      {
        "name": "Gravity Well",
        "kind": "spell"
      },
      {
        "name": "Rock Sling",
        "kind": "spell"
      },
      {
        "name": "Meteorite",
        "kind": "spell"
      },
      {
        "name": "Meteorite of Astel",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "meteoric-marauder",
    "name": "Meteoric Marauder",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Endurance",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Arcane"
    ],
    "statTags": [
      "Vigor",
      "Endurance",
      "Strength",
      "Mind",
      "Arcane"
    ],
    "summary": "Vigor / Endurance / Strength build using Ancient Meteoric Ore Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":50,"Mind":20,"Endurance":40,"Strength":12,"Dexterity":80,"Intelligence":16,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Ancient Meteoric Ore Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Greathelm",
        "kind": "armor"
      },
      {
        "name": "Black Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Black Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Black Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Two-Handed Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Euporia",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "moonlight-crusader-build-level-150",
    "name": "Moonlight Crusader Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence build using Dark Moon Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":11,"Intelligence":68},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":16,"Dexterity":11,"Intelligence":68,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Dark Moon Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Heaviest you can wear and still medium roll",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Ranni's Dark Moon",
        "kind": "spell"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Comet",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "moonveil-resurrected",
    "name": "Moonveil Resurrected",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Endurance",
      "Dexterity"
    ],
    "summary": "Vigor / Intelligence build using Moonveil.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":18,"Intelligence":23},
    "statRecommended": {"Vigor":50,"Mind":25,"Endurance":25,"Strength":12,"Dexterity":83,"Intelligence":16,"Faith":25,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Moonveil",
        "kind": "weapon"
      },
      {
        "name": "Okina Mask",
        "kind": "armor"
      },
      {
        "name": "Nox Swordstress Armor",
        "kind": "armor"
      },
      {
        "name": "All-Knowing Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Nox Greaves",
        "kind": "armor"
      },
      {
        "name": "Rellana's Cameo",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Transient Moonlight",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "moonveil-samurai-build-level-50",
    "name": "Moonveil Samurai Build (Level 50)",
    "level": "Level 50",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Dexterity"
    ],
    "summary": "Vigor / Intelligence build using Moonveil.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":18,"Intelligence":26},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":20,"Strength":12,"Dexterity":20,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Moonveil",
        "kind": "weapon"
      },
      {
        "name": "Land of Reeds Armor",
        "kind": "armor"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Carian Greatsword",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "moonveil-shinobi-build-level-100",
    "name": "Moonveil Shinobi Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Dexterity"
    ],
    "summary": "Vigor / Intelligence build using Moonveil.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":18,"Intelligence":26},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":20,"Strength":12,"Dexterity":20,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Moonveil",
        "kind": "weapon"
      },
      {
        "name": "Uchigatana",
        "kind": "weapon"
      },
      {
        "name": "that can still med roll",
        "kind": "armor"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Moonveil",
        "kind": "weapon"
      },
      {
        "name": "Carian Knight's Sword",
        "kind": "weapon"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Great Glintstone Shard",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "nebula-knight-build-level-150",
    "name": "Nebula Knight Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Dexterity",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Dexterity",
      "Intelligence",
      "Vigor",
      "Endurance"
    ],
    "summary": "Dexterity / Intelligence build using Wing of Astel and Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":10,"Dexterity":22,"Intelligence":22},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":10,"Dexterity":80,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Wing of Astel",
        "kind": "staff"
      },
      {
        "name": "Carian Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "Scaled Armor",
        "kind": "armor"
      },
      {
        "name": "Armor high Poise",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Bastard's Stars",
        "kind": "weapon"
      },
      {
        "name": "Scholar's Shield",
        "kind": "shield"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "nightclaw",
    "name": "Nightclaw",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Intelligence"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance",
      "Intelligence"
    ],
    "summary": "Vigor / Dexterity build using Claws of Night.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":35,"Strength":80,"Dexterity":12,"Intelligence":16,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Claws of Night",
        "kind": "weapon"
      },
      {
        "name": "Messmer Soldier Shield",
        "kind": "shield"
      },
      {
        "name": "Leda's Armor",
        "kind": "armor"
      },
      {
        "name": "Black Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Black Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Black Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Smithing Talisman",
        "kind": "talisman"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Scattershot Throw",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "noble-swordsman-build-all-game",
    "name": "Noble Swordsman Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Mind",
      "Dexterity"
    ],
    "secondaryStats": [
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Mind",
      "Dexterity",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Mind / Dexterity build using Noble's Slender Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":10,"Dexterity":11},
    "statRecommended": {"Vigor":50,"Mind":22,"Endurance":25,"Strength":14,"Dexterity":18},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Noble's Slender Sword",
        "kind": "weapon"
      },
      {
        "name": "Lordsworn's Straight Sword",
        "kind": "weapon"
      },
      {
        "name": "Aristocrat Hat",
        "kind": "armor"
      },
      {
        "name": "Page Garb",
        "kind": "armor"
      },
      {
        "name": "Perfumer Gloves",
        "kind": "armor"
      },
      {
        "name": "Page Trousers",
        "kind": "armor"
      },
      {
        "name": "Blue Dancer Charm",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Square Off",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "paladin-build-beginner",
    "name": "Paladin Build (Beginner)",
    "level": "Beginner",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Faith build using one-handed and a Sacred Seal.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Faith":12},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":25,"Dexterity":10,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "one-handed and a Sacred Seal",
        "kind": "seal"
      },
      {
        "name": "Brass Shield",
        "kind": "shield"
      },
      {
        "name": "The heaviest you can wear and still mid-roll",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Barricade Shield",
        "kind": "ash"
      },
      {
        "name": "Ash of War: Golden Vow",
        "kind": "ash"
      },
      {
        "name": "Urgent Heal",
        "kind": "spell"
      },
      {
        "name": "Heal",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "perfect-paladin-build-all-levels",
    "name": "Perfect Paladin Build (All Levels)",
    "level": "All Game",
    "primaryStats": [
      "Strength",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Faith",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Faith build using Miquellan Knight's Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":36,"Dexterity":11,"Faith":38},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":11,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Miquellan Knight's Sword",
        "kind": "weapon"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Haligtree Crest Greatshield",
        "kind": "shield"
      },
      {
        "name": "Haligtree Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Sacred Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Sacred Blade",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Blessing of the Erdtree",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "piercing-paladin",
    "name": "Piercing Paladin",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance",
      "Faith"
    ],
    "summary": "Vigor / Dexterity build using Leda's Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Intelligence":17,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":25,"Endurance":31,"Strength":53,"Dexterity":23,"Faith":25},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Leda's Sword",
        "kind": "weapon"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "Carian Thrusting Shield",
        "kind": "shield"
      },
      {
        "name": "Oathseeker Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Leda's Armor",
        "kind": "armor"
      },
      {
        "name": "Black Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Black Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Swift Spear",
        "kind": "weapon"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "pyromancer-build-level-150-200-journey-2",
    "name": "Pyromancer Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Mind",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Mind",
      "Faith",
      "Vigor"
    ],
    "summary": "Mind / Faith build using Erdtree Seal.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":41,"Strength":4},
    "statRecommended": {"Vigor":50,"Mind":50,"Endurance":20,"Strength":10,"Dexterity":10,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Giant's Seal",
        "kind": "seal"
      },
      {
        "name": "Light Armor so you can Light Roll",
        "kind": "armor"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Burn, O Flame!",
        "kind": "spell"
      },
      {
        "name": "Flame of the Fell God",
        "kind": "spell"
      },
      {
        "name": "Flame, Fall Upon Them",
        "kind": "spell"
      },
      {
        "name": "Giantsflame Take Thee",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "pyromancer-perfumer",
    "name": "Pyromancer Perfumer",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance",
      "Faith"
    ],
    "summary": "Vigor / Dexterity build using Firespark Perfume Bottle.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Intelligence":17,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":35,"Endurance":25,"Strength":24,"Dexterity":12,"Intelligence":16,"Faith":65,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Firespark Perfume Bottle",
        "kind": "seal"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "Perfumer Hood",
        "kind": "armor"
      },
      {
        "name": "Perfumer Robe",
        "kind": "armor"
      },
      {
        "name": "Perfumer Gloves",
        "kind": "armor"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Perfumer's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Quickstep",
        "kind": "ash"
      },
      {
        "name": "Bloodhound's Step",
        "kind": "ash"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "red-lightning-build-level-150-200-journey-2",
    "name": "Red Lightning Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Faith"
    ],
    "secondaryStats": [
      "Mind"
    ],
    "statTags": [
      "Vigor",
      "Faith",
      "Mind"
    ],
    "summary": "Vigor / Faith build using Erdtree Seal.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":40,"Strength":4},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":20,"Strength":10,"Dexterity":10,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Gravel Stone Seal",
        "kind": "seal"
      },
      {
        "name": "Armor that allows you to medium roll.",
        "kind": "armor"
      },
      {
        "name": "Lightning Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flock's Canvas Talisman",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Lightning Strike",
        "kind": "spell"
      },
      {
        "name": "Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Lansseax's Glaive",
        "kind": "spell"
      },
      {
        "name": "Frozen Lightning Spear",
        "kind": "spell"
      },
      {
        "name": "Ancient Dragons' Lightning Strike",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "red-rogue-all-game",
    "name": "Red Rogue (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Endurance",
      "Arcane"
    ],
    "secondaryStats": [
      "Mind",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Endurance",
      "Arcane",
      "Mind",
      "Dexterity"
    ],
    "summary": "Vigor / Endurance / Arcane build using Reduvia.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":5,"Dexterity":13,"Arcane":13},
    "statRecommended": {"Vigor":50,"Mind":22,"Endurance":30,"Strength":8,"Dexterity":25,"Intelligence":16,"Faith":7,"Arcane":80},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Reduvia",
        "kind": "weapon"
      },
      {
        "name": "Skeletal Mask",
        "kind": "armor"
      },
      {
        "name": "Nox Swordstress Armor",
        "kind": "armor"
      },
      {
        "name": "Scaled Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Nox Greaves",
        "kind": "armor"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      
    ]
  },
  {
    "id": "rime-ronin-build-all-game",
    "name": "Rime Ronin Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Dexterity",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Dexterity",
      "Intelligence",
      "Vigor"
    ],
    "summary": "Dexterity / Intelligence build using Nagakiba.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":22},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":18,"Dexterity":80,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Nagakiba",
        "kind": "weapon"
      },
      {
        "name": "Black Bow",
        "kind": "weapon"
      },
      {
        "name": "Zamor Armor",
        "kind": "armor"
      },
      {
        "name": "that allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Chilling Mist",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "rime-ronin-build-all-levels",
    "name": "Rime Ronin Build (All Levels)",
    "level": "All Game",
    "primaryStats": [
      "Dexterity",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Dexterity",
      "Intelligence",
      "Vigor"
    ],
    "summary": "Dexterity / Intelligence build using Nagakiba.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":22},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":18,"Dexterity":80,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Nagakiba",
        "kind": "weapon"
      },
      {
        "name": "Black Bow",
        "kind": "weapon"
      },
      {
        "name": "Zamor Armor",
        "kind": "armor"
      },
      {
        "name": "that allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Chilling Mist",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "royal-knight-build-level-150",
    "name": "Royal Knight Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Intelligence",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Intelligence build using Royal Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":32,"Dexterity":18,"Intelligence":22},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":18,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Royal Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Clayman's Harpoon",
        "kind": "weapon"
      },
      {
        "name": "Eclipse Crest Greatshield",
        "kind": "shield"
      },
      {
        "name": "Haima Glintstone Crown",
        "kind": "armor"
      },
      {
        "name": "that still allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Ice Spear",
        "kind": "ash"
      },
      {
        "name": "Scholar's Shield",
        "kind": "shield"
      }
    ]
  },
  {
    "id": "samurai-build-beginner",
    "name": "Samurai Build (Beginner)",
    "level": "Beginner",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity build using Uchigatana and Longbow.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":11,"Dexterity":15},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":11,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Uchigatana",
        "kind": "weapon"
      },
      {
        "name": "Land of Reeds Armor",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Unsheathe",
        "kind": "ash"
      },
      {
        "name": "Ash of War: Mighty Shot",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "samurai-sniper-all-game",
    "name": "Samurai Sniper (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance",
      "Faith"
    ],
    "summary": "Vigor / Dexterity build.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":25,"Strength":10,"Dexterity":50,"Intelligence":50,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Okina Mask",
        "kind": "armor"
      },
      {
        "name": "Ronin's Armor",
        "kind": "armor"
      },
      {
        "name": "Redmane Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Ronin's Greaves",
        "kind": "armor"
      },
      {
        "name": "Arrow's Sting Talisman",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      {
        "name": "Lightning Slash",
        "kind": "ash"
      },
      {
        "name": "Mighty Shot",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "sanguine-samurai-build-level-150",
    "name": "Sanguine Samurai Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Dexterity",
      "Arcane"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Dexterity",
      "Arcane",
      "Vigor",
      "Mind"
    ],
    "summary": "Dexterity / Arcane build using Rivers of Blood.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":18,"Arcane":20,"Faith":15},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":16,"Dexterity":80,"Intelligence":7,"Faith":15,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Rivers of Blood",
        "kind": "weapon"
      },
      {
        "name": "Sacrificial Axe",
        "kind": "weapon"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "Okina Mask",
        "kind": "armor"
      },
      {
        "name": "Armor that allows med roll",
        "kind": "armor"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Rivers of Blood",
        "kind": "weapon"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "sanguine-spellblade-build-level-150-200-journey-2",
    "name": "Sanguine Spellblade Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Intelligence",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Intelligence",
      "Faith"
    ],
    "summary": "Vigor / Arcane build using Albinauric Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":8,"Intelligence":16,"Arcane":12,"Faith":38,"Dexterity":17},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":20,"Strength":10,"Dexterity":17,"Intelligence":16,"Faith":38,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Albinauric Staff",
        "kind": "staff"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Staff of the Guilty",
        "kind": "staff"
      },
      {
        "name": "Rogier's Rapier",
        "kind": "weapon"
      },
      {
        "name": "Alberich's Robe",
        "kind": "armor"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Taker's Cameo",
        "kind": "talisman"
      },
      {
        "name": "Seppuku",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Blessing of the Erdtree",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Unseen Form",
        "kind": "spell"
      },
      {
        "name": "Briars of Punishment",
        "kind": "spell"
      },
      {
        "name": "Briars of Sin",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "savage-slasher",
    "name": "Savage Slasher",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Arcane"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Arcane",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Arcane build using Great Katana.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":10,"Intelligence":7,"Faith":7,"Arcane":45},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Great Katana",
        "kind": "weapon"
      },
      {
        "name": "Oathseeker Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Savage Lion's Claw",
        "kind": "ash"
      },
      {
        "name": "Any dual-wield axes",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "scarlet-spear-build-level-150-200-journey-2",
    "name": "Scarlet Spear Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity build using Rotten Crystal Spear.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":10,"Dexterity":16,"Intelligence":16},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":10,"Dexterity":80,"Intelligence":16,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Rotten Crystal Spear",
        "kind": "weapon"
      },
      {
        "name": "Coil Shield",
        "kind": "shield"
      },
      {
        "name": "Redmane Knight Armor",
        "kind": "armor"
      },
      {
        "name": "armor high protection and 51+ Poise",
        "kind": "armor"
      },
      {
        "name": "Kindred of Rot's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Charge Forth",
        "kind": "ash"
      },
      {
        "name": "Venomous Fang",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "scorching-slayer-build-level-100",
    "name": "Scorching Slayer Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Vigor",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Strength build using Gargoyle's Twinblade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":15,"Faith":15,"Arcane":10},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":54,"Dexterity":15,"Intelligence":7,"Faith":15,"Arcane":10},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Gargoyle's Twinblade",
        "kind": "weapon"
      },
      {
        "name": "Sacred Seal",
        "kind": "seal"
      },
      {
        "name": "that can still med roll",
        "kind": "armor"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flame of the Redmanes",
        "kind": "ash"
      },
      {
        "name": "Bloodflame Blade",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Electrify Armament",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "serpent-samurai-build-level-150",
    "name": "Serpent Samurai Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity build using Serpentbone Blade.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":11,"Dexterity":22},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":11,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Serpentbone Blade",
        "kind": "weapon"
      },
      {
        "name": "Uchigatana",
        "kind": "weapon"
      },
      {
        "name": "Mushroom Crown",
        "kind": "armor"
      },
      {
        "name": "high Poise Armor",
        "kind": "armor"
      },
      {
        "name": "Kindred of Rot's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Double Slash",
        "kind": "ash"
      },
      {
        "name": "Poison Moth Flight",
        "kind": "ash"
      },
      {
        "name": "Parry",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "shadow-sunflower-blossom",
    "name": "Shadow Sunflower Blossom",
    "level": "SOTE",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Faith"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Faith",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Strength / Faith build using Shadow Sunflower Blossom.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":4,"Faith":50},
    "statRecommended": {"Vigor":50,"Mind":35,"Endurance":25,"Strength":8,"Dexterity":14,"Intelligence":16,"Faith":80,"Arcane":10},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Pumpkin Helm",
        "kind": "armor"
      },
      {
        "name": "Raptor's Black Feathers",
        "kind": "armor"
      },
      {
        "name": "Radahn's Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Radahn's Greaves",
        "kind": "armor"
      },
      {
        "name": "Two-Handed Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Blade of Mercy",
        "kind": "talisman"
      },
      {
        "name": "Shadow Sunflower Blossom",
        "kind": "armor"
      },
      {
        "name": "Elden Stars",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "shadowblade-shadow",
    "name": "Shadowblade Shadow",
    "level": "SOTE",
    "primaryStats": [
      "Vigor",
      "Dexterity",
      "Arcane"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Arcane",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity / Arcane build using Smithscript Dagger.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":50,"Mind":20,"Endurance":30,"Strength":12,"Dexterity":55,"Intelligence":16,"Faith":7,"Arcane":50},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Smithscript Dagger",
        "kind": "weapon"
      },
      {
        "name": "Shadow Militiaman Helm",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Smithing Talisman",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Crusade Insignia",
        "kind": "talisman"
      },
      {
        "name": "Scattershot Throw",
        "kind": "ash"
      },
      {
        "name": "Piercing Throw",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "silent-spearcaller-build-level-150-200-journey-2",
    "name": "Silent Spearcaller Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Intelligence build using Death Ritual Spear.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":14,"Dexterity":20,"Intelligence":60},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":14,"Dexterity":20,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Death Ritual Spear",
        "kind": "weapon"
      },
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Staff of Loss",
        "kind": "staff"
      },
      {
        "name": "Black Knife Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Unseen Form",
        "kind": "spell"
      },
      {
        "name": "Night Comet",
        "kind": "spell"
      },
      {
        "name": "Night Shard",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "slumbering-swordstress-build-level-150-200-journey-2",
    "name": "Slumbering Swordstress Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Dexterity build using Sword of St. Trina.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":10,"Dexterity":12,"Intelligence":14},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":80,"Intelligence":14,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Sword of St. Trina",
        "kind": "weapon"
      },
      {
        "name": "light armor that allows you to light roll",
        "kind": "armor"
      },
      {
        "name": "Ancestral Spirit's Horn",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      
    ]
  },
  {
    "id": "sorcerer-build",
    "name": "Sorcerer Build",
    "level": "General",
    "primaryStats": [
      "Mind",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "statTags": [
      "Mind",
      "Intelligence",
      "Vigor",
      "Dexterity"
    ],
    "summary": "Mind / Intelligence build using Meteorite Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":6,"Intelligence":26},
    "statRecommended": {"Vigor":50,"Mind":50,"Endurance":20,"Strength":10,"Dexterity":20,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Meteorite Staff",
        "kind": "staff"
      },
      {
        "name": "100% Physical Block",
        "kind": "shield"
      },
      {
        "name": "Queen's Crescent Crown",
        "kind": "armor"
      },
      {
        "name": "the heaviest Armor you can wear and still med roll",
        "kind": "armor"
      },
      {
        "name": "Determination",
        "kind": "ash"
      },
      {
        "name": "Glintstone Pebble",
        "kind": "spell"
      },
      {
        "name": "Glintstone Arc",
        "kind": "spell"
      },
      {
        "name": "Great Glintstone Shard",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Rock Sling",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "sorcery-sentinel-build-level-150",
    "name": "Sorcery Sentinel Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Dexterity build using Watchdog's Staff.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":34,"Dexterity":10,"Faith":15},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":80,"Intelligence":7,"Faith":15,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Watchdog's Staff",
        "kind": "staff"
      },
      {
        "name": "Sacred Seal",
        "kind": "seal"
      },
      {
        "name": "that still allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Staff of the Great Beyond",
        "kind": "staff"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "soul-samurai-build-level-150-200-journey-2",
    "name": "Soul Samurai Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Dexterity",
      "Intelligence"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Dexterity",
      "Intelligence",
      "Vigor",
      "Mind"
    ],
    "summary": "Dexterity / Intelligence build using Nagakiba.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":22,"Intelligence":52},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":18,"Dexterity":80,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Nagakiba",
        "kind": "weapon"
      },
      {
        "name": "Academy Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Black Knife Armor",
        "kind": "armor"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Double Slash",
        "kind": "ash"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "spell"
      },
      {
        "name": "Founding Rain of Stars",
        "kind": "spell"
      },
      {
        "name": "Unseen Form",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Carian Retaliation",
        "kind": "ash"
      },
      {
        "name": "Scholar's Armament",
        "kind": "spell"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Icerind Hatchet",
        "kind": "weapon"
      }
    ]
  },
  {
    "id": "spellblade-build",
    "name": "Spellblade Build",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Dexterity"
    ],
    "summary": "Vigor / Intelligence build using Demi-Human Queen's Staff and Estoc.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":7,"Intelligence":14,"Dexterity":12},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":20,"Strength":10,"Dexterity":20,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Demi-Human Queen's Staff",
        "kind": "staff"
      },
      {
        "name": "Rapier",
        "kind": "weapon"
      },
      {
        "name": "100% Physical",
        "kind": "shield"
      },
      {
        "name": "Armor pieces that increase Intelligence",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Impaling Thrust",
        "kind": "ash"
      },
      {
        "name": "Scholar's Armament",
        "kind": "spell"
      },
      {
        "name": "Carian Slicer",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "spellsword-build-all-game",
    "name": "Spellsword Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Strength / Intelligence build using Claymore.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":13,"Intelligence":28},
    "statRecommended": {"Vigor":50,"Mind":25,"Endurance":25,"Strength":12,"Dexterity":8,"Intelligence":50,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Claymore",
        "kind": "weapon"
      },
      {
        "name": "Academy Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Carian Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Blue Silver Mail Armor",
        "kind": "armor"
      },
      {
        "name": "Black Knife Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Black Knife Greaves",
        "kind": "armor"
      },
      {
        "name": "armor high protection and 51+ Poise",
        "kind": "armor"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flexible talisman slot",
        "kind": "talisman"
      },
      {
        "name": "Carian Knight's Sword",
        "kind": "weapon"
      },
      {
        "name": "Scholar's Armament",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "spellthief-new-game-build",
    "name": "Spellthief (New Game + Build)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Dexterity",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity / Intelligence build using Glintstone Kris.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":10,"Dexterity":12,"Intelligence":17},
    "statRecommended": {"Vigor":25,"Mind":10,"Endurance":12,"Strength":25,"Dexterity":20,"Intelligence":10,"Faith":10,"Arcane":7},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Glintstone Kris",
        "kind": "weapon"
      },
      {
        "name": "Carian Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "Spellblade's Pointed Hat",
        "kind": "armor"
      },
      {
        "name": "Black Knife Armor",
        "kind": "armor"
      },
      {
        "name": "Spellblade's Gloves",
        "kind": "armor"
      },
      {
        "name": "Spellblade's Trousers",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "talisman"
      },
      {
        "name": "Carian Retaliation",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "star-lined-samurai",
    "name": "Star-Lined Samurai",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity build using Star-Lined Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Intelligence":12},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":80,"Intelligence":12,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Star-Lined Sword",
        "kind": "weapon"
      },
      {
        "name": "Wolf Crest Shield",
        "kind": "shield"
      },
      {
        "name": "Iron Kasa",
        "kind": "armor"
      },
      {
        "name": "Tree Surcoat",
        "kind": "armor"
      },
      {
        "name": "White Reed Gauntlets",
        "kind": "armor"
      },
      {
        "name": "White Reed Greaves",
        "kind": "armor"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Scholar's Shield",
        "kind": "shield"
      }
    ]
  },
  {
    "id": "starscourge-build-level-150-200-journey-2",
    "name": "Starscourge Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Endurance",
      "Strength"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Endurance",
      "Strength",
      "Vigor",
      "Mind"
    ],
    "summary": "Endurance / Strength build using Starscourge Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":38,"Dexterity":12,"Intelligence":15},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":40,"Strength":54,"Dexterity":12,"Intelligence":15,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Starscourge Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Sacrificial Axe",
        "kind": "weapon"
      },
      {
        "name": "General Radahn Armor",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      
    ]
  },
  {
    "id": "storm-arrow",
    "name": "Storm Arrow",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance",
      "Strength"
    ],
    "summary": "Vigor / Dexterity build using Ansbach's Longbow.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":7,"Dexterity":18},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":25,"Strength":55,"Dexterity":45},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Ansbach's Longbow",
        "kind": "weapon"
      },
      {
        "name": "Albinauric Bow",
        "kind": "weapon"
      },
      {
        "name": "Lamenter's Mask",
        "kind": "armor"
      },
      {
        "name": "Blue Dancer Charm",
        "kind": "talisman"
      },
      {
        "name": "Arrow's Sting Talisman",
        "kind": "talisman"
      },
      {
        "name": "Arrow's Soaring Sting Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Smithscript Shield",
        "kind": "shield"
      },
      {
        "name": "Mighty Shot",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "storm-blessed",
    "name": "Storm Blessed",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Dexterity"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Mind",
      "Endurance",
      "Dexterity"
    ],
    "summary": "Vigor / Strength build using Messmer Soldier's Spear.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":60,"Mind":35,"Endurance":31,"Strength":53,"Dexterity":23},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Messmer Soldier's Spear",
        "kind": "weapon"
      },
      {
        "name": "Messmer Soldier Shield",
        "kind": "shield"
      },
      {
        "name": "St. Trina's Blossom",
        "kind": "armor"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Two-Handed Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Royal Knight's Resolve",
        "kind": "ash"
      },
      {
        "name": "Storm Wall",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "stormblade-build-all-levels",
    "name": "Stormblade Build (All Levels)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity build using Flamberge.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":15,"Dexterity":14,"Faith":25,"Arcane":10},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":15,"Dexterity":80,"Intelligence":7,"Faith":25,"Arcane":10},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Flamberge",
        "kind": "weapon"
      },
      {
        "name": "Armor that allows you to medium roll.",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Storm Blade",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Electrify Armament",
        "kind": "spell"
      },
      {
        "name": "Bloodflame Blade",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "stormblade-samurai",
    "name": "Stormblade Samurai",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance",
      "Intelligence"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance",
      "Intelligence"
    ],
    "summary": "Vigor / Dexterity build using Great Katana.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":15,"Dexterity":14},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":15,"Dexterity":80,"Intelligence":16,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Great Katana",
        "kind": "weapon"
      },
      {
        "name": "Great Turtle Shell",
        "kind": "shield"
      },
      {
        "name": "Divine Beast Helm",
        "kind": "armor"
      },
      {
        "name": "Divine Beast Warrior Armor",
        "kind": "armor"
      },
      {
        "name": "Horned Warrior Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Blaidd's Greaves",
        "kind": "armor"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Crusade Insignia",
        "kind": "talisman"
      },
      {
        "name": "Blessed Blue Dew Talisman",
        "kind": "talisman"
      },
      {
        "name": "Flamberge",
        "kind": "weapon"
      },
      {
        "name": "Storm Blade",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "supreme-samurai-build-all-game",
    "name": "Supreme Samurai Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity build using Nagakiba.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":18,"Dexterity":22},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":18,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Nagakiba",
        "kind": "weapon"
      },
      {
        "name": "Nox Swordstress Armor",
        "kind": "armor"
      },
      {
        "name": "White Reed Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Ronin's Greaves",
        "kind": "armor"
      },
      {
        "name": "Iron Kasa",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "talisman"
      },
      {
        "name": "Unsheathe",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "sword-sage-build-level-50",
    "name": "Sword Sage Build (Level 50)",
    "level": "Level 50",
    "primaryStats": [
      "Intelligence",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Mind"
    ],
    "statTags": [
      "Intelligence",
      "Faith",
      "Vigor",
      "Mind"
    ],
    "summary": "Intelligence / Faith build using Sword of Night and Flame.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":12,"Dexterity":12,"Intelligence":34,"Faith":24},
    "statRecommended": {"Vigor":50,"Mind":30,"Endurance":20,"Strength":12,"Dexterity":12,"Intelligence":60,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Sword of Night and Flame",
        "kind": "weapon"
      },
      {
        "name": "Meteorite Staff",
        "kind": "staff"
      },
      {
        "name": "that still lets you med roll",
        "kind": "armor"
      },
      {
        "name": "Rancorcall",
        "kind": "spell"
      },
      {
        "name": "Ancient Death Rancor",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "sword-saint-build-level-150-200-journey-2",
    "name": "Sword Saint Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Dexterity",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor",
      "Strength"
    ],
    "statTags": [
      "Dexterity",
      "Faith",
      "Vigor",
      "Strength"
    ],
    "summary": "Dexterity / Faith build using Sacred Relic Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":15,"Dexterity":24,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":25,"Dexterity":80,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Sacred Relic Sword",
        "kind": "weapon"
      },
      {
        "name": "Sword of Milos",
        "kind": "weapon"
      },
      {
        "name": "Sacred Seal",
        "kind": "seal"
      },
      {
        "name": "Armor high Poise",
        "kind": "armor"
      },
      {
        "name": "the higher the better.",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Sacred Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Flexible incantation",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "swordsman-of-st-trina",
    "name": "Swordsman of St. Trina",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Endurance",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Strength"
    ],
    "statTags": [
      "Vigor",
      "Endurance",
      "Dexterity",
      "Mind",
      "Strength"
    ],
    "summary": "Vigor / Endurance / Dexterity build using Velvet Sword of St. Trina.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":30,"Dexterity":10},
    "statRecommended": {"Vigor":50,"Mind":25,"Endurance":30,"Strength":80,"Dexterity":12},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Velvet Sword of St. Trina",
        "kind": "weapon"
      },
      {
        "name": "Lordsworn's Straight Sword",
        "kind": "weapon"
      },
      {
        "name": "Crossed-Tree Towershield",
        "kind": "shield"
      },
      {
        "name": "St. Trina's Blossom",
        "kind": "armor"
      },
      {
        "name": "Scaled Armor",
        "kind": "armor"
      },
      {
        "name": "Scaled Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Scaled Greaves",
        "kind": "armor"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Blade of Mercy",
        "kind": "talisman"
      },
      {
        "name": "Dagger Talisman",
        "kind": "talisman"
      },
      {
        "name": "St. Trina's Smile",
        "kind": "talisman"
      },
      {
        "name": "Square Off",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "templar-build-level-50-paladin",
    "name": "Templar Build (Level 50 Paladin)",
    "level": "Level 50",
    "primaryStats": [
      "Endurance",
      "Faith"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Endurance",
      "Faith",
      "Vigor"
    ],
    "summary": "Endurance / Faith build using Noble's Slender Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":11,"Faith":27},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":40,"Strength":16,"Dexterity":11,"Intelligence":7,"Faith":60,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Noble's Slender Sword",
        "kind": "weapon"
      },
      {
        "name": "Brass Shield",
        "kind": "shield"
      },
      {
        "name": "Mausoleum Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Greathelm",
        "kind": "armor"
      },
      {
        "name": "Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Golden Vow",
        "kind": "ash"
      },
      {
        "name": "Ash of War: Sacred Blade",
        "kind": "ash"
      },
      {
        "name": "Ash of War: Barricade Shield",
        "kind": "ash"
      },
      {
        "name": "Blessing's Boon",
        "kind": "spell"
      },
      {
        "name": "Aspects of the Crucible: Tail",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "thundering-swordspear-build-level-100",
    "name": "Thundering Swordspear Build (Level 100)",
    "level": "Level 100",
    "primaryStats": [
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor"
    ],
    "statTags": [
      "Dexterity",
      "Vigor"
    ],
    "summary": "Dexterity build using Guardian's Swordspear.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":20,"Dexterity":16,"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":20,"Strength":20,"Dexterity":80,"Intelligence":7,"Faith":25,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Guardian's Swordspear",
        "kind": "seal"
      },
      {
        "name": "Finger Seal",
        "kind": "seal"
      },
      {
        "name": "Banished Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Greathelm",
        "kind": "armor"
      },
      {
        "name": "Tree Surcoat",
        "kind": "armor"
      },
      {
        "name": "Chain Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Chain Leggings",
        "kind": "armor"
      },
      {
        "name": "Lightning Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "talisman"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Shield Talisman +1",
        "kind": "talisman"
      },
      {
        "name": "Thunderbolt",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      },
      {
        "name": "Electrify Armament",
        "kind": "spell"
      },
      {
        "name": "Blessing's Boon",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "tower-knight-all-game",
    "name": "Tower Knight (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Endurance",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Dexterity",
      "Intelligence"
    ],
    "statTags": [
      "Vigor",
      "Endurance",
      "Strength",
      "Mind",
      "Dexterity",
      "Intelligence"
    ],
    "summary": "Vigor / Endurance / Strength build using Morning Star.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":30,"Dexterity":8,"Faith":15},
    "statRecommended": {"Vigor":55,"Mind":25,"Endurance":50,"Strength":66,"Dexterity":16,"Intelligence":16,"Faith":7,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Morning Star",
        "kind": "weapon"
      },
      {
        "name": "Manor Towershield",
        "kind": "shield"
      },
      {
        "name": "Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Axe Talisman",
        "kind": "talisman"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Cragblade",
        "kind": "ash"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "twin-axe-death-knight",
    "name": "Twin Axe Death Knight",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Mind",
      "Strength"
    ],
    "secondaryStats": [
      "Endurance",
      "Dexterity",
      "Faith"
    ],
    "statTags": [
      "Vigor",
      "Mind",
      "Strength",
      "Endurance",
      "Dexterity",
      "Faith"
    ],
    "summary": "Vigor / Mind / Strength build using Death Knight's Twin Axes.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Faith":25},
    "statRecommended": {"Vigor":50,"Mind":40,"Endurance":28,"Strength":12,"Dexterity":12,"Intelligence":50,"Faith":50,"Arcane":9},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Death Knight's Twin Axes",
        "kind": "weapon"
      },
      {
        "name": "Death Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Death Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Death Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Malformed Dragon Greaves",
        "kind": "armor"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "vampiric-knight-build-level-150-200-journey-2",
    "name": "Vampiric Knight Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity build using Butchering Knife.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":22},
    "statRecommended": {"Vigor":60,"Mind":15,"Endurance":30,"Strength":22,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Bonny Butchering Knife",
        "kind": "weapon"
      },
      {
        "name": "Icon Shield",
        "kind": "shield"
      },
      {
        "name": "armor high Poise and protection",
        "kind": "armor"
      },
      {
        "name": "the higher the better",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Blessed Dew Talisman",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      }
    ]
  },
  {
    "id": "vanquisher-build-all-game",
    "name": "Vanquisher Build (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind"
    ],
    "statTags": [
      "Vigor",
      "Strength",
      "Dexterity",
      "Mind"
    ],
    "summary": "Vigor / Strength / Dexterity build using Dragon Halberd.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":22,"Dexterity":10,"Faith":15},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":20,"Strength":54,"Dexterity":80,"Intelligence":7,"Faith":15,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Dragon Halberd",
        "kind": "weapon"
      },
      {
        "name": "Gelmir Knight Helm",
        "kind": "armor"
      },
      {
        "name": "Gelmir Knight Armor",
        "kind": "armor"
      },
      {
        "name": "Cuckoo Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Gelmir Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "Spinning Slash",
        "kind": "ash"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "venomous-bloodblade-build-level-150",
    "name": "Venomous Bloodblade Build (Level 150)",
    "level": "Level 150",
    "primaryStats": [
      "Strength",
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Strength",
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Strength / Dexterity build using Scavenger's Curved Sword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":11,"Dexterity":14},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":54,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Scavenger's Curved Sword",
        "kind": "weapon"
      },
      {
        "name": "Bandit's Curved Sword",
        "kind": "weapon"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "Mushroom Crown",
        "kind": "armor"
      },
      {
        "name": "that allows you to med roll",
        "kind": "armor"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Kindred of Rot's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation",
        "kind": "talisman"
      },
      {
        "name": "Poisonous Mist",
        "kind": "ash"
      },
      {
        "name": "Seppuku",
        "kind": "ash"
      }
    ]
  },
  {
    "id": "void-knight",
    "name": "Void Knight",
    "level": "General",
    "primaryStats": [
      "Vigor",
      "Dexterity"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Dexterity",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Dexterity build using Sword of Night.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Sword of Night",
        "kind": "weapon"
      },
      {
        "name": "Shield of Night",
        "kind": "shield"
      },
      {
        "name": "Helm of Night",
        "kind": "armor"
      },
      {
        "name": "Armor of Night",
        "kind": "armor"
      },
      {
        "name": "Black Knight Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Black Knight Greaves",
        "kind": "armor"
      },
      {
        "name": "Crusade Insignia",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Blessed Blue Dew Talisman",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      
    ]
  },
  {
    "id": "warrior-of-waves-all-game",
    "name": "Warrior of Waves (All Game)",
    "level": "All Game",
    "primaryStats": [
      "Vigor",
      "Endurance",
      "Strength"
    ],
    "secondaryStats": [
      "Mind",
      "Dexterity",
      "Intelligence"
    ],
    "statTags": [
      "Vigor",
      "Endurance",
      "Strength",
      "Mind",
      "Dexterity",
      "Intelligence"
    ],
    "summary": "Vigor / Endurance / Strength build using Ruins Greatsword.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":50,"Intelligence":16,"Faith":15},
    "statRecommended": {"Vigor":55,"Mind":34,"Endurance":30,"Strength":11,"Dexterity":65,"Intelligence":16,"Faith":25},
    "statSource": "scraped",
    "requirements": [
      {
        "name": "Ruins Greatsword",
        "kind": "weapon"
      },
      {
        "name": "Greathelm",
        "kind": "armor"
      },
      {
        "name": "Beast Champion Armor",
        "kind": "armor"
      },
      {
        "name": "Beast Champion Gauntlets",
        "kind": "armor"
      },
      {
        "name": "Beast Champion Greaves",
        "kind": "armor"
      },
      {
        "name": "Taker's Cameo",
        "kind": "talisman"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "talisman"
      },
      {
        "name": "Ancestral Spirit's Horn",
        "kind": "talisman"
      },
      {
        "name": "Devastation",
        "kind": "weapon"
      },
      {
        "name": "Flame, Grant Me Strength",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "warrior-wizard-build-level-150-200-journey-2",
    "name": "Warrior Wizard Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Vigor",
      "Intelligence"
    ],
    "secondaryStats": [
      "Mind",
      "Endurance"
    ],
    "statTags": [
      "Vigor",
      "Intelligence",
      "Mind",
      "Endurance"
    ],
    "summary": "Vigor / Intelligence build using Carian Regal Scepter.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":10,"Dexterity":10,"Intelligence":60},
    "statRecommended": {"Vigor":60,"Mind":30,"Endurance":30,"Strength":10,"Dexterity":10,"Intelligence":60,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Lusat's Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Carian Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Carian Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "Beast Champion Armor",
        "kind": "armor"
      },
      {
        "name": "Greathelm",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "talisman"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Radagon Icon",
        "kind": "talisman"
      },
      {
        "name": "Terra Magica",
        "kind": "spell"
      },
      {
        "name": "Gavel of Haima",
        "kind": "spell"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Carian Slicer",
        "kind": "spell"
      },
      {
        "name": "Carian Piercer",
        "kind": "spell"
      },
      {
        "name": "Carian Greatsword",
        "kind": "spell"
      },
      {
        "name": "Adula's Moonblade",
        "kind": "spell"
      }
    ]
  },
  {
    "id": "waterfowl-warrior-build-level-150-200-journey-2",
    "name": "Waterfowl Warrior Build (Level 150-200 | Journey 2)",
    "level": "Level 150-200",
    "primaryStats": [
      "Dexterity"
    ],
    "secondaryStats": [
      "Vigor",
      "Endurance"
    ],
    "statTags": [
      "Dexterity",
      "Vigor",
      "Endurance"
    ],
    "summary": "Dexterity build using Hand of Malenia.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "statRequired": {"Strength":16,"Dexterity":48},
    "statRecommended": {"Vigor":50,"Mind":15,"Endurance":30,"Strength":16,"Dexterity":80,"Intelligence":7,"Faith":7,"Arcane":7},
    "statSource": "calculated",
    "requirements": [
      {
        "name": "Hand of Malenia",
        "kind": "weapon"
      },
      {
        "name": "They heaviest you can wear and still Medium Roll.",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "talisman"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "talisman"
      },
      
    ]
  }
];

const AREA_ORDER = [
  'limgrave',
  'weeping peninsula',
  'stormveil',
  'liurnia',
  'academy',
  'ainsel',
  'siofra',
  'caelid',
  'altus',
  'gelmir',
  'leyndell',
  'deeproot',
  'nokron',
  'nokstella',
  'mountaintops',
  'consecrated snowfield',
  'mohgwyn',
  'haligtree',
  'farum azula',
  'ashen capital',
  'gravesite plain',
  'scadu altus',
  'rau h',
  'cerulean coast',
  'abyssal woods',
  'jagged peak',
  'enir-ilim',
];

export function normalizeBuildName(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getAreaRank(record: ItemRecord): number {
  const area = normalizeBuildName(`${record.area ?? ''} ${record.locationName}`);
  const rank = AREA_ORDER.findIndex((entry) => area.includes(entry));
  return rank === -1 ? AREA_ORDER.length : rank;
}

function matchesRequirement(record: ItemRecord, requirement: BuildRequirement): boolean {
  const itemName = normalizeBuildName(record.itemName);
  const candidates = [requirement.name, ...(requirement.aliases ?? [])].map(normalizeBuildName);
  return candidates.some((candidate) => itemName === candidate || itemName.includes(candidate) || candidate.includes(itemName));
}

export function isFreeformRequirement(requirement: BuildRequirement): boolean {
  const name = normalizeBuildName(requirement.name);
  if (!name) return true;
  if (/^(n a|na|none|no|no armor|no shield|armor|shield|greatshield|light|light armor|medium armor|med armor|med weight|medium weight|little|little armor|staff|seal|catalyst|flexible talisman slot|any seal|any staff|any shield|any armor)$/.test(name)) {
    return true;
  }
  return [
    /\bany\b/,
    /\bno armor\b/,
    /\blight armor\b/,
    /\bmedium armor\b/,
    /\bmed roll\b/,
    /\blight roll\b/,
    /\bmid roll\b/,
    /\bhigh poise\b/,
    /\bheaviest\b/,
    /\bheaviest armor\b/,
    /\barmor that\b/,
    /\barmor for\b/,
    /\barmor with\b/,
    /\barmor as\b/,
    /\barmor to\b/,
    /\barmor you\b/,
    /\barmor pieces\b/,
    /\barmor good\b/,
    /\bseal that\b/,
    /\bseal as long as\b/,
    /\bweighs nothing\b/,
    /\bone handed\b/,
    /\bone hand\b/,
    /\bmelee weapon\b/,
    /\bother weapon\b/,
    /\bother armor\b/,
    /\bother talisman\b/,
    /\bother colossus\b/,
    /\bother curved\b/,
    /\bother buffs\b/,
    /\bother incantations\b/,
    /\bpreference\b/,
    /\brecommended\b/,
    /\byou can\b/,
    /\byou want\b/,
    /\byou like\b/,
    /\ballows you\b/,
    /\ballows med\b/,
    /\bstill allows\b/,
    /\bcan med roll\b/,
    /\bmedium roll\b/,
    /\bcan parry\b/,
    /\bother items\b/,
    /\bsuch as\b/,
    /\bsuggested\b/,
    /\bof your choice\b/,
    /\bin the video\b/,
    /\bthat can use\b/,
    /\byou can wear\b/,
    /\bas long as\b/,
    /\bincantations you\b/,
    /\btalismans in\b/,
  ].some((pattern) => pattern.test(name));
}

export function buildPlannerMatches(
  preset: BuildPreset,
  records: ItemRecord[]
): BuildRequirementMatch[] {
  return preset.requirements
    .map((requirement) => {
      const isFreeform = isFreeformRequirement(requirement);
      if (isFreeform) {
        return {
          requirement,
          record: null,
          areaRank: Number.MAX_SAFE_INTEGER - 1,
          isFreeform,
        };
      }
      const matches = records
        .filter((record) => matchesRequirement(record, requirement))
        .sort((a, b) => getAreaRank(a) - getAreaRank(b) || a.itemName.localeCompare(b.itemName));
      const record = matches[0] ?? null;
      return {
        requirement,
        record,
        areaRank: record ? getAreaRank(record) : Number.MAX_SAFE_INTEGER,
        isFreeform,
      };
    })
    .sort((a, b) => {
      if (!!a.record !== !!b.record) return a.record ? -1 : 1;
      if (a.isFreeform !== b.isFreeform) return a.isFreeform ? 1 : -1;
      return a.areaRank - b.areaRank || a.requirement.name.localeCompare(b.requirement.name);
    });
}

export function buildStatCategory(preset: BuildPreset): string {
  const stats = preset.primaryStats.length ? preset.primaryStats : preset.statTags;
  return stats.length ? stats.join(' / ') : 'Flexible';
}

const LEVEL_ORDER = [
  'Beginner',
  'All Game',
  'Level 50',
  'Level 100',
  'Level 150',
  'Level 150-200',
  'SOTE',
  'General',
];

export function buildLevelRank(level: string): number {
  const index = LEVEL_ORDER.indexOf(level);
  return index === -1 ? LEVEL_ORDER.length : index;
}

export function buildLevelLabel(level: string): string {
  if (level === 'Level 150-200') return 'Level 150-200, Journey 2, and New Game+';
  if (level === 'SOTE') return 'Shadow of the Erdtree';
  return level;
}

export function sortBuildPresets(presets: BuildPreset[]): BuildPreset[] {
  return [...presets].sort((a, b) =>
    buildLevelRank(a.level) - buildLevelRank(b.level) ||
    a.name.localeCompare(b.name)
  );
}

export function filterBuildPresets(selectedStats: BuildStat[], matchAll: boolean): BuildPreset[] {
  const presets = selectedStats.length ? BUILD_PRESETS.filter((preset) => {
    const tags = new Set(preset.statTags);
    return matchAll
      ? selectedStats.every((stat) => tags.has(stat))
      : selectedStats.some((stat) => tags.has(stat));
  }) : BUILD_PRESETS;
  return sortBuildPresets(presets);
}

export interface StatItemEntry {
  name: string;
  normalized: string;
  kind: BuildItemKind;
  usedBy: number;
}

export function getItemsForStats(selectedStats: BuildStat[], matchAll: boolean): StatItemEntry[] {
  const matchingBuilds = filterBuildPresets(selectedStats, matchAll);
  const itemMap = new Map<string, StatItemEntry>();

  const seen = new Set<string>();
  for (const build of matchingBuilds) {
    for (const req of build.requirements) {
      if (isFreeformRequirement(req)) continue;
      const rawName = req.name.toLowerCase().trim().replace(/\s+/g, ' ');
      const normalized = normalizeBuildName(rawName);
      const key = `${normalized}::${req.kind}`;

      if (seen.has(key)) {
        const entry = itemMap.get(key);
        if (entry) entry.usedBy++;
      } else {
        seen.add(key);
        itemMap.set(key, {
          name: req.name,
          normalized,
          kind: req.kind,
          usedBy: 1,
        });
      }
    }
  }

  return [...itemMap.values()].sort((a, b) => b.usedBy - a.usedBy || a.name.localeCompare(b.name));
}

export function runeCostForLevel(level: number): number {
  if (level <= 1) return 0;
  const x = level;
  return Math.round(0.02 * x ** 3 + 3.06 * x ** 2 + 105.6 * x - 895);
}

export function computeSoulCost(preset: BuildPreset): { cost: number; targetLevel: number; bestClass: string } | null {
  const stats = preset.statRecommended ?? preset.statRequired;
  if (!stats) return null;
  let bestClass = STARTING_CLASSES[0];
  let lowestCost = Infinity;
  for (const sc of STARTING_CLASSES) {
    let levelsNeeded = 0;
    for (const stat of BUILD_STATS) {
      const target = stats[stat] ?? sc.stats[stat];
      const base = sc.stats[stat];
      if (target > base) levelsNeeded += target - base;
    }
    let cost = 0;
    for (let lvl = sc.level; lvl < sc.level + levelsNeeded; lvl++) {
      cost += runeCostForLevel(lvl + 1);
    }
    if (cost < lowestCost) { lowestCost = cost; bestClass = sc; }
  }
  const levelsNeeded = BUILD_STATS.reduce((sum, stat) => {
    const target = stats[stat] ?? bestClass.stats[stat];
    return sum + Math.max(0, target - bestClass.stats[stat]);
  }, 0);
  return { cost: lowestCost, targetLevel: bestClass.level + levelsNeeded, bestClass: bestClass.name };
}

export function formatRunes(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return `${n}`;
}
