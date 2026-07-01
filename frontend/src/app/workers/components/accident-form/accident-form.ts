import { ChangeDetectionStrategy, Component, inject, input, effect, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccidentService } from '../../../services/accident.service';
import { WorkerService } from '../../../services/worker.service';
import { SourceService } from '../../../services/source.service';
import { forkJoin, map, Observable, of, switchMap, take } from 'rxjs';
import { SourceForm } from '../source-form/source-form';
import { Worker } from '../../../models/worker.model';
import { Source } from '../../../models/source.model';

@Component({
  selector: 'app-accident-form',
  imports: [ReactiveFormsModule, SourceForm],
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

  selectedFileName = '';

  get sources(): FormArray<FormGroup> {
    return this.accidentForm.get('sources') as FormArray<FormGroup>;
  }

  get sourceGroups(): FormGroup[] {
    return this.sources.controls as FormGroup[];
  }

  closeForm() {
    this.formClosing.emit();
  }

  accidentForm = this.fb.nonNullable.group({
    accidentDate: ['', Validators.required],
    dni: ['', Validators.required],
    phone: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    category: ['', Validators.required],
    serviceUnit: ['', Validators.required],
    isImmuneVhb: [false],
    workerConsent: ['', Validators.required],
    observations: [''],
    workerSerology: this.fb.group({
      vih: this.fb.group({ checked: [false], result: ['pending'] }),
      vhb: this.fb.group({ checked: [false], result: ['pending'] }),
      vhc: this.fb.group({ checked: [false], result: ['pending'] }),
    }),
    sources: this.fb.array<FormGroup>([this.createSourceGroup()]),
    documentFile: new FormControl<File | null>(null),
  });

  private createSourceGroup(id?: string): FormGroup {
    return this.fb.group({
      id: [id ?? ''],
      type: ['unknown'],
      anNumber: [''],
      consent: ['none'],
      observations: [''],
      serology: this.fb.group({
        vih: this.fb.group({ checked: [false], result: ['pending'] }),
        vhb: this.fb.group({ checked: [false], result: ['pending'] }),
        vhc: this.fb.group({ checked: [false], result: ['pending'] }),
      }),
    });
  }

  addSource() {
    if (this.sources.length < 2) {
      this.sources.push(this.createSourceGroup());
    }
  }

  removeSource(index: number) {
    if (this.sources.length > 1) {
      this.sources.removeAt(index);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.accidentForm.get('documentFile')?.setValue(file);
    }
  }

  removeFile() {
    this.selectedFileName = '';
    this.accidentForm.get('documentFile')?.setValue(null);
  }

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
          sources: accident.sourceIds.length
            ? forkJoin(accident.sourceIds.map(sid => this.sourceService.getById(sid)))
            : of([])
        });
      }),
      take(1)
    ).subscribe(({ accident, worker, sources }) => {
      const mapSerology = (s: { vih: string; vhb: string; vhc: string }) => ({
        vih: { checked: s.vih !== 'pending', result: s.vih === 'pending' ? 'pending' : s.vih },
        vhb: { checked: s.vhb !== 'pending', result: s.vhb === 'pending' ? 'pending' : s.vhb },
        vhc: { checked: s.vhc !== 'pending', result: s.vhc === 'pending' ? 'pending' : s.vhc },
      });

      while (this.sources.length) {
        this.sources.removeAt(0);
      }

      const sourceList = sources.filter((s): s is NonNullable<typeof s> => s != null);
      sourceList.forEach(source => {
        const group = this.createSourceGroup(source.id);
        group.patchValue({
          id: source.id,
          type: source.type || 'known',
          anNumber: source.anNumber || '',
          consent: source.consent || 'none',
          observations: source.observations || '',
          serology: mapSerology(source.serology),
        });
        this.sources.push(group);
      });

      if (!this.sources.length) {
        this.sources.push(this.createSourceGroup());
      }

      this.accidentForm.patchValue({
        accidentDate: accident.accidentDate,
        dni: worker.dni,
        phone: worker.phone,
        name: worker.name,
        lastName: worker.lastName,
        category: worker.category,
        serviceUnit: worker.serviceUnit,
        isImmuneVhb: worker.isImmuneVhb,
        workerConsent: accident.workerConsent ? 'yes' : 'no',
        observations: accident.observations,
        workerSerology: mapSerology(accident.workerSerology),
      });
    });
  }

  saveForm() {
    if (this.accidentForm.invalid) return;
    const formData = this.accidentForm.getRawValue();
    const worker: Omit<Worker, 'id'> = {
      dni: formData.dni,
      name: formData.name,
      lastName: formData.lastName,
      phone: formData.phone,
      category: formData.category,
      serviceUnit: formData.serviceUnit,
      isImmuneVhb: formData.isImmuneVhb
    }
    const workerId$ = this.workerService.getByDniorCreate(worker);
    const sources$: Observable<string>[] = [];
    for (let source of formData.sources) {
      if (source['id']) {
        sources$.push(of(source['id'] as string));
      } else {
        const source$ = this.sourceService.createSource(source as Omit<Source, 'id'>).pipe(
          map(newSource => newSource.id)
        );
        sources$.push(source$);
      }
    }
    forkJoin({
      workerId: workerId$,
      sourceIds: forkJoin(sources$)
    }).subscribe(({ workerId, sourceIds }) => {
      console.log("worker id: ", workerId);
      console.log("sources ids: ", sourceIds);
      // both are guaranteed complete here — now build the Accident
    });
    console.log(formData)
  }
}
