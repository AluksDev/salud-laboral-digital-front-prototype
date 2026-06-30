import { Component, signal } from '@angular/core';
import { IncompleteEpisodePanel } from './components/incomplete-episode-panel/incomplete-episode-panel';
import { AgendaPanel } from './components/agenda-panel/agenda-panel';
import { SearchBar } from './components/search-bar/search-bar';
import { AccidentForm } from '../workers/components/accident-form/accident-form';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [IncompleteEpisodePanel, AgendaPanel, SearchBar, AccidentForm],
})
export class DashboardComponent {
  showIncidentForm = signal<boolean>(false);
  selectedAccidentId = signal<string | undefined>(undefined);

  openNewAccident(): void {
    this.selectedAccidentId.set(undefined);
    this.showIncidentForm.set(true);
  }

  openAccidentForm(accidentId: string): void {
    this.selectedAccidentId.set(accidentId);
    this.showIncidentForm.set(true);
  }

  closeForm(): void {
    this.showIncidentForm.set(false);
    this.selectedAccidentId.set(undefined);
  }
}
