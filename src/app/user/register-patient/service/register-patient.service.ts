import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { PatientInfoForm, SpinePrescriptionForm, DiagnosisForm, BodyMeasurementForm }  from '../../../shared/models/register-form-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterPatientService {

  // Observable sources
  private pageSource = new Subject<Number>();

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
}
