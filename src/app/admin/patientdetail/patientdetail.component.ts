import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';

import { Patient } from '../../shared/patient';
import { PATIENTS } from '../../shared/patients';

import { PatientService } from '../../services/patient.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-patientdetail',
  templateUrl: './patientdetail.component.html',
  styleUrls: ['./patientdetail.component.scss']
})
export class PatientdetailComponent implements OnInit {

  patients: Patient[];
  patient: Patient;

  errMess: string;

  constructor(
    private patientservice: PatientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //console.log('patientdetail.component');
    this.patients = PATIENTS;

    this.route.params
      .switchMap((params: Params) => { return this.patientservice.getPatient(params['id']); })
      .subscribe(patient => { this.patient = patient }, errmess => this.errMess = <any>errmess);

    //console.log(this.patient);
  }

}
