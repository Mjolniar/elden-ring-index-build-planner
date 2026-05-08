export interface SpoilerLogCachePayload {
  filename: string;
  text: string;
  seed: string | null;
}

export interface SpoilerLogCacheEntry {
  filename: string;
  text?: string;
  seed: string | null;
  cachedAt: string | null;
  cachePath: string;
  cacheDir: string;
  latestPath: string;
}

declare global {
  interface Window {
    electronAPI?: {
      platform: string;
      saveSpoilerLogCache: (payload: SpoilerLogCachePayload) => Promise<SpoilerLogCacheEntry>;
      loadSpoilerLogCache: () => Promise<SpoilerLogCacheEntry | null>;
      clearSpoilerLogCache: () => Promise<{ cacheDir: string }>;
      openSpoilerLogCacheDir: () => Promise<{ cacheDir: string }>;
    };
  }
}
