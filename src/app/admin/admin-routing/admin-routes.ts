import { Routes } from '@angular/router';

import { AdminComponent } from '../admin.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { PatientdetailComponent } from '../patientdetail/patientdetail.component';
import { ListMembersComponent } from '../list-members/list-members.component';
import { MemberdetailComponent } from '../memberdetail/memberdetail.component';
import { RegistersComponent } from '../registers/registers.component';
import { RegisterOrganizationComponent } from '../registers/register-organization/register-organization.component';
import { RegisterMemberComponent } from '../registers/register-member/register-member.component';

import { AdminAuthGuardService as AdminAuthGuard } from '../../shared/services/admin-auth-guard.service';

export const adminRoutes: Routes = [{
  path: '',
  component: AdminComponent,
  canActivateChild: [AdminAuthGuard],
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
      path: 'admin/registers',
      component: RegistersComponent
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