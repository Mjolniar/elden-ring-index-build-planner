import type { SourceType } from '../types';

const GROUND_PATTERNS = [
  /\bon a corpse\b/i,
  /\bon the ground\b/i,
  /\bin a chest\b/i,
  /\bchest\b/i,
  /\bpickup\b/i,
  /\bon a body\b/i,
  /\bitem pickup\b/i,
  /\bfound near\b/i,
  /\bnear the\b/i,
  /\bground\b/i,
];

const SHOP_PATTERNS = [
  /\bsold by\b/i,
  /\bshop\b/i,
  /\bpurchase\b/i,
  /\bmerchant\b/i,
  /\bfor \d+ runes\b/i,
];

const BOSS_PATTERNS = [
  /\bdropped by\b/i,
  /\bremembrance\b/i,
  /\bafter defeating\b/i,
  /\bboss\b/i,
];

const ENEMY_PATTERNS = [
  /\benemy drop\b/i,
  /\bdrop from\b/i,
];

const STARTING_PATTERNS = [
  /\bstarting\b/i,
  /\bclass\b/i,
  /\bloadout\b/i,
  /\bcharacter\b/i,
];

const EVENT_PATTERNS = [
  /\bevent\b/i,
  /\bquest\b/i,
  /\breward\b/i,
  /\bafter completing\b/i,
  /\bgiven by\b/i,
];

export function inferSourceType(locationText: string): SourceType {
  if (SHOP_PATTERNS.some((p) => p.test(locationText))) return 'shop';
  if (STARTING_PATTERNS.some((p) => p.test(locationText))) return 'starting_loadout';
  if (EVENT_PATTERNS.some((p) => p.test(locationText))) return 'event';
  if (BOSS_PATTERNS.some((p) => p.test(locationText))) return 'boss_drop';
  if (ENEMY_PATTERNS.some((p) => p.test(locationText))) return 'enemy_drop';
  if (GROUND_PATTERNS.some((p) => p.test(locationText))) return 'ground_pickup';
  return 'unknown';
}
