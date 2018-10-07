import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})
export class RegistersComponent implements OnInit {

  page: number;

  constructor() { }

  ngOnInit() {
    this.page = 1;
  }

  changePageTo1() {
    // console.log('to page 1');
    if (this.page === 2) this.page = 1;
  }

  changePageTo2() {
    // console.log('to page 2');
    if (this.page === 1) this.page = 2;
  }
}
