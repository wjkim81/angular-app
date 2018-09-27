import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterPatientService } from '../service/register-patient.service';

@Component({
  selector: 'app-body-measurement',
  templateUrl: './body-measurement.component.html',
  styleUrls: ['./body-measurement.component.scss']
})
export class BodyMeasurementComponent implements OnInit {

  bodyMeasurementForm: FormGroup;

  bodyMeasurementFormErrors = {
    'height': '',
    'weight': '',
    'shoulder': '',
    'bust': '',
    'waist': '',
    'hip': '',
  };

   validationMessages = {
    'height': {
      'required': "Patient's height is required.",
      'pattern': "Patient's height should be a number."
    },
    'weight': {
      'required': "Patient's weight is required.",
      'pattern': "Patient's weight should be a number."
    },
    'shoulder': {
      'required': 'Measurement of shoulder is required.',
      'pattern': 'Measurement of shoulder should be a number.'
    },
    'bust': {
      'required': 'Measurement of bust is required.',
      'pattern': 'Measurement of bust should be a number.'
    },
    'waist': {
      'required': 'Measurement of waist is required.',
      'pattern': 'Measurement of waist should be a number.'
    },
    'hip': {
      'required': 'Measurement of hip is required.',
      'pattern': 'Measurement of hip should be a number.'
    },
  };

  constructor(
    private fb: FormBuilder,
    private registerPatientService: RegisterPatientService,
  ) { }

  ngOnInit() {
    this.createBodyMeasurementForm();
  }


  createBodyMeasurementForm() {
    this.bodyMeasurementForm = this.fb.group({
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      shoulder: [null, [Validators.required, Validators.pattern]],
      bust: [null, [Validators.required, Validators.pattern]],
      waist: [null, [Validators.required, Validators.pattern]],
      hip: [null, [Validators.required, Validators.pattern]]
    });

    this.bodyMeasurementForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set from validation messages
  }

  onValueChanged(data?: any) {
    if (!this.bodyMeasurementForm) { return; }
    const form = this.bodyMeasurementForm;
    //console.log('confirmPassword: '+ this.formErrors['confirmPassword']);
    
    for (const field in this.bodyMeasurementFormErrors) {
      // clear previous error message (if any)
      //console.log(`field: ${field}`);
      this.bodyMeasurementFormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        //console.log(`${field} - dirty: ${control.dirty}, valid: ${control.valid}`);
        //console.log(`field: ${field}`);
        const messages = this.validationMessages[field];
        //console.log(messages);
        //console.log(control.errors);
        for (const key in control.errors) {
          //console.log(`key: ${key}`);
          this.bodyMeasurementFormErrors[field] += messages[key] + ' ';
          //console.log(this.formErrors[field]);
        }
      }
    }
  }

  goPrevious() {
    this.registerPatientService.setPageNum(3);
    // this.registerPatientService.setSpinePrescription(this.spinePrescriptionForm.value);
  }

  skip() {
    console.log('skip()');
    this.registerPatientService.setPageNum(5);

    var bodyMeasurement = this.bodyMeasurementForm.value;
    bodyMeasurement.valid = false;
    this.registerPatientService.setBodyMeasurement(bodyMeasurement);
  }

  goNext() {
    console.log('goNext()');

    if (this.bodyMeasurementForm.status === 'VALID') {
      this.registerPatientService.setPageNum(5);

      var bodyMeasurement  = this.bodyMeasurementForm.value;
      bodyMeasurement.valid = true;
      this.registerPatientService.setBodyMeasurement(bodyMeasurement);
    } else {
      console.log('Form is invalid')
    }
  }
}
