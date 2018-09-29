import { Component, OnInit, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Patient } from '../../../shared/patient';

import { PatientService } from '../../../services/patient.service';
import { ControlModalService } from '../service/control-modal.service';

@Component({
  selector: 'app-add-bodymeasurement-modal',
  templateUrl: './add-bodymeasurement-modal.component.html',
  styleUrls: ['./add-bodymeasurement-modal.component.scss']
})
export class AddBodymeasurementModalComponent implements OnInit {

  @Input() patient: Patient;

  @Output() updatedPatient = new EventEmitter<Patient>();

  @ViewChild('bodyMeasureModal')
  private modalRef: TemplateRef<any>;

  errMsg: string;
  bodyMeasureModal: NgbModalRef;

  bodyMeasureForm: FormGroup;
  bodyMeasureFormErrors = {
    'height': '',
    'weight': '',
    'shoulder': '',
    'bust': '',
    'waist': '',
    'hip': ''
  };

   validationMessages = {
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
    }
  };

  constructor(
    private modalService: NgbModal,
    private controlModalService: ControlModalService,
    private patientservice: PatientService,
    private fb: FormBuilder,
  ) {
    this.controlModalService.modal$.subscribe((modalMsg)=>{
      if (modalMsg === 'openBodymeasurModal') {
        console.log(modalMsg);
        this.openBodyMeasureModal(this.modalRef);
      } else if (modalMsg === 'closeBodymeasurModal') {
        this.bodyMeasureModal.close();
      }
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.bodyMeasureForm = this.fb.group({
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      shoulder: [null, [Validators.required, Validators.pattern]],
      bust: [null, [Validators.required, Validators.pattern]],
      waist: [null, [Validators.required, Validators.pattern]],
      hip: [null, [Validators.required, Validators.pattern]]//,
    });

    this.bodyMeasureForm.valueChanges
      .subscribe(data => this.bodyMeasureFormValueChanged(data));

    this.bodyMeasureFormValueChanged(); // (re)set from validation messages
  }

  bodyMeasureFormValueChanged(data?: any) {
    if (!this.bodyMeasureForm) { return; }
    const form = this.bodyMeasureForm;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.bodyMeasureFormErrors) {
      // clear previous error message (if any)
      //console.log(`field: ${field}`);
      this.bodyMeasureFormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        //console.log(`field: ${field}`);
        const messages = this.validationMessages[field];
        //console.log(messages);
        //console.log(control.errors);
        for (const key in control.errors) {
          //console.log(`key: ${key}`);
          this.bodyMeasureFormErrors[field] += messages[key] + ' ';
          //console.log(this.formErrors[field]);
        }
      }
    }
  }

  openBodyMeasureModal(content) {
    this.bodyMeasureForm.reset({
      height: null,
      weight: null,
      shoulder: null,
      bust: null,
      waist: null,
      hip: null
    });

    this.bodyMeasureModal = this.modalService.open(content, { size: 'lg' });
    // this.bodyMeasureModal = this.modalService.open(content, { size: 'sm' });
  }

  submitBodyMeasurement() {
    console.log('Submit new body measurement');
    let newBdInfo = this.bodyMeasureForm.value;
    // console.log(newBdInfo);
    this.patientservice.postBodyMeasurement(this.patient._id, newBdInfo)
    .subscribe((patient) => {
      // console.log('new body measurement');

      //this.patient = undefined;
      this.updatedPatient.emit(patient);

      // console.log(patient);
      
      this.bodyMeasureModal.close();
    }, (errMsg) => {
      this.errMsg = <any>errMsg;
      console.log(errMsg);
    });
  }
}
