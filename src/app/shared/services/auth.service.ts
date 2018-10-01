import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { baseURL } from '../models/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { AuthResponse, JWTResponse } from '../models/response';

/*
interface AuthResponse {
  status: string,
  success: string,
  token: string
};


interface JWTResponse {
  status: string,
  success: string,
  member: any
};
*/

@Injectable()
export class AuthService {

  tokenKey: string = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { 
  }
  
  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'auth/checkJWTtoken')
    .subscribe(res => {
      console.log("JWT Token Valid: ", res);
      this.sendUsername(res.member.username);
    },
    err => {
      console.log("JWT Token invalid: ", err);
      this.destroyUserCredentials();
    })
  }

  validateJWTtoken(): Observable<JWTResponse> {
    console.log('validateJWTtoken');
    return this.http.get<JWTResponse>(baseURL + 'auth/checkJWTtoken')
    .pipe(
      map(res => {
        console.log("JWT Token Valid: ", res);
        this.sendUsername(res.member.username);
        return res;
      }),
      catchError(this.processHTTPMsgService.handleError)
    );
    // .map(res => {
    //   console.log("JWT Token Valid: ", res);
    //   this.sendUsername(res.member.username);
    //   return res;
    // })
    // .catch(err => {
    //   console.log("JWT Token invalid: ", err);
    //   this.destroyUserCredentials();
    //   return this.processHTTPMsgService.handleError(err);
    // });
  }
 
  sendUsername(name: string) {
    this.username.next(name);
  }

  clearUsername() {
    this.username.next(undefined);
  }

  loadUserCredentials() {
    var credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    console.log("loadUserCredentials ", credentials);
    if (credentials && credentials.username != undefined) {
      this.useCredentials(credentials);
      if (this.authToken)
        this.checkJWTtoken();
    }
  }

  validateUserCredentials(callback) {
    var credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    console.log("validateUserCredentials ", credentials);
    if (credentials && credentials.username != undefined) {
      this.useCredentials(credentials);
      //console.log('authToken: ', this.authToken);
      if (this.authToken) {
        this.validateJWTtoken()
        .subscribe((res) => {
          callback(res, null);
        }, (errMess) => {
          callback(null, errMess);
        });
      }
    } else {
      //console.log('No credentials log');
      callback(null, 'No credentials');
    }
  }

  storeUserCredentials(credentials: any) {
    console.log("storeUserCredentials ", credentials);
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
    console.log('useCredentials authToken: ', this.authToken);
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  signUp() {

  }

  logIn(member: any): Observable<any> {
    console.log('POST ' + baseURL + 'auth/login');
    console.log('username: ' + member.username + ', password: ', member.password);
    return this.http.post<AuthResponse>(baseURL + 'auth/login', 
      {"username": member.username, "password": member.password})
      .pipe(
        map(res => {
          console.log(res)
            this.storeUserCredentials({username: member.username, token: res.token});
            return {'success': true, 'username': member.username };
        }),
        catchError(this.processHTTPMsgService.handleError)
      // .map(res => {
      //   console.log(res)
      //     this.storeUserCredentials({username: member.username, token: res.token});
      //     return {'success': true, 'username': member.username };
      // })
      // .catch(error => { return this.processHTTPMsgService.handleError(error); }
      );
  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getToken(): string {
    var credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    var authToken: string;
    if (credentials)
       authToken = credentials.token;
    else
      authToken = undefined;
      
    console.log('getToken: ', authToken);
    return authToken;
    //return this.authToken;
  }
}
