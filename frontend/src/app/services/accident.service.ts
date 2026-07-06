import { inject, Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject, switchMap, forkJoin } from 'rxjs';
import type { Accident, CreateAccidentDto } from '../models/accident.model';
import { MOCK_ACCIDENTS, getAccidentById, getIncompleteAccidents, saveNewAccident, editExistingAccident } from '../mock/mock-data';
import { WorkerService } from './worker.service';
import { SourceService } from './source.service';
import { Worker } from '../models/worker.model';
import { Source } from '../models/source.model';
import { SerologyStatus } from '../models/serology.model';
import { form } from '@angular/forms/signals';
interface AccidentDetails {
  accident: Accident
  worker: Worker
  sources: Source[]
}

export interface AccidentFormData {
    accidentDate: string
    dni: string
    phone: string
    name: string
    lastName: string
    category: string
    serviceUnit: string
    isImmuneVhb: boolean
    workerConsent: boolean
    observations: string
    workerSerology: {
        vih: SerologyStatus;
        vhb: SerologyStatus;
        vhc: SerologyStatus;
    };
    sources: {
        [key: string]: any;
    }[];
    documentFile: File | null;
}
@Injectable({ providedIn: 'root' })
export class AccidentService {
  private accidentsSubject = new BehaviorSubject<Accident[]>(getIncompleteAccidents());
  private workerService = inject(WorkerService);
  private sourceService = inject(SourceService);

  

  loadFullIncident(id: string): Observable<AccidentDetails>{
    return this.getById(id).pipe(
      switchMap(accident => 
        forkJoin({
          accident: of(accident),
          worker: this.workerService.getById(accident!.workerId),
          sources: forkJoin(
            accident!.sourceIds.map(sourceId => this.sourceService.getById(sourceId))
          ),
        })
      )
    )
  }

  saveFullIncident(formData: AccidentFormData, accidentId?: string): Observable<Accident | null> {
    if (accidentId) {
      return of(editExistingAccident(formData, accidentId));
    }    
    return of(saveNewAccident(formData))
  }

  getAll(): Observable<Accident[]> {
    return of(MOCK_ACCIDENTS);
  }

  getById(id: string): Observable<Accident> {
    return of(getAccidentById(id));
  }

  getIncomplete(): Observable<Accident[]> {
    return this.accidentsSubject.asObservable();
  }

  refreshIncomplete() {
    const updated = getIncompleteAccidents(); // simulate new data
    this.accidentsSubject.next(updated);
  }
}
