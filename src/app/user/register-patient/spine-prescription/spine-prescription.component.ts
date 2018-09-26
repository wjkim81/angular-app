import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CURVE_TYPES, LUMBAR_SPINE_TYPES, SAGITTAL_ALIGNMENT_TYPES, RISSERS_OPTIONS, VERTEBRAL_COLUMNS, DIRECTIONS} from '../../../shared/patient-options';

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
      'required': 'Curve1 is required.'
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
    'major1': {
      'required': 'major1 is required.'
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

    this.createSpinePrescriptionForm();
    this.createCurve2Form();
    this.createCurve3Form();
  }

  createSpinePrescriptionForm() {
    this.spinePrescriptionForm = this.fb.group({
      curveType: [this.curveTypeOptions[0], Validators.required],
      lumbarSpine: [this.lumbarSpineOptions[0], Validators.required],
      sagittalAlignment: [this.sagittalAlignmentOptions[1], Validators.required],
      risser: [this.risserOptions[0], Validators.required],
      
      curveStart1: ['', Validators.required],
      cobbAng1: [null, [Validators.required, Validators.pattern]],
      curveEnd1: ['', Validators.required],
      direction1: ['', Validators.required],
      major1: ['y', Validators.required],
      
      xRayFile: '',
    });

    this.spinePrescriptionForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set from validation messages
  }

  createCurve2Form() {
    this.curve2Form = this.fb.group({
      curveStart2: '',
      cobbAng2: [null, Validators.pattern],
      curveEnd2: '',
      direction2: '',
      major2: 'n',
    });
  }

  createCurve3Form() {
    this.curve3Form = this.fb.group({
      curveStart3: '',
      cobbAng3: [null, Validators.pattern],
      curveEnd3: '',
      direction3: '',
      major3: 'n',
    });
  }

  onValueChanged(data?: any) {
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
      return;
    }

    if (this.addCurve2 && this.addCurve3) {
      this.addCurve3 = !this.addCurve3;
      this.showAddCurveBtn = !this.showAddCurveBtn;
      return;
    }
  }

  goPrevious() {
    this.registerPatientService.setPageNum(1);
    this.registerPatientService.setSpineDescription(this.spinePrescriptionForm.value);
  }

  skip() {
    this.registerPatientService.setPageNum(3);
    this.registerPatientService.setSpineDescription(this.spinePrescriptionForm.value);
  }

  goNext() {
    console.log(this.spinePrescriptionForm.status);
    let status = this.spinePrescriptionForm.status;

    if (status === 'VALID') {
      console.log('goNext()');
      this.registerPatientService.setPageNum(3);
      this.registerPatientService.setSpineDescription(this.spinePrescriptionForm.value);
    } else {

    }
  }
}
