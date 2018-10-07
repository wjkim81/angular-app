import { Component, OnInit, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CURVE_TYPES, LUMBAR_SPINE_TYPES, SAGITTAL_ALIGNMENT_TYPES, RISSERS_OPTIONS, VERTEBRAL_COLUMNS, DIRECTIONS} from '../../../shared/models/patient-options';
import { Patient } from '../../../shared/models/patient';

import { PatientService } from '../../../shared/services/patient.service';
import { ControlModalService } from '../service/control-modal.service';

@Component({
  selector: 'app-add-spineprescription-modal',
  templateUrl: './add-spineprescription-modal.component.html',
  styleUrls: ['./add-spineprescription-modal.component.scss']
})
export class AddSpineprescriptionModalComponent implements OnInit {

  @Input() patient: Patient;

  @Output() updatedPatient = new EventEmitter<Patient>();

  @ViewChild('addNewSpineDiagModal')
  private modalRef: TemplateRef<any>;
  spineDiagModal: NgbModalRef;

  errMsg: string;

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

  spinePrescriptionFormErrors = {
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
    private modalService: NgbModal,
    private controlModalService: ControlModalService,
    private patientservice: PatientService,
    private fb: FormBuilder,
  ) {
    this.controlModalService.modal$.subscribe((modalMsg)=>{
      if (modalMsg === 'openSpinePrescriptionModal') {
        console.log(modalMsg);
        this.openSpineDiagModal(this.modalRef);
      } else if (modalMsg === 'closeSpinePrescriptionModal') {
        // this.bodyMeasureModal.close();
      }
    });
  }

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
      major2: ['n', Validators.required],
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
      major3: ['n', Validators.required],
    });

    this.curve3Form.valueChanges
      .subscribe(data => this.onValueChangedInCurve3Form(data));
    this.onValueChangedInCurve3Form(); // (re)set from validation messages
  }

  onValueChangedInSpineprescriptonForm(data?: any) {
    if (!this.spinePrescriptionForm) { return; }
    const form = this.spinePrescriptionForm;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.spinePrescriptionFormErrors) {
      // clear previous error message (if any)
      //console.log(`field: ${field}`);
      this.spinePrescriptionFormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        //console.log(`field: ${field}`);
        const messages = this.validationMessages[field];
        //console.log(messages);
        //console.log(control.errors);
        for (const key in control.errors) {
          //console.log(`key: ${key}`);
          this.spinePrescriptionFormErrors[field] += messages[key] + ' ';
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

  openSpineDiagModal(content) {
    // console.log('openSpineDiagModal');
    // console.log(content);
    this.spinePrescriptionForm.reset({
      curveType: this.curveTypeOptions[0],
      lumbarSpine: this.lumbarSpineOptions[0],
      sagittalAlignment: this.sagittalAlignmentOptions[1],
      risser: this.risserOptions[0],
      
      curveStart1: '',
      cobbAng1: null,
      curveEnd1: '',
      direction1: '',
      major1: 'y',
    });

    this.curve2Form.reset({
      curveStart2: '',
      cobbAng2: null,
      curveEnd2: '',
      direction2: '',
      major2: 'n',
    });
    
    this.curve3Form.reset({
      curveStart3: '',
      cobbAng3: null,
      curveEnd3: '',
      direction3: '',
      major3: 'n',
    });

    this.spineDiagModal = this.modalService.open(content, { size: 'lg' });
  }

  submitSpinePrescription() {
    console.log('Submit new body measurement');

    var spineInfo: any = {};

    let spInfo = this.spinePrescriptionForm.value;
    var type = spInfo.curveType + spInfo.lumbarSpine + spInfo.sagittalAlignment;

    spineInfo.type = type;
    spineInfo.risser = +spInfo.risser;

    spineInfo.curveStart1 = spInfo.curveStart1;
    spineInfo.cobbAng1 = +spInfo.cobbAng1;
    spineInfo.curveEnd1 = spInfo.curveEnd1;
    spineInfo.direction1 = spInfo.direction1;
    spineInfo.major1 = (spInfo.major1 === 'y') ? true : false;

    // console.log(`addCurve2: ${this.addCurve2}`);
    // console.log(this.curve2Form.value);
    
    // console.log(`addCurve3: ${this.addCurve3}`);
    // console.log(this.curve3Form.value);
    
    if (this.addCurve2) {
      let curve2Info = this.curve2Form.value;
      spineInfo.curveStart2 = curve2Info.curveStart2;
      spineInfo.cobbAng2 = +curve2Info.cobbAng2;
      spineInfo.curveEnd2 = curve2Info.curveEnd2;
      spineInfo.direction2 = curve2Info.direction2;
      spineInfo.major2 = (curve2Info.major2 === 'y') ? true : false;
    }

    if (this.addCurve3) {
      let curve3Info = this.curve3Form.value;
      spineInfo.curveStart3 = curve3Info.curveStart3;
      spineInfo.cobbAng3 = +curve3Info.cobbAng3;
      spineInfo.curveEnd3 = curve3Info.curveEnd3;
      spineInfo.direction3 = curve3Info.direction3;
      spineInfo.major3 = (curve3Info.major3 === 'y') ? true : false;
    }

    console.log(spineInfo);

    this.spineDiagModal.close();

    this.patientservice.postSpineDiag(this.patient._id, spineInfo)
    .subscribe((patient) => {
      // console.log('new body measurement');

      //this.patient = undefined;
      this.updatedPatient.emit(patient);

      // console.log(patient);
      
      // this.spineDiagModal.close();
      this.controlModalService.closeSpinePrescriptionModal();
    }, (errMsg) => {
      this.errMsg = <any>errMsg;
      console.log(errMsg);
    });
  }
}
