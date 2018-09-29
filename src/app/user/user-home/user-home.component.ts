import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Patient, SpineInfo } from '../../shared/patient';

// import { PATIENTS } from '../../shared/patients';
import { PatientService } from '../../services/patient.service';

import { AuthService } from '../../services/auth.service';
import { JWTResponse } from '../../shared/response';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { SEXES, PATIENT_TYPES, RISSERS } from '../../shared/patient-options';

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
  patientTypes: string[];
  rissers: number[];
  stages: string[];

  patients: Patient[];
  patientsSummary: any[];
  numSpineInfos: number[];
  // numBodyMeasurements: number[];
  // numVisited: number[];

  patientsInTable: Patient[];
  selectedPatients: Patient[];

  numAllPatients: number;
  numPatientsInTable: number;

  patientErrMsg: string;

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
    //'organization': 'Organization',
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
    'updatedAt': 'Last day'
  };

  orderColumns = {
    //'organization': false,
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

  // columnKeys: string[];
  columnNames: string[];

  searchDateStart: Date;
  searchDateEnd: Date;
  today: Date;

  status: JWTResponse;

  constructor(
    //private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private location:Location,
    private patientService: PatientService,
    private authService: AuthService,
    @Inject('BaseURL') private BaseURL
  ) {
    /*
    this.authService.loadUserCredentials();
    if (!this.authService.isAuthenticated) {
      this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigate(['/user-login']);
    }
    */

   
    console.log('user-home');
    this.authService.validateUserCredentials((res, err) => {
      console.log('authService.validateUserCredentials');
      console.log('res: ', res);
      console.log('err: ', err);
      if (err) {
        this.patientErrMsg = err;
      }
 
      console.log('authenticated: ', this.authService.isAuthenticated);
      if (!this.authService.isAuthenticated) {
        
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['/user-login']);
      } else {
        console.log(res.member);
        console.log('Logged in')
      }
    });
  }

  ngOnInit() {
    //this.patients = PATIENTS;

    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.sexes = SEXES;
    this.patientTypes = PATIENT_TYPES;
    this.rissers = RISSERS;
    
    // this.columnKeys = Object.keys(this.columns);
    this.columnNames = Object.values(this.columns);
    
    this.currentOrderCol = 'updatedAt';
    this.ascend = false;

    //console.log(this.orderColumns);
    //console.log(this.columnKeys);

    let dayDiff = (24*60*60*1000) * 7; // 7days difference
    //this.searchDateStart = new Date();
    this.searchDateEnd = new Date();
    this.searchDateStart = new Date();
    this.today = new Date();
    this.searchDateStart.setTime(this.searchDateEnd.getTime() - dayDiff);

    this.optionFilterForm = this.fb.group({
      'sex': '',
      'patientType': '',
      'risser': '',
      'stage': ''
    })

    console.log(this.searchDateStart.toISOString());
    //this.patientService.getPatients()
    this.patientService.getPatientsBetween(this.searchDateStart.toISOString(), this.searchDateEnd.toISOString())
    .subscribe((patients) => {
      this.patients = patients;
      
      this.numAllPatients = this.patients.length;
      this.numPatientsInTable = this.patients.length;

      // this.numSpineInfos = this.patients.map((patient) => patient.spineInfos.length);
      this.patientsSummary = [];

      for (var i = 0; i < this.patients.length; i++) {
        var patient: any = {};
        patient._id = this.patients[i]._id;
        patient.hashKey = this.patients[i].hashKey;
        patient.firstname = this.patients[i].firstname;
        patient.lastname = this.patients[i].lastname;
        patient.birthday = this.patients[i].birthday;
        patient.sex = this.patients[i].sex;
        
        if (this.patients[i].spineInfos.length > 0) {
          let numSpineInfos = this.patients[i].spineInfos.length;
          patient.type = this.patients[i].spineInfos[numSpineInfos - 1].type;
          patient.risser = this.patients[i].spineInfos[numSpineInfos - 1].risser;
          patient.curve1 = `${this.patients[i].spineInfos[numSpineInfos - 1].curveStart1}-${this.patients[i].spineInfos[numSpineInfos - 1].cobbAng1}-${this.patients[i].spineInfos[numSpineInfos - 1].curveEnd1} ${this.patients[i].spineInfos[numSpineInfos - 1].direction1} ${this.patients[i].spineInfos[numSpineInfos - 1].major1 ? 'M' : 'm'}`;
          if (this.patients[i].spineInfos[numSpineInfos - 1].curveStart2) {
            patient.curve2 = `${this.patients[i].spineInfos[numSpineInfos - 1].curveStart2}-${this.patients[i].spineInfos[numSpineInfos - 1].cobbAng2}-${this.patients[i].spineInfos[numSpineInfos - 1].curveEnd2} ${this.patients[i].spineInfos[numSpineInfos - 1].direction2} ${this.patients[i].spineInfos[numSpineInfos - 1].major2 ? 'M' : 'm'}`;
          } else {
            patient.curve2 = '';
          }

          if (this.patients[i].spineInfos[numSpineInfos - 1].curveStart3) {
            patient.curve3 = `${this.patients[i].spineInfos[numSpineInfos - 1].curveStart3}-${this.patients[i].spineInfos[numSpineInfos - 1].cobbAng3}-${this.patients[i].spineInfos[numSpineInfos - 1].curveEnd3} ${this.patients[i].spineInfos[numSpineInfos - 1].direction3} ${this.patients[i].spineInfos[numSpineInfos - 1].major3 ? 'M' : 'm'}`;
          } else {
            patient.curve3 = '';
          }
          
        }

        patient.updatedAt = this.patients[i].updatedAt;
        this.patientsSummary.push(patient);
      }

      this.patientsInTable = this.patientsSummary;

      // this.numBodyMeasurements = this.patients.map((patient) => patient.bodyMeasurements.length);
      // this.numVisited = this.patients.map((patient) => patient.visitedDays.length);
      // console.log(this.numSpineInfos);
      // console.log(this.numBodyMeasurements);
      // console.log(this.numVisited);
    }, (patientErrMsg) => {
      this.patientErrMsg = <any>patientErrMsg;
    })
  }

  submitOptionFilter() {
    this.patientsInTable = this.patientsSummary.filter((patient) => {
      // console.log(patient);
      // var numSpineInfos = patient.spineInfos.length;
      var included = true;
      if (this.optionFilterForm.value.sex !== '') {
        if (patient.sex != this.optionFilterForm.value.sex) included = false;
      }
      
      if (this.optionFilterForm.value.patientType !== '') {
        if (patient.type != this.optionFilterForm.value.patientType) included = false;
      }
      
      if (this.optionFilterForm.value.risser !== '') {
        if (patient.risser != this.optionFilterForm.value.risser) included = false;
      }
/*
      if (this.optionFilterForm.value.stage !== '') {
        if (patient.stage != this.optionFilterForm.value.stage) included = false;
      }
*/
      return included;
    });
    this.numPatientsInTable = this.patientsInTable.length;
    //console.log(this.membersInTable);
  }

}
