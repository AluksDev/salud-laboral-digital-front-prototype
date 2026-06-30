import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import type { Accident } from '../models/accident.model';
import { MOCK_ACCIDENTS, getAccidentById, getIncompleteAccidents, getAccidentsInFollowUp } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class AccidentService {
  getAll(): Observable<Accident[]> {
    return of(MOCK_ACCIDENTS);
  }

  getById(id: string): Observable<Accident | undefined> {
    return of(getAccidentById(id));
  }

  getIncomplete(): Observable<Accident[]> {
    return of(getIncompleteAccidents());
  }

  getInFollowUp(): Observable<Accident[]> {
    return of(getAccidentsInFollowUp());
  }
}
