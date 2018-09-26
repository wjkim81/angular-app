import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { BodyMeasurement, SpineInfo, XRayFile, Patient } from '../shared/patient';
import { PATIENTS } from '../shared/patients';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable()
export class PatientService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getPatients(): Observable<Patient[]> {
    console.log(baseURL);
    return this.http.get<Patient[]>(baseURL + 'patients')
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
    // .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  getPatientsBetween(startDate: String, endDate: String): Observable<Patient[]> {
    console.log(baseURL + 'patients?startDate=' + startDate + '&endDate=' + endDate);
    return this.http.get<Patient[]>(baseURL + 'patients?startDate=' + startDate + '&endDate=' + endDate)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );

    // .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  getPatient(id: string): Observable<Patient> {
    console.log('id: ', id);
    return  this.http.get<Patient>(baseURL + 'patients/' + id)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
                    // .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  postPatient(patient: Patient): Observable<Patient> {
    //console.log(patient);
    return this.http.post<Patient>(baseURL + 'patients/', patient)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
      // .catch(error => { return this.processHTTPMsgService.handleError(error); }); 
  }

  getPatientForAdmin(): Observable<Patient[]> {
    console.log(baseURL);
    return this.http.get<Patient[]>(baseURL + 'admins/patients')
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
    // .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  getPatientsBetweenForAdmin(startDate: String, endDate: String): Observable<Patient[]> {
    var url = baseURL + 'admins/patients?startDate=' + startDate + '&endDate=' + endDate;
    console.log(url);
    return this.http.get<Patient[]>(url)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
    // .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

  postSpineDiag(patientId: string, spineInfo: SpineInfo): Observable<Patient> {
    //console.log(patient);
    return this.http.post<Patient>(baseURL + 'patients/' + patientId + '/spineInfos', spineInfo)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
      // .catch(error => { return this.processHTTPMsgService.handleError(error); }); 
  }

  postBodyMeasurement(patientId: string, bdInfo: BodyMeasurement): Observable<Patient> {
    //console.log(patient);
    return this.http.post<Patient>(baseURL + 'patients/' + patientId + '/bodyMeasurements', bdInfo)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
      // .catch(error => { return this.processHTTPMsgService.handleError(error); }); 
  }

  getHashKey(): Observable<any> {
    console.log(baseURL);
    return this.http.get<any>(baseURL + 'hashkey/getHashKey')
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
    // .catch(error => { console.log('error: '); console.log(error); return this.processHTTPMsgService.handleError(error); });
  }

}
