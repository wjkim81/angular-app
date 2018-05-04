import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Patient } from '../../shared/patient';
import { JWTResponse } from '../../shared/response';

import { PATIENTS } from '../../shared/patients';
import { PatientService } from '../../services/patient.service';

import { AuthService } from '../../services/auth.service';

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

  status: JWTResponse;

  constructor(
    //private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private location:Location,
    private patientService: PatientService,
    private authservice: AuthService,
    @Inject('BaseURL') private BaseURL
  ) {
    /*
    this.authservice.loadUserCredentials();
    if (!this.authservice.isAuthenticated) {
      this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigate(['/user-login']);
    }
    */

    console.log('user-home');
    this.authservice.validateUserCredentials((res, err) => {
      console.log('authservice.validateUserCredentials');
      console.log('res: ', res);
      console.log('err: ', err);
      if (err) {
        this.errMess = err;
      }
 
      console.log('authenticated: ', this.authservice.isAuthenticated);
      if (!this.authservice.isAuthenticated) {
        
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['/user-login']);
      } else {
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
    
    this.currentOrderCol = 'visitDays';
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
