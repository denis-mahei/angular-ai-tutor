import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeList
  },
  {
    path: 'recipes/:id',
    component: RecipeDetail
  },
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFound
  }
];
