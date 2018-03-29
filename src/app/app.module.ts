import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';

/*
 * https://ng-bootstrap.github.io/#/home
 * https://auth0.com/blog/real-world-angular-series-part-1/
 */
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    //UserHomeComponent//,
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminModule,
    UserModule
    //NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
