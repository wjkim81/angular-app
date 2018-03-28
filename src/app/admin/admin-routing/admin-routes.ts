import { Routes } from '@angular/router';

import { AdminComponent } from '../admin.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { ListHoispitalsComponent } from '../list-hoispitals/list-hoispitals.component';
import { RegisterHospitalComponent } from '../register-hospital/register-hospital.component';

/*
 * https://stackoverflow.com/questions/47329429/using-angular-4-how-i-can-manage-admin-and-web-section-within-single-project
 * https://github.com/ariful19/angularRouting/blob/master/src/app/myrouting.module.ts
 */
export const adminRoutes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'admin/home',
      component: AdminHomeComponent
    },
    {
      path: 'admin/list-hospitals',
      component: ListHoispitalsComponent
    },
    {
      path: 'admin/register-hospital',
      component: RegisterHospitalComponent
    },
    {
      path: '', redirectTo: '/admin/home', pathMatch: 'full'
    }
  ]
}];