import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing/user-routing.module';

import { UserComponent } from './user.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { FooterComponent } from './footer/footer.component';

import { UserHomeComponent } from './user-home/user-home.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserNavbarComponent,
    FooterComponent,
    UserHomeComponent,
    RegisterPatientComponent,
    UserInfoComponent
  ]
})
export class UserModule { }
