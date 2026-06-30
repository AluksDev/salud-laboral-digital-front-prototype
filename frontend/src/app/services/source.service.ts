import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import type { Source } from '../models/source.model';
import { MOCK_SOURCES, getSourceById } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class SourceService {
  getAll(): Observable<Source[]> {
    return of(MOCK_SOURCES);
  }

  getById(id: string): Observable<Source | undefined> {
    return of(getSourceById(id));
  }
}
