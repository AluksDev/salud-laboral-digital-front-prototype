import type { Worker } from '../models/worker.model';
import type { Source } from '../models/source.model';
import type { Accident } from '../models/accident.model';
import type { AgendaItem } from '../models/agenda-item.model';

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
  { id: 's1', anNumber: 'AN 88213', serology: { vih: 'negative', vhb: 'positive', vhc: 'negative' } },
  { id: 's2', anNumber: 'AN 71045', serology: { vih: 'negative', vhb: 'negative', vhc: 'positive' } },
  { id: 's3', anNumber: 'AN 55123', serology: { vih: 'positive', vhb: 'negative', vhc: 'negative' } },
  { id: 's4', anNumber: 'AN 33478', serology: { vih: 'negative', vhb: 'positive', vhc: 'pending' } },
];

export const MOCK_ACCIDENTS: Accident[] = [
  { id: 'a1', workerId: 'w1', accidentDate: '2026-06-25', sourceId: 's1', observations: 'Pinchazo con aguja tras extracción sanguínea. Fuente conocida.', workerSerology: { vih: 'negative', vhb: 'positive', vhc: 'negative' }, status: 'incomplete', createdAt: '2026-06-25T10:30:00Z' },
  { id: 'a2', workerId: 'w2', accidentDate: '2026-06-20', sourceId: null, observations: 'Salpicadura de sangre en mucosa ocular durante intubación. Fuente desconocida.', workerSerology: { vih: 'pending', vhb: 'pending', vhc: 'pending' }, status: 'incomplete', createdAt: '2026-06-20T14:15:00Z' },
  { id: 'a3', workerId: 'w3', accidentDate: '2026-06-15', sourceId: 's2', observations: 'Corte con bisturí contaminado en quirófano.', workerSerology: { vih: 'negative', vhb: 'negative', vhc: 'pending' }, status: 'incomplete', createdAt: '2026-06-15T09:45:00Z' },
  { id: 'a4', workerId: 'w4', accidentDate: '2026-04-15', sourceId: 's3', observations: 'Pinchazo con aguja en box de urgencias.', workerSerology: { vih: 'negative', vhb: 'positive', vhc: 'negative' }, status: 'in_follow_up', createdAt: '2026-04-15T16:20:00Z' },
  { id: 'a5', workerId: 'w5', accidentDate: '2026-03-01', sourceId: null, observations: 'Salpicadura en piel no intacta. Fuente desconocida.', workerSerology: { vih: 'negative', vhb: 'positive', vhc: 'negative' }, status: 'in_follow_up', createdAt: '2026-03-01T11:00:00Z' },
  { id: 'a6', workerId: 'w6', accidentDate: '2026-01-10', sourceId: 's4', observations: 'Pinchazo con aguja al procesar muestra en laboratorio.', workerSerology: { vih: 'negative', vhb: 'positive', vhc: 'negative' }, status: 'closed', createdAt: '2026-01-10T08:30:00Z' },
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

export function getSourceById(id: string): Source | undefined {
  return MOCK_SOURCES.find(s => s.id === id);
}

export function getIncompleteAccidents(): Accident[] {
  return MOCK_ACCIDENTS.filter(a => a.status === 'incomplete');
}

export function getAccidentsInFollowUp(): Accident[] {
  return MOCK_ACCIDENTS.filter(a => a.status === 'in_follow_up');
}

export function buildWorkerDisplayName(worker: Worker): string {
  return `${worker.lastName}, ${worker.name}`;
}

export function buildWorkerShortName(worker: Worker): string {
  return `${worker.lastName}, ${worker.name.charAt(0)}.`;
}

export function buildEpisodeDescription(accident: Accident, worker: Worker, source?: Source): string {
  if (accident.sourceId && source) {
    const pendingTests: string[] = [];
    if (source.serology.vih === 'pending') pendingTests.push('serológicos fuente');
    else if (source.serology.vhb === 'pending') pendingTests.push('serológicos fuente');
    else if (source.serology.vhc === 'pending') pendingTests.push('serológicos fuente');

    if (source.serology.vih === 'pending' || source.serology.vhb === 'pending' || source.serology.vhc === 'pending') {
      return `Fuente ${source.anNumber} — faltan resultados serológicos`;
    }
    return `Fuente ${source.anNumber} — serología completa`;
  }

  if (accident.workerSerology.vih === 'pending' || accident.workerSerology.vhb === 'pending' || accident.workerSerology.vhc === 'pending') {
    return 'Falta serología basal del trabajador';
  }

  return 'Pendiente de revisión';
}
