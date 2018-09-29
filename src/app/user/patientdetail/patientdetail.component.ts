import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';

import { Patient } from '../../shared/patient';

import { PatientService } from '../../services/patient.service';
import { ControlModalService } from './service/control-modal.service';

@Component({
  selector: 'app-patientdetail',
  templateUrl: './patientdetail.component.html',
  styleUrls: ['./patientdetail.component.scss']
})
export class PatientdetailComponent implements OnInit {

  patient: Patient;

  patientErrMsg: string;

  constructor(
    private controlModalService: ControlModalService,
    private patientservice: PatientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => { return this.patientservice.getPatient(params['id']); })
      .subscribe(patient => { 
        this.patient = patient; console.log('patient: ', patient)
      }, patientErrMsg => {
        this.patientErrMsg = <any>patientErrMsg
      });
  }

  openBodyMeasureModal() {
    this.controlModalService.openBodyMeasurementModal();
  }

  openSpineDiagModal() {
    this.controlModalService.openSpinePrescriptionModal();
  }

  openDiagnosisModal() {
    this.controlModalService.openDiagnosisModal();
  }

  orderBrace() {
    console.log("orderBrace()");
  }

  updatePatient(patient: Patient) {
    this.patient = patient;
  }
}
