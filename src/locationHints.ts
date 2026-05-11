import type { ItemRecord } from './types';

export type HintDifficulty = 'easy' | 'medium' | 'hard';

interface EntityHints {
  easy: string;
  medium: string;
  hard: string;
}

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

export const BOSS_HINTS: Record<string, EntityHints> = {
  // ── LIMGRAVE / WEEPING PENINSULA ──
  'Grafted Scion': {
    easy: 'Boss drop. Found at the Chapel of Anticipation, the isolated cliffside chapel reached at the very start of the game — accessible later via the Four Belfries in western Liurnia.',
    medium: 'Boss drop in the Chapel of Anticipation, an isolated area off the coast of Limgrave.',
    hard: 'Dropped by a tutorial boss in the early game.',
  },
  'Margit the Fell Omen': {
    easy: 'Boss drop. Margit guards the gate to Stormveil Castle, the first major legacy dungeon — approach from the main road north through central Limgrave, past Stormhill.',
    medium: 'Boss drop in Stormveil Castle, Limgrave.',
    hard: 'Dropped by a story boss in the early game.',
  },
  'Godrick the Grafted': {
    easy: 'Boss drop. Godrick is the lord of Stormveil Castle, found at the end of the dungeon atop the highest tower. Enter Stormveil from the main gate or the side path through the cliffside.',
    medium: 'Boss drop in Stormveil Castle, Limgrave.',
    hard: 'Dropped by a shardbearer in the early game.',
  },
  'Flying Dragon Agheel': {
    easy: 'Boss drop. Agheel descends on the shallow lake in central Limgrave, just east of the Gatefront Ruins along the main road from the First Step.',
    medium: 'Boss drop in the lake of central Limgrave.',
    hard: 'Dropped by a field boss in the early game.',
  },
  'Tree Sentinel': {
    easy: 'Boss drop. The Tree Sentinel patrols the road directly outside the First Step, at the entrance to Limgrave — ride south from the Church of Elleh.',
    medium: 'Boss drop in western Limgrave, along the main approach road.',
    hard: 'Dropped by a field boss in the early game.',
  },
  'Bloodhound Knight Darriwil': {
    easy: 'Boss drop. Imprisoned within the Forlorn Hound Evergaol in southern Limgrave, just south of the Agheel Lake South site of grace.',
    medium: 'Boss drop in the Forlorn Hound Evergaol, Limgrave.',
    hard: 'Dropped by an evergaol boss in the early game.',
  },
  'Pumpkin Head': {
    easy: 'Boss drop. Found in the basement of the Waypoint Ruins in central-eastern Limgrave, a small ruin complex east of Agheel Lake.',
    medium: 'Boss drop in the Waypoint Ruins, Limgrave.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Crucible Knight (Stormhill Evergaol)': {
    easy: 'Boss drop. Imprisoned in the Stormhill Evergaol, located on the high cliffs of Stormhill in western Limgrave, near the path toward Stormveil Castle.',
    medium: 'Boss drop in the Stormhill Evergaol, Limgrave.',
    hard: 'Dropped by an evergaol boss in the early game.',
  },
  'Crucible Knight (Morne Tunnel)': {
    easy: 'Boss drop. Found at the end of Morne Tunnel, a mining passage in the southern cliffs of the Weeping Peninsula.',
    medium: 'Boss drop in Morne Tunnel, Weeping Peninsula.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Mad Pumpkin Head (Caelem Ruins)': {
    easy: 'Boss drop. Trapped in the sealed cellar of Caelem Ruins, a small crumbling ruin just south of the Saintsbridge in eastern Limgrave.',
    medium: 'Boss drop in Caelem Ruins, Limgrave.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Demi-Human Chief': {
    easy: 'Boss drop. Found in the Demi-Human Forest Ruins in the Weeping Peninsula, a small woodland ruin west of the main road south.',
    medium: 'Boss drop in the Demi-Human Forest Ruins, Weeping Peninsula.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Demi-Human Chiefs': {
    easy: 'Boss drop. A pair of chiefs found deep in the Coastal Cave in western Limgrave, a sea-level cave accessible by following the shoreline west from the First Step.',
    medium: 'Boss drop in the Coastal Cave, Limgrave.',
    hard: 'Dropped by a pair of dungeon bosses in the early game.',
  },
  'Leonine Misbegotten': {
    easy: 'Boss drop. Wandering the plaza at the end of Castle Morne, the southernmost fortress of the Weeping Peninsula, accessible by following the road south past the ramparts.',
    medium: 'Boss drop in Castle Morne, Weeping Peninsula.',
    hard: 'Dropped by a castle boss in the early game.',
  },
  'Erdtree Avatar (Weeping Peninsula)': {
    easy: 'Boss drop. Guards the Minor Erdtree in the eastern part of the Weeping Peninsula, visible from a great distance — approach across the shallow water from the east.',
    medium: 'Boss drop at the Minor Erdtree in the Weeping Peninsula.',
    hard: 'Dropped by a field boss in the early game.',
  },
  'Ancient Hero of Zamor (Weeping Peninsula)': {
    easy: 'Boss drop. Found at the end of the Weeping Evergaol on the eastern side of the Weeping Peninsula, atop a rise overlooking the water.',
    medium: 'Boss drop in the Weeping Evergaol, Weeping Peninsula.',
    hard: 'Dropped by an evergaol boss in the early game.',
  },
  "Night's Cavalry (Limgrave)": {
    easy: 'Boss drop. Appears at night on the bridge just south of the Agheel Lake North site of grace, along the main road through central Limgrave.',
    medium: 'Boss drop at night on a bridge in central Limgrave.',
    hard: 'Dropped by a night-time field boss in the early game.',
  },
  "Night's Cavalry (Weeping Peninsula)": {
    easy: 'Boss drop. Appears at night on the narrow land bridge leading to Castle Morne in the Weeping Peninsula, along the southernmost road.',
    medium: 'Boss drop at night on the approach to Castle Morne, Weeping Peninsula.',
    hard: 'Dropped by a night-time field boss in the early game.',
  },
  'Black Knife Assassin (Deathtouched Catacombs)': {
    easy: 'Boss drop. Lurks at the end of the Deathtouched Catacombs in western Stormhill, Limgrave — the entrance is built into the cliffs west of the Warmaster\'s Shack.',
    medium: 'Boss drop in the Deathtouched Catacombs, Limgrave.',
    hard: 'Dropped by a catacomb boss in the early game.',
  },
  'Tibia Mariner (Summonwater Village)': {
    easy: 'Boss drop. Paddles through the flooded ruins of Summonwater Village in eastern Limgrave, just north of the main road toward Caelid.',
    medium: 'Boss drop in Summonwater Village, Limgrave.',
    hard: 'Dropped by a field boss in the early game.',
  },
  'Tibia Mariner (Weeping Peninsula)': {
    easy: 'Boss drop. Wanders among the sunken graves east of the Minor Erdtree in the Weeping Peninsula, in a shallow marshland hollow.',
    medium: 'Boss drop in the cemetery east of the Minor Erdtree, Weeping Peninsula.',
    hard: 'Dropped by a field boss in the early game.',
  },
  'Deathbird (Limgrave)': {
    easy: 'Boss drop. Appears at night near the ruins just east of the Warmaster\'s Shack in Stormhill, Limgrave.',
    medium: 'Boss drop at night in Stormhill, Limgrave.',
    hard: 'Dropped by a night-time field boss in the early game.',
  },
  'Deathbird (Weeping Peninsula)': {
    easy: 'Boss drop. Appears at night on the cliffside south of Castle Morne near the rampart ruins, at the very bottom of the Weeping Peninsula.',
    medium: 'Boss drop at night near Castle Morne, Weeping Peninsula.',
    hard: 'Dropped by a night-time field boss in the early game.',
  },
  'Scaly Misbegotten': {
    easy: 'Boss drop. Found deep in the Morne Tunnel on the western shore of the Weeping Peninsula, a mine entrance cut into the seaside cliffs.',
    medium: 'Boss drop in Morne Tunnel, Weeping Peninsula.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Beastman of Farum Azula (Dragonbarrow Cave)': {
    easy: 'Boss drop. Found in the Dragonbarrow Cave deep in the northernmost reaches of Caelid\'s Dragonbarrow, hidden among the cliffs east of the Minor Erdtree.',
    medium: 'Boss drop in Dragonbarrow Cave, Dragonbarrow in Caelid.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Beastman of Farum Azula (Groveside Cave)': {
    easy: 'Boss drop. Found in Groveside Cave in western Limgrave, a small cave entrance just north of the Church of Elleh.',
    medium: 'Boss drop in Groveside Cave, Limgrave.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Cemetery Shade (Black Knife Catacombs)': {
    easy: 'Boss drop. Haunts the Black Knife Catacombs in northeastern Liurnia, a hillside crypt entrance near the path to the Grand Lift of Dectus.',
    medium: 'Boss drop in the Black Knife Catacombs, Liurnia.',
    hard: 'Dropped by a catacomb boss in the early game.',
  },
  'Miranda the Blighted Bloom (Tombsward Cave)': {
    easy: 'Boss drop. Blooms at the end of Tombsward Cave in the central Weeping Peninsula, a cave entrance tucked into the cliffs northwest of the Minor Erdtree.',
    medium: 'Boss drop in Tombsward Cave, Weeping Peninsula.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Runebear (Earthbore Cave)': {
    easy: 'Boss drop. A massive bear lairs deep within Earthbore Cave on the eastern shore of the Weeping Peninsula, a cliffside burrow south of the main road.',
    medium: 'Boss drop in Earthbore Cave, Weeping Peninsula.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Patches (Murkwater Cave)': {
    easy: 'Boss drop. Found in Murkwater Cave along the river ravine in central Limgrave, east of Agheel Lake — follow the stream north from the bridge.',
    medium: 'Boss drop in Murkwater Cave, Limgrave.',
    hard: 'Dropped by an NPC fight in the early game.',
  },

  // ── LIURNIA OF THE LAKES ──
  'Glintstone Dragon Smarag': {
    easy: 'Boss drop. Smarag sleeps on a small islet off the western shore of Liurnia, guarding the Academy Glintstone Key — swim or ride west from the Academy gate town.',
    medium: 'Boss drop on a western islet in Liurnia of the Lakes.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Red Wolf of Radagon': {
    easy: 'Boss drop. Inside the Academy of Raya Lucaria, the great sorcery school rising from the lakebed of central Liurnia — found in the Debate Parlor after ascending the waterwheel lifts.',
    medium: 'Boss drop in the Academy of Raya Lucaria, Liurnia.',
    hard: 'Dropped by a legacy dungeon boss in the mid game.',
  },
  'Rennala Queen of the Full Moon': {
    easy: 'Boss drop. The ruler of the Academy of Raya Lucaria in central Liurnia. Reach the grand library at the top of the academy\'s inner halls, across the rooftops past the Red Wolf.',
    medium: 'Boss drop in the Academy of Raya Lucaria, Liurnia.',
    hard: 'Dropped by a shardbearer in the mid game.',
  },
  'Royal Knight Loretta': {
    easy: 'Boss drop. Guards the royal manor grounds at the northern end of Caria Manor in northern Liurnia — reach the manor through the mist-shrouded courtyard past giant hands.',
    medium: 'Boss drop in Caria Manor, Liurnia.',
    hard: 'Dropped by a major knight boss in the mid game.',
  },
  'Dragonkin Soldier of Nokstella': {
    easy: 'Boss drop. Found deep in the Ainsel River underground region, in a vast watery cavern chamber near the Nokstella Waterfall Basin — accessible via the Ainsel River Well in eastern Liurnia.',
    medium: 'Boss drop in the Ainsel River underground region beneath Liurnia.',
    hard: 'Dropped by a boss in an underground river in the mid game.',
  },
  'Adan Thief of Fire': {
    easy: 'Boss drop. Imprisoned in the Malefactor\'s Evergaol on the high cliffs of southern Liurnia, overlooking the lake from the west — follow the cliffside road near the Converted Fringe Tower.',
    medium: 'Boss drop in the Malefactor\'s Evergaol, Liurnia.',
    hard: 'Dropped by an evergaol boss in the mid game.',
  },
  'Alecto Black Knife Ringleader': {
    easy: 'Boss drop. Imprisoned in the Ringleader\'s Evergaol atop a high plateau on the Moonlight Altar in southwest Liurnia, accessible only by progressing through Ranni\'s questline to the upper plateau.',
    medium: 'Boss drop in the Ringleader\'s Evergaol on the Moonlight Altar, Liurnia.',
    hard: 'Dropped by an endgame evergaol boss in the late game.',
  },
  "Night's Cavalry (Liurnia)": {
    easy: 'Boss drop. Appears at night along the main road through Liurnia, near the Gate Town Bridge leading toward the Academy of Raya Lucaria.',
    medium: 'Boss drop at night on the main road through Liurnia of the Lakes.',
    hard: 'Dropped by a night-time field boss in the mid game.',
  },
  'Deathbird (Liurnia)': {
    easy: 'Boss drop. Appears at night in the marshy shallows of southern Liurnia, near the Scenic Isle site of grace in the lakebed.',
    medium: 'Boss drop at night in southern Liurnia of the Lakes.',
    hard: 'Dropped by a night-time field boss in the mid game.',
  },
  'Black Knife Assassin (Raya Lucaria)': {
    easy: 'Boss drop. Hides on the rooftops of the Academy of Raya Lucaria in central Liurnia — drop down from the main academy halls onto the lower roofs to find this assassin.',
    medium: 'Boss drop on the rooftops of the Academy of Raya Lucaria, Liurnia.',
    hard: 'Dropped by a hidden boss in the mid game.',
  },
  "Black Knife Assassin (Sages' Cave)": {
    easy: 'Boss drop. Concealed deep within the Sages\' Cave in western Liurnia, a cliffside cavern behind the illusory wall near the lake shore.',
    medium: 'Boss drop in the Sages\' Cave, Liurnia.',
    hard: 'Dropped by a dagger-wielding assassin in the mid game.',
  },
  'Omenkiller (Village of the Albinaurics)': {
    easy: 'Boss drop. Presides over a grim pyre in the Village of the Albinaurics, a marshy settlement in southwestern Liurnia beneath the towering cliffs of the Moonlight Altar.',
    medium: 'Boss drop in the Village of the Albinaurics, Liurnia.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Erdtree Avatar (Liurnia east)': {
    easy: 'Boss drop. Wanders near the Minor Erdtree on the eastern cliffs of Liurnia, reachable by climbing the slopes east of the Frenzied Flame Village or the forest path below.',
    medium: 'Boss drop at the Minor Erdtree on the eastern cliffs of Liurnia.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Erdtree Avatar (Liurnia southwest)': {
    easy: 'Boss drop. Patrols the grove around the Minor Erdtree in the southwest of Liurnia, on the forested peninsula west of the lakes.',
    medium: 'Boss drop at the Minor Erdtree in southwestern Liurnia.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Ancient Hero of Zamor (Ruin-Strewn Precipice)': {
    easy: 'Boss drop. At the very top of the Ruin-Strewn Precipice, the treacherous mountain path connecting eastern Liurnia to the Altus Plateau — follow the winding ascent past harpies and bats.',
    medium: 'Boss drop at the Ruin-Strewn Precipice summit between Liurnia and Altus Plateau.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Tibia Mariner (Liurnia)': {
    easy: 'Boss drop. Paddles in the eastern marshes of Liurnia, near the shallow waters by the Artist\'s Shack and the Carian Study Hall.',
    medium: 'Boss drop in the eastern marshes of Liurnia of the Lakes.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Cemetery Shade (Cliffbottom Catacombs)': {
    easy: 'Boss drop. At the end of Cliffbottom Catacombs on the eastern rim of Liurnia, a crypt entrance on the high cliff road southeast of the Grand Lift of Dectus.',
    medium: 'Boss drop in the Cliffbottom Catacombs, Liurnia.',
    hard: 'Dropped by a catacomb boss in the mid game.',
  },
  'Perfumer Tricia (Unsightly Catacombs)': {
    easy: 'Boss drop. Found in the Unsightly Catacombs in southwestern Liurnia, a hidden underground crypt entered from a rocky hillside near the Purified Ruins.',
    medium: 'Boss drop in the Unsightly Catacombs, Liurnia.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Fell Twins (Unsightly Catacombs)': {
    easy: 'Boss drop. Encountered in the Unsightly Catacombs in southwestern Liurnia — a second boss encounter deeper within the same crypt.',
    medium: 'Boss drop in the Unsightly Catacombs, Liurnia.',
    hard: 'Dropped by a pair of phantom warriors in the mid game.',
  },
  "Ulcerated Tree Spirit (Gelmir Hero's Grave / Lake of Rot)": {
    easy: 'Boss drop. Found either deep in the Gelmir Hero\'s Grave on Mt. Gelmir or beneath the Lake of Rot — both are ulcerated tree spirits guarding secret chambers.',
    medium: "Boss drop in a hero's grave or underground rot lake in the mid game.",
    hard: 'Dropped by a rot-corrupted tree spirit in the mid game.',
  },
  'Bols Carian Knight': {
    easy: 'Boss drop. Found at the Cuckoo\'s Evergaol in central Liurnia, on a high rock near the path toward the Academy Gate Town.',
    medium: 'Boss drop in the Cuckoo\'s Evergaol, Liurnia.',
    hard: 'Dropped by an evergaol boss in the mid game.',
  },
  'Glintstone Dragon Adula': {
    easy: 'Boss drop. Adula appears on the Moonlight Altar, the high plateau in southwest Liurnia reached only through the final stages of Ranni\'s questline — a vast, starry plateau above the Lake of Rot.',
    medium: 'Boss drop on the Moonlight Altar, Liurnia.',
    hard: 'Dropped by a dragon in the late game.',
  },
  "Spirit-Caller Snail (Road's End Catacombs)": {
    easy: "Boss drop. At the end of the Road's End Catacombs on the far western fringe of Liurnia, a cliffside crypt entrance beneath the Moonlight Altar cliffs.",
    medium: "Boss drop in the Road's End Catacombs, Liurnia.",
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Bloodhound Knight (Ruin-Strewn Precipice)': {
    easy: 'Boss drop. Found partway up the Ruin-Strewn Precipice in eastern Liurnia, a secondary boss in the winding cliffside path to Altus.',
    medium: 'Boss drop on the Ruin-Strewn Precipice, Liurnia.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Crystalians (Raya Lucaria Crystal Tunnel)': {
    easy: 'Boss drop. A trio of crystal beings at the end of the Raya Lucaria Crystal Tunnel in eastern Liurnia, a mining cave entrance just northeast of the Academy on the lakeshore.',
    medium: 'Boss drop in the Raya Lucaria Crystal Tunnel, Liurnia.',
    hard: 'Dropped by crystal beings in the mid game.',
  },
  'Magma Wyrm Makar': {
    easy: 'Boss drop. Found in the depths of the Ruin-Strewn Precipice, the final guardian before emerging onto the Altus Plateau from eastern Liurnia.',
    medium: 'Boss drop in the Ruin-Strewn Precipice between Liurnia and Altus Plateau.',
    hard: 'Dropped by a wyrm boss in the mid game.',
  },
  'Full-Grown Fallingstar Beast (Liurnia)': {
    easy: 'Boss drop. Perches atop the crater on the summit of Mt. Gelmir overlooking Liurnia, reachable by climbing the slopes from the Ninth Mt. Gelmir Campsite.',
    medium: 'Boss drop at the summit crater of Mt. Gelmir.',
    hard: 'Dropped by a fallingstar beast in the mid game.',
  },

  // ── CAELID / DRAGONBARROW ──
  'Starscourge Radahn': {
    easy: 'Boss drop. Radahn awaits in the great desert arena of Redmane Castle on the southeastern peninsula of Caelid. Enter the castle during the Radahn Festival, accessed by crossing the massive bridge from the north.',
    medium: 'Boss drop at Redmane Castle in southeastern Caelid.',
    hard: 'Dropped by a shardbearer in the mid game.',
  },
  "Commander O'Neil": {
    easy: 'Boss drop. Commands the Heart of Aeonia in central Caelid, the great scarlet-rot swamp — found in the center among rotted trees and soldiers.',
    medium: 'Boss drop in the Heart of Aeonia swamp, Caelid.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Putrid Avatar (Caelid)': {
    easy: 'Boss drop. Patrols near the Minor Erdtree in the western part of Caelid, close to the border with Limgrave — follow the road east from Summonwater Village.',
    medium: 'Boss drop at the Minor Erdtree in western Caelid.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Putrid Avatar (Dragonbarrow)': {
    easy: 'Boss drop. Guards the Minor Erdtree in northern Dragonbarrow, the high-level northern region of Caelid — approach from the cliffs near the Bestial Sanctum.',
    medium: 'Boss drop at the Minor Erdtree in Dragonbarrow, Caelid.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Decaying Ekzykes': {
    easy: 'Boss drop. A rotted dragon that ambushes travelers along the main road through southern Caelid, near the Caelid Highway South site of grace — among the rotting carcasses of dragons.',
    medium: 'Boss drop along the southern highway of Caelid.',
    hard: 'Dropped by a rotted dragon in the mid game.',
  },
  'Nox Swordstress and Nox Priest': {
    easy: 'Boss drop. A paired boss found in Sellia, the Town of Sorcery in eastern Caelid. Light the three braziers atop the town towers to unlock the sealed chamber beneath.',
    medium: 'Boss drop in Sellia, Town of Sorcery, Caelid.',
    hard: 'Dropped by paired Nox warriors in the mid game.',
  },
  "Night's Cavalry (Caelid)": {
    easy: 'Boss drop. Appears at night along the main southern highway of Caelid, patrolling near the bridge west of the Cathedral of Dragon Communion.',
    medium: 'Boss drop at night on the southern Caelid highway.',
    hard: 'Dropped by a night-time field boss in the mid game.',
  },
  'Black Blade Kindred (Bestial Sanctum)': {
    easy: 'Boss drop. Wards the entrance to the Bestial Sanctum in far northeastern Dragonbarrow, Caelid — a remote temple perched on the eastern cliffs overlooking the sea.',
    medium: 'Boss drop outside the Bestial Sanctum, Dragonbarrow in Caelid.',
    hard: 'Dropped by a gargoyle guardian in the mid game.',
  },
  'Erdtree Avatar (Caelid minor erdtree)': {
    easy: 'Boss drop. Stands beneath the minor Erdtree in the Dragonbarrow region of northern Caelid, near the cliffs overlooking Limgrave.',
    medium: 'Boss drop at the minor Erdtree in Dragonbarrow, Caelid.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Cemetery Shade (Caelid Catacombs)': {
    easy: 'Boss drop. Haunts the Caelid Catacombs just south of the Swamp of Aeonia and the main Caelid road, a crypt entrance cut into a low cliff.',
    medium: 'Boss drop in the Caelid Catacombs, Caelid.',
    hard: 'Dropped by a catacomb boss in the mid game.',
  },
  'Battlemage Hugues (Sellia Evergaol)': {
    easy: 'Boss drop. Imprisoned in the Sellia Evergaol on the high cliff just north of Sellia, Town of Sorcery, in eastern Caelid.',
    medium: 'Boss drop in the Sellia Evergaol, Caelid.',
    hard: 'Dropped by an evergaol boss in the mid game.',
  },
  'Beastman of Farum Azula (Sellia Crystal Tunnel)': {
    easy: 'Boss drop. At the end of the Sellia Crystal Tunnel in eastern Caelid, a mine entrance hidden on a lower cliff ledge near Sellia, reachable by descending carefully.',
    medium: 'Boss drop in the Sellia Crystal Tunnel, Caelid.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Crystalians (Sellia Crystal Tunnel)': {
    easy: 'Boss drop. Also encountered in the Sellia Crystal Tunnel of eastern Caelid — a second crystal foe deeper in the mine.',
    medium: 'Boss drop in the Sellia Crystal Tunnel, Caelid.',
    hard: 'Dropped by crystal beings in the mid game.',
  },
  'Cleanrot Knight (Stillwater Cave)': {
    easy: 'Boss drop. Found in Stillwater Cave on the southern shore of Liurnia, where the lake shallows meet the cliffs — enter the damp cavern from the water\'s edge near the Liurnia Highway South site of grace, close to the path toward Caelid.',
    medium: 'Boss drop in Stillwater Cave near the Liurnia-Caelid border.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Kindred of Rot (Yelough Anix Tunnel)': {
    easy: 'Boss drop. In the depths of the Yelough Anix Tunnel in the far western Consecrated Snowfield, a mining tunnel among the frozen highlands beyond the Mountaintops.',
    medium: 'Boss drop in the Yelough Anix Tunnel, Consecrated Snowfield.',
    hard: 'Dropped by a dungeon boss in the late game.',
  },
  'Radahn Foot Soldier (Redmane Castle)': {
    easy: 'Boss drop. A foot soldier prowling the courtyard of Redmane Castle in southern Caelid — the castle that hosts the Radahn Festival.',
    medium: 'Boss drop in Redmane Castle, Caelid.',
    hard: 'Dropped by a soldier in the mid game.',
  },

  // ── ALTUS PLATEAU / MT. GELMIR ──
  'Rykard Lord of Blasphemy': {
    easy: 'Boss drop. Rykard dwells deep within Volcano Manor on the slopes of Mt. Gelmir, the infernal mountain in western Altus. Navigate the manor\'s hidden chambers and the Prison Town to reach his lair.',
    medium: 'Boss drop in Volcano Manor, Mt. Gelmir.',
    hard: 'Dropped by a shardbearer in the mid game.',
  },
  'Demi-Human Queen Margot': {
    easy: 'Boss drop. Hiding in the Volcano Cave on the lower slopes of Mt. Gelmir, a rocky burrow on the northern face of the mountain.',
    medium: 'Boss drop in Volcano Cave, Mt. Gelmir.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Full-Grown Fallingstar Beast (Mt. Gelmir summit)': {
    easy: 'Boss drop. At the very summit of Mt. Gelmir, guarding the great crater near Volcano Manor — climb the winding mountain path past the tree guardians.',
    medium: 'Boss drop at the summit of Mt. Gelmir.',
    hard: 'Dropped by a fallingstar beast in the mid game.',
  },
  'Abductor Virgins': {
    easy: 'Boss drop. A pair of iron maidens found at the end of the Subterranean Inquisition Chamber, reachable by being abducted at the bottom of the waterwheel lift in the Academy of Raya Lucaria, or beneath Volcano Manor.',
    medium: 'Boss drop beneath the Academy of Raya Lucaria or Volcano Manor.',
    hard: 'Dropped by abductor constructs in the mid game.',
  },
  'Godskin Noble (Volcano Manor)': {
    easy: 'Boss drop. Encountered deep inside Volcano Manor on Mt. Gelmir, in the grand chapel of the Eiglay temple — past the prison town and narrow lava corridors.',
    medium: 'Boss drop in Volcano Manor, Mt. Gelmir.',
    hard: 'Dropped by a godskin apostle in the mid game.',
  },
  'Erdtree Avatar (Altus Plateau)': {
    easy: 'Boss drop. Appears at the Minor Erdtree in the central Altus Plateau, just north of the Altus Highway Junction — visible from the main road through the golden fields.',
    medium: 'Boss drop at the Minor Erdtree in the Altus Plateau.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  "Ancient Hero of Zamor (Sainted Hero's Grave)": {
    easy: "Boss drop. At the end of the Sainted Hero's Grave in the western Altus Plateau — find the ornate tomb entrance carved into the cliffside directly west of the Grand Lift of Dectus, across the shallow lake from the Erdtree-Gazing Hill site of grace.",
    medium: "Boss drop in the Sainted Hero's Grave, Altus Plateau.",
    hard: 'Dropped by a hero grave boss in the mid game.',
  },
  "Night's Cavalry (Altus Plateau)": {
    easy: 'Boss drop. Two riders appear at night on the road near the gate into the inner Altus Plateau fortifications, just south of the Outer Wall Phantom Tree.',
    medium: 'Boss drop at night on the road in the Altus Plateau.',
    hard: 'Dropped by night-time field bosses in the mid game.',
  },
  'Deathbird (Altus Plateau)': {
    easy: 'Boss drop. Appears at night near the Hermit Merchant\'s Shack in the eastern Altus Plateau, close to the path leading up to the outer wall of Leyndell.',
    medium: 'Boss drop at night in the eastern Altus Plateau.',
    hard: 'Dropped by a night-time field boss in the mid game.',
  },
  'Tibia Mariner (Altus Plateau)': {
    easy: 'Boss drop. Appears among the Wyndham Ruins in the western Altus Plateau, near the flooded ruins just off the main road — look for the glowing boat on the water.',
    medium: 'Boss drop in the Wyndham Ruins, Altus Plateau.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Black Knife Assassin (Altus Tunnel)': {
    easy: 'Boss drop. At the end of the Altus Tunnel in the southern Altus Plateau, a mining passage entered from the cliffside road just after the Grand Lift of Dectus.',
    medium: 'Boss drop in the Altus Tunnel, Altus Plateau.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Demi-Human Queen Gilika (Lux Ruins)': {
    easy: 'Boss drop. In the basement of the Lux Ruins in the northern Altus Plateau, a ruined structure on the approach to Mt. Gelmir from the north.',
    medium: 'Boss drop in the Lux Ruins, Altus Plateau.',
    hard: 'Dropped by a demi-human queen in the mid game.',
  },
  'Demi-Human Queen Maggie (Hermit Village)': {
    easy: 'Boss drop. Found in the Hermit Village on the lower slopes of Mt. Gelmir, a decrepit settlement on the winding mountain road.',
    medium: 'Boss drop in the Hermit Village, Mt. Gelmir.',
    hard: 'Dropped by a demi-human queen in the mid game.',
  },
  'Stonedigger Troll (Old Altus Tunnel)': {
    easy: 'Boss drop. At the end of the Old Altus Tunnel in the central Altus Plateau, a mining tunnel entrance near the main road west of the capital outskirts.',
    medium: 'Boss drop in the Old Altus Tunnel, Altus Plateau.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Stonedigger Troll (Altus Tunnel)': {
    easy: 'Boss drop. Also encountered in the Altus Tunnel of the southern Altus Plateau, near the lift connecting from Liurnia.',
    medium: 'Boss drop in the Altus Tunnel, Altus Plateau.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  "Omenkiller and Miranda the Blighted Bloom (Perfumer's Grotto)": {
    easy: "Boss drop. A pair guarding the Perfumer's Grotto in the northern Altus Plateau, a fragrant cave entrance on the hillside near the road to the Shaded Castle.",
    medium: "Boss drop in the Perfumer's Grotto, Altus Plateau.",
    hard: 'Dropped by paired dungeon bosses in the mid game.',
  },
  'Guardian Golem (Highroad Cave)': {
    easy: 'Boss drop. A towering golem at the end of Highroad Cave, a cliffside cavern in northern Liurnia — follow the road north from the East Raya Lucaria Gate, past the ravine, to find the cave mouth on the left cliff face beneath the broken bridge.',
    medium: 'Boss drop in Highroad Cave, northern Liurnia.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Wormface (minor erdtree Altus)': {
    easy: 'Boss drop. A grotesque creature that haunts the woods near the Minor Erdtree in the central Altus Plateau, lurking among the trees on the woodland path.',
    medium: 'Boss drop near the Minor Erdtree in the Altus Plateau.',
    hard: 'Dropped by a field boss in the mid game.',
  },

  // ── LEYNDELL ──
  'Godfrey First Elden Lord': {
    easy: 'Boss drop. The true Godfrey stands in the ashen arena at the foot of the burning Erdtree within Leyndell Ashen Capital — after the city burns, follow the ruined boulevard from the capital of ash through the toppled buildings to the final plaza.',
    medium: 'Boss drop in Leyndell Ashen Capital.',
    hard: 'Dropped by a story boss in the endgame.',
  },
  'Morgott the Omen King': {
    easy: 'Boss drop. Morgott awaits at the foot of the Erdtree itself, at the highest point of Leyndell Royal Capital — ascend through the Queen\'s Bedchamber and cross the great bridge.',
    medium: 'Boss drop at the Elden Throne in Leyndell Royal Capital.',
    hard: 'Dropped by a shardbearer in the mid game.',
  },
  'Draconic Tree Sentinel (Capital Outskirts)': {
    easy: 'Boss drop. Guards the main northern gate into the outer walls of Leyndell Royal Capital, on the road from the Outer Wall Battleground.',
    medium: 'Boss drop at the northern gate of Leyndell Royal Capital.',
    hard: 'Dropped by a sentinel guarding Leyndell in the mid game.',
  },
  'Crucible Knight and Crucible Knight Ordovis': {
    easy: "Boss drop. Found together deep in the Auriza Hero's Grave on the eastern outskirts of Leyndell Royal Capital, an ornate tomb entrance built into the cliffs east of the outer wall.",
    medium: "Boss drop in the Auriza Hero's Grave, Leyndell Royal Capital.",
    hard: 'Dropped by a pair of crucible knights in the mid game.',
  },
  'Esgar Priest of Blood (Leyndell Catacombs)': {
    easy: 'Boss drop. Unlocked through the sewer depths of Leyndell Royal Capital — find the hidden entrance in the Subterranean Shunning-Grounds that leads to the catacombs.',
    medium: 'Boss drop in the Leyndell Catacombs beneath the Royal Capital.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Fell Twins (Leyndell Catacombs)': {
    easy: 'Boss drop. A second encounter in the Leyndell Catacombs beneath the Royal Capital — deeper within the same subterranean crypt.',
    medium: 'Boss drop in the Leyndell Catacombs beneath the Royal Capital.',
    hard: 'Dropped by phantom twins in the mid game.',
  },
  'Ancient Dragon Lansseax': {
    easy: 'Boss drop. Lansseax descends on the plateau south of the outer walls of Leyndell Royal Capital, near the Abandoned Coffin site of grace on the grassy highlands.',
    medium: 'Boss drop on the plateau south of Leyndell Royal Capital.',
    hard: 'Dropped by an ancient dragon in the mid game.',
  },
  'Ulcerated Tree Spirit (Leyndell)': {
    easy: 'Boss drop. A rotted tree spirit lurking in the Subterranean Shunning-Grounds beneath Leyndell Royal Capital, accessible from the lower city streets near the Avenue Balcony — deep in the sewer tunnels.',
    medium: 'Boss drop in the sewers beneath Leyndell Royal Capital.',
    hard: 'Dropped by a tree spirit in the mid game.',
  },

  // ── NOKRON / SIOFRA / DEEPROOT ──
  'Ancestor Spirit': {
    easy: 'Boss drop. Summoned in the Siofra River wells by lighting the eight flame pillars across the underground river — access the river from the Siofra River Well in the Mistwood of Limgrave.',
    medium: 'Boss drop in the Siofra River underground region.',
    hard: 'Dropped by a spirit deer in the early game.',
  },
  'Regal Ancestor Spirit': {
    easy: 'Boss drop. Summoned deep in the Nokron Eternal City, the great underground city accessible through the crater that opens in Limgrave after defeating Starscourge Radahn.',
    medium: 'Boss drop in Nokron, Eternal City.',
    hard: 'Dropped by a spirit deer in the mid game.',
  },
  'Lichdragon Fortissax': {
    easy: 'Boss drop. Fortissax is fought in the Dreaming Realm deep within Deeproot Depths, the chasm beneath the Erdtree — accessible through Fia\'s questline in the Deathbed Dream.',
    medium: 'Boss drop in Deeproot Depths beneath Leyndell.',
    hard: 'Dropped by a lichdragon in the mid game.',
  },
  "Fia's Champions": {
    easy: 'Boss drop. A series of spectral champions summoned by Fia in Deeproot Depths, the deepest underground region beneath the Erdtree — reachable from the sewers of Leyndell or from Nokron.',
    medium: 'Boss drop in Deeproot Depths beneath Leyndell.',
    hard: 'Dropped by the champions of death in the mid game.',
  },
  'Mimic Tear': {
    easy: 'Boss drop. Found behind a fog gate in the Night\'s Sacred Ground area of Nokron, Eternal City — cross the rooftops from the Nokron bridge and enter the sacred temple.',
    medium: 'Boss drop in Nokron, Eternal City.',
    hard: 'Dropped by a shapeshifting foe in the mid game.',
  },
  'Valiant Gargoyle': {
    easy: 'Boss drop. A pair of gargoyles guards the waterfall passage from Nokron to Deeproot Depths, in the Aqueduct-Facing Cliffs area of the underground realm.',
    medium: 'Boss drop in the aqueduct between Nokron and Deeproot Depths.',
    hard: 'Dropped by twin gargoyles in the mid game.',
  },

  // ── MOUNTAINTOPS OF THE GIANTS ──
  'Fire Giant': {
    easy: 'Boss drop. The last Fire Giant guards the Forge of the Giants at the easternmost peak of the Mountaintops of the Giants — cross the frozen lake and the chain bridge to reach him.',
    medium: 'Boss drop at the Forge of the Giants in the Mountaintops of the Giants.',
    hard: 'Dropped by a story boss in the late game.',
  },
  'Commander Niall': {
    easy: 'Boss drop. Niall commands Castle Sol, the frozen fortress in the northern Mountaintops of the Giants — cross the blizzard-swept plains and ascend the castle ramparts.',
    medium: 'Boss drop in Castle Sol, Mountaintops of the Giants.',
    hard: 'Dropped by a fortress commander in the late game.',
  },
  'Borealis the Freezing Fog': {
    easy: 'Boss drop. Borealis emerges from the freezing fog over the frozen lake in the northeastern Mountaintops of the Giants, just east of the Freezing Lake site of grace.',
    medium: 'Boss drop on the frozen lake of the Mountaintops of the Giants.',
    hard: 'Dropped by an ice dragon in the late game.',
  },
  "Night's Cavalry (Mountaintops)": {
    easy: 'Boss drop. Appears at night on the snowy road approaching the inner wall of the Mountaintops, near the frozen river northeast of the Zamor Ruins.',
    medium: 'Boss drop at night in the Mountaintops of the Giants.',
    hard: 'Dropped by a night-time field boss in the late game.',
  },
  'Deathbird (Mountaintops)': {
    easy: 'Boss drop. Appears at night near the Apostate Derelict church in the far northern reaches of the Mountaintops, near the snowfields leading to Castle Sol.',
    medium: 'Boss drop at night in the northern Mountaintops of the Giants.',
    hard: 'Dropped by a night-time field boss in the late game.',
  },
  'Erdtree Avatar (Mountaintops)': {
    easy: 'Boss drop. Wanders near the Minor Erdtree in the western Mountaintops of the Giants, in the snowy woodland by the road to the Fire Giant.',
    medium: 'Boss drop at the Minor Erdtree in the Mountaintops of the Giants.',
    hard: 'Dropped by a field boss in the late game.',
  },
  'Ancient Hero of Zamor (Mountaintops)': {
    easy: 'Boss drop. Found in the Zamor Ruins, a frozen ruin complex in the central Mountaintops of the Giants along the main road east.',
    medium: 'Boss drop in the Zamor Ruins, Mountaintops of the Giants.',
    hard: 'Dropped by a Zamor hero in the late game.',
  },
  'Black Blade Kindred (Mountaintops)': {
    easy: 'Boss drop. Wards the Grand Lift of Rold in the eastern Mountaintops of the Giants, the gateway to the Consecrated Snowfield — stands before the lift on the main road.',
    medium: 'Boss drop at the Grand Lift of Rold in the Mountaintops.',
    hard: 'Dropped by a gargoyle guardian in the late game.',
  },
  'Death Rite Bird (Mountaintops)': {
    easy: 'Boss drop. Appears at night near the frozen river in the eastern Mountaintops, just west of the main road to the Fire Giant.',
    medium: 'Boss drop at night in the eastern Mountaintops of the Giants.',
    hard: 'Dropped by a death rite bird in the late game.',
  },
  'Vyke Knight of the Roundtable': {
    easy: 'Boss drop. Imprisoned in the Lord Contender\'s Evergaol on the plateau of the northern Mountaintops, reachable by taking the Spirit Spring up from the frozen river.',
    medium: 'Boss drop in the Lord Contender\'s Evergaol, Mountaintops.',
    hard: 'Dropped by an evergaol boss in the late game.',
  },
  'Roundtable Knight Vyke': {
    easy: 'Boss drop. The frenzied form of Vyke found in the Church of Inhibition on the eastern cliffs of Liurnia, a small chapel overlooking the lake near the Frenzied Flame Village.',
    medium: 'Boss drop in the Church of Inhibition, northeastern Liurnia.',
    hard: 'Dropped by a frenzied knight in the mid game.',
  },

  // ── FARUM AZULA / ENDGAME ──
  'Maliketh the Black Blade': {
    easy: 'Boss drop. Maliketh presides over the crumbling temple at the heart of Crumbling Farum Azula, the time-worn dragon temple floating beyond time — reach it by using the Forge of the Giants and crossing the sky bridge.',
    medium: 'Boss drop in the temple at the heart of Crumbling Farum Azula.',
    hard: 'Dropped by a shardbearer in the endgame.',
  },
  'Dragonlord Placidusax': {
    easy: 'Boss drop. Placidusax rests in the heart of the storm at the lowest point of Crumbling Farum Azula, far below the main walkways — lie down on the hidden ledge near the bridge to travel back in time.',
    medium: 'Boss drop in the eye of the storm deep within Crumbling Farum Azula.',
    hard: 'Dropped by the ancient dragonlord in the endgame.',
  },
  'Beast Clergyman': {
    easy: 'Boss drop. The Beast Clergyman reveals his true nature in the temple of Crumbling Farum Azula, the floating dragon temple beyond time — accessible only after the Forge of the Giants.',
    medium: 'Boss drop in Crumbling Farum Azula.',
    hard: 'Dropped by a story boss in the endgame.',
  },
  'Godskin Duo': {
    easy: 'Boss drop. A pair of Godskin apostles block the dragon temple in Crumbling Farum Azula, guarding the passage to Maliketh — found in the temple\'s inner sanctum.',
    medium: 'Boss drop in the dragon temple of Crumbling Farum Azula.',
    hard: 'Dropped by godskin apostles in the endgame.',
  },
  'Elden Beast': {
    easy: 'Boss drop. The final manifestation of the Elden Ring, fought in the heart of the Erdtree after besting Radagon — within the divine arena at the furthest point of Leyndell Ashen Capital.',
    medium: 'Boss drop within the Erdtree at Leyndell Ashen Capital.',
    hard: 'Dropped by the final boss.',
  },
  'Radagon of the Golden Order': {
    easy: 'Boss drop. Radagon stands before the shattered Elden Ring deep inside the Erdtree, at the end of Leyndell Ashen Capital — the final road through the burning city.',
    medium: 'Boss drop within the Erdtree at Leyndell Ashen Capital.',
    hard: 'Dropped by the final story boss.',
  },
  'Sir Gideon Ofnir the All-Knowing': {
    easy: 'Boss drop. Gideon awaits in the Erdtree Sanctuary of Leyndell Ashen Capital, after the city has been burned — blocking the final approach from the capital\'s upper street.',
    medium: 'Boss drop in Leyndell Ashen Capital.',
    hard: 'Dropped by a story boss in the endgame.',
  },
  'Godfrey First Elden Lord (Golden Shade)': {
    easy: 'Boss drop. The golden shade of Godfrey bars entry to the Erdtree Sanctuary deep within Leyndell Royal Capital — work through the city streets from the East Capital Rampart, climb the wing of the fallen dragon statue, and ascend the tree branch to the sanctuary.',
    medium: 'Boss drop in the Erdtree Sanctuary of Leyndell Royal Capital.',
    hard: 'Dropped by a story boss in the mid game.',
  },

  // ── ELPHAEL / HALIGTREE ──
  'Loretta Knight of the Haligtree': {
    easy: 'Boss drop. Royal Knight Loretta guards the entrance to Elphael, Brace of the Haligtree — the great city and final sanctuary of Miquella, hidden in the far north beyond the Consecrated Snowfield.',
    medium: 'Boss drop at the entrance to Elphael, Haligtree.',
    hard: 'Dropped by a knight in the late game.',
  },
  'Malenia Blade of Miquella': {
    easy: 'Boss drop. Malenia waits at the roots of the Haligtree in Elphael, the hidden sacred city at the far northern edge of the Lands Between — reachable through the Consecrated Snowfield and the Liturgical Town puzzle.',
    medium: 'Boss drop at the base of the Haligtree in Elphael.',
    hard: 'Dropped by a shardbearer in the late game.',
  },
  'Ulcerated Tree Spirit (Elphael)': {
    easy: 'Boss drop. An ulcerated tree spirit emerges near the drainage channel deep within Elphael, Brace of the Haligtree — accessible from the lower walkways near the rot pools.',
    medium: 'Boss drop in the lower levels of Elphael, Haligtree.',
    hard: 'Dropped by a tree spirit in the late game.',
  },
  'Erdtree Avatar (Haligtree)': {
    easy: 'Boss drop. Found on the higher ring platforms of Elphael, guarding a bridge connecting the upper and lower districts of the Haligtree city.',
    medium: 'Boss drop in Elphael, Haligtree.',
    hard: 'Dropped by a field boss in the late game.',
  },

  // ── SHADOW OF THE ERDTREE (DLC) ──
  'Messmer the Impaler': {
    easy: 'Boss drop. Messmer presides over the Dark Chamber at the peak of Shadow Keep in the Land of Shadow — the great fortress at the center of the DLC map, reached by crossing the bridge from the Ensis encampment.',
    medium: 'Boss drop in Shadow Keep, Land of Shadow (DLC).',
    hard: 'Dropped by a story boss in the DLC.',
  },
  'Romina Saint of the Bud': {
    easy: 'Boss drop. Romina waits in the Church of the Bud deep in the Rauh Ruins of the Land of Shadow — descend through the crumbling stone corridors of the southern ruins, past the rot-ridden hollows, to reach the sunken temple.',
    medium: 'Boss drop in the Rauh Ruins, Land of Shadow (DLC).',
    hard: 'Dropped by a rot saint in the DLC.',
  },
  'Scadutree Avatar': {
    easy: 'Boss drop. A twisted Scadutree Avatar stands before the church in the Scaduview region of the Land of Shadow — travel the high road east of the Shadow Keep, past the tree-worship encampment, to reach the cathedral clearing.',
    medium: 'Boss drop in the Scaduview area, Land of Shadow (DLC).',
    hard: 'Dropped by a Scadutree avatar in the DLC.',
  },
  'Divine Beast Dancing Lion': {
    easy: 'Boss drop. A dancing divine beast encountered in the ancient theatre of Belurat, Tower Settlement — the first great legacy ruin of the Land of Shadow, reached by crossing the great bridge from the Gravesite Plain entrance.',
    medium: 'Boss drop in Belurat, Tower Settlement, Land of Shadow (DLC).',
    hard: 'Dropped by a divine beast in the DLC.',
  },
  'Midra Lord of Frenzied Flame': {
    easy: 'Boss drop. Midra dwells in the Manse of Frenzy, deep within the Abyssal Woods of the Land of Shadow — a hidden estate filled with the flame of frenzy, found in the southern jungles.',
    medium: 'Boss drop in the Abyssal Woods, Land of Shadow (DLC).',
    hard: 'Dropped by a frenzied lord in the DLC.',
  },
  'Bayle the Dread': {
    easy: 'Boss drop. Bayle is the great dragon of the Jagged Peak, a towering mountain of dragonkind in the far southeast of the Land of Shadow — ascend the peak\'s treacherous slopes.',
    medium: 'Boss drop at the Jagged Peak, Land of Shadow (DLC).',
    hard: 'Dropped by a dragon lord in the DLC.',
  },
  'Commander Gaius': {
    easy: 'Boss drop. Gaius rides through the flooded valley near the Shadow Keep hinterlands in the Land of Shadow, a side path behind the keep accessible from the main fortress.',
    medium: 'Boss drop in the hinterlands of Shadow Keep, Land of Shadow (DLC).',
    hard: 'Dropped by a mounted commander in the DLC.',
  },
  'Metyr Mother of Fingers': {
    easy: 'Boss drop. Metyr waits in the Finger Ruins on the northern peninsula of the Land of Shadow — a sacred finger-shaped ruins complex accessible through Count Ymir\'s questline.',
    medium: 'Boss drop in the Finger Ruins, Land of Shadow (DLC).',
    hard: 'Dropped by a cosmic entity in the DLC.',
  },
  'Promised Consort Radahn': {
    easy: 'Boss drop. The divine gate encounter at the peak of Enir-Ilim in the Land of Shadow, the spiraling tower beyond the Belurat ruins — the final legacy area of the DLC.',
    medium: 'Boss drop at Enir-Ilim, Land of Shadow (DLC).',
    hard: 'Dropped by the final DLC boss.',
  },
  'Count Ymir Mother of Fingers': {
    easy: 'Boss drop. Found deep within the Cathedral of Manus Metyr in the Land of Shadow, the great cathedral on the eastern peninsula — progress through Ymir\'s questline to access the deepest chamber.',
    medium: 'Boss drop in the Cathedral of Manus Metyr, Land of Shadow (DLC).',
    hard: 'Dropped by a boss accessed through a lengthy questline in the DLC.',
  },
  'Golden Hippopotamus': {
    easy: 'Boss drop. A massive golden hippopotamus ambushes travelers in the Shadow Keep ground approach of the Land of Shadow, near the flooded entry path.',
    medium: 'Boss drop near Shadow Keep, Land of Shadow (DLC).',
    hard: 'Dropped by a field boss in the DLC.',
  },
  'Putrescent Knight': {
    easy: 'Boss drop. A putrid knight found in the Stone Coffin fissure of the southern Land of Shadow, a deep chasm littered with stone coffins — accessible via the Ainsel River passage or the southern graveyard field.',
    medium: 'Boss drop in the Stone Coffin fissure, Land of Shadow (DLC).',
    hard: 'Dropped by a rotted knight in the DLC.',
  },
  'Ulcerated Tree Spirit (Shadow Keep)': {
    easy: 'Boss drop. An ulcerated tree spirit emerges from the waters in the Shadow Keep moat area of the Land of Shadow, accessible via the flooded lower levels of the fortress.',
    medium: 'Boss drop in the Shadow Keep, Land of Shadow (DLC).',
    hard: 'Dropped by a tree spirit in the DLC.',
  },
  'Ghostflame Dragon': {
    easy: 'Boss drop. A ghostflame dragon found in the Gravesite Plain near the Cerulean Coast of the Land of Shadow — the southernmost coastal region of the DLC map.',
    medium: 'Boss drop near the Cerulean Coast, Land of Shadow (DLC).',
    hard: 'Dropped by a ghostflame dragon in the DLC.',
  },
  'Ancient Dragon-Man': {
    easy: 'Boss drop. A reclusive dragon-man found in the Dragon\'s Pit of the southeastern Land of Shadow, a rocky canyon on the approach to the Jagged Peak.',
    medium: "Boss drop in the Dragon's Pit, Land of Shadow (DLC).",
    hard: 'Dropped by a dragon warrior in the DLC.',
  },
  'Rugalea the Great Red Bear': {
    easy: 'Boss drop. A massive red bear terrorizes the woods of the Rauh Ruins area of the Land of Shadow — found among the overgrown ruins of the western jungles.',
    medium: 'Boss drop in the Rauh Ruins, Land of Shadow (DLC).',
    hard: 'Dropped by a great bear in the DLC.',
  },
  'Jori Elder Inquisitor': {
    easy: 'Boss drop. Jori presides over the Darklight Catacombs deep within the Land of Shadow, an elaborate catacomb system accessible from the Abyssal Woods or the lower Shadow Keep.',
    medium: 'Boss drop in the Darklight Catacombs, Land of Shadow (DLC).',
    hard: 'Dropped by a catacomb boss in the DLC.',
  },
  'Demi-Human Swordmaster Onze': {
    easy: 'Boss drop. A skilled demi-human swordsman imprisoned deep within Belurat Gaol, the cliffside prison of the Land of Shadow — enter the gaol through the sealed doorway on the lower cliff path west of the Tower Settlement.',
    medium: 'Boss drop in the Belurat Gaol, Land of Shadow (DLC).',
    hard: 'Dropped by a demi-human swordsman in the DLC.',
  },
  'Red Bear': {
    easy: 'Boss drop. A raging red bear found crashing through the woods of the northern Gravesite Plain in the Land of Shadow — near the Chapel of Repose.',
    medium: 'Boss drop in the Gravesite Plain, Land of Shadow (DLC).',
    hard: 'Dropped by a field boss in the DLC.',
  },
  'Death Knight': {
    easy: 'Boss drop. A deathly knight found in the Fog Rift Catacombs of the Land of Shadow, accessed through a hidden passage in the lower Gravesite Plain — a crypt of eternal darkness sealed behind a fog wall.',
    medium: 'Boss drop in the Fog Rift Catacombs, Land of Shadow (DLC).',
    hard: 'Dropped by a death knight in the DLC.',
  },
  'Furnace Golem': {
    easy: 'Boss drop. A towering furnace golem found near the ruined forges of the ancient stone dragon corpse in the Gravesite Plain of the Land of Shadow — follow the scorched road west from the starting grace to the hollowed-out forge basin.',
    medium: 'Boss drop at a ruined forge in the Gravesite Plain, Land of Shadow (DLC).',
    hard: 'Dropped by a siege golem in the DLC.',
  },
  'Tree Sentinel (Shadow Realm)': {
    easy: 'Boss drop. A Tree Sentinel stationed on the Gravesite Plain of the Land of Shadow, the first open field of the DLC — guarding the approach to the Ensis road.',
    medium: 'Boss drop in the Gravesite Plain, Land of Shadow (DLC).',
    hard: 'Dropped by a tree sentinel in the DLC.',
  },
  "Night's Cavalry (Shadow Realm)": {
    easy: 'Boss drop. Appears at night riding through the fields of the Land of Shadow, near the Ellac Greatbridge or the main plains road region of the DLC.',
    medium: 'Boss drop at night in the Land of Shadow (DLC).',
    hard: 'Dropped by a night-time field boss in the DLC.',
  },
  'Blackgaol Knight': {
    easy: 'Boss drop. A dark-armored knight found in the Western Nameless Mausoleum of the Land of Shadow, among the fields of the Gravesite Plain.',
    medium: 'Boss drop in the Western Nameless Mausoleum, Land of Shadow (DLC).',
    hard: 'Dropped by a mausoleum guardian in the DLC.',
  },
  'Moonrithyll Carian Knight': {
    easy: 'Boss drop. A Carian knight found in the Castle Ensis area of the Land of Shadow, the Carian-related fortress found in the northern plains of the DLC map.',
    medium: 'Boss drop in Castle Ensis, Land of Shadow (DLC).',
    hard: 'Dropped by a Carian knight in the DLC.',
  },
  'Curseblade Labirith': {
    easy: 'Boss drop. A curseblade creature found in the lower depths near the Lamenter\'s Gaol of the Land of Shadow, accessible via the hidden gaol in the southern Abyssal Woods.',
    medium: 'Boss drop near the Lamenter\'s Gaol, Land of Shadow (DLC).',
    hard: 'Dropped by a curseblade in the DLC.',
  },
  'Lamenter': {
    easy: 'Boss drop. The Lamenter can be challenged in the Lamenter\'s Gaol of the Land of Shadow, a secluded prison tower found in the southern Abyssal Woods region.',
    medium: 'Boss drop in the Lamenter\'s Gaol, Land of Shadow (DLC).',
    hard: 'Dropped by a gaol boss in the DLC.',
  },
  'Frenzy-Flaming Tower': {
    easy: 'Boss drop. A frenzied flame construct guarding one of the burning towers in the Abyssal Woods of the Land of Shadow — the dark, frenzied forest in the southern DLC region.',
    medium: 'Boss drop in the Abyssal Woods, Land of Shadow (DLC).',
    hard: 'Dropped by a frenzied construct in the DLC.',
  },
};

export const MERCHANT_HINTS: Record<string, EntityHints> = {
  // ── STARTING AREA MERCHANTS ──
  'Kalé': {
    easy: 'Available for purchase. Kalé is the first merchant you meet — he sits by the campfire at the Church of Elleh in western Limgrave, just north of the First Step.',
    medium: 'Available for purchase from a merchant in western Limgrave.',
    hard: 'Available for purchase from a merchant in the early game.',
  },
  'Patches': {
    easy: 'Available for purchase. Patches sets up shop in Murkwater Cave along the river ravine in central Limgrave, east of Agheel Lake — follow the stream north from the bridge.',
    medium: 'Available for purchase from a merchant in Limgrave.',
    hard: 'Available for purchase from a wandering merchant in the early game.',
  },
  'Sellen': {
    easy: 'Available for purchase. Sellen resides in the Waypoint Ruins cellar in central-eastern Limgrave, just east of Agheel Lake — defeat the Pumpkin Head boss in the basement to reach her.',
    medium: 'Available for purchase from a sorcerer merchant in Limgrave.',
    hard: 'Available for purchase from a sorcery tutor in the early to mid game.',
  },
  'Miriel Pastor of Vows': {
    easy: 'Available for purchase. Miriel is the giant turtle pastor in the Church of Vows on the eastern cliffs of Liurnia — a small island church accessible from the lakebed via a Spirit Spring.',
    medium: 'Available for purchase from a pastor in eastern Liurnia.',
    hard: 'Available for purchase from a spell merchant in the mid game.',
  },
  'Twin Maiden Husks': {
    easy: 'Available for purchase. The Twin Maiden Husks are the vendors in Roundtable Hold, the central hub sanctuary — they sell general goods and accept Bell Bearings to expand their inventory.',
    medium: 'Available for purchase in Roundtable Hold, the central hub area.',
    hard: 'Available for purchase from hub vendors.',
  },
  'Enia': {
    easy: 'Available for purchase. Enia the Finger Reader is found in Roundtable Hold, at the chamber behind the Two Fingers — she trades Remembrances for boss equipment.',
    medium: 'Available for purchase in Roundtable Hold, the central hub area.',
    hard: 'Available for purchase from a remembrance vendor.',
  },
  'Gowry': {
    easy: 'Available for purchase. Gowry lives in his shack in eastern Caelid, just outside Sellia Town of Sorcery — a reclusive sage who offers sorceries and quest items.',
    medium: 'Available for purchase from a sage in Caelid.',
    hard: 'Available for purchase from a quest-related merchant in the mid game.',
  },
  'Gurranq Beast Clergyman': {
    easy: 'Available for purchase. Gurranq waits in the Bestial Sanctum of northeastern Dragonbarrow, a remote temple perched on the eastern cliffs of Caelid — access it from the sending gate near the Third Church of Marika.',
    medium: 'Available for purchase in the Bestial Sanctum, Dragonbarrow.',
    hard: 'Available for purchase from a beast clergyman in the mid game.',
  },
  'D Hunter of the Dead': {
    easy: 'Available for purchase. D can be found in the Roundtable Hold after first encountering him in Limgrave east of Summonwater Village — he sells incantations related to death.',
    medium: 'Available for purchase in Roundtable Hold or near Summonwater Village.',
    hard: 'Available for purchase from a hunter of the dead in the early to mid game.',
  },
  'Rogier': {
    easy: 'Available for purchase. Rogier sits on the balcony inside Stormveil Castle, the first legacy dungeon — and later moves to Roundtable Hold, selling sorceries and Ashes of War.',
    medium: 'Available for purchase in Stormveil Castle or Roundtable Hold.',
    hard: 'Available for purchase from a sorcerer knight in the early game.',
  },
  'Brother Corhyn': {
    easy: 'Available for purchase. Corhyn is found in Roundtable Hold, standing near the central table — he sells incantations and eventually travels to the Altus Plateau as his quest progresses.',
    medium: 'Available for purchase in Roundtable Hold or Altus Plateau.',
    hard: 'Available for purchase from a cleric merchant in the mid game.',
  },
  'Seluvis': {
    easy: 'Available for purchase. Seluvis operates from his tower in the Three Sisters area of Caria Manor in northern Liurnia, accessible through Ranni\'s questline — he sells sorceries and puppets.',
    medium: 'Available for purchase from a preceptor in northern Liurnia.',
    hard: 'Available for purchase from a quest-related sorcerer in the mid game.',
  },
  'Millicent': {
    easy: 'Available for purchase. Millicent travels across the Lands Between as her questline progresses — she can be found in the Church of the Plague in Caelid, then at various sites before reaching the Haligtree.',
    medium: 'Available for purchase from a wandering quest NPC in various regions.',
    hard: 'Available for purchase from a quest-related character across the game.',
  },
  'Diallos': {
    easy: 'Available for purchase. Diallos is encountered in the Roundtable Hold, and later at the Volcano Manor on Mt. Gelmir or Jarburg in Liurnia, depending on quest progress.',
    medium: 'Available for purchase in Roundtable Hold, Volcano Manor, or Jarburg.',
    hard: 'Available for purchase from a noble quest NPC in the mid game.',
  },
  'Nepheli Loux': {
    easy: 'Available for purchase. Nepheli is first met in Stormveil Castle and later in the Roundtable Hold, and eventually becomes the ruler of Limgrave — she can be found by the throne in Stormveil Castle after her questline.',
    medium: 'Available for purchase in Stormveil Castle or Roundtable Hold.',
    hard: 'Available for purchase from a warrior ally in various locations.',
  },
  'Jar-Bairn': {
    easy: 'Available for purchase. Jar-Bairn is a small living jar found in Jarburg, the hidden village of jars in southeastern Liurnia — accessible by dropping down the cliffs near the Carian Study Hall.',
    medium: 'Available for purchase from a jar merchant in Jarburg, Liurnia.',
    hard: 'Available for purchase from a jar village in the mid game.',
  },
  'Yura': {
    easy: 'Available for purchase. Yura the hunter can be found under the ruined archway south of Agheel Lake in Limgrave, near the Seaside Ruins — he sells Ashes of War and offers advice.',
    medium: 'Available for purchase from a hunter in Limgrave.',
    hard: 'Available for purchase from a warrior in the early game.',
  },
  'Kenneth Haight': {
    easy: 'Available for purchase. Kenneth Haight calls for aid from the ruins atop the cliffs in eastern Limgrave, just north of the Mistwood — he later relocates after his questline.',
    medium: 'Available for purchase from a noble in eastern Limgrave.',
    hard: 'Available for purchase from a quest NPC in the early game.',
  },
  'Iji': {
    easy: 'Available for purchase. Iji the blacksmith troll sits by the Road to the Manor site of grace in northern Liurnia, just before the entrance to Caria Manor — he sells somber smithing stones.',
    medium: 'Available for purchase from a blacksmith in northern Liurnia.',
    hard: 'Available for purchase from a troll blacksmith in the mid game.',
  },

  // ── ISOLATED MERCHANTS ──
  'Isolated Merchant (Weeping Peninsula)': {
    easy: 'Available for purchase. A lone merchant in his shack at the very southwestern tip of the Weeping Peninsula, on the isolated beach past the Demi-Human Forest.',
    medium: 'Available for purchase from an isolated merchant in the Weeping Peninsula.',
    hard: 'Available for purchase from a merchant in the early game.',
  },
  'Isolated Merchant (Liurnia northeast)': {
    easy: 'Available for purchase. An isolated merchant in his shack on the northeastern cliffs of Liurnia, along the road leading to the Grand Lift of Dectus.',
    medium: 'Available for purchase from an isolated merchant in northeastern Liurnia.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },
  'Isolated Merchant (Dragonbarrow)': {
    easy: 'Available for purchase. A merchant in his shack on the remote road leading to the Bestial Sanctum in Dragonbarrow, the northeast corner of Caelid overlooking the sea.',
    medium: 'Available for purchase from an isolated merchant in Dragonbarrow, Caelid.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },
  'Isolated Merchant (Mt. Gelmir)': {
    easy: 'Available for purchase. An isolated merchant huddled in his shack along the winding mountain road up Mt. Gelmir, on the western approach to Volcano Manor.',
    medium: 'Available for purchase from an isolated merchant on Mt. Gelmir.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },
  'Isolated Merchant (Altus Plateau)': {
    easy: 'Available for purchase. A lone merchant found in his shack on the forested northern edge of the Altus Plateau, near the road to the Shaded Castle.',
    medium: 'Available for purchase from an isolated merchant in the Altus Plateau.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },

  // ── NOMADIC MERCHANTS ──
  'Nomadic Merchant (Limgrave west coast)': {
    easy: 'Available for purchase. A nomadic merchant under a canopy on the western beach of Limgrave, reachable from the Coastal Cave area or by dropping down the seaside cliffs north of the First Step.',
    medium: 'Available for purchase from a nomadic merchant on the Limgrave coast.',
    hard: 'Available for purchase from a merchant in the early game.',
  },
  'Nomadic Merchant (Limgrave east)': {
    easy: 'Available for purchase. A nomadic merchant camped by the roadside in eastern Limgrave, near the Saintsbridge crossing toward Caelid.',
    medium: 'Available for purchase from a nomadic merchant in eastern Limgrave.',
    hard: 'Available for purchase from a merchant in the early game.',
  },
  'Nomadic Merchant (Liurnia east)': {
    easy: 'Available for purchase. A nomadic merchant seated at a campfire on the eastern shore road of Liurnia, along the route that runs south of the Grand Lift of Dectus.',
    medium: 'Available for purchase from a nomadic merchant in eastern Liurnia.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },
  'Nomadic Merchant (Liurnia south)': {
    easy: 'Available for purchase. A nomadic merchant by the shallow waters of the southern Liurnia lakebed, near the road leading from the Liurnia Highway South site of grace.',
    medium: 'Available for purchase from a nomadic merchant in southern Liurnia.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },
  'Nomadic Merchant (Caelid)': {
    easy: 'Available for purchase. A nomadic merchant set up in a ruin on the northern edge of the Caelid swamp, near the rot-blighted road leading east from Limgrave.',
    medium: 'Available for purchase from a nomadic merchant in Caelid.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },
  'Nomadic Merchant (Altus Plateau)': {
    easy: 'Available for purchase. A nomadic merchant resting on the wooded hill just south of the Forest-Spanning Great Bridge in the Altus Plateau.',
    medium: 'Available for purchase from a nomadic merchant in the Altus Plateau.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },
  'Nomadic Merchant (Mountaintops of the Giants)': {
    easy: 'Available for purchase. A nomadic merchant built a small shelter in the frozen wasteland of the Mountaintops, along the main road leading toward the Fire Giant.',
    medium: 'Available for purchase from a nomadic merchant in the Mountaintops.',
    hard: 'Available for purchase from a merchant in the late game.',
  },

  // ── HERMIT MERCHANTS ──
  'Hermit Merchant (Leyndell)': {
    easy: 'Available for purchase. A hermit merchant hidden in the sewers of Leyndell Royal Capital, in the Subterranean Shunning-Grounds beneath the city streets.',
    medium: 'Available for purchase from a hermit in the Leyndell sewers.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },
  'Hermit Merchant (Mt. Gelmir)': {
    easy: 'Available for purchase. A hermit merchant at a small campsite along the treacherous mountain path of Mt. Gelmir, on the route toward Volcano Manor.',
    medium: 'Available for purchase from a hermit merchant on Mt. Gelmir.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },
  'Hermit Merchant (Ainsel River)': {
    easy: 'Available for purchase. A hermit merchant deep in the Ainsel River underground region, found near the riverbed accessed from the Ainsel River Well in eastern Liurnia.',
    medium: 'Available for purchase from a hermit in the Ainsel River underground.',
    hard: 'Available for purchase from a merchant in the mid game.',
  },

  // ── QUEST-RELATED ──
  'Pidia Carian Servant': {
    easy: 'Available for purchase. Pidia is the elderly servant in Caria Manor, northern Liurnia — he can be found on a balcony accessible from the Three Sisters after reaching the manor\'s upper levels.',
    medium: 'Available for purchase from a servant in Caria Manor, Liurnia.',
    hard: 'Available for purchase from a quest-related NPC in the mid game.',
  },
  'Smithing Master Iji': {
    easy: 'Available for purchase. Iji the troll blacksmith sits by the Road to the Manor grace in northern Liurnia, just south of the Kingsrealm Ruins and before Caria Manor.',
    medium: 'Available for purchase from a troll blacksmith in northern Liurnia.',
    hard: 'Available for purchase from a blacksmith in the mid game.',
  },
  'Knight Bernahl': {
    easy: 'Available for purchase. Bernahl can be found at the Warmaster\'s Shack in Stormhill, Limgrave — a small hut on the hill east of the Gatefront Ruins. He later relocates to Volcano Manor.',
    medium: 'Available for purchase in Stormhill, Limgrave, or Volcano Manor.',
    hard: 'Available for purchase from a recusant knight in the early to mid game.',
  },
};

export function generateHint(rec: ItemRecord, difficulty: HintDifficulty): string {
  const bossMatch = rec.locationName.match(/^[Dd]ropped by (.+)$/);
  if (bossMatch) {
    const hints = BOSS_HINTS[bossMatch[1]];
    if (hints) return hints[difficulty];
  }
  const shopMatch = rec.locationName.match(/^[Ss]old by (.+)$/);
  if (shopMatch) {
    const hints = MERCHANT_HINTS[shopMatch[1]];
    if (hints) return hints[difficulty];
  }
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
