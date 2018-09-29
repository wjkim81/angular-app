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

import { CoreModule } from './core-module/core-module.module';
import { SharedModule } from './shared-module/shared-module.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

// import { AuthService } from './services/auth.service';
// import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModuleComponent } from './module/module.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,

    //FormsModule,
    ReactiveFormsModule,
    UserModule,
    AdminModule,
    CoreModule.forRoot(),
    SharedModule,
    // This is important!!!
    // AppRoutingModule should be the last
    AppRoutingModule
  ],
  providers: [
    /*
    AuthService,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
