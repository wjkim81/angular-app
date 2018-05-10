import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Patient } from '../../shared/patient';
import { PatientService } from '../../services/patient.service';

import { Member } from '../../shared/member';
import { PATIENTS } from '../../shared/patients';
import { MEMBERS } from '../../shared/members';

import { AuthService } from '../../services/auth.service';
import { JWTResponse } from '../../shared/response';

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

  sexOptions: string[];
  patientTypeOptions: string[];
  risserOptions: number[];
  stageOptions: string[];

  patients: Patient[];
  numSpineInfos: number[];
  numBodyMeasurements: number[];
  numVisited: number[];

  patientsInTable: Patient[];
  selectedPatients: Patient[];

  members: Member[];

  numAllPatients: number;
  numPatientsInTable: number;

  errMess: string;

  // Testing with modal
  closeResult: string;

  /**
   * Filter option form
   */
  //dateFilterForm: FormGroup;
  optionFilterForm: FormGroup;

  /**
   * columns {key: value}
   * key is a propterty of Patient object
   * value is its column name in a table
   */
  columns = {
    'organization': 'Organization',
    'patientId': 'Patient ID',
    'firstname': 'First Name',
    'lastname': 'Last Name',
    'birthday': 'Birthday',
    'sex': 'Sex',
    'type': 'Type',
    'risser': 'Risser',
    'stage': 'Stage',
    'apexStart1': 'Apex1',
    'apexStart2': 'Apex2',
    'apexStart3': 'Apex3',
    //'firstday': 'First Day',
    'updatedAt': 'Last Update'
  };

  orderColumns = {
    'organization': false,
    'patientId': false,
    'firstname': false,
    'lastname': false,
    'birthday': false,
    'sex': false,
    'type': false,
    'risser': false,
    'stage': false,
    'apexStart1': false,
    'apexStart2': false,
    'apexStart3': false,
    'updateAt': false
  }

  currentOrderCol: string;
  ascend: boolean;

  columnKeys: string[];
  columnNames: string[];

  dateStart: Date;
  dateEnd: Date;
  today: Date;
  searchDateStart: Date;
  searchDateEnd: Date;
  status: JWTResponse;


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private location:Location,
    private patientService: PatientService,
    private authService: AuthService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    //this.patients = PATIENTS;
    this.members = MEMBERS;

    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.sexOptions = SEXES;
    this.patientTypeOptions = PATIENT_TYPES;
    this.risserOptions = RISSERS;
    this.stageOptions = STAGES;

    
    this.columnKeys = Object.keys(this.columns);
    this.columnNames = Object.values(this.columns);
    
    this.currentOrderCol = 'updatedAt';
    this.ascend = false;

    console.log(this.orderColumns);
    //console.log(this.columnKeys);

    let dayDiff = (24*60*60*1000) * 7; // 7days difference
    //this.dateStart = new Date();
    this.dateEnd = new Date();
    this.dateStart = new Date();
    this.searchDateEnd = this.dateEnd;
    this.searchDateStart = this.dateStart;
    this.today = new Date();
    this.dateStart.setTime(this.dateEnd.getTime() - dayDiff);

    /*
    this.dateFilterForm = this.fb.group({
      'dateStart': this.dateStart,
      'dateEnd': this.dateEnd
    });
    */
    this.optionFilterForm = this.fb.group({
      'sex': '',
      'patientType': '',
      'risser': '',
      'stage': ''
    })

    console.log(this.dateStart.toISOString());

    this.patientService.getPatientsBetweenForAdmin(this.dateStart.toISOString(), this.dateEnd.toISOString())
    .subscribe((patients) => {
      this.patients = patients;
      this.patientsInTable = this.patients;
      this.numAllPatients = this.patients.length;
      this.numPatientsInTable = this.patients.length;

      this.numSpineInfos = this.patients.map((patient) => patient.spineInfos.length);
      this.numBodyMeasurements = this.patients.map((patient) => patient.bodyMeasurements.length);
      this.numVisited = this.patients.map((patient) => patient.visitedDays.length);
      console.log(this.numSpineInfos);
      console.log(this.numBodyMeasurements);
      console.log(this.numVisited);
    }, (errMess) => {
      this.errMess = <any>errMess;
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  setOrder(column: string) {
    
    if (this.orderColumns[column]) {
      this.ascend = !(this.ascend);
    } else {
      this.orderColumns[this.currentOrderCol] = false;
      this.orderColumns[column] = true;
      this.ascend = true;
      this.currentOrderCol = column;
    }
    //console.log(column);
    //console.log(this.orderColumns);
    //console.log(this.ascend);
  }
  
  submitDateCondition() {
    this.dateStart = new Date(this.searchDateStart);
    this.dateEnd = new Date(this.searchDateEnd);
    console.log(`submitDateCondition between ${this.dateStart} and ${this.dateEnd}`);
    this.patientService.getPatientsBetweenForAdmin(this.dateStart.toISOString(), this.dateEnd.toISOString())
    .subscribe((patients) => {
      this.patients = patients;
      this.patientsInTable = this.patients;
      this.numAllPatients = this.patients.length;
      this.numPatientsInTable = this.patients.length;

      this.numSpineInfos = this.patients.map((patient) => patient.spineInfos.length);
      this.numBodyMeasurements = this.patients.map((patient) => patient.bodyMeasurements.length);
      this.numVisited = this.patients.map((patient) => patient.visitedDays.length);
      console.log(this.numSpineInfos);
      console.log(this.numBodyMeasurements);
      console.log(this.numVisited);
    }, (errMess) => {
      this.errMess = <any>errMess;
    });
  }
  
  submitOptionFilter() {
    this.patientsInTable = this.patients.filter((patient) => {
      var numSpineInfos = patient.spineInfos.length;
      var included = true;
      if (this.optionFilterForm.value.sex !== '') {
        if (patient.sex != this.optionFilterForm.value.sex) included = false;
      }
      
      if (this.optionFilterForm.value.patientType !== '') {
        if (patient.spineInfos[numSpineInfos-1].type != this.optionFilterForm.value.patientType) included = false;
      }
      
      if (this.optionFilterForm.value.risser !== '') {
        if (patient.spineInfos[numSpineInfos-1].risser != this.optionFilterForm.value.risser) included = false;
      }
/*
      if (this.optionFilterForm.value.stage !== '') {
        if (patient.stage != this.optionFilterForm.value.stage) included = false;
      }
*/
      //console.log(member);
      return included;
    });
    this.numPatientsInTable = this.patientsInTable.length;
    //console.log(this.membersInTable);
  }
}
