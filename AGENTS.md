# Multi-Agent Context: Elden Ring Index and Build Planner

**Paste this file at the start of any AI session to bring the agent up to speed.**  
*Last updated: 2026-05-11*

---

## Who You Are Talking To

This project is developed by **Mjolniar** (GitHub: https://github.com/Mjolniar) using a three-agent workflow:

| Agent | Tool | Cost | Primary Role |
|-------|------|------|--------------|
| **Claude Code** | Claude Code CLI (in VS Code / terminal) | Per token | Architecture, git ops, verification, debugging, release pipeline |
| **DeepSeek V4 Pro** | OpenCode | Free / unlimited | Heavy code generation, large feature ports, bulk data work |
| **ChatGPT** | ChatGPT web | Per token | Community-facing writing, Nexus Mods descriptions, user-facing text |

**Default handoff loop:**
1. Claude Code scopes the task and writes the spec/prompt
2. DeepSeek generates the implementation
3. User pastes the result back to Claude Code
4. Claude Code verifies (tsc + tests), fixes edge cases, commits, and pushes

---

## Project Overview

Two distinct desktop app editions, both built from the same codebase. They share a git repository with separate branches.

| Edition | Branch | Version | Description |
|---------|--------|---------|-------------|
| **Randomizer** | `main` | 1.5.0 | Loads a Fextralife spoiler log `.txt` file and maps randomized item locations |
| **Vanilla** | `vanilla` | 1.1.0 | Static item database — all fixed vanilla locations (base game + Shadow of the Erdtree) |

Both are Windows-only Electron desktop apps distributed as an installer (`.exe`) and portable ZIP.  
Both run **fully offline** — no network requests, no analytics, no telemetry.  
Both are published on **GitHub Releases** and **Nexus Mods**.

---

## Tech Stack

```
React 18.3          UI framework
TypeScript 5.5      Language (strict mode)
Vite 5.3            Bundler / dev server
Electron 31         Desktop wrapper
electron-builder    Packaging (NSIS installer + ZIP)
Vitest 2.0          Test runner
```

Node.js 18+ required. No backend. No database. No external API calls.

---

## Repository Structure

```
elden-ring-index-build-planner/
├── src/
│   ├── App.tsx                   # Root component — tab routing, state, localStorage
│   ├── types.ts                  # All shared TypeScript interfaces
│   ├── locationHints.ts          # Hint generation (AREA_PROGRESSION, generateHint)
│   ├── buildPlanner.ts           # Build preset matching logic
│   ├── buildNotes.ts             # Short objective notes for each build preset
│   ├── itemStats.ts              # Item stat requirement data
│   ├── recordKey.ts              # Stable key generation for favorites/acquired
│   ├── vanillaData.ts            # [vanilla branch only] Full item database
│   ├── parser/                   # Data pipeline parsers
│   └── components/
│       ├── SearchTable.tsx       # Item search table (spoiler-aware)
│       ├── BuildPlannerPanel.tsx # Build planner tab (spoiler-aware)
│       ├── ItemBrowser.tsx       # Stat-filtered browse tab
│       ├── SettingsPanel.tsx     # Settings tab (spoiler mode controls)
│       ├── GuidePanel.tsx        # Built-in tutorial
│       ├── ExportButtons.tsx     # CSV / JSON export
│       ├── Filters.tsx           # Source type filter buttons
│       ├── CustomBuildEditor.tsx # Custom build checklist creator
│       ├── UploadPanel.tsx       # [main/randomizer only] Spoiler log upload
│       └── DiagnosticsPanel.tsx  # Dev diagnostics
├── electron/
│   ├── main.js                   # Electron main process
│   └── preload.js                # Electron preload / IPC bridge
├── data/
│   └── fextra-location-overrides.json  # Manual location corrections (3,321 entries)
├── scripts/
│   └── fextra/                   # Fextralife wiki scraping scripts
├── assets/
│   ├── icon-vanilla.png          # Vanilla edition app icon
│   └── icon-randomizer.png       # Randomizer edition app icon
├── .github/
│   └── workflows/
│       ├── release.yml           # Tag-triggered release pipeline
│       └── issue-digest.yml      # [main only] Weekly GitHub issue summary
├── AGENTS.md                     # This file (AI agent context, lives in repo)
├── CHANGELOG.md                  # Version history
├── package.json
└── vite.config.ts
```

---

## Key Source Files — What They Do

### `src/types.ts`
All shared interfaces. Most important:
```typescript
interface ItemRecord {
  id: string;
  itemName: string;
  locationName: string;    // Full location string
  area: string | null;     // Named area (e.g. "Caelid")
  sourceType: SourceType;  // boss_drop | ground_pickup | shop | enemy_drop | starting_loadout | event | unknown
  section: string;
  rawLine: string;
  isKeyItem: boolean;
  originalItem?: string;   // Randomizer: item that was replaced. Vanilla: original scraped source string.
}

interface SpoilerSettings {
  spoilerMode: boolean;
  showArea: boolean;
  showSource: boolean;
  showHint: boolean;
  hintDifficulty: HintDifficulty;  // 'easy' | 'medium' | 'hard'
}
```

### `src/locationHints.ts`
Generates spoiler-mode hints for each item. Three difficulty levels:
- **Easy**: source type + named area ("Ground pickup in Caelid")
- **Medium**: source type + regional description without place names ("Ground pickup somewhere in the rot-blighted eastern wastes")
- **Hard**: acquisition verb + broad game stage only ("Found on the ground — mid game")

Contains `AREA_PROGRESSION` (area → 0–100 progression score) and `AREA_REGION_LABEL` (area → thematic description) lookup tables covering all base game areas and DLC regions.

Randomizer edition also has `BOSS_HINTS` (~80 entries) and `MERCHANT_HINTS` (~30 entries) for entity-specific hint text.

### `src/App.tsx`
- Holds all app state (items, favorites, acquired, builds, settings)
- Reads/writes localStorage with edition-specific prefixes:
  - Randomizer: `elden-ring-randomizer-index:`
  - Vanilla: `elden-ring-index:`
- Spoiler mode haystack logic: in spoiler mode, `originalItem` is always searchable but `locationName` is excluded
- Renders tab bar and routes between panels

---

## Branch Differences (main vs vanilla)

| Aspect | `main` (Randomizer) | `vanilla` |
|--------|---------------------|-----------|
| Item source | Loaded from user-supplied spoiler log `.txt` | Bundled static database (`vanillaData.ts`) |
| Upload tab | Yes (`UploadPanel.tsx`) | No |
| `originalItem` label | "Replaced:" (the item that was replaced) | "Source data:" (original scraped string) |
| `locationHints.ts` | Has `BOSS_HINTS`, `MERCHANT_HINTS`, full `generateHint()` | `generateHint()` delegates directly to `fallbackHint()` |
| Tests | 61 passing | 54 passing |
| Release tag format | `randomizer-v*` | `vanilla-v*` |
| localStorage prefix | `elden-ring-randomizer-index:` | `elden-ring-index:` |
| App icon | `icon-randomizer.png` | `icon-vanilla.png` |

---

## Common Commands

```bash
# Development
npm run dev              # Browser dev server (localhost:5173)
npm run electron:dev     # Full Electron app in dev mode

# Validation (always run both before committing)
npx tsc --noEmit         # Type check — must pass with 0 errors
npm test                 # Vitest — must pass all tests

# Release build
npm run build            # Compile + bundle (web assets only)
npx electron-builder --win --x64 --publish never  # Package desktop app
# Combined:
npm run dist             # build + electron-builder + clean-release script

# Switch to vanilla branch
git checkout vanilla

# Tag and release (vanilla example)
git tag vanilla-v1.2.0
git push origin vanilla-v1.2.0
# GitHub Actions picks up the tag and creates a release automatically
```

---

## Release Pipeline

Tags matching `randomizer-v*` or `vanilla-v*` trigger `.github/workflows/release.yml`:
1. `npm ci` → `npm test` → `npm run build`
2. `npx electron-builder --win --x64 --publish never`
3. Uploads NSIS `.exe` (installer) and `.zip` (portable) to GitHub Release as draft

**Critical:** Use `--publish never` — do NOT use `EP_DRAFT=true` (causes auth failures).

After the Action completes, manually publish the draft release on GitHub.

---

## Spoiler Mode — How It Works

Controlled by `SpoilerSettings` in `App.tsx`, stored in localStorage, edited in `SettingsPanel`.

When `spoilerMode: true`:
- `SearchTable`: hides Location column; optionally shows Area, Source, Hint columns based on sub-toggles
- `BuildPlannerPanel`: Location column becomes Hint column; Area column gated on `showArea`
- Search haystack excludes `locationName` but always includes `originalItem`
- Detail row expansion shows a message to disable spoiler mode instead of raw location data

---

## Data Sources (Vanilla Edition)

- **Fextralife wiki**: item locations scraped from eldenring.wiki.fextralife.com
- **ERDB**: canonical item names/stats from EldenRingDatabase/erdb on GitHub
- **Manual overrides**: `data/fextra-location-overrides.json` (3,321 corrections)
- **Community checklists**: supplementary curated item lists

---

## Task Triage — Which Agent to Use

### Use DeepSeek (OpenCode) — Free, Use First
- Large feature ports between branches (e.g. vanilla ← main)
- New React components when given typed interfaces
- Repetitive refactors across many files
- Writing/expanding Vitest test cases
- Generating/expanding lookup tables (AREA_PROGRESSION, BOSS_HINTS, etc.)
- First-draft implementations — generate, then hand to Claude for review
- Bulk JSON/data content generation

**Prompt style for DeepSeek:** Paste the full source file(s) as context. Be extremely specific about types, expected output shape, and edge cases. Include existing test patterns.

### Use Claude Code — Has File Access, Git, Terminal
- Reviewing and committing DeepSeek output
- All git operations (branch, merge, tag, push)
- Running tests and interpreting failures
- Debugging specific TypeScript errors with full file context
- Architecture decisions and cross-file impact analysis
- GitHub Actions / release pipeline work
- Writing prompts/specs for DeepSeek

**Prompt style for Claude:** Describe the goal and any constraints. Claude will read the actual files — no need to paste them.

### Use ChatGPT — Natural Language and Writing
- Nexus Mods page descriptions and update posts
- GitHub Release notes (user-facing summaries)
- README sections aimed at end users
- Responses to user bug reports or suggestions
- Naming features, tabs, or hint labels

**Prompt style for ChatGPT:** Give raw technical facts ("we added a spoiler mode with 3 difficulty levels") and ask for a user-friendly rewrite.

---

## Standard Workflow for a New Feature

```
1. Claude Code   → Scope the feature. Identify files to touch. Write DeepSeek prompt.
2. DeepSeek      → Generate implementation from the prompt.
3. You           → Paste result back to Claude Code.
4. Claude Code   → Read output, verify tsc + tests pass, fix any issues, commit, push.
5. ChatGPT       → Write user-facing release notes / changelog entry (if needed).
```

---

## Important Conventions

- **Never skip `npx tsc --noEmit` + `npm test`** before committing. Both must pass clean.
- **Never commit to `main` directly** for large features — use a feature branch.
- **Branch naming**: `feature/short-description` (kebab-case)
- **Commit messages**: imperative mood, present tense ("Add spoiler mode", "Fix hint label")
- **Version bumping**: update `package.json` `version` field AND add a `CHANGELOG.md` entry
- **localStorage keys**: always use the edition prefix — never write bare keys
- **`originalItem`**: label differs per edition — "Replaced:" on randomizer, "Source data:" on vanilla
- **Release tags**: `randomizer-v{semver}` or `vanilla-v{semver}` — format is load-bearing for GHA

---

## Privacy and Distribution

- App runs fully offline. Zero network requests at runtime.
- Privacy policy: https://mjolniar.github.io/elden-ring-apps-privacy/
- Nexus Mods (randomizer): https://www.nexusmods.com/eldenring (page managed manually)
- GitHub Releases: https://github.com/Mjolniar/elden-ring-index-build-planner/releases
- Bug reports and feature suggestions: GitHub Issues on the above repo

---

## What This Project Is NOT

- Not a game mod — does not touch game files or memory
- Not a randomizer itself — the randomizer edition reads an existing spoiler log generated by Elden Ring Item and Enemy Randomizer
- Not a web app (though it can run in browser in dev mode)
- Not maintained by a team — solo developer, multi-AI workflow

---

*This file lives on the developer's desktop as `AI-CONTEXT.md` and in the repository as `AGENTS.md`.*
