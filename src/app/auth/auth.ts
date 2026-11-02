import { inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';

@Service()
export class Auth {
  private readonly _isLoggedIn = signal(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();
  private readonly router = inject(Router);

  login() {
    this._isLoggedIn.set(true);
  }
  logout() {
    this._isLoggedIn.set(false);
    this.router.navigate(['/recipes']);
  }
}