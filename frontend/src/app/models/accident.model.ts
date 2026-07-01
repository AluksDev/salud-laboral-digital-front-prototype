import type { SerologyResult } from './serology.model';

export type AccidentStatus = 'incomplete' | 'complete' | 'closed';

export interface Accident {
  id: string;
  workerId: string;
  accidentDate: string;
  sourceIds: string[];
  workerConsent: boolean;
  documentUrl?: string;
  observations: string;
  workerSerology: SerologyResult;
  status: AccidentStatus;
  createdAt: string;
}
