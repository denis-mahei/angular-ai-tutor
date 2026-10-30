import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, switchMap } from 'rxjs';
import { RecipeModel } from '../models';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  imports: [FormsModule, RouterLink, MatInput, MatInputModule],
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.html',
})
export class RecipeList implements OnInit {
  recipeService = inject(Recipe);
  readonly searchTerm = signal<string>('');

  ngOnInit() {
    this.recipeService.fetchRecipes();
  }

  protected readonly searchRecipes = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      switchMap((term) => this.recipeService.searchRecipes(term))),
    { initialValue: [] as RecipeModel[] },
  );
}
