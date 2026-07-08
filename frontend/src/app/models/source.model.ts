import type { SourceSerology } from './serology.model';

export type SourceConsent = 'none' | 'verbal' | 'written';

export interface Source {
  id: string;
  type: 'known' | 'unknown';
  anNumber: string;
  serology: SourceSerology;
  observations: string;
  consent: SourceConsent;
}
