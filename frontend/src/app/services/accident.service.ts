import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import type { Accident, CreateAccidentDto } from '../models/accident.model';
import { MOCK_ACCIDENTS, getAccidentById, getIncompleteAccidents, saveNewAccident } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class AccidentService {
  private accidentsSubject = new BehaviorSubject<Accident[]>(getIncompleteAccidents());

  getAll(): Observable<Accident[]> {
    return of(MOCK_ACCIDENTS);
  }

  getById(id: string): Observable<Accident | undefined> {
    return of(getAccidentById(id));
  }

  getIncomplete(): Observable<Accident[]> {
    return this.accidentsSubject.asObservable();
  }

  refreshIncomplete() {
    const updated = getIncompleteAccidents(); // simulate new data
    this.accidentsSubject.next(updated);
  }

  saveAccident(accidentData: CreateAccidentDto): Observable<Accident> {
    return of(saveNewAccident(accidentData));
  }
}
