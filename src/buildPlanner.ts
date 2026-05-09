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
  summary: string;
  sourceUrl: string;
  requirements: BuildRequirement[];
}

export interface BuildRequirementMatch {
  requirement: BuildRequirement;
  record: ItemRecord | null;
  areaRank: number;
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
    "requirements": [
      {
        "name": "Staff of the Great Beyond",
        "kind": "staff"
      },
      {
        "name": "and Sword of Night and Flame",
        "kind": "staff"
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
        "name": "Scorpion Charms",
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
        "name": "Knight Comet",
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
    "requirements": [
      {
        "name": "Shortbow and Longbow",
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
    "requirements": [
      {
        "name": "Carian Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "that can med roll",
        "kind": "armor"
      },
      {
        "name": "Contagious Fury",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Claymore and Lordsworn's Greatsword",
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
    "requirements": [
      {
        "name": "Black Bow",
        "kind": "seal"
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
        "name": "Shard of Alexander ( Ritual Sword Talisman )",
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
        "name": "and Flame, Grant Me Strength",
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
    "requirements": [
      {
        "name": "Maliketh's Black Blade",
        "kind": "seal"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Maliketh's Set",
        "kind": "armor"
      },
      {
        "name": "Armor high Poise",
        "kind": "armor"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Sacred Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Claw Talisman",
        "kind": "shield"
      },
      {
        "name": "Destined Death",
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
    "requirements": [
      {
        "name": "Cross-Naginata",
        "kind": "seal"
      },
      {
        "name": "Flamberge",
        "kind": "seal"
      },
      {
        "name": "Scythe",
        "kind": "seal"
      },
      {
        "name": "Grave Scythe",
        "kind": "seal"
      },
      {
        "name": "Nagakiba",
        "kind": "seal"
      },
      {
        "name": "Uchigatana",
        "kind": "seal"
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
        "name": "Eochaid's Dancing Blade",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame Grant Me Strength",
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
    "requirements": [
      {
        "name": "Erdsteel Dagger",
        "kind": "seal"
      },
      {
        "name": "Black Knife",
        "kind": "seal"
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
        "kind": "shield"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Blade of Death",
        "kind": "ash"
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
        "name": "Blessing of the Erdtree and Flame, Grant Me Strength",
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
    "requirements": [
      {
        "name": "Weapon that has Bleed on it by default such as the Uchigatana",
        "kind": "seal"
      },
      {
        "name": "Nightrider Flail",
        "kind": "seal"
      },
      {
        "name": "Bloodhound's Fang",
        "kind": "seal"
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
        "name": "but you can use you like",
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
        "name": "Catch Flame and Bloodflame Blade",
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
    "requirements": [
      {
        "name": "Cross-Naginata",
        "kind": "seal"
      },
      {
        "name": "Nagakiba",
        "kind": "seal"
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
        "name": "White Reed Set",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "shield"
      },
      {
        "name": "Godfrey Icon",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
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
    "requirements": [
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Blasphemous Blade",
        "kind": "seal"
      },
      {
        "name": "Cinquedea",
        "kind": "seal"
      },
      {
        "name": "that still allows you to med roll",
        "kind": "armor"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "shield"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Shield Talisman +1",
        "kind": "shield"
      },
      {
        "name": "Taker's Flames",
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
    "requirements": [
      {
        "name": "Blasphemous Blade",
        "kind": "seal"
      },
      {
        "name": "Gargoyle's Blackblade",
        "kind": "seal"
      },
      {
        "name": "Gargoyle's Greatsword",
        "kind": "seal"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Raptor's Black Feathers and other Armor that allows medium rolling",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "shield"
      },
      {
        "name": "Claw Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Taker's Flame",
        "kind": "ash"
      },
      {
        "name": "Corpse Wax Cutter",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Hookclaws",
        "kind": "weapon"
      },
      {
        "name": "Knight Set",
        "kind": "armor"
      },
      {
        "name": "Maliketh's Set",
        "kind": "armor"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "shield"
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
        "name": "Flame Grant Me Strength",
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
    "requirements": [
      {
        "name": "Nagakiba",
        "kind": "seal"
      },
      {
        "name": "Greatbow",
        "kind": "seal"
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
    "requirements": [
      {
        "name": "Crescent Moon Axe",
        "kind": "weapon"
      },
      {
        "name": "Raging Wolf Set",
        "kind": "armor"
      },
      {
        "name": "Blaidd's Set",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Claw Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Axe Talisman",
        "kind": "shield"
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
    "requirements": [
      {
        "name": "Eleonora's Poleblade",
        "kind": "seal"
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
        "name": "and armor as long as you can med roll",
        "kind": "armor"
      },
      {
        "name": "Bloodblade Dance",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Sword Lance",
        "kind": "weapon"
      },
      {
        "name": "Gaius's Set",
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
        "kind": "armor"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Claw Talisman and Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Bloodhound's Finesse",
        "kind": "ash"
      }
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
        "name": "and other Armor you want",
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
        "name": "Green Turtle Talisman and Viridian Amber Medallion +2",
        "kind": "talisman"
      },
      {
        "name": "Dynast's Finesse",
        "kind": "ash"
      }
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
    "requirements": [
      {
        "name": "Beast Claw",
        "kind": "weapon"
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
        "name": "Spear Talisman ( Lord of Blood's Exultation )",
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
        "kind": "shield"
      },
      {
        "name": "Millicent’s Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Axe Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
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
        "name": "Royal Knight Set",
        "kind": "armor"
      },
      {
        "name": "high Poise",
        "kind": "armor"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "shield"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "shield"
      },
      {
        "name": "Loretta's Slash",
        "kind": "ash"
      },
      {
        "name": "Freezing Mist",
        "kind": "spell"
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
        "kind": "shield"
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
        "name": "Spellblade Set",
        "kind": "armor"
      },
      {
        "name": "Rakshasa Set",
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
        "name": "Spellblades Set",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Godfrey Icon",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Carian Grandeur",
        "kind": "ash"
      },
      {
        "name": "Terra Magica",
        "kind": "shield"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "shield"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "shield"
      },
      {
        "name": "Scholar's Shield",
        "kind": "shield"
      },
      {
        "name": "Great Glinstone Shard",
        "kind": "shield"
      },
      {
        "name": "Rykard's Rancor",
        "kind": "shield"
      },
      {
        "name": "Founding Rain of Stars",
        "kind": "shield"
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
    "requirements": [
      {
        "name": "Rellana's Twinblade",
        "kind": "seal"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "Rellana's Set",
        "kind": "armor"
      },
      {
        "name": "Rellana's Cameo",
        "kind": "shield"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Moon-and-Fire Stance",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame Grant me Strength",
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
        "name": "Banished Knight Set",
        "kind": "armor"
      },
      {
        "name": "Golden Vow",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Bloodhound Claws",
        "kind": "staff"
      },
      {
        "name": "Sacrificial Axe",
        "kind": "staff"
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
        "name": "Haima Glintstone Crown and other gloves and legs that allow you to med roll",
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
        "kind": "ash"
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
        "name": "Bull-Goat Set",
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
        "name": "Lionel's Set",
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
        "name": "White Mask and light armor for Light Equip Load setup.",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia ( Winged Sword Insignia )",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation and Spear Talisman ( Dagger Talisman )",
        "kind": "talisman"
      },
      {
        "name": "Seppuku and Carian Retaliation",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Ordovis' Greatsword",
        "kind": "seal"
      },
      {
        "name": "Clawmark Seal",
        "kind": "seal"
      },
      {
        "name": "Crucible Axe Set",
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
        "name": "and Rotten Winged Sword Insignia",
        "kind": "talisman"
      },
      {
        "name": "Ordovis' Vortex",
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
    "requirements": [
      {
        "name": "Gargoyle's Greatsword",
        "kind": "seal"
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
    "requirements": [
      {
        "name": "Crystal Staff",
        "kind": "seal"
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
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "that still allows you to med roll",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Shield Talisman",
        "kind": "shield"
      },
      {
        "name": "and Godfrey Icon",
        "kind": "shield"
      },
      {
        "name": "Contagious Fury",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Helphen's Steeple",
        "kind": "staff"
      },
      {
        "name": "Dark Moon Greatsword",
        "kind": "staff"
      },
      {
        "name": "Staff of Loss",
        "kind": "staff"
      },
      {
        "name": "Night's Cavalry Set",
        "kind": "armor"
      },
      {
        "name": "Claw Talisman",
        "kind": "talisman"
      },
      {
        "name": "Magic Scorpion Charm ( Ritual Sword Talisman )",
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
        "name": "Moonlight Greatsword",
        "kind": "ash"
      },
      {
        "name": "Ruinous Ghostflame",
        "kind": "ash"
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
        "name": "Solitude Set",
        "kind": "armor"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "shield"
      },
      {
        "name": "Golden Vow",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Dark Moon Greatsword",
        "kind": "staff"
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
        "name": "Moonlight Greatsword",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Sword of Night and Flame",
        "kind": "seal"
      },
      {
        "name": "Carian Regal Scepter",
        "kind": "seal"
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
        "name": "Night-and-Flame-Stance",
        "kind": "ash"
      },
      {
        "name": "Rancor",
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
    "requirements": [
      {
        "name": "Sword of Night and Flame",
        "kind": "seal"
      },
      {
        "name": "Golden Order Seal",
        "kind": "seal"
      },
      {
        "name": "Prince of Death Staff",
        "kind": "seal"
      },
      {
        "name": "Armor that allows you to medium roll.",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "shield"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Godfrey Icon",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Night-and-Flame Stance",
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
        "name": "Rancorcall",
        "kind": "spell"
      },
      {
        "name": "Ancient Death Rancor",
        "kind": "spell"
      },
      {
        "name": "Explosive Ghostflame . Terra Magica",
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
    "requirements": [
      {
        "name": "Sword of Night and Flame",
        "kind": "seal"
      },
      {
        "name": "Prince of Death's Staff",
        "kind": "seal"
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
        "kind": "shield"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Shield Talisman +1",
        "kind": "shield"
      },
      {
        "name": "Godfrey Icon",
        "kind": "shield"
      },
      {
        "name": "Night-and-Flame Stance",
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
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Devonia's Vortex",
        "kind": "ash"
      },
      {
        "name": "Flame Grant me Strength",
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
    "requirements": [
      {
        "name": "Euporia",
        "kind": "weapon"
      },
      {
        "name": "Divine Bird Set",
        "kind": "armor"
      },
      {
        "name": "Two-Handed Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Euporia Vortex",
        "kind": "ash"
      },
      {
        "name": "Flame Grant me Strength",
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
        "name": "Uses Rock Heart",
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
        "name": "Scarlet Rot",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Regalia of Eochaid",
        "kind": "seal"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Silver Tear Mask and Armor",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "talisman"
      },
      {
        "name": "Rotten Winged Sword Insignia ( Winged Sword Insignia )",
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
        "name": "Eochaid's Dancing Blade",
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
    "requirements": [
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Bloodfiend's Fork",
        "kind": "seal"
      },
      {
        "name": "Blue Dancer Charm",
        "kind": "shield"
      },
      {
        "name": "Crusade Insignia",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Sword Dance",
        "kind": "ash"
      },
      {
        "name": "Braggart's Roar",
        "kind": "ash"
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
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Silver Tear Mask",
        "kind": "armor"
      },
      {
        "name": "and armor that allows you to med roll",
        "kind": "armor"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "seal"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "seal"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "seal"
      },
      {
        "name": "Faithful's Canvas Talisman",
        "kind": "seal"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "seal"
      },
      {
        "name": "Bloody Slash",
        "kind": "ash"
      },
      {
        "name": "Contagious Fury",
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
    "requirements": [
      {
        "name": "Catch Flame and Dragonfire",
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
    "requirements": [
      {
        "name": "Erdtree Seal",
        "kind": "seal"
      },
      {
        "name": "Coded Sword",
        "kind": "seal"
      },
      {
        "name": "Gravel Stone Seal",
        "kind": "seal"
      },
      {
        "name": "Uses Priestess Heart",
        "kind": "armor"
      },
      {
        "name": "Flock's Canvas Talisman",
        "kind": "shield"
      },
      {
        "name": "Godfrey Icon",
        "kind": "shield"
      },
      {
        "name": "Lightning Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
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
    "requirements": [
      {
        "name": "Bandit's Curved Sword",
        "kind": "weapon"
      },
      {
        "name": "Curved Swords",
        "kind": "weapon"
      },
      {
        "name": "White Mask",
        "kind": "armor"
      },
      {
        "name": "and heavy armor good Poise",
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
        "name": "Millicent's Prosthesis and Winged Sword Insignia",
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
        "name": "Rotten Winged Sword Insignia ( Winged Sword Insignia )",
        "kind": "shield"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Ice Lightning Sword",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Dragon-Hunter's Great Katana",
        "kind": "weapon"
      },
      {
        "name": "Rakshasa Set",
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
        "name": "Dragonwound Slash",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Magma Wyrm's Scalesword",
        "kind": "seal"
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
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "shield"
      },
      {
        "name": "Magma Guillotine",
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
        "name": "Horn Calling",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame Grant me Strength",
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
    "requirements": [
      {
        "name": "Prince of Death's Staff",
        "kind": "seal"
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
        "kind": "seal"
      },
      {
        "name": "Marika's Soreseal",
        "kind": "seal"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "seal"
      },
      {
        "name": "Primal Glintstone Blade",
        "kind": "seal"
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
        "name": "Carian Knight Set",
        "kind": "armor"
      },
      {
        "name": "Ash of War: Barricade Shield",
        "kind": "shield"
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
        "name": "Carian Greatsword and Glintstone Pebble",
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
        "name": "and Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Godfrey Icon",
        "kind": "talisman"
      },
      {
        "name": "Eochaid's Dancing Blade",
        "kind": "ash"
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
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Messmer's Assault",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame Grant me Strength",
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
        "name": "Flame Dance",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Curved Great Club",
        "kind": "seal"
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
        "kind": "shield"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "shield"
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
        "name": "Jellyfish Shield",
        "kind": "shield"
      },
      {
        "name": "Snow Witch Hat",
        "kind": "armor"
      },
      {
        "name": "and that still allows you to medium roll",
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
        "name": "Contagious Fury",
        "kind": "ash"
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
        "name": "Zamor Ice Storm and Freezing Mist",
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
        "name": "Noble's Glove",
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
    "requirements": [
      {
        "name": "Clayman's Harpoon",
        "kind": "staff"
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
        "kind": "shield"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "shield"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Greatshield Talisman",
        "kind": "shield"
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
        "kind": "shield"
      },
      {
        "name": "Magic Glintblade",
        "kind": "shield"
      },
      {
        "name": "Greatblade Phalanx",
        "kind": "shield"
      },
      {
        "name": "Scholar's Armament",
        "kind": "shield"
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
    "requirements": [
      {
        "name": "Zamor Curved Sword",
        "kind": "seal"
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
        "name": "Fingerprint Set",
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
        "name": "Zamor Ice Storm",
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
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
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
    "requirements": [
      {
        "name": "Death's Poker",
        "kind": "staff"
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
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "more suggested talismans in the video.",
        "kind": "shield"
      },
      {
        "name": "Ghostflame Ignition",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Highland Axe",
        "kind": "weapon"
      },
      {
        "name": "Redmane Shield",
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
        "name": "Bull-Goats Gaunlets",
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
        "name": "and more suggested talismans in the video",
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
    "requirements": [
      {
        "name": "Godslayer's Greatsword",
        "kind": "seal"
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
        "kind": "shield"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "shield"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "The Queen's Black Flame",
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
        "name": "Leyndell Knight Set",
        "kind": "armor"
      },
      {
        "name": "Assassin's Cerulean Dagger",
        "kind": "shield"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "shield"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Gold Breaker",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "ash"
      },
      {
        "name": "Flame Grant me Strength",
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
    "requirements": [
      {
        "name": "Ornamental Straight Sword",
        "kind": "seal"
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
        "name": "Banished Knight Set",
        "kind": "armor"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "shield"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Spear Talisman",
        "kind": "shield"
      },
      {
        "name": "Golden Tempering",
        "kind": "ash"
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
        "name": "Blessing's Boon and Flame, Grant Me Strength",
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
    "requirements": [
      {
        "name": "Coded Sword",
        "kind": "seal"
      },
      {
        "name": "Sword of Night and Flame",
        "kind": "seal"
      },
      {
        "name": "and Golden Order Seal",
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
        "name": "and Armor high Poise.",
        "kind": "armor"
      },
      {
        "name": "Sacred Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Ritual Shield Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Unblockable Blade",
        "kind": "shield"
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
        "name": "Litany of Proper Death .",
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
    "requirements": [
      {
        "name": "Erdtree Bow",
        "kind": "seal"
      },
      {
        "name": "Black Bow",
        "kind": "seal"
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
        "name": "and Armor that allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Gravity Bolt",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Carian Regal Scepter",
        "kind": "staff"
      },
      {
        "name": "Meteorite Staff",
        "kind": "seal"
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
    "requirements": [
      {
        "name": "Grave Scythe",
        "kind": "seal"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "White Mask and and the heaviest Armor that still allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia ( Winged Sword Insignia )",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Lord of Blood's Exultation and Shard of Alexander",
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
        "name": "Poison Mist and Swarm of Flies",
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
        "kind": "shield"
      },
      {
        "name": "Claw Talisman",
        "kind": "shield"
      },
      {
        "name": "Axe Talisman",
        "kind": "shield"
      },
      {
        "name": "and Dragoncrest Greatshield Talisman",
        "kind": "shield"
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
    "requirements": [
      {
        "name": "Clayman's Harpoon",
        "kind": "staff"
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
        "name": "more suggested talismans in the video.",
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
    "requirements": [
      {
        "name": "Star Fist",
        "kind": "seal"
      },
      {
        "name": "Highland Axe",
        "kind": "seal"
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
        "name": "and other Armor that gives you lots of Poise",
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
      {
        "name": "Contagious Fury",
        "kind": "ash"
      }
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
        "name": "Black Knight Set",
        "kind": "armor"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Two-Headed Turtle Talisman",
        "kind": "shield"
      },
      {
        "name": "Blind Spot",
        "kind": "ash"
      }
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
        "kind": "shield"
      },
      {
        "name": "Spear Talisman",
        "kind": "shield"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "shield"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
      },
      {
        "name": "more suggested talismans in the video.",
        "kind": "shield"
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
        "name": "Leyndell Knight Set",
        "kind": "armor"
      },
      {
        "name": "Shard of Alexander",
        "kind": "seal"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "seal"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "seal"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "seal"
      },
      {
        "name": "Ancient Lightning Spear",
        "kind": "ash"
      },
      {
        "name": "Sacred Phalanx",
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
    "requirements": [
      {
        "name": "Treespear",
        "kind": "seal"
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
        "name": "Leyndell Knight Set",
        "kind": "armor"
      },
      {
        "name": "Sacred Order",
        "kind": "shield"
      },
      {
        "name": "Golden Vow",
        "kind": "shield"
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
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Axe Talisman",
        "kind": "shield"
      },
      {
        "name": "Regal Roar",
        "kind": "ash"
      }
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
    "requirements": [
      {
        "name": "Morgott's Cursed Sword",
        "kind": "seal"
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
        "kind": "shield"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Cursed-Blood Slice",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Horn Bow",
        "kind": "weapon"
      },
      {
        "name": "Misbegotten Shortbow and Lazuli Glintstone Sword",
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
    "requirements": [
      {
        "name": "Ripple Blade",
        "kind": "seal"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Jellyfish Shield",
        "kind": "shield"
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
        "name": "Contagious Fury",
        "kind": "ash"
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
        "name": "Magma Shower",
        "kind": "ash"
      },
      {
        "name": "Flame Spit",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Rapier",
        "kind": "weapon"
      },
      {
        "name": "Carian Knight Set",
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
        "name": "Glintstone Pebble and Carian Greatsword",
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
        "name": "Finger Robe",
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
    "requirements": [
      {
        "name": "Carian Regal Scepter",
        "kind": "seal"
      },
      {
        "name": "Meteorite Staff",
        "kind": "seal"
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
        "name": "White Light Charge",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Dark Moon Greatsword",
        "kind": "staff"
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
        "kind": "shield"
      },
      {
        "name": "Godfrey Icon",
        "kind": "shield"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Moonlight Greatsword",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Moonveil",
        "kind": "weapon"
      },
      {
        "name": "Land of Reeds Set",
        "kind": "armor"
      },
      {
        "name": "Transient Moonlight",
        "kind": "ash"
      },
      {
        "name": "Loretta's Greatbow",
        "kind": "spell"
      },
      {
        "name": "Glintstone Pebble and Carian Greatsword",
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
    "requirements": [
      {
        "name": "Moonveil",
        "kind": "staff"
      },
      {
        "name": "Uchigatana and Staff",
        "kind": "staff"
      },
      {
        "name": "that can still med roll",
        "kind": "armor"
      },
      {
        "name": "Carian Filigree Crest",
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
        "name": "Transient Moonlight",
        "kind": "ash"
      },
      {
        "name": "Glinstone Phalanx",
        "kind": "ash"
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
        "name": "and Terra Magica",
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
    "requirements": [
      {
        "name": "Wing of Astel and Staff",
        "kind": "staff"
      },
      {
        "name": "Carian Knight's Shield",
        "kind": "shield"
      },
      {
        "name": "Scaled Armor Set",
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
        "name": "Nebula",
        "kind": "ash"
      },
      {
        "name": "Scholar's Shield",
        "kind": "shield"
      },
      {
        "name": "Terra Magica",
        "kind": "shield"
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
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Warrior Jar Shard",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
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
        "kind": "shield"
      },
      {
        "name": "Ash of War: Golden Vow",
        "kind": "shield"
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
    "requirements": [
      {
        "name": "Miquellan Knight's Sword",
        "kind": "seal"
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
        "name": "Haligtree Knight Set and Greathelm",
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
        "name": "Needle Piercer",
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
        "kind": "shield"
      },
      {
        "name": "Fire Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
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
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Perfumer's Talisman",
        "kind": "shield"
      },
      {
        "name": "Axe Talisman",
        "kind": "shield"
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
        "name": "Flame Grant me Strength",
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
        "kind": "shield"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Flock's Canvas Talisman and Dragoncrest Greatshield Talisman",
        "kind": "shield"
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
      {
        "name": "Reduvia Blood Blade",
        "kind": "ash"
      }
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
        "name": "Zamor Set",
        "kind": "armor"
      },
      {
        "name": "that allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia ( Winged Sword Insignia )",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman and Shard of Alexander",
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
        "name": "Zamor Set",
        "kind": "armor"
      },
      {
        "name": "that allows you to medium roll",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia ( Winged Sword Insignia )",
        "kind": "talisman"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "talisman"
      },
      {
        "name": "Bull-Goat's Talisman and Shard of Alexander",
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
        "name": "Eclipse Greatshield",
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
        "kind": "seal"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "seal"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "seal"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "seal"
      },
      {
        "name": "Wolf's Assault",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Uchigatana and Longbow",
        "kind": "weapon"
      },
      {
        "name": "Land of Reeds Set",
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
    "requirements": [
      {
        "name": "Rivers of Blood",
        "kind": "seal"
      },
      {
        "name": "Sacrificial Axe",
        "kind": "seal"
      },
      {
        "name": "and Dragon Communion Seal",
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
        "name": "and armor that allows you to med roll",
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
        "name": "and Green Turtle Talisman",
        "kind": "talisman"
      },
      {
        "name": "Corpse Piler",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Albinauric Staff",
        "kind": "seal"
      },
      {
        "name": "Dragon Communion Seal",
        "kind": "seal"
      },
      {
        "name": "Staff of the Guilty",
        "kind": "seal"
      },
      {
        "name": "Rogier's Rapier",
        "kind": "seal"
      },
      {
        "name": "Alberich's Set (for extra Thorn Sorcery damage)",
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
    "requirements": [
      {
        "name": "Great Katana",
        "kind": "weapon"
      },
      {
        "name": "Oathseeker Knight Set",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Savage Lion's Claw",
        "kind": "ash"
      },
      {
        "name": "Overhead Stance",
        "kind": "ash"
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
        "name": "Redmane Knight Set",
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
        "name": "Viper Bite",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Gargoyle's Twinblade",
        "kind": "seal"
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
    "requirements": [
      {
        "name": "Serpentbone Blade",
        "kind": "weapon"
      },
      {
        "name": "Uchigatana ( Wakizashi )",
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
    "summary": "Vigor / Strength / Faith build using Shadown Sunflower Blossom.",
    "sourceUrl": "https://eldenring.wiki.fextralife.com/Builds",
    "requirements": [
      {
        "name": "Shadown Sunflower Blossom",
        "kind": "weapon"
      },
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
        "name": "Shadow Sunflower Headbutt",
        "kind": "ash"
      },
      {
        "name": "Elden Stars",
        "kind": "spell"
      },
      {
        "name": "Flame Grant Me Strength",
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
    "requirements": [
      {
        "name": "Smithscript Dagger",
        "kind": "weapon"
      },
      {
        "name": "Shadow Militiaman Set",
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
    "requirements": [
      {
        "name": "Death Ritual Spear",
        "kind": "staff"
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
        "name": "Black Knife Set (so your footsteps are muffled)",
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
        "name": "Spearcall Ritual",
        "kind": "ash"
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
      {
        "name": "Mists of Slumber",
        "kind": "ash"
      }
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
    "requirements": [
      {
        "name": "Watchdog's Staff",
        "kind": "seal"
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
        "name": "Sorcery of the Crozier",
        "kind": "ash"
      },
      {
        "name": "Flame, Grant Me Strength and/ Golden Vow",
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
    "requirements": [
      {
        "name": "Nagakiba",
        "kind": "staff"
      },
      {
        "name": "Academy Glintstone Staff",
        "kind": "staff"
      },
      {
        "name": "Black Knife Set",
        "kind": "armor"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
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
        "kind": "spell"
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
        "name": "Freezing Mist",
        "kind": "spell"
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
    "requirements": [
      {
        "name": "Demi-Human Queen's Staff and Estoc",
        "kind": "staff"
      },
      {
        "name": "Rapier",
        "kind": "staff"
      },
      {
        "name": "100% Physical",
        "kind": "shield"
      },
      {
        "name": "but get pieces that increase Intelligence when possible",
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
        "name": "Glintstone Pebble and Carian Slicer",
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
    "requirements": [
      {
        "name": "Claymore",
        "kind": "staff"
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
        "name": "Assasin's Cerulean Dagger",
        "kind": "talisman"
      },
      {
        "name": "Spear Talisman",
        "kind": "talisman"
      },
      {
        "name": "more suggested talismans in the video.",
        "kind": "talisman"
      },
      {
        "name": "Glintblade Phalanx",
        "kind": "ash"
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
        "name": "Glintstone Dart",
        "kind": "ash"
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
        "name": "Onze's Line of Stars",
        "kind": "ash"
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
        "name": "General Radahn Set",
        "kind": "armor"
      },
      {
        "name": "Rotten Winged Sword Insignia ( Winged Sword Insignia )",
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
      {
        "name": "Starcaller Cry",
        "kind": "ash"
      }
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
        "name": "Uses Lamenter's Mask",
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
        "name": "Fan Shot",
        "kind": "ash"
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
        "kind": "shield"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Carian Filigreed Crest",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
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
        "kind": "spell"
      },
      {
        "name": "Storm Blade",
        "kind": "spell"
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
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Great-Jars Arsenal",
        "kind": "shield"
      },
      {
        "name": "Bull-Goat's Talisman",
        "kind": "shield"
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
    "requirements": [
      {
        "name": "Sword of Night and Flame",
        "kind": "staff"
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
        "name": "Night-and-Flame Stance",
        "kind": "ash"
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
    "requirements": [
      {
        "name": "Sacred Relic Sword",
        "kind": "seal"
      },
      {
        "name": "Sword of Milos",
        "kind": "seal"
      },
      {
        "name": "and Sacred Seal",
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
        "name": "Wave of Gold",
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
        "name": "other Incantations you want.",
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
        "name": "Mists of Eternal Sleep",
        "kind": "ash"
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
        "kind": "shield"
      },
      {
        "name": "Ash of War: Sacred Blade",
        "kind": "shield"
      },
      {
        "name": "Ash of War: Barricade Shield",
        "kind": "shield"
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
        "name": "Great Helm",
        "kind": "armor"
      },
      {
        "name": "Tree Coat",
        "kind": "armor"
      },
      {
        "name": "Chain Gloves",
        "kind": "armor"
      },
      {
        "name": "Chain Greaves",
        "kind": "armor"
      },
      {
        "name": "Lightning Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Radagon's Soreseal",
        "kind": "shield"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Shield Talisman +1",
        "kind": "shield"
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
        "name": "and Blessing's Boon",
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
        "name": "Knight Set",
        "kind": "armor"
      },
      {
        "name": "Green Turtle Talisman",
        "kind": "shield"
      },
      {
        "name": "Axe Talisman",
        "kind": "shield"
      },
      {
        "name": "Curved Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Cragblade",
        "kind": "ash"
      },
      {
        "name": "Flame Grant Me Strength",
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
        "name": "Blinkbolt: Twinaxe",
        "kind": "ash"
      },
      {
        "name": "Golden Vow",
        "kind": "spell"
      },
      {
        "name": "Flame Grant me Strength",
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
    "requirements": [
      {
        "name": "Butchering Knife",
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
        "kind": "shield"
      },
      {
        "name": "Blessed Dew Talisman",
        "kind": "shield"
      },
      {
        "name": "Shard of Alexander",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
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
        "kind": "shield"
      },
      {
        "name": "Ritual Sword Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Spear Talisman",
        "kind": "shield"
      },
      {
        "name": "Spinning Slash",
        "kind": "ash"
      },
      {
        "name": "Flame Grant Me Strength",
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
      {
        "name": "Witching Hour Slash",
        "kind": "ash"
      },
      {
        "name": "Revenge of the Night",
        "kind": "ash"
      }
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
        "name": "Wave of Destruction",
        "kind": "ash"
      },
      {
        "name": "Flame Grant me Strength",
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
        "name": "Beast Champion Set",
        "kind": "armor"
      },
      {
        "name": "Greathelm",
        "kind": "armor"
      },
      {
        "name": "Magic Scorpion Charm",
        "kind": "shield"
      },
      {
        "name": "Graven-Mass Talisman",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Radagon Icon",
        "kind": "shield"
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
        "kind": "shield"
      },
      {
        "name": "Millicent's Prosthesis",
        "kind": "shield"
      },
      {
        "name": "Winged Sword Insignia",
        "kind": "shield"
      },
      {
        "name": "Dragoncrest Greatshield Talisman",
        "kind": "shield"
      },
      {
        "name": "Great-Jar's Arsenal",
        "kind": "shield"
      },
      {
        "name": "Waterfowl Dance",
        "kind": "ash"
      }
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

export function buildPlannerMatches(
  preset: BuildPreset,
  records: ItemRecord[]
): BuildRequirementMatch[] {
  return preset.requirements
    .map((requirement) => {
      const matches = records
        .filter((record) => matchesRequirement(record, requirement))
        .sort((a, b) => getAreaRank(a) - getAreaRank(b) || a.itemName.localeCompare(b.itemName));
      const record = matches[0] ?? null;
      return {
        requirement,
        record,
        areaRank: record ? getAreaRank(record) : Number.MAX_SAFE_INTEGER,
      };
    })
    .sort((a, b) => {
      if (!!a.record !== !!b.record) return a.record ? -1 : 1;
      return a.areaRank - b.areaRank || a.requirement.name.localeCompare(b.requirement.name);
    });
}

export function buildStatCategory(preset: BuildPreset): string {
  const stats = preset.primaryStats.length ? preset.primaryStats : preset.statTags;
  return stats.length ? stats.join(' / ') : 'Flexible';
}

export function filterBuildPresets(selectedStats: BuildStat[], matchAll: boolean): BuildPreset[] {
  if (!selectedStats.length) return BUILD_PRESETS;
  return BUILD_PRESETS.filter((preset) => {
    const tags = new Set(preset.statTags);
    return matchAll
      ? selectedStats.every((stat) => tags.has(stat))
      : selectedStats.some((stat) => tags.has(stat));
  });
}
