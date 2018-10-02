import { Routes } from '@angular/router';

import { AdminComponent } from '../admin.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { PatientdetailComponent } from '../patientdetail/patientdetail.component';
import { ListMembersComponent } from '../list-members/list-members.component';
import { MemberdetailComponent } from '../memberdetail/memberdetail.component';
import { RegisterOrganizationComponent } from '../register-organization/register-organization.component';
import { RegisterMemberComponent } from '../register-member/register-member.component';

import { AuthGuardService as AuthGuard } from '../../shared/services/auth-guard.service';

export const adminRoutes: Routes = [{
  path: '',
  component: AdminComponent,
  canActivateChild: [AuthGuard],
  children: [
    {
      path: 'admin/home',
      component: AdminHomeComponent
    },
    {
      path: 'admin/patients/:id',
      component: PatientdetailComponent
    },
    {
      path: 'admin/list-members',
      component: ListMembersComponent
    },
    {
      path: 'admin/register-organization',
      component: RegisterOrganizationComponent
    },
    {
      path: 'admin/register-member',
      component: RegisterMemberComponent
    },

    {
      path: 'admin/members/:id',
      component: MemberdetailComponent
    },
    {
      path: 'admin', redirectTo: '/admin/home', pathMatch: 'full'
    }
  ]
}];