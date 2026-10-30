import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeModel } from '../models';
import { Recipe } from '../recipe';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.html',
})
export class RecipeList {
  recipeService = inject(Recipe);
  readonly searchTerm = signal<string>('');

  protected readonly filteredRecipes = computed((): RecipeModel[] => {
    return this.recipeService
      .recipes()
      .filter((recipe) => recipe.name.toLowerCase().includes(this.searchTerm().toLowerCase()));
  });
}
