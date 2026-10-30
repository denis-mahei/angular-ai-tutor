import { Service, signal } from '@angular/core';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Service()
export class Recipe {
  readonly recipes = signal<RecipeModel[]>(MOCK_RECIPES);

  addRecipe(newRecipe: RecipeModel) {
    this.recipes.update((list) => [...list, newRecipe]);
  }
}
