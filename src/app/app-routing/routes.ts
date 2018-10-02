import { Routes, CanActivate } from '@angular/router';

import { LoginComponent } from '../login/login.component';

import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';

import { AuthGuardService as AuthGuard } from '../shared/services/auth-guard.service';
/**
 * https://stackoverflow.com/questions/47329429/using-angular-4-how-i-can-manage-admin-and-web-section-within-single-project
 * https://github.com/ariful19/angularRouting/blob/master/src/app/myrouting.module.ts
 * 
 * https://stackoverflow.com/questions/50243534/angular6-feature-module-lazy-loading-throwing-error-typeerror-undefined-is-not
 * 
 */

/**
 * angular-cli higher than 1.7.0 has a problem with loadChildren when lazy load!
 * https://github.com/angular/angular-cli/issues/9488
 * Set angular-cli version as 1.6.8
 */
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    loadChildren: 'app/user/user.module#UserModule',
    canActivate: [AuthGuard]
    // loadChildren:() => UserModule
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
    // loadChildren:() => AdminModule
  },
]