import { Component, OnInit } from '@angular/core';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  user: string;
  navbarCollapsed: boolean;

  constructor(
    private router: Router,
    private location:Location,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.user = 'test user';
    this.navbarCollapsed = true;
  }

  logOut() {
    console.log('Lot out');
    this.authservice.logOut();
    this.router.navigate(['user-login']);
  }
}
