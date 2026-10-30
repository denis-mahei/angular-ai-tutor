import { inject, Service, signal } from '@angular/core';
import { RecipeModel } from './models';
import { HttpClient } from '@angular/common/http';

@Service()
export class Recipe {
  private readonly http = inject(HttpClient)
   readonly recipes = signal<RecipeModel[]>([])
  url  = 'http://localhost:3001'

  fetchRecipes(): void{
    this.http.get<RecipeModel[]>(`${this.url}/recipes`).subscribe({
      next: data => this.recipes.set(data),
      error: error => console.log('Error response',error)
    })
  }

  addRecipe(newRecipe: RecipeModel) {
    this.recipes.update((list) => [...list, newRecipe]);
  }
}
