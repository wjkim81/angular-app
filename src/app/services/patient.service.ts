import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BodyMeasurement, SpineInfo, XRayFile, ThreeDFile, Patient } from '../shared/patient';
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

  getPatientsBetween(startDate: String, endDate: String) {
    console.log(baseURL + 'patients?startDate=' + startDate + '&endDate=' + endDate);
    return this.http.get(baseURL + 'patients?startDate=' + startDate + '&endDate=' + endDate)
    .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  getPatient(id: string): Observable<Patient> {
    console.log('id: ', id);
    return  this.http.get(baseURL + 'patients/' + id)
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  postPatient(patient: Patient) {
    //console.log(patient);
    return this.http.post(baseURL + 'patients/', patient)
      .catch(error => { return this.processHTTPMsgService.handleError(error); }); 
  }

  getPatientForAdmin():  Observable<Patient[]> {
    console.log(baseURL);
    return this.http.get(baseURL + 'admins/patients')
    .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  getPatientsBetweenForAdmin(startDate: String, endDate: String) {
    var url = baseURL + 'admins/patients?startDate=' + startDate + '&endDate=' + endDate;
    console.log(url);
    return this.http.get(url)
    .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  postSpineDiag(patientId: string, spineInfo: SpineInfo) {
    //console.log(patient);
    return this.http.post(baseURL + 'patients/' + patientId + '/spineInfos', spineInfo)
      .catch(error => { return this.processHTTPMsgService.handleError(error); }); 
  }
}
