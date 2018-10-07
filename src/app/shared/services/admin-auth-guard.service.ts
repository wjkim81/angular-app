import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    // public authService: AuthService,
    private inj: Injector,
    public router: Router) {}

  canActivate(): boolean {
    console.log('admin-auth-guard');
    const authservice = this.inj.get(AuthService);
    if (!authservice.isTokenExpired() && authservice.checkAdmin()) {
      return true;
    }

    if (!authservice.isTokenExpired()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }

  canActivateChild(): boolean {
    console.log('admin-auth-guard children');
    const authservice = this.inj.get(AuthService);
    if (!authservice.isTokenExpired() && authservice.checkAdmin()) {
      return true;
    }

    if (!authservice.isTokenExpired()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
    
    return false;
  }
}
