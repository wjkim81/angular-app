import { Component, OnInit } from '@angular/core';
import { Patient } from '../../shared/patient';
import { PATIENTS } from '../../shared/patients';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

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
