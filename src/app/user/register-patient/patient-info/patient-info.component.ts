import { Component, OnInit, OnDestroy, Input } from '@angular/core';
// import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { Member } from '../../../shared/member';

import { SEXES } from '../../../shared/patient-options';
// import { PatientInfo }  from '../../../shared/register-interfaces';

// import { AuthService } from '../../../services/auth.service';
import { RegisterPatientService } from '../service/register-patient.service';


@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit, OnDestroy {

  // @Input() organization: string;

  sexOptions: string[];

  newPatient: any;
  patientInfoForm: FormGroup;

  patientInfoFormErrors = {
    // 'firstname': '',
    'lastname': '',
    'birthday': '',
    'sex': ''
  };

  validationMessages = {
    // 'hashKey': {
    //   'required': "Patient's ID is required."
    // },
    'lastname': {
      'required': "Patient's last name is required."
    },
    'birthday': {
      'required': "Patient's birthday is required."
    },
    'sex': {
      'required': "Patient's sex is required."
    }
  };

  constructor(
    private fb: FormBuilder,
    private registerPatientService: RegisterPatientService,
  ) { }

  ngOnInit() {
    this.sexOptions = SEXES;

    this.createPatientInfoForm();
    // console.log('organization: ' + this.organization);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }


  createPatientInfoForm() {
    this.patientInfoForm = this.fb.group({
      // firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      sex: [this.sexOptions[1], [Validators.required]],
    });

    this.patientInfoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set from validation messages
  }

  onValueChanged(data?: any) {
    if (!this.patientInfoForm) { return; }
    const form = this.patientInfoForm;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.patientInfoFormErrors) {
      // clear previous error message (if any)
      //console.log(`field: ${field}`);
      this.patientInfoFormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        //console.log(`field: ${field}`);
        const messages = this.validationMessages[field];
        //console.log(messages);
        //console.log(control.errors);
        for (const key in control.errors) {
          //console.log(`key: ${key}`);
          this.patientInfoFormErrors[field] += messages[key] + ' ';
          //console.log(this.formErrors[field]);
        }
      }
    }
  }

  goNext() {
    console.log(this.patientInfoForm.status);
    let status = this.patientInfoForm.status;

    if (status === 'VALID') {
      console.log('goNext()');
      this.registerPatientService.setPageNum(2);
      this.registerPatientService.setPatientInfo(this.patientInfoForm.value);
    } else {

    }
  }
  
}
