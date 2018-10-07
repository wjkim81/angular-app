import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { DEPARTMENTS } from '../../../shared/models/member-options';


import { Member } from '../../../shared/models/member';
import { MemberService } from '../../../shared/services/member.service';

import { Organization } from '../../../shared/models/organization';
import { OrganizationService } from '../../../shared/services/organization.service';

import { PasswordValidation } from '../../../shared/services/password-validation';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.scss']
})
export class RegisterMemberComponent implements OnInit {

  //countryOptions: string[];
  //typeOptions: string[];
  organizationOptions: string[];
  departmentOptions: string[];
  
  newMember: Member;
  memberForm: FormGroup;

  organizations: Organization[];

  errMess: string;
  registerStatus: string;

  showMemberInfo: boolean;

  formErrors = {
    'username': '',
    'password': '',
    'confirmPassword': '',
    'firstname': '',
    'lastname': '',
    'department': '',
    'email': '',
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
    'organization': {
      'required': 'Organization is required.',
    },
    'department': {
      'required': 'Department is required.',
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Not valid email address'
    },
    'mobileNum': {
      'required': 'Mobile number is required.',
    },
  };
  
  orgsLoaded: boolean;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private memberService: MemberService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.orgsLoaded = false;
    this.organizationService.getOrganizations()
    .subscribe((orgs) => {
      console.log(orgs);
      this.organizations = orgs;

      //var countries: string[] = [];
      //var types:string[] = []
      var organizations: Organization[] = [];
      
      for (var i = 0; i < orgs.length; i++) {
        //countries.push(orgs[i].country);
        //types.push(orgs[i].type);
        organizations.push(orgs[i]);
      }
      //this.countryOptions = Array.from(new Set(countries));
      //this.typeOptions = Array.from(new Set(types));
      //console.log(this.orgNameOptions);
      this.departmentOptions = DEPARTMENTS;

      this.orgsLoaded = true;
      this.showMemberInfo = false;
      this.createForm();
    }, (errMess) => {
      this.errMess = <any>errMess;
    });
  }

  createForm() {
    console.log('createForm');
    this.memberForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4) ]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25) ]],
      confirmPassword: ['', [Validators.required]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      department: [this.departmentOptions[0], Validators.required],
      organization: [this.organizations[0]._id, Validators.required],
      // email: ['', Validators.required, Validators.email],
      email: ['', Validators.required],
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

    this.memberService.registerMember(this.newMember)
    .subscribe((status) => {
      this.registerStatus = status;
      this.showMemberInfo = true;

      setTimeout(() => {
        this.memberForm.reset({
          username: '',
          password: '',
          confirmPassword: '',
          firstname: '',
          lastname: '',
          department: this.departmentOptions[0],
          organization: this.organizations[0]._id,
          email: '',
          mobileNum: ''
        });

        this.showMemberInfo = false;
        this.newMember = undefined;
      }, 5000);
    });
  }
}
