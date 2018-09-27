import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';

/**
 * https://stackoverflow.com/questions/47329429/using-angular-4-how-i-can-manage-admin-and-web-section-within-single-project
 * https://github.com/ariful19/angularRouting/blob/master/src/app/myrouting.module.ts
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
    loadChildren: 'app/user/user.module#UserModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },

  //{path: 'admin', component: AdminHomeComponent},
  //{path: 'list-hospitals', component: ListHoispitalsComponent},
  //{path: 'register-hospital', component: RegisterHospitalComponent},
  //{path: '', redirectTo: '/admin', pathMatch: 'full'}
]