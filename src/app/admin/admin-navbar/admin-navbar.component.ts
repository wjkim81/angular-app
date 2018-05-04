import { Component, OnInit } from '@angular/core';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  admin: string;
  navbarCollapsed: boolean;

  constructor(
    private router: Router,
    private location:Location,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.admin = 'test admin';
    this.navbarCollapsed = true;
  }

  logOut() {
    console.log('Lot out');
    //this.authservice.logOut();
    //this.router.navigate(['user-login']);
  }
}
