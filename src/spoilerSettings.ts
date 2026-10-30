import type { SpoilerSettings } from './types';

/**
 * Canonical default SpoilerSettings.
 * All fields are explicitly false/true so that normalization can fill missing
 * keys from older stored values.
 */
export const DEFAULT_SPOILER_SETTINGS: SpoilerSettings = {
  spoilerMode: false,
  showArea: true,
  showSource: true,
  showHint: true,
  hintDifficulty: 'medium',
  hideOriginalItem: false,
  randomizedPlacementSearchOnly: false,
};

/**
 * Merges a (possibly partial/outdated) stored object with the defaults.
 * Older localStorage entries pre-dating the new fields get the safe defaults.
 */
export function normalizeSpoilerSettings(stored: Partial<SpoilerSettings>): SpoilerSettings {
  return {
    ...DEFAULT_SPOILER_SETTINGS,
    ...stored,
  };
}
