import { ChangeDetectionStrategy, Component, inject, input, effect, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AccidentService } from '../../../services/accident.service';
import { WorkerService } from '../../../services/worker.service';
import { SourceService } from '../../../services/source.service';
import { forkJoin, map, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-accident-form',
  imports: [ReactiveFormsModule],
  templateUrl: './accident-form.html',
  styleUrl: './accident-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccidentForm {
  private fb = inject(FormBuilder);
  private accidentService = inject(AccidentService);
  private workerService = inject(WorkerService);
  private sourceService = inject(SourceService);

  accidentId = input<string | undefined>(undefined);
  formClosing = output();

  closeForm() {
    this.formClosing.emit();
  }

  accidentForm = this.fb.group({
    accidentDate: ['', Validators.required],
    dni: ['', Validators.required],
    phone: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    category: ['', Validators.required],
    serviceUnit: ['', Validators.required],
    isImmuneVhb: [false],
    observations: [''],
    workerSerology: this.fb.group({
      vih: this.fb.group({ checked: [false], result: ['pending'] }),
      vhb: this.fb.group({ checked: [false], result: ['pending'] }),
      vhc: this.fb.group({ checked: [false], result: ['pending'] }),
    }),
    sourceType: ['unknown'],
    sourceSerology: this.fb.group({
      vih: this.fb.group({ checked: [false], result: ['pending'] }),
      vhb: this.fb.group({ checked: [false], result: ['pending'] }),
      vhc: this.fb.group({ checked: [false], result: ['pending'] }),
    }),
  });

  constructor() {
    effect(() => {
      const id = this.accidentId();
      if (!id) return;

      this.loadAccident(id);
    });
  }

  private loadAccident(id: string) {
    this.accidentService.getById(id).pipe(
      switchMap(accident => {
        if (!accident) throw new Error('No accident');

        return forkJoin({
          accident: of(accident),
          worker: this.workerService.getById(accident.workerId),
          source: accident.sourceId
            ? this.sourceService.getById(accident.sourceId)
            : of(null)
        });
      }),
      take(1)
    ).subscribe(({ accident, worker, source }) => {
      this.accidentForm.patchValue({
        accidentDate: accident.accidentDate,
        dni: worker.dni,
        phone: worker.phone,
        name: worker.name,
        lastName: worker.lastName,
        category: worker.category,
        serviceUnit: worker.serviceUnit,
        isImmuneVhb: worker.isImmuneVhb,
        observations: accident.observations,

        workerSerology: {
          vih: { checked: accident.workerSerology.vih !== 'pending', result: accident.workerSerology.vih === 'pending' ? 'pending' : accident.workerSerology.vih },
          vhb: { checked: accident.workerSerology.vhb !== 'pending', result: accident.workerSerology.vhb === 'pending' ? 'pending' : accident.workerSerology.vhb },
          vhc: { checked: accident.workerSerology.vhc !== 'pending', result: accident.workerSerology.vhc === 'pending' ? 'pending' : accident.workerSerology.vhc },
        },

        sourceType: source ? 'known' : 'unknown',

        sourceSerology: source
          ? {
              vih: { checked: source.serology.vih !== 'pending', result: source.serology.vih === 'pending' ? 'pending' : source.serology.vih },
              vhb: { checked: source.serology.vhb !== 'pending', result: source.serology.vhb === 'pending' ? 'pending' : source.serology.vhb },
              vhc: { checked: source.serology.vhc !== 'pending', result: source.serology.vhc === 'pending' ? 'pending' : source.serology.vhc },
            }
          : {
              vih: { checked: false, result: 'positive' },
              vhb: { checked: false, result: 'positive' },
              vhc: { checked: false, result: 'positive' },
            }
      });
    });
  }

  saveForm() {
    if (this.accidentForm.invalid) return;
    console.log(this.accidentForm.value);
  }
}
