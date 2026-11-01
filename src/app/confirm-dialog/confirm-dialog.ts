import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { DialogData } from '../models';

@Component({
  imports: [MatDialogContent, MatDialogActions, MatButton, MatDialogClose, MatDialogTitle],
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}
