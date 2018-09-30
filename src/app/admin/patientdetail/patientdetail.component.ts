import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Patient } from '../../shared/models/patient';

import { SEXES, PATIENT_TYPES, RISSERS, VERTEBRAL_COLUMNS, DIRECTIONS} from '../../shared/models/patient-options';

import { PatientService } from '../../shared/services/patient.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-patientdetail',
  templateUrl: './patientdetail.component.html',
  styleUrls: ['./patientdetail.component.scss']
})
export class PatientdetailComponent implements OnInit {

  patient: Patient;

  errMess: string;

  spineDiagForm: FormGroup;
  bodyMeasureForm: FormGroup;

  spineDiagModal: NgbModalRef;
  bodyMeasureModal: NgbModalRef;

  openedModal: NgbModalRef;

  sexOptions: string[];
  patientTypeOptions: string[];
  risserOptions: number[];
  stageOptions: string[];
  vertebralColumns: string[];
  directionOptions: string[];

  
  formErrors = {
    'type': '',
    'risser': '',
    'curveStart1': '',
    'cobbAng1': '',
    'curveEnd1': '',
    'direction1': '',
    'firstVisit': '',
    'height': '',
    'weight': '',
    'shoulder': '',
    'bust': '',
    'waist': '',
    'hip': ''//,
    //'lumber': '',
    //'lumberHeight': ''
  };

   validationMessages = {
    'type': {
      'required': 'Type is required.'
    },
    'risser': {
      'required': 'Risser is required.'
    },
    'curveStart1': {
      'required': 'Apex1 is required.'
    },
    'cobbAng1': {
      'required': 'Cobb angle is required.',
      'pattern': 'Cobb angle should be a number.'
    },
    'curveEnd1': {
      'required': 'End of curve1 is required.'
    },
    'direction1': {
      'required': 'Direction1 is required.'
    },
    'height': {
      'required': "Patient's height is required.",
      'pattern': "Patient's height should be a number."
    },
    'weight': {
      'required': "Patient's weight is required.",
      'pattern': "Patient's weight should be a number."
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
    }/*,
    'lumber': {
      'required': 'Measurement of lumber is required.',
      'pattern': 'Measurement of lumber should be a number.'
    },
    'lumberHeight': {
      'required': 'Measurement of lumber height is required.',
      'pattern': 'Measurement of lumber height should be a number.'
    },*/
  };

  constructor(
    private modalService: NgbModal,
    private patientservice: PatientService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //console.log('patientdetail.component');

    this.sexOptions = SEXES;
    this.patientTypeOptions = PATIENT_TYPES;
    this.risserOptions = RISSERS;
    this.vertebralColumns = VERTEBRAL_COLUMNS;
    this.directionOptions = DIRECTIONS;

    this.route.params
      .switchMap((params: Params) => { return this.patientservice.getPatient(params['id']); })
      .subscribe(patient => { this.patient = patient; console.log('patient: ', patient) }, errmess => this.errMess = <any>errmess);

    this.createForms();
  }

  createForms() {
    this.spineDiagForm = this.fb.group({

      type: [this.patientTypeOptions[0], Validators.required],
      risser: [this.risserOptions[0], Validators.required],
      
      curveStart1: ['', Validators.required],
      cobbAng1: [null, [Validators.required, Validators.pattern]],
      curveEnd1: ['', Validators.required],
      direction1: ['', Validators.required],
      
      curveStart2: null,
      cobbAng2: [null, Validators.pattern],
      curveEnd2: null,
      direction2: '',
      
      curveStart3: null,
      cobbAng3: [null, Validators.pattern],
      curveEnd3: null,
      direction3: ''
    });

    this.bodyMeasureForm = this.fb.group({
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      shoulder: [null, [Validators.required, Validators.pattern]],
      bust: [null, [Validators.required, Validators.pattern]],
      waist: [null, [Validators.required, Validators.pattern]],
      hip: [null, [Validators.required, Validators.pattern]]/*,
      lumber: [null, [Validators.required, Validators.pattern]],
      lumberHeight: [null, [Validators.required, Validators.pattern]]
      */
    })

    this.spineDiagForm.valueChanges
      .subscribe(data => this.spineDiagFormValueChanged(data));

    this.bodyMeasureForm.valueChanges
      .subscribe(data => this.bodyMeasureFormValueChanged(data));

    this.spineDiagFormValueChanged(); // (re)set from validation messages
    this.bodyMeasureFormValueChanged(); // (re)set from validation messages
  }

  spineDiagFormValueChanged(data?: any) {
    if (!this.spineDiagForm) { return; }
    const form = this.spineDiagForm;
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

  bodyMeasureFormValueChanged(data?: any) {
    if (!this.bodyMeasureForm) { return; }
    const form = this.bodyMeasureForm;
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

  openSpineDiagModal(content) {
    this.spineDiagForm.reset({
      type: this.patientTypeOptions[0],
      risser: this.risserOptions[0],
      
      curveStart1: '',
      cobbAng1: null,
      curveEnd1: '',
      direction1: '',
      
      curveStart2: null,
      cobbAng2: null,
      curveEnd2: null,
      direction2: '',
      
      curveStart3: null,
      cobbAng3: null,
      curveEnd3: null,
      direction3: '',
    });
    this.spineDiagModal = this.modalService.open(content, { size: 'lg' });
  }

  openBodyMeasureModal(content) {
    this.bodyMeasureForm.reset({
      height: null,
      weight: null,
      shoulder: null,
      bust: null,
      waist: null,
      hip: null/*,
      lumber: null,
      lumberHeight: null
      */
    })

    this.bodyMeasureModal = this.modalService.open(content, { size: 'lg' });
  }

  submitSpineDiag() {
    console.log('Submit new spine diagnosis');
    let newSpineInfo = this.spineDiagForm.value;
    //console.log(newSpineInfo);
    this.patientservice.postSpineDiag(this.patient._id, newSpineInfo)
    .subscribe((patient) => {
      console.log('subscribe');

      this.patient = undefined;
      this.patient = patient;

      console.log(this.patient);

      this.spineDiagModal.close();
    }, (errMess) => {
      this.errMess = <any>errMess;
      console.log(errMess);
    });
  }

  submitBodyMeasurement() {
    console.log('Submit new body measurement');
    let newBdInfo = this.bodyMeasureForm.value;
    //console.log(newSpineInfo);
    this.patientservice.postBodyMeasurement(this.patient._id, newBdInfo)
    .subscribe((patient) => {
      console.log('subscribe');

      //this.patient = undefined;
      this.patient = patient;

      console.log(this.patient);
      
      this.bodyMeasureModal.close();
    }, (errMess) => {
      this.errMess = <any>errMess;
      console.log(errMess);
    });
  }
}
