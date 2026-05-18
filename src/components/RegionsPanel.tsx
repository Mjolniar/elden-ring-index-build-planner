import { useState, useMemo } from 'react';
import type { ItemRecord, SpoilerSettings, DataSourceKind } from '../types';
import { isWeaponRecord, regionsForRecords, weaponsForRegions } from '../itemClassifiers';
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

function summaryText(count: number, regions: ReadonlySet<string>): string {
  if (!regions.size) return '';
  const regionList = [...regions];
  if (regionList.length === 1) {
    return `${count} weapon${count !== 1 ? 's' : ''} in ${regionList[0]}`;
  }
  return `${count} weapon${count !== 1 ? 's' : ''} across ${regionList.length} region${regionList.length !== 1 ? 's' : ''}`;
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
  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(new Set());

  const allRegions = useMemo(
    () => regionsForRecords(records.filter(isWeaponRecord)),
    [records],
  );

  const weaponRecords = useMemo(
    () => weaponsForRegions(records, selectedRegions),
    [records, selectedRegions],
  );

  function toggleRegion(region: string) {
    setSelectedRegions((prev) => {
      const next = new Set(prev);
      if (next.has(region)) next.delete(region);
      else next.add(region);
      return next;
    });
  }

  function clearRegions() {
    setSelectedRegions(new Set());
  }

  if (randomizerNeedsLog) {
    return (
      <p className="empty-state">
        No spoiler log loaded. Open the Settings tab to load one.
      </p>
    );
  }

  const emptyMessage = !selectedRegions.size
    ? 'Select one or more regions above to see available weapons.'
    : sourceKind === 'randomizer-log'
      ? 'No weapons found in the selected region(s) in the loaded spoiler log.'
      : 'No weapons found in the selected region(s).';

  return (
    <div className="regions-panel">
      <div className="region-controls">
        <fieldset className="stat-filter">
          <legend>Region</legend>
          <div className="stat-chip-grid">
            {selectedRegions.size > 0 && (
              <button
                type="button"
                className="stat-chip region-chip-clear"
                onClick={clearRegions}
                title="Clear region selection"
              >
                All ×
              </button>
            )}
            {allRegions.map((region) => (
              <button
                key={region}
                type="button"
                className={`stat-chip${selectedRegions.has(region) ? ' active' : ''}`}
                onClick={() => toggleRegion(region)}
              >
                {region}
              </button>
            ))}
            {allRegions.length === 0 && (
              <span className="region-empty-hint">No region data available in the active item source.</span>
            )}
          </div>
        </fieldset>
        {selectedRegions.size > 0 && (
          <div className="region-summary">
            {summaryText(weaponRecords.length, selectedRegions)}
          </div>
        )}
      </div>

      <SearchTable
        records={weaponRecords}
        favoriteKeys={favoriteKeys}
        acquiredKeys={acquiredKeys}
        onToggleFavorite={onToggleFavorite}
        onToggleAcquired={onToggleAcquired}
        showAcquiredColumn={false}
        spoilerSettings={spoilerSettings}
        emptyMessage={emptyMessage}
        originalItemLabel={originalItemLabel(sourceKind)}
      />
    </div>
  );
}
