import { Component, OnInit, Inject } from '@angular/core';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  member = {username: '', password: '', remember: false};
  loginErrMsg: string;

  constructor(
    private router: Router,
    private location: Location,
    private authservice: AuthService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
  }

  doLogin() {
    console.log('login');
    console.log("Member: ", this.member);
    this.authservice.logIn(this.member)
    .subscribe(res => {
      console.log('login success:', res.success);
      if (res.success) {
        //console.log('getToken: ', this.authservice.getToken());
        this.router.navigate(['/home']);
        //this.dialogRef.close(res.success);
      }
      else {
        console.log(res);
      }
    }, (err) => {
      console.log('login err: ', err);
      this.loginErrMsg = err;
    });
  }
}
