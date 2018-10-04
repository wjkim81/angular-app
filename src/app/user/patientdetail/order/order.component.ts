import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';

import { Patient } from '../../../shared/models/patient';
import { PatientService } from '../../../shared/services/patient.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  patient: Patient;
  spineInfoIdx: number;

  braceSize: string;
  braceDirection: string;

  patientErrMsg: string;
  constructor(
    private patientservice: PatientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => { return this.patientservice.getPatient(params['id']); })
      .subscribe(patient => { 
        this.patient = patient;

        this.spineInfoIdx = patient.spineInfos.length - 1;
        console.log('patient: ', patient)
        console.log('spineInfoIdx: ', this.spineInfoIdx);

        /**
         * Size condition
         * Only bust measurement counts
         * 52 - 69 : XS
         * 70 - 81 : S
         * 82 - 93 : M
         * 94 - 101 : L
         */
        let bustSize = patient.bodyMeasurements[patient.bodyMeasurements.length - 1].bust;
        if (bustSize >= 52 && bustSize <= 69)
          this.braceSize = 'XS';
        else if (bustSize > 69 && bustSize <= 81)
          this.braceSize = 'S';
        else if (bustSize > 81 && bustSize <= 93)
          this.braceSize = 'M';
        else if (bustSize > 93 && bustSize <= 101)
          this.braceSize = 'L';
        else
          this.braceSize = 'N/A'

        /**
         * Direction condition depends on major curve and its direction.
         */
        if (patient.spineInfos[this.spineInfoIdx].major1 && patient.spineInfos[this.spineInfoIdx].direction1 === 'Right')
          this.braceDirection = 'Right';
        else if (patient.spineInfos[this.spineInfoIdx].major1 && patient.spineInfos[this.spineInfoIdx].direction1 === 'Left')
          this.braceDirection = 'Left';
        else if (patient.spineInfos[this.spineInfoIdx].major2 && patient.spineInfos[this.spineInfoIdx].direction2 === 'Right')
          this.braceDirection = 'Right';
        else if (patient.spineInfos[this.spineInfoIdx].major2 && patient.spineInfos[this.spineInfoIdx].direction2 === 'Left')
          this.braceDirection = 'Left';
        else if (patient.spineInfos[this.spineInfoIdx].major3 && patient.spineInfos[this.spineInfoIdx].direction3 === 'Right')
          this.braceDirection = 'Right';
        else if (patient.spineInfos[this.spineInfoIdx].major3 && patient.spineInfos[this.spineInfoIdx].direction3 === 'Left')
          this.braceDirection = 'Left';

      }, patientErrMsg => {
        this.patientErrMsg = <any>patientErrMsg
      });
  }

}
