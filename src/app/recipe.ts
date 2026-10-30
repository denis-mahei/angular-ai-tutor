import { inject, Service, signal } from '@angular/core';
import { RecipeModel } from './models';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Service()
export class Recipe {
  private readonly http = inject(HttpClient);
  readonly recipes = signal<RecipeModel[]>([]);
  url = 'http://localhost:3001';

  fetchRecipes(): void {
    this.http
      .get<RecipeModel[]>(`${this.url}/recipes`)
      .pipe(
        map((recipes) => [...recipes].sort((a, b) => a.name.localeCompare(b.name))),
        catchError((error): Observable<[] | never> => {
          console.log('Failed to load recipes:', error.message);
          return of([]);
        }),
      )
      .subscribe({
        next: (data) => this.recipes.set(data),
      });
  }

  searchRecipes(term: string) {
    return this.http.get<RecipeModel[]>(`${this.url}/recipes?name_contains=${term}`);
  }

  addRecipe(newRecipe: RecipeModel) {
    this.recipes.update((list) => [...list, newRecipe]);
  }
}
