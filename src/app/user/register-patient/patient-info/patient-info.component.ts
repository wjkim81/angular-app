import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Member } from '../../../shared/models/member';

import { SEXES } from '../../../shared/models/patient-options';

// import { AuthService } from '../../../services/auth.service';
import { RegisterPatientService } from '../service/register-patient.service';
import { PatientService } from '../../../shared/services/patient.service';
import { MemberService } from '../../../shared/services/member.service';

import { slide } from '../../../shared/animations/app.animation';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
  // host: {
  //   'style': 'display: block;',
  //   // 'overflow': 'hidden', /* Hide everything that doesn't fit component */
  // },
  // animations: [
  //   slide()
  // ]
})
export class PatientInfoComponent implements OnInit, OnDestroy {

  position: string = 'middle';

  sexOptions: string[];

  hashKey: string;
  member: Member;

  patientInfoForm: FormGroup;
  
  patientErrMsg: boolean;

  patientInfoFormErrors = {
    // 'firstname': '',
    'hashKey': '',
    'lastname': '',
    'birthday': '',
    'sex': ''
  };

  validationMessages = {
    'hashKey': {
      'required': "Patient's ID is required."
    },
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
    private patientService: PatientService,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.sexOptions = SEXES;

    this.patientErrMsg = false;
    this.patientService.getHashKey()
    .subscribe((msg) => {
      // console.log(msg);
      this.hashKey = msg.hashKey;
      // console.log(`hashKey: ${this.hashKey}`);
    });

    this.memberService.getMemberInfo()
    .subscribe((member) => {
      this.member = member;
      console.log(member);
    }, (patientErrMsg) => {
      this.patientErrMsg = <any>patientErrMsg;
    });

    this.createPatientInfoForm();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  createPatientInfoForm() {
    this.patientInfoForm = this.fb.group({
      // firstname: ['', [Validators.required]],
      // hashKey: [this.hashKey],
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
      // this.registerPatientService.setPatientInfoForm(this.patientInfoForm);

      var patientInfo = this.patientInfoForm.value;
      patientInfo.organization = this.member.organization.name;
      patientInfo.hashKey = this.hashKey;
      patientInfo.valid = true;
      this.registerPatientService.setPatientInfo(patientInfo);

      this.registerPatientService.setPageNum(2);
      this.registerPatientService.setPage1Position('left');
      this.registerPatientService.setPage2Position('middle');
      
    } else {
      console.log('PatientInfoForm is invalid');
    }
  }

}
