import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-hoispitals',
  templateUrl: './list-hoispitals.component.html',
  styleUrls: ['./list-hoispitals.component.scss']
})
export class ListHoispitalsComponent implements OnInit {

  numAllPatients: number;
  numAllHospitals: number;

  constructor() { }

  ngOnInit() {
    this.numAllPatients = 100;
    this.numAllHospitals = 5;
  }

}
