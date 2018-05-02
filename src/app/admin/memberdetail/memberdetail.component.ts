import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';

import { Member } from '../../shared/member';

import { MemberService } from '../../services/member.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-memberdetail',
  templateUrl: './memberdetail.component.html',
  styleUrls: ['./memberdetail.component.scss']
})
export class MemberdetailComponent implements OnInit {

  member: Member;
  errMess: string;

  constructor(
    private memberservice: MemberService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => { return this.memberservice.getMember(params['id']); })
      .subscribe(member => { this.member = member }, errmess => this.errMess = <any>errmess);
  }

}
