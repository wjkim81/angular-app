import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { UserRoutingModule } from './user-routing/user-routing.module';

import { UserComponent } from './user.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { FooterComponent } from './footer/footer.component';

import { UserHomeComponent } from './user-home/user-home.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { PatientdetailComponent } from './patientdetail/patientdetail.component';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

import { PatientService } from '../services/patient.service';

//import { AuthService } from '../services/auth.service';
//import { AuthInterceptor, UnauthorizedInterceptor } from '../services/auth.interceptor';



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserNavbarComponent,
    FooterComponent,
    UserHomeComponent,
    RegisterPatientComponent,
    UserInfoComponent,
    UserLoginComponent,
    PatientdetailComponent
  ],
  providers: [
    HttpClientModule,
    { provide: 'BaseURL', useValue: baseURL },
    ProcessHTTPMsgService,
    PatientService,
    //AuthService,
    /*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
    */
  ]
})
export class UserModule { }
