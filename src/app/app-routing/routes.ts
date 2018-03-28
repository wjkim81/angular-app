import { Routes } from '@angular/router';

import { AdminHomeComponent } from '../admin/admin-home/admin-home.component';
import { ListHoispitalsComponent } from '../admin/list-hoispitals/list-hoispitals.component';
import { RegisterHospitalComponent } from '../admin/register-hospital/register-hospital.component';

/*
 * https://stackoverflow.com/questions/47329429/using-angular-4-how-i-can-manage-admin-and-web-section-within-single-project
 * https://github.com/ariful19/angularRouting/blob/master/src/app/myrouting.module.ts
 */
export const routes: Routes = [
  {path: 'admin', component: AdminHomeComponent},
  {path: 'list-hospitals', component: ListHoispitalsComponent},
  {path: 'register-hospital', component: RegisterHospitalComponent},
  {path: '', redirectTo: '/admin', pathMatch: 'full'}
]