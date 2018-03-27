import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  user: string;
  navbarCollapsed: boolean;

  constructor() { }

  ngOnInit() {
    this.user = 'test user';
    this.navbarCollapsed = true;
  }

}
