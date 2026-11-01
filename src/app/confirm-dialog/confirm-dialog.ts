import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatDialogContent, MatDialogActions, MatButton, MatDialogClose],
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {}
