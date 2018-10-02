import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CURVE_TYPES, LUMBAR_SPINE_TYPES, SAGITTAL_ALIGNMENT_TYPES, RISSERS_OPTIONS, VERTEBRAL_COLUMNS, DIRECTIONS} from '../../../shared/models/patient-options';
// import { SpinePrescriptionForm } from '../../../shared/register-form-interfaces';

import { RegisterPatientService } from '../service/register-patient.service';

@Component({
  selector: 'app-spine-prescription',
  templateUrl: './spine-prescription.component.html',
  styleUrls: ['./spine-prescription.component.scss']
})
export class SpinePrescriptionComponent implements OnInit {

  curveTypeOptions: string[];
  lumbarSpineOptions: string[];
  sagittalAlignmentOptions: string[];
  // risser is number, but in html, we can only recieve string
  // We need to convert string to number when assigning vallue to risser
  risserOptions: string[];
  vertebralColumnOptions: string[];
  directionOptions: string[];

  spinePrescriptionForm: FormGroup;
  curve2Form: FormGroup;
  curve3Form: FormGroup;

  addCurve2: boolean;
  addCurve3: boolean;

  showDeleteCurveBtn: boolean;
  showAddCurveBtn: boolean;

  patientErrMsg: boolean;

  spinePrescriptionformErrors = {
    'curveType': '',
    'lumbarSpine': '',
    'sagittalAlignment': '',
    'curveStart1': '',
    'cobbAng1': '',
    'curveEnd1': '',
    'direction1': '',
    'major1': ''
  };

  curve2FormErrors = {
    'curveStart2': '',
    'cobbAng2': '',
    'curveEnd2': '',
    'direction2': '',
    'major2': ''
  };

  curve3FormErrors = {
    'curveStart3': '',
    'cobbAng3': '',
    'curveEnd3': '',
    'direction3': '',
    'major3': ''
  };

   validationMessages = {
    'curveType': {
      'required': 'Type is required.'
    },
    'lumbarSpine': {
      'required': 'Type is required.'
    },
    'sagittalAlignment': {
      'required': 'Type is required.'
    },
    'risser': {
      'required': 'Risser is required.'
    },
    'curveStart1': {
      'required': 'Begining of Curve is required.'
    },
    'cobbAng1': {
      'required': 'Cobb angle is required.',
      'pattern': 'Cobb angle should be a number.'
    },
    'curveEnd1': {
      'required': 'End of curve is required.'
    },
    'direction1': {
      'required': 'Direction is required.'
    },
    'major1': {
      'required': 'Specification of major or minor curve is required.'
    },
    'curveStart2': {
      'required': 'Begining of Curve is required.'
    },
    'cobbAng2': {
      'required': 'Cobb angle is required.',
      'pattern': 'Cobb angle should be a number.'
    },
    'curveEnd2': {
      'required': 'End of curve is required.'
    },
    'direction2': {
      'required': 'Direction is required.'
    },
    'major2': {
      'required': 'Specification of major or minor curve is required.'
    },
    'curveStart3': {
      'required': 'Begining of Curve is required.'
    },
    'cobbAng3': {
      'required': 'Cobb angle is required.',
      'pattern': 'Cobb angle should be a number.'
    },
    'curveEnd3': {
      'required': 'End of curve is required.'
    },
    'direction3': {
      'required': 'Direction is required.'
    },
    'major3': {
      'required': 'Specification of major or minor curve is required.'
    }
  };

  constructor(
    private fb: FormBuilder,
    private registerPatientService: RegisterPatientService,
  ) { }

  ngOnInit() {
    this.curveTypeOptions = CURVE_TYPES;
    this.lumbarSpineOptions = LUMBAR_SPINE_TYPES;
    this.sagittalAlignmentOptions = SAGITTAL_ALIGNMENT_TYPES;
    this.risserOptions = RISSERS_OPTIONS;
    this.vertebralColumnOptions = VERTEBRAL_COLUMNS;
    this.directionOptions = DIRECTIONS;

    this.addCurve2 = false;
    this.addCurve3 = false;
    this.showDeleteCurveBtn = false;
    this.showAddCurveBtn = true;

    this.patientErrMsg = false;
    this.createSpinePrescriptionForm();
    this.createCurve2Form();
    this.createCurve3Form();
  }

