import type { SerologyResult } from './serology.model';

export type AccidentStatus = 'incomplete' | 'in_follow_up' | 'closed';

export interface Accident {
  id: string;
  workerId: string;
  accidentDate: string;
  sourceId: string | null;
  observations: string;
  workerSerology: SerologyResult;
  status: AccidentStatus;
  createdAt: string;
}
