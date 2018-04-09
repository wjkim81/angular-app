import { Component, OnInit, Input, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { SEXES, PATIENT_TYPES, RISSERS, STAGES, VERTEBRAL_COLUMNS, DIRECTIONS} from '../../shared/patient-options';
import { Member } from '../../shared/member';
import { Patient } from '../../shared/patient';

import { PasswordValidation } from '../../services/password-validation';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {

  sexes: string[];
  patientTypes: string[];
  rissers: number[];
  stages: string[];
  vertebralColumns: string[];
  directions: string[];

  newPatient: Patient;
  patientForm: FormGroup;
  errMess: string;

  showPatientInfo: boolean;

  apex2exist: boolean;
  apex3exist: boolean;

  formErrors = {
    'birthday': '',
    'sex': '',
    'height': '',
    'weight': '',
    'type': '',
    'risser': '',
    'apexStart1': '',
    'cobbAng1': '',
    'apexEnd1': '',
    'direction1': '',
    'firstVisit': '',
    'shoulder': '',
    'bust': '',
    'waist': '',
    'hip': '',
    'lumber': '',
    'lumberHeight': ''
  };

   validationMessages = {
    'birthday': {
      'required': "Patient's birthday is required."
    },
    'sex': {
      'required': "Patient's sex is required."
    },
    'height': {
      'required': "Patient's height is required.",
      'pattern': "Patient's height should be a number."
    },
    'wieght': {
      'required': "Patient's weight is required.",
      'pattern': "Patient's weight should be a number."
    },
    'type': {
      'required': 'Type is required.'
    },
    'risser': {
      'required': 'Risser is required.'
    },
    'apexStart1': {
      'required': 'Apex1 is required.'
    },
    'CobbAng1': {
      'required': 'Cobb Angle is required.'
    },
    'apexEnd1': {
      'required': 'ApexEnd1 is required.'
    },
    'direction1': {
      'required': 'Direction1 is required.'
    },
    'firstVisit': {
      'required': 'Visit day is required.'
    },
    'shoulder': {
      'required': 'Measurement of shoulder is required.',
      'pattern': 'Measurement of shoulder should be a number.'
    },
    'bust': {
      'required': 'Measurement of bust is required.',
      'pattern': 'Measurement of bust should be a number.'
    },
    'waist': {
      'required': 'Measurement of waist is required.',
      'pattern': 'Measurement of waist should be a number.'
    },
    'hip': {
      'required': 'Measurement of hip is required.',
      'pattern': 'Measurement of hip should be a number.'
    },
    'lumber': {
      'required': 'Measurement of lumber is required.',
      'pattern': 'Measurement of lumber should be a number.'
    },
    'lumberHeight': {
      'required': 'Measurement of lumber height is required.',
      'pattern': 'Measurement of lumber height should be a number.'
    },
  };
  
  constructor(
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.sexes = SEXES;
    this.patientTypes = PATIENT_TYPES;
    this.rissers = RISSERS;
    this.stages = STAGES;
    this.vertebralColumns = VERTEBRAL_COLUMNS;
    this.directions = DIRECTIONS;

    this.createForm();
    this.showPatientInfo = false;
  }

  createForm() {
    this.patientForm = this.fb.group({
      birthday: ['', [Validators.required]],
      sex: [this.sexes[1], [Validators.required]],
      height: [0, [Validators.required]],
      weight: [0, Validators.required],
      patientType: [this.patientTypes[0], Validators.required],
      risser: [this.rissers[0], Validators.required],
      
      apexStart1: [this.vertebralColumns[0], Validators.required],
      cobbAng1: [0, [Validators.required, Validators.pattern]],
      apexEnd1: [this.vertebralColumns[1], Validators.required],
      direction1: [this.directions[0], Validators.required],
      
      //apexStart2: '',
      cobbAng2: [0, Validators.pattern],
      apexEnd2: '',
      direction2: '',
      
      //apexStart3: '',
      cobbAng3: [0, Validators.pattern],
      apexEnd3: '',
      direction3: '',
      
      firstVisit: '',
      xRayFile: '',
      threeDScanFile: '',
      
      shoulder: [0, [Validators.required, Validators.pattern]],
      bust: [0, [Validators.required, Validators.pattern]],
      waist: [0, [Validators.required, Validators.pattern]],
      hip: [0, [Validators.required, Validators.pattern]],
      lumber: [0, [Validators.required, Validators.pattern]],
      lumberHeight: [0, [Validators.required, Validators.pattern]]
    });

    this.patientForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set from validation messages
  }

  onValueChanged(data?: any) {
    if (!this.patientForm) { return; }
    const form = this.patientForm;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        const messages = this.validationMessages[field];
        //console.log(control.errors);
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitPatient() {
    this.newPatient = this.patientForm.value;
    console.log(this.newPatient);

    this.showPatientInfo = true;

    setTimeout(() => {
      /*
      this.patientForm.reset({
      });
      */
      this.showPatientInfo = false;
    }, 5000);
  }

}
