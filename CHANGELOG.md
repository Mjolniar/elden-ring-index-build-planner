# Changelog

## Elden Ring Index and Build Planner 1.2.0 - 2026-05-18

### Added
- **Integrated release** combining the vanilla fixed-location item database and randomizer spoiler-log workflow in one offline Electron app.
- **First-run setup** asks whether the user is using Elden Ring Randomizer. Vanilla opens directly into the fixed-location app; Randomizer asks for a spoiler log before entering the app.
- **Settings-driven content mode** lets users switch between Vanilla and Randomizer later without erasing source-specific favorites, acquired progress, custom builds, or spoiler settings.
- **Active mode header badge** clearly distinguishes Vanilla and Randomizer Log mode.
- **Regions tab** for looking up available weapons by major region or child location in the active item source.
- **Future mod content placeholders** for Elden Ring Reforged and The Convergence. These are intentionally disabled pending a separate data and permission plan.

### Changed
- Shared Search, Favorites, Build Planner, Browse, Regions, Export, Guide, and Settings flows now operate against the active content source.
- Regions are grouped by major root areas instead of a flat location chip list.
- Source-aware labels distinguish fixed vanilla source data from Randomizer replaced-item metadata.

### Fixed
- Source switching and first-run setup reload source-scoped favorites, acquired state, build favorites, custom builds, and spoiler settings instead of leaking in-memory state between Vanilla and Randomizer.
- Regions weapon lookup now uses broader weapon-family detection so weapons absent from curated build presets still appear.
- Weapon names with upgrade suffixes are recognized in region lookup.
- Randomizer boss and merchant hint data were ported into the integrated branch, including area-qualified boss hint lookup.
- Randomizer copy consistently asks for a spoiler log rather than implying the seed alone is enough.

### Validation
- `npx tsc --noEmit`: passing.
- `npm test -- --run`: 121 tests passing.
- `npm run dist`: passing, with Vite's existing large chunk-size warning.
- Browser smoke passed for first-run setup, Vanilla entry, mode badge, Settings return-to-setup, major-region layout, Limgrave root selection, and Regions acquired-column rendering.

---

## Elden Ring Index and Build Planner 1.2.0-preview.2 - 2026-05-18

### Fixed
- **Randomizer mode header clarity** — the app header now shows the active content mode, including a visible "Randomizer Log" badge and loaded spoiler-log filename/detail when applicable.
- **Regions tab grouping** — replaced the flat location chip wall with major region groups. Selecting a major region now includes all known sublocations under it; child location filters appear only when useful.
- **Regions weapon counts** — broadened weapon detection so the Regions tab no longer misses weapons that are absent from the curated build preset catalog. The detector now handles weapon-family names and upgraded item suffixes.

### Validation
- `npx tsc --noEmit`: passing.
- `npm test -- --run`: 121 tests passing.
- `npm run build`: passing, with Vite's existing large chunk-size warning.
- Browser smoke passed for the mode badge, major-region layout, Limgrave root selection, and acquired-column rendering.

---

## Elden Ring Index and Build Planner 1.2.0-preview.1 - 2026-05-18

### Added
- **Integrated preview branch** combining the vanilla fixed-location item database and randomizer spoiler-log workflow in one offline Electron app.
- **First-run setup** asks whether the user is using Elden Ring Randomizer. Vanilla opens directly into the fixed-location app; Randomizer asks for a spoiler log before entering the app.
- **Settings-driven content mode** lets users switch between Vanilla and Randomizer later without erasing source-specific favorites, acquired progress, custom builds, or spoiler settings.
- **Randomizer spoiler-log cache IPC** restored for the integrated Electron app, including save, load, clear, and open-cache-folder handlers.
- **Regions tab** for looking up available weapons by selected region in the active item source.
- **Future mod content placeholders** for Elden Ring Reforged and The Convergence. These are intentionally disabled pending a separate data and permission plan.

### Changed
- Shared Search, Favorites, Build Planner, Browse, Regions, Export, Guide, and Settings flows now operate against the active content source.
- Source-aware labels distinguish fixed vanilla source data from Randomizer replaced-item metadata.
- Startup setup reset from Settings now returns to the setup screen and then lands back on Search when Vanilla is selected.

### Fixed
- Source switching and first-run setup now reload source-scoped favorites, acquired state, build favorites, custom builds, and spoiler settings instead of leaking in-memory state between Vanilla and Randomizer.
- Randomizer boss and merchant hint data were ported into the integrated branch, including area-qualified boss hint lookup.
- Randomizer copy now consistently asks for a spoiler log rather than implying the seed alone is enough.

### Validation
- `npx tsc --noEmit`: passing.
- `npm test -- --run`: 115 tests passing.
- `npm run build`: passing, with Vite's existing large chunk-size warning.
- Browser smoke passed for first-run setup, Vanilla entry, Settings return-to-setup, and Regions acquired-column rendering.

