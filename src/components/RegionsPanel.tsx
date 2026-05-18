import { useState, useMemo, useEffect } from 'react';
import type { ItemRecord, SpoilerSettings, DataSourceKind } from '../types';
import {
  isWeaponRecord,
  regionGroupsForRecords,
  weaponsForRegionSelection,
} from '../itemClassifiers';
import { originalItemLabel } from '../dataSources';
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
}

function areaLabel(area: string, root: string): string {
  return area.toLowerCase() === root.toLowerCase() ? 'General' : area;
}

function summaryText(count: number, root: string | null, area: string | null): string {
  if (!root) return '';
  const place = area ? areaLabel(area, root) : root;
  return `${count} weapon${count !== 1 ? 's' : ''} in ${place}`;
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
}: Props) {
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const regionGroups = useMemo(
    () => regionGroupsForRecords(records.filter(isWeaponRecord)),
    [records],
  );

  const selectedGroup = regionGroups.find((group) => group.root === selectedRoot) ?? null;

  const weaponRecords = useMemo(
    () => weaponsForRegionSelection(
      records,
      selectedRoot ? { root: selectedRoot, area: selectedArea } : null,
    ),
    [records, selectedRoot, selectedArea],
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

  function clearRegions() {
    setSelectedRoot(null);
    setSelectedArea(null);
  }

  function selectRoot(root: string) {
    setSelectedRoot((current) => {
      if (current === root && selectedArea === null) return null;
      return root;
    });
    setSelectedArea(null);
  }

  if (randomizerNeedsLog) {
    return (
      <p className="empty-state">
        No spoiler log loaded. Open the Settings tab to load one.
      </p>
    );
  }

  const emptyMessage = !selectedRoot
    ? 'Select one or more regions above to see available weapons.'
    : sourceKind === 'randomizer-log'
      ? 'No weapons found in the selected region(s) in the loaded spoiler log.'
      : 'No weapons found in the selected region(s).';
  const showAreaPicker = !!selectedGroup && (
    selectedGroup.areas.length > 1 ||
    selectedGroup.areas[0]?.area.toLowerCase() !== selectedGroup.root.toLowerCase()
  );

  return (
    <div className="regions-panel">
      <div className="region-controls">
        <fieldset className="stat-filter region-root-filter">
          <legend>Major region</legend>
          <div className="region-root-grid">
            {selectedRoot && (
              <button
                type="button"
                className="stat-chip region-chip-clear"
                onClick={clearRegions}
                title="Clear region selection"
              >
                Clear
              </button>
            )}
            {regionGroups.map((group) => (
              <button
                key={group.root}
                type="button"
                className={`region-root-btn${selectedRoot === group.root ? ' active' : ''}`}
                onClick={() => selectRoot(group.root)}
              >
                <span>{group.root}</span>
                <strong>{group.count}</strong>
              </button>
            ))}
            {regionGroups.length === 0 && (
              <span className="region-empty-hint">No region data available in the active item source.</span>
            )}
          </div>
        </fieldset>
        {selectedGroup && showAreaPicker && (
          <fieldset className="stat-filter region-area-filter">
            <legend>Locations in {selectedGroup.root}</legend>
            <div className="region-area-grid">
              <button
                type="button"
                className={`stat-chip${selectedArea === null ? ' active' : ''}`}
                onClick={() => setSelectedArea(null)}
              >
                All {selectedGroup.root} ({selectedGroup.count})
              </button>
              {selectedGroup.areas.map((area) => (
                <button
                  key={area.area}
                  type="button"
                  className={`stat-chip${selectedArea === area.area ? ' active' : ''}`}
                  onClick={() => setSelectedArea(area.area)}
                >
                  {areaLabel(area.area, selectedGroup.root)} ({area.count})
                </button>
              ))}
            </div>
          </fieldset>
        )}
        {selectedRoot && (
          <div className="region-summary">
            {summaryText(weaponRecords.length, selectedRoot, selectedArea)}
          </div>
        )}
      </div>

      <SearchTable
        records={weaponRecords}
        favoriteKeys={favoriteKeys}
        acquiredKeys={acquiredKeys}
        onToggleFavorite={onToggleFavorite}
        onToggleAcquired={onToggleAcquired}
        showAcquiredColumn={true}
        spoilerSettings={spoilerSettings}
        emptyMessage={emptyMessage}
        originalItemLabel={originalItemLabel(sourceKind)}
      />
    </div>
  );
}
