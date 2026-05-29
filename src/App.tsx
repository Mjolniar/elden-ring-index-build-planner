import { useState, useMemo, useEffect, useCallback } from 'react';
import type { ItemRecord, FilterState, ActiveTab, SpoilerSettings, ParseResult, ItemDataset, ContentProfile } from './types';
import type { SpoilerLogCacheEntry } from './electron';
import type { BuildPreset } from './buildPlanner';
import { parseSpoilerLog } from './parser';
import { makeRecordKey } from './recordKey';
import { buildVanillaDataset, buildRandomizerDataset, originalItemLabel, locationColumnLabel, missingItemText, plannerNote, DEFAULT_CONTENT_PROFILE, sourceIdForProfile } from './dataSources';
import {
  spoilerSettingsKey,
  favoritesKey,
  acquiredKey,
  userBuildsKey,
  buildFavoritesKey,
  browserCacheKey,
  contentProfileKey,
  initialSetupCompleteKey,
  loadStoredKeySet,
  loadStoredJSON,
} from './storageKeys';
import { applyFilters } from './searchFilters';
import { normalizeSpoilerSettings } from './spoilerSettings';
import { Filters } from './components/Filters';
import { SearchTable } from './components/SearchTable';
import { DiagnosticsPanel } from './components/DiagnosticsPanel';
import { ExportButtons } from './components/ExportButtons';
import { BuildPlannerPanel } from './components/BuildPlannerPanel';
import { ItemBrowser } from './components/ItemBrowser';
import { GuidePanel } from './components/GuidePanel';
import { SettingsPanel } from './components/SettingsPanel';
import { RegionsPanel } from './components/RegionsPanel';
import { InitialSetupPanel } from './components/InitialSetupPanel';

const DEFAULT_FILTERS: FilterState = { search: '', sourceType: 'all', keyItemsOnly: false };

