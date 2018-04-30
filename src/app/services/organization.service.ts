import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Organization } from '../shared/organization';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class OrganizationService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getOrganizations(): Observable<Organization[]> {
    console.log(baseURL);
    return this.http.get(baseURL + 'organizations')
      .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  getOrganization(id: string): Observable<Organization> {
    console.log('id: ', id);
    return this.http.get(baseURL + 'organizations/'+ id)
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  postOrganization(organization: Organization) {
    console.log('POST ', organization);
    return this.http.post(baseURL + 'organizations/', organization)
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
}
