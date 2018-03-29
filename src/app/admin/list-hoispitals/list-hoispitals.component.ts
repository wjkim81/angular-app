import { Component, OnInit } from '@angular/core';

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
  
  numAllPatients: number;
  numAllHospitals: number;

  constructor() { }

  ngOnInit() {
    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.numAllPatients = 100;
    this.numAllHospitals = 5;
  }

}
