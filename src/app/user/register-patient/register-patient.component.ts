import { Component, OnInit, Input, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { SEXES, PATIENT_TYPES, RISSERS, STAGES, VERTEBRAL_COLUMNS, DIRECTIONS} from '../../shared/patient-options';
import { Member } from '../../shared/member';
import { BodyMeasurement, SpineInfo, XRayFile, ThreeDFile, Patient } from '../../shared/patient';

import { AuthService } from '../../services/auth.service';
import { PatientService } from '../../services/patient.service';

import { PasswordValidation } from '../../services/password-validation';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {

  sexes: string[];
  types: string[];
  rissers: number[];
  stages: string[];
  vertebralColumns: string[];
  directions: string[];

  newPatient: any;
  patientForm: FormGroup;
  errMess: string;

  showPatientInfo: boolean;

  apex2exist: boolean;
  apex3exist: boolean;

  formErrors = {
    'firstname': '',
    'lastname': '',
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
    //'lumber': '',
    //'lumberHeight': ''
  };

   validationMessages = {
    'firstname': {
      'required': "Patient's first name is required."
    },
    'lastname': {
      'required': "Patient's last name is required."
    },
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
    'weight': {
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
    'cobbAng1': {
      'required': 'Cobb angle is required.',
      'pattern': 'Cobb angle should be a number.'
    },
    'apexEnd1': {
      'required': 'End of apex1 is required.'
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
    /*
    'lumber': {
      'required': 'Measurement of lumber is required.',
      'pattern': 'Measurement of lumber should be a number.'
    },
    'lumberHeight': {
      'required': 'Measurement of lumber height is required.',
      'pattern': 'Measurement of lumber height should be a number.'
    },
    */
  };
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private patientservice: PatientService,
    private authService: AuthService,
    @Inject('BaseURL') private BaseURL
  ) { 
    console.log('register-patient');
    this.authService.validateUserCredentials((res, err) => {
      console.log('authService.validateUserCredentials');
      console.log('res: ', res);
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
        console.log('Logged in')
      }
    });
  }

  ngOnInit() {
    this.sexes = SEXES;
    this.types = PATIENT_TYPES;
    this.rissers = RISSERS;
    this.stages = STAGES;
    this.vertebralColumns = VERTEBRAL_COLUMNS;
    this.directions = DIRECTIONS;

    this.createForm();
    this.showPatientInfo = false;
  }

  createForm() {
    this.patientForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      sex: [this.sexes[1], [Validators.required]],

      type: [this.types[0], Validators.required],
      risser: [this.rissers[0], Validators.required],
      
      apexStart1: ['', Validators.required],
      cobbAng1: [null, [Validators.required, Validators.pattern]],
      apexEnd1: ['', Validators.required],
      direction1: ['', Validators.required],
      
      apexStart2: null,
      cobbAng2: [null, Validators.pattern],
      apexEnd2: null,
      direction2: '',
      
      apexStart3: null,
      cobbAng3: [null, Validators.pattern],
      apexEnd3: null,
      direction3: '',
      
      firstVisit: '',
      xRayFile: '',
      threeDScanFile: '',

      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      shoulder: [null, [Validators.required, Validators.pattern]],
      bust: [null, [Validators.required, Validators.pattern]],
      waist: [null, [Validators.required, Validators.pattern]],
      hip: [null, [Validators.required, Validators.pattern]],
      //lumber: [null, [Validators.required, Validators.pattern]],
      //lumberHeight: [, [Validators.required, Validators.pattern]]
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
      //console.log(`field: ${field}`);
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        //console.log(`field: ${field}`);
        const messages = this.validationMessages[field];
        //console.log(messages);
        //console.log(control.errors);
        for (const key in control.errors) {
          //console.log(`key: ${key}`);
          this.formErrors[field] += messages[key] + ' ';
          //console.log(this.formErrors[field]);
        }
      }
    }
  }

  submitPatient() {
    var patient = this.patientForm.value;
    //console.log('patient: ', patient);
    //console.log('patient.height: ', patient.height);
    var bodyMeasurement: BodyMeasurement;
    var spineInfo: SpineInfo;
    var threeDFile: ThreeDFile;
    var xRayFile: XRayFile;
    let today = new Date();
    //bodyMeasurement.updatedBy = 
    /*
    bodyMeasurement = {
      'updatedBy': '',
      'height': +patient.height,
      'weight': +patient.weight,
      'shoulder': +patient.shoulder,
      'bust': +patient.bust,
      'waist': +patient.waist,
      'hip': +patient.hip,
      'lumber': +patient.lumber,
      'lumberHeight': +patient.lumberHeight
    };
    //console.log('bodyMeasurement: ', bodyMeasurement);
    spineInfo = {
      'updatedBy': '',
      'type': patient.type,
      'risser': +patient.risser,
      'stage': patient.stage,
      'apexStart1': patient.apexStart1,
      'cobbAng1': +patient.cobbAng1,
      'apexEnd1': patient.apexEnd1,
      'direction1': patient.direction1,
      'apexStart2': patient.apexStart2,
      'cobbAng2': +patient.cobbAng2,
      'apexEnd2': patient.apexEnd2,
      'direction2': patient.direction2,
      'apexStart3': patient.apexStart3,
      'cobbAng3': +patient.cobbAng3,
      'apexEnd3': patient.apexEnd3,
      'direction3': patient.direction3
      //this.newPatient = patient.patientId;
    };
    */

    this.newPatient = {
      //'_id': '',
      //'organization': '',
      'firstname': patient.firstname,
      'lastname': patient.lastname,
      'birthday': patient.birthday,
      'sex': patient.sex,
      //'bodyMeasurements': [bodyMeasurement],
      //'spineInfos': [spineInfo],
      'visitedDays': [today.toISOString()]
    }

    if (patient.apexStart1) this.newPatient.spineInfos = [{
      'updatedBy': '',
      'type': patient.type,
      'risser': +patient.risser,
      'stage': patient.stage,
      'apexStart1': patient.apexStart1,
      'cobbAng1': +patient.cobbAng1,
      'apexEnd1': patient.apexEnd1,
      'direction1': patient.direction1,
      'apexStart2': patient.apexStart2,
      'cobbAng2': +patient.cobbAng2,
      'apexEnd2': patient.apexEnd2,
      'direction2': patient.direction2,
      'apexStart3': patient.apexStart3,
      'cobbAng3': +patient.cobbAng3,
      'apexEnd3': patient.apexEnd3,
      'direction3': patient.direction3,
      //'timestamps': {
      //  'createdAt': today.toISOString(),
      //  'updatedAt': today.toISOString()
      //}
    }];

    if (patient.height) this.newPatient.bodyMeasurements = [{
      'updatedBy': '',
      'height': +patient.height,
      'weight': +patient.weight,
      'shoulder': +patient.shoulder,
      'bust': +patient.bust,
      'waist': +patient.waist,
      'hip': +patient.hip,
      //'lumber': +patient.lumber,
      //'lumberHeight': +patient.lumberHeight,
      //'timestamps': {
      //  'createdAt': today.toISOString(),
      //  'updatedAt': today.toISOString()
      //}
    }];

    if (patient.threeDFile) this.newPatient.xRayFiles = [{
      'updatedBy': '',
      'filePath': patient.xRayFile,
      //'timestamps': {
      //  'createdAt': today.toISOString(),
      //  'updatedAt': today.toISOString()
      //}
    }];

    if (patient.threeDFile) this.newPatient.threeDFile = [{
      'updatedBy': '',
      'filePath': patient.threeDFile,
      //'timestamps': {
      //  'createdAt': today.toISOString(),
      //  'updatedAt': today.toISOString()
      //}
    }];
    /*
    this.newPatient.bodyMeasurements.push(bodyMeasurement);
    this.newPatient.spineInfos.push(spineInfo);
    this.newPatient.threeDFiles.push(threeDFile);
    this.newPatient.xRayFiles.push(xRayFile);
    this.newPatient.visitedDays.push(today.toISOString());
    */
    console.log('New patient information: ', this.newPatient);
    this.patientservice.postPatient(this.newPatient)
    .subscribe((patient) => {
      this.showPatientInfo = true;
      setTimeout(() => {
        this.patientForm.reset({
          firstname: '',
          lastname: '',
          birthday: '',
          sex: this.sexes[1],
          type: this.types[0],
          risser: this.rissers[0],
          
          apexStart1: '',
          cobbAng1: null,
          apexEnd1: '',
          direction1: '',
          
          apexStart2: null,
          cobbAng2: null,
          apexEnd2: null,
          direction2: '',
          
          apexStart3: null,
          cobbAng3: null,
          apexEnd3: null,
          direction3: '',
          
          firstVisit: '',
          xRayFile: '',
          threeDScanFile: '',

          height: null,
          weight: null,
          shoulder: null,
          bust: null,
          waist: null,
          hip: null,
          //lumber: null,
          //lumberHeight: null,
        });

        this.showPatientInfo = false;
        this.newPatient = undefined;
      }, 5000);
    })


  }

}
