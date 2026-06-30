import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-episode-card',
  imports: [],
  templateUrl: './episode-card.html',
  styleUrl: './episode-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeCard {
  patientName = input.required<string>();
  description = input.required<string>();
  completar = output<void>();
}
