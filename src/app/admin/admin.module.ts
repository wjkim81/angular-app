import { NgModule } from '@angular/core';

/**
 * Import core and shared module
 * While I am reading the Internet, I misunderstand core and shared modules.
 * It seems they provide similar functions, so it was not neccesary to seperate them.
 * Anyway, I arranged these two modules as following:
 * 
 * core module defines modules and services commonly used in all modules.
 * shared module defines directives, pipes, and components commonly used in all modules.s
 */
import { CoreModule } from '../core-module/core-module.module';
import { SharedModule } from '../shared/shared-module.module';

import { AdminRoutingModule } from './admin-routing/admin-routing.module';

/**
 * Import all components here
 */
import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PatientdetailComponent } from './patientdetail/patientdetail.component';

import { ListMembersComponent } from './list-members/list-members.component';
import { MemberdetailComponent } from './memberdetail/memberdetail.component';
import { RegisterOrganizationComponent } from './register-organization/register-organization.component';
import { RegisterMemberComponent } from './register-member/register-member.component';

/**
 * Import services here used only for AdminnModule
 */
import { OrganizationService } from '../shared/services/organization.service';
import { MemberService } from '../shared/services/member.service';

/** 
 * Import directives here
 */

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    // Routing should be the last
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminHomeComponent,
    RegisterOrganizationComponent,
    RegisterMemberComponent,
    ListMembersComponent,
    PatientdetailComponent,
    MemberdetailComponent,
  ],
  providers: [
    OrganizationService,
    MemberService
  ]
})
export class AdminModule { }
