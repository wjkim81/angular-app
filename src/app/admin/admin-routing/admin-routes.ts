import { Routes } from '@angular/router';

import { AdminComponent } from '../admin.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { ListHoispitalsComponent } from '../list-hoispitals/list-hoispitals.component';
import { RegisterMemberComponent } from '../register-member/register-member.component';

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
      path: 'admin/register-member',
      component: RegisterMemberComponent
    },
    {
      path: '', redirectTo: '/admin/home', pathMatch: 'full'
    }
  ]
}];