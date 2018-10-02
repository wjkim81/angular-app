import { NgModule, ModuleWithProviders, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PatientService } from '../shared/services/patient.service';
import { AuthService } from '../shared/services/auth.service';
import { AuthInterceptor, UnauthorizedInterceptor } from '../shared/services/auth.interceptor';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { ProcessHTTPMsgService } from '../shared/services/process-httpmsg.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule
  ],
  declarations: []
  ,
  providers: [
    ProcessHTTPMsgService,
    AuthService,
    AuthGuardService,
    PatientService,
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
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      //console.log('There is a parentModule already');
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    } //else {
      //console.log('CoreModule instance is being created');
    //}
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ProcessHTTPMsgService,
        AuthService,
        AuthGuardService,
        PatientService,
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
      ]
    };
  }
}