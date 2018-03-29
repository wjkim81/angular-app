import { Component, OnInit, Input, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SUBJECTS, TYPES, COUNTRIES } from '../../shared/member-options';
import { Member } from '../../shared/member';

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

  formErrors = {
    'id': '',
    'comment': ''
  };

   validationMessages = {
    'id': {
      'required': 'ID is required.',
      'minlength': 'ID must be at least 6 characters long',
    },
    'comment': {
      'required': 'Comment is required.'
    }
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

    //console.log(this.BaseURL);
    this.createForm();
  }

  createForm() {
    this.memberForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(2) ]],
      password: ['', [Validators.required, Validators.minLength(6) ]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6) ]],
      firstname: ['', [Validators.required, Validators.minLength(2) ]],
      lastname: ['', [Validators.required, Validators.minLength(2) ]],
      type: ['', Validators.required],
      subject: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      location1: '',
      location2: '',
      postalCode: '',
      managerName: '',
      phoneNum: ['', Validators.required],
      mobileNum: ['', Validators.required]
    });

    this.memberForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set from validation messages
  }

  onValueChanged(data?: any) {
    if (!this.memberForm) { return; }
    const form = this.memberForm;
    
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitMember() {
    this.newMember = this.memberForm.value;
    console.log(this.newMember);
  }
}