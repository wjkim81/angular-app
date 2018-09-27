import { Component, OnInit } from '@angular/core';

import { RegisterPatientService } from '../service/register-patient.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comment: string = '';
  
  constructor(
    private registerPatientService: RegisterPatientService,
  ) { }

  ngOnInit() {
  }

  goPrevious() {
    this.registerPatientService.setPageNum(2);
    // this.registerPatientService.setSpinePrescription(this.spinePrescriptionForm.value);
  }

  skip() {
    console.log('skip()');
    this.registerPatientService.setPageNum(4);

    var diagnosis: any = {};
    diagnosis.comment = this.comment;;
    diagnosis.valid = false;
    this.registerPatientService.setDiagnosis(diagnosis);
  }

  goNext() {
    console.log('goNext()');

    if (this.comment !== '') {
      this.registerPatientService.setPageNum(4);

      var diagnosis: any = {};
      diagnosis.comment = this.comment;;
      diagnosis.valid = true;
      this.registerPatientService.setDiagnosis(diagnosis);
    } else {
      console.log('Comment is empty');
    }
  }
}
