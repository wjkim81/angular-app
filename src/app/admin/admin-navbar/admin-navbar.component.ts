import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  user: string;
  navbarCollapsed: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

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
