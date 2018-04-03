import { Component, OnInit } from '@angular/core';

import { Patient } from '../../shared/patient';
import { Member } from '../../shared/member';
import { PATIENTS } from '../../shared/patients';
import { MEMBERS } from '../../shared/members';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';

@Component({
  selector: 'app-list-hoispitals',
  templateUrl: './list-hoispitals.component.html',
  styleUrls: ['./list-hoispitals.component.scss']
})
export class ListHoispitalsComponent implements OnInit {

  subjects: string[];
  types: string[];
  countries: string[];
  
  members: Member[];

  numAllPatients: number;

  constructor() { }

  ngOnInit() {
    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.members = MEMBERS;

    this.numAllPatients = PATIENTS.length;
  }

}
