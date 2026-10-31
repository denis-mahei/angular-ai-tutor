import { Component, inject, signal } from '@angular/core';
import { Recipe } from '../recipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { email, form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { Ingredient } from '../models';

@Component({
  imports: [MatButtonModule, MatInputModule, FormField],
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.html',
})
export class AddRecipe {
  protected readonly model = signal({
    name: '',
    description: '',
    authorEmail: '',
    ingredients: [] as Ingredient[],
  });
  protected readonly addRecipeForm = form(this.model, (schemaPath) => {
    required(schemaPath.name, { message: 'Please enter a name.' });
    minLength(schemaPath.name, 3, { message: 'Name must be at least 3 letters.' });
    required(schemaPath.description, { message: 'Please enter a description.' });
    maxLength(schemaPath.description, 30, {
      message: 'Maximum length must be' + ' maximum 50 characters.',
    });
    required(schemaPath.authorEmail, { message: 'Please enter an email.' });
    email(schemaPath.authorEmail, { message: 'Please enter a valid email.' });
  });
  readonly recipeService = inject(Recipe);

  addIngredient(ingredient: Ingredient) {
    this.model.update(current => ({
      ...current,
      ingredients: [...current.ingredients, ingredient],
    }))
  }

  removeIngredient(idx: number) {
    this.model.update((current) => ({
      ...current,
      ingredients: current.ingredients.filter((_,i) => i !== idx)
    }))
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const formValues = this.addRecipeForm().value();
    const id = crypto.randomUUID();
    this.recipeService.addRecipe({
      id,
      ...formValues,
      imgUrl: 'image',
      isFavorite: true,
      ingredients: [],
    });
    this.addRecipeForm().reset();
    // this.model.set({ name: '', description: '', authorEmail: '' });
  }
}
