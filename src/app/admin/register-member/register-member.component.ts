import { Component, OnInit, Input, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { Member } from '../../shared/member';

import { PasswordValidation } from '../../services/password-validation';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.scss']
})
export class RegisterMemberComponent implements OnInit {

  subjects: string[];
  types: string[];
  countries: string[];

  newMember: Member;
  memberForm: FormGroup;
  errMess: string;

  showMemberInfo: boolean;

  formErrors = {
    'username': '',
    'password': '',
    'confirmPassword': '',
    'firstname': '',
    'lastname': '',
    'type': '',
    'subject': '',
    'country': '',
    'city': '',
    'address': '',
    'phoneNum': '',
    'mobileNum': ''
  };

  /**
   * id = username
   * username is used for passport in express.js
   * 
   */
   validationMessages = {
    'username': {
      'required': 'ID is required.',
      'minlength': 'ID must be at least 4 characters long.',
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password must be less than 25 characters long.'
    },
    'confirmPassword': {
      'required': 'Confirm Password is required.',
      'MatchPassword': 'Password should match.',
    },
    'firstname': {
      'required': 'First name is required.',
    },
    'lastname': {
      'required': 'Last name is required.',
    },
    'type': {
      'required': 'Type is required.',
    },
    'subject': {
      'required': 'Subject is required.',
    },
    'country': {
      'required': 'Country is required.',
    },
    'city': {
      'required': 'City is required.',
    },
    'address': {
      'required': 'Address is required.',
    },
    'phoneNum': {
      'required': 'Phone number is required.',
    },
    'mobileNum': {
      'required': 'Mobile number is required.',
    },
  };
  
  constructor(
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;
    //console.log(this.subjects);

    //console.log(this.BaseURL);
    this.createForm();
    this.showMemberInfo = false;
  }

  createForm() {
    this.memberForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4) ]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25) ]],
      confirmPassword: ['', [Validators.required]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      type: [this.types[0], Validators.required],
      subject: [this.subjects[0], Validators.required],
      country: [this.countries[0], Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      institution: '',
      postCode: '',
      managerName: '',
      phoneNum: ['', Validators.required],
      mobileNum: ['', Validators.required]
    },
    {
      validator: PasswordValidation.MatchPassword
    });

    this.memberForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set from validation messages
  }

  onValueChanged(data?: any) {
    if (!this.memberForm) { return; }
    const form = this.memberForm;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        const messages = this.validationMessages[field];
        //console.log(control.errors);
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitMember() {
    this.newMember = this.memberForm.value;
    console.log(this.newMember);

    this.showMemberInfo = true;

    setTimeout(() => {
      
      this.memberForm.reset({
        username: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        type: this.types[0],
        subject: this.subjects[0],
        country: this.countries[0],
        city: '',
        address: '',
        institution: '',
        postCode: '',
        managerName: '',
        phoneNum: '',
        mobileNum: ''
      });

      this.showMemberInfo = false;
    }, 5000);
  }
}
