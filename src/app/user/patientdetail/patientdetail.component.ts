import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';

import { Patient } from '../../shared/models/patient';

import { PatientService } from '../../shared/services/patient.service';
import { ControlModalService } from './service/control-modal.service';
import { AwsService } from '../../shared/services/aws.service';

@Component({
  selector: 'app-patientdetail',
  templateUrl: './patientdetail.component.html',
  styleUrls: ['./patientdetail.component.scss']
})
export class PatientdetailComponent implements OnInit {

  patient: Patient;
  curveProgression: number;

  xRayPath: string;

  patientErrMsg: string;

  disableOrderButton: boolean;

  constructor(
    private route: ActivatedRoute,
    private controlModalService: ControlModalService,
    private patientservice: PatientService,
    private awsService: AwsService

  ) { }

  ngOnInit() {
    this.disableOrderButton = true;

    this.route.params
      .switchMap((params: Params) => { return this.patientservice.getPatient(params['id']); })
      .subscribe(patient => { 
        this.patient = patient; console.log('patient: ', patient)

        if (patient.spineInfos.length > 0) {
          let lastIdx = patient.spineInfos.length - 1;
          var cobbAng: number;
          if (patient.spineInfos[lastIdx].major1) cobbAng = patient.spineInfos[lastIdx].cobbAng1;
          else if (patient.spineInfos[lastIdx].major2) cobbAng = patient.spineInfos[lastIdx].cobbAng2;
          else if (patient.spineInfos[lastIdx].major3) cobbAng = patient.spineInfos[lastIdx].cobbAng3;

          var ageDifMs = Date.now() - Date.parse(patient.birthday);
          var ageDate = new Date(ageDifMs);
          var ageYear = Math.abs(ageDate.getUTCFullYear() - 1970);
          console.log(`age: ${ageYear}`);
          this.curveProgression = (cobbAng - 3 * patient.spineInfos[lastIdx].risser) / ageYear;
        }


        /**
         * When only there are both body measurement and spine prescription
         * we activate order button
         */
        if (patient.bodyMeasurements.length > 0 && patient.spineInfos.length > 0)
          this.disableOrderButton = false;

        if (patient.xRayFiles.length > 0) {
          let lastIdx = patient.xRayFiles.length - 1;
          this.xRayPath = this.awsService.getFullPathName(patient.xRayFiles[lastIdx].filePath);
        }

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
