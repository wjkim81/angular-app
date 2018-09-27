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
import { PatientInfoComponent } from './register-patient/patient-info/patient-info.component';
import { SpinePrescriptionComponent } from './register-patient/spine-prescription/spine-prescription.component';
import { CommentComponent } from './register-patient/comment/comment.component';
import { BodyMeasurementComponent } from './register-patient/body-measurement/body-measurement.component';
import { CompleteRegisterComponent } from './register-patient/complete-register/complete-register.component';

import { UserInfoComponent } from './user-info/user-info.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { PatientdetailComponent } from './patientdetail/patientdetail.component';

import { CobbAngleComponent } from './cobb-angle/cobb-angle.component';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

import { PatientService } from '../services/patient.service';

import { HighlightDirective } from '../directives/highlight.directive';
//import { AuthService } from '../services/auth.service';
//import { AuthInterceptor, UnauthorizedInterceptor } from '../services/auth.interceptor';



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    // Routing should be the last
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserNavbarComponent,
    FooterComponent,
    UserHomeComponent,
    RegisterPatientComponent,
    PatientInfoComponent,
    SpinePrescriptionComponent,
    CommentComponent,
    BodyMeasurementComponent,
    CompleteRegisterComponent,
    UserInfoComponent,
    UserLoginComponent,
    PatientdetailComponent,
    CobbAngleComponent,
    HighlightDirective,
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
