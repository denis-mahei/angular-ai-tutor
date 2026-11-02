import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { NotFound } from './not-found/not-found';
import { AddRecipe } from './add-recipe/add-recipe';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeList,
  },
  {
    path: 'recipes/new',
    component: AddRecipe,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes/:id',
    component: RecipeDetail,
  },
  {
    path: '**',
    component: NotFound,
  },
];
