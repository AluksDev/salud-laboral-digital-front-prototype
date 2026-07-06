import type { Worker } from '../models/worker.model';
import type { Source } from '../models/source.model';
import type { Accident, AccidentStatus, CreateAccidentDto } from '../models/accident.model';
import type { AgendaItem } from '../models/agenda-item.model';
import { AccidentFormData } from '../services/accident.service';

export const MOCK_WORKERS: Worker[] = [
  { id: 'w1', dni: '12345678A', name: 'María', lastName: 'García López', phone: '+34 612 345 678', category: 'Enfermero/a', serviceUnit: 'Urgencias', isImmuneVhb: true },
  { id: 'w2', dni: '23456789B', name: 'Sergio', lastName: 'Ruiz Díaz', phone: '+34 622 456 789', category: 'Médico/a', serviceUnit: 'UCI', isImmuneVhb: false },
  { id: 'w3', dni: '34567890C', name: 'Patricia', lastName: 'Fernández Ortiz', phone: '+34 632 567 890', category: 'Auxiliar de enfermería', serviceUnit: 'Cirugía', isImmuneVhb: false },
  { id: 'w4', dni: '45678901D', name: 'Javier', lastName: 'Álvarez Torres', phone: '+34 642 678 901', category: 'Enfermero/a', serviceUnit: 'Urgencias', isImmuneVhb: true },
  { id: 'w5', dni: '56789012E', name: 'Laura', lastName: 'Moreno Castro', phone: '+34 655 778 990', category: 'Médico/a', serviceUnit: 'Pediatría', isImmuneVhb: true },
  { id: 'w6', dni: '67890123F', name: 'Carlos', lastName: 'Martínez Ruiz', phone: '+34 665 889 001', category: 'Técnico de laboratorio', serviceUnit: 'Laboratorio', isImmuneVhb: false },
  { id: 'w7', dni: '78901234G', name: 'Ana', lastName: 'Sánchez López', phone: '+34 675 990 112', category: 'Enfermero/a', serviceUnit: 'UCI', isImmuneVhb: true },
  { id: 'w8', dni: '89012345H', name: 'David', lastName: 'Romero Gil', phone: '+34 685 001 223', category: 'Médico/a', serviceUnit: 'Urgencias', isImmuneVhb: false },
];

export const MOCK_SOURCES: Source[] = [
  { id: 's1', type: 'known', anNumber: 'AN 88213', serology: { vih: 'negative', vhb: 'positive', vhc: 'negative' }, observations: 'Paciente colaborador', consent: 'written' },
  { id: 's2', type: 'known', anNumber: 'AN 71045', serology: { vih: 'negative', vhb: 'negative', vhc: 'positive' }, observations: '', consent: 'verbal' },
  { id: 's3', type: 'known', anNumber: 'AN 55123', serology: { vih: 'positive', vhb: 'negative', vhc: 'negative' }, observations: 'Paciente en seguimiento por VIH', consent: 'written' },
  { id: 's4', type: 'known', anNumber: 'AN 33478', serology: { vih: 'negative', vhb: 'positive', vhc: 'pending' }, observations: '', consent: 'none' },
  { id: 's5', type: 'known', anNumber: 'AN 99012', serology: { vih: 'negative', vhb: 'negative', vhc: 'negative' }, observations: 'Paciente sin factores de riesgo', consent: 'written' },
  { id: 's6', type: 'unknown', anNumber: '', serology: { vih: 'pending', vhb: 'pending', vhc: 'pending' }, observations: 'Fuente no identificada', consent: 'none' },
  { id: 's7', type: 'unknown', anNumber: '', serology: { vih: 'pending', vhb: 'pending', vhc: 'pending' }, observations: 'Paciente no identificado en intubación', consent: 'none' },
  { id: 's8', type: 'unknown', anNumber: '', serology: { vih: 'pending', vhb: 'pending', vhc: 'pending' }, observations: 'Salpicadura en piel no intacta, fuente no identificada', consent: 'none' },
];

export const MOCK_ACCIDENTS: Accident[] = [
  { id: 'a1', workerId: 'w1', accidentDate: '2026-06-25', sourceIds: ['s1'], workerConsent: true, observations: 'Pinchazo con aguja tras extracción sanguínea. Fuente conocida.', workerSerology: { vih: 'negative', vhb: 'positive', vhc: 'negative' }, status: 'complete', createdAt: '2026-06-25T10:30:00Z' },
  { id: 'a2', workerId: 'w2', accidentDate: '2026-06-20', sourceIds: ['s7'], workerConsent: true, observations: 'Salpicadura de sangre en mucosa ocular durante intubación. Fuente desconocida.', workerSerology: { vih: 'pending', vhb: 'pending', vhc: 'pending' }, status: 'incomplete', createdAt: '2026-06-20T14:15:00Z' },
  { id: 'a3', workerId: 'w3', accidentDate: '2026-06-15', sourceIds: ['s2'], workerConsent: true, observations: 'Corte con bisturí contaminado en quirófano.', workerSerology: { vih: 'negative', vhb: 'negative', vhc: 'pending' }, status: 'incomplete', createdAt: '2026-06-15T09:45:00Z' },
  { id: 'a4', workerId: 'w4', accidentDate: '2026-04-15', sourceIds: ['s3'], workerConsent: true, observations: 'Pinchazo con aguja en box de urgencias.', workerSerology: { vih: 'negative', vhb: 'positive', vhc: 'negative' }, status: 'complete', createdAt: '2026-04-15T16:20:00Z' },
  { id: 'a5', workerId: 'w5', accidentDate: '2026-03-01', sourceIds: ['s8'], workerConsent: true, observations: 'Salpicadura en piel no intacta. Fuente desconocida.', workerSerology: { vih: 'negative', vhb: 'positive', vhc: 'negative' }, status: 'complete', createdAt: '2026-03-01T11:00:00Z' },
  { id: 'a6', workerId: 'w6', accidentDate: '2026-01-10', sourceIds: ['s4'], workerConsent: true, observations: 'Pinchazo con aguja al procesar muestra en laboratorio.', workerSerology: { vih: 'negative', vhb: 'positive', vhc: 'negative' }, status: 'closed', createdAt: '2026-01-10T08:30:00Z' },
  { id: 'a7', workerId: 'w7', accidentDate: '2026-06-28', sourceIds: ['s5', 's6'], workerConsent: true, observations: 'Doble exposición: pinchazo con aguja y salpicadura mucosa. Una fuente conocida y otra desconocida.', workerSerology: { vih: 'negative', vhb: 'negative', vhc: 'pending' }, status: 'incomplete', createdAt: '2026-06-28T13:45:00Z' },
];

