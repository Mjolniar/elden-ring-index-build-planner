# Changelog

## Elden Ring Randomizer Index and Build Planner 1.5.0 - 2026-05-10

### Added
- **Settings tab** with a master spoiler mode toggle. When enabled, exact item locations are hidden; users choose what partial information to reveal (area, source type, hint).
- **Three-level hint system** (Easy / Medium / Hard) for use in spoiler mode. Difficulty is configurable in Settings.
  - *Easy*: source type and named area (e.g. "Ground pickup in Caelid").
  - *Medium*: source type and thematic regional description without place names (e.g. "Ground pickup somewhere in the rot-blighted eastern wastes").
  - *Hard*: acquisition method and broad game-stage only (e.g. "Found on the ground — mid game").
- **80+ hand-written boss hints** and **30+ merchant hints** providing narrative clues at each difficulty level, with specific navigation detail at easy and thematic-only clues at hard.
- **Area progression and region label tables** covering all base-game areas and DLC regions used by fallback hint generation.
- Spoiler settings now apply to the **Build Planner** tab: the "Randomized location" column becomes a "Hint" column in spoiler mode (or is hidden); the Area column is gated on the showArea setting.

### Changed
- Search haystack in spoiler mode excludes location names so the search bar cannot be used to accidentally reveal location info.
- Fallback hint for unknown source type now returns a usable string instead of bare "Unknown source".

### Validation
- `npm test`: 61 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Randomizer Index and Build Planner 1.4.4 - 2026-05-10

### Changed
- Rebuilt recommended stat allocations using a source-first model: explicit stat spreads from cached Fextralife build pages are used where available; everything else falls back to exact-level estimates derived from item requirements and stat tags.
- Build planner stat section now labels its source — "Source stats" when the spread came from the build page, "Estimated stats" when it was computed.
- Added a tooltip in the build header explaining whether the displayed stat spread is sourced or estimated.

### Fixed
- Exact-level builds (e.g. "Level 150") now compute back to their stated rune level. Previously some builds reported a slightly different level due to mismatched source data.
- Estimated spreads no longer present as if they were scraped directly from the build page.

### Validation
- `npm test`: 61 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Randomizer Index and Build Planner 1.4.1 - 2026-05-09

### Added
- Computed `statRequired` for all 160 build presets from Fextralife item data and game CSV files. All five relevant stats (Str/Dex/Int/Fai/Arc) are now populated; previously only Str/Dex were reliably captured.
- Distinct app identity: product name, window title, and header updated to "Elden Ring Randomizer Index and Build Planner".

### Fixed
- Barricade Shield requirement corrected to ash-of-war (not shield).
- Millicent's Prosthesis (curly-apostrophe variant) now correctly tagged as talisman.
- Fire Knight's Seal (Str 8 / Fai 23) and Black Steel Greatshield (Str 35) requirements added.

### Validation
- `npm test`: 61 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Randomizer Index and Build Planner 1.4.0 - 2026-05-09

### Added
- Dual stat-bar layout in the build detail header: **Item requirements** (what you need to equip each item) shown separately from **Recommended allocation** (suggested stat spread for the build).
- Canonical test suites for talismans, weapons, seals, and staves — prevents future regressions on item kind tagging.
- Stat model integrity tests: `computeSoulCost` coverage and `primaryStat` validation across all presets.

### Changed
- Ported the `statRequired` / `statRecommended` / `statSource` model from the vanilla branch. `computeSoulCost` now uses `statRecommended ?? statRequired` for rune cost calculation.

### Fixed
- 95 requirement `kind` values corrected across 160 presets:
  - Talismans mis-tagged as other types: Shard of Alexander, Godfrey Icon, Millicent's Prosthesis, Carian Filigreed Crest, Radagon Icon, Erdsteel Dagger, Cinquedea.
  - Weapons mis-tagged as seal/staff/shield: Flamberge, Nagakiba, Black Knife, Bloodhound's Fang, Gargoyle's Blackblade, Eleonora's Poleblade, Regalia of Eochaid, Magma Wyrm's Scalesword, Treespear, Claymore, Clayman's Harpoon, Death's Poker, Moonveil, Rivers of Blood.
  - Spells mis-tagged as shield/ash: Rykard's Rancor, Golden Vow, Scholar's Armament, Terra Magica, Great Glintstone Shard, Magic Glintblade, Beast Claw.
  - Helphen's Steeple re-tagged from weapon to staff.
- All-Knowing Sage build: added missing Faith 60 to recommended allocation.
- Barbarian Beginner build: replaced unreliable scraped data with a calculated spread.

