import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import type { AgendaItem } from '../models/agenda-item.model';
import { MOCK_AGENDA } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  getToday(): Observable<AgendaItem[]> {
    return of(MOCK_AGENDA);
  }

  getThisWeek(): Observable<AgendaItem[]> {
    return of(MOCK_AGENDA);
  }
}
