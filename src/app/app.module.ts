import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';

/*
 * https://ng-bootstrap.github.io/#/home
 * https://auth0.com/blog/real-world-angular-series-part-1/
 */
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';

import { CoreModule } from './core-module/core-module.module';
import { SharedModule } from './shared/shared-module.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

// import { AuthService } from './services/auth.service';
// import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  
  imports: [
    BrowserModule,
    //FormsModule,
    // ReactiveFormsModule,
    UserModule,
    AdminModule,
    CoreModule.forRoot(),
    SharedModule,
    // This is important!!!
    // AppRoutingModule should be the last
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
