import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'hammerjs';

/*
 * https://ng-bootstrap.github.io/#/home
 * https://auth0.com/blog/real-world-angular-series-part-1/
 */
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
//import { NavbarComponent } from './navbar/navbar.component';
//import { FooterComponent } from './footer/footer.component';

import { AdminModule } from './admin/admin.module';
//import { UserHomeComponent } from './user/user-home/user-home.component';


@NgModule({
  declarations: [
    AppComponent,
    //UserHomeComponent//,
    //NavbarComponent,
    //FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule//,
    //NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