export default function App() {
  const [contentProfile, setContentProfile] = useState<ContentProfile>(() =>
    loadStoredJSON<ContentProfile>(contentProfileKey(), DEFAULT_CONTENT_PROFILE)
  );

  const [setupComplete, setSetupComplete] = useState<boolean>(
    () => localStorage.getItem(initialSetupCompleteKey()) === 'true'
  );
  const [setupUploadError, setSetupUploadError] = useState('');

  const [randomizerResult, setRandomizerResult] = useState<ParseResult | null>(null);
  const [randomizerFilename, setRandomizerFilename] = useState('');
  const [randomizerCacheEntry, setRandomizerCacheEntry] = useState<SpoilerLogCacheEntry | null>(null);
  const [randomizerCacheMessage, setRandomizerCacheMessage] = useState('');
  const [restoredCache, setRestoredCache] = useState(false);

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');
  const [selectedBuildId, setSelectedBuildId] = useState('all-knowing-sage');

  const sourceId = sourceIdForProfile(contentProfile);

  const [favoriteKeys, setFavoriteKeys] = useState<Set<string>>(() => loadStoredKeySet(favoritesKey(sourceId)));
  const [acquiredKeys, setAcquiredKeys] = useState<Set<string>>(() => loadStoredKeySet(acquiredKey(sourceId)));
  const [favoriteBuildIds, setFavoriteBuildIds] = useState<Set<string>>(() => loadStoredKeySet(buildFavoritesKey(sourceId)));
  const [userBuilds, setUserBuilds] = useState<BuildPreset[]>(() =>
    loadStoredJSON<BuildPreset[]>(userBuildsKey(sourceId), [])
  );
  const [spoilerSettings, setSpoilerSettings] = useState<SpoilerSettings>(() =>
    normalizeSpoilerSettings(loadStoredJSON<Partial<SpoilerSettings>>(spoilerSettingsKey(sourceId), {}))
  );

  function reloadSourceState(nextSourceId: string) {
    setFavoriteKeys(loadStoredKeySet(favoritesKey(nextSourceId)));
    setAcquiredKeys(loadStoredKeySet(acquiredKey(nextSourceId)));
    setFavoriteBuildIds(loadStoredKeySet(buildFavoritesKey(nextSourceId)));
    setUserBuilds(loadStoredJSON<BuildPreset[]>(userBuildsKey(nextSourceId), []));
    setSpoilerSettings(
      normalizeSpoilerSettings(loadStoredJSON<Partial<SpoilerSettings>>(spoilerSettingsKey(nextSourceId), {}))
    );
  }

  function handleProfileChange(nextProfile: ContentProfile) {
    const prevMode = contentProfile.baseMode;
    const nextMode = nextProfile.baseMode;
    const nextSourceId = sourceIdForProfile(nextProfile);
    setContentProfile(nextProfile);
    localStorage.setItem(contentProfileKey(), JSON.stringify(nextProfile));
    if (prevMode !== nextMode) {
      setFilters(DEFAULT_FILTERS);
      if (activeTab === 'diagnostics' && nextMode !== 'randomizer-log') {
        setActiveTab('search');
      }
      reloadSourceState(nextSourceId);
    }
  }

  function updateSpoilerSettings(next: SpoilerSettings) {
    setSpoilerSettings(next);
    localStorage.setItem(spoilerSettingsKey(sourceId), JSON.stringify(next));
  }

  const persistUserBuilds = useCallback((builds: BuildPreset[]) => {
    setUserBuilds(builds);
    localStorage.setItem(userBuildsKey(sourceId), JSON.stringify(builds));
  }, [sourceId]);

  function loadText(text: string, name: string) {
    setRandomizerFilename(name);
    setFilters(DEFAULT_FILTERS);
    setActiveTab('search');
    const parsed = parseSpoilerLog(text);
    setRandomizerResult(parsed);
    return parsed;
  }

  async function cacheSpoilerLog(text: string, name: string, parsed: ParseResult, targetSourceId?: string) {
    try {
      if (window.electronAPI?.saveSpoilerLogCache) {
        const saved = await window.electronAPI.saveSpoilerLogCache({
          filename: name,
          text,
          seed: parsed.seed,
        });
        setRandomizerCacheEntry(saved);
        setRandomizerCacheMessage(`Cached for next launch: ${saved.latestPath}`);
        return;
      }

      const browserEntry: SpoilerLogCacheEntry = {
        filename: name,
        text,
        seed: parsed.seed,
        cachedAt: new Date().toISOString(),
        cachePath: 'browser local storage',
        cacheDir: 'browser local storage',
        latestPath: 'browser local storage',
      };
      localStorage.setItem(browserCacheKey(targetSourceId ?? sourceId), JSON.stringify(browserEntry));
      setRandomizerCacheEntry(browserEntry);
      setRandomizerCacheMessage('Cached in this browser for next launch.');
    } catch (error) {
      console.error(error);
      setRandomizerCacheMessage('Could not cache this spoiler log. The loaded data is still usable.');
    }
  }

  async function handleFile(text: string, name: string) {
    const parsed = loadText(text, name);
    await cacheSpoilerLog(text, name, parsed);
  }

  async function handleRandomizerReset() {
    setRandomizerResult(null);
    setRandomizerFilename('');
    setRandomizerCacheEntry(null);
    setRandomizerCacheMessage('');
    setFilters(DEFAULT_FILTERS);
    setActiveTab('search');
    try {
      if (window.electronAPI?.clearSpoilerLogCache) {
        await window.electronAPI.clearSpoilerLogCache();
      } else {
        localStorage.removeItem(browserCacheKey(sourceId));
      }
    } catch (error) {
      console.error(error);
      setRandomizerCacheMessage('The loaded log was cleared, but the cached copy could not be removed.');
    }
  }

  function toggleFavorite(record: ItemRecord) {
    const key = makeRecordKey(record);
    setFavoriteKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem(favoritesKey(sourceId), JSON.stringify([...next]));
      return next;
    });
  }

  function toggleAcquired(record: ItemRecord) {
    const key = makeRecordKey(record);
    setAcquiredKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem(acquiredKey(sourceId), JSON.stringify([...next]));
      return next;
    });
  }

  function toggleBuildFavorite(buildId: string) {
    setFavoriteBuildIds((current) => {
      const next = new Set(current);
      if (next.has(buildId)) next.delete(buildId);
      else next.add(buildId);
      localStorage.setItem(buildFavoritesKey(sourceId), JSON.stringify([...next]));
      return next;
    });
  }

  async function openCacheFolder() {
    await window.electronAPI?.openSpoilerLogCacheDir?.();
  }

  function handleSetupVanilla() {
    const vanillaProfile: ContentProfile = DEFAULT_CONTENT_PROFILE;
    const nextSourceId = sourceIdForProfile(vanillaProfile);
    setContentProfile(vanillaProfile);
    localStorage.setItem(contentProfileKey(), JSON.stringify(vanillaProfile));
    setFilters(DEFAULT_FILTERS);
    setActiveTab('search');
    reloadSourceState(nextSourceId);
    localStorage.setItem(initialSetupCompleteKey(), 'true');
    setSetupComplete(true);
  }

  async function handleSetupRandomizerFile(text: string, name: string) {
    const parsed = parseSpoilerLog(text);
    if (!parsed.records.length) {
      setSetupUploadError(
        'No item records were found in this file. Make sure you are loading a spoiler log ' +
        '(.txt) exported from the Elden Ring Randomizer, not the seed file or another text file.'
      );
      return;
    }
    const randomizerProfile: ContentProfile = { baseMode: 'randomizer-log', enabledModPacks: [] };
    const nextSourceId = sourceIdForProfile(randomizerProfile);
    setContentProfile(randomizerProfile);
    localStorage.setItem(contentProfileKey(), JSON.stringify(randomizerProfile));
    reloadSourceState(nextSourceId);
    loadText(text, name);
    setRestoredCache(true);
    await cacheSpoilerLog(text, name, parsed, 'randomizer-log');
    localStorage.setItem(initialSetupCompleteKey(), 'true');
    setSetupComplete(true);
  }

  function handleResetSetup() {
    localStorage.removeItem(initialSetupCompleteKey());
    setSetupComplete(false);
  }

  useEffect(() => {
    if (contentProfile.baseMode !== 'randomizer-log' || restoredCache) return;
    let cancelled = false;

    async function restoreCachedLog() {
      try {
        if (window.electronAPI?.loadSpoilerLogCache) {
          const cached = await window.electronAPI.loadSpoilerLogCache();
          if (!cached || !cached.text || cancelled) return;

          setRandomizerCacheEntry(cached);
          setRandomizerCacheMessage(`Restored cached log: ${cached.latestPath}`);
          loadText(cached.text, cached.filename || 'latest-spoiler-log.txt');
          setRestoredCache(true);
          return;
        }

        const raw = localStorage.getItem(browserCacheKey(sourceId));
        if (!raw || cancelled) return;

        const cached = JSON.parse(raw) as SpoilerLogCacheEntry;
        if (!cached.text) return;

        setRandomizerCacheEntry(cached);
        setRandomizerCacheMessage('Restored cached browser log.');
        loadText(cached.text, cached.filename || 'cached spoiler log');
        setRestoredCache(true);
      } catch (error) {
        console.error(error);
        if (!cancelled) setRandomizerCacheMessage('Could not restore the cached spoiler log.');
      }
    }

    restoreCachedLog();
    return () => { cancelled = true; };
  }, [contentProfile.baseMode, restoredCache, sourceId]);

  const activeDataset: ItemDataset | null = useMemo(() => {
    if (contentProfile.baseMode === 'vanilla') {
      return buildVanillaDataset();
    }
    if (randomizerResult) {
      return buildRandomizerDataset(randomizerResult, randomizerFilename, randomizerCacheEntry);
    }
    return null;
  }, [contentProfile.baseMode, randomizerResult, randomizerFilename, randomizerCacheEntry]);

  const records = activeDataset?.records ?? [];

  const visible = useMemo(
    () => applyFilters(records, filters, spoilerSettings, contentProfile.baseMode),
    [records, filters, spoilerSettings, contentProfile.baseMode]
  );

  const favorites = useMemo(
    () => records.filter((record) => favoriteKeys.has(makeRecordKey(record))),
    [records, favoriteKeys]
  );
  const acquiredFavoritesCount = useMemo(
    () => favorites.filter((record) => acquiredKeys.has(makeRecordKey(record))).length,
    [favorites, acquiredKeys]
  );

  const activeRecords = activeTab === 'favorites' ? favorites : visible;

  const exportFilename = useMemo(() => {
    const base = contentProfile.baseMode === 'vanilla'
      ? 'elden-ring-vanilla-items'
      : randomizerFilename
        ? randomizerFilename.replace(/\.[^.]+$/, '')
        : 'elden-ring-randomizer-items';
    return activeTab === 'favorites' ? `${base}-favorites` : base;
  }, [contentProfile.baseMode, randomizerFilename, activeTab]);

  // Use the actual loaded dataset kind for column labels / data semantics,
  // but fall back to the profile mode (not hard-coded 'vanilla') so that
  // user-facing copy in randomizer-no-log state still says "Randomizer".
  const datasetKind = activeDataset?.kind ?? contentProfile.baseMode;
  const isRandomizer = contentProfile.baseMode === 'randomizer-log';
  const hasLog = isRandomizer && !!randomizerResult;
  const needsLog = isRandomizer && !randomizerResult;

  const headerModeBadgeClass = isRandomizer
    ? (hasLog ? 'mode-indicator mode-randomizer' : 'mode-indicator mode-randomizer mode-randomizer-warn')
    : 'mode-indicator mode-vanilla';

  const headerModeLabel = isRandomizer ? 'Randomizer Log' : 'Vanilla';
  const headerModeDetail = isRandomizer
    ? (randomizerResult
      ? randomizerFilename || (randomizerResult.seed ? `Seed ${randomizerResult.seed}` : 'Spoiler log loaded')
      : 'Log needed')
    : null;

  const searchEmptyMessage = (() => {
    if (needsLog) return 'No spoiler log loaded. Open Settings to load one.';
    if (isRandomizer) return 'No randomized placements match the current filters.';
    return 'No matching items.';
  })();

  if (!setupComplete) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Elden Ring Index and Build Planner</h1>
        </header>
        <InitialSetupPanel
          onChooseVanilla={handleSetupVanilla}
          onRandomizerFile={handleSetupRandomizerFile}
          uploadError={setupUploadError}
          onClearUploadError={() => setSetupUploadError('')}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title-block">
          <h1>Elden Ring Index and Build Planner</h1>
          <div className={headerModeBadgeClass}>
            <span className="mode-label">{headerModeLabel}</span>
            {headerModeDetail && <span className="mode-detail">{headerModeDetail}</span>}
          </div>
          {needsLog && (
            <button
              type="button"
              className="header-action-btn"
              onClick={() => setActiveTab('settings')}
            >
              Load log
            </button>
          )}
        </div>
        <button
          type="button"
          className="header-action-btn header-settings-btn"
          onClick={() => setActiveTab('settings')}
          title="Content settings"
        >
          Content settings
        </button>
      </header>

      <main className="main-layout">
        <div className="tabs-bar" role="tablist" aria-label="Record views">
          <div className="primary-tabs">
            <button
              className={`tab-btn${activeTab === 'search' ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'search'}
              onClick={() => setActiveTab('search')}
            >
              Search
            </button>
            <button
              className={`tab-btn${activeTab === 'regions' ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'regions'}
              onClick={() => setActiveTab('regions')}
            >
              Regions
            </button>
            <button
              className={`tab-btn${activeTab === 'builds' ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'builds'}
              onClick={() => setActiveTab('builds')}
            >
              Build Planner
            </button>
            <button
              className={`tab-btn${activeTab === 'favorites' ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'favorites'}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites{favorites.length > 0 ? ` (${favorites.length})` : ''}
            </button>
            <button
              className={`tab-btn${activeTab === 'browse' ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'browse'}
              onClick={() => setActiveTab('browse')}
            >
              Browse
            </button>
          </div>
          <div className="utility-tabs">
            {isRandomizer && hasLog && (
              <button
                className={`tab-btn utility-tab${activeTab === 'diagnostics' ? ' active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'diagnostics'}
                onClick={() => setActiveTab('diagnostics')}
              >
                Diagnostics
              </button>
            )}
            <button
              className={`tab-btn utility-tab${activeTab === 'guide' ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'guide'}
              onClick={() => setActiveTab('guide')}
            >
              Guide
            </button>
            <button
              className={`tab-btn utility-tab${activeTab === 'settings' ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
        </div>

        {activeTab === 'diagnostics' && isRandomizer && hasLog ? (
          <DiagnosticsPanel
            diagnostics={randomizerResult!.diagnostics}
            seed={randomizerResult!.seed}
            filename={randomizerFilename}
            cacheEntry={randomizerCacheEntry}
            cacheMessage={randomizerCacheMessage}
            onOpenCacheFolder={window.electronAPI?.openSpoilerLogCacheDir ? openCacheFolder : undefined}
          />
        ) : activeTab === 'guide' ? (
          <GuidePanel sourceKind={datasetKind} randomizerNeedsLog={needsLog} onOpenSettings={() => setActiveTab('settings')} />
        ) : activeTab === 'settings' ? (
          <SettingsPanel
            contentProfile={contentProfile}
            onProfileChange={handleProfileChange}
            spoilerSettings={spoilerSettings}
            onSpoilerSettingsChange={updateSpoilerSettings}
            randomizerLoaded={!!randomizerResult}
            randomizerFilename={randomizerFilename}
            randomizerCacheMessage={randomizerCacheMessage}
            onLoadFile={handleFile}
            onResetRandomizer={handleRandomizerReset}
            onOpenCacheFolder={window.electronAPI?.openSpoilerLogCacheDir ? openCacheFolder : undefined}
            onResetSetup={handleResetSetup}
            onOpenSettings={() => setActiveTab('settings')}
          />
        ) : activeTab === 'builds' ? (
          <BuildPlannerPanel
            records={records}
            selectedBuildId={selectedBuildId}
            onSelectedBuildIdChange={setSelectedBuildId}
            favoriteKeys={favoriteKeys}
            acquiredKeys={acquiredKeys}
            onToggleFavorite={toggleFavorite}
            onToggleAcquired={toggleAcquired}
            favoriteBuildIds={favoriteBuildIds}
            onToggleBuildFavorite={toggleBuildFavorite}
            userBuilds={userBuilds}
            spoilerSettings={spoilerSettings}
            datasetKind={datasetKind}
            locationColumnLabel={locationColumnLabel(datasetKind)}
            missingItemText={missingItemText(datasetKind)}
            plannerNote={plannerNote(datasetKind)}
            randomizerNeedsLog={needsLog}
            onOpenSettings={() => setActiveTab('settings')}
            onSaveBuild={(build) => {
              const existing = userBuilds.findIndex((b) => b.id === build.id);
              const next = existing >= 0
                ? userBuilds.map((b, i) => i === existing ? build : b)
                : [...userBuilds, build];
              persistUserBuilds(next);
            }}
            onDeleteBuild={(id) => persistUserBuilds(userBuilds.filter((b) => b.id !== id))}
          />
        ) : activeTab === 'browse' ? (
          <ItemBrowser
            records={records}
            favoriteKeys={favoriteKeys}
            acquiredKeys={acquiredKeys}
            onToggleFavorite={toggleFavorite}
            onToggleAcquired={toggleAcquired}
            sourceKind={datasetKind}
            spoilerSettings={spoilerSettings}
            randomizerNeedsLog={needsLog}
            onOpenSettings={() => setActiveTab('settings')}
          />
        ) : activeTab === 'regions' ? (
          <RegionsPanel
            records={records}
            favoriteKeys={favoriteKeys}
            acquiredKeys={acquiredKeys}
            onToggleFavorite={toggleFavorite}
            onToggleAcquired={toggleAcquired}
            spoilerSettings={spoilerSettings}
            sourceKind={datasetKind}
            randomizerNeedsLog={needsLog}
            onOpenSettings={() => setActiveTab('settings')}
          />
        ) : (
          <>
            <div className="toolbar">
              {activeTab === 'search' ? (
                <Filters
                  filters={filters}
                  onChange={setFilters}
                  totalVisible={visible.length}
                  totalRecords={records.length}
                  spoilerMode={spoilerSettings.spoilerMode}
                />
              ) : (
                <div className="favorites-summary">
                  Saved favorites from the current item source. Acquired: {acquiredFavoritesCount} / {favorites.length}
                </div>
              )}
              <ExportButtons
                records={activeRecords}
                filename={exportFilename}
                spoilerSettings={spoilerSettings}
                sourceKind={datasetKind}
              />
            </div>
            <SearchTable
              records={activeRecords}
              favoriteKeys={favoriteKeys}
              acquiredKeys={acquiredKeys}
              onToggleFavorite={toggleFavorite}
              onToggleAcquired={toggleAcquired}
              showAcquiredColumn={activeTab === 'favorites'}
              spoilerSettings={spoilerSettings}
              sourceKind={datasetKind}
              emptyMessage={
                activeTab === 'favorites'
                  ? 'No favorites yet. Use the ★ column in Search to save items here.'
                  : searchEmptyMessage
              }
              originalItemLabel={originalItemLabel(datasetKind)}
              onOpenSettings={needsLog ? () => setActiveTab('settings') : undefined}
            />
          </>
        )}
      </main>
    </div>
  );
}
