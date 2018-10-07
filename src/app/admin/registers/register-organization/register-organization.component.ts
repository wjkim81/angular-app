import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Location } from '@angular/common';

import { TYPES, COUNTRIES } from '../../../shared/models/member-options';
import { Organization } from '../../../shared/models/organization';

import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.scss']
})
export class RegisterOrganizationComponent implements OnInit {

  //subjects: string[];
  types: string[];
  countries: string[];

  newOrganization: Organization;
  orgForm: FormGroup;

  errMess: string;

  showOrganizationInfo: boolean;

  formErrors = {
    'name': '',
    'type': '',
    'country': '',
    'city': '',
    'address': '',
    'postCode': ''
  };

  validationMessages = {
    'name': {
      'required': 'ID is required.',
      'minlength': 'Name must be at least 4 characters long.',
    },
    'type': {
      'required': 'Type is required.'
    },
    'country': {
      'required': 'Country is required.'
    },
    'city': {
      'required': 'City is required.'
    },
    'address': {
      'required': 'Address is required.'
    },
    'postCode': {
      'required': 'Post Code is required.'
    }
  };

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    //this.subjects = SUBJECTS;
    this.types = TYPES;
    this.countries = COUNTRIES;
    //console.log(this.subjects);

    //console.log(this.BaseURL);
    this.createForm();
    this.showOrganizationInfo = false;
  }

  createForm() {
    this.orgForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4) ]],
      type: [this.types[0], [Validators.required]],
      country: [this.countries[0], [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postCode: ['', [Validators.required]]
    });

    this.orgForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set from validation messages
  }

  onValueChanged(data?: any) {
    if (!this.orgForm) { return; }
    const form = this.orgForm;
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

  submitOrganization() {
    this.newOrganization = this.orgForm.value;
    console.log(this.newOrganization);

    this.organizationService.postOrganization(this.newOrganization)
      .subscribe((org) => this.newOrganization = org);
    
    this.showOrganizationInfo = true;

    setTimeout(() => {
      this.orgForm.reset({
        name: '',
        type: this.types[0],
        country: this.countries[0],
        city: '',
        address: '',
        postCode: ''
      });

      this.showOrganizationInfo = false;
    }, 5000);
  }
}
