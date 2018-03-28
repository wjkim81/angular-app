import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
//import { FooterComponent } from '../footer/footer.component';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ListHoispitalsComponent } from './list-hoispitals/list-hoispitals.component';
import { RegisterHospitalComponent } from './register-hospital/register-hospital.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    //FooterComponent,
    AdminHomeComponent,
    RegisterHospitalComponent,
    ListHoispitalsComponent
  ]
})
export class AdminModule { }
