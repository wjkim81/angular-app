import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private inj: Injector
    ) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor');
    const authservice = this.inj.get(AuthService);
    // Get the auth header from the service.
    //console.log('authToken: ', authservice.authToken);
    const authToken = authservice.getToken();

    //console.log("Interceptor: " + authToken);
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', 'bearer ' + authToken)});
    
    // Pass on the cloned request instead of the original request.
    console.log('authReq: ');
    console.log(authReq);
    return next.handle(authReq);
  }
}

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('UnauthorizedInterceptor');
    const authservice = this.inj.get(AuthService);
    const authToken = authservice.getToken();
    
    return next
      .handle(req)
      .do((event: HttpEvent<any>) => {
        // do nothing
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && authToken) {
            console.log("Unauthorized Interceptor: ", err);
            authservice.checkJWTtoken();
          }
        }
      });
  }
}