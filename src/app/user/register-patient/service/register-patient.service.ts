import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

import { PatientInfoForm, SpineDescriptionForm }  from '../../../shared/register-form-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterPatientService {

  // Observable sources
  private pageSource = new Subject<Number>();
  private patientInfoSource= new Subject<PatientInfoForm>();
  private spineDescriptionSource= new Subject<SpineDescriptionForm>();
 
  // Observable streams
  page$ = this.pageSource.asObservable();
  patientInfo$ = this.patientInfoSource.asObservable();
  spineDescription$ = this.spineDescriptionSource.asObservable();

  setPageNum(num: number) {
    this.pageSource.next(num);
  }
 
  // Service message commands
  setPatientInfo(patientInfoForm: PatientInfoForm) {
    this.patientInfoSource.next(patientInfoForm);
  }
 
  setSpineDescription(spineDescriptionForm: SpineDescriptionForm) {
    this.spineDescriptionSource.next(spineDescriptionForm);
  }
}
