import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { Member } from '../../shared/member';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cobb-angle',
  templateUrl: './cobb-angle.component.html',
  styleUrls: ['./cobb-angle.component.scss']
})
export class CobbAngleComponent implements OnInit {
  member = {username: '', password: '', remember: false};
  errMess: string;

  constructor(  
    private router: Router,
    private location: Location,
    private authservice: AuthService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
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
      this.errMess = err;
    });
  }
}
