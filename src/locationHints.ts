import type { ItemRecord } from './types';

export type HintDifficulty = 'easy' | 'medium' | 'hard';

type EntityHints = Record<HintDifficulty, string>;

export const BOSS_HINTS: Record<string, EntityHints> = {
  'Margit the Fell Omen': {
    easy: 'Boss drop. Found in Stormveil Castle, the first legacy dungeon in Limgrave — guarding the bridge at the castle entrance.',
    medium: 'Boss drop in Stormveil Castle, Limgrave.',
    hard: 'Dropped by a boss in the early game.',
  },
  'Godrick the Grafted': {
    easy: 'Boss drop. Godrick awaits in his throne room deep within Stormveil Castle in Limgrave — work through the castle ramparts to the main courtyard.',
    medium: 'Boss drop in Stormveil Castle, Limgrave.',
    hard: 'Dropped by a shardbearer in the early game.',
  },
  'Leonine Misbegotten': {
    easy: 'Boss drop. Found in Castle Morne at the southern tip of the Weeping Peninsula — cross the castle walls and descend to the beachside arena.',
    medium: 'Boss drop in Castle Morne, Weeping Peninsula.',
    hard: 'Dropped by a field boss in the early game.',
  },
  'Erdtree Burial Watchdog (Stormfoot Catacombs)': {
    easy: 'Boss drop. Found in Stormfoot Catacombs in western Limgrave, a crypt entrance set into the cliffs west of the Church of Elleh.',
    medium: 'Boss drop in Stormfoot Catacombs, Limgrave.',
    hard: 'Dropped by a catacomb boss in the early game.',
  },
  'Beastman of Farum Azula (Groveside Cave)': {
    easy: 'Boss drop. At the end of Groveside Cave in Limgrave, the wolf den north of the Church of Elleh — enter through the hillside opening.',
    medium: 'Boss drop in Groveside Cave, Limgrave.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Demi-Human Chiefs (Coastal Cave)': {
    easy: 'Boss drop. A pair of demi-human chiefs found in the Coastal Cave on the western shore of Limgrave — enter the cave from the beach west of the Church of Elleh.',
    medium: 'Boss drop in Coastal Cave, western Limgrave.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Guardian Golem (Highroad Cave)': {
    easy: 'Boss drop. A towering golem at the end of Highroad Cave, a cliffside cavern in northern Liurnia — follow the road north from the East Raya Lucaria Gate, past the ravine, to find the cave mouth on the left cliff face beneath the broken bridge.',
    medium: 'Boss drop in Highroad Cave, northern Liurnia.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Erdtree Burial Watchdog (Impaler\'s Catacombs)': {
    easy: 'Boss drop. Found in the Impaler\'s Catacombs on the Weeping Peninsula, a crypt on the eastern shore near the walking mausoleum.',
    medium: 'Boss drop in the Impaler\'s Catacombs, Weeping Peninsula.',
    hard: 'Dropped by a catacomb boss in the early game.',
  },
  'Erdtree Avatar (Weeping Peninsula)': {
    easy: 'Boss drop. Wanders near the Minor Erdtree in the central Weeping Peninsula — visible from the main road leading south to Castle Morne.',
    medium: 'Boss drop at the Minor Erdtree in the Weeping Peninsula.',
    hard: 'Dropped by a field boss in the early game.',
  },
  'Night\'s Cavalry (Weeping Peninsula)': {
    easy: 'Boss drop. Appears at night on the bridge south of the Castle Morne Rampart in the Weeping Peninsula.',
    medium: 'Boss drop at night on the bridge in the Weeping Peninsula.',
    hard: 'Dropped by a night-time field boss in the early game.',
  },
  'Deathbird (Weeping Peninsula)': {
    easy: 'Boss drop. Appears at night among the ruins on the eastern shore of the Weeping Peninsula, near the Castle Morne approach.',
    medium: 'Boss drop at night on the eastern shore of the Weeping Peninsula.',
    hard: 'Dropped by a night-time field boss in the early game.',
  },
  'Cemetery Shade (Tombsward Catacombs)': {
    easy: 'Boss drop. Haunts the Tombsward Catacombs in the central Weeping Peninsula, a crypt entrance on the hill north of the Minor Erdtree.',
    medium: 'Boss drop in the Tombsward Catacombs, Weeping Peninsula.',
    hard: 'Dropped by a catacomb boss in the early game.',
  },
  'Miranda the Blighted Bloom (Tombsward Cave)': {
    easy: 'Boss drop. Found in the Tombsward Cave of the Weeping Peninsula, a flower-filled cavern on the western hillside.',
    medium: 'Boss drop in Tombsward Cave, Weeping Peninsula.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Runebear (Earthbore Cave)': {
    easy: 'Boss drop. A massive runebear lairing in Earthbore Cave on the eastern shore of the Weeping Peninsula.',
    medium: 'Boss drop in Earthbore Cave, Weeping Peninsula.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Scaly Misbegotten (Morne Tunnel)': {
    easy: 'Boss drop. Found in the Morne Tunnel on the western shore of the Weeping Peninsula, a mining tunnel cut into the seaside cliff.',
    medium: 'Boss drop in the Morne Tunnel, Weeping Peninsula.',
    hard: 'Dropped by a dungeon boss in the early game.',
  },
  'Erdtree Burial Watchdog (Cliffbottom Catacombs)': {
    easy: 'Boss drop. Found in the Cliffbottom Catacombs on the eastern cliffs of Liurnia, overlooking the lake.',
    medium: 'Boss drop in Cliffbottom Catacombs, Liurnia.',
    hard: 'Dropped by a catacomb boss in the mid game.',
  },
  'Red Wolf of Radagon': {
    easy: 'Boss drop. Found in the Academy of Raya Lucaria in central Liurnia — the sorcerers\' academy, accessed from the southern gate after obtaining the Glintstone Key.',
    medium: 'Boss drop in the Academy of Raya Lucaria, Liurnia.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Rennala Queen of the Full Moon': {
    easy: 'Boss drop. Rennala awaits in the grand library at the top of the Academy of Raya Lucaria in central Liurnia — work through the academy halls and courtyard.',
    medium: 'Boss drop in the Academy of Raya Lucaria, Liurnia.',
    hard: 'Dropped by a shardbearer in the mid game.',
  },
  'Royal Knight Loretta': {
    easy: 'Boss drop. Found in Caria Manor in northern Liurnia, guarding the way to the Three Sisters — navigate the manor\'s gardens and ramparts.',
    medium: 'Boss drop in Caria Manor, northern Liurnia.',
    hard: 'Dropped by a knight in the mid game.',
  },
  'Glintstone Dragon Smarag': {
    easy: 'Boss drop. Smarag roosts near the Glintstone Key on the small island west of the Academy of Raya Lucaria in Liurnia.',
    medium: 'Boss drop on an island west of the Academy of Raya Lucaria, Liurnia.',
    hard: 'Dropped by a glintstone dragon in the mid game.',
  },
  'Glintstone Dragon Adula': {
    easy: 'Boss drop. Adula is first encountered outside Caria Manor in northern Liurnia, then again on the Moonlight Altar plateau in southern Liurnia, accessible through Ranni\'s questline.',
    medium: 'Boss drop in northern Liurnia or the Moonlight Altar.',
    hard: 'Dropped by a glintstone dragon in the mid game.',
  },
  'Magma Wyrm Makar': {
    easy: 'Boss drop. Found at the summit of the Ruin-Strewn Precipice in northeastern Liurnia, the dangerous cliffside ascent that leads to the Altus Plateau.',
    medium: 'Boss drop at the Ruin-Strewn Precipice, northeastern Liurnia.',
    hard: 'Dropped by a magma wyrm in the mid game.',
  },
  'Black Knife Assassin (Black Knife Catacombs)': {
    easy: 'Boss drop. At the end of the Black Knife Catacombs in northeastern Liurnia, a hidden crypt behind an illusory wall.',
    medium: 'Boss drop in the Black Knife Catacombs, Liurnia.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Cemetery Shade (Black Knife Catacombs)': {
    easy: 'Boss drop. Also encountered in the Black Knife Catacombs of northeastern Liurnia.',
    medium: 'Boss drop in the Black Knife Catacombs, Liurnia.',
    hard: 'Dropped by a catacomb boss in the mid game.',
  },
  'Tibia Mariner (Liurnia)': {
    easy: 'Boss drop. Appears in the shallow waters of the Liurnia lake east of the Carian Study Hall — look for the glowing boat wreck.',
    medium: 'Boss drop in the eastern lake of Liurnia.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Deathbird (Liurnia)': {
    easy: 'Boss drop. Appears at night among the ruins on the eastern shore of Liurnia, near the Scenic Isle.',
    medium: 'Boss drop at night on the eastern shore of Liurnia.',
    hard: 'Dropped by a night-time field boss in the mid game.',
  },
  'Night\'s Cavalry (Liurnia)': {
    easy: 'Boss drop. A pair of riders patrols the road through the shallow lake in central Liurnia at night.',
    medium: 'Boss drop at night on the lake road in Liurnia.',
    hard: 'Dropped by night-time field bosses in the mid game.',
  },
  'Death Rite Bird (Liurnia)': {
    easy: 'Boss drop. Appears at night near the Gate Town North in the northeast of Liurnia.',
    medium: 'Boss drop at night in northeastern Liurnia.',
    hard: 'Dropped by a death rite bird in the mid game.',
  },
  'Cleanrot Knight (Stillwater Cave)': {
    easy: 'Boss drop. Found in Stillwater Cave on the southern shore of Liurnia, where the lake shallows meet the cliffs — enter the damp cavern from the water\'s edge near the Liurnia Highway South site of grace, close to the path toward Caelid.',
    medium: 'Boss drop in Stillwater Cave near the Liurnia-Caelid border.',
    hard: 'Dropped by a dungeon boss in the mid game.',
  },
  'Adan Thief of Fire (Malefactor\'s Evergaol)': {
    easy: 'Boss drop. Imprisoned in the Malefactor\'s Evergaol on the southern cliffs of Liurnia, overlooking the lake.',
    medium: 'Boss drop in the Malefactor\'s Evergaol, southern Liurnia.',
    hard: 'Dropped by an evergaol boss in the mid game.',
  },
  'Bols Carian Knight (Cuckoo\'s Evergaol)': {
    easy: 'Boss drop. Imprisoned in Cuckoo\'s Evergaol north of the Academy of Raya Lucaria in central Liurnia.',
    medium: 'Boss drop in Cuckoo\'s Evergaol, central Liurnia.',
    hard: 'Dropped by an evergaol boss in the mid game.',
  },
  'Omenkiller (Village of the Albinaurics)': {
    easy: 'Boss drop. Found terrorizing the Village of the Albinaurics in southwestern Liurnia, beneath the Moonlight Altar plateau.',
    medium: 'Boss drop in the Village of the Albinaurics, Liurnia.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Erdtree Avatar (Liurnia)': {
    easy: 'Boss drop. Wanders near the Minor Erdtree in northeastern Liurnia, near the Mausoleum Compound.',
    medium: 'Boss drop at the Minor Erdtree in northeastern Liurnia.',
    hard: 'Dropped by a field boss in the mid game.',
  },
  'Alecto Black Knife Ringleader': {
    easy: 'Boss drop. Imprisoned in the Ringleader\'s Evergaol on the Moonlight Altar plateau of southern Liurnia — accessible only through Ranni\'s questline.',
    medium: 'Boss drop in the Ringleader\'s Evergaol, Moonlight Altar.',
    hard: 'Dropped by an evergaol boss in the late game.',
  },
  'Fallingstar Beast (Sellia Crystal Tunnel)': {
    easy: 'Boss drop. Found deep in the Sellia Crystal Tunnel in eastern Caelid — a mining tunnel entrance on the lower cliff ledge near Sellia.',
    medium: 'Boss drop in the Sellia Crystal Tunnel, Caelid.',
    hard: 'Dropped by a fallingstar beast in the mid game.',
  },
  'Starscourge Radahn': {
    easy: 'Boss drop. Radahn awaits in the great desert arena of Redmane Castle on the southeastern peninsula of Caelid. Enter the castle during the Radahn Festival, accessed by crossing the massive bridge from the north.',
    medium: 'Boss drop at Redmane Castle in southeastern Caelid.',
    hard: 'Dropped by a shardbearer in the mid game.',
  },
  'Commander O\'Neil': {
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
  'Night\'s Cavalry (Caelid)': {
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
  'Radahn Foot Soldier (Redmane Castle)': {
    easy: 'Boss drop. A foot soldier prowling the courtyard of Redmane Castle in southern Caelid — the castle that hosts the Radahn Festival.',
    medium: 'Boss drop in Redmane Castle, Caelid.',
    hard: 'Dropped by a soldier in the mid game.',
  },
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
  'Ancient Hero of Zamor (Sainted Hero\'s Grave)': {
    easy: 'Boss drop. At the end of the Sainted Hero\'s Grave in the western Altus Plateau — find the ornate tomb entrance carved into the cliffside directly west of the Grand Lift of Dectus, across the shallow lake from the Erdtree-Gazing Hill site of grace.',
    medium: 'Boss drop in the Sainted Hero\'s Grave, Altus Plateau.',
    hard: 'Dropped by a hero grave boss in the mid game.',
  },
  'Night\'s Cavalry (Altus Plateau)': {
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
  'Omenkiller and Miranda the Blighted Bloom (Perfumer\'s Grotto)': {
    easy: 'Boss drop. A pair guarding the Perfumer\'s Grotto in the northern Altus Plateau, a fragrant cave entrance on the hillside near the road to the Shaded Castle.',
    medium: 'Boss drop in the Perfumer\'s Grotto, Altus Plateau.',
    hard: 'Dropped by paired dungeon bosses in the mid game.',
  },
  'Wormface (minor erdtree Altus)': {
    easy: 'Boss drop. A grotesque creature that haunts the woods near the Minor Erdtree in the central Altus Plateau, lurking among the trees on the woodland path.',
    medium: 'Boss drop near the Minor Erdtree in the Altus Plateau.',
    hard: 'Dropped by a field boss in the mid game.',
  },
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
    easy: 'Boss drop. Found together deep in the Auriza Hero\'s Grave on the eastern outskirts of Leyndell Royal Capital, an ornate tomb entrance built into the cliffs east of the outer wall.',
    medium: 'Boss drop in the Auriza Hero\'s Grave, Leyndell Royal Capital.',
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
  'Fia\'s Champions': {
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
  'Night\'s Cavalry (Mountaintops)': {
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
  'Night\'s Cavalry (Shadow Realm)': {
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
  // Limgrave sub-areas
  'Stormhill': 'early game',
  'Murkwater Cave': 'early game',
  'Groveside Cave': 'early game',
  'Coastal Cave': 'early game',
  'Highroad Cave': 'early game',
  'Deathtouched Catacombs': 'early game',
  'Stormfoot Catacombs': 'early game',
  'Fringefolk Hero\'s Grave': 'early game',
  'Limgrave Tunnels': 'early game',
  'Fort Haight': 'early game',
  'Church of Elleh': 'early game',
  'Third Church of Marika': 'early game',
  'Fourth Church of Marika': 'early game',
  'Church of Dragon Communion': 'early game',
  'Stormgate': 'early game',
  'Gatefront Ruins': 'early game',
  'Agheel Lake': 'early game',
  'Dragon-Burnt Ruins': 'early game',
  'Waypoint Ruins': 'early game',
  // Weeping Peninsula sub-areas
  'Morne Tunnel': 'early game',
  'Tombsward Catacombs': 'early game',
  'Impaler\'s Catacombs': 'early game',
  'Castle Morne': 'early game',
  'Tombsward Cave': 'early game',
  'Earthbore Cave': 'early game',
  'Church of Pilgrimage': 'early game',
  // Liurnia of the Lakes sub-areas
  'Black Knife Catacombs': 'mid game',
  'Cliffbottom Catacombs': 'mid game',
  'Road\'s End Catacombs': 'mid game',
  'Unsightly Catacombs': 'mid game',
  'Sages\' Cave': 'mid game',
  'Stillwater Cave': 'mid game',
  'Lakeside Crystal Cave': 'mid game',
  'Raya Lucaria Crystal Tunnel': 'mid game',
  'Ruin-Strewn Precipice': 'mid game',
  'Cuckoo\'s Evergaol': 'mid game',
  'Malefactor\'s Evergaol': 'mid game',
  'Ringleader\'s Evergaol': 'late game',
  'Moonlight Altar': 'late game',
  'Church of Vows': 'mid game',
  'Carian Study Hall': 'mid game',
  'Converted Fringe Tower': 'mid game',
  'Frenzied Flame Village': 'mid game',
  'Village of the Albinaurics': 'mid game',
  'Jarburg': 'mid game',
  'Bellum Church': 'mid game',
  'Church of Inhibition': 'mid game',
  'Four Belfries': 'mid game',
  'Kingsrealm Ruins': 'mid game',
  'Haligtree': 'late game',
  // Caelid / Dragonbarrow sub-areas
  'Sellia Crystal Tunnel': 'mid game',
  'Caelid Catacombs': 'mid game',
  'War-Dead Catacombs': 'mid game',
  'Sellia Evergaol': 'mid game',
  'Redmane Castle': 'mid game',
  'Fort Gael': 'mid game',
  'Fort Faroth': 'mid game',
  'Dragonbarrow Cave': 'mid game',
  'Bestial Sanctum': 'mid game',
  'Church of Dragon Communion (Caelid)': 'mid game',
  'Minor Erdtree (Caelid)': 'mid game',
  'Sellia, Town of Sorcery': 'mid game',
  'Heart of Aeonia': 'mid game',
  // Altus Plateau / Mt. Gelmir sub-areas
  'Old Altus Tunnel': 'mid-to-late game',
  'Altus Tunnel': 'mid-to-late game',
  'Sainted Hero\'s Grave': 'mid-to-late game',
  'Auriza Hero\'s Grave': 'mid-to-late game',
  'Auriza Side Tomb': 'mid-to-late game',
  'Wyndham Catacombs': 'mid-to-late game',
  'Perfumer\'s Grotto': 'mid-to-late game',
  'Shaded Castle': 'mid-to-late game',
  'Sealed Tunnel': 'mid-to-late game',
  'Volcano Cave': 'mid-to-late game',
  'Gelmir Hero\'s Grave': 'mid-to-late game',
  'Fort Laiedd': 'mid-to-late game',
  'Hermit Village': 'mid-to-late game',
  'Windmill Village': 'mid-to-late game',
  'Lux Ruins': 'mid-to-late game',
  // Leyndell sub-areas
  'Leyndell Catacombs': 'late game',
  'Subterranean Shunning-Grounds': 'late game',
  'Capital Outskirts': 'late game',
  // Underground regions
  'Ainsel River Well': 'mid game',
  'Siofra River Well': 'early game',
  'Uhl Palace Ruins': 'mid game',
  'Night\'s Sacred Ground': 'mid game',
  'Aqueduct-Facing Cliffs': 'mid game',
  // Mountaintops / Consecrated Snowfield sub-areas
  'Castle Sol': 'late game',
  'Castle Sol Catacombs': 'late game',
  'Spiritcaller Cave': 'late game',
  'Giant-Conquering Hero\'s Grave': 'late game',
  'Giants\' Mountaintop Catacombs': 'late game',
  'Zamor Ruins': 'late game',
  'Flame Peak': 'late game',
  'Lord Contender\'s Evergaol': 'late game',
  'Apostate Derelict': 'late game',
  'Consecrated Snowfield Catacombs': 'late game',
  'Yelough Anix Tunnel': 'late game',
  'Ordina, Liturgical Town': 'late game',
  'Hidden Path to the Haligtree': 'late game',
  // Crumbling Farum Azula sub-areas
  'Farum Azula': 'endgame',
  'Beside the Great Bridge': 'endgame',
  'Dragon Temple': 'endgame',
  // Elphael / Haligtree sub-areas
  'Miquella\'s Haligtree': 'late game',
  'Elphael': 'endgame',
  // DLC — Land of Shadow sub-areas
  'Scaduview': 'DLC',
  'Fog Rift Catacombs': 'DLC',
  'Darklight Catacombs': 'DLC',
  'Scorpion River Catacombs': 'DLC',
  'Belurat Gaol': 'DLC',
  'Lamenter\'s Gaol': 'DLC',
  'Bonny Gaol': 'DLC',
  'Dragon\'s Pit': 'DLC',
  'Stone Coffin Fissure': 'DLC',
  'Ruined Forge Lava Intake': 'DLC',
  'Ruined Forge of Starfall Past': 'DLC',
  'Ancient Ruins of Rauh': 'DLC',
  'Moorth Ruins': 'DLC',
  'Ellac Greatbridge': 'DLC',
  'Western Nameless Mausoleum': 'DLC',
  'Eastern Nameless Mausoleum': 'DLC',
  'Specimen Storehouse': 'DLC',
  'Shadow Keep, Back Gate': 'DLC',
  'Church District': 'DLC',
  'Church District Abandoned Dungeon': 'DLC',
  'Furnished Ruins': 'DLC',
  'Highroad Cross': 'DLC',
  'Rauh Ancient Ruins': 'DLC',
  'Recluses\' River': 'DLC',
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
  // Limgrave sub-areas
  'Stormhill': 'the storm-swept hills before Stormveil Castle',
  'Murkwater Cave': 'a river-carved cave in the Limgrave ravine',
  'Groveside Cave': 'a small cave in the woodlands of Limgrave',
  'Coastal Cave': 'a sea-level cave on the western shore of Limgrave',
  'Highroad Cave': 'a cliffside cave along the northern road out of Limgrave',
  'Deathtouched Catacombs': 'a death-touched crypt cut into the Stormhill cliffs',
  'Stormfoot Catacombs': 'an underground crypt in the western foot of Stormhill',
  'Fringefolk Hero\'s Grave': 'an ancient hero\'s tomb beneath the Stranded Graveyard',
  'Limgrave Tunnels': 'a mining tunnel in the eastern cliffs of Limgrave',
  'Fort Haight': 'a crumbling coastal fort in eastern Limgrave',
  'Church of Elleh': 'a ruined church in the grassy starting lands of Limgrave',
  'Third Church of Marika': 'a roadside church in eastern Limgrave',
  'Fourth Church of Marika': 'a remote church on the southern coast of Limgrave',
  'Church of Dragon Communion': 'a dragon communion church on the Limgrave coast',
  'Stormgate': 'the storm-wracked gate approach to Stormveil Castle',
  'Gatefront Ruins': 'ancient ruins at the gate road into Limgrave',
  'Agheel Lake': 'the central lake of Limgrave, hunted by a dragon',
  'Dragon-Burnt Ruins': 'scorched ruins by the Agheel Lake in Limgrave',
  'Waypoint Ruins': 'a ruined waypoint complex in eastern Limgrave',
  // Weeping Peninsula sub-areas
  'Morne Tunnel': 'a cliffside mining tunnel in the Weeping Peninsula',
  'Tombsward Catacombs': 'a catacomb beneath the tombsward fields of the peninsula',
  'Impaler\'s Catacombs': 'a deep crypt on the rainy Weeping Peninsula',
  'Castle Morne': 'a misbegotten-held fortress at the tip of the Weeping Peninsula',
  'Tombsward Cave': 'a flower-filled cave in the central Weeping Peninsula',
  'Earthbore Cave': 'a bear\'s burrow on the eastern shore of the Weeping Peninsula',
  'Church of Pilgrimage': 'a windswept pilgrimage church in the Weeping Peninsula',
  // Liurnia of the Lakes sub-areas
  'Black Knife Catacombs': 'a black-knife crypt in the northeastern cliffs of Liurnia',
  'Cliffbottom Catacombs': 'a crypt carved into the eastern rim of Liurnia',
  'Road\'s End Catacombs': 'a crypt at the western fringe of Liurnia\'s cliffs',
  'Unsightly Catacombs': 'a hidden crypt in southwestern Liurnia',
  'Sages\' Cave': 'a cave of sages concealed behind an illusory wall in Liurnia',
  'Stillwater Cave': 'a cave at the southern edge of Liurnia\'s lake',
  'Lakeside Crystal Cave': 'a crystal-encrusted cave on the shores of Liurnia',
  'Raya Lucaria Crystal Tunnel': 'a crystal mining tunnel in eastern Liurnia',
  'Ruin-Strewn Precipice': 'a treacherous cliffside ascent from eastern Liurnia to Altus',
  'Cuckoo\'s Evergaol': 'a misty evergaol in central Liurnia',
  'Malefactor\'s Evergaol': 'a clifftop evergaol in southern Liurnia',
  'Ringleader\'s Evergaol': 'a moonlit evergaol on the high Moonlight Altar plateau of Liurnia',
  'Moonlight Altar': 'the star-touched plateau above southern Liurnia, reached through Ranni\'s quest',
  'Church of Vows': 'a church of vows on the eastern cliffs of Liurnia',
  'Carian Study Hall': 'a Carian study hall on the eastern shore of Liurnia',
  'Converted Fringe Tower': 'a converted tower on the southern cliffs of Liurnia',
  'Frenzied Flame Village': 'a village consumed by the frenzied flame in northeastern Liurnia',
  'Village of the Albinaurics': 'a marshy Albinauric village in southwestern Liurnia',
  'Jarburg': 'the hidden village of living jars in southeastern Liurnia',
  'Bellum Church': 'a church on the northern road of Liurnia',
  'Church of Inhibition': 'a frenzied-flame-cursed church on the northeastern cliffs of Liurnia',
  'Four Belfries': 'a row of four ancient belfries in western Liurnia',
  'Kingsrealm Ruins': 'ruins guarding the path to Caria Manor in northern Liurnia',
  'Haligtree': 'the canopy of Miquella\'s sacred Haligtree in the far north',
  // Caelid / Dragonbarrow sub-areas
  'Sellia Crystal Tunnel': 'a crystal mine hidden in eastern Caelid near Sellia',
  'Caelid Catacombs': 'a catacomb south of the Aeonia swamp in Caelid',
  'War-Dead Catacombs': 'a tomb of war dead in the far east of Caelid',
  'Sellia Evergaol': 'an evergaol atop the eastern cliffs of Caelid\'s Sellia',
  'Redmane Castle': 'a coastal castle in southeastern Caelid, host of the Radahn Festival',
  'Fort Gael': 'a rot-infected fort in western Caelid',
  'Fort Faroth': 'a dragon-guarded fort in the Dragonbarrow of Caelid',
  'Dragonbarrow Cave': 'a cave in the dragon-haunted cliffs of northern Caelid',
  'Bestial Sanctum': 'the remote beast-clergyman temple in the far northeast of Caelid',
  'Church of Dragon Communion (Caelid)': 'a dragon communion church on the southern Caelid coast',
  'Minor Erdtree (Caelid)': 'the minor Erdtree grove in western Caelid',
  'Sellia, Town of Sorcery': 'a sealed sorcery town of the Nox people in eastern Caelid',
  'Heart of Aeonia': 'the central rot swamp of Caelid\'s Aeonia crater',
  // Altus Plateau / Mt. Gelmir sub-areas
  'Old Altus Tunnel': 'an old mining tunnel in the central Altus Plateau',
  'Altus Tunnel': 'a mining tunnel at the southern approach of the Altus Plateau',
  'Sainted Hero\'s Grave': 'an ancient hero\'s tomb carved into the western Altus cliffs',
  'Auriza Hero\'s Grave': 'an ornate hero\'s tomb on the eastern outskirts of Leyndell',
  'Auriza Side Tomb': 'a side tomb adjacent to the Auriza Hero\'s Grave near Leyndell',
  'Wyndham Catacombs': 'a catacomb beneath the Wyndham Ruins in the Altus Plateau',
  'Perfumer\'s Grotto': 'a fragrant cave on the northern Altus Plateau hillside',
  'Shaded Castle': 'a poison-filled castle in the northern Altus Plateau valley',
  'Sealed Tunnel': 'a sealed mining tunnel on the outskirts of Leyndell',
  'Volcano Cave': 'a volcanic cave on the lower slopes of Mt. Gelmir',
  'Gelmir Hero\'s Grave': 'an ancient hero\'s tomb cut into the slopes of Mt. Gelmir',
  'Fort Laiedd': 'a lava-scorched fort on the slopes of Mt. Gelmir',
  'Hermit Village': 'a decrepit hermit settlement on the winding mountain road of Mt. Gelmir',
  'Windmill Village': 'an eerie windmill-dotted village in the northern Altus Plateau',
  'Lux Ruins': 'crumbling ruins on the northern approach to Mt. Gelmir',
  // Leyndell sub-areas
  'Leyndell Catacombs': 'the catacombs buried beneath the streets of Leyndell Royal Capital',
  'Subterranean Shunning-Grounds': 'the sewer labyrinth hidden beneath Leyndell Royal Capital',
  'Capital Outskirts': 'the outer ramparts and walls surrounding Leyndell Royal Capital',
  // Underground regions
  'Ainsel River Well': 'the underground river of cold starlight beneath eastern Liurnia',
  'Siofra River Well': 'a star-lit underground river beneath the surface of Limgrave',
  'Uhl Palace Ruins': 'the ruins of an ancient palace in the underground Nokron region',
  'Night\'s Sacred Ground': 'a sacred underground grove in the depths of Nokron',
  'Aqueduct-Facing Cliffs': 'the cliffside aqueduct passages linking Nokron to Deeproot Depths',
  // Mountaintops / Consecrated Snowfield sub-areas
  'Castle Sol': 'a blizzard-swept fortress in the northern Mountaintops of the Giants',
  'Castle Sol Catacombs': 'a crypt beneath the frozen walls of Castle Sol',
  'Spiritcaller Cave': 'a spirit-caller\'s cave in the high Mountaintops snowfields',
  'Giant-Conquering Hero\'s Grave': 'an ancient giant-slayer\'s tomb in the Mountaintops of the Giants',
  'Giants\' Mountaintop Catacombs': 'frozen catacombs beneath the Mountaintops of the Giants',
  'Zamor Ruins': 'the frost-encrusted ruins of ancient Zamor in the Mountaintops',
  'Flame Peak': 'the volcanic eastern peak of the Mountaintops leading to the Forge of the Giants',
  'Lord Contender\'s Evergaol': 'an evergaol on the frozen plateau of the Mountaintops',
  'Apostate Derelict': 'a crumbling heretic church in the far northern Mountaintops',
  'Consecrated Snowfield Catacombs': 'icy catacombs hidden beneath the Consecrated Snowfield',
  'Yelough Anix Tunnel': 'a mining tunnel in the far western Consecrated Snowfield',
  'Ordina, Liturgical Town': 'a silent liturgical town at the entrance to the Haligtree in the Consecrated Snowfield',
  'Hidden Path to the Haligtree': 'a secret crypt passage leading toward the Haligtree',
  // Crumbling Farum Azula sub-areas
  'Farum Azula': 'the time-worn dragon temple suspended in a storm beyond time',
  'Beside the Great Bridge': 'the great storm-blasted bridge at the heart of Crumbling Farum Azula',
  'Dragon Temple': 'the ancient dragon temple at the core of Crumbling Farum Azula',
  // Elphael / Haligtree sub-areas
  'Miquella\'s Haligtree': 'the canopy of Miquella\'s great Haligtree in the far north',
  'Elphael': 'the hidden Haligtree sanctuary of Elphael',
  // DLC — Land of Shadow sub-areas
  'Scaduview': 'the high eastern plateau of the shadow realm, overlooking the Cathedral of Manus Metyr',
  'Fog Rift Catacombs': 'dark catacombs sealed behind fog walls in the shadow realm',
  'Darklight Catacombs': 'elaborate dark catacombs beneath the Abyssal Woods of the shadow realm',
  'Scorpion River Catacombs': 'scorpion-infested catacombs near the river of the shadow realm',
  'Belurat Gaol': 'a cliffside prison west of Belurat Tower Settlement in the shadow realm',
  'Lamenter\'s Gaol': 'an isolated prison tower in the southern Abyssal Woods of the shadow realm',
  'Bonny Gaol': 'a hidden gaol in the shadow realm\'s eastern reaches',
  'Dragon\'s Pit': 'a rocky canyon on the approach to the Jagged Peak in the shadow realm',
  'Stone Coffin Fissure': 'a deep chasm of stone coffins in the southern Land of Shadow',
  'Ruined Forge Lava Intake': 'a lava-flooded ruined forge in the shadow realm',
  'Ruined Forge of Starfall Past': 'an ancient forge site in the Gravesite Plain of the shadow realm',
  'Ancient Ruins of Rauh': 'overgrown ancient ruins in the jungle highlands of the shadow realm',
  'Moorth Ruins': 'scattered ruins in the central plains of the shadow realm',
  'Ellac Greatbridge': 'the great stone bridge crossing the shadow realm\'s central plains',
  'Western Nameless Mausoleum': 'a nameless mausoleum on the western Gravesite Plain of the shadow realm',
  'Eastern Nameless Mausoleum': 'a nameless mausoleum on the eastern reaches of the shadow realm',
  'Specimen Storehouse': 'a specimen storehouse within the Shadow Keep of the shadow realm',
  'Shadow Keep, Back Gate': 'the rear gate passage of Shadow Keep in the shadow realm',
  'Church District': 'the church district ruins within the shadow realm\'s Belurat area',
  'Church District Abandoned Dungeon': 'an abandoned dungeon beneath the church district of the shadow realm',
  'Furnished Ruins': 'furnished ruins among the Gravesite Plain of the shadow realm',
  'Highroad Cross': 'a crossroads on the high road of the shadow realm\'s Gravesite Plain',
  'Rauh Ancient Ruins': 'sprawling ancient ruins among the jungle highlands of the shadow realm',
  'Recluses\' River': 'the recluses\' underground river passage in the shadow realm',
};

function fuzzyAreaLookup<T>(
  table: Record<string, T>,
  area: string
): T | undefined {
  const sortedKeys = Object.keys(table).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (area.includes(key)) return table[key];
  }
  return undefined;
}

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
    case 'medium': {
      const regionLabel =
        (area && (AREA_REGION_LABEL[area] ?? fuzzyAreaLookup(AREA_REGION_LABEL, area))) ?? null;
      return area
        ? `${label} somewhere in ${regionLabel ?? 'an unknown region'}`
        : label;
    }
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
      const stage = area
        ? (AREA_PROGRESSION[area] ?? fuzzyAreaLookup(AREA_PROGRESSION, area) ?? null)
        : null;
      return stage ? `${verb} — ${stage}` : verb;
    }
  }
}
