import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Member } from '../../shared/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.scss']
})
export class ListMembersComponent implements OnInit {

  countryOptions: string[];
  typeOptions: string[];
  orgOptions: string[];
  subjectOptions: string[];
  
  memberFilterForm: FormGroup;

  members: Member[];
  membersInTable: Member[];

  numMembersInTable: number;
  numAllMembers: number;

  removeBtnDisabled: boolean;

  membersErrMsg: string;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.memberFilterForm = this.fb.group({
      'country': '',
      'type': '',
      //'organization': {value: '', disabled: true},
      'organization': '',
      'subject': ''
      /*
      'type': {value: '', disabled: true}, 
      'organization': {value: '', disabled: true}, 
      'subject': {value: '', disabled: true}
      */
    });
    console.log("initialize members");
    this.memberService.getMembers()
    .subscribe((members) => {
      console.log(members);
      this.members = members;
      this.membersInTable = this.members;
      this.numAllMembers = this.members.length;
      this.numMembersInTable = this.membersInTable.length;

      var countries: string[] = [];
      var organizations: string[] = [];
      var types: string[] = [];
      var subjects: string[] = [];
      for (var i = 0; i < members.length; i++) {
        countries.push(members[i].organization.country);
        types.push(members[i].organization.type);
        organizations.push(members[i].organization.name);
        subjects.push(members[i].subject);
      }

      this.countryOptions = Array.from(new Set(countries));
      this.typeOptions = Array.from(new Set(types));
      this.orgOptions = Array.from(new Set(organizations));
      this.subjectOptions = Array.from(new Set(subjects));

      this.removeBtnDisabled = true;
    }, (membersErrMsg) => {
      this.membersErrMsg = <any>membersErrMsg;
    });
  }

  submitMemberFilter() {
    this.membersInTable = this.members.filter((member) => {
      //console.log(member);
      var included = true;
      if (this.memberFilterForm.value.country !== '') {
        if (member.organization.country != this.memberFilterForm.value.country) included = false;
      }
      //console.log(member);
      if (this.memberFilterForm.value.type !== '') {
        if (member.organization.type != this.memberFilterForm.value.type) included = false;
      }
      //console.log(member);
      if (this.memberFilterForm.value.organization !== '') {
        if (member.organization.name != this.memberFilterForm.value.organization) included = false;
      }
      if (this.memberFilterForm.value.subject !== '') {
        if (member.subject != this.memberFilterForm.value.subject) included = false;
      }
      //console.log(member);
      return included;
    });
    this.numMembersInTable = this.membersInTable.length;
  }
}
