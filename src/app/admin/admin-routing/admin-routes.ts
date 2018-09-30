import { Routes } from '@angular/router';

import { AdminComponent } from '../admin.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { ListMembersComponent } from '../list-members/list-members.component';
import { RegisterOrganizationComponent } from '../register-organization/register-organization.component';
import { RegisterMemberComponent } from '../register-member/register-member.component';
import { PatientdetailComponent } from '../patientdetail/patientdetail.component';
import { MemberdetailComponent } from '../memberdetail/memberdetail.component';

import { AdminTestComponent } from '../admin-test/admin-test.component';

export const adminRoutes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'admin/home',
      component: AdminHomeComponent
    },
    // {
    //   path: 'admin/test',
    //   component: AdminHomeComponent
    // },
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
      path: 'admin/patients/:id',
      component: PatientdetailComponent
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