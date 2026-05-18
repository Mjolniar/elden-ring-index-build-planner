import type { ItemRecord } from './types';
import { BUILD_PRESETS, normalizeBuildName, isFreeformRequirement, getAreaRank } from './buildPlanner';
import { getItemStats } from './itemStats';

export interface RegionAreaSummary {
  area: string;
  count: number;
}

export interface RegionGroupSummary {
  root: string;
  count: number;
  areas: RegionAreaSummary[];
}

export interface RegionSelection {
  root: string;
  area?: string | null;
}

// Items whose names match these words are not weapon-table entries for this view.
const NON_WEAPON_RE =
  /\b(shield|greatshield|buckler|targe|staff|seal|sorcery|incantation|talisman|helm|hood|mask|crown|hat|armor|garb|robe|gauntlets|gloves|greaves|trousers|leggings|ash of war|spirit ash|cookbook|bell bearing|medallion|key|rune|remembrance|tear|crystal tear|glovewort|smithing stone|somber stone|bolus|grease|arrow|bolt)\b/i;

const WEAPON_NAME_RE =
  /\b(dagger|knife|sword|greatsword|blade|katana|twinblade|axe|greataxe|hammer|mace|club|flail|spear|greatspear|halberd|reaper|scythe|whip|fist|claw|pata|caestus|rapier|estoc|lance|bow|longbow|greatbow|crossbow|ballista|torch|perfume bottle|hand-to-hand|dryleaf arts|beast claw)\b/i;

const REGION_GROUPS: Array<{ root: string; patterns: RegExp[] }> = [
  {
    root: 'Limgrave',
    patterns: [
      /limgrave/i, /stormveil/i, /stormhill/i, /mistwood/i, /murkwater/i,
      /groveside/i, /coastal cave/i, /highroad cave/i, /deathtouched/i,
      /stormfoot/i, /fringefolk/i, /limgrave tunnels/i, /fort haight/i,
      /church of elleh/i, /third church/i, /stormgate/i, /gatefront/i,
      /agheel/i, /dragon-burnt/i, /waypoint/i, /summonwater/i,
      /warmaster/i, /chapel of anticipation/i,
    ],
  },
  {
    root: 'Weeping Peninsula',
    patterns: [
      /weeping peninsula/i, /castle morne/i, /morne tunnel/i, /tombsward/i,
      /impaler/i, /earthbore/i, /church of pilgrimage/i, /fourth church/i,
    ],
  },
  {
    root: 'Liurnia',
    patterns: [
      /liurnia/i, /raya lucaria/i, /academy/i, /caria manor/i, /three sisters/i,
      /moonlight altar/i, /black knife catacombs/i, /cliffbottom/i,
      /road'?s end/i, /stillwater/i, /lakeside crystal/i, /crystal tunnel/i,
      /ruin-strewn/i, /cuckoo/i, /malefactor/i, /ringleader/i,
      /church of vows/i, /carian study/i, /converted fringe/i,
      /frenzied flame village/i, /albinaurics/i, /jarburg/i, /bellum/i,
      /four belfries/i, /kingsrealm/i,
    ],
  },
  {
    root: 'Caelid',
    patterns: [
      /caelid/i, /dragonbarrow/i, /sellia/i, /redmane/i, /fort gael/i,
      /fort faroth/i, /bestial sanctum/i, /aeonia/i, /war-dead/i,
      /caelem/i, /abandoned cave/i, /gaol cave/i,
    ],
  },
  {
    root: 'Altus Plateau',
    patterns: [
      /altus/i, /shaded castle/i, /windmill/i, /lux ruins/i, /wyndham/i,
      /perfumer/i, /old altus/i, /sainted/i, /auriza/i, /sealed tunnel/i,
      /forest-spanning/i, /dominula/i, /sages'? cave/i, /unsightly catacombs/i,
    ],
  },
  {
    root: 'Mt. Gelmir',
    patterns: [
      /mt\.? gelmir/i, /gelmir/i, /volcano manor/i, /volcano cave/i,
      /fort laiedd/i, /hermit village/i, /road of iniquity/i,
    ],
  },
  {
    root: 'Leyndell',
    patterns: [
      /leyndell/i, /royal capital/i, /ashen capital/i, /subterranean/i,
      /capital outskirts/i, /fortified manor/i, /shunning-grounds/i,
    ],
  },
  {
    root: 'Mountaintops',
    patterns: [
      /mountaintops/i, /castle sol/i, /spiritcaller/i, /giant-conquering/i,
      /giants'? mountaintop/i, /zamor/i, /flame peak/i, /lord contender/i,
    ],
  },
  {
    root: 'Consecrated Snowfield',
    patterns: [
      /consecrated/i, /yelough/i, /ordina/i, /apostate/i,
      /hidden path to the haligtree/i,
    ],
  },
  {
    root: 'Haligtree',
    patterns: [/haligtree/i, /elphael/i],
  },
  {
    root: 'Underground',
    patterns: [
      /siofra/i, /ainsel/i, /nokron/i, /nokstella/i, /deeproot/i,
      /lake of rot/i, /mohgwyn/i, /uhl palace/i, /night'?s sacred/i,
      /aqueduct/i, /grand cloister/i,
    ],
  },
  {
    root: 'Crumbling Farum Azula',
    patterns: [/farum azula/i, /dragon temple/i, /beside the great bridge/i],
  },
  {
    root: 'Roundtable Hold',
    patterns: [/roundtable/i, /twin maiden/i, /enia/i],
  },
  {
    root: 'Land of Shadow',
    patterns: [
      /land of shadow/i, /shadow of the erdtree/i, /gravesite/i, /scadu/i, /shadow keep/i, /rauh/i,
      /cerulean coast/i, /abyssal woods/i, /jagged peak/i, /finger ruins/i,
      /manus metyr/i, /enir/i, /belurat/i, /castle ensis/i, /fog rift/i,
      /darklight/i, /scorpion river/i, /gaol/i, /dragon'?s pit/i,
      /stone coffin/i, /ruined forge/i, /moorth/i, /ellac/i, /nameless mausoleum/i,
      /specimen storehouse/i, /church district/i, /recluses'? river/i,
    ],
  },
  {
    root: 'Starting Loadout',
    patterns: [/starting loadout/i, /automatically received/i, /wretch class/i],
  },
  {
    root: 'Various',
    patterns: [/various/i],
  },
];

