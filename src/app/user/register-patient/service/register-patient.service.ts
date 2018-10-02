import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { PatientInfoForm, SpinePrescriptionForm, DiagnosisForm, BodyMeasurementForm }  from '../../../shared/models/register-form-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterPatientService {

  // Observable sources
  private pageSource = new Subject<number>();

  private patientInfoSource = new Subject<PatientInfoForm>();
  private spineDescriptionSource = new Subject<SpinePrescriptionForm>();
  private diagnosisSource = new Subject<DiagnosisForm>();
  private bodyMeasurementSource = new Subject<BodyMeasurementForm>();

  // Observable streams
  page$ = this.pageSource.asObservable();

  patientInfo$ = this.patientInfoSource.asObservable();
  spineDescription$ = this.spineDescriptionSource.asObservable();
  diagnosis$ = this.diagnosisSource.asObservable();
  bodyMeasurement$ = this.bodyMeasurementSource.asObservable();

  private page1Source = new Subject<string>();
  private page2Source = new Subject<string>();
  private page3Source = new Subject<string>();
  private page4Source = new Subject<string>();
  private page5Source = new Subject<string>();

  page1$ = this.page1Source.asObservable();
  page2$ = this.page1Source.asObservable();
  page3$ = this.page1Source.asObservable();
  page4$ = this.page1Source.asObservable();
  page5$ = this.page1Source.asObservable();
 
  // Service message commands
  setPageNum(num: number) {
    this.pageSource.next(num);
  }

  setPatientInfo(patientInfoForm: PatientInfoForm) {
    this.patientInfoSource.next(patientInfoForm);
  }
 
  setSpinePrescription(spinePrescriptionForm: SpinePrescriptionForm) {
    this.spineDescriptionSource.next(spinePrescriptionForm);
  }

  setDiagnosis(diagnosisForm: DiagnosisForm) {
    this.diagnosisSource.next(diagnosisForm);
  }

  setBodyMeasurement(bodyMeasurementForm: BodyMeasurementForm) {
    this.bodyMeasurementSource.next(bodyMeasurementForm);
  }

  setPage1Position(position: string) {
    this.page1Source.next(position);
  }

  setPage2Position(position: string) {
    this.page2Source.next(position);
  }
  
  setPage3Position(position: string) {
    this.page3Source.next(position);
  }

  setPage4Position(position: string) {
    this.page4Source.next(position);
  }

  setPage5Position(position: string) {
    this.page5Source.next(position);
  }
}
