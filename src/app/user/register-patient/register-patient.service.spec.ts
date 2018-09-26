import { TestBed } from '@angular/core/testing';

import { RegisterPatientService } from './register-patient.service';

describe('RegisterPatientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterPatientService = TestBed.get(RegisterPatientService);
    expect(service).toBeTruthy();
  });
});
