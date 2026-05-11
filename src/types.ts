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
export type ActiveTab = 'all' | 'favorites' | 'builds' | 'browse' | 'diagnostics' | 'guide' | 'settings';

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
}
