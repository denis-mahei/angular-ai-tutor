import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  imports: [FormsModule, RouterLink, MatInputModule, MatProgressSpinnerModule],
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.html',
})
export class RecipeList {
  recipeService = inject(Recipe);
}