export const MOCK_AGENDA: AgendaItem[] = [
  { id: 'ag1', workerId: 'w4', phone: '+34 642 678 901', badgeLabel: '6 semanas', instruction: 'VHC + ARN-VHC' },
  { id: 'ag2', workerId: 'w5', phone: '+34 655 778 990', badgeLabel: '3 meses', instruction: 'Serología estándar' },
];

export function getWorkerById(id: string): Worker {
  return MOCK_WORKERS.find(w => w.id === id)!;
}

export function getAccidentById(id: string): Accident {
  return MOCK_ACCIDENTS.find(a => a.id === id)!;
}

export function getSourceById(id: string): Source {
  return MOCK_SOURCES.find(s => s.id === id) as Source;
}

export function getIncompleteAccidents(): Accident[] {
  return MOCK_ACCIDENTS.filter(a => a.status === 'incomplete');
}

export function buildWorkerDisplayName(worker: Worker): string {
  return `${worker.lastName}, ${worker.name}`;
}

export function buildWorkerShortName(worker: Worker): string {
  return `${worker.lastName}, ${worker.name.charAt(0)}.`;
}

export function buildEpisodeDescription(accident: Accident, worker: Worker, sources: Source[] = []): string {
  const missingWorkerSerology = Object.values(accident.workerSerology).some(s => s === 'pending');
  if (missingWorkerSerology) return 'Faltan serologia trabajador';
  for (let source of sources) {
    const missingSourceSerology = Object.values(source.serology).some(s => s.result === 'pending');
    if (missingSourceSerology) {
      return 'Faltan serologia fuente';
    }
  }
  return '-';
}

export function getWorkerByDni(dni: string) {
  return MOCK_WORKERS.find(w => w.dni === dni);
}

export function createWorker(worker: any): Worker {
  const lastId = MOCK_WORKERS[MOCK_WORKERS.length - 1].id.split('w')[1];
  const newId = `w${Number(lastId) + 1}`;
  const newWorker = {
    ...worker,
    id: newId
  }
  MOCK_WORKERS.push(newWorker);
  return newWorker;
}

export function addSource(source: Omit<Source, 'id'>): Source {
  const lastId = MOCK_SOURCES[MOCK_SOURCES.length - 1].id.split('s')[1];
  const newId = `s${Number(lastId) + 1}`;
  const newSource = {
    ...source,
    id: newId
  }
  MOCK_SOURCES.push(newSource);
  return newSource;
}

export function saveNewAccident(accidentData: AccidentFormData): Accident {
  const lastId = MOCK_ACCIDENTS[MOCK_ACCIDENTS.length - 1].id.split('a')[1];
  const newId = `a${Number(lastId)}`;
  const newWorkerId = `w${Number(MOCK_WORKERS[MOCK_WORKERS.length - 1].id.split('w')[1])}`;
  const newSourcesId = [];
  let status = 'complete';

  for (let source of accidentData.sources){
    newSourcesId.push(`s${Number(MOCK_SOURCES[MOCK_SOURCES.length - 1].id.split('s')[1])}`); 
    if (Object.values(source['serology']).some(result => result === 'pending')){
      status = 'incomplete';
    }
  }
  for (let workerSerology of Object.values(accidentData.workerSerology)){
    if (workerSerology === 'pending'){
      status = 'incomplete';
      break;
    }
  }
  const newAccident = {
    ...accidentData,
    id: newId,
    status: status as AccidentStatus,
    createdAt: Date.now().toLocaleString(),
    workerId: newWorkerId,
    sourceIds: newSourcesId
  }
  MOCK_ACCIDENTS.push(newAccident);
  return newAccident
}

export function editExistingAccident(accidentData: AccidentFormData, accidentId: string): Accident {
  let status = 'complete';
  const index = MOCK_ACCIDENTS.findIndex(mock => mock.id === accidentId);
  for (let source of accidentData.sources){
    if (Object.values(source['serology']).some(result => result === 'pending')){
      status = 'incomplete';
    }
  }
  for (let workerSerology of Object.values(accidentData.workerSerology)){
    if (workerSerology === 'pending'){
      status = 'incomplete';
      break;
    }
  }
  const newAccident = {
    ...accidentData,
    id: accidentId,
    status: status as AccidentStatus,
    createdAt: Date.now().toLocaleString(),
    workerId: MOCK_ACCIDENTS[index].workerId,
    sourceIds: MOCK_ACCIDENTS[index].sourceIds
  }
  MOCK_ACCIDENTS[index] = newAccident;
  return newAccident
}