import type { SpoilerLogCacheEntry } from './electron';

export type SourceType =
  | 'ground_pickup'
  | 'shop'
  | 'boss_drop'
  | 'enemy_drop'
  | 'starting_loadout'
  | 'event'
  | 'unknown';

export interface ItemRecord {
  id: string;
  itemName: string;
  originalItem: string | null;
  locationName: string;
  area: string | null;
  sourceType: SourceType;
  isKeyItem: boolean;
  rawLine: string;
  section: string;
}

export interface ParseDiagnostics {
  totalLines: number;
  parsedRecords: number;
  unmatchedLines: string[];
  warnings: string[];
  sections: string[];
}

export interface ParseResult {
  records: ItemRecord[];
  diagnostics: ParseDiagnostics;
  seed: string | null;
  header: string[];
}

export type SortField = keyof Pick<ItemRecord, 'itemName' | 'locationName' | 'area' | 'sourceType'>;
export type SortDir = 'asc' | 'desc';
export type ActiveTab = 'all' | 'favorites' | 'builds' | 'browse' | 'regions' | 'diagnostics' | 'guide' | 'settings';
export type HintDifficulty = 'easy' | 'medium' | 'hard';

export interface FilterState {
  search: string;
  sourceType: SourceType | 'all';
  keyItemsOnly: boolean;
}

export interface SpoilerSettings {
  spoilerMode: boolean;
  showArea: boolean;
  showSource: boolean;
  showHint: boolean;
  hintDifficulty: HintDifficulty;
}

export type DataSourceKind = 'vanilla' | 'randomizer-log';

export interface ContentProfile {
  baseMode: DataSourceKind;
  enabledModPacks: string[];
}

export interface ItemDataset {
  id: string;
  kind: DataSourceKind;
  label: string;
  shortLabel: string;
  records: ItemRecord[];
  filename?: string;
  seed?: string | null;
  header?: string[];
  diagnostics?: ParseDiagnostics;
  cacheEntry?: SpoilerLogCacheEntry | null;
  loadedAt?: string;
}

export interface SourceMeta {
  kind: DataSourceKind;
  label: string;
  shortLabel: string;
  description: string;
}
