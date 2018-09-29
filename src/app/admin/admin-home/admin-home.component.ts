import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Organization } from '../../shared/organization';
import { OrganizationService } from '../../services/organization.service';

import { Patient } from '../../shared/patient';
import { PatientService } from '../../services/patient.service';

import { AuthService } from '../../services/auth.service';
import { JWTResponse } from '../../shared/response';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { SEXES, PATIENT_TYPES, RISSERS } from '../../shared/patient-options';

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
  patientsSummary: any[];
  // numSpineInfos: number[];
  // numBodyMeasurements: number[];

  patientsInOrgs: Patient[];
  patientsInTable: Patient[];
  selectedPatients: Patient[];

  organizations: Organization[];

  numAllPatients: number;
  numPatientsInTable: number;

  orgsErrMsg: string;
  patientsErrMsg: string;

  checkedOrgs: any;

  optionFilterForm: FormGroup;

  dateStart: Date;
  dateEnd: Date;

  searchDateStart: Date;
  searchDateEnd: Date;
  status: JWTResponse;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private patientService: PatientService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    console.log('admin-home');
    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.sexOptions = SEXES;
    this.patientTypeOptions = PATIENT_TYPES;
    this.risserOptions = RISSERS;

    let dayDiff = (24*60*60*1000) * 7; // 7days difference

    this.dateEnd = new Date();
    this.dateStart = new Date();

    this.searchDateEnd = this.dateEnd;
    this.searchDateStart = this.dateStart;

    this.dateStart.setTime(this.dateEnd.getTime() - dayDiff);

    this.optionFilterForm = this.fb.group({
      'sex': '',
      'patientType': '',
      'risser': '',
      'stage': ''
    });

    this.organizationService.getOrganizations()
    .subscribe((orgs) => {
      this.organizations = orgs;

      this.checkedOrgs = {
        "checked": [],
        "orgsIds": [],
        "checkedAll": true,
        "numChecked": orgs.length
      }

      for (var i = 0; i < orgs.length; i++) {
        this.checkedOrgs.checked.push(true);
        this.checkedOrgs.orgsIds.push(orgs[i]._id);
      }
      
    }, (orgsErrMsg) => {
      this.orgsErrMsg = <any>orgsErrMsg;
    });

    // this.patientService.getPatientsBetweenForAdmin(this.dateStart.toISOString(), this.dateEnd.toISOString())
    this.patientService.getPatients()
    .subscribe((patients) => {
      this.summarizePatients(patients);
    }, (patientsErrMsg) => {
      this.patientsErrMsg = <any>patientsErrMsg;
    });
  }

  summarizePatients(patients: Patient[]) {
    this.patients = patients;
    
    this.numAllPatients = this.patients.length;
    this.numPatientsInTable = this.patients.length;

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
  }
  
  submitDateCondition() {
    this.dateStart = new Date(this.searchDateStart);
    this.dateEnd = new Date(this.searchDateEnd);
    // console.log(`submitDateCondition between ${this.dateStart} and ${this.dateEnd}`);
    this.patientService.getPatientsBetweenForAdmin(this.dateStart.toISOString(), this.dateEnd.toISOString())
    .subscribe((patients) => {
      this.summarizePatients(patients);
    }, (patientsErrMsg) => {
      this.patientsErrMsg = <any>patientsErrMsg;
    });
  }
  
  submitOptionFilter() {
    this.patientsInTable = this.patientsSummary.filter((patient) => {

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

      return included;
    });
    this.numPatientsInTable = this.patientsInTable.length;
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
          //console.log('checkedOrg: ', this.checkedOrgs.orgsIds[i])
          if (patient.organization["_id"] === this.checkedOrgs.orgsIds[i]) {
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
