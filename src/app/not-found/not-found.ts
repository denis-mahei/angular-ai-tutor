import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-not-found',
  templateUrl: './not-found.html',
})
export class NotFound implements OnInit {
  protected readonly error: string = 'Sorry! Page not found...';
  protected readonly router = inject(Router);
  private timerId?: ReturnType<typeof setTimeout>;

   ngOnInit(): void {
   this.timerId = setTimeout(() => {
      this.router.navigate(['/recipes']);
    }, 2000);
  }
  ngOnDestroy(): void {
     clearTimeout(this.timerId)
  }
}
