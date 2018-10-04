import { Component, OnInit, Input } from '@angular/core';

import { DiagnosisForm }  from '../../../shared/models/register-form-interfaces';

import { RegisterPatientService } from '../service/register-patient.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() diagnosis: DiagnosisForm;
  comment: string;
  
  constructor(
    private registerPatientService: RegisterPatientService,
  ) { }

  ngOnInit() {
    if (this.diagnosis) {
      this.comment = this.diagnosis.comment;;
    } else {
      this.comment = '';
    }
  }

  goPrevious() {
    console.log('goPrevious()');

    var diagnosis: any = {};
    diagnosis.comment = this.comment;;
    diagnosis.valid = false;

    this.registerPatientService.setDiagnosis(diagnosis);
    this.registerPatientService.setPageNum(2);
  }

  skip() {
    console.log('skip()');

    var diagnosis: any = {};
    diagnosis.comment = this.comment;;
    diagnosis.valid = false;
    this.registerPatientService.setDiagnosis(diagnosis);
    this.registerPatientService.setPageNum(4);
  }

  goNext() {
    console.log('goNext()');

    if (this.comment !== '') {
      
      var diagnosis: any = {};
      diagnosis.comment = this.comment;;
      diagnosis.valid = true;
      this.registerPatientService.setDiagnosis(diagnosis);
      this.registerPatientService.setPageNum(4);
    } else {
      console.log('Comment is empty');
    }
  }
}
