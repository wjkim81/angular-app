import { Component, OnInit, Input, Inject } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { Member } from '../../shared/member';

import { MemberService } from '../../services/member.service';
import { AuthService } from '../../services/auth.service';

import { PasswordValidation } from '../../services/password-validation';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  subjects: string[];
  types: string[];
  countries: string[];

  loggedUser: Member;
  contactForm: FormGroup;
  errMess: string;

  showContactInfo: boolean;

  contactFormErrors = {
    'phoneNum': '',
    'mobileNum': ''
  };

  validationMessages = {
    'phoneNum': {
      'required': 'Phone number is required.',
    },
    'mobileNum': {
      'required': 'Mobile number is required.',
    },
  };

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private memberService: MemberService,
    private authService: AuthService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;

    this.createForm();
    this.showContactInfo = false;

    this.authService.validateUserCredentials((res, err) => {
      console.log('authService.validateUserCredentials');
      // console.log('res: ', res);
      console.log('err: ', err);
      if (err) {
        this.errMess = err;
      }
 
      console.log('authenticated: ', this.authService.isAuthenticated);
      if (!this.authService.isAuthenticated) {
        
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['/user-login']);
      } else {
        console.log(res.member);
        this.loggedUser = res.member;
        console.log('Logged in')
      }
    });
  }

  createForm() {
    this.contactForm = this.fb.group({
      phoneNum: ['', Validators.required],
      mobileNum: ['', Validators.required]
    });

    this.contactForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set from validation messages
  }

  onValueChanged(data?: any) {
    if (!this.contactForm) { return; }
    const form = this.contactForm;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.contactFormErrors) {
      // clear previous error message (if any)
      this.contactFormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        const messages = this.validationMessages[field];
        //console.log(control.errors);
        for (const key in control.errors) {
          this.contactFormErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitContact() {
    var contact = this.contactForm.value;
    console.log(contact);

    //this.showMemberInfo = true;

    setTimeout(() => {
      
      this.contactForm.reset({
        phoneNum: '',
        mobileNum: ''
      });

      //this.showMemberInfo = false;
    }, 5000);
  }

  open(content) {
    this.modalService.open(content);
  }
}
