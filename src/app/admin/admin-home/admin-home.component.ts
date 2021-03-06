import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Organization } from '../../shared/organization';
import { OrganizationService } from '../../services/organization.service';

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

  patientsInOrgs: Patient[];
  patientsInTable: Patient[];
  selectedPatients: Patient[];

  organizations: Organization[];
  //members: Member[];

  numAllPatients: number;
  numPatientsInTable: number;

  orgsErrMess: string;
  patientsErrMess: string;

  checkedOrgs: any;

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
    'curveStart1': 'Apex1',
    'curveStart2': 'Apex2',
    'curveStart3': 'Apex3',
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
    'curveStart1': false,
    'curveStart2': false,
    'curveStart3': false,
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
    private organizationService: OrganizationService,
    private patientService: PatientService,
    private authService: AuthService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    //this.patients = PATIENTS;
    //this.members = MEMBERS;

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

    this.organizationService.getOrganizations()
    .subscribe((orgs) => {
      this.organizations = orgs;

      this.checkedOrgs = {
        "checked": [],
        "orgsId": [],
        "checkedAll": true,
        "numChecked": orgs.length
      }

      for (var i = 0; i < orgs.length; i++) {
        this.checkedOrgs.checked.push(true);
        this.checkedOrgs.orgsId.push(orgs[i]._id);
      }
      
    }, (errMess) => {
      this.orgsErrMess = <any>errMess;
    })

    this.patientService.getPatientsBetweenForAdmin(this.dateStart.toISOString(), this.dateEnd.toISOString())
    .subscribe((patients) => {
      this.patients = patients;

      this.patientsInOrgs = this.patients;
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
      this.patientsErrMess = <any>errMess;
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
      this.patientsErrMess = <any>errMess;
    });
  }
  
  submitOptionFilter() {
    //this.patientsInTable = this.patients.filter((patient) => {
    this.patientsInTable = this.patientsInOrgs.filter((patient) => {
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

  checkAllOrgs() {
    //console.log(this.checkedOrgs.checkedAll);
    this.checkedOrgs.checkedAll = !this.checkedOrgs.checkedAll;
    for(var i = 0; i < this.checkedOrgs.checked.length; i++) {
      //console.log(this.checkedOrgs.checked[i]);
      this.checkedOrgs.checked[i] = this.checkedOrgs.checkedAll;
    }

    this.checkedOrgs.numChecked = this.getNumCheckedOrgs();
  }

  changeCheckedOrgs(i) {
    //console.log(i, ' is changed');
    //if (this.checkedOrgs.checked[i]) {
    //  console.log(i, ' is changed');
    //  this.checkedOrgs.checked[i] = !this.checkedOrgs.checked[i];
    //}
    this.checkedOrgs.checked[i] = !this.checkedOrgs.checked[i];
    //console.log(this.checkedOrgs);
    this.checkedOrgs.numChecked = this.getNumCheckedOrgs();

    /*
    if (this.checkedOrgs.numChecked === this.checkedOrgs.checked.length)
      this.checkedOrgs.checkedAll = true;
    else 
      this.checkedOrgs.checkedAll = false;
    */
  }

  getNumCheckedOrgs(): number {
    return this.checkedOrgs.checked.filter(checked => checked).length;
  }

  filterOrganizations() {
    this.patientsInOrgs = this.patients.filter((patient) => {
      //console.log('patient: ', patient.organization._id);
      var included = false;
      for (var i = 0; i < this.checkedOrgs.checked.length; i++ ) {
        if (this.checkedOrgs.checked[i]) {
          //console.log('checkedOrg: ', this.checkedOrgs.orgsId[i])
          if (patient.organization["_id"] === this.checkedOrgs.orgsId[i]) {
            included = true;
            break;
          }
        }
      }
        
      return included;
    });
    
    this.patientsInTable = this.patientsInOrgs;
    this.numPatientsInTable = this.patientsInTable.length;
  }
}
