import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';

import { Member } from '../models/member';

import { baseURL } from '../models/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable()
export class MemberService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }
  
  getMembers(): Observable<Member[]> {
    console.log(baseURL);
    return this.http.get<Member[]>(baseURL + 'members')
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
      // .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getMemberWithoutId(): Observable<Member> {
    return  this.http.get<Member>(baseURL + 'member')
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
  }

  getMember(id: string): Observable<Member> {
    console.log('id: ', id);
    return  this.http.get<Member>(baseURL + 'members/' + id)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
      // .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  registerMember(member: Member): Observable<any> {
    console.log(member);
    return this.http.post<any>(baseURL + 'auth/signup', member)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
      // .catch(error => { return this.processHTTPMsgService.handleError(error); }); 
  }

  getMemberInfo(): Observable<Member> {
    return this.http.get<Member>(baseURL + 'member')
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
  }
}