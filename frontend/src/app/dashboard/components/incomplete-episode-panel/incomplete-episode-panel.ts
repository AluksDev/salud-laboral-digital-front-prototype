import { ChangeDetectionStrategy, Component, inject, computed, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AccidentService } from '../../../services/accident.service';
import { WorkerService } from '../../../services/worker.service';
import { SourceService } from '../../../services/source.service';
import { EpisodeCard } from '../episode-card/episode-card';
import { buildEpisodeDescription, buildWorkerShortName } from '../../../mock/mock-data';

@Component({
  selector: 'app-incomplete-episode-panel',
  imports: [EpisodeCard],
  templateUrl: './incomplete-episode-panel.html',
  styleUrl: './incomplete-episode-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncompleteEpisodePanel {
  private accidentService = inject(AccidentService);
  private workerService = inject(WorkerService);
  private sourceService = inject(SourceService);

  private accidents = toSignal(this.accidentService.getIncomplete(), { initialValue: [] });
  private workers = toSignal(this.workerService.getAll(), { initialValue: [] });
  private sources = toSignal(this.sourceService.getAll(), { initialValue: [] });

  completarEpisode = output<string>();

  episodes = computed(() =>
    this.accidents().map(accident => {
      const worker = this.workers().find(w => w.id === accident.workerId);
      const source = accident.sourceId ? this.sources().find(s => s.id === accident.sourceId) : undefined;
      return {
        accidentId: accident.id,
        patientName: worker ? buildWorkerShortName(worker) : '—',
        description: worker ? buildEpisodeDescription(accident, worker, source) : '—',
      };
    })
  );

  badgeCount = computed(() => this.accidents().length);
}
