import type { SerologyResult } from './serology.model';

export type SourceConsent = 'none' | 'verbal' | 'written';

export interface Source {
  id: string;
  type: 'known' | 'unknown';
  anNumber: string;
  serology: SerologyResult;
  observations: string;
  consent: SourceConsent;
}
