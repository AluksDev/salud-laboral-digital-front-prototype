import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-critical-alert',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './critical-alert.html',
  styleUrl: './critical-alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CriticalAlert {
  private dialogRef = inject(MatDialogRef<CriticalAlert>);

  close() {
    this.dialogRef.close();
  }
}