let _weaponSet: Set<string> | null = null;

function weaponNameSet(): Set<string> {
  if (_weaponSet) return _weaponSet;
  const s = new Set<string>();
  for (const preset of BUILD_PRESETS) {
    for (const req of preset.requirements) {
      if (req.kind === 'weapon' && !isFreeformRequirement(req)) {
        s.add(normalizeBuildName(req.name));
      }
    }
  }
  return (_weaponSet = s);
}

function baseItemName(itemName: string): string {
  return itemName
    .replace(/\s+\+\d+\s*$/i, '')
    .replace(/\s*\[[^\]]+\]\s*$/g, '')
    .trim();
}

/**
 * Returns true if this item record is a weapon.
 *
 * Detection order:
 * 1. Exact match against the build-preset weapon catalogue (highest confidence).
 * 2. Present in item-stat requirements with a Strength or Dexterity value,
 *    and the name does not identify it as a shield, staff, or seal.
 *
 * Conservative by design: spells, ashes, talismans, armor, and ambiguous
 * items are excluded. Items not meeting either criterion return false.
 */
export function isWeaponRecord(record: ItemRecord): boolean {
  const itemName = baseItemName(record.itemName);
  if (weaponNameSet().has(normalizeBuildName(itemName))) return true;
  if (NON_WEAPON_RE.test(itemName)) return false;
  if (WEAPON_NAME_RE.test(itemName)) return true;
  const stats = getItemStats(itemName);
  return !!stats && ('Strength' in stats || 'Dexterity' in stats);
}

export function rootRegionForArea(area: string): string {
  const normalized = area.trim();
  for (const group of REGION_GROUPS) {
    if (group.root.toLowerCase() === normalized.toLowerCase()) return group.root;
  }
  for (const group of REGION_GROUPS) {
    if (group.patterns.some((pattern) => pattern.test(normalized))) return group.root;
  }
  return normalized || 'Unknown';
}

/**
 * Returns the unique non-null area strings present in the given records,
 * sorted by rough area progression (earliest game areas first).
 */
export function regionsForRecords(records: ItemRecord[]): string[] {
  const areaMinRank = new Map<string, number>();
  for (const r of records) {
    if (!r.area) continue;
    const rank = getAreaRank(r);
    const cur = areaMinRank.get(r.area);
    if (cur === undefined || rank < cur) areaMinRank.set(r.area, rank);
  }
  return [...areaMinRank.entries()]
    .sort(([a, ar], [b, br]) => ar - br || a.localeCompare(b))
    .map(([area]) => area);
}

export function regionGroupsForRecords(records: ItemRecord[]): RegionGroupSummary[] {
  const grouped = new Map<string, Map<string, { count: number; minRank: number }>>();
  const rootMinRank = new Map<string, number>();

  for (const record of records) {
    if (!record.area) continue;
    const root = rootRegionForArea(record.area);
    const rank = getAreaRank(record);
    const rootMap = grouped.get(root) ?? new Map<string, { count: number; minRank: number }>();
    const current = rootMap.get(record.area) ?? { count: 0, minRank: Number.MAX_SAFE_INTEGER };
    current.count += 1;
    current.minRank = Math.min(current.minRank, rank);
    rootMap.set(record.area, current);
    grouped.set(root, rootMap);
    rootMinRank.set(root, Math.min(rootMinRank.get(root) ?? Number.MAX_SAFE_INTEGER, rank));
  }

  return [...grouped.entries()]
    .map(([root, areaMap]) => {
      const areas = [...areaMap.entries()]
        .sort(([a, av], [b, bv]) => av.minRank - bv.minRank || a.localeCompare(b))
        .map(([area, value]) => ({ area, count: value.count }));
      return {
        root,
        count: areas.reduce((sum, area) => sum + area.count, 0),
        areas,
      };
    })
    .sort((a, b) => {
      const ar = rootMinRank.get(a.root) ?? Number.MAX_SAFE_INTEGER;
      const br = rootMinRank.get(b.root) ?? Number.MAX_SAFE_INTEGER;
      return ar - br || a.root.localeCompare(b.root);
    });
}

/**
 * Returns weapon records whose area is in the given set.
 * Returns an empty array when regions is empty.
 */
export function weaponsForRegions(records: ItemRecord[], regions: ReadonlySet<string>): ItemRecord[] {
  if (!regions.size) return [];
  return records.filter((r) => isWeaponRecord(r) && r.area !== null && regions.has(r.area));
}

export function weaponsForRegionSelection(records: ItemRecord[], selection: RegionSelection | null): ItemRecord[] {
  if (!selection) return [];
  return records.filter((record) => {
    if (!isWeaponRecord(record) || !record.area) return false;
    if (selection.area) return record.area === selection.area;
    return rootRegionForArea(record.area) === selection.root;
  });
}
