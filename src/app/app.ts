import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddRecipe } from './add-recipe/add-recipe';

@Component({
  imports: [RouterOutlet, AddRecipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Smart Recipe Box');
}
