import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Patient } from '../../shared/patient';

import { PATIENTS } from '../../shared/patients';
import { PatientService } from '../../services/patient.service';

import { AuthService } from '../../services/auth.service';
import { JWTResponse } from '../../shared/response';

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
  patientTypes: string[];
  rissers: number[];
  stages: string[];

  patients: Patient[];
  numSpineInfos: number[];
  numBodyMeasurements: number[];
  numVisited: number[];

  patientsInTable: Patient[];
  selectedPatients: Patient[];

  numAllPatients: number;
  numPatientsInTable: number;

  errMess: string;

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

  columnKeys: string[];
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
        this.errMess = err;
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
    this.stages = STAGES;

    
    this.columnKeys = Object.keys(this.columns);
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
    })
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
