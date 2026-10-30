import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from '../models';
import { Recipe } from '../recipe';

@Component({
  imports: [],
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.html',
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  readonly recipesService = inject(Recipe);
  protected readonly recipeId = computed<string | null>(() =>
    this.route.snapshot.paramMap.get('id'),
  );
  readonly recipe = computed<RecipeModel | undefined>(() => {
    return this.recipesService.recipes().find((recipe) => recipe.id === this.recipeId());
  });
  protected readonly servings = signal<number>(1);

  protected increase() {
    this.servings.update((s) => s + 1);
  }
  protected decrease() {
    if (this.servings() > 1) {
      this.servings.update((s) => s - 1);
    }
  }
  protected readonly adjustedIngredients = computed(() =>
    this.recipe()?.ingredients.map((i) => ({
      ...i,
      quantity: i.quantity * this.servings(),
    })),
  );
}
