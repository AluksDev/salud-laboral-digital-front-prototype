import type { SerologyResult } from './serology.model';

export interface Source {
  id: string;
  anNumber: string;
  serology: SerologyResult;
}
