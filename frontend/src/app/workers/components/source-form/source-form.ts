import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-source-form',
  imports: [ReactiveFormsModule],
  templateUrl: './source-form.html',
  styleUrl: './source-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceForm {
  sourceFormGroup = input.required<FormGroup>();
  sourceIndex = input.required<number>();
}