### Validation
- `npm test`: 61 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Randomizer Index and Build Planner 1.3.0 - 2026-05-09

### Added
- **Stat values** for 48 build presets sourced from Fextralife — exact per-stat numbers displayed in the build detail header.
- **Rune cost calculator**: enter your current level and starting class to see how many runes the build requires. Uses the official Elden Ring level formula with all 10 starting classes.
- **Stat bar UI** in the build detail header — color-coded horizontal bars for each stat (Vigor, Mind, Endurance, Strength, Dexterity, Intelligence, Faith, Arcane).
- Stat value inputs added to the custom build editor (optional; leave blank if not needed).
- `formatRunes()` helper for compact display (e.g. 2.4M, 180K).
- Release artifact cleanup script (`scripts/clean-release.ts`) runs automatically on every `npm run dist`.

### Validation
- `npm test`: 48 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Randomizer Index and Build Planner 1.2.1 - 2026-05-09

### Added
- **Custom build creator** — define your own item checklists, name them, and save them locally. Custom builds persist across sessions via localStorage.
- **Browse tab** — filter every item in your loaded seed by stat affinity (Strength, Dexterity, Intelligence, Faith, Arcane, or no primary stat), sorted by area progression so you can see what's accessible early vs. late.
- **Guide tab** — built-in tutorial covering every feature in the app with examples.
- **Fextralife wiki links** on every item name in all tables — opens the item's wiki page in your default browser.
- Export results as CSV or JSON from the toolbar.
- 30+ freeform detection patterns for build items that don't have a single exact match (e.g. "any straight sword").

### Changed
- Build planner fully overhauled: cleaner layout, grouped by level range, stat filtering to show only builds you can currently equip.

### Fixed
- 248 mis-tagged requirement kinds corrected (talisman/shield/seal/weapon).
- 67 weapon-unique skills mapped to their actual weapons.
- 39 duplicate weapon requirements removed.
- 50+ item name mismatches fixed (e.g. Redmane Shield → Redmane Greatshield).
- 27 set names broken out into individual matchable armor pieces.
- 14 combined item entries split into single requirements.
- Build planner now fills the full window width when resized.
- Generic build item requirements marked as flexible (don't fail match if not found exactly).
- Diagnostics panel separated from main results; builds grouped by level range.

### Validation
- `npm test`: 48 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Randomizer Index and Build Planner 1.1.0 - 2026-05-09

### Added
- **Build Planner tab** — browse 100+ curated build presets. Each build lists the items it needs; matched against your loaded spoiler log to show which items you've found and where to get the rest.
- Build presets grouped by rune level range in the selector panel.

### Validation
- `npm test`: 27 tests passing.

---

## Elden Ring Randomizer Index and Build Planner 1.0.5 - 2026-05-08

### Added
- **Acquired tracking** in the Favorites tab — check off items as you collect them. Progress counter shows acquired / total.
- Duplicate key item hints removed from parser output (previously some key items appeared twice).

### Changed
- Visual polish pass: tighter spacing, improved table styles, cleaner header and toolbar layout.

---

## Elden Ring Randomizer Index and Build Planner 1.0.2 - 2026-05-08

### Added
- **Favorites tab** — star any item in the Search results to save it. Favorites persist across sessions via localStorage and survive loading a new spoiler log.
- Star button column in the search table; active state highlighted in gold.

---

## Elden Ring Randomizer Index and Build Planner 1.0.1 - 2026-05-08

### Added
- **Log caching** — the last loaded spoiler log is saved automatically. Relaunch the app and it restores the previous session without needing to load the file again.
- Cache stored via Electron's file system in the app data directory (desktop) or localStorage (browser).
- Diagnostics panel shows the cache path and last cached timestamp.
- "Load new log" button clears the cache and returns to the upload screen.

---

## Elden Ring Randomizer Index and Build Planner 1.0.0 - 2026-05-08

### Initial release

- Load a spoiler log `.txt` file generated by the Elden Ring Item and Enemy Randomizer.
- Search every item placement by item name, location, or area.
- Filter results by source type (boss drop, ground pickup, shop, enemy drop, event, starting equipment).
- Sort any column ascending or descending.
- Expand any row to see the raw log line and section context.
- Export visible results as CSV or JSON.
- Diagnostics panel showing parse statistics, unmatched lines, and warnings.
- Runs as a Windows desktop app (Electron) with no installation required — portable `.exe` build.
- All processing is local; no network requests.