---

## Elden Ring Index and Build Planner 1.1.1 - 2026-05-11

### Added
- **AGENTS.md** — multi-agent context file (AI assistant onboarding, task triage, branch overview, conventions).

### Fixed
- **"Unknown region" hints** — expanded area progression and region label tables with 130+ sub-area entries covering every cave, catacomb, tunnel, evergaol, fort, and minor location across the base game and DLC. Added fuzzy substring fallback so sub-area strings absent from the exact-match tables resolve to their parent region. Medium-difficulty hints now show actual region descriptions instead of "an unknown region"; hard-difficulty hints now include game-stage labels instead of giving no stage at all.

### Validation
- `npm test`: 54 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Index and Build Planner 1.1.0 - 2026-05-10

### Added
- **Settings tab** with a master spoiler mode toggle. When enabled, exact item locations are hidden; users choose what partial information to reveal (area, source type, hint).
- **Three-level hint system** (Easy / Medium / Hard) for use in spoiler mode. Difficulty is configurable in Settings.
  - *Easy*: source type and named area (e.g. "Ground pickup in Caelid").
  - *Medium*: source type and thematic regional description without place names (e.g. "Ground pickup somewhere in the rot-blighted eastern wastes").
  - *Hard*: acquisition method and broad game-stage only (e.g. "Found on the ground — mid game").
- **Area progression and region label tables** covering all base-game areas and DLC regions used by hint generation.
- Spoiler settings applied to the **Build Planner** tab: the "Location" column becomes a "Hint" column in spoiler mode; the Area column is gated on the showArea setting.

### Changed
- Search haystack in spoiler mode excludes location names but always includes the original scraped location (`originalItem`) so it remains searchable regardless of spoiler settings.
- Search placeholder updates to "Search item or area…" when spoiler mode is enabled.

### Validation
- `npm test`: 54 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Index and Build Planner 1.0.8 - 2026-05-10

### Changed
- Rebuilt recommended stat allocations using a source-first model: explicit stat spreads from cached Fextralife build pages are used where available; everything else falls back to exact-level estimates derived from item requirements and stat tags.
- Build planner stat section now labels its source — "Source stats" when the spread came from the build page, "Estimated stats" when it was computed.
- Added a tooltip in the build header explaining whether the displayed stat spread is sourced or estimated.

### Fixed
- Exact-level builds (e.g. "Level 150") now compute back to their stated rune level. Previously some builds reported a slightly different level due to mismatched source data.
- Estimated spreads no longer present as if they were scraped directly from the build page.

### Validation
- `npm test`: 54 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Index and Build Planner 1.0.2 - 2026-05-09

### Added
- Computed `statRequired` for all 160 build presets from Fextralife item data and game CSV files. All five relevant stats (Str/Dex/Int/Fai/Arc) are now populated.

### Fixed
- Rivers of Blood requirement kind corrected.
- Missing Arcane requirements added for relevant builds.
- Kind mismatches corrected across multiple presets.

### Validation
- `npm test`: 54 tests passing.
- `npx tsc --noEmit`: passing.

---

## Elden Ring Index and Build Planner 1.0.1 - 2026-05-09

### Added
- **3,321 Fextralife location overrides** applied on top of the base dataset, improving location string quality and accuracy across the item database.
- 59 additional items sourced from Fextralife that were absent from the base spreadsheet data.

### Fixed
- Filtered out description strings that were being used as location names (e.g. item flavor text incorrectly stored in the location field).
- Cleaned and deduplicated location entries across weapons, spells, ashes, and items.

---

## Elden Ring Index and Build Planner 1.0.0 - 2026-05-09

### Initial release

- **1,873 items** with real vanilla locations sourced from community spreadsheet data, covering weapons, armor, spells, ashes of war, talismans, spirits, shields, ammunition, and key items across the base game and Shadow of the Erdtree.
- Search every item by name, location, or area. Filter by source type (boss drop, ground pickup, shop, enemy drop, event, starting equipment). Sort any column.
- **Favorites tab** — star items and mark them acquired. Progress tracked per session.
- **Build Planner tab** — 100+ curated build presets with stat filtering. Each build shows its item requirements and highlights which items you already have. Stat bars, rune cost calculator, and optimal starting class suggestion.
- **Custom build creator** — define your own item checklists and save them locally.
- **Browse tab** — filter every item by stat affinity (Strength, Dexterity, Intelligence, Faith, Arcane), sorted by area progression.
- **Guide tab** — built-in tutorial covering all features.
- Fextralife wiki links on every item name in all tables.
- Export results as CSV or JSON.
- Runs as a Windows desktop app (Electron) with installer and portable ZIP options.
- Fully offline — no network requests, no data sent anywhere.
