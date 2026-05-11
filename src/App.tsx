import { useState, useMemo, useEffect, useCallback } from 'react';
import type { ParseResult, FilterState, ItemRecord, ActiveTab, SpoilerSettings } from './types';
import type { SpoilerLogCacheEntry } from './electron';
import type { BuildPreset } from './buildPlanner';
import { parseSpoilerLog } from './parser';
import { makeRecordKey } from './recordKey';
import { UploadPanel } from './components/UploadPanel';
import { Filters } from './components/Filters';
import { SearchTable } from './components/SearchTable';
import { DiagnosticsPanel } from './components/DiagnosticsPanel';
import { ExportButtons } from './components/ExportButtons';
import { BuildPlannerPanel } from './components/BuildPlannerPanel';
import { ItemBrowser } from './components/ItemBrowser';
import { GuidePanel } from './components/GuidePanel';
import { SettingsPanel } from './components/SettingsPanel';

function applyFilters(records: ItemRecord[], f: FilterState, s: SpoilerSettings): ItemRecord[] {
  const q = f.search.toLowerCase().trim();
  return records.filter((r) => {
    if (f.keyItemsOnly && !r.isKeyItem) return false;
    if (f.sourceType !== 'all' && r.sourceType !== f.sourceType) return false;
    if (q) {
      const haystack = s.spoilerMode
        ? `${r.itemName} ${r.area ?? ''}`.toLowerCase()
        : `${r.itemName} ${r.locationName} ${r.area ?? ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

const DEFAULT_FILTERS: FilterState = { search: '', sourceType: 'all', keyItemsOnly: false };
const SPOILER_SETTINGS_KEY = 'elden-ring-randomizer-index:spoiler-settings';
const DEFAULT_SPOILER_SETTINGS: SpoilerSettings = {
  spoilerMode: false, showArea: true, showSource: true, showHint: true,
};
const BROWSER_CACHE_KEY = 'elden-ring-randomizer-index:last-log';
const FAVORITES_KEY = 'elden-ring-randomizer-index:favorites';
const ACQUIRED_KEY = 'elden-ring-randomizer-index:acquired';
const USER_BUILDS_KEY = 'elden-ring-randomizer-index:user-builds';
const BUILD_FAVORITES_KEY = 'elden-ring-randomizer-index:build-favorites';

function loadStoredKeySet(storageKey: string): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? new Set(parsed.filter((v) => typeof v === 'string')) : new Set();
  } catch {
    return new Set();
  }
}

export default function App() {
  const [result, setResult] = useState<ParseResult | null>(null);
  const [filename, setFilename] = useState('');
  const [cacheEntry, setCacheEntry] = useState<SpoilerLogCacheEntry | null>(null);
  const [cacheMessage, setCacheMessage] = useState('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [selectedBuildId, setSelectedBuildId] = useState('all-knowing-sage');
  const [favoriteKeys, setFavoriteKeys] = useState<Set<string>>(() => loadStoredKeySet(FAVORITES_KEY));
  const [acquiredKeys, setAcquiredKeys] = useState<Set<string>>(() => loadStoredKeySet(ACQUIRED_KEY));
  const [favoriteBuildIds, setFavoriteBuildIds] = useState<Set<string>>(() => loadStoredKeySet(BUILD_FAVORITES_KEY));
  const [userBuilds, setUserBuilds] = useState<BuildPreset[]>(() => {
    try {
      const raw = localStorage.getItem(USER_BUILDS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [spoilerSettings, setSpoilerSettings] = useState<SpoilerSettings>(() => {
    try {
      const raw = localStorage.getItem(SPOILER_SETTINGS_KEY);
      return raw ? { ...DEFAULT_SPOILER_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SPOILER_SETTINGS;
    } catch { return DEFAULT_SPOILER_SETTINGS; }
  });

  function updateSpoilerSettings(next: SpoilerSettings) {
    setSpoilerSettings(next);
    localStorage.setItem(SPOILER_SETTINGS_KEY, JSON.stringify(next));
  }

  const persistUserBuilds = useCallback((builds: BuildPreset[]) => {
    setUserBuilds(builds);
    localStorage.setItem(USER_BUILDS_KEY, JSON.stringify(builds));
  }, []);

  function loadText(text: string, name: string) {
    setFilename(name);
    setFilters(DEFAULT_FILTERS);
    setActiveTab('all');
    const parsed = parseSpoilerLog(text);
    setResult(parsed);
    return parsed;
  }

  async function cacheSpoilerLog(text: string, name: string, parsed: ParseResult) {
    try {
      if (window.electronAPI?.saveSpoilerLogCache) {
        const saved = await window.electronAPI.saveSpoilerLogCache({
          filename: name,
          text,
          seed: parsed.seed,
        });
        setCacheEntry(saved);
        setCacheMessage(`Cached for next launch: ${saved.latestPath}`);
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
      localStorage.setItem(BROWSER_CACHE_KEY, JSON.stringify(browserEntry));
      setCacheEntry(browserEntry);
      setCacheMessage('Cached in this browser for next launch.');
    } catch (error) {
      console.error(error);
      setCacheMessage('Could not cache this spoiler log. The loaded data is still usable.');
    }
  }

  async function handleFile(text: string, name: string) {
    const parsed = loadText(text, name);
    await cacheSpoilerLog(text, name, parsed);
  }

  async function handleReset() {
    setResult(null);
    setFilename('');
    setCacheEntry(null);
    setCacheMessage('');
    setFilters(DEFAULT_FILTERS);
    setActiveTab('all');
    try {
      if (window.electronAPI?.clearSpoilerLogCache) {
        await window.electronAPI.clearSpoilerLogCache();
      } else {
        localStorage.removeItem(BROWSER_CACHE_KEY);
      }
    } catch (error) {
      console.error(error);
      setCacheMessage('The loaded log was cleared, but the cached copy could not be removed.');
    }
  }

  function toggleFavorite(record: ItemRecord) {
    const key = makeRecordKey(record);
    setFavoriteKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  function toggleAcquired(record: ItemRecord) {
    const key = makeRecordKey(record);
    setAcquiredKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem(ACQUIRED_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  function toggleBuildFavorite(buildId: string) {
    setFavoriteBuildIds((current) => {
      const next = new Set(current);
      if (next.has(buildId)) next.delete(buildId);
      else next.add(buildId);
      localStorage.setItem(BUILD_FAVORITES_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  async function openCacheFolder() {
    await window.electronAPI?.openSpoilerLogCacheDir?.();
  }

  useEffect(() => {
    let cancelled = false;

    async function restoreCachedLog() {
      try {
        if (window.electronAPI?.loadSpoilerLogCache) {
          const cached = await window.electronAPI.loadSpoilerLogCache();
          if (!cached || !cached.text || cancelled) return;

          setCacheEntry(cached);
          setCacheMessage(`Restored cached log: ${cached.latestPath}`);
          loadText(cached.text, cached.filename || 'latest-spoiler-log.txt');
          return;
        }

        const raw = localStorage.getItem(BROWSER_CACHE_KEY);
        if (!raw || cancelled) return;

        const cached = JSON.parse(raw) as SpoilerLogCacheEntry;
        if (!cached.text) return;

        setCacheEntry(cached);
        setCacheMessage('Restored cached browser log.');
        loadText(cached.text, cached.filename || 'cached spoiler log');
      } catch (error) {
        console.error(error);
        if (!cancelled) setCacheMessage('Could not restore the cached spoiler log.');
      }
    }

    restoreCachedLog();
    return () => { cancelled = true; };
  }, []);

  const visible = useMemo(
    () => (result ? applyFilters(result.records, filters, spoilerSettings) : []),
    [result, filters, spoilerSettings]
  );

  const favorites = useMemo(
    () => (result ? result.records.filter((record) => favoriteKeys.has(makeRecordKey(record))) : []),
    [result, favoriteKeys]
  );
  const acquiredFavoritesCount = useMemo(
    () => favorites.filter((record) => acquiredKeys.has(makeRecordKey(record))).length,
    [favorites, acquiredKeys]
  );

  const activeRecords = activeTab === 'favorites' ? favorites : visible;
  const exportFilename = activeTab === 'favorites' ? `${filename.replace(/\.[^.]+$/, '')}-favorites.txt` : filename;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Elden Ring Randomizer Index and Build Planner</h1>
        {result && (
          <button className="reset-btn" onClick={handleReset}>
            Load new log
          </button>
        )}
      </header>

      {!result ? (
        <div className="landing">
          <UploadPanel onFile={handleFile} />
          <p className="landing-hint">
            Generate a spoiler log in the Elden Ring Randomizer, then load it here to search
            item placements and plan build pickups. All processing happens locally in your browser.
          </p>
          {cacheMessage && <p className="cache-message">{cacheMessage}</p>}
        </div>
      ) : (
        <main className="main-layout">
          <div className="tabs-bar" role="tablist" aria-label="Record views">
            <div className="primary-tabs">
              <button
                className={`tab-btn${activeTab === 'all' ? ' active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
              >
                Search
              </button>
              <button
                className={`tab-btn${activeTab === 'favorites' ? ' active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'favorites'}
                onClick={() => setActiveTab('favorites')}
              >
                Favorites ({favorites.length})
              </button>
              <button
                className={`tab-btn${activeTab === 'builds' ? ' active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'builds'}
                onClick={() => setActiveTab('builds')}
              >
                Builds
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
              <button
                className={`tab-btn diagnostics-tab${activeTab === 'diagnostics' ? ' active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'diagnostics'}
                onClick={() => setActiveTab('diagnostics')}
              >
                Diagnostics
              </button>
              <button
                className={`tab-btn diagnostics-tab${activeTab === 'guide' ? ' active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'guide'}
                onClick={() => setActiveTab('guide')}
              >
                Guide
              </button>
              <button
                className={`tab-btn diagnostics-tab${activeTab === 'settings' ? ' active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'settings'}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>
          </div>
          {activeTab === 'diagnostics' ? (
            <DiagnosticsPanel
              diagnostics={result.diagnostics}
              seed={result.seed}
              filename={filename}
              cacheEntry={cacheEntry}
              cacheMessage={cacheMessage}
              onOpenCacheFolder={window.electronAPI?.openSpoilerLogCacheDir ? openCacheFolder : undefined}
            />
          ) : activeTab === 'guide' ? (
            <GuidePanel />
          ) : activeTab === 'settings' ? (
            <SettingsPanel settings={spoilerSettings} onChange={updateSpoilerSettings} />
          ) : activeTab === 'builds' ? (
            <BuildPlannerPanel
              records={result.records}
              selectedBuildId={selectedBuildId}
              onSelectedBuildIdChange={setSelectedBuildId}
              favoriteKeys={favoriteKeys}
              acquiredKeys={acquiredKeys}
              onToggleFavorite={toggleFavorite}
              onToggleAcquired={toggleAcquired}
              favoriteBuildIds={favoriteBuildIds}
              onToggleBuildFavorite={toggleBuildFavorite}
              userBuilds={userBuilds}
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
              records={result.records}
              favoriteKeys={favoriteKeys}
              acquiredKeys={acquiredKeys}
              onToggleFavorite={toggleFavorite}
              onToggleAcquired={toggleAcquired}
            />
          ) : (
            <>
              <div className="toolbar">
                {activeTab === 'all' ? (
                  <Filters
                    filters={filters}
                    onChange={setFilters}
                    totalVisible={visible.length}
                    totalRecords={result.records.length}
                    spoilerMode={spoilerSettings.spoilerMode}
                  />
                ) : (
                  <div className="favorites-summary">
                    Saved favorites from this loaded spoiler log. Acquired: {acquiredFavoritesCount} / {favorites.length}
                  </div>
                )}
                <ExportButtons records={activeRecords} filename={exportFilename} />
              </div>
              <SearchTable
                records={activeRecords}
                favoriteKeys={favoriteKeys}
                acquiredKeys={acquiredKeys}
                onToggleFavorite={toggleFavorite}
                onToggleAcquired={toggleAcquired}
                showAcquiredColumn={activeTab === 'favorites'}
                spoilerSettings={spoilerSettings}
                emptyMessage={
                  activeTab === 'favorites'
                    ? 'No favorites yet. Use the star column in Search to save items here.'
                    : 'No records match the current filters.'
                }
              />
            </>
          )}
        </main>
      )}
    </div>
  );
}
