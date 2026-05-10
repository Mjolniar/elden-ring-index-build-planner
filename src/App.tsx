import { useState, useMemo, useCallback } from 'react';
import type { ItemRecord, FilterState, ActiveTab } from './types';
import type { BuildPreset } from './buildPlanner';
import { makeRecordKey } from './recordKey';
import { VANILLA_ITEMS } from './vanillaData';
import { Filters } from './components/Filters';
import { SearchTable } from './components/SearchTable';
import { ExportButtons } from './components/ExportButtons';
import { BuildPlannerPanel } from './components/BuildPlannerPanel';
import { ItemBrowser } from './components/ItemBrowser';
import { GuidePanel } from './components/GuidePanel';

function applyFilters(records: ItemRecord[], f: FilterState): ItemRecord[] {
  const q = f.search.toLowerCase().trim();
  return records.filter((r) => {
    if (f.keyItemsOnly && !r.isKeyItem) return false;
    if (f.sourceType !== 'all' && r.sourceType !== f.sourceType) return false;
    if (q) {
      const haystack = `${r.itemName} ${r.locationName} ${r.area ?? ''} ${r.originalItem ?? ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

const DEFAULT_FILTERS: FilterState = { search: '', sourceType: 'all', keyItemsOnly: false };
const FAVORITES_KEY = 'elden-ring-vanilla:favorites';
const ACQUIRED_KEY = 'elden-ring-vanilla:acquired';
const USER_BUILDS_KEY = 'elden-ring-vanilla:user-builds';
const BUILD_FAVORITES_KEY = 'elden-ring-vanilla:build-favorites';

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

  const persistUserBuilds = useCallback((builds: BuildPreset[]) => {
    setUserBuilds(builds);
    localStorage.setItem(USER_BUILDS_KEY, JSON.stringify(builds));
  }, []);

  const records = VANILLA_ITEMS;

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

  const visible = useMemo(
    () => applyFilters(records, filters),
    [filters]
  );

  const favorites = useMemo(
    () => records.filter((record) => favoriteKeys.has(makeRecordKey(record))),
    [favoriteKeys]
  );
  const acquiredFavoritesCount = useMemo(
    () => favorites.filter((record) => acquiredKeys.has(makeRecordKey(record))).length,
    [favorites, acquiredKeys]
  );

  const activeRecords = activeTab === 'favorites' ? favorites : visible;
  const exportFilename = 'elden-ring-vanilla-items';

  return (
    <div className="app">
      <header className="app-header">
        <h1>Elden Ring Index and Build Planner</h1>
      </header>

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
              className={`tab-btn diagnostics-tab${activeTab === 'guide' ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'guide'}
              onClick={() => setActiveTab('guide')}
            >
              Guide
            </button>
          </div>
        </div>
        {activeTab === 'builds' ? (
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
          />
        ) : activeTab === 'guide' ? (
          <GuidePanel />
        ) : (
          <>
            <div className="toolbar">
              {activeTab === 'all' ? (
                <Filters
                  filters={filters}
                  onChange={setFilters}
                  totalVisible={visible.length}
                  totalRecords={records.length}
                />
              ) : (
                <div className="favorites-summary">
                  Saved favorites from the Elden Ring item database. Acquired: {acquiredFavoritesCount} / {favorites.length}
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
              emptyMessage={
                activeTab === 'favorites'
                  ? 'No favorites yet. Use the star column in Search to save items here.'
                  : 'No records match the current filters.'
              }
            />
          </>
        )}
      </main>
    </div>
  );
}
