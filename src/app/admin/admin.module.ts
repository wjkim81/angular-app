import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing/admin-routing.module';

import { baseURL } from '../shared/baseurl';

import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
//import { FooterComponent } from '../footer/footer.component';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ListHoispitalsComponent } from './list-hoispitals/list-hoispitals.component';
import { RegisterMemberComponent } from './register-member/register-member.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    //FooterComponent,
    AdminHomeComponent,
    RegisterMemberComponent,
    ListHoispitalsComponent
  ],
  providers: [
    { provide: 'BaseURL', useValue: baseURL }
  ]
})
export class AdminModule { }
