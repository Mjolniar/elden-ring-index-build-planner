import { describe, expect, it } from 'vitest';
import {
  initialSetupCompleteKey,
  contentProfileKey,
  activeSourceKey,
  storageKey,
} from '../src/storageKeys';
import { DEFAULT_CONTENT_PROFILE } from '../src/dataSources';

describe('initialSetupCompleteKey', () => {
  it('is scoped to app (not source-scoped)', () => {
    expect(initialSetupCompleteKey()).toContain(':app:');
  });

  it('uses the correct app prefix', () => {
    expect(initialSetupCompleteKey()).toMatch(/^elden-ring-index-build-planner:app:/);
  });

  it('is distinct from contentProfileKey', () => {
    expect(initialSetupCompleteKey()).not.toBe(contentProfileKey());
  });

  it('is distinct from activeSourceKey', () => {
    expect(initialSetupCompleteKey()).not.toBe(activeSourceKey());
  });

  it('contains the word "setup"', () => {
    expect(initialSetupCompleteKey()).toContain('setup');
  });

  it('matches storageKey("app", "initial-setup-complete")', () => {
    expect(initialSetupCompleteKey()).toBe(storageKey('app', 'initial-setup-complete'));
  });
});

describe('DEFAULT_CONTENT_PROFILE', () => {
  it('defaults to vanilla mode', () => {
    expect(DEFAULT_CONTENT_PROFILE.baseMode).toBe('vanilla');
  });

  it('has no enabled mod packs by default', () => {
    expect(DEFAULT_CONTENT_PROFILE.enabledModPacks).toEqual([]);
  });
});
