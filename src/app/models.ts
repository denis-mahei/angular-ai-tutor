export const UNITS = [
  'g',
  'each',
  'tsp',
  'ml'
] as const;
export type Unit = typeof UNITS[number];
export interface Ingredient {
  name: string;
  quantity: number;
  unit: Unit
}

export interface RecipeModel {
  id: string;
  name: string;
  description: string;
  authorEmail: string;
  imgUrl: string;
  isFavorite: boolean;
  ingredients: Ingredient[];
}
