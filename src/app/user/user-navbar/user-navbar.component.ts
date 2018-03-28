import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  user: string;
  navbarCollapsed: boolean;

  constructor() { }

  ngOnInit() {
    this.user = 'test user';
    this.navbarCollapsed = true;
  }
}
