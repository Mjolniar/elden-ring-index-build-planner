const APP_STORAGE_PREFIX = 'elden-ring-index-build-planner';

export function storageKey(sourceId: string, key: string): string {
  return `${APP_STORAGE_PREFIX}:${sourceId}:${key}`;
}

const KEYS = {
  spoilerSettings: 'spoiler-settings',
  favorites: 'favorites',
  acquired: 'acquired',
  userBuilds: 'user-builds',
  buildFavorites: 'build-favorites',
  browserCache: 'last-log',
  activeSource: 'active-source',
} as const;

export function spoilerSettingsKey(sourceId: string): string {
  return storageKey(sourceId, KEYS.spoilerSettings);
}

export function favoritesKey(sourceId: string): string {
  return storageKey(sourceId, KEYS.favorites);
}

export function acquiredKey(sourceId: string): string {
  return storageKey(sourceId, KEYS.acquired);
}

export function userBuildsKey(sourceId: string): string {
  return storageKey(sourceId, KEYS.userBuilds);
}

export function buildFavoritesKey(sourceId: string): string {
  return storageKey(sourceId, KEYS.buildFavorites);
}

export function browserCacheKey(sourceId: string): string {
  return storageKey(sourceId, KEYS.browserCache);
}

export function activeSourceKey(): string {
  return storageKey('app', KEYS.activeSource);
}

export function loadStoredKeySet(storageKey: string): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? new Set(parsed.filter((v: unknown) => typeof v === 'string')) : new Set();
  } catch {
    return new Set();
  }
}

export function loadStoredJSON<T>(storageKey: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
