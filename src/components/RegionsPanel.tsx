import { useState, useMemo, useEffect } from 'react';
import type { ItemRecord, SpoilerSettings, DataSourceKind } from '../types';
import {
  regionGroupsForRecords,
  itemsForRegionSelection,
} from '../itemClassifiers';
import { originalItemLabel } from '../dataSources';
import { makeRecordKey } from '../recordKey';
import { SearchTable } from './SearchTable';

interface Props {
  records: ItemRecord[];
  favoriteKeys: Set<string>;
  acquiredKeys: Set<string>;
  onToggleFavorite: (record: ItemRecord) => void;
  onToggleAcquired: (record: ItemRecord) => void;
  spoilerSettings: SpoilerSettings;
  sourceKind: DataSourceKind;
  randomizerNeedsLog?: boolean;
  onOpenSettings?: () => void;
}

type QuickFilter = 'not-acquired' | 'favorites';

function areaLabel(area: string, root: string): string {
  return area.toLowerCase() === root.toLowerCase() ? 'General' : area;
}


export function RegionsPanel({
  records,
  favoriteKeys,
  acquiredKeys,
  onToggleFavorite,
  onToggleAcquired,
  spoilerSettings,
  sourceKind,
  randomizerNeedsLog = false,
  onOpenSettings,
}: Props) {
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [quickFilters, setQuickFilters] = useState<Set<QuickFilter>>(new Set());

  const regionGroups = useMemo(
    () => regionGroupsForRecords(records),
    [records],
  );

  const selectedGroup = regionGroups.find((group) => group.root === selectedRoot) ?? null;

  const baseItems = useMemo(
    () => itemsForRegionSelection(records, selectedRoot, selectedArea),
    [records, selectedRoot, selectedArea],
  );

  const filteredItems = useMemo(() => {
    let items = baseItems;
    if (quickFilters.has('not-acquired')) {
      items = items.filter((r) => !acquiredKeys.has(makeRecordKey(r)));
    }
    if (quickFilters.has('favorites')) {
      items = items.filter((r) => favoriteKeys.has(makeRecordKey(r)));
    }
    return items;
  }, [baseItems, quickFilters, acquiredKeys, favoriteKeys]);

  const acquiredCount = useMemo(
    () => baseItems.filter((r) => acquiredKeys.has(makeRecordKey(r))).length,
    [baseItems, acquiredKeys],
  );
  const favCount = useMemo(
    () => baseItems.filter((r) => favoriteKeys.has(makeRecordKey(r))).length,
    [baseItems, favoriteKeys],
  );

  useEffect(() => {
    if (!selectedRoot) return;
    const group = regionGroups.find((candidate) => candidate.root === selectedRoot);
    if (!group) {
      setSelectedRoot(null);
      setSelectedArea(null);
      return;
    }
    if (selectedArea && !group.areas.some((area) => area.area === selectedArea)) {
      setSelectedArea(null);
    }
  }, [regionGroups, selectedRoot, selectedArea]);

  function selectRoot(root: string) {
    if (selectedRoot === root && selectedArea === null) {
      setSelectedRoot(null);
    } else {
      setSelectedRoot(root);
    }
    setSelectedArea(null);
  }

  function toggleQuickFilter(f: QuickFilter) {
    setQuickFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  }

  if (randomizerNeedsLog) {
    return (
      <div className="regions-panel regions-panel-empty">
        <p className="empty-state">No spoiler log loaded. Open Settings to load one.</p>
        {onOpenSettings && (
          <button type="button" className="empty-state-action" onClick={onOpenSettings}>
            Open Settings
          </button>
        )}
      </div>
    );
  }

  const showAreaPicker = !!selectedGroup && (
    selectedGroup.areas.length > 1 ||
    (selectedGroup.areas[0]?.area.toLowerCase() !== selectedGroup.root.toLowerCase())
  );

  const scopeLabel = selectedArea
    ? areaLabel(selectedArea, selectedRoot ?? '')
    : selectedRoot
      ? `All of ${selectedRoot}`
      : null;

  const emptyMessage = !selectedRoot
    ? 'Select a major region to see items.'
    : sourceKind === 'randomizer-log'
      ? `No items found in ${scopeLabel} in the loaded spoiler log.`
      : `No items found in ${scopeLabel}.`;

  return (
    <div className="regions-layout">
      {/* Left sidebar: major regions */}
      <div className="regions-sidebar">
        <div className="regions-sidebar-header">Major Regions</div>
        <div className="regions-sidebar-list">
          {regionGroups.map((group) => (
            <button
              key={group.root}
              type="button"
              className={`region-sidebar-item${selectedRoot === group.root ? ' active' : ''}`}
              onClick={() => selectRoot(group.root)}
            >
              <span className="region-sidebar-name">{group.root}</span>
              <span className="region-sidebar-count">{group.count}</span>
            </button>
          ))}
          {regionGroups.length === 0 && (
            <span className="region-empty-hint">No region data available.</span>
          )}
        </div>
      </div>

      {/* Main panel */}
      <div className="regions-main">
        {!selectedRoot ? (
          <div className="regions-main-empty">
            <p className="empty-state">Select a major region from the sidebar to browse items.</p>
          </div>
        ) : (
          <>
            {/* Region header + secondary location picker */}
            <div className="regions-main-controls">
              <div className="regions-main-title-row">
                <h2 className="regions-main-title">{selectedRoot}</h2>
                <div className="regions-main-counts">
                  <span className="regions-count-total">{baseItems.length} items</span>
                  {acquiredCount > 0 && (
                    <span className="regions-count-acquired">· {acquiredCount} acquired</span>
                  )}
                  {favCount > 0 && (
                    <span className="regions-count-fav">· {favCount} starred</span>
                  )}
                  {sourceKind === 'randomizer-log' && (
                    <span className="mode-badge-inline">Randomizer</span>
                  )}
                </div>
              </div>

              {showAreaPicker && (
                <div className="region-area-strip">
                  <button
                    type="button"
                    className={`region-area-chip${selectedArea === null ? ' active' : ''}`}
                    onClick={() => setSelectedArea(null)}
                  >
                    All ({selectedGroup!.count})
                  </button>
                  {selectedGroup!.areas.map((area) => (
                    <button
                      key={area.area}
                      type="button"
                      className={`region-area-chip${selectedArea === area.area ? ' active' : ''}`}
                      onClick={() => setSelectedArea(area.area)}
                    >
                      {areaLabel(area.area, selectedRoot)} ({area.count})
                    </button>
                  ))}
                </div>
              )}

              <div className="region-quick-filters">
                <span className="region-quick-label">Show:</span>
                <button
                  type="button"
                  className={`region-quick-chip${quickFilters.has('not-acquired') ? ' active' : ''}`}
                  onClick={() => toggleQuickFilter('not-acquired')}
                >
                  Not acquired
                </button>
                <button
                  type="button"
                  className={`region-quick-chip${quickFilters.has('favorites') ? ' active' : ''}`}
                  onClick={() => toggleQuickFilter('favorites')}
                >
                  Favorites
                </button>
                {quickFilters.size > 0 && (
                  <button
                    type="button"
                    className="region-quick-clear"
                    onClick={() => setQuickFilters(new Set())}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            <SearchTable
              records={filteredItems}
              favoriteKeys={favoriteKeys}
              acquiredKeys={acquiredKeys}
              onToggleFavorite={onToggleFavorite}
              onToggleAcquired={onToggleAcquired}
              showAcquiredColumn={true}
              spoilerSettings={spoilerSettings}
              sourceKind={sourceKind}
              emptyMessage={
                quickFilters.size > 0 && baseItems.length > 0
                  ? `No items match the active filters in ${scopeLabel}.`
                  : emptyMessage
              }
              originalItemLabel={originalItemLabel(sourceKind)}
            />
          </>
        )}
      </div>
    </div>
  );
}
