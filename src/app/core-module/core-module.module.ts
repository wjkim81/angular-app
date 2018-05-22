import { NgModule, ModuleWithProviders, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../services/auth.service';
import { AuthInterceptor, UnauthorizedInterceptor } from '../services/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule
  ],
  declarations: []
  ,
  providers: [
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
      ]
    };
  }
}