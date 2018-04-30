import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Patient } from '../shared/patient';
import { PATIENTS } from '../shared/patients';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class PatientService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getPatients(): Observable<Patient[]> {
    console.log(baseURL);
    return this.http.get(baseURL + 'patients')
    .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  getPatient(id: string): Observable<Patient> {
    console.log('id: ', id);
    return  this.http.get(baseURL + 'patients/'+ id)
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  postPatient(patient: Patient) {
    console.log(patient);
    return this.http.post(baseURL + 'patient/', patient)
      .catch(error => { return this.processHTTPMsgService.handleError(error); }); 
  }
}
