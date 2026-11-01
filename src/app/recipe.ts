import { inject, Service, signal } from '@angular/core';
import { RecipeModel } from './models';
import { HttpClient, httpResource } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map } from 'rxjs';

@Service()
export class Recipe {
  url = 'http://localhost:3001';
  private readonly http = inject(HttpClient);
  readonly searchTerm = signal<string>('');
  protected readonly debouncedTerm = toSignal(
    toObservable(this.searchTerm).pipe(debounceTime(500)),
    { initialValue: '' },
  );
  readonly recipeResource = httpResource<RecipeModel[]>(() => {
    const term = this.debouncedTerm();
    return term ? `${this.url}/recipes?name_contains=${term}` : `${this.url}/recipes`;
  });

  recipeValue = this.recipeResource.value;
  isLoading = this.recipeResource.isLoading;

  addRecipe(recipe: RecipeModel) {
    return this.http.post<RecipeModel>(`${this.url}/recipes`, recipe).subscribe({
      next: () => this.recipeResource.reload(),
    });
  }

  removeRecipe(id: string) {
    return this.http.delete(`${this.url}/recipes/${id}`)
      .subscribe({
        next: () => this.recipeResource.reload(),
      })
  }

}
