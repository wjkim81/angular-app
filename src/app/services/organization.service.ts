import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Organization } from '../shared/organization';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable()
export class OrganizationService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getOrganizations(): Observable<Organization[]> {
    console.log(baseURL);
    return this.http.get<Organization[]>(baseURL + 'organizations')
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
      // .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  getOrganization(id: string): Observable<Organization> {
    console.log('id: ', id);
    return this.http.get<Organization>(baseURL + 'organizations/'+ id)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
      // .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  postOrganization(organization: Organization): Observable<Organization> {
    console.log('POST ', organization);
    return this.http.post<Organization>(baseURL + 'organizations/', organization)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
      // .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
}
