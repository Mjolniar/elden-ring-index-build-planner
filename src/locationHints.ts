import type { ItemRecord } from './types';

export type HintDifficulty = 'easy' | 'medium' | 'hard';

const AREA_PROGRESSION: Record<string, string> = {
  'Limgrave': 'early game',
  'Weeping Peninsula': 'early game',
  'Stormveil Castle': 'early game',
  'Mistwood': 'early game',
  'Liurnia of the Lakes': 'mid game',
  'Academy of Raya Lucaria': 'mid game',
  'Caria Manor': 'mid game',
  'Ainsel River': 'mid game',
  'Siofra River': 'early game',
  'Nokron, Eternal City': 'mid game',
  'Nokstella, Eternal City': 'mid game',
  'Deeproot Depths': 'mid game',
  'Lake of Rot': 'mid game',
  'Caelid': 'mid game',
  'Dragonbarrow': 'mid game',
  'Altus Plateau': 'mid-to-late game',
  'Mt. Gelmir': 'mid-to-late game',
  'Volcano Manor': 'mid-to-late game',
  'Leyndell, Royal Capital': 'late game',
  'Leyndell, Ashen Capital': 'endgame',
  'Mountaintops of the Giants': 'late game',
  'Consecrated Snowfield': 'late game',
  'Crumbling Farum Azula': 'endgame',
  'Elphael, Brace of the Haligtree': 'endgame',
  'Mohgwyn Palace': 'late game (hidden area)',
  'Roundtable Hold': 'hub area',
  'Land of Shadow': 'DLC',
  'Gravesite Plain': 'DLC',
  'Castle Ensis': 'DLC',
  'Belurat, Tower Settlement': 'DLC',
  'Shadow Keep': 'DLC',
  'Rauh Ruins': 'DLC',
  'Abyssal Woods': 'DLC',
  'Jagged Peak': 'DLC',
  'Cerulean Coast': 'DLC',
  'Finger Ruins': 'DLC',
  'Cathedral of Manus Metyr': 'DLC',
  'Enir-Ilim': 'DLC',
};

const AREA_REGION_LABEL: Record<string, string> = {
  'Limgrave': 'the grassy starting lands',
  'Weeping Peninsula': 'the rainy southern peninsula',
  'Stormveil Castle': 'a massive storm-wracked castle',
  'Mistwood': 'the misty forest east of the starting area',
  'Liurnia of the Lakes': 'the fog-shrouded lake region',
  'Academy of Raya Lucaria': 'a sorcerers\' academy amid the lakes',
  'Caria Manor': 'a royal manor estate in the northern highlands',
  'Ainsel River': 'an underground river of cold starlight',
  'Siofra River': 'a star-lit underground river beneath the surface',
  'Nokron, Eternal City': 'an ancient underground city beneath a starry sky',
  'Nokstella, Eternal City': 'a submerged eternal city of cold silver tears',
  'Deeproot Depths': 'a vast root-choked chasm deep beneath the capital',
  'Lake of Rot': 'a putrid underground lake of scarlet rot',
  'Caelid': 'the rot-blighted eastern wastes',
  'Dragonbarrow': 'a dragon-haunted plateau of the far northeast',
  'Altus Plateau': 'a high golden plateau above the fog',
  'Mt. Gelmir': 'the volcanic mountain region',
  'Volcano Manor': 'a manor of assassins near the volcano',
  'Leyndell, Royal Capital': 'the golden royal capital',
  'Leyndell, Ashen Capital': 'the burned ruins of the royal capital',
  'Mountaintops of the Giants': 'the frozen mountaintops',
  'Consecrated Snowfield': 'a hidden snowfield beyond the giants',
  'Crumbling Farum Azula': 'a dragon temple suspended in a storm',
  'Elphael, Brace of the Haligtree': 'the hidden Haligtree sanctuary',
  'Mohgwyn Palace': 'a blood-drenched hidden palace',
  'Roundtable Hold': 'the hub sanctuary beyond space',
  'Land of Shadow': 'the realm of shadow beyond the Erdtree',
  'Gravesite Plain': 'the burial plains at the entrance to the shadow realm',
  'Castle Ensis': 'a Carian fortress in the shadow realm',
  'Belurat, Tower Settlement': 'the spiraling tower settlement of the shadow realm',
  'Shadow Keep': 'the great fortress at the heart of the shadow realm',
  'Rauh Ruins': 'overgrown jungle ruins in the west of the shadow realm',
  'Abyssal Woods': 'the dark frenzied forests of the shadow realm',
  'Jagged Peak': 'a dragon\'s mountain peak in the shadow realm',
  'Cerulean Coast': 'the azure coastline of the shadow realm',
  'Finger Ruins': 'sacred finger-shaped ruins on the shadow realm peninsula',
  'Cathedral of Manus Metyr': 'the great cathedral on the eastern peninsula of the shadow realm',
  'Enir-Ilim': 'the spiraling divine tower of the shadow realm',
};

export function generateHint(rec: ItemRecord, difficulty: HintDifficulty): string {
  return fallbackHint(rec, difficulty);
}

export function fallbackHint(rec: ItemRecord, difficulty: HintDifficulty): string {
  const sourceLabels: Record<string, string> = {
    boss_drop: 'Boss drop',
    ground_pickup: 'Ground pickup',
    shop: 'Shop purchase',
    enemy_drop: 'Enemy drop',
    starting_loadout: 'Starting equipment',
    event: 'Quest or event reward',
    unknown: 'Obtainable',
  };
  const label = sourceLabels[rec.sourceType] ?? 'Obtainable';
  const area = rec.area ?? null;

  switch (difficulty) {
    case 'easy':
      return area ? `${label} in ${area}` : label;
    case 'medium':
      return area
        ? `${label} somewhere in ${AREA_REGION_LABEL[area] ?? 'an unknown region'}`
        : label;
    case 'hard': {
      let verb: string;
      switch (rec.sourceType) {
        case 'boss_drop':      verb = 'Dropped by a boss'; break;
        case 'ground_pickup':  verb = 'Found on the ground'; break;
        case 'shop':           verb = 'Purchased from a merchant'; break;
        case 'enemy_drop':     verb = 'Dropped by an enemy'; break;
        case 'starting_loadout': verb = 'Starting equipment'; break;
        case 'event':          verb = 'Quest or event reward'; break;
        default:               verb = 'Obtainable'; break;
      }
      const stage = area ? AREA_PROGRESSION[area] : null;
      return stage ? `${verb} — ${stage}` : verb;
    }
  }
}
