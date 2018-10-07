import { Component, OnInit, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Patient } from '../../../shared/models/patient';

import { PatientService } from '../../../shared/services/patient.service';
import { ControlModalService } from '../service/control-modal.service';

@Component({
  selector: 'app-add-diagnosis-modal',
  templateUrl: './add-diagnosis-modal.component.html',
  styleUrls: ['./add-diagnosis-modal.component.scss']
})
export class AddDiagnosisModalComponent implements OnInit {

  @Input() patient: Patient;

  @Output() updatedPatient = new EventEmitter<Patient>();

  @ViewChild('diagnosisModal')
  private modalRef: TemplateRef<any>;

  errMsg: string;

  diagnosisModal: NgbModalRef;

  diagnosisForm: FormGroup;
  diagnosisFormErrors = {
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required': "Comment is required.",
    },
  }

  constructor(
    private modalService: NgbModal,
    private controlModalService: ControlModalService,
    private patientservice: PatientService,
    private fb: FormBuilder,
  ) {
    this.controlModalService.modal$.subscribe((modalMsg)=>{
      if (modalMsg === 'openDiagnosisModal') {
        console.log(modalMsg);
        this.openDiagnosisModal(this.modalRef);
      } else if (modalMsg === 'closeDiagnosisModal') {
        // this.diagnosisModal.close();
      }
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.diagnosisForm = this.fb.group({
      comment: ['', [Validators.required]],
    });

    this.diagnosisForm.valueChanges
      .subscribe(data => this.diagnosisFormValueChanged(data));

    this.diagnosisFormValueChanged(); // (re)set from validation messages
  }

  diagnosisFormValueChanged(data?: any) {
    if (!this.diagnosisForm) { return; }
    const form = this.diagnosisForm;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.diagnosisFormErrors) {
      // clear previous error message (if any)
      //console.log(`field: ${field}`);
      this.diagnosisFormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        //console.log(`field: ${field}`);
        const messages = this.validationMessages[field];
        //console.log(messages);
        //console.log(control.errors);
        for (const key in control.errors) {
          //console.log(`key: ${key}`);
          this.diagnosisFormErrors[field] += messages[key] + ' ';
          //console.log(this.formErrors[field]);
        }
      }
    }
  }

  openDiagnosisModal(content) {
    // console.log(content);
    this.diagnosisForm.reset({
      comment: null,
    });

    this.diagnosisModal = this.modalService.open(content, { size: 'lg' });
  }

  submitDiagnosis() {
    console.log('Submit new diagnosis');

    let newComment: any = {
      comment: this.diagnosisForm.value.comment
    };

    // console.log(newComment);

    this.patientservice.postComment(this.patient._id, newComment)
    .subscribe((patient) => {
      // console.log('new body measurement');

      //this.patient = undefined;
      this.updatedPatient.emit(patient);

      // console.log(patient);
      // this.diagnosisModal.close();
      this.controlModalService.closeDiagnosisModal();
    }, (errMsg) => {
      this.errMsg = <any>errMsg;
      console.log(errMsg);
    });
  }
}