  createSpinePrescriptionForm() {
    this.spinePrescriptionForm = this.fb.group({
      curveType: [null, Validators.required],
      lumbarSpine: [null, Validators.required],
      // this.lumbarSpineOptions[0],
      sagittalAlignment: [null, Validators.required],
      risser: [null, Validators.required],
      
      curveStart1: ['', Validators.required],
      cobbAng1: [null, [Validators.required, Validators.pattern]],
      curveEnd1: ['', Validators.required],
      direction1: ['', Validators.required],
      major1: [null, Validators.required],
      
      xRayFile: '',
    });

    this.spinePrescriptionForm.valueChanges
      .subscribe(data => this.onValueChangedInSpineprescriptonForm(data));
    this.onValueChangedInSpineprescriptonForm(); // (re)set from validation messages
  }

  createCurve2Form() {
    this.curve2Form = this.fb.group({
      curveStart2: ['', Validators.required],
      cobbAng2: [null, [Validators.required, Validators.pattern]],
      curveEnd2: ['', Validators.required],
      direction2: ['', Validators.required],
      major2: [null, Validators.required],
    });

    this.curve2Form.valueChanges
      .subscribe(data => this.onValueChangedInCurve2Form(data));
    this.onValueChangedInCurve2Form(); // (re)set from validation messages
  }

  createCurve3Form() {
    this.curve3Form = this.fb.group({
      curveStart3: ['', Validators.required],
      cobbAng3: [null, [Validators.required, Validators.pattern]],
      curveEnd3: ['', Validators.required],
      direction3: ['', Validators.required],
      major3: [null, Validators.required],
    });

    this.curve3Form.valueChanges
      .subscribe(data => this.onValueChangedInCurve3Form(data));
    this.onValueChangedInCurve3Form(); // (re)set from validation messages
  }

