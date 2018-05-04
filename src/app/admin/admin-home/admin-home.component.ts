import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Patient } from '../../shared/patient';
import { PatientService } from '../../services/patient.service';

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
  patientTypes: string[];
  rissers: number[];
  stages: string[];

  patients: Patient[];
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
    'organization': false,
    'patientId': false,
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
  ascend: boolean;

  columnKeys: string[];
  columnNames: string[];

  searchDateStart: Date;
  searchDateEnd: Date;
  today: Date;
  //searchDateStartStr: string;
  //searchDateEndStr: string;


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private patientService: PatientService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    //this.patients = PATIENTS;
    this.members = MEMBERS;

    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.sexes = SEXES;
    this.patientTypes = PATIENT_TYPES;
    this.rissers = RISSERS;
    this.stages = STAGES;

    
    this.columnKeys = Object.keys(this.columns);
    this.columnNames = Object.values(this.columns);
    
    this.currentOrderCol = 'visitDays';
    this.ascend = false;

    console.log(this.orderColumns);
    //console.log(this.columnKeys);

    let dayDiff = (24*60*60*1000) * 7; // 7days difference
    //this.searchDateStart = new Date();
    this.searchDateEnd = new Date();
    this.searchDateStart = new Date();
    this.today = new Date();
    this.searchDateStart.setTime(this.searchDateEnd.getTime() - dayDiff);

    /*
    this.dateFilterForm = this.fb.group({
      'searchDateStart': this.searchDateStart,
      'searchDateEnd': this.searchDateEnd
    });
    */
    this.optionFilterForm = this.fb.group({
      'sex': '',
      'patientType': '',
      'risser': '',
      'stage': ''
    })

    console.log(this.searchDateStart.toISOString());

/*
    this.patientService.getPatients()
    .subscribe((patients) => {
      console.log(patients);
      this.patients = patients;
      this.patientsInTable = this.patients;
      this.numAllPatients = this.patients.length;
      this.numPatientsInTable = this.patientsInTable.length;
    }, (errMess) => {
      this.errMess = <any>errMess
    });
    */
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
        patient.spineInfos[numSpineInfos-1].risser = this.optionFilterForm.value.risser;
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
