import { Component, OnInit } from '@angular/core';


import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Patient } from '../../shared/patient';
import { Member } from '../../shared/member';
import { PATIENTS } from '../../shared/patients';
import { MEMBERS } from '../../shared/members';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { SEXES, PATIENT_TYPES, RISSERS, STAGES } from '../../shared/patient-options';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  subjects: string[];
  types: string[];
  countries: string[];

  sexes: string[];
  patient_types: string[];
  rissers: number[];
  stages: string[];

  patients: Patient[];
  selectedPatients: Patient[];

  members: Member[];

  numAllPatients: number;
  numPatientsInTable: number;


  // Testing with modal
  closeResult: string;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.patients = PATIENTS;
    this.members = MEMBERS;

    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.sexes = SEXES;
    this.patient_types = PATIENT_TYPES;
    this.rissers = RISSERS;
    this.stages = STAGES;

    this.numAllPatients = this.patients.length;
    this.numPatientsInTable = this.patients.length;

    //console.log(MEMBERS);
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
