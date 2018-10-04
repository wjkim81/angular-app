import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    // public authService: AuthService,
    private inj: Injector,
    public router: Router) {}

  canActivate(): boolean {
    console.log('auth-guard');
    const authservice = this.inj.get(AuthService);
    if (!authservice.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(): boolean {
    console.log('auth-guard children');
    const authservice = this.inj.get(AuthService);
    if (!authservice.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}