  onValueChangedInSpineprescriptonForm(data?: any) {
    if (!this.spinePrescriptionForm) { return; }
    const form = this.spinePrescriptionForm;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.spinePrescriptionformErrors) {
      // clear previous error message (if any)
      //console.log(`field: ${field}`);
      this.spinePrescriptionformErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        //console.log(`field: ${field}`);
        const messages = this.validationMessages[field];
        //console.log(messages);
        //console.log(control.errors);
        for (const key in control.errors) {
          //console.log(`key: ${key}`);
          this.spinePrescriptionformErrors[field] += messages[key] + ' ';
          //console.log(this.formErrors[field]);
        }
      }
    }
  }

  onValueChangedInCurve2Form(data?: any) {
    if (!this.curve2Form) { return; }
    const form = this.curve2Form;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.curve2FormErrors) {
      // clear previous error message (if any)
      //console.log(`field: ${field}`);
      this.curve2FormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        //console.log(`field: ${field}`);
        const messages = this.validationMessages[field];
        //console.log(messages);
        //console.log(control.errors);
        for (const key in control.errors) {
          //console.log(`key: ${key}`);
          this.curve2FormErrors[field] += messages[key] + ' ';
          //console.log(this.formErrors[field]);
        }
      }
    }
  }

  onValueChangedInCurve3Form(data?: any) {
    if (!this.curve3Form) { return; }
    const form = this.curve3Form;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.curve3FormErrors) {
      // clear previous error message (if any)
      //console.log(`field: ${field}`);
      this.curve3FormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        //console.log(`field: ${field}`);
        const messages = this.validationMessages[field];
        //console.log(messages);
        //console.log(control.errors);
        for (const key in control.errors) {
          //console.log(`key: ${key}`);
          this.curve3FormErrors[field] += messages[key] + ' ';
          //console.log(this.formErrors[field]);
        }
      }
    }
  }
  
  addCurve() {
    if (!this.addCurve2 && !this.addCurve3) {
      this.addCurve2 = !this.addCurve2;
      this.showDeleteCurveBtn = !this.showDeleteCurveBtn;
      return;
    }

    if (this.addCurve2 && !this.addCurve3) {
      this.addCurve3 = !this.addCurve3;
      this.showAddCurveBtn = !this.showAddCurveBtn;
      return;
    }
  }

  deleteCurve() {
    if (this.addCurve2 && !this.addCurve3) {
      this.addCurve2 = !this.addCurve2;
      this.showDeleteCurveBtn = !this.showDeleteCurveBtn;
      this.curve2Form.reset({
        curveStart2: '',
        cobbAng2: null,
        curveEnd2: '',
        direction2: '',
        major2: 'n',
      });
      return;
    }

    if (this.addCurve2 && this.addCurve3) {
      this.addCurve3 = !this.addCurve3;
      this.showAddCurveBtn = !this.showAddCurveBtn;
      this.curve3Form.reset({
        curveStart3: '',
        cobbAng3: null,
        curveEnd3: '',
        direction3: '',
        major3: 'n',
      });
      return;
    }
  }

  goPrevious() {
    this.registerPatientService.setPageNum(1);
    // this.registerPatientService.setSpinePrescription(this.spinePrescriptionForm.value);
  }

  skip() {
    console.log('skip()');
    this.registerPatientService.setPageNum(3);

    // let spForm = this.spinePrescriptionForm.value;

    var spinePrescription = this.spinePrescriptionForm.value;
    spinePrescription.valid = false;
    this.registerPatientService.setSpinePrescription(spinePrescription);
  }

  goNext() {
    console.log('goNext()');
    let status = this.spinePrescriptionForm.status;
    let curve2status = this.curve2Form.status;
    let curve3status = this.curve3Form.status;
    let spForm = this.spinePrescriptionForm.value;

    var spinePrescription = spForm;
    
    spinePrescription.curveType = spForm.curveType;
    spinePrescription.lumbarSpine = spForm.lumbarSpine;
    spinePrescription.sagittalAlignment = spForm.sagittalAlignment;
    spinePrescription.risser = spForm.risser;
    spinePrescription.curveStart1 = spForm.curveStart1;
    spinePrescription.cobbAng1 = spForm.cobbAng1;
    spinePrescription.curveEnd1 = spForm.curveEnd1;
    spinePrescription.direction1 = spForm.direction1;
    spinePrescription.major1 = spForm.major1;
    spinePrescription.addCurve2 = false;
    spinePrescription.addCurve3 = false;
    this.patientErrMsg = true;

    if (status === 'VALID' && !this.addCurve2 && !this.addCurve3) {
      console.log('main goNext()');

      spinePrescription.valid = true;
      this.registerPatientService.setPageNum(3);
      this.registerPatientService.setSpinePrescription(spinePrescription);
    } else if (status === 'INVALID' && !this.addCurve2 && !this.addCurve3) {
      console.log('Main form is invalid');
      console.log('test');
      setTimeout(() =>{
        this.patientErrMsg = true;
      }, 2000);
      return;
    } else if (status === 'VALID' && this.addCurve2 && curve2status ==='VALID' && !this.addCurve3) {
      console.log('cureve2 goNext()');

      let curve2 = this.curve2Form.value;
      spinePrescription.addCurve2 = true;
      spinePrescription.curveStart2 = curve2.curveStart2;
      spinePrescription.cobbAng2 = curve2.cobbAng2;
      spinePrescription.curveEnd2 = curve2.curveEnd2;
      spinePrescription.direction2 = curve2.direction2;
      spinePrescription.major2 = curve2.major2;

      spinePrescription.valid = true;
      this.registerPatientService.setPageNum(3);
      this.registerPatientService.setSpinePrescription(spinePrescription);
    } else if (status === 'VALID' && this.addCurve2 && curve2status ==='INVALID' && !this.addCurve3) {
      console.log('curve2Form is invalid');
      return;
    } else if (status === 'VALID' && 
              this.addCurve2 && curve2status ==='VALID' &&
              this.addCurve3 && curve3status ==='VALID') {

      console.log('curve3 goNext()');
      let curve3 = this.curve3Form.value;
      spinePrescription.addCurve3 = true;
      spinePrescription.curveStart3 = curve3.curveStart3;
      spinePrescription.cobbAng3 = curve3.cobbAng3;
      spinePrescription.curveEnd3 = curve3.curveEnd3;
      spinePrescription.direction3 = curve3.direction3;
      spinePrescription.major3 = curve3.major3;

      spinePrescription.valid = true;
      this.registerPatientService.setPageNum(3);
      this.registerPatientService.setSpinePrescription(spinePrescription);
    } else if (status === 'VALID' && 
              this.addCurve2 && curve2status ==='VALID' &&
              this.addCurve3 && curve3status ==='INVALID') {
      console.log('curve3Form is invalid');
      return;
    }
  }
}
