import type { ItemRecord } from './types';

export function makeRecordKey(record: ItemRecord): string {
  return [
    record.itemName,
    record.locationName,
    record.area ?? '',
    record.originalItem ?? '',
    record.section,
    record.rawLine,
  ].join('\u001f');
}
