import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import type { Worker } from '../models/worker.model';
import { MOCK_WORKERS, getWorkerById, buildWorkerDisplayName, getWorkerByDni, createWorker } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class WorkerService {
  getAll(): Observable<Worker[]> {
    return of(MOCK_WORKERS);
  }

  getById(id: string): Observable<Worker> {
    return of(getWorkerById(id));
  }

  search(query: string): Observable<Worker[]> {
    const q = query.toLowerCase();
    return of(MOCK_WORKERS.filter(w =>
      w.dni.toLowerCase().includes(q) ||
      w.name.toLowerCase().includes(q) ||
      w.lastName.toLowerCase().includes(q)
    ));
  }

  getByDniorCreate(worker: Omit<Worker, 'id'>): Observable<string> {
    const workerData = getWorkerByDni(worker.dni);
    if (workerData) return of(workerData.id);
    const newWorker = createWorker(worker);
    return of(newWorker.id);
  }

  buildDisplayName(worker: Worker): string {
    return buildWorkerDisplayName(worker);
  }
}
