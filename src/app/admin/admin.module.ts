import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { AdminRoutingModule } from './admin-routing/admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
//import { FooterComponent } from '../footer/footer.component';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ListMembersComponent } from './list-members/list-members.component';
import { MemberdetailComponent } from './memberdetail/memberdetail.component';
import { RegisterOrganizationComponent } from './register-organization/register-organization.component';
import { RegisterMemberComponent } from './register-member/register-member.component';
import { PatientdetailComponent } from './patientdetail/patientdetail.component';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

import { OrganizationService } from '../services/organization.service';
import { MemberService } from '../services/member.service';
import { PatientService } from '../services/patient.service';
import { AdminTestComponent } from './admin-test/admin-test.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Routing should be the last
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    //FooterComponent,
    AdminHomeComponent,
    RegisterOrganizationComponent,
    RegisterMemberComponent,
    ListMembersComponent,
    PatientdetailComponent,
    MemberdetailComponent,
    AdminTestComponent
  ],
  providers: [
    HttpClientModule,
    { provide: 'BaseURL', useValue: baseURL },
    ProcessHTTPMsgService,
    OrganizationService,
    MemberService,
    PatientService
  ]
})
export class AdminModule { }
