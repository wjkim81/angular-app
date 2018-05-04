import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Member } from '../shared/member';
import { MEMBERS } from '../shared/members';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class MemberService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }
  
  filterMembers(members: Member[], filter: string[]): Member[] {
    //var filterOption = ['country', 'type', 'subject'];
    var filteredMembers: Member[];
    var filterOption = ['country'];
    
    filteredMembers = members;
    for (var i=0; i < filter.length; i++) {
      filteredMembers.filter((member) => { return filteredMembers[filterOption[i]] === filter[i] });
    }
    return filteredMembers;
  }

  getMembers(): Observable<Member[]> {
    console.log(baseURL);
    return this.http.get(baseURL + 'members')
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getMember(id: string): Observable<Member> {
    console.log('id: ', id);
    return  this.http.get(baseURL + 'members/' + id)
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  registerMember(member: Member) {
    console.log(member);
    return this.http.post(baseURL + 'members/signup', member)
      .catch(error => { return this.processHTTPMsgService.handleError(error); }); 
  }
}