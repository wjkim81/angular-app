import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Member } from '../../../shared/models/member';

import { SEXES } from '../../../shared/models/patient-options';
import { PatientInfoForm }  from '../../../shared/models/register-form-interfaces';

// import { AuthService } from '../../../services/auth.service';
import { RegisterPatientService } from '../service/register-patient.service';
import { PatientService } from '../../../shared/services/patient.service';
import { MemberService } from '../../../shared/services/member.service';

// import { flyInOut, slide } from '../../../shared/animations/app.animation';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
  // host: {
  //   // '[@slide]': 'middle',
  //   '[@flyInOut]': 'true',
  //   'style': 'display: block;',
  //   // 'overflow': 'hidden', /* Hide everything that doesn't fit component */
  // },
  // animations: [
  //   flyInOut(),
  //   slide()
  // ]
})
export class PatientInfoComponent implements OnInit {

  position: string = 'middle';

  sexOptions: string[];

  hashKey: string;
  member: Member;
  orgName: string;
  
  memberErrMsg: string;
  hashKeyErrMsg: string;

  @Input() patientInfo: PatientInfoForm;

  patientInfoForm: FormGroup;

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
  ) { 
    // this.registerPatientService.page1$.subscribe((pos) => {
    //   this.position = pos;
    // });
  }

  ngOnInit() {
    this.sexOptions = SEXES;

    console.log('patientInfo');
    console.log(this.patientInfo);

    if (this.patientInfo) {
      this.hashKey = this.patientInfo.hashKey;
    } else {
      this.patientService.getHashKey()
      .subscribe((msg) => {
        // console.log(msg);
        this.hashKey = msg.hashKey;
        // console.log(`hashKey: ${this.hashKey}`);
      }, (hashKeyErrMsg) => {
        this.hashKeyErrMsg = hashKeyErrMsg;
      });
    }

    this.memberService.getMemberInfo()
    .subscribe((member) => {
      this.orgName = member.organization.name;
      console.log(this.orgName);
    }, (memberErrMsg) => {
      this.memberErrMsg = <any>memberErrMsg;
    });

    this.createPatientInfoForm(this.patientInfo);
  }

  createPatientInfoForm(patientInfo: PatientInfoForm) {
    if (patientInfo) {
      this.patientInfoForm = this.fb.group({
        // firstname: ['', [Validators.required]],
        // hashKey: [this.hashKey],
        lastname: [patientInfo.lastname, [Validators.required]],
        birthday: [patientInfo.birthday, [Validators.required]],
        sex: [patientInfo.sex, [Validators.required]],
      });
    } else {
      this.patientInfoForm = this.fb.group({
        // firstname: ['', [Validators.required]],
        // hashKey: [this.hashKey],
        lastname: ['', [Validators.required]],
        birthday: ['', [Validators.required]],
        sex: [this.sexOptions[1], [Validators.required]],
      });
    }

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
      patientInfo.organization = this.orgName;
      patientInfo.hashKey = this.hashKey;
      patientInfo.valid = true;

      this.registerPatientService.setPatientInfo(patientInfo);

      // this.registerPatientService.setPage1Position('left');
      // this.registerPatientService.setPage2Position('middle');

      this.registerPatientService.setPageNum(2);
    } else {
      console.log('PatientInfoForm is invalid');
    }
  }

}
