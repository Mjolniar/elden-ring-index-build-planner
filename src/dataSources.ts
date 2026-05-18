import type { ItemDataset, DataSourceKind, SourceMeta, ParseResult, ContentProfile } from './types';
import { VANILLA_ITEMS } from './vanillaData';

export const SOURCE_IDS = {
  vanilla: 'vanilla',
  randomizer: 'randomizer-log',
} as const;

export const SOURCE_METAS: Record<DataSourceKind, SourceMeta> = {
  vanilla: {
    kind: 'vanilla',
    label: 'Vanilla',
    shortLabel: 'Vanilla',
    description: 'Bundled item database with fixed vanilla locations.',
  },
  'randomizer-log': {
    kind: 'randomizer-log',
    label: 'Randomizer Log',
    shortLabel: 'Randomizer Log',
    description: 'Load a spoiler log .txt file from an Elden Ring randomizer seed.',
  },
};

export const SOURCE_META_LIST: SourceMeta[] = [
  SOURCE_METAS.vanilla,
  SOURCE_METAS['randomizer-log'],
];

export function buildVanillaDataset(): ItemDataset {
  return {
    id: SOURCE_IDS.vanilla,
    kind: 'vanilla',
    label: 'Vanilla item database',
    shortLabel: 'Vanilla',
    records: VANILLA_ITEMS,
  };
}

export function buildRandomizerDataset(
  parseResult: ParseResult,
  filename?: string,
  cacheEntry?: ItemDataset['cacheEntry'],
): ItemDataset {
  return {
    id: SOURCE_IDS.randomizer,
    kind: 'randomizer-log',
    label: filename ? `Spoiler log: ${filename}` : 'Loaded spoiler log',
    shortLabel: 'Randomizer Log',
    records: parseResult.records,
    filename,
    seed: parseResult.seed,
    header: parseResult.header,
    diagnostics: parseResult.diagnostics,
    cacheEntry: cacheEntry ?? null,
    loadedAt: new Date().toISOString(),
  };
}

export function originalItemLabel(kind: DataSourceKind): string {
  switch (kind) {
    case 'vanilla':
      return 'Source data';
    case 'randomizer-log':
      return 'Replaced';
  }
}

export function locationColumnLabel(kind: DataSourceKind): string {
  switch (kind) {
    case 'vanilla':
      return 'Location';
    case 'randomizer-log':
      return 'Randomized location';
  }
}

export function missingItemText(kind: DataSourceKind): string {
  switch (kind) {
    case 'vanilla':
      return 'Not found in item database';
    case 'randomizer-log':
      return 'Not found in loaded spoiler log';
  }
}

export function plannerNote(kind: DataSourceKind): string {
  switch (kind) {
    case 'vanilla':
      return 'Matched items are sorted by rough area progression using fixed vanilla locations.';
    case 'randomizer-log':
      return 'Matched items are sorted by rough area progression using randomized spoiler log placements.';
  }
}

export function itemSourceDescription(kind: DataSourceKind): string {
  switch (kind) {
    case 'vanilla':
      return 'item database';
    case 'randomizer-log':
      return 'loaded spoiler log';
  }
}

export const DEFAULT_CONTENT_PROFILE: ContentProfile = {
  baseMode: 'vanilla',
  enabledModPacks: [],
};

export function sourceIdForProfile(profile: ContentProfile): string {
  return profile.baseMode === 'vanilla' ? SOURCE_IDS.vanilla : SOURCE_IDS.randomizer;
}
