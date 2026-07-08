import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CriticalAlert } from '../../../shared/critical-alert/critical-alert';

@Component({
  selector: 'app-source-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule],
  templateUrl: './source-form.html',
  styleUrl: './source-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceForm {
  private dialog = inject(MatDialog);

  sourceFormGroup = input.required<FormGroup>();
  sourceIndex = input.required<number>();
  isImmuneVhb = input<boolean>(false);

  showArn = signal(false);
  showVihSubFields = signal(false);
  showSuperficie = signal(false);
  showVihAlert = signal(false);

  constructor() {
    effect(() => {
      this.sourceFormGroup();
      this.initFromForm();
    });
  }

  private initFromForm() {
    const group = this.sourceFormGroup();
    if (!group) return;
    this.showArn.set(group.get('serology.vhc')?.value === 'positive');
    this.showVihSubFields.set(group.get('serology.vih')?.value === 'positive');
    this.showSuperficie.set(group.get('serology.vhbCore')?.value === 'positive');
    this.showVihAlert.set(
      this.showVihSubFields() && group.get('serology.cargaViral')?.value === 'positive'
    );
  }

  valueChange(event: MatSelectChange) {
    const controlName = event.source.ngControl?.name as string;
    const value = event.value;

    switch (controlName) {
      case 'vih':
        this.showVihSubFields.set(value === 'positive');
        if (value !== 'positive') this.showVihAlert.set(false);
        break;
      case 'vhc':
        this.showArn.set(value === 'positive');
        break;
      case 'vhbCore':
        this.showSuperficie.set(value === 'positive');
        break;
      case 'cargaViral':
        this.showVihAlert.set(this.showVihSubFields() && value === 'positive');
        break;
    }
  }

  openCriticalAlert() {
    this.dialog.open(CriticalAlert, {
      disableClose: false,
      width: '500px',
    });
  }
}
