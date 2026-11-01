import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage
} from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { DialogData } from '../models';

@Component({
  imports: [
    FormsModule,
    MatIconModule,
    RouterLink,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
  ],
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.html',
})
export class RecipeList {
  readonly recipeService = inject(Recipe);
  readonly dialog = inject(MatDialog);

  openDialog(id: string, name: string) {
    const dialogRef = this.dialog.open<ConfirmDialog, DialogData>(ConfirmDialog, {
      data: { name },
    });
    dialogRef.afterClosed().subscribe(agree => {
      if (agree) {
        this.recipeService.removeRecipe(id)
      }
    })
  }
}
