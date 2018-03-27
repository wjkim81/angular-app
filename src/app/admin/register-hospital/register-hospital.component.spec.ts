import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHospitalComponent } from './register-hospital.component';

describe('RegisterHospitalComponent', () => {
  let component: RegisterHospitalComponent;
  let fixture: ComponentFixture<RegisterHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
