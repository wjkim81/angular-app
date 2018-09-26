import { Component, OnInit, Input, Inject } from '@angular/core';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

// import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
// import { SEXES, PATIENT_TYPES, RISSERS, STAGES, VERTEBRAL_COLUMNS, DIRECTIONS} from '../../shared/patient-options';
import { Member } from '../../shared/member';
// import { BodyMeasurement, SpineInfo, XRayFile, Patient } from '../../shared/patient';
import { PatientInfoForm, SpineDescriptionForm }  from '../../shared/register-form-interfaces';

import { AuthService } from '../../services/auth.service';
import { PatientService } from '../../services/patient.service';

import { RegisterPatientService } from './service/register-patient.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {

  today: Date;
  loggedUser: Member;

  page: Number;
  patientInfo: PatientInfoForm;
  spineDescription: SpineDescriptionForm;

  errMess: string;
  
  constructor(
    // private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private patientservice: PatientService,
    private authService: AuthService,
    private registerPatientService: RegisterPatientService,
    @Inject('BaseURL') private BaseURL
  ) { 
    registerPatientService.page$.subscribe((page) => {
      this.page = page;
    });

    registerPatientService.patientInfo$.subscribe((patientInfo) => {
      this.patientInfo = patientInfo;
    });
  }

  ngOnInit() {
    console.log('register-patient');

    this.today = new Date();
    this.registerPatientService.setPageNum(1);

    this.authService.validateUserCredentials((res, err) => {
      console.log('authService.validateUserCredentials');
      // console.log('res: ', res);
      console.log('err: ', err);
      if (err) {
        this.errMess = err;
      }
 
      console.log('authenticated: ', this.authService.isAuthenticated);
      if (!this.authService.isAuthenticated) {
        
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['/user-login']);
      } else {
        console.log(res.member);
        this.loggedUser = res.member;
        console.log(this.loggedUser.organization.name);
        console.log('Logged in')
      }
    });
  }
}
