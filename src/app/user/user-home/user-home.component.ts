import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Patient } from '../../shared/models/patient';

import { PatientService } from '../../shared/services/patient.service';

import { AuthService } from '../../shared/services/auth.service';
import { JWTResponse } from '../../shared/models/response';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/models/member-options';
import { SEXES, PATIENT_TYPES, RISSERS } from '../../shared/models/patient-options';

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

  patientsInTable: Patient[];
  selectedPatients: Patient[];

  numAllPatients: number;
  numPatientsInTable: number;

  patientsErrMsg: string;

  optionFilterForm: FormGroup;

  searchDateStart: Date;
  searchDateEnd: Date;
  dateStart: Date;
  dateEnd: Date;

  status: JWTResponse;

  constructor(
    //private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private location:Location,
    private patientService: PatientService,
    private authService: AuthService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.sexes = SEXES;
    this.patientTypes = PATIENT_TYPES;
    this.rissers = RISSERS;

    let dayDiff = (24*60*60*1000) * 7; // 7days difference

    this.searchDateEnd = new Date();
    this.searchDateStart = new Date();
    
    this.searchDateStart.setTime(this.searchDateEnd.getTime() - dayDiff);

    this.optionFilterForm = this.fb.group({
      'sex': '',
      'patientType': '',
      'risser': '',
      'stage': ''
    })

    // console.log(this.searchDateStart.toISOString());
    //this.patientService.getPatients()
    this.patientService.getPatientsBetween(this.searchDateStart.toISOString(), this.searchDateEnd.toISOString())
    .subscribe((patients) => {
      console.log(patients);
      this.summarizePatients(patients);
    }, (patientsErrMsg) => {
      this.patientsErrMsg = <any>patientsErrMsg;
    });
  }

  summarizePatients(patients: Patient[]) {
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
  }

  submitDateCondition() {
    this.dateStart = new Date(this.searchDateStart);
    this.dateEnd = new Date(this.searchDateEnd);
    console.log(`submitDateCondition between ${this.dateStart} and ${this.dateEnd}`);
    this.patientService.getPatientsBetweenForAdmin(this.dateStart.toISOString(), this.dateEnd.toISOString())
    .subscribe((patients) => {
      this.summarizePatients(patients);
    }, (patientsErrMsg) => {
      this.patientsErrMsg = <any>patientsErrMsg;
    });
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
