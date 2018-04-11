import { Component, OnInit } from '@angular/core';

import { Patient } from '../../shared/patient';
import { PATIENTS } from '../../shared/patients';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { SEXES, PATIENT_TYPES, RISSERS, STAGES } from '../../shared/patient-options';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  subjects: string[];
  types: string[];
  countries: string[];

  sexes: string[];
  patient_types: string[];
  rissers: number[];
  stages: string[];


  patients: Patient[];
  numAllPatients: number;
  numPatientsInTable: number;

  constructor() { }

  ngOnInit() {
    this.patients = PATIENTS;

    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.sexes = SEXES;
    this.patient_types = PATIENT_TYPES;
    this.rissers = RISSERS;
    this.stages = STAGES;


    this.numAllPatients = 100;
    this.numPatientsInTable = this.patients.length;
  }

}
