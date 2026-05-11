import type { FilterState, SourceType } from '../types';

const SOURCE_TYPES: { value: SourceType | 'all'; label: string }[] = [
  { value: 'all', label: 'All sources' },
  { value: 'boss_drop', label: 'Boss drop' },
  { value: 'ground_pickup', label: 'Ground pickup' },
  { value: 'shop', label: 'Shop' },
  { value: 'enemy_drop', label: 'Enemy drop' },
  { value: 'starting_loadout', label: 'Starting loadout' },
  { value: 'event', label: 'Event / quest' },
  { value: 'unknown', label: 'Unknown' },
];

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  totalVisible: number;
  totalRecords: number;
  spoilerMode: boolean;
}

export function Filters({ filters, onChange, totalVisible, totalRecords, spoilerMode }: Props) {
  return (
    <div className="filters-bar">
      <input
        className="search-input"
        type="search"
        placeholder={spoilerMode ? 'Search item or area…' : 'Search item, location, area…'}
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />
      <select
        className="source-select"
        value={filters.sourceType}
        onChange={(e) => onChange({ ...filters, sourceType: e.target.value as SourceType | 'all' })}
      >
        {SOURCE_TYPES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <label className="key-toggle">
        <input
          type="checkbox"
          checked={filters.keyItemsOnly}
          onChange={(e) => onChange({ ...filters, keyItemsOnly: e.target.checked })}
        />
        Key items only
      </label>
      <span className="record-count">
        {totalVisible} / {totalRecords} records
      </span>
    </div>
  );
}
