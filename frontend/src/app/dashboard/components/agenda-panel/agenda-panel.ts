import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AgendaService } from '../../../services/agenda.service';
import { WorkerService } from '../../../services/worker.service';
import { buildWorkerDisplayName } from '../../../mock/mock-data';

@Component({
  selector: 'app-agenda-panel',
  imports: [],
  templateUrl: './agenda-panel.html',
  styleUrl: './agenda-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaPanel {
  private agendaService = inject(AgendaService);
  private workerService = inject(WorkerService);

  private items = toSignal(this.agendaService.getToday(), { initialValue: [] });
  private workers = toSignal(this.workerService.getAll(), { initialValue: [] });

  agendaItems = computed(() =>
    this.items().map(item => {
      const worker = this.workers().find(w => w.id === item.workerId);
      return {
        patientName: worker ? buildWorkerDisplayName(worker) : '—',
        phone: item.phone,
        badgeLabel: item.badgeLabel,
        instruction: item.instruction,
      };
    })
  );
}
