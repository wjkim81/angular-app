import { Component, OnInit } from '@angular/core';

import { Patient } from '../../shared/patient';
import { PATIENTS } from '../../shared/patients';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  patients: Patient[];
  numAllPatients: number;
  numPatientsInTable: number;

  constructor() { }

  ngOnInit() {
    this.patients = PATIENTS;
    this.numAllPatients = 100;
    this.numPatientsInTable = this.patients.length;
  }

}
