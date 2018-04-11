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

  /**
   * columns {key: value}
   * key is a propterty of Patient object
   * value is its column name in a table
   */
  columns = {
    'hospital': 'Hospital',
    'name': 'Name',
    'birthday': 'Birthday',
    'height': 'Hegith',
    'weight': 'Weight',
    'sex': 'Sex',
    'type': 'Type',
    'risser': 'Risser',
    'apexStart1': 'Apex1',
    'apexStart2': 'Apex2',
    'apexStart3': 'Apex3',
    'visitDays': 'Visit Days'
  };

  orderColumns = {
    'hospital': false,
    'name': false,
    'birthday': false,
    'height': false,
    'weight': false,
    'sex': false,
    'type': false,
    'risser': false,
    'apexStart1': false,
    'apexStart2': false,
    'apexStart3': false,
    'visitDays': true
  }

  currentOrderCol: string;
  byDescentOrder: boolean;

  columnKeys: string[];
  columnNames: string[];


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

    this.columnKeys = Object.keys(this.columns);
    this.columnNames = Object.values(this.columns);
    
    this.currentOrderCol = 'visitDays';
    this.byDescentOrder = true;

    console.log(this.orderColumns);
    //console.log(this.columnKeys);
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  setOrder(column: string) {
    
    if (this.orderColumns[column]) {
      this.byDescentOrder = !(this.byDescentOrder);
    } else {
      this.orderColumns[this.currentOrderCol] = false;
      this.orderColumns[column] = true;
      this.byDescentOrder = true;
      this.currentOrderCol = column;
    }
    //console.log(column);
    //console.log(this.orderColumns);
    //console.log(this.byDescentOrder);
  }
}
