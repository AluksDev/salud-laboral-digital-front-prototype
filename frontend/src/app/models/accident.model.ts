import type { SerologyResult } from './serology.model';

export type AccidentStatus = 'incomplete' | 'complete' | 'closed';

export interface Accident {
  id: string;
  workerId: string;
  accidentDate: string;
  sourceIds: string[];
  workerConsent: boolean;
  document?: File,
  documentUrl?: string;
  observations: string;
  workerSerology: SerologyResult;
  status: AccidentStatus;
  createdAt: string;
}

export interface CreateAccidentDto {
  workerId: string;
  accidentDate: string;
  sourceIds: string[];
  workerConsent: boolean;
  document?: File,
  observations: string;
  workerSerology: SerologyResult;
}
