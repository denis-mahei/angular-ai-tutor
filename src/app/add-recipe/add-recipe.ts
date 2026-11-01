import { Component, inject, signal } from '@angular/core';
import { Recipe } from '../recipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import {
  applyEach,
  email,
  form,
  FormField,
  maxLength,
  min,
  minLength,
  required,
} from '@angular/forms/signals';
import { Ingredient, RecipeModel, UNITS } from '../models';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  imports: [MatButtonModule, MatInputModule, FormField, MatIconModule, MatSelect, MatOption],
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.html',
})
export class AddRecipe {
  protected readonly initialFields = {
    name: '',
    description: '',
    authorEmail: '',
    imgUrl: '',
    ingredients: [] as Ingredient[],
  };
  protected readonly model = signal(this.initialFields);
  protected readonly UNITS = UNITS;
  protected readonly addRecipeForm = form(this.model, (schemaPath) => {
    required(schemaPath.name, { message: 'Please enter a name.' });
    minLength(schemaPath.name, 3, { message: 'Name must be at least 3 letters.' });
    required(schemaPath.description, { message: 'Please enter a description.' });
    maxLength(schemaPath.description, 30, {
      message: 'Maximum length must be' + ' maximum 50 characters.',
    });
    required(schemaPath.authorEmail, { message: 'Please enter an email.' });
    email(schemaPath.authorEmail, { message: 'Please enter a valid email.' });
    applyEach(schemaPath.ingredients, (items) => {
      min(items.quantity, 0.1, { message: 'Quantity must be minimum 0.1' });
    });
  });

  readonly recipeService = inject(Recipe);

  addIngredient(ingredient: Ingredient) {
    this.model.update((current) => ({
      ...current,
      ingredients: [...current.ingredients, ingredient],
    }));
  }

  removeIngredient(idx: number) {
    this.model.update((current) => ({
      ...current,
      ingredients: current.ingredients.filter((_, i) => i !== idx),
    }));
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const id = crypto.randomUUID();
    const formValues = this.addRecipeForm().value();
    this.recipeService.addRecipe({
      id,
      ...formValues,
      isFavorite: true,
    });
    this.addRecipeForm().reset(this.initialFields);
  }
}
