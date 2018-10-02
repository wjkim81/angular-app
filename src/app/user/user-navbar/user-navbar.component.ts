import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../shared/services/auth.service';

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
    private authService: AuthService
  ) {
    /**
     * I thinks user and admin modules are lozy loaded,
     * variables in service cannot be shared between modules.
     */
    // this.authservice.getUsername().subscribe((username) => {
  //   this.authservice.getName().subscribe((name) => {
  //     console.log(name);
  //     this.user = name;
  //   });
  }

  ngOnInit() {
    this.user = this.authService.getNameFromStorage();
    this.navbarCollapsed = true;
  }

  logOut() {
    console.log('Log out');
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
