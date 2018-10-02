import { Component, OnInit, Inject } from '@angular/core';

import { Member } from '../../shared/models/member';
// import { BodyMeasurement, SpineInfo, XRayFile, Patient } from '../../shared/patient';
import { PatientInfoForm, SpinePrescriptionForm, DiagnosisForm, BodyMeasurementForm }  from '../../shared/models/register-form-interfaces';

import { AuthService } from '../../shared/services/auth.service';
import { RegisterPatientService } from './service/register-patient.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss'],
})
export class RegisterPatientComponent implements OnInit {

  today: Date;
  loggedUser: Member;

  page: number = 1;
  page1Position: string;
  page2Position: string;
  page3Position: string;
  page4Position: string;
  page5Position: string;

  // patientInfoForm: FormGroup;

  patientInfo: PatientInfoForm;
  spinePrescription: SpinePrescriptionForm;
  diagnosis: DiagnosisForm;
  bodyMeasurement: BodyMeasurementForm;

  errMess: string;
  
  constructor(
    // private fb: FormBuilder,
    private authService: AuthService,
    private registerPatientService: RegisterPatientService,
  ) { 
    registerPatientService.page$.subscribe((page) => {
      this.page = page;
    });

    registerPatientService.patientInfo$.subscribe((patientInfo) => {
      this.patientInfo = patientInfo;
    });

    registerPatientService.spineDescription$.subscribe((SpinePrescription) => {
      this.spinePrescription = SpinePrescription;
    });

    registerPatientService.diagnosis$.subscribe((diagnosis) => {
      this.diagnosis = diagnosis;
    });

    registerPatientService.bodyMeasurement$.subscribe((bodyMeasurement) => {
      this.bodyMeasurement = bodyMeasurement;
    });

    registerPatientService.page1$.subscribe((position) => {
      this.page1Position = position;
    });

    registerPatientService.page2$.subscribe((position) => {
      this.page2Position = position;
    });

    registerPatientService.page3$.subscribe((position) => {
      this.page3Position = position;
    });

    registerPatientService.page4$.subscribe((position) => {
      this.page4Position = position;
    });

    registerPatientService.page5$.subscribe((position) => {
      this.page5Position = position;
    });
  }

  ngOnInit() {
    console.log('register-patient');

    this.today = new Date();

    this.registerPatientService.setPageNum(1);
    this.registerPatientService.setPage1Position('middle');
    this.registerPatientService.setPage2Position('right');
    this.registerPatientService.setPage3Position('right');
    this.registerPatientService.setPage4Position('right');
    this.registerPatientService.setPage5Position('right');

    // this.authService.validateUserCredentials((res, err) => {
    //   console.log('authService.validateUserCredentials');
    //   // console.log('res: ', res);
    //   console.log('err: ', err);
    //   if (err) {
    //     this.errMess = err;
    //   }
 
    //   console.log('authenticated: ', this.authService.isAuthenticated);
    //   if (!this.authService.isAuthenticated) {
        
    //     this.location.replaceState('/'); // clears browser history so they can't navigate with back button
    //     this.router.navigate(['/user-login']);
    //   } else {
    //     // console.log(res.member);
    //     // this.loggedUser = res.member;
    //     // console.log(this.loggedUser.organization.name);
    //     console.log('Logged in')
    //   }
    // });
  }
}
