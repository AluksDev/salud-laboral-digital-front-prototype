import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-source-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule],
  templateUrl: './source-form.html',
  styleUrl: './source-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceForm {
  sourceFormGroup = input.required<FormGroup>();
  sourceIndex = input.required<number>();
}